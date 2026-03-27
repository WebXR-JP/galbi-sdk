import type { Language } from "./i18n";
import { GalbiPopup } from "./popup";
import { GalbiStore } from "./store";
import type { AnonymousModelResponse, EncodedModelFile, GalbiState } from "./types";
import "./styles.css";

type PlayCanvasEntity = unknown;

type PlayCanvasGltfExporter = {
	build(entity: PlayCanvasEntity): Promise<ArrayBuffer>;
};

type PlayCanvasStlExporter = {
	build(entity: PlayCanvasEntity, fileName: string): Blob;
};

interface GalbiExporters {
	gltf: PlayCanvasGltfExporter;
	stl: PlayCanvasStlExporter;
}

interface GalbiOptions {
	container: HTMLElement;
	rootEntity?: PlayCanvasEntity;
	targetEntity?: PlayCanvasEntity;
	exporters?: Partial<GalbiExporters>;
	gltfExporter?: PlayCanvasGltfExporter;
	stlExporter?: PlayCanvasStlExporter;
	language?: Language;
	lang?: Language;
}

export class Galbi {
	private popup: GalbiPopup;
	private store: GalbiStore;
	private rootEntity: PlayCanvasEntity;
	private gltfExporter?: PlayCanvasGltfExporter;
	private stlExporter?: PlayCanvasStlExporter;

	constructor(options: GalbiOptions) {
		this.store = new GalbiStore();
		this.popup = new GalbiPopup(
			options.container || document.body,
			this.store,
			this,
			options.lang ?? options.language ?? "ja",
		);
		this.rootEntity = this.resolveRootEntity(options);
		this.gltfExporter = options.exporters?.gltf ?? options.gltfExporter;
		this.stlExporter = options.exporters?.stl ?? options.stlExporter;
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
			await this.createShareAccess();
			state = this.store.getState();
		}

		try {
			if (!state.anonymousModelId || !state.anonymousToken) {
				throw new Error("Anonymous upload target is not initialized");
			}

			const gltfData = await this.buildUploadPayload(state.anonymousModelId);
			await this.store.uploadModel({ name: gltfData.name, data: gltfData.data });
		} catch (error) {
			console.error("Upload error:", error);
			alert("アップロードに失敗しました。");
		}
	}

	async createShareAccess(): Promise<AnonymousModelResponse> {
		try {
			return await this.store.createAnonymousModel();
		} catch (error) {
			console.error("Failed to create share access:", error);
			throw error;
		}
	}

	/** @deprecated Use `createShareAccess()` instead. */
	async createAnonymousAccess(): Promise<AnonymousModelResponse> {
		return this.createShareAccess();
	}

	async uploadSharedModel(file: EncodedModelFile): Promise<void> {
		try {
			await this.store.uploadModel({ name: file.name, data: file.data });
		} catch (error) {
			console.error("Failed to upload shared model:", error);
			throw error;
		}
	}

	/** @deprecated Use `uploadSharedModel()` instead. */
	async updateAnonymousModel(gltfData: EncodedModelFile): Promise<void> {
		return this.uploadSharedModel(gltfData);
	}

	subscribe(listener: (state: GalbiState) => void): () => void {
		return this.store.subscribe(listener);
	}

	getState(): GalbiState {
		return this.store.getState();
	}

	async downloadGlb(fileName = "model.glb"): Promise<void> {
		try {
			if (!this.gltfExporter) {
				throw new Error("GltfExporter is not initialized");
			}
			const buffer = await this.gltfExporter.build(this.rootEntity);
			const blob = new Blob([buffer], { type: "application/octet-stream" });
			this.downloadBlob(blob, fileName);
		} catch (error) {
			console.error("Export error:", error);
			alert("エクスポートに失敗しました。");
		}
	}

	/** @deprecated Use `downloadGlb()` instead. */
	async export(fileName = "model.glb"): Promise<void> {
		return this.downloadGlb(fileName);
	}

	async downloadStl(fileName = "model.stl"): Promise<void> {
		try {
			if (!this.stlExporter) {
				throw new Error("StlExporter is not initialized");
			}
			const blob = this.stlExporter.build(this.rootEntity, fileName);
			this.downloadBlob(blob, fileName);
		} catch (error) {
			console.error("Export error:", error);
			alert("エクスポートに失敗しました。");
		}
	}

	/** @deprecated Use `downloadStl()` instead. */
	async exportStl(fileName = "model.stl"): Promise<void> {
		return this.downloadStl(fileName);
	}

	async buildUploadPayload(modelId: string): Promise<EncodedModelFile> {
		try {
			if (!this.gltfExporter) {
				throw new Error("GltfExporter is not initialized");
			}

			const buffer = await this.gltfExporter.build(this.rootEntity);
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

	/** @deprecated Use `buildUploadPayload()` instead. */
	async exportGltf(modelId: string): Promise<EncodedModelFile> {
		return this.buildUploadPayload(modelId);
	}

	private downloadBlob(blob: Blob, fileName: string): void {
		const downloadUrl = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = downloadUrl;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(downloadUrl);
	}

	private resolveRootEntity(options: GalbiOptions): PlayCanvasEntity {
		const rootEntity = options.rootEntity ?? options.targetEntity;
		if (!rootEntity) {
			throw new Error("Galbi requires `rootEntity` (or legacy `targetEntity`) to be provided");
		}

		return rootEntity;
	}
}
