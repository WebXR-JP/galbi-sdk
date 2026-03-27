"""Internationalization support for the Galbi Blender Addon."""

import bpy

TRANSLATIONS = {
    "ja_JP": {
        ("*", "Galbi"): "Galbi",
        ("*", "Share 3D Model"): "3Dモデルを共有",
        ("*", "Share"): "共有",
        ("*", "Share Selected"): "選択を共有",
        ("*", "Share Scene"): "シーンを共有",
        ("*", "Copy URL"): "URLをコピー",
        ("*", "Open in Browser"): "ブラウザで開く",
        ("*", "Server URL"): "サーバーURL",
        ("*", "Galbi server URL"): "Galbiサーバーの URL",
        ("*", "Status"): "ステータス",
        ("*", "Ready"): "準備完了",
        ("*", "Exporting GLB..."): "GLBをエクスポート中...",
        ("*", "Creating model..."): "モデルを作成中...",
        ("*", "Uploading..."): "アップロード中...",
        ("*", "Done!"): "完了！",
        ("*", "Error"): "エラー",
        ("*", "Share URL:"): "共有URL:",
        ("*", "No URL generated yet"): "URLはまだ生成されていません",
        ("*", "Export Target"): "エクスポート対象",
        ("*", "Selected Only"): "選択オブジェクトのみ",
        ("*", "Entire Scene"): "シーン全体",
        ("*", "Export only selected objects"): "選択したオブジェクトのみエクスポート",
        ("*", "Model shared successfully!"): "モデルの共有に成功しました！",
        ("*", "Failed to share model"): "モデルの共有に失敗しました",
        ("*", "URL copied to clipboard"): "URLをクリップボードにコピーしました",
        ("*", "No URL to copy"): "コピーするURLがありません",
        ("*", "No URL to open"): "開くURLがありません",
        ("*", "Connection error"): "接続エラー",
        ("*", "Server error"): "サーバーエラー",
        ("*", "Timeout"): "タイムアウト",
    },
}


def register():
    bpy.app.translations.register(__package__, TRANSLATIONS)


def unregister():
    bpy.app.translations.unregister(__package__)
