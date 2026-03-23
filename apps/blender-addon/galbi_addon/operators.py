"""Blenderオペレーター"""

import threading
import webbrowser

import bpy

from . import api_client, exporter, preferences


# ---------------------------------------------------------------------------
# エラーポップアップ
# ---------------------------------------------------------------------------

class GALBI_OT_popup_error(bpy.types.Operator):
    """エラーポップアップを表示"""

    bl_idname = "galbi.popup_error"
    bl_label = "エラー"
    bl_options = {"INTERNAL"}

    message: bpy.props.StringProperty()

    def execute(self, context):
        return {"FINISHED"}

    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self, width=400)

    def draw(self, context):
        layout = self.layout
        layout.label(text="エラーが発生しました", icon="ERROR")
        layout.separator()
        box = layout.box()
        col = box.column(align=True)
        words = self.message.split()
        line = ""
        for word in words:
            if len(line) + len(word) + 1 > 50:
                col.label(text=line)
                line = word
            else:
                line = f"{line} {word}".strip()
        if line:
            col.label(text=line)


# ---------------------------------------------------------------------------
# ステップ1: URL生成
# ---------------------------------------------------------------------------

class GALBI_OT_generate_url(bpy.types.Operator):
    """共有URLを生成する"""

    bl_idname = "galbi.generate_url"
    bl_label = "URLを生成"
    bl_description = "新しい共有URLを生成します"

    _timer = None
    _thread = None
    _thread_done = False
    _thread_error = None
    _result = None

    def _run_create(self, server_url):
        try:
            client = api_client.GalbiAPIClient(server_url)
            result = client.create_anonymous_model()
            self._result = {
                "model_id": result["modelId"],
                "access_token": result["accessToken"],
                "public_url": result.get("publicUrl", ""),
                "share_url": f"{server_url}/share/{result.get('publicUrl', '')}",
            }
            self._thread_done = True
        except Exception as exc:
            self._thread_error = str(exc)
            self._thread_done = True

    def modal(self, context, event):
        if event.type != "TIMER":
            return {"PASS_THROUGH"}

        galbi = context.scene.galbi

        if not self._thread_done:
            return {"PASS_THROUGH"}

        wm = context.window_manager
        wm.event_timer_remove(self._timer)

        if self._thread_error:
            galbi.status = "ERROR"
            galbi.error_message = self._thread_error
            self.report({"ERROR"}, f"URL生成に失敗しました: {self._thread_error}")
            return {"FINISHED"}

        result = self._result
        galbi.status = "DONE"
        galbi.public_url = result["share_url"]
        galbi.model_id = result["model_id"]
        galbi.access_token = result["access_token"]
        galbi.error_message = ""
        self.report({"INFO"}, f"URLを生成しました: {result['share_url']}")
        return {"FINISHED"}

    def invoke(self, context, event):
        galbi = context.scene.galbi

        # 再生成時は同期を停止
        if galbi.is_syncing:
            galbi.is_syncing = False

        galbi.public_url = ""
        galbi.model_id = ""
        galbi.access_token = ""
        galbi.status = "CREATING"

        server_url = preferences.get_server_url(context)
        self._thread_done = False
        self._thread_error = None
        self._result = None

        self._thread = threading.Thread(
            target=self._run_create,
            args=(server_url,),
            daemon=True,
        )
        self._thread.start()

        wm = context.window_manager
        self._timer = wm.event_timer_add(0.1, window=context.window)
        wm.modal_handler_add(self)
        return {"RUNNING_MODAL"}


# ---------------------------------------------------------------------------
# ステップ2: 同期開始 (初回同期 + 自動同期ループ)
# ---------------------------------------------------------------------------

