import { z } from "zod";

export const CreateAnonymousModelInput = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
});

export const CreateAnonymousModelResponse = z.object({
	modelId: z.string(),
	accessToken: z.string(),
	expiresAt: z.date(),
	publicUrl: z.string().nullable(),
});
export type CreateAnonymousModelInput = z.infer<typeof CreateAnonymousModelInput>;
export type CreateAnonymousModelResponse = z.infer<typeof CreateAnonymousModelResponse>;
// UpdateAnonymousModel は uploadModel API に統合したため削除
