# Galbi Blender Addon

Blender addon for exporting 3D models to [Galbi SDK](https://github.com/yushimatenjin/galbi-sdk) servers. Export your models as GLB, sync them to a shareable URL, and view them in a web browser or VRChat — all from within Blender.

Zero external Python dependencies. Uses only Blender's bundled standard library.

## Requirements

| Item    | Version                                    |
|---------|--------------------------------------------|
| Blender | 3.6+ (tested on 4.x and 5.x)              |
| Python  | Blender-bundled (no external packages)      |

## Installation

### From zip (recommended)

1. Download `galbi_addon.zip` from [Releases](https://github.com/yushimatenjin/galbi-sdk/releases), or [build it yourself](#build)
2. Open Blender → **Edit → Preferences → Add-ons**
3. Click **Install from File** → select `galbi_addon.zip`
4. Enable the **Galbi** addon

### Manual

Copy the `galbi_addon/` directory to your Blender addons folder:

| OS      | Path                                                              |
|---------|-------------------------------------------------------------------|
| Windows | `%APPDATA%\Blender Foundation\Blender\<version>\scripts\addons\` |
| macOS   | `~/Library/Application Support/Blender/<version>/scripts/addons/` |
| Linux   | `~/.config/blender/<version>/scripts/addons/`                     |

Restart Blender and enable **Galbi** in Preferences → Add-ons.

## Usage

### Open the Panel

Press `N` in the 3D Viewport to open the sidebar, then select the **Galbi** tab.

### Select a Server

Toggle the server at the top of the panel:

| Button              | Target                                |
|---------------------|---------------------------------------|
| **galbi.yutt.net**  | Public Galbi server (default)         |
| **Local**           | Your local dev server (configurable)  |

### Export Settings

| Setting               | Description                                       |
|-----------------------|---------------------------------------------------|
| Selected objects only | Export only selected objects                       |
| Auto-sync             | Automatically re-sync at a set interval           |
| Interval              | Auto-sync interval (5s / 10s / 30s / 1m)         |

### Workflow

1. Click **Generate URL** to create a shareable URL on the server
2. Click **Sync** (or **Start Sync** if auto-sync is enabled) to upload your model
3. Use the action buttons to copy the URL, open it in a browser, or launch VRChat

## Build

```bash
cd apps/blender-addon
python scripts/build.py
```

Produces `dist/galbi_addon.zip`, ready for Blender's **Install from File**.

## Technical Details

### API Communication

Communicates with the Galbi tRPC API using `urllib.request` (no external HTTP libraries).

**Flow:**

1. `createAnonymousModel` — Creates a model slot and returns `modelId`, `accessToken`, and `publicUrl`
2. `uploadModel` — Uploads the GLB file (base64-encoded) to the server

### Non-blocking I/O

API calls run on `threading.Thread` to avoid freezing the Blender UI. A `modal` operator with `event_timer` polls for results on the main thread, ensuring all Blender API calls happen safely.

### GLB Export

Uses `bpy.ops.export_scene.gltf()` to write a temporary GLB file, base64-encodes it for the API, and cleans up the temp file automatically.

## File Structure

```text
apps/blender-addon/
├── galbi_addon/
│   ├── __init__.py        # Addon registration & bl_info
│   ├── api_client.py      # tRPC HTTP client (urllib only)
│   ├── exporter.py        # GLB export & base64 encoding
│   ├── operators.py       # Blender operators
│   ├── panels.py          # Sidebar UI
│   ├── preferences.py     # Addon settings (server toggle)
│   ├── state.py           # PropertyGroup state management
│   └── i18n.py            # Translations (ja / en)
├── scripts/
│   └── build.py           # Zip package builder
├── LICENSE
├── .gitignore
└── README.md
```

## Development

This addon is part of the Galbi SDK monorepo. To test with a local server:

```bash
# From the repository root
pnpm dev
```

The API starts at `http://localhost:3001`. Switch the addon's server setting to **Local** to connect.

## License

[MIT](./LICENSE)
