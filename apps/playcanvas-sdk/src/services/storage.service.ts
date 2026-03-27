export interface StoredShareSession {
	modelId: string;
	accessToken: string;
	expiresAt: string;
	publicUrl?: string;
}

class StorageService {
	private readonly dbName = "galbi-sdk";
	private readonly storeName = "model-data";
	private readonly dbVersion = 1;

	private async openDatabase(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, this.dbVersion);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve(request.result);

			request.onupgradeneeded = event => {
				const db = (event.target as IDBOpenDBRequest).result;
				if (!db.objectStoreNames.contains(this.storeName)) {
					db.createObjectStore(this.storeName);
				}
			};
		});
	}

	async saveShareSession(pageUrl: string, data: StoredShareSession): Promise<void> {
		const db = await this.openDatabase();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.storeName, "readwrite");
			const store = transaction.objectStore(this.storeName);
			const request = store.put(data, pageUrl);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve();
		});
	}

	async getShareSession(pageUrl: string): Promise<StoredShareSession | null> {
		const db = await this.openDatabase();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.storeName, "readonly");
			const store = transaction.objectStore(this.storeName);
			const request = store.get(pageUrl);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve(request.result || null);
		});
	}

	async deleteShareSession(pageUrl: string): Promise<void> {
		const db = await this.openDatabase();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(this.storeName, "readwrite");
			const store = transaction.objectStore(this.storeName);
			const request = store.delete(pageUrl);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => resolve();
		});
	}
}

export const storageService = new StorageService();
