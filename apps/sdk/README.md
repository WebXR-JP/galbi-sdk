# @repo/sdk

PlayCanvas 向けの Galbi Web SDK です。

PlayCanvas 上のシーンやワールドを共有 URL に同期し、VRChat 側の確認フローへつなぐための機能を提供します。認証なしで URL を生成し、再同期や自動同期を行えるのが特徴です。

## 開発

このパッケージは Galbi モノレポの一部です。通常はリポジトリ root で次を実行すれば確認できます。

```bash
pnpm install
pnpm run dev
```

SDK の開発サーバーは `http://localhost:5174` で起動します。

## 使い方

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

### 主な API

| メソッド | 説明 |
|---|---|
| `start()` | SDK を初期化して UI を表示 |
| `stop()` | SDK を停止して UI を破棄 |
| `upload()` | 現在のシーンをサーバーへアップロード |
| `export()` | シーンを GLB として書き出し |
| `exportGltf()` | シーンを GLTF として書き出し |
| `exportStl()` | シーンを STL として書き出し |

### 状態

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

## ビルド

```bash
pnpm -F @repo/sdk build
```

### 生成物

| ファイル | 形式 | 説明 |
|---|---|---|
| `galbi.es.mjs` | ESM | モダンな実行環境や bundler 向け |
| `galbi.umd.js` | UMD | グローバル変数経由で使う構成向け |
| `galbi.css` | CSS | SDK 用スタイルシート |
| `types/index.d.ts` | DTS | TypeScript 型定義 |

### PlayCanvas Editor 向けビルド

```bash
pnpm -F @repo/sdk build:playcanvas
```

`dist/playcanvas/galbi.mjs` が生成され、PlayCanvas Editor にアップロードして使えます。

## 主なファイル

| ファイル | 役割 |
|---|---|
| `src/Galbi.ts` | SDK 本体と公開 API |
| `src/popup.ts` | ポップアップ UI と同期フロー |
| `src/store.ts` | 状態管理 |
| `src/galbi-gltf-exporter.ts` | GLTF / GLB 書き出し |
| `src/galbi-stl-exporter.ts` | STL 書き出し |
| `src/services/storage.service.ts` | IndexedDB への保存 |
| `src/i18n/` | 翻訳ファイル（ja / en / ko） |

## ライセンス

[MIT](../../LICENSE)
