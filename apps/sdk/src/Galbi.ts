// src/galbi.ts

import type { Language } from "./i18n";
import { GalbiPopup } from "./popup";
import { GalbiStore } from "./store";
import type { AnonymousModelResponse, GalbiState } from "./types";
import "./styles.css";

interface GalbiOptions {
	container: HTMLElement;
	// biome-ignore lint/suspicious/noExplicitAny: PlayCanvas app instance
	app?: any;
	// biome-ignore lint/suspicious/noExplicitAny: PlayCanvas entity
	targetEntity: any;
	// biome-ignore lint/suspicious/noExplicitAny: PlayCanvas exporter
	gltfExporter: any;
	// biome-ignore lint/suspicious/noExplicitAny: PlayCanvas exporter
	stlExporter: any;
	language?: Language;
}

type ExportAsStringResponse = {
	type: string;
	size: number;
	name: string;
	data: string;
};

export class Galbi {
	private popup: GalbiPopup;
	private store: GalbiStore;
	// biome-ignore lint/suspicious/noExplicitAny: PlayCanvas entity
	private targetEntity: any;
	// biome-ignore lint/suspicious/noExplicitAny: PlayCanvas exporter
	private gltfExporter: any;
	// biome-ignore lint/suspicious/noExplicitAny: PlayCanvas exporter
	private stlExporter: any;

	constructor(options: GalbiOptions) {
		this.store = new GalbiStore();
		this.popup = new GalbiPopup(options.container || document.body, this.store, this, options.language || "ja");
		this.targetEntity = options.targetEntity;
		this.gltfExporter = options.gltfExporter;
		this.stlExporter = options.stlExporter;
	}

	start(): void {
		this.popup.show();
	}

	stop(): void {
		this.popup.hide();
	}

	async upload(): Promise<void> {
		let state = this.store.getState();
		if (!state.isAnonymous) {
			await this.createAnonymousAccess();
			state = this.store.getState();
		}

		try {
			if (!state.anonymousModelId || !state.anonymousToken) {
				throw new Error("Anonymous upload target is not initialized");
			}

			const gltfData = await this.exportGltf(state.anonymousModelId);
			await this.store.uploadModel({ name: gltfData.name, data: gltfData.data });
		} catch (error) {
			console.error("Upload error:", error);
			alert("アップロードに失敗しました。");
		}
	}

	async createAnonymousAccess(): Promise<AnonymousModelResponse> {
		try {
			return await this.store.createAnonymousModel();
		} catch (error) {
			console.error("Failed to create anonymous access:", error);
			throw error;
		}
	}

	async updateAnonymousModel(gltfData: ExportAsStringResponse): Promise<void> {
		try {
			await this.store.uploadModel({ name: gltfData.name, data: gltfData.data });
		} catch (error) {
			console.error("Failed to update anonymous model:", error);
			throw error;
		}
	}

	subscribe(listener: (state: GalbiState) => void): () => void {
		return this.store.subscribe(listener);
	}

	getState(): GalbiState {
		return this.store.getState();
	}

	async export(fileName = "model.glb"): Promise<void> {
		try {
			if (!this.gltfExporter) {
				throw new Error("GltfExporter is not initialized");
			}
			console.log("Exporting 3D model...");
			const buffer = await this.gltfExporter.build(this.targetEntity);
			const blob = new Blob([buffer], { type: "application/octet-stream" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Export error:", error);
			alert("エクスポートに失敗しました。");
		}
	}

	async exportStl(fileName = "model.stl"): Promise<void> {
		try {
			if (!this.stlExporter) {
				throw new Error("StlExporter is not initialized");
			}
			console.log("Exporting 3D model...");
			const blob = this.stlExporter.build(this.targetEntity, fileName);
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Export error:", error);
			alert("エクスポートに失敗しました。");
		}
	}

	async exportGltf(modelId: string): Promise<ExportAsStringResponse> {
		try {
			const buffer = await this.gltfExporter.build(this.targetEntity);
			const blob = new Blob([buffer], { type: "application/octet-stream" });

			const modelData = await new Promise<string>(resolve => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result as string);
				reader.readAsDataURL(blob);
			});

			return {
				type: "model/gltf-binary",
				size: blob.size,
				name: `${modelId}.glb`,
				data: modelData.split(",")[1],
			};
		} catch (error) {
			console.error("GLB export error:", error);
			throw error;
		}
	}
}
