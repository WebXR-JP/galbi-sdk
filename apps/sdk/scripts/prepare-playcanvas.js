import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

async function preparePlayCanvasBundle() {
	try {
		// PlayCanvas用のディレクトリを作成
		await mkdir(resolve("dist", "playcanvas"), { recursive: true });

		// ESMビルドをコピー
		await copyFile(resolve("dist", "galbi.es.mjs"), resolve("dist", "playcanvas", "galbi.mjs"));

		console.log("PlayCanvas bundle prepared successfully!");
		console.log("Usage in PlayCanvas:");
		console.log("1. Upload dist/playcanvas/galbi.mjs to your project");
		console.log("2. Import in your script:");
		console.log('   import { Galbi } from "./galbi.mjs";');
		console.log("   const galbi = new Galbi();");
	} catch (error) {
		console.error("Error preparing PlayCanvas bundle:", error);
		process.exit(1);
	}
}

preparePlayCanvasBundle();
