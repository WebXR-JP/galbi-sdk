import type { Galbi } from "./Galbi";
import { i18n, type Language } from "./i18n";
import { type StoredShareSession, storageService } from "./services/storage.service";
import type { GalbiStore } from "./store";
import type { GalbiState } from "./types";

export class GalbiPopup {
	private element: HTMLDivElement;
	private store: GalbiStore;
	private galbi: Galbi;
	private autoSyncInterval: ReturnType<typeof setInterval> | null = null;
	private lastSyncHash: string | null = null;

	constructor(container: HTMLElement, store: GalbiStore, galbi: Galbi, language: Language = "ja") {
		this.store = store;
		this.galbi = galbi;
		i18n.setLanguage(language);
		this.element = document.createElement("div");
		this.element.className = "galbi-popup";
		container.appendChild(this.element);

		this.store.subscribe(state => this.render(state));
		this.loadStoredShareSession().then(() => this.render(this.store.getState()));
	}

	private render(state: GalbiState): void {
		const headerIconClass = state.shareUrl && state.isAutoUpload ? "sync-active" : "sync-inactive";
		const syncStatus = state.shareUrl
			? state.isAutoUpload
				? i18n.t("sync.active")
				: i18n.t("sync.inactive")
			: i18n.t("sync.notConfigured");

		this.element.innerHTML = `
      <div class="galbi-header">
        <div class="galbi-header-title">
          <svg class="galbi-header-icon ${headerIconClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <h3>${i18n.t("ui.title")}</h3>
          <span class="galbi-sync-badge ${headerIconClass}">${syncStatus}</span>
        </div>
        <button class="galbi-minimize" aria-label="${i18n.t("ui.minimize")}">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M20 12H4" />
          </svg>
        </button>
      </div>
      <div class="galbi-content">
        ${this.renderUploadPanel(state)}
      </div>
    `;

		this.attachEventListeners(state);
	}

	private renderUploadPanel(state: GalbiState): string {
		return `
      <div class="galbi-upload-panel">
        <div class="galbi-upload-header">
          <div class="galbi-upload-title">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
            </svg>
            ${i18n.t("upload.title")}
          </div>
          <div class="galbi-header-actions">
            <label class="galbi-toggle ${state.isAutoUpload ? "active" : ""}" role="switch" aria-checked="${state.isAutoUpload}">
              <span class="galbi-toggle-track"></span>
              <span class="galbi-toggle-label">${i18n.t("upload.autoSync")}</span>
            </label>
            <button class="galbi-export-button gltf-export" title="${i18n.t("upload.exportGltf")}">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              ${i18n.t("upload.gltf")}
            </button>
            <button class="galbi-export-button stl-export" title="${i18n.t("upload.stl")}">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              ${i18n.t("upload.stl")}
            </button>
          </div>
        </div>

        <div class="galbi-url-generator">
          <div class="galbi-url-input-group">
            <input type="text" class="galbi-url-input" value="${state.shareUrl || ""}" placeholder="${i18n.t("upload.urlPlaceholder")}" readonly>
            <button class="galbi-copy-button" aria-label="${i18n.t("upload.copyUrl")}" ${!state.shareUrl ? "disabled" : ""}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>

          ${
						state.anonymousExpiresAt
							? `
            <div class="galbi-expires-at">
              ${i18n.t("upload.expiresAt")} ${this.formatExpiresAt(state.anonymousExpiresAt)}
            </div>
          `
							: ""
					}

          <div class="galbi-upload-actions">
            <button class="galbi-generate-button">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${
									state.shareUrl
										? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />'
										: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />'
								}
              </svg>
              ${state.shareUrl ? i18n.t("upload.regenerateUrl") : i18n.t("upload.generateUrl")}
            </button>
            ${
							!state.isAutoUpload && state.shareUrl
								? `
              <button class="galbi-sync-button">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                ${i18n.t("upload.sync")}
              </button>
            `
								: ""
						}
          </div>
        </div>

        <div class="galbi-upload-description">
          ${state.isAutoUpload ? i18n.t("upload.autoSyncDescription") : i18n.t("upload.manualSyncDescription")}
        </div>
      </div>
    `;
	}

