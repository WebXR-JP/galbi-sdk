"""アドオン設定"""

import urllib.parse

import bpy

GALBI_SERVER_URL = "https://galbi.yutt.net"
LOCAL_SERVER_URL = "http://127.0.0.1:3001"


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
        default=LOCAL_SERVER_URL,
    )

    def draw(self, context):
        layout = self.layout
        layout.prop(self, "server_mode", expand=True)
        if self.server_mode == "LOCAL":
            layout.prop(self, "local_url", text="URL")


def get_server_url(context):
    prefs = context.preferences.addons[__package__].preferences
    if prefs.server_mode == "LOCAL":
        local_url = prefs.local_url.rstrip("/")
        parsed = urllib.parse.urlsplit(local_url)
        if parsed.hostname == "localhost":
            netloc = "127.0.0.1"
            if parsed.port:
                netloc = f"{netloc}:{parsed.port}"
            if parsed.username:
                auth = parsed.username
                if parsed.password:
                    auth = f"{auth}:{parsed.password}"
                netloc = f"{auth}@{netloc}"
            return urllib.parse.urlunsplit(
                (parsed.scheme, netloc, parsed.path, parsed.query, parsed.fragment)
            )
        return local_url
    return GALBI_SERVER_URL


def register():
    bpy.utils.register_class(GalbiAddonPreferences)


def unregister():
    bpy.utils.unregister_class(GalbiAddonPreferences)
