# TinaCMS Schema Guide

This document describes the TinaCMS collections and block schemas used in this project.

## Overview

TinaCMS uses a schema-based approach to define content structures. The schema is defined in TypeScript and generates:
- GraphQL types for querying content
- TypeScript types for type safety
- Admin UI forms for content editing

## Collections

### 1. Global (`global.schema.ts`)

**Path**: `src/content/global/`  
**Format**: MDX  
**Purpose**: Site-wide settings (header navigation, footer)

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `header.navLinks` | Object List | Navigation menu items |
| `header.navLinks[].label` | String | Link text |
| `header.navLinks[].icon` | String | react-icons name (e.g., `FaHome`) |
| `header.navLinks[].link` | String | URL path |
| `header.ctaButton` | Object | Call-to-action button in header |
| `footer.copyright` | String | Copyright text |

#### Example Content

```yaml
# src/content/global/_index.mdx
---
header:
  navLinks:
    - label: Home
      icon: FaHome
      link: /
    - label: Work
      icon: FaBriefcase
      link: /work
  ctaButton:
    label: Contact
    icon: FaEnvelope
    link: mailto:hello@example.com
footer:
  copyright: © 2024 Tri Denda
---
```

---

### 2. Config (`config.schema.ts`)

**Path**: `src/config/`  
**Format**: JSON  
**Purpose**: Site metadata and integrations

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `site.title` | String | Default page title |
| `site.description` | String | Default meta description |
| `site.base_url` | String | Production URL |
| `google_tag_manager.enable` | Boolean | Enable GTM |
| `google_tag_manager.gtm_id` | String | GTM container ID |

#### Example Content

```json
{
  "site": {
    "title": "Tri Writes Code",
    "description": "Personal blog and portfolio",
    "base_url": "https://triwritescode.com"
  },
  "google_tag_manager": {
    "enable": false,
    "gtm_id": ""
  }
}
```

---

### 3. Page (`page.schema.ts`)

**Path**: `src/content/pages/`  
**Format**: MDX  
**Purpose**: Main site pages with modular blocks

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `draft` | Boolean | Hide page from production |
| `title` | String | Page title (required, isTitle) |
| `seo` | Object | SEO settings (see SEO Fields) |
| `blocks` | Template List | Page content blocks |

#### Available Blocks

- `summary` - Hero section with avatar and bio
- `cta` - Call-to-action card
- `richText` - Markdown content
- `notFound` - 404 page content
- `experience` - Work experience timeline
- `projects` - Project showcase
- `postList` - Blog post listing

---

### 4. Post (`post.schema.ts`)

**Path**: `src/content/posts/`  
**Format**: MDX  
**Purpose**: Blog posts with rich-text body

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `draft` | Boolean | Hide post from production |
| `title` | String | Post title (required, isTitle) |
| `seo` | Object | SEO settings |
| `publishedDate` | DateTime | Publication date |
| `body` | Rich-Text | Post content (isBody) |

#### Example Content

```yaml
# src/content/posts/my-first-post.mdx
---
draft: false
title: My First Post
publishedDate: 2024-01-15T00:00:00.000Z
seo:
  metaTitle: My First Post
  metaDescription: This is my first blog post
---

Your markdown content here...
```

---

## Block Schemas

### Summary Block (`summary.block.ts`)

Hero section for homepage with profile information.

| Field | Type | Description |
|-------|------|-------------|
| `enable` | Boolean | Show/hide block |
| `avatar` | Image | Profile photo |
| `name` | String | Display name |
| `subtitle` | String | Role/company |
| `bio` | Rich-Text | About section |
| `socialLinks` | Object List | Social media links |
| `socialLinks[].label` | String | Link label |
| `socialLinks[].icon` | String | react-icons name |
| `socialLinks[].url` | String | Profile URL |

---

### Experience Block (`experience.block.ts`)

Work experience timeline with expandable details.

