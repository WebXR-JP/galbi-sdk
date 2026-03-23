import { initTRPC } from "@trpc/server";
import { z } from "zod";
import type { HonoContext } from "../";
import { CreateAnonymousModelInput } from "../schemas/anonymous.schema";
import { ModelUploadInputSchema } from "../schemas/upload.schema";
import { AnonymousService } from "../services/anonymous.service";

const t = initTRPC.context<HonoContext>().create();
const { createCallerFactory, router } = t;
const publicProcedure = t.procedure;

export { createCallerFactory, publicProcedure, router, t };

const anonymousRouter = router({
	createAnonymousModel: publicProcedure.input(CreateAnonymousModelInput.optional()).mutation(async ({ input, ctx }) => {
		const anonymousService = new AnonymousService(ctx);
		return await anonymousService.createAnonymousModel(input);
	}),

	getAnonymousModel: publicProcedure
		.input(
			z.object({
				modelId: z.string().uuid(),
				accessToken: z.string().uuid(),
			}),
		)
		.query(async ({ input, ctx }) => {
			const anonymousService = new AnonymousService(ctx);
			return await anonymousService.getAnonymousModel(input.modelId, input.accessToken);
		}),

	uploadModel: publicProcedure.input(ModelUploadInputSchema).mutation(async ({ input, ctx }) => {
		const anonymousService = new AnonymousService(ctx);
		return await anonymousService.uploadModel(input.modelId, input.accessToken, input.model);
	}),
});

export const appRouter = router({
	anonymous: anonymousRouter,
});

export type AppRouter = typeof appRouter;
