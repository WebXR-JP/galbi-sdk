# @repo/playcanvas-docs

Galbi の PlayCanvas 向けドキュメントサイトです。VitePress で構成されており、セットアップ手順、利用方法、ワールド制作向けガイドをまとめています。

## 開発

通常はリポジトリ root で `pnpm run dev` を実行すればまとめて確認できます。ドキュメントだけを起動したい場合は次を使います。

```bash
pnpm -F @repo/playcanvas-docs dev
```

開発サーバーは `http://localhost:5175` で起動します。

## ビルドとデプロイ

```bash
pnpm -F @repo/playcanvas-docs build
pnpm -F @repo/playcanvas-docs deploy
```

## ディレクトリ構成

```text
.vitepress/
  config.ts         VitePress 設定

guide/              日本語ドキュメント
en/guide/           英語ドキュメント
ko/guide/           韓国語ドキュメント
```

### 主な内容

- 基本的な使い方
- 環境構築
- ワールド制作の流れ
- VRChat での確認方法
- Blender / PlayCanvas まわりの補足

## 新しい言語を追加する場合

1. 追加したいロケールのディレクトリを作成する
2. `.vitepress/config.ts` にロケール設定を追加する
3. 対象の Markdown を翻訳する

## ライセンス

[MIT](../../LICENSE)