| Field | Type | Description |
|-------|------|-------------|
| `enable` | Boolean | Show/hide block |
| `title` | String | Section heading |
| `description` | Rich-Text | Section intro |
| `experiences` | Object List | Job entries |
| `experiences[].role` | String | Job title |
| `experiences[].company` | String | Company name |
| `experiences[].location` | String | City/country |
| `experiences[].startDate` | String | Start (e.g., "Aug 2022") |
| `experiences[].endDate` | String | End (e.g., "Present") |
| `experiences[].description` | Rich-Text | Role description |
| `experiences[].techStacks` | String List | Technologies |
| `experiences[].contributions` | String List | Key achievements |

---

### Projects Block (`projects.block.ts`)

Project showcase with image gallery and achievements.

| Field | Type | Description |
|-------|------|-------------|
| `enable` | Boolean | Show/hide block |
| `title` | String | Section heading |
| `description` | Rich-Text | Section intro |
| `projects` | Object List | Project entries |
| `projects[].title` | String | Project name |
| `projects[].description` | Rich-Text | Project description |
| `projects[].logo` | Image | Project logo |
| `projects[].achievements` | Object List | Stats (label/value pairs) |
| `projects[].images` | Object List | Gallery images (src/alt) |
| `projects[].links` | Object List | External links (icon/label/url) |

---

### PostList Block (`postList.block.ts`)

Blog post listing with pagination.

| Field | Type | Description |
|-------|------|-------------|
| `enable` | Boolean | Show/hide block |
| `title` | String | Section heading |
| `description` | Rich-Text | Section intro |
| `postsPerPage` | Number | Posts per page (default: 10) |

---

### CTA Block (`cta.block.ts`)

Call-to-action card.

| Field | Type | Description |
|-------|------|-------------|
| `enable` | Boolean | Show/hide block |
| `title` | String | Card heading |
| `description` | Rich-Text | Card content |
| `buttonLabel` | String | Button text |
| `buttonLink` | String | Button URL |

---

### RichText Block (`richText.block.ts`)

Simple markdown content block.

| Field | Type | Description |
|-------|------|-------------|
| `enable` | Boolean | Show/hide block |
| `body` | Rich-Text | Content |

---

### NotFound Block (`notFound.block.ts`)

404 error page content.

| Field | Type | Description |
|-------|------|-------------|
| `enable` | Boolean | Show/hide block |
| `title` | String | Error heading |
| `description` | Rich-Text | Error message |
| `buttonLabel` | String | Back button text |
| `buttonLink` | String | Back button URL |

---

## SEO Fields (`seo.field.ts`)

Reusable SEO configuration for pages and posts.

| Field | Type | Description |
|-------|------|-------------|
| `metaTitle` | String | Browser title (< 60 chars) |
| `metaDescription` | String | Search description (50-160 chars) |
| `keywords` | String List | SEO keywords |
| `canonical` | String | Canonical URL |
| `noindex` | Boolean | Hide from search engines |
| `ogImage` | Image | Social share image (1200×630) |

---

## Adding New Blocks

1. Create schema in `tina/schema/blocks/`:

```typescript
// tina/schema/blocks/myBlock.block.ts
import type { Template } from "tinacms";

const myBlock: Template = {
  name: "myBlock",
  label: "My Block",
  fields: [
    {
      name: "enable",
      label: "Enable",
      type: "boolean",
    },
    // Add more fields...
  ],
};

export default myBlock;
```

2. Register in `tina/schema/page.schema.ts`:

```typescript
import myBlock from "./blocks/myBlock.block";

// In templates array:
templates: [
  // ...existing blocks
  myBlock,
],
```

3. Create React component in `src/components/blocks/`:

```tsx
// src/components/blocks/myBlock.block.tsx
"use client";

type MyBlockProps = {
  enable?: boolean | null;
  // Add prop types matching schema...
};

const MyBlock = (props: MyBlockProps) => {
  if (props.enable === false) return null;
  
  return (
    <section>
      {/* Block content */}
    </section>
  );
};

export default MyBlock;
```

4. Register in `src/components/layouts/blockRenderer.layout.tsx`:

```typescript
const DynamicMyBlock = dynamic(() =>
  import("@/components/blocks/myBlock.block").then((mod) => mod.default),
);

// In switch statement:
case "PageBlocksMyBlock":
  return <DynamicMyBlock {...block} />;
```

5. Run `pnpm dev` to regenerate types.
