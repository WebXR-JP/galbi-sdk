"""UIパネル"""

import bpy


class GALBI_PT_main(bpy.types.Panel):
    """Galbiメインパネル"""

    bl_label = "Galbi"
    bl_idname = "GALBI_PT_main"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "Galbi"

    def draw(self, context):
        layout = self.layout
        galbi = context.scene.galbi
        prefs = context.preferences.addons[__package__].preferences

        # --- サーバー ---
        box = layout.box()
        box.label(text="サーバー", icon="WORLD")
        box.prop(prefs, "server_mode", expand=True)
        if prefs.server_mode == "LOCAL":
            box.prop(prefs, "local_url", text="URL")

        # --- エクスポート設定 ---
        box = layout.box()
        box.label(text="エクスポート", icon="EXPORT")
        box.prop(galbi, "use_selection", text="選択オブジェクトのみ")
        box.prop(galbi, "auto_sync", text="自動同期")
        row = box.row()
        row.enabled = galbi.auto_sync
        row.prop(galbi, "sync_interval", text="間隔")

        has_url = bool(galbi.public_url)
        is_busy = galbi.status in {"EXPORTING", "CREATING", "UPLOADING"}

        # --- URL生成 (常に表示) ---
        row = layout.row(align=True)
        row.enabled = not is_busy
        if not has_url:
            row.scale_y = 1.5
            row.operator("galbi.generate_url", text="URLを生成", icon="URL")
            col = layout.column()
            col.scale_y = 0.7
            col.label(text="まずURLを生成して共有を始めましょう", icon="INFO")
        else:
            row.operator("galbi.generate_url", text="URLを再生成", icon="FILE_NEW")

            # --- URL表示 ---
            url_box = layout.box()
            url_box.label(text="共有URL:", icon="LINKED")

            url_text = galbi.public_url
            if len(url_text) > 45:
                url_text = url_text[:42] + "..."
            url_box.label(text=url_text)

            row = url_box.row(align=True)
            row.operator("galbi.copy_url", text="URLをコピー", icon="COPYDOWN")

            row = url_box.row(align=True)
            row.operator("galbi.open_url", text="Webで確認", icon="URL")
            row.operator("galbi.open_vrchat", text="VRChatで確認", icon="PLAY")

            # --- 同期コントロール ---
            row = layout.row(align=True)
            row.scale_y = 1.5
            if galbi.is_syncing:
                row.operator("galbi.stop_sync", text="同期を停止", icon="PAUSE")
            elif galbi.auto_sync:
                row.enabled = not is_busy
                row.operator("galbi.start_sync", text="同期を開始", icon="FILE_REFRESH")
            else:
                row.enabled = not is_busy
                row.operator("galbi.manual_sync", text="今すぐ同期", icon="FILE_REFRESH")

        # --- ステータス ---
        if galbi.status not in {"READY", "DONE"}:
            row = layout.row()
            row.alignment = "CENTER"
            if galbi.status == "EXPORTING":
                row.label(text="エクスポート中...", icon="TIME")
            elif galbi.status == "CREATING":
                row.label(text="URL生成中...", icon="TIME")
            elif galbi.status == "UPLOADING":
                row.label(text="同期中...", icon="TIME")
            elif galbi.status == "SYNCING":
                row.label(text="同期中...", icon="FILE_REFRESH")
            elif galbi.status == "ERROR":
                row.label(text=galbi.error_message[:40], icon="ERROR")
        elif galbi.is_syncing:
            row = layout.row()
            row.alignment = "CENTER"
            row.label(text="自動同期中", icon="CHECKMARK")


def register():
    bpy.utils.register_class(GALBI_PT_main)


def unregister():
    bpy.utils.unregister_class(GALBI_PT_main)
