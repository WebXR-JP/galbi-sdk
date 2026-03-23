#!/usr/bin/env python3
"""Build script to package the Galbi Blender addon as a .zip file.

The resulting zip can be installed via:
  Blender → Edit → Preferences → Add-ons → Install from File
"""

import os
import sys
import zipfile
from pathlib import Path

ADDON_DIR_NAME = "galbi_addon"
INCLUDE_EXTENSIONS = {".py", ".pyd", ".so", ".dylib"}


def build():
    repo_root = Path(__file__).resolve().parent.parent
    addon_src = repo_root / ADDON_DIR_NAME
    dist_dir = repo_root / "dist"
    dist_dir.mkdir(exist_ok=True)

    zip_path = dist_dir / "galbi_addon.zip"

    if not addon_src.is_dir():
        print(f"Error: addon source directory not found: {addon_src}", file=sys.stderr)
        sys.exit(1)

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        # Include LICENSE in the addon directory
        license_file = repo_root / "LICENSE"
        if license_file.exists():
            zf.write(license_file, f"{ADDON_DIR_NAME}/LICENSE")
            print(f"  added: {ADDON_DIR_NAME}/LICENSE")

        for root, _dirs, files in os.walk(addon_src):
            if "__pycache__" in root:
                continue
            for filename in files:
                ext = Path(filename).suffix
                if ext not in INCLUDE_EXTENSIONS:
                    continue
                filepath = Path(root) / filename
                arcname = filepath.relative_to(repo_root)
                zf.write(filepath, arcname)
                print(f"  added: {arcname}")

    print(f"\nBuild complete: {zip_path}")
    print(f"Size: {zip_path.stat().st_size:,} bytes")


if __name__ == "__main__":
    build()
