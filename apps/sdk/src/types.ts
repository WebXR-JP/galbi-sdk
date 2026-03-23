// src/types.ts

export interface GalbiState {
	isAutoUpload: boolean;
	uploadUrl: string;
	isAnonymous: boolean;
	anonymousToken?: string;
	anonymousModelId?: string;
	anonymousExpiresAt?: string;
	isLoading: boolean;
}

export interface AnonymousModelResponse {
	modelId: string;
	accessToken: string;
	expiresAt: string;
	publicUrl?: string;
}
