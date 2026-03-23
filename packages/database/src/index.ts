import { WorkerEntrypoint } from "cloudflare:workers";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "./generated/prisma/client";
import type { ModelModel } from "./generated/prisma/models";
import { type IModelService, ModelService } from "./services/ModelService";

export type Model = ModelModel;
export interface Env {
	DB: D1Database;
}

let prisma: PrismaClient;

export function getPrismaClient(env: Env) {
	if (!prisma) {
		const adapter = new PrismaD1(env.DB);
		prisma = new PrismaClient({ adapter });
	}
	return prisma;
}

export default class Database
	extends WorkerEntrypoint<Env>
	implements IModelService
{
	private modelService: ModelService;

	constructor(ctx: ExecutionContext, env: Env) {
		super(ctx, env);
		this.modelService = new ModelService(getPrismaClient(env));
	}

	createAnonymousModel(): Promise<Model> {
		return this.modelService.createAnonymousModel();
	}

	getModelById(id: string): Promise<Model | null> {
		return this.modelService.getModelById(id);
	}

	getModelByAccessToken(accessToken: string): Promise<Model | null> {
		return this.modelService.getModelByAccessToken(accessToken);
	}

	getModelByPublicUrl(publicUrl: string): Promise<Model | null> {
		return this.modelService.getModelByPublicUrl(publicUrl);
	}

	updateModel(id: string, data: Partial<Model>): Promise<Model> {
		return this.modelService.updateModel(id, data);
	}

	updateModelWithAccessToken(
		id: string,
		accessToken: string,
		data: Partial<Model>,
	): Promise<Model> {
		return this.modelService.updateModelWithAccessToken(id, accessToken, data);
	}

	fetch() {
		return new Response();
	}
}
