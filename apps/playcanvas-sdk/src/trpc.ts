import type { AppRouter } from "@repo/api";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${import.meta.env.VITE_BASE_URL ?? ""}/share/trpc`,
			headers() {
				return {};
			},
			fetch(url, options) {
				return fetch(url, options).catch(error => {
					console.error("tRPC Error:", error);
					throw error;
				});
			},
		}),
	],
});