	private attachEventListeners(state: GalbiState): void {
		const minimizeButton = this.element.querySelector(".galbi-minimize");
		minimizeButton?.addEventListener("click", () => {
			const content = this.element.querySelector(".galbi-content");
			if (content?.classList.contains("minimized")) {
				this.maximize();
				return;
			}
			this.minimize();
		});

		const downloadGlbButton = this.element.querySelector(".gltf-export");
		downloadGlbButton?.addEventListener("click", async () => {
			try {
				await this.galbi.downloadGlb("model.glb");
				this.showNotification(i18n.t("export.success"), "success");
			} catch (error) {
				console.error("Export error:", error);
				this.showNotification(i18n.t("export.error"), "error");
			}
		});

		const downloadStlButton = this.element.querySelector(".stl-export");
		downloadStlButton?.addEventListener("click", async () => {
			try {
				await this.galbi.downloadStl("model.stl");
				this.showNotification(i18n.t("export.success"), "success");
			} catch (error) {
				console.error("Export error:", error);
				this.showNotification(i18n.t("export.error"), "error");
			}
		});

		const generateButton = this.element.querySelector(".galbi-generate-button") as HTMLButtonElement | null;
		generateButton?.addEventListener("click", () => void this.createShareUrl());

		const syncButton = this.element.querySelector(".galbi-sync-button") as HTMLButtonElement | null;
		syncButton?.addEventListener("click", async () => {
			if (!state.anonymousModelId) {
				this.showNotification(i18n.t("toggle.errorNotGenerated"), "error");
				return;
			}

			try {
				syncButton.disabled = true;
				this.setLoadingState(syncButton, true);
				const gltfData = await this.galbi.buildUploadPayload(state.anonymousModelId);
				await this.store.uploadModel(gltfData);
				this.showNotification(i18n.t("sync.success"), "success");
			} catch (error) {
				console.error("Sync error:", error);
				this.showNotification(i18n.t("sync.error"), "error");
			} finally {
				syncButton.disabled = false;
				this.setLoadingState(syncButton, false);
			}
		});

		const copyButton = this.element.querySelector(".galbi-copy-button");
		copyButton?.addEventListener("click", () => {
			const urlInput = this.element.querySelector(".galbi-url-input") as HTMLInputElement | null;
			if (!urlInput?.value) {
				return;
			}

			navigator.clipboard
				.writeText(urlInput.value)
				.then(() => this.showNotification(i18n.t("copy.success"), "success"))
				.catch(error => {
					console.error("Copy error:", error);
					this.showNotification(i18n.t("copy.error"), "error");
				});
		});

		const toggle = this.element.querySelector(".galbi-toggle");
		toggle?.addEventListener("click", () => void this.toggleAutoSync());
	}

	private async toggleAutoSync(): Promise<void> {
		const state = this.store.getState();
		const willEnable = !state.isAutoUpload;

		if (willEnable && (!state.shareUrl || !state.anonymousModelId)) {
			this.showNotification(i18n.t("toggle.errorNotGenerated"), "error");
			return;
		}

		try {
			if (willEnable && state.anonymousModelId) {
				const gltfData = await this.galbi.buildUploadPayload(state.anonymousModelId);
				this.lastSyncHash = await this.hashPayload(gltfData.data);
				await this.store.uploadModel(gltfData);
				this.startAutoSync();
			} else {
				this.stopAutoSync();
			}

			this.store.setState({ isAutoUpload: willEnable });
			this.showNotification(i18n.t(willEnable ? "toggle.enabled" : "toggle.disabled"), "success");
		} catch (error) {
			console.error("Auto sync toggle error:", error);
			this.stopAutoSync();
			this.store.setState({ isAutoUpload: false });
			this.showNotification(i18n.t("toggle.error"), "error");
		}
	}

	private minimize(): void {
		this.element.querySelector(".galbi-content")?.classList.add("minimized");
	}

	private maximize(): void {
		this.element.querySelector(".galbi-content")?.classList.remove("minimized");
	}

	show(): void {
		this.element.classList.add("visible");
	}

	hide(): void {
		this.element.classList.remove("visible");
	}

	private showNotification(message: string, type: "success" | "error"): void {
		const notification = document.createElement("div");
		notification.className = `galbi-notification ${type}`;
		notification.innerHTML = `
      <div class="galbi-notification-content">
        <svg class="galbi-notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${
						type === "success"
							? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />'
							: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />'
					}
        </svg>
        <span>${message}</span>
      </div>
    `;
		document.body.appendChild(notification);

		setTimeout(() => notification.classList.add("show"), 10);
		setTimeout(() => {
			notification.classList.remove("show");
			setTimeout(() => notification.remove(), 300);
		}, 3000);
	}

