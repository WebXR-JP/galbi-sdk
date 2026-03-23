# Galbi SDK

Galbi SDK は PlayCanvas 上のシーンを匿名 URL に同期するための軽量アップロードツールです。

## 現在の仕様

- ログイン機能はありません
- URL を生成すると匿名モデルが作成されます
- 生成済み URL に対して手動同期または自動同期ができます
- GLTF / STL のエクスポートもポップアップから実行できます

## 基本フロー

1. `URLを生成` を押して共有 URL を発行する
2. `同期する` で現在のシーンをアップロードする
3. 必要なら `自動同期` を有効にして変更を継続反映する

## 状態

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

## 主要ファイル

- `src/Galbi.ts`: SDK の公開 API
- `src/popup.ts`: ポップアップ UI と同期フロー
- `src/store.ts`: 匿名アップロード状態の保持
- `src/services/storage.service.ts`: IndexedDB への URL 保存
