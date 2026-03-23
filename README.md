# Galbi SDK

Real-time 3D model synchronization SDK for WebXR, VRChat, and collaborative 3D workflows.

Galbi lets you instantly share 3D scenes from PlayCanvas or Blender via a simple URL — no login required.

## Features

- **Instant Sharing** — Generate a public URL for any 3D scene in one click
- **Real-time Sync** — Auto-sync changes at configurable intervals (5s / 10s / 30s / 1m)
- **Multi-platform** — Works in PlayCanvas (Web SDK) and Blender (Addon)
- **VRChat Ready** — View shared models directly in VRChat viewer worlds
- **Export Formats** — GLB, GLTF, and STL export support
- **No Auth Required** — Anonymous model creation with 24-hour expiration
- **Multi-language** — UI supports Japanese, English, and Korean

## Architecture

```text
apps/
  sdk/              Web SDK (Vite library build, React, PlayCanvas)
  docs/             Documentation site (VitePress)
  blender-addon/    Blender addon for 3D model sync

packages/
  api/              API server (Cloudflare Workers + Hono + tRPC)
  database/         Data layer (Cloudflare D1 + Prisma)
  tooling-config/   Shared Biome & TypeScript configs
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v9+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) v4+

## Getting Started

```bash
# Install dependencies (also initializes local D1 database)
pnpm install

# Start all services
pnpm dev
```

The `postinstall` script automatically runs `wrangler d1 migrations apply --local` to set up the local database. To skip this:

```bash
SKIP_LOCAL_D1_SETUP=1 pnpm install
```

### Environment Variables

```bash
cp packages/api/.dev.vars.example packages/api/.dev.vars
cp apps/sdk/.env.example apps/sdk/.env.local
```

Edit `.dev.vars` to configure OIDC settings as needed.

## Development

```bash
pnpm dev
```

| Service  | Port | Description            |
|----------|------|------------------------|
| Database | 3002 | D1 Worker (Prisma)     |
| API      | 3001 | Hono + tRPC            |
| SDK      | 5174 | Vite dev server        |
| Docs     | 5175 | VitePress              |

## Build

```bash
pnpm build       # Build all packages
pnpm check       # Biome check (format + lint)
pnpm test        # Run tests
```

### SDK Build Output

```bash
pnpm -F @repo/sdk build
```

Produces:

| File               | Format | Use Case                        |
|--------------------|--------|---------------------------------|
| `galbi.es.mjs`     | ESM    | Bundlers & modern environments  |
| `galbi.umd.js`     | UMD    | CommonJS & global variable      |
| `galbi.css`        | CSS    | Tailwind CSS stylesheet         |
| `types/index.d.ts` | DTS    | TypeScript type definitions     |

### PlayCanvas Build

```bash
pnpm -F @repo/sdk build:playcanvas
```

Generates `dist/playcanvas/galbi.mjs` for use in the PlayCanvas Editor.

## Workspace Commands

```bash
# API
pnpm -F @repo/api dev
pnpm -F @repo/api deploy
pnpm -F @repo/api test

# SDK
pnpm -F @repo/sdk dev
pnpm -F @repo/sdk build
pnpm -F @repo/sdk build:playcanvas

# Docs
pnpm -F @repo/docs dev
pnpm -F @repo/docs deploy

# Database
pnpm -F @repo/database dev
pnpm -F @repo/database db:generate
pnpm -F @repo/database db:migrate:from-schema
pnpm -F @repo/database db:migrate:local
pnpm -F @repo/database db:migrate:remote
```

## How It Works

1. **Generate URL** — Creates an anonymous model entry on the server with a unique public URL
2. **Sync** — Exports the 3D scene as GLB and uploads it to R2 storage
3. **Share** — Anyone with the URL can view the model in a browser or VRChat
4. **Auto-sync** — Optionally polls for changes and re-uploads at a set interval

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| SDK       | React, PlayCanvas, Vite, tRPC      |
| API       | Hono, tRPC, Zod, Cloudflare Workers|
| Database  | Prisma, Cloudflare D1 (SQLite)     |
| Storage   | Cloudflare R2                       |
| Docs      | VitePress                           |
| Tooling   | Turbo, pnpm, Biome, Husky          |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](./LICENSE)