	private setLoadingState(button: HTMLButtonElement, isLoading: boolean): void {
		if (isLoading) {
			if (!button.dataset.originalContent) {
				button.dataset.originalContent = button.innerHTML;
			}
			button.innerHTML = `
        <svg class="animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        ${i18n.t("loading")}
      `;
			return;
		}

		if (button.dataset.originalContent) {
			button.innerHTML = button.dataset.originalContent;
		}
	}

	private async hashPayload(data: string): Promise<string> {
		const encoder = new TextEncoder();
		const buffer = encoder.encode(data);
		const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
	}

	private async performAutoSync(): Promise<void> {
		const state = this.store.getState();
		if (!state.isAutoUpload || !state.anonymousModelId) {
			return;
		}

		try {
			const gltfData = await this.galbi.buildUploadPayload(state.anonymousModelId);
			const currentHash = await this.hashPayload(gltfData.data);

			if (currentHash === this.lastSyncHash) {
				return;
			}

			await this.store.uploadModel(gltfData);
			this.lastSyncHash = currentHash;
			this.showNotification(i18n.t("autoSync.success"), "success");
		} catch (error) {
			console.error("Auto sync error:", error);
			this.stopAutoSync();
			this.store.setState({ isAutoUpload: false });
			this.showNotification(i18n.t("autoSync.error"), "error");
		}
	}

	private startAutoSync(): void {
		this.stopAutoSync();
		this.autoSyncInterval = setInterval(() => void this.performAutoSync(), 10000);
	}

	private stopAutoSync(): void {
		if (this.autoSyncInterval) {
			clearInterval(this.autoSyncInterval);
			this.autoSyncInterval = null;
		}
		this.lastSyncHash = null;
	}

	private async createShareUrl(): Promise<void> {
		const generateButton = this.element.querySelector(".galbi-generate-button") as HTMLButtonElement | null;

		try {
			if (generateButton) {
				generateButton.disabled = true;
				this.setLoadingState(generateButton, true);
			}

			this.stopAutoSync();
			this.store.setState({ isAutoUpload: false, shareUrl: "" });
			this.store.clearAnonymousSession();
			await storageService.deleteShareSession(window.location.href);

			const response = await this.store.createAnonymousModel();
			const host = import.meta.env.VITE_BASE_URL || window.location.origin;
			const shareUrl = response.publicUrl ? `${host}/share/${response.publicUrl}` : "";

			this.store.setState({ shareUrl });

			if (shareUrl && response.publicUrl) {
				const modelData: StoredShareSession = {
					modelId: response.modelId,
					accessToken: response.accessToken,
					expiresAt: response.expiresAt,
					publicUrl: response.publicUrl,
				};
				await storageService.saveShareSession(window.location.href, modelData);
			}

			this.showNotification(i18n.t("generateUrl.success"), "success");
		} catch (error) {
			console.error("Generate URL error:", error);
			this.showNotification(i18n.t("generateUrl.error"), "error");
		} finally {
			if (generateButton) {
				generateButton.disabled = false;
				this.setLoadingState(generateButton, false);
			}
		}
	}

	private async loadStoredShareSession(): Promise<void> {
		try {
			const modelData = await storageService.getShareSession(window.location.href);
			if (!modelData?.publicUrl) {
				return;
			}

			const expiresAt = new Date(modelData.expiresAt).toISOString();
			if (new Date(expiresAt) <= new Date()) {
				await storageService.deleteShareSession(window.location.href);
				return;
			}

			const host = import.meta.env.VITE_BASE_URL || window.location.origin;
			this.store.setState({
				shareUrl: `${host}/share/${modelData.publicUrl}`,
			});
			this.store.setAnonymousSession({
				modelId: modelData.modelId,
				accessToken: modelData.accessToken,
				expiresAt,
				publicUrl: modelData.publicUrl,
			});
		} catch (error) {
			console.error("Stored share session load error:", error);
		}
	}

	private formatExpiresAt(expiresAt: string): string {
		return new Intl.DateTimeFormat(undefined, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date(expiresAt));
	}
}
