# Galbi Blender Addon

Blender から 3D モデルを GLB として書き出し、Galbi の共有 URL に同期するための Addon です。Blender 上で共有 URL の作成、再同期、VRChat での確認に加え、Meta Quest の Web Launch 経由で Meta Browser を開けます。

外部の Python パッケージは不要で、Blender に同梱されている標準ライブラリだけで動作します。

## 動作要件

| 項目 | バージョン |
|---|---|
| Blender | 3.6 以上（4.x / 5.x で確認） |
| Python | Blender 同梱版 |
| Meta Quest 連携 | HTTPS で公開された共有 URL |

## インストール

### zip から導入する場合

1. [Releases](https://github.com/yushimatenjin/galbi-sdk/releases) から `galbi_addon.zip` を取得する
2. Blender で `Edit -> Preferences -> Add-ons` を開く
3. `Install from File` を押して `galbi_addon.zip` を選ぶ
4. `Galbi` Addon を有効にする

### 手動で導入する場合

`galbi_addon/` ディレクトリを Blender の addons フォルダへ配置します。

| OS | パス |
|---|---|
| Windows | `%APPDATA%\\Blender Foundation\\Blender\\<version>\\scripts\\addons\\` |
| macOS | `~/Library/Application Support/Blender/<version>/scripts/addons/` |
| Linux | `~/.config/blender/<version>/scripts/addons/` |

その後 Blender を再起動し、Preferences から `Galbi` を有効にしてください。

## 使い方

### パネルを開く

3D Viewport で `N` キーを押し、サイドバーの `Galbi` タブを開きます。

### サーバーを選ぶ

パネル上部で接続先を切り替えられます。

| ボタン | 接続先 |
|---|---|
| **Local** | ローカル開発サーバー（既定: `http://127.0.0.1:3001`） |
| **galbi.yutt.net** | 公開サーバー |

### Meta Quest で開く条件

`Questで確認` は Meta の Web Launch を開くボタンです。共有 URL が `https://...` である必要があります。

- `galbi.yutt.net` を使っている場合はそのまま利用できます
- `Local` など `http://...` の URL は Quest 用では開けません

### エクスポート設定

| 項目 | 説明 |
|---|---|
| Selected objects only | 選択中のオブジェクトだけを書き出す |
| Auto-sync | 一定間隔で自動再同期する |
| Interval | 自動同期の間隔（5s / 10s / 30s / 1m） |

### ワークフロー

1. `Generate URL` で共有 URL を作成する
2. `Sync` または `Start Sync` でモデルをアップロードする
3. URL をコピーするか、ブラウザ・Meta Quest・VRChat で確認する

`Questで確認` を押すと、Meta の Web Launch ページを開き、`https://galbi.yutt.net/share/...` のような共有 URL を Meta Browser で開ける状態にします。

## 制限事項

- 画像テクスチャのエクスポートは未対応です
- 形状とマテリアル値の確認を優先したフローです

## ビルド

```bash
cd apps/blender-addon
python scripts/build.py
```

`dist/galbi_addon.zip` が生成され、Blender の `Install from File` から導入できます。

## 技術的な補足

### API 通信

Galbi の tRPC API と `urllib.request` で通信します。外部 HTTP ライブラリは使っていません。

主な流れ:

1. `anonymous.createAnonymousModel` で共有先のモデルスロットを作成
2. `anonymous.uploadModel` で base64 化した GLB をアップロード

### Blender UI を止めない設計

API 呼び出しは `threading.Thread` で実行し、結果の取得は `modal` operator と `event_timer` でメインスレッド側に戻しています。これにより Blender UI を固めずに同期できます。

### GLB 書き出し

`bpy.ops.export_scene.gltf()` で一時 GLB を書き出し、base64 化して送信したあと、一時ファイルを自動で削除します。

## ファイル構成

```text
apps/blender-addon/
├── galbi_addon/
│   ├── __init__.py        # Addon 登録と bl_info
│   ├── api_client.py      # tRPC HTTP クライアント
│   ├── exporter.py        # GLB 書き出しと base64 化
│   ├── operators.py       # Blender Operator 群
│   ├── panels.py          # サイドバー UI
│   ├── preferences.py     # Addon 設定
│   ├── state.py           # PropertyGroup 状態管理
│   └── i18n.py            # 翻訳（ja / en）
├── scripts/
│   └── build.py           # zip ビルド
├── LICENSE
├── .gitignore
└── README.md
```

## 開発

この Addon は Galbi モノレポの一部です。ローカル環境で確認する場合は root で次を実行してください。

```bash
pnpm run dev
```

API は `http://localhost:3001` で起動します。Addon 側の接続先を `Local` に切り替えて使います。

## ライセンス

[MIT](./LICENSE)
