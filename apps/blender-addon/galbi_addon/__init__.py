"""Galbi Blender Addon."""

bl_info = {
    "name": "Galbi",
    "author": "Galbi Team",
    "version": (0, 3, 2),
    "blender": (3, 6, 0),
    "location": "View3D > Sidebar > Galbi",
    "description": "Share Blender models via Galbi",
    "category": "Import-Export",
    "license": "MIT",
    "doc_url": "https://github.com/yushimatenjin/galbi-sdk/tree/main/apps/blender-addon",
    "tracker_url": "https://github.com/yushimatenjin/galbi-sdk/issues",
}

from . import i18n, operators, panels, preferences, state


def register():
    preferences.register()
    state.register()
    operators.register()
    panels.register()
    i18n.register()


def unregister():
    i18n.unregister()
    panels.unregister()
    operators.unregister()
    state.unregister()
    preferences.unregister()
