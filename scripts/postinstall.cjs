const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

if (process.env.SKIP_LOCAL_D1_SETUP === "1") {
	console.log("[postinstall] Skipping local D1 setup because SKIP_LOCAL_D1_SETUP=1");
	process.exit(0);
}

const repoRoot = path.resolve(__dirname, "..");
const databaseDir = path.join(repoRoot, "packages", "database");
const wranglerBinaryName = process.platform === "win32" ? "wrangler.cmd" : "wrangler";
const wranglerCandidates = [
	path.join(repoRoot, "node_modules", ".bin", wranglerBinaryName),
	path.join(databaseDir, "node_modules", ".bin", wranglerBinaryName),
];
const wranglerCommand = wranglerCandidates.find(candidate => fs.existsSync(candidate));
const wranglerArgs = ["d1", "migrations", "apply", "galbi-database", "--local"];

if (!wranglerCommand) {
	console.log("[postinstall] Wrangler is not installed. Skipping local D1 setup.");
	process.exit(0);
}

const result = spawnSync(wranglerCommand, wranglerArgs, {
	cwd: databaseDir,
	stdio: "inherit",
	shell: process.platform === "win32",
});

if (result.error) {
	console.error("[postinstall] Failed to start local D1 setup.", result.error);
	process.exit(1);
}

process.exit(result.status ?? 1);