class GALBI_OT_start_sync(bpy.types.Operator):
    """モデルの同期を開始する"""

    bl_idname = "galbi.start_sync"
    bl_label = "同期を開始"
    bl_description = "モデルの同期を開始します"

    _timer = None
    _thread = None
    _thread_done = False
    _thread_error = None

    def _run_sync(self, server_url, model_id, access_token, scene_name, glb_base64):
        try:
            client = api_client.GalbiAPIClient(server_url)
            client.upload_model(model_id, access_token, f"{scene_name}.glb", glb_base64)
            self._thread_done = True
        except Exception as exc:
            self._thread_error = str(exc)
            self._thread_done = True

    def modal(self, context, event):
        if event.type != "TIMER":
            return {"PASS_THROUGH"}

        galbi = context.scene.galbi

        if not self._thread_done:
            return {"PASS_THROUGH"}

        wm = context.window_manager
        wm.event_timer_remove(self._timer)

        if self._thread_error:
            galbi.status = "ERROR"
            galbi.error_message = self._thread_error
            self.report({"ERROR"}, f"同期に失敗しました: {self._thread_error}")
            return {"FINISHED"}

        galbi.status = "DONE"
        galbi.error_message = ""
        galbi.is_syncing = True
        self.report({"INFO"}, "同期を開始しました")

        # 自動同期が有効ならループ開始
        if galbi.auto_sync:
            bpy.ops.galbi.auto_sync("INVOKE_DEFAULT")
        return {"FINISHED"}

    def invoke(self, context, event):
        galbi = context.scene.galbi

        if not galbi.model_id or not galbi.access_token:
            self.report({"ERROR"}, "先にURLを生成してください")
            return {"CANCELLED"}

        galbi.status = "EXPORTING"
        try:
            glb_base64 = exporter.export_glb(use_selection=galbi.use_selection)
        except Exception as exc:
            galbi.status = "ERROR"
            galbi.error_message = str(exc)
            self.report({"ERROR"}, f"GLBエクスポートに失敗: {exc}")
            return {"CANCELLED"}

        galbi.status = "UPLOADING"
        server_url = preferences.get_server_url(context)
        scene_name = bpy.path.clean_name(context.scene.name) or "untitled"

        self._thread_done = False
        self._thread_error = None

        self._thread = threading.Thread(
            target=self._run_sync,
            args=(server_url, galbi.model_id, galbi.access_token,
                  scene_name, glb_base64),
            daemon=True,
        )
        self._thread.start()

        wm = context.window_manager
        self._timer = wm.event_timer_add(0.1, window=context.window)
        wm.modal_handler_add(self)
        return {"RUNNING_MODAL"}


# ---------------------------------------------------------------------------
# 手動同期 (1回のみ)
# ---------------------------------------------------------------------------

class GALBI_OT_manual_sync(bpy.types.Operator):
    """モデルを1回だけ同期する"""

    bl_idname = "galbi.manual_sync"
    bl_label = "今すぐ同期"
    bl_description = "モデルを1回だけ同期します"

    _timer = None
    _thread = None
    _thread_done = False
    _thread_error = None

    def _run_sync(self, server_url, model_id, access_token, scene_name, glb_base64):
        try:
            client = api_client.GalbiAPIClient(server_url)
            client.upload_model(model_id, access_token, f"{scene_name}.glb", glb_base64)
            self._thread_done = True
        except Exception as exc:
            self._thread_error = str(exc)
            self._thread_done = True

    def modal(self, context, event):
        if event.type != "TIMER":
            return {"PASS_THROUGH"}

        galbi = context.scene.galbi

        if not self._thread_done:
            return {"PASS_THROUGH"}

        wm = context.window_manager
        wm.event_timer_remove(self._timer)

        if self._thread_error:
            galbi.status = "ERROR"
            galbi.error_message = self._thread_error
            self.report({"ERROR"}, f"同期に失敗しました: {self._thread_error}")
            return {"FINISHED"}

        galbi.status = "DONE"
        galbi.error_message = ""
        self.report({"INFO"}, "同期が完了しました")
        return {"FINISHED"}

    def invoke(self, context, event):
        galbi = context.scene.galbi

        if not galbi.model_id or not galbi.access_token:
            self.report({"ERROR"}, "先にURLを生成してください")
            return {"CANCELLED"}

        galbi.status = "EXPORTING"
        try:
            glb_base64 = exporter.export_glb(use_selection=galbi.use_selection)
        except Exception as exc:
            galbi.status = "ERROR"
            galbi.error_message = str(exc)
            self.report({"ERROR"}, f"GLBエクスポートに失敗: {exc}")
            return {"CANCELLED"}

        galbi.status = "UPLOADING"
        server_url = preferences.get_server_url(context)
        scene_name = bpy.path.clean_name(context.scene.name) or "untitled"

        self._thread_done = False
        self._thread_error = None

        self._thread = threading.Thread(
            target=self._run_sync,
            args=(server_url, galbi.model_id, galbi.access_token,
                  scene_name, glb_base64),
            daemon=True,
        )
        self._thread.start()

        wm = context.window_manager
        self._timer = wm.event_timer_add(0.1, window=context.window)
        wm.modal_handler_add(self)
        return {"RUNNING_MODAL"}


# ---------------------------------------------------------------------------
# 同期停止
# ---------------------------------------------------------------------------

class GALBI_OT_stop_sync(bpy.types.Operator):
    """同期を停止する"""

    bl_idname = "galbi.stop_sync"
    bl_label = "同期を停止"
    bl_description = "自動同期を停止します"

    def execute(self, context):
        galbi = context.scene.galbi
        galbi.is_syncing = False
        galbi.status = "DONE"
        self.report({"INFO"}, "同期を停止しました")
        return {"FINISHED"}


# ---------------------------------------------------------------------------
# 自動同期ループ
# ---------------------------------------------------------------------------

