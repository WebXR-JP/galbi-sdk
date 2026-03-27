import en from "./en";
import ja from "./ja";
import ko from "./ko";

export type Language = "ja" | "en" | "ko";

export interface LocaleMessages {
	sync: {
		active: string;
		inactive: string;
		notConfigured: string;
		success: string;
		error: string;
	};
	ui: {
		minimize: string;
		title: string;
	};
	upload: {
		title: string;
		autoSync: string;
		exportGltf: string;
		gltf: string;
		stl: string;
		urlPlaceholder: string;
		copyUrl: string;
		expiresAt: string;
		regenerateUrl: string;
		generateUrl: string;
		sync: string;
		autoSyncDescription: string;
		manualSyncDescription: string;
	};
	export: {
		success: string;
		error: string;
	};
	copy: {
		success: string;
		error: string;
	};
	toggle: {
		errorNotGenerated: string;
		enabled: string;
		disabled: string;
		error: string;
	};
	loading: string;
	autoSync: {
		success: string;
		error: string;
	};
	generateUrl: {
		success: string;
		error: string;
	};
}

class I18n {
	private static instance: I18n;
	private currentLanguage: Language = "ja";
	private messages: Record<Language, LocaleMessages> = {
		ja,
		en,
		ko,
	};

	private constructor() {}

	public static getInstance(): I18n {
		if (!I18n.instance) {
			I18n.instance = new I18n();
		}
		return I18n.instance;
	}

	public setLanguage(lang: Language): void {
		this.currentLanguage = lang;
	}

	public t(key: string): string {
		const keys = key.split(".");
		let value: Record<string, unknown> | string | undefined = this.messages[this.currentLanguage] as
			| Record<string, unknown>
			| undefined;

		for (const k of keys) {
			if (value === undefined || typeof value === "string") {
				return key;
			}
			value = value[k] as Record<string, unknown> | string | undefined;
		}

		return typeof value === "string" ? value : key;
	}
}

export const i18n = I18n.getInstance();
