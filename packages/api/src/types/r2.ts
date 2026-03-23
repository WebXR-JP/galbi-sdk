import type { R2Bucket } from "@cloudflare/workers-types";

// R2Bucketの拡張型を定義
export type CustomR2Bucket = R2Bucket & {
	publicUrl?: string;
};

// アップロード結果の型を定義
export interface UploadResult {
	url: string | null;
	error?: string;
}

// R2のレスポンス型を定義
export interface R2Response {
	key: string;
}
