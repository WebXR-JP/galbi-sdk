import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/Galbi.ts"),
			name: "Galbi",
			formats: ["es", "umd"],
			fileName: format => (format === "es" ? `galbi.${format}.mjs` : `galbi.${format}.js`),
			cssFileName: "galbi",
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
				banner: "/* Galbi Tools - MIT License */",
				footer: "/* Visit https://github.com/yushimatenjin/galbi-sdk for more information */",
			},
		},
		cssCodeSplit: false,
		outDir: "dist",
		emptyOutDir: true,
		target: "esnext",
	},

	server: {
		port: 5174,
		host: true,
		open: true,
		proxy: {
			"/share": {
				target: "http://127.0.0.1:3001",
				changeOrigin: true,
			},
		},
	},
});
