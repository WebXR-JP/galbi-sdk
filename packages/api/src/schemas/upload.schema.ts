import { z } from "zod";

export const FileUploadSchema = z.object({
	name: z.string(),
	data: z.string(),
});

export const ModelUploadInputSchema = z.object({
	modelId: z.string().uuid(),
	accessToken: z.string().uuid(),
	model: FileUploadSchema.optional(),
});

export const ImageUploadInputSchema = z.object({
	image: FileUploadSchema.optional(),
});

export type FileUpload = z.infer<typeof FileUploadSchema>;
export type ModelUploadInput = z.infer<typeof ModelUploadInputSchema>;
export type ImageUploadInput = z.infer<typeof ImageUploadInputSchema>;

// フロントエンド用のバリデーション関数
export const validateFileUpload = (data: unknown): FileUpload => {
	return FileUploadSchema.parse(data);
};

export const validateModelUpload = (data: unknown): ModelUploadInput => {
	return ModelUploadInputSchema.parse(data);
};

export const validateImageUpload = (data: unknown): ImageUploadInput => {
	return ImageUploadInputSchema.parse(data);
};
