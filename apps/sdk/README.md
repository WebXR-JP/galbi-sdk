# @repo/sdk

Web SDK for real-time 3D model sharing via PlayCanvas.

## Overview

A lightweight library that adds instant model-sharing capabilities to any PlayCanvas application. Users can generate a shareable URL, sync their scene, and optionally enable auto-sync — all without authentication.

## Installation

This package is part of the Galbi SDK monorepo. From the repository root:

```bash
pnpm install
pnpm -F @repo/sdk dev
```

The dev server starts at `http://localhost:5174`.

## Usage

```ts
import { Galbi } from "@repo/sdk";

const galbi = new Galbi({
  container: document.getElementById("app"),
  app: playcanvasApp,
  entity: rootEntity,
  exporters: { gltf: gltfExporter, stl: stlExporter },
  lang: "en", // "ja" | "en" | "ko"
});

galbi.start();
```

### Core API

| Method         | Description                              |
|----------------|------------------------------------------|
| `start()`      | Initialize the SDK and render UI         |
| `stop()`       | Tear down the SDK                        |
| `upload()`     | Upload the current scene to the server   |
| `export()`     | Export scene as GLB                      |
| `exportGltf()` | Export scene as GLTF                     |
| `exportStl()`  | Export scene as STL                      |

### State

```ts
interface GalbiState {
  isAutoUpload: boolean;
  uploadUrl: string;
  isAnonymous: boolean;
  anonymousToken?: string;
  anonymousModelId?: string;
  anonymousExpiresAt?: string;
  isLoading: boolean;
}
```

## Build

```bash
pnpm -F @repo/sdk build
```

### Output

| File               | Format | Description                     |
|--------------------|--------|---------------------------------|
| `galbi.es.mjs`     | ESM    | For bundlers & modern runtimes  |
| `galbi.umd.js`     | UMD    | CommonJS & global variable      |
| `galbi.css`        | CSS    | Tailwind CSS stylesheet         |
| `types/index.d.ts` | DTS    | TypeScript type definitions     |

### PlayCanvas Editor Build

```bash
pnpm -F @repo/sdk build:playcanvas
```

Produces `dist/playcanvas/galbi.mjs` for upload to the PlayCanvas Editor.

## Key Files

| File                              | Purpose                          |
|-----------------------------------|----------------------------------|
| `src/Galbi.ts`                    | Main SDK class & public API      |
| `src/popup.ts`                    | Popup UI & sync flow             |
| `src/store.ts`                    | State management                 |
| `src/galbi-gltf-exporter.ts`     | GLTF/GLB export                  |
| `src/galbi-stl-exporter.ts`      | STL export                       |
| `src/services/storage.service.ts` | IndexedDB persistence            |
| `src/i18n/`                       | Translations (ja, en, ko)        |

## License

[MIT](../../LICENSE)
