"""GLB export utilities for the Galbi addon."""

import base64
import os
import tempfile

import bpy


def export_glb(use_selection=False):
    """Export the current scene (or selection) to GLB and return base64 data.

    Args:
        use_selection: If True, export only selected objects.

    Returns:
        str: base64-encoded GLB data.
    """
    tmp = tempfile.NamedTemporaryFile(suffix=".glb", delete=False)
    tmp_path = tmp.name
    tmp.close()

    try:
        bpy.ops.export_scene.gltf(
            filepath=tmp_path,
            export_format="GLB",
            use_selection=use_selection,
        )

        with open(tmp_path, "rb") as f:
            glb_bytes = f.read()

        return base64.b64encode(glb_bytes).decode("ascii")
    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
