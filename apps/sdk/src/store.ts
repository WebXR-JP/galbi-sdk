// src/store.ts

import { trpc } from "./trpc";
import type { AnonymousModelResponse, GalbiState } from "./types";

// ファイルアップロード用の型を定義
type FileUpload = {
	name: string;
	data: string;
};
export class GalbiStore {
	private state: GalbiState = {
		isAutoUpload: false,
		uploadUrl: "",
		isAnonymous: false,
		isLoading: false,
	};
	private listeners: ((state: GalbiState) => void)[] = [];

	getState(): GalbiState {
		return this.state;
	}

	setState(newState: Partial<GalbiState>): void {
		this.state = { ...this.state, ...newState };
		this.notifyListeners();
	}

	setAnonymousAccess(response: AnonymousModelResponse): void {
		this.state = {
			...this.state,
			isAnonymous: true,
			anonymousToken: response.accessToken,
			anonymousModelId: response.modelId,
			anonymousExpiresAt: response.expiresAt,
		};
		this.notifyListeners();
	}

	clearAnonymousAccess(): void {
		this.state = {
			...this.state,
			isAnonymous: false,
			anonymousToken: undefined,
			anonymousModelId: undefined,
			anonymousExpiresAt: undefined,
		};
		this.notifyListeners();
	}

	subscribe(listener: (state: GalbiState) => void): () => void {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter(l => l !== listener);
		};
	}

	private notifyListeners(): void {
		for (const listener of this.listeners) {
			listener(this.state);
		}
	}

	// ローディング状態の設定
	setLoading(isLoading: boolean): void {
		this.setState({ isLoading });
	}

	// 匿名モデルの作成
	async createAnonymousModel(): Promise<AnonymousModelResponse> {
		try {
			this.setLoading(true);
			const result = await trpc.anonymous.createAnonymousModel.mutate({});
			const response = {
				modelId: result.modelId,
				accessToken: result.accessToken,
				expiresAt: result.expiresAt,
				publicUrl: result.publicUrl,
			};
			this.setAnonymousAccess(response);
			return response;
		} catch (error) {
			console.error("Failed to create anonymous model:", error);
			throw error;
		} finally {
			this.setLoading(false);
		}
	}

	// 匿名モデルのアップロード
	async uploadModel(file: FileUpload): Promise<unknown> {
		if (!this.state.anonymousModelId || !this.state.anonymousToken) {
			throw new Error("Anonymous model not initialized");
		}
		try {
			this.setLoading(true);
			const response = await trpc.anonymous.uploadModel.mutate({
				modelId: this.state.anonymousModelId,
				accessToken: this.state.anonymousToken,
				model: file,
			});
			console.log("response", response);
			return response;
		} catch (error) {
			console.error("Failed to upload anonymous model:", error);
			throw error;
		} finally {
			this.setLoading(false);
		}
	}
}
