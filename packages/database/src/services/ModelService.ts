import type { PrismaClient } from "../generated/prisma/client";
import type { ModelModel as Model } from "../generated/prisma/models";
import { generatePublicUrl } from "../utils/publicUrlGenerator";
import type { IModelService } from "./IModelService";

const DEFAULT_EXPIRATION_HOURS = 24;

export class ModelService implements IModelService {
	constructor(private prisma: PrismaClient) {}

	async createAnonymousModel(): Promise<Model> {
		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + DEFAULT_EXPIRATION_HOURS);

		for (let attempt = 0; attempt < 5; attempt++) {
			try {
				return await this.prisma.model.create({
					data: {
						isAnonymous: true,
						expiresAt,
						accessToken: undefined,
						tags: "",
						name: "Anonymous Model",
						publicUrl: generatePublicUrl(),
					},
				});
			} catch (error) {
				if (attempt === 4) {
					throw error;
				}
			}
		}

		throw new Error("Failed to generate a unique public URL");
	}

	async getModelById(id: string): Promise<Model | null> {
		return this.prisma.model.findUnique({
			where: { id },
		});
	}

	async getModelByAccessToken(accessToken: string): Promise<Model | null> {
		const now = new Date();
		return this.prisma.model.findFirst({
			where: {
				accessToken,
				OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
			},
		});
	}

	async getModelByPublicUrl(publicUrl: string): Promise<Model | null> {
		const now = new Date();
		return this.prisma.model.findFirst({
			where: {
				publicUrl,
				OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
			},
		});
	}

	async updateModel(id: string, data: Partial<Model>): Promise<Model> {
		return this.prisma.model.update({
			where: { id },
			data,
		});
	}

	async updateModelWithAccessToken(
		id: string,
		accessToken: string,
		data: Partial<Model>,
	): Promise<Model> {
		const now = new Date();
		const model = await this.prisma.model.findFirst({
			where: {
				id,
				accessToken,
				OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
			},
		});

		if (!model) {
			throw new Error("Invalid access token or model expired");
		}

		return this.prisma.model.update({
			where: { id },
			data: {
				...data,
				accessToken: undefined,
				isAnonymous: undefined,
			},
		});
	}
}

export type { IModelService };
