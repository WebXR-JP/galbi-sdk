"""アドオン設定"""

import bpy

GALBI_SERVER_URL = "http://galbi.yutt.net"


class GalbiAddonPreferences(bpy.types.AddonPreferences):
    bl_idname = __package__

    server_mode: bpy.props.EnumProperty(
        name="サーバー",
        items=[
            ("GALBI", "galbi.yutt.net", ""),
            ("LOCAL", "ローカル", ""),
        ],
        default="GALBI",
    )

    local_url: bpy.props.StringProperty(
        name="ローカルURL",
        description="ローカルサーバーのURL",
        default="http://localhost:3001",
    )

    def draw(self, context):
        layout = self.layout
        layout.prop(self, "server_mode", expand=True)
        if self.server_mode == "LOCAL":
            layout.prop(self, "local_url", text="URL")


def get_server_url(context):
    prefs = context.preferences.addons[__package__].preferences
    if prefs.server_mode == "LOCAL":
        return prefs.local_url.rstrip("/")
    return GALBI_SERVER_URL


def register():
    bpy.utils.register_class(GalbiAddonPreferences)


def unregister():
    bpy.utils.unregister_class(GalbiAddonPreferences)
