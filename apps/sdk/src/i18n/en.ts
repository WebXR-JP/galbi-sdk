import type { LocaleMessages } from "./index";

const messages: LocaleMessages = {
	sync: {
		active: "Syncing",
		inactive: "Sync Stopped",
		notConfigured: "Not Synced",
		success: "Sync completed",
		error: "Sync failed",
	},
	ui: {
		minimize: "Minimize",
		title: "Galbi SDK",
	},
	upload: {
		title: "Upload Settings",
		autoSync: "Auto Sync",
		exportGltf: "Export as GLTF",
		gltf: "GLTF",
		stl: "STL",
		urlPlaceholder: "Generate URL",
		copyUrl: "Copy URL",
		expiresAt: "Expires at:",
		regenerateUrl: "Regenerate URL",
		generateUrl: "Generate URL",
		sync: "Sync Now",
		autoSyncDescription: "Auto sync is enabled. Scene changes will be uploaded automatically.",
		manualSyncDescription:
			'Manual upload mode. Click "Generate URL" to get an upload URL, then use the "Sync Now" button for manual synchronization.',
	},
	export: {
		success: "Model exported successfully",
		error: "Export failed",
	},
	copy: {
		success: "URL copied",
		error: "Failed to copy URL",
	},
	toggle: {
		errorNotGenerated: "Please generate URL first",
		enabled: "Auto sync enabled",
		disabled: "Auto sync disabled",
		error: "Failed to configure auto sync",
	},
	loading: "Loading...",
	autoSync: {
		success: "Auto sync completed",
		error: "Auto sync failed",
	},
	generateUrl: {
		success: "URL generated",
		error: "Failed to generate URL",
	},
};

export default messages;
