# triwritescode.com

Personal portfolio and blog built with **Next.js 16**, **TinaCMS**, and **Tailwind CSS v4**.

## Tech Stack

| Technology   | Version | Purpose                        |
| ------------ | ------- | ------------------------------ |
| Next.js      | 16.1.6  | React framework with Turbopack |
| React        | 19.2.3  | UI library                     |
| TinaCMS      | 3.5.0   | Git-based headless CMS         |
| Tailwind CSS | 4.x     | Utility-first CSS framework    |
| TypeScript   | 5.x     | Type safety                    |

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/triwritescode/triwritescode.com.git
cd triwritescode.com

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
```

### Environment Variables

```env
GITHUB_BRANCH="main"
NEXT_PUBLIC_TINA_CLIENT_ID=""   # Get from tina.io
TINA_TOKEN_CONTENT=""           # Get from tina.io
```

### Development

```bash
pnpm dev
```

This runs both TinaCMS dev server and Next.js with Turbopack concurrently:

- **Site**: `http://localhost:3000`
- **TinaCMS Admin**: `http://localhost:3000/admin/index.html`
- **GraphQL Playground**: `http://localhost:3000/admin/index.html#/graphql`

### Build & Production

```bash
pnpm build   # Build for production
pnpm start   # Start production server
```

## Project Structure

```text
triwritescode.com/
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── [regular]/         # Dynamic page routes
│   │   ├── posts/             # Blog routes
│   │   │   ├── page.tsx       # Post list (/posts)
│   │   │   └── [slug]/        # Post detail (/posts/[slug])
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page (/)
│   │   ├── robots.ts          # robots.txt generation
│   │   └── sitemap.ts         # sitemap.xml generation
│   ├── components/
│   │   ├── blocks/            # TinaCMS block components
│   │   ├── global/            # Header & Footer
│   │   ├── layouts/           # Page & Post layouts
│   │   ├── shortcodes/        # Reusable components
│   │   └── helpers/           # Helper components
│   ├── content/               # MDX content files
│   │   ├── global/            # Global settings
│   │   ├── pages/             # Page content
│   │   └── posts/             # Blog posts
│   ├── config/                # Site configuration
│   └── lib/                   # Utility functions
├── tina/
│   ├── config.ts              # TinaCMS configuration
│   ├── schema/                # Collection schemas
│   │   ├── blocks/            # Block templates
│   │   ├── fields/            # Reusable field definitions
│   │   ├── global.schema.ts   # Header/Footer schema
│   │   ├── page.schema.ts     # Page collection
│   │   ├── post.schema.ts     # Post collection
│   │   └── config.shema.ts    # Site config schema
│   └── __generated__/         # Auto-generated types
└── package.json
```

## Documentation

- [TinaCMS Schema Guide](./docs/SCHEMA.md) - Collection and block definitions
- [Component Architecture](./docs/COMPONENTS.md) - React components overview
- [Content Guide](./docs/CONTENT.md) - Creating and managing content

## Utilities

### Convert PNG to WebP

```bash
for f in *.png; do cwebp -q 80 "$f" -o "${f%.png}.webp" && rm "$f"; done
```

## License

MIT © Tri Denda
