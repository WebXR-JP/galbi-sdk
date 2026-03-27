# Galbi

Galbi は、VRChat 向けのワールド制作で「毎回アップロードせずに確認したい」という課題を軽くするためのツール集です。

制作途中の 3D データを共有 URL に同期し、VRChat の確認用ワールドから見た目を確認できるようにすることで、修正と確認の往復を速くします。

## 何ができるのか

- 制作途中のデータを URL ベースで共有できる
- 同じ URL のまま中身だけ再同期できる
- VRChat に正式アップロードする前の状態を確認できる
- PlayCanvas と Blender の 2 つのワークフローに対応している

## 対応しているワークフロー

| ソース | 確認先 | 概要 | テクスチャ対応 | 参照先 |
|---|---|---|---|---|
| PlayCanvas | VRChat | PlayCanvas で作ったワールドやシーンを共有・再同期して確認 | 対応 | [ドキュメントサイト](https://galbi-sdk-docs.pages.dev/) |
| Blender | VRChat | Blender で作った 3D モデルを Addon から送信して確認 | 未対応 | [Blender Addon README](./apps/blender-addon/README.md) |

## VRChat 側で確認する方法

Galbi で共有したデータは、確認用ワールドからそのまま見た目を確認できます。

- 確認用ワールド: [Galbi Viewer World](https://vrchat.com/home/launch?worldId=wrld_068ed758-68b1-40bc-b647-f54c3b3d92fc)
- 自分のワールドに組み込みたい場合: [GLB Loader](https://booth.pm/ja/items/6279803) / [GitHub](https://github.com/vr-voyage/vrchat-glb-loader)

`GLB Loader` を導入すると、Galbi の共有 URL を使うワークフローを自分の VRChat ワールド側に組み込めます。検証用ワールドを使うだけでなく、自分の確認環境に合わせて運用したい場合はこちらを使ってください。

## PlayCanvas -> VRChat

PlayCanvas 側のワークフローでは、シーンやワールドを編集しながら共有 URL を発行し、同じ URL に対して更新を反映していきます。

流れはシンプルです。

1. PlayCanvas でシーンを編集する
2. Galbi SDK で共有 URL を生成する
3. 同じ URL に対して再同期する
4. VRChat の確認用ワールドから見た目を確認する

PlayCanvas 側はテクスチャを含めた確認フローを前提にしています。導入や使い方は [ドキュメントサイト](https://galbi-sdk-docs.pages.dev/) を参照してください。VRChat 側では確認用ワールドまたは `GLB Loader` を導入した自分のワールドで確認できます。

## Blender -> VRChat

Blender 側のワークフローでは、3D モデルを Addon から送信し、VRChat 側で確認します。

1. Blender でモデルを編集する
2. Galbi Blender Addon で共有 URL を生成する
3. GLB を再同期する
4. VRChat の確認用ワールドから見た目を確認する

Blender Addon は現在、画像テクスチャのエクスポートには未対応です。形状とマテリアル値の確認を優先したフローになっています。詳しくは [Blender Addon README](./apps/blender-addon/README.md) を参照してください。

## このプロジェクトの強み

- VRChat 向けの確認フローに目的を絞っている
- PlayCanvas と Blender の両方をカバーしている
- 共有 URL を固定したまま更新を反映できる
- SDK、Blender Addon、API、DB、ドキュメントが一式そろっている

## まず知っておいてほしいこと

- 認証機能はありません
- 共有は匿名 URL ベースです
- PlayCanvas と Blender は別ワークフローです
- Blender Addon では画像テクスチャのエクスポートはまだ未対応です
- PlayCanvas Editor へのアップロード自動化はまだ入っていません

## 含まれるもの

`apps` には利用者が直接触る成果物を、`packages` には内部基盤や共有設定を置いています。

```text
apps/
  blender-addon/      Blender Addon
  playcanvas-sdk/     PlayCanvas 向け Web SDK
  playcanvas-docs/    PlayCanvas 向けドキュメントサイト

packages/
  api/                Cloudflare Workers API
  database/           Cloudflare D1 / Prisma
  config/             共有設定
```

## はじめかた

必要なもの:

- Node.js 18 以上
- pnpm 9 以上
- Wrangler CLI 4 以上
- Blender 3.6 以上（Blender Addon を使う場合）

インストール:

```bash
pnpm install
```

`pnpm install` の完了時にローカル D1 の初期化まで実行されます。通常はそのままで問題ありません。

必要に応じて環境変数ファイルを作成します。

```bash
cp packages/api/.dev.vars.example packages/api/.dev.vars
cp apps/playcanvas-sdk/.env.example apps/playcanvas-sdk/.env.local
```

確認は基本的にこれだけです。

```bash
pnpm run dev
```

これで API / Database / PlayCanvas SDK / PlayCanvas Docs がまとめて起動し、ローカルで動作確認できます。

## PlayCanvas 向け SDK

PlayCanvas 側の導入と使い方は [ドキュメントサイト](https://galbi-sdk-docs.pages.dev/) を参照してください。ローカル確認は root で `pnpm run dev` を実行すれば進められます。

## Blender Addon

インストール:

- [Releases](https://github.com/yushimatenjin/galbi-sdk/releases) から `galbi_addon.zip` を取得
- Blender の `Install from File` から導入

ローカルでビルドしたい場合:

```bash
cd apps/blender-addon
python scripts/build.py
```

`apps/blender-addon/dist/galbi_addon.zip` が生成されます。

制限事項:

- 画像テクスチャは現在エクスポート対象外です
- 形状とマテリアル値の確認を優先したフローです

## 関連 README

- [apps/playcanvas-sdk/README.md](./apps/playcanvas-sdk/README.md)
- [apps/playcanvas-docs/README.md](./apps/playcanvas-docs/README.md)
- [apps/blender-addon/README.md](./apps/blender-addon/README.md)

## ライセンス

[MIT](./LICENSE)
