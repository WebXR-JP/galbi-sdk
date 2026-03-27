"""グローバル状態管理"""

import bpy


class GalbiState(bpy.types.PropertyGroup):
    """共有の状態を保持する"""

    status: bpy.props.EnumProperty(
        name="ステータス",
        items=[
            ("READY", "準備完了", ""),
            ("EXPORTING", "エクスポート中", ""),
            ("CREATING", "URL生成中", ""),
            ("UPLOADING", "同期中", ""),
            ("SYNCING", "同期中", ""),
            ("DONE", "完了", ""),
            ("ERROR", "エラー", ""),
        ],
        default="READY",
    )

    # NOTE: keep the RNA property name for backward compatibility with existing .blend files.
    public_url: bpy.props.StringProperty(name="共有URL", default="")
    error_message: bpy.props.StringProperty(name="エラーメッセージ", default="")

    use_selection: bpy.props.BoolProperty(
        name="選択のみ",
        description="選択したオブジェクトのみエクスポート",
        default=False,
    )

    model_id: bpy.props.StringProperty(default="")
    access_token: bpy.props.StringProperty(default="")

    is_syncing: bpy.props.BoolProperty(name="自動同期中", default=False)

    auto_sync: bpy.props.BoolProperty(
        name="自動同期",
        description="指定した間隔で自動的に同期する",
        default=True,
    )

    sync_interval: bpy.props.EnumProperty(
        name="同期間隔",
        items=[
            ("5", "5秒", ""),
            ("10", "10秒", ""),
            ("30", "30秒", ""),
            ("60", "1分", ""),
        ],
        default="10",
    )


def register():
    bpy.utils.register_class(GalbiState)
    bpy.types.Scene.galbi = bpy.props.PointerProperty(type=GalbiState)


def unregister():
    del bpy.types.Scene.galbi
    bpy.utils.unregister_class(GalbiState)