class GALBI_OT_auto_sync(bpy.types.Operator):
    """定期的にモデルを同期する"""

    bl_idname = "galbi.auto_sync"
    bl_label = "自動同期"
    bl_options = {"INTERNAL"}

    _timer = None
    _thread = None
    _thread_done = True
    _thread_error = None
    _elapsed = 0.0

    def _run_sync(self, server_url, model_id, access_token, scene_name, glb_base64):
        try:
            client = api_client.GalbiAPIClient(server_url)
            client.upload_model(model_id, access_token, f"{scene_name}.glb", glb_base64)
            self._thread_done = True
        except Exception as exc:
            self._thread_error = str(exc)
            self._thread_done = True

    def modal(self, context, event):
        galbi = context.scene.galbi

        if not galbi.is_syncing:
            self._cleanup(context)
            return {"FINISHED"}

        if event.type != "TIMER":
            return {"PASS_THROUGH"}

        if not self._thread_done:
            return {"PASS_THROUGH"}

        if self._thread_error:
            galbi.status = "ERROR"
            galbi.error_message = self._thread_error
            self._thread_error = None
            self.report({"WARNING"}, f"同期エラー: {galbi.error_message}")

        interval = float(galbi.sync_interval)
        self._elapsed += 0.5
        if self._elapsed < interval:
            if galbi.status != "ERROR":
                galbi.status = "DONE"
            return {"PASS_THROUGH"}

        self._elapsed = 0.0
        galbi.status = "SYNCING"

        try:
            glb_base64 = exporter.export_glb(use_selection=galbi.use_selection)
        except Exception as exc:
            galbi.status = "ERROR"
            galbi.error_message = str(exc)
            self.report({"WARNING"}, f"エクスポートエラー: {exc}")
            return {"PASS_THROUGH"}

        server_url = preferences.get_server_url(context)
        scene_name = bpy.path.clean_name(context.scene.name) or "untitled"

        self._thread_done = False
        self._thread_error = None
        self._thread = threading.Thread(
            target=self._run_sync,
            args=(server_url, galbi.model_id, galbi.access_token,
                  scene_name, glb_base64),
            daemon=True,
        )
        self._thread.start()

        return {"PASS_THROUGH"}

    def invoke(self, context, event):
        self._elapsed = 0.0
        self._thread_done = True
        self._thread_error = None

        wm = context.window_manager
        self._timer = wm.event_timer_add(0.5, window=context.window)
        wm.modal_handler_add(self)
        return {"RUNNING_MODAL"}

    def _cleanup(self, context):
        if self._timer:
            context.window_manager.event_timer_remove(self._timer)
            self._timer = None


# ---------------------------------------------------------------------------
# URLヘルパー
# ---------------------------------------------------------------------------

class GALBI_OT_copy_url(bpy.types.Operator):
    """共有URLをクリップボードにコピー"""

    bl_idname = "galbi.copy_url"
    bl_label = "URLをコピー"
    bl_description = "共有URLをクリップボードにコピーします"

    def execute(self, context):
        url = context.scene.galbi.public_url
        if not url:
            self.report({"WARNING"}, "コピーするURLがありません")
            return {"CANCELLED"}

        context.window_manager.clipboard = url
        self.report({"INFO"}, "URLをコピーしました")
        return {"FINISHED"}


class GALBI_OT_open_url(bpy.types.Operator):
    """共有URLをブラウザで開く"""

    bl_idname = "galbi.open_url"
    bl_label = "Webで確認"
    bl_description = "共有URLをブラウザで開きます"

    def execute(self, context):
        url = context.scene.galbi.public_url
        if not url:
            self.report({"WARNING"}, "開くURLがありません")
            return {"CANCELLED"}

        webbrowser.open(url)
        return {"FINISHED"}


VRCHAT_WORLD_URL = "https://vrchat.com/home/launch?worldId=wrld_068ed758-68b1-40bc-b647-f54c3b3d92fc"


class GALBI_OT_open_vrchat(bpy.types.Operator):
    """VRChatのワールドで確認する"""

    bl_idname = "galbi.open_vrchat"
    bl_label = "VRChatで確認"
    bl_description = "VRChatのビューワーワールドを起動します"

    def execute(self, context):
        webbrowser.open(VRCHAT_WORLD_URL)
        return {"FINISHED"}


CLASSES = [
    GALBI_OT_popup_error,
    GALBI_OT_generate_url,
    GALBI_OT_start_sync,
    GALBI_OT_manual_sync,
    GALBI_OT_stop_sync,
    GALBI_OT_auto_sync,
    GALBI_OT_copy_url,
    GALBI_OT_open_url,
    GALBI_OT_open_vrchat,
]


def register():
    for cls in CLASSES:
        bpy.utils.register_class(cls)


def unregister():
    for cls in reversed(CLASSES):
        bpy.utils.unregister_class(cls)
