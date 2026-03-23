export function generatePublicUrl(): string {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const length = 10;
	const bytes = new Uint8Array(length);
	crypto.getRandomValues(bytes);

	return Array.from(bytes, (byte) => characters[byte % characters.length]).join(
		"",
	);
}
