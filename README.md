# Galbi SDK Monorepo

WebXR・3D コンテンツ向けのリアルタイムチャット＆インタラクション SDK。

## プロジェクト構成

```text
apps/
  sdk/                Web SDK（Vite ライブラリビルド・React・PlayCanvas）
  docs/               ドキュメント（VitePress）

packages/
  api/                API（Cloudflare Workers + Hono + tRPC）
  database/           DB レイヤー（Cloudflare D1 + Prisma 7）
  typescript-config/  共有 TypeScript 設定
```

## 前提条件

- [Node.js](https://nodejs.org/) v18 以上
- [pnpm](https://pnpm.io/) v9 以上
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) v4 以上

## セットアップ

```bash
pnpm install
```

`pnpm install` の完了時に `wrangler d1 migrations apply --local` が自動実行され、ローカル D1 の初期化まで行います。

DB スキーマの定義源は `packages/database/prisma/schema.prisma` です。
Wrangler 用 SQL は次で再生成できます:

```bash
pnpm -F @repo/database db:migrate:from-schema
```

スキップする場合:

```bash
SKIP_LOCAL_D1_SETUP=1 pnpm install
```

### 環境変数

```bash
cp packages/api/.dev.vars.example packages/api/.dev.vars
cp apps/sdk/.env.example apps/sdk/.env.local
```

`.dev.vars` を編集し、OIDC 関連の値を設定してください。

## 開発

```bash
pnpm dev
```

各サービスが以下のポートで起動します:

| サービス | ポート | 説明 |
|----------|--------|------|
| Database | 3002 | D1 Worker（Prisma） |
| API | 3001 | Hono + tRPC |
| SDK | 5174 | Vite 開発サーバー |
| Docs | 5175 | VitePress |

## ビルド

```bash
pnpm build         # 全パッケージビルド
pnpm check         # biome check（format + lint）
pnpm test          # テスト実行
```

### SDK ビルド出力

`pnpm -F @repo/sdk build` で以下が生成されます:

```text
apps/sdk/dist/
  galbi.es.mjs      ESM（バンドラー・モダン環境向け）
  galbi.umd.js      UMD（CommonJS・グローバル変数向け）
  galbi.css          スタイルシート（Tailwind CSS）
  types/Galbi.d.ts   TypeScript 型定義
```

### PlayCanvas 向けビルド

```bash
pnpm -F @repo/sdk build:playcanvas
```

`dist/playcanvas/galbi.mjs` が生成されます。PlayCanvas エディタにアップロードして使用できます。

## ワークスペース別コマンド

```bash
# API
pnpm -F @repo/api dev
pnpm -F @repo/api deploy
pnpm -F @repo/api test

# SDK
pnpm -F @repo/sdk dev
pnpm -F @repo/sdk build
pnpm -F @repo/sdk build:playcanvas

# Docs
pnpm -F @repo/docs dev
pnpm -F @repo/docs deploy

# Database
pnpm -F @repo/database dev
pnpm -F @repo/database db:generate
pnpm -F @repo/database db:migrate:from-schema
pnpm -F @repo/database db:migrate:local
pnpm -F @repo/database db:migrate:remote
```

## ライセンス

[MIT](./LICENSE)
