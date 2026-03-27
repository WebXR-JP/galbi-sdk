import { trpc } from "./trpc";
import type { AnonymousModelResponse, GalbiState } from "./types";

type UploadModelInput = {
	name: string;
	data: string;
};

export class GalbiStore {
	private state: GalbiState = {
		isAutoUpload: false,
		shareUrl: "",
		uploadUrl: "",
		isAnonymous: false,
		isLoading: false,
	};
	private subscribers: ((state: GalbiState) => void)[] = [];

	getState(): GalbiState {
		return this.state;
	}

	setState(statePatch: Partial<GalbiState>): void {
		this.state = { ...this.state, ...this.normalizeStatePatch(statePatch) };
		this.notifySubscribers();
	}

	setAnonymousSession(response: AnonymousModelResponse): void {
		this.state = {
			...this.state,
			isAnonymous: true,
			anonymousToken: response.accessToken,
			anonymousModelId: response.modelId,
			anonymousExpiresAt: response.expiresAt,
		};
		this.notifySubscribers();
	}

	clearAnonymousSession(): void {
		this.state = {
			...this.state,
			isAnonymous: false,
			anonymousToken: undefined,
			anonymousModelId: undefined,
			anonymousExpiresAt: undefined,
		};
		this.notifySubscribers();
	}

	subscribe(subscriber: (state: GalbiState) => void): () => void {
		this.subscribers.push(subscriber);
		return () => {
			this.subscribers = this.subscribers.filter(listener => listener !== subscriber);
		};
	}

	private normalizeStatePatch(statePatch: Partial<GalbiState>): Partial<GalbiState> {
		const normalizedPatch = { ...statePatch };

		if (typeof statePatch.shareUrl === "string") {
			normalizedPatch.uploadUrl = statePatch.shareUrl;
		} else if (typeof statePatch.uploadUrl === "string") {
			normalizedPatch.shareUrl = statePatch.uploadUrl;
		}

		return normalizedPatch;
	}

	private notifySubscribers(): void {
		for (const subscriber of this.subscribers) {
			subscriber(this.state);
		}
	}

	setLoading(isLoading: boolean): void {
		this.setState({ isLoading });
	}

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
			this.setAnonymousSession(response);
			return response;
		} catch (error) {
			console.error("Failed to create anonymous model:", error);
			throw error;
		} finally {
			this.setLoading(false);
		}
	}

	async uploadModel(file: UploadModelInput): Promise<unknown> {
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
			return response;
		} catch (error) {
			console.error("Failed to upload anonymous model:", error);
			throw error;
		} finally {
			this.setLoading(false);
		}
	}
}
