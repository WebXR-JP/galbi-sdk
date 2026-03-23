import type { ModelModel as Model } from "../generated/prisma/models";

export interface IModelService {
	getModelById(id: string): Promise<Model | null>;
	getModelByAccessToken(accessToken: string): Promise<Model | null>;
	getModelByPublicUrl(publicUrl: string): Promise<Model | null>;
	updateModel(id: string, data: Partial<Model>): Promise<Model>;
	updateModelWithAccessToken(
		id: string,
		accessToken: string,
		data: Partial<Model>,
	): Promise<Model>;
	createAnonymousModel(): Promise<Model>;
}
