# Galbi Blender Addon

[Galbi SDK](https://github.com/yushimatenjin/galbi-sdk) の Blender アドオンです。Blender 上の 3D モデルを GLB 形式でエクスポートし、Galbi サーバーへ同期して共有 URL を発行します。生成された URL から Web ブラウザや VRChat ワールドでモデルを確認できます。

外部 Python パッケージへの依存はなく、Blender 同梱の標準ライブラリのみで動作します。

## 動作環境

| 項目 | バージョン |
|------|-----------|
| Blender | 3.6 以降 |
| Python | Blender 同梱版（外部パッケージ不要） |

> Blender 4.x / 5.x で動作確認済み

## インストール

### zip からインストール（推奨）

1. [Releases](https://github.com/yushimatenjin/galbi-sdk/releases) から `galbi_addon.zip` をダウンロード、
   または [ビルド](#ビルド) で生成
2. Blender を起動 → **Edit → Preferences → Add-ons**
3. **Install from File** → `galbi_addon.zip` を選択
4. **Galbi** にチェックを入れて有効化

### 手動インストール

`galbi_addon/` ディレクトリを Blender のアドオンフォルダにコピーします。

| OS | パス |
|----|------|
| Windows | `%APPDATA%\Blender Foundation\Blender\<version>\scripts\addons\` |
| macOS | `~/Library/Application Support/Blender/<version>/scripts/addons/` |
| Linux | `~/.config/blender/<version>/scripts/addons/` |

コピー後、Blender を再起動して Preferences → Add-ons で **Galbi** を有効化してください。

## 使い方

### パネルを開く

3D Viewport で `N` キーを押してサイドバーを表示し、**Galbi** タブを選択します。

### サーバーを選択する

パネル上部のトグルボタンで接続先を切り替えます。

| ボタン | 接続先 |
|--------|--------|
| **galbi.yutt.net** | Galbi 公開サーバー（デフォルト） |
| **ローカル** | 自分で立てたローカルサーバー（URL を自由に設定可能） |

ローカルサーバーの起動方法はリポジトリルートの [README](https://github.com/yushimatenjin/galbi-sdk#readme) を参照してください。

### エクスポート設定

| 設定 | 説明 |
|------|------|
| 選択オブジェクトのみ | チェック時、選択中のオブジェクトだけをエクスポート |
| 自動同期 | 有効にすると指定間隔で自動的にモデルを同期 |
| 間隔 | 自動同期の間隔（5 秒 / 10 秒 / 30 秒 / 1 分） |

### URL を生成する

**「URL を生成」** ボタンを押すとサーバー上に共有枠が作成され、共有 URL が発行されます。URL はモデルの再同期を行っても変わりません。

### モデルを同期する

URL 生成後に同期ボタンが表示されます。

- **自動同期が有効** → **「同期を開始」** で設定間隔の自動同期が始まります
- **自動同期が無効** → **「今すぐ同期」** で 1 回だけ同期します

同期中は **「同期を停止」** で自動同期を停止できます。

### モデルを確認する

| ボタン | 動作 |
|--------|------|
| URL をコピー | 共有 URL をクリップボードにコピー |
| Web で確認 | ブラウザで共有ページを開く |
| VRChat で確認 | VRChat のビューワーワールドを起動 |

## ビルド

```bash
cd apps/blender-addon
python scripts/build.py
```

`dist/galbi_addon.zip` が生成されます。このファイルを Blender の **Install from File** で直接インストールできます。

## ファイル構成

```
apps/blender-addon/
├── galbi_addon/
│   ├── __init__.py        # アドオン登録・bl_info
│   ├── api_client.py      # tRPC HTTP クライアント（urllib のみ）
│   ├── exporter.py        # GLB エクスポート → base64 変換
│   ├── operators.py       # Blender オペレーター
│   ├── panels.py          # サイドバー UI
│   ├── preferences.py     # アドオン設定（サーバー切り替え）
│   ├── state.py           # PropertyGroup による状態管理
│   └── i18n.py            # 多言語対応（日本語 / 英語）
├── scripts/
│   └── build.py           # zip パッケージ生成
├── LICENSE                # MIT License
├── .gitignore
└── README.md
```

## 技術詳細

### API 通信

Galbi API（tRPC v11）に対して `urllib.request` で HTTP リクエストを送信します。

**フロー:**

1. `createAnonymousModel` — 共有枠を作成し `modelId` / `accessToken` / `publicUrl` を取得
2. `uploadModel` — GLB（base64）をアップロード

### 非ブロッキング処理

UI をフリーズさせないため、API 通信は `threading.Thread` で実行し、`modal` オペレーター + `event_timer` でメインスレッドからポーリングしています。Blender API へのアクセスはすべてメインスレッドで行います。

### GLB エクスポート

`bpy.ops.export_scene.gltf()` で一時ファイルに GLB を書き出し、base64 エンコードして API に送信します。一時ファイルはエクスポート後に自動削除されます。

## 開発

Galbi SDK モノレポの一部として開発されています。ローカルでの開発手順はリポジトリルートの [README](https://github.com/yushimatenjin/galbi-sdk#readme) を参照してください。

ローカルサーバーを起動してアドオンのテストを行う場合:

```bash
# リポジトリルートで
pnpm dev
```

API が `http://localhost:3001` で起動するので、アドオンのサーバー設定を **ローカル** に切り替えて使用します。

## ライセンス

[MIT](./LICENSE)
