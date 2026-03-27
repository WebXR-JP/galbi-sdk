export interface GalbiState {
	isAutoUpload: boolean;
	shareUrl: string;
	/** @deprecated Use `shareUrl` instead. */
	uploadUrl: string;
	isAnonymous: boolean;
	anonymousToken?: string;
	anonymousModelId?: string;
	anonymousExpiresAt?: string;
	isLoading: boolean;
}

export interface EncodedModelFile {
	type: string;
	size: number;
	name: string;
	data: string;
}

export interface AnonymousModelResponse {
	modelId: string;
	accessToken: string;
	expiresAt: string;
	publicUrl?: string;
}
