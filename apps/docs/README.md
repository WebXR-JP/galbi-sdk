# @repo/docs

Documentation site for Galbi SDK, built with VitePress.

## Overview

Multi-language documentation covering setup, usage, and guides for the Galbi SDK ecosystem. Supports Japanese, English, and Korean.

## Development

```bash
pnpm -F @repo/docs dev
```

The dev server starts at `http://localhost:5175`.

## Build & Deploy

```bash
pnpm -F @repo/docs build    # Static site generation
pnpm -F @repo/docs deploy   # Deploy to Cloudflare Pages
```

## Structure

```text
.vitepress/
  config.ts         VitePress configuration (multi-locale)

guide/              Japanese documentation (root locale)
en/guide/           English documentation
ko/guide/           Korean documentation
```

### Guide Sections

- **Basic Usage** — Overview, environment setup, world creation, VRChat sync
- **World Creation Tips** — Textures, Blender model import, collaboration
- **After Completion** — 3D model export and upload
- **Links** — Release notes, Discord, PlayCanvas docs

## Adding a New Language

1. Create a new locale directory (e.g., `zh/guide/`)
2. Add locale configuration in `.vitepress/config.ts`
3. Translate the markdown files

## License

[MIT](../../LICENSE)
