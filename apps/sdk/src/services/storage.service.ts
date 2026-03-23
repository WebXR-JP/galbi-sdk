export interface ModelData {
	modelId: string;
	accessToken: string;
	expiresAt: string;
	publicUrl?: string;
}

class StorageService {
	private readonly DB_NAME = "galbi-sdk";
	private readonly STORE_NAME = "model-data";
	private readonly DB_VERSION = 1;

	private async openDB(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve(request.result);

			request.onupgradeneeded = event => {
				const db = (event.target as IDBOpenDBRequest).result;
				if (!db.objectStoreNames.contains(this.STORE_NAME)) {
					db.createObjectStore(this.STORE_NAME);
				}
			};
		});
	}

	async saveModelData(url: string, data: ModelData): Promise<void> {
		const db = await this.openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.STORE_NAME, "readwrite");
			const store = transaction.objectStore(this.STORE_NAME);
			const request = store.put(data, url);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve();
		});
	}

	async getModelData(url: string): Promise<ModelData | null> {
		const db = await this.openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.STORE_NAME, "readonly");
			const store = transaction.objectStore(this.STORE_NAME);
			const request = store.get(url);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve(request.result || null);
		});
	}

	async deleteModelData(url: string): Promise<void> {
		const db = await this.openDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.STORE_NAME, "readwrite");
			const store = transaction.objectStore(this.STORE_NAME);
			const request = store.delete(url);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve();
		});
	}
}

export const storageService = new StorageService();
