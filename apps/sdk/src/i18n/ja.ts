import type { LocaleMessages } from "./index";

const messages: LocaleMessages = {
	sync: {
		active: "同期中",
		inactive: "同期停止中",
		notConfigured: "未同期",
		success: "同期が完了しました",
		error: "同期に失敗しました",
	},
	ui: {
		minimize: "最小化",
		title: "Galbi SDK",
	},
	upload: {
		title: "アップロード設定",
		autoSync: "自動同期",
		exportGltf: "GLTFとしてエクスポート",
		gltf: "GLTF",
		stl: "STL",
		urlPlaceholder: "URLを生成してください",
		copyUrl: "URLをコピー",
		expiresAt: "有効期限:",
		regenerateUrl: "URL再生成",
		generateUrl: "URLを生成",
		sync: "同期する",
		autoSyncDescription: "自動同期が有効です。シーンの変更は自動的にアップロードされます。",
		manualSyncDescription:
			"手動アップロードモードです。「URLを生成」を押してアップロード用URLを取得し、「同期する」ボタンで手動同期を行ってください。",
	},
	export: {
		success: "モデルをエクスポートしました",
		error: "エクスポートに失敗しました",
	},
	copy: {
		success: "URLをコピーしました",
		error: "URLのコピーに失敗しました",
	},
	toggle: {
		errorNotGenerated: "先にURLを生成してください",
		enabled: "自動同期を有効にしました",
		disabled: "自動同期を無効にしました",
		error: "自動同期の設定に失敗しました",
	},
	loading: "処理中...",
	autoSync: {
		success: "自動同期が完了しました",
		error: "自動同期に失敗しました",
	},
	generateUrl: {
		success: "URLを生成しました",
		error: "URLの生成に失敗しました",
	},
};

export default messages;
