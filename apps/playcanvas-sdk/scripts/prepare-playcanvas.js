import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

async function preparePlayCanvasDistribution() {
	try {
		await mkdir(resolve("dist", "playcanvas"), { recursive: true });
		await copyFile(resolve("dist", "galbi.es.mjs"), resolve("dist", "playcanvas", "galbi.mjs"));

		console.log("Prepared PlayCanvas distribution:");
		console.log("1. Upload dist/playcanvas/galbi.mjs to your project");
		console.log("2. Import in your script:");
		console.log('   import { Galbi } from "./galbi.mjs";');
		console.log("   const galbi = new Galbi({ ... });");
	} catch (error) {
		console.error("Error preparing PlayCanvas bundle:", error);
		process.exit(1);
	}
}

preparePlayCanvasDistribution();
