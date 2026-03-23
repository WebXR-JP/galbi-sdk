import type { Model } from "@repo/database";
import { TRPCError } from "@trpc/server";
import type { HonoContext } from "../";
import type { CreateAnonymousModelInput } from "../schemas/anonymous.schema";
import type { FileUpload } from "../schemas/upload.schema";
import type { CustomR2Bucket, UploadResult } from "../types/r2";

export class AnonymousService {
	constructor(private ctx: HonoContext) {}

	async createAnonymousModel(_input?: CreateAnonymousModelInput) {
		try {
			// Create empty anonymous model with auto-generated access token
			const model = await this.ctx.env.DATABASE.createAnonymousModel();
			return {
				modelId: model.id,
				accessToken: model.accessToken,
				expiresAt: model.expiresAt,
				publicUrl: model.publicUrl,
			};
		} catch (error) {
			console.error("Failed to create anonymous model:", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to create anonymous model",
			});
		}
	}

	async getAnonymousModel(modelId: string, accessToken: string): Promise<Model | null> {
		try {
			const model = await this.ctx.env.DATABASE.getModelByAccessToken(accessToken);

			if (!model || model.id !== modelId) {
				return null;
			}

			if (model.expiresAt && model.expiresAt < new Date()) {
				return null;
			}

			return model;
		} catch (error) {
			console.error("Failed to get anonymous model:", error);
			return null;
		}
	}

	async getModelByPublicUrl(publicUrl: string): Promise<Model | null> {
		try {
			return await this.ctx.env.DATABASE.getModelByPublicUrl(publicUrl);
		} catch (error) {
			console.error("Failed to get model by public URL:", error);
			return null;
		}
	}

	private async uploadFile(file: FileUpload | undefined): Promise<UploadResult> {
		if (!file) {
			return { url: null };
		}

		try {
			const r2 = this.ctx.env.R2 as unknown as CustomR2Bucket;
			const baseUrl = r2.publicUrl ?? "";
			const filename = `${file.name}`;
			const arrayBuffer = Buffer.from(file.data, "base64");

			const uploadResult = await r2.put(filename, arrayBuffer);
			if (!uploadResult) {
				return { url: null, error: "モデルのアップロードに失敗しました" };
			}

			return { url: `${baseUrl}/${uploadResult.key}` };
		} catch (e) {
			console.error(e);
			return { url: null, error: "内部サーバーエラー" };
		}
	}
	/**
	 * モデルをアップロードしてURLを取得する
	 */
	async uploadModel(modelId: string, accessToken: string, file: FileUpload | undefined): Promise<UploadResult> {
		const model = await this.ctx.env.DATABASE.getModelByAccessToken(accessToken);
		if (!model) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Invalid access token",
			});
		}

		const fileUrl = await this.uploadFile(file);

		if (!fileUrl.url) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to upload model",
			});
		}

		// モデルのfileUrlを更新
		await this.ctx.env.DATABASE.updateModelWithAccessToken(modelId, accessToken, {
			fileUrl: fileUrl.url,
		});

		return fileUrl;
	}
}
