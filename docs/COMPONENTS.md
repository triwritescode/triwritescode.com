# Component Architecture

This document describes the React component structure and patterns used in this project.

## Overview

The component architecture follows a modular pattern:

- **Blocks** — Content sections managed via TinaCMS
- **Global** — Site-wide components (Header, Footer)
- **Layouts** — Page structure components
- **Shortcodes** — Reusable utility components
- **Helpers** — Supporting components

## Directory Structure

```text
src/components/
├── blocks/           # TinaCMS block components
├── global/           # Header & Footer
├── layouts/          # Page/Post layouts
├── shortcodes/       # Reusable components
└── helpers/          # Supporting components
```

---

## Block Components

Block components render TinaCMS blocks. Each block:

- Receives props from the schema definition
- Has an `enable` toggle for visibility
- Uses `tinaField` for live editing
- Is dynamically imported for code splitting

### Summary Block

**File**: `blocks/summary.block.tsx`

Hero section with profile information.

```tsx
<SummaryBlock
  enable={true}
  avatar="/avatar.jpg"
  name="Tri Denda"
  subtitle="Software Engineer"
  bio={richTextContent}
  socialLinks={[
    { label: "GitHub", icon: "FaGithub", url: "https://github.com" }
  ]}
/>
```

**Features**:

- Avatar image with rounded border
- Name and subtitle
- Rich-text bio with TinaMarkdown
- Social links with dynamic icons

---

### Experience Block

**File**: `blocks/experience.block.tsx`

Work experience timeline with expandable cards.

```tsx
<ExperienceBlock
  enable={true}
  title="Work Experience"
  description={richTextContent}
  experiences={[
    {
      role: "Software Engineer",
      company: "Acme Inc",
      location: "Jakarta, ID",
      startDate: "Aug 2022",
      endDate: "Present",
      description: richTextContent,
      techStacks: ["React", "Node.js"],
      contributions: ["Built feature X", "Improved Y"]
    }
  ]}
/>
```

**Features**:

- Collapsible contribution lists
- Tech stack pills
- Rich-text descriptions
- Date range display

---

### Projects Block

**File**: `blocks/projects.block.tsx`

Project showcase with image gallery and modal viewer.

```tsx
<ProjectsBlock
  enable={true}
  title="Projects"
  description={richTextContent}
  projects={[
    {
      title: "My Project",
      description: richTextContent,
      logo: "/logo.png",
      achievements: [{ label: "Users", value: "1000+" }],
      images: [{ src: "/screenshot.png", alt: "Dashboard" }],
      links: [{ icon: "FiGlobe", label: "Website", url: "https://..." }]
    }
  ]}
/>
```

**Features**:

- Project cards with logo
- Achievement stats
- Image gallery with pagination
- Fullscreen modal with zoom (scroll/buttons)
- Loading states for images
- External links with icons

---

### PostList Block

**File**: `blocks/postList.block.tsx`

Blog post listing with pagination.

```tsx
<PostListBlock
  enable={true}
  title="Blog Posts"
  description={richTextContent}
  postsPerPage={10}
  posts={postEdges}
/>
```

**Features**:

- Sorted by date (newest first)
- Pagination with dots and arrows
- Filters draft posts
- Links to post detail pages

---

### CallToAction Block

**File**: `blocks/callToAction.block.tsx`

CTA card with button.

```tsx
<CallToActionBlock
  enable={true}
  title="Get in Touch"
  description={richTextContent}
  buttonLabel="Contact Me"
  buttonLink="mailto:hello@example.com"
/>
```

---

### RichText Block

**File**: `blocks/richText.block.tsx`

Simple markdown content section.

```tsx
<RichTextBlock
  enable={true}
  body={richTextContent}
/>
```

---

### NotFound Block

**File**: `blocks/notFound.block.tsx`

404 error page content.

```tsx
<NotFoundBlock
  enable={true}
  title="Page Not Found"
  description={richTextContent}
  buttonLabel="Go Home"
  buttonLink="/"
/>
```

---

## Global Components

### Header

**File**: `global/header.global.tsx`

Sticky navigation bar with mobile menu.

**Props**:

```typescript
type HeaderProps = {
  header?: {
    navLinks?: Array<{
      label?: string;
      icon?: string;
      link?: string;
    }>;
    ctaButton?: {
      label?: string;
      icon?: string;
      link?: string;
    };
  };
};
```

**Features**:

- Pill-style navigation
- Active state highlighting
- Dynamic icons (react-icons)
- Mobile hamburger menu
- CTA button

---

### Footer

**File**: `global/footer.global.tsx`

Simple footer with copyright.

**Props**:

```typescript
type FooterProps = {
  footer?: {
    copyright?: string;
  };
};
```

---

## Layout Components

### PageLayout

**File**: `layouts/page.layout.tsx`

Main page wrapper with header, blocks, and footer.

```tsx
<PageLayout
  initialPageData={pageQueryResult}
  initialGlobalData={globalQueryResult}
  initialPostsData={postConnectionResult}
/>
```

**Features**:

- TinaCMS live editing via `useTina`
- Renders blocks via BlockRenderer
- Passes posts data to PostList blocks

---

### PostLayout

**File**: `layouts/post.layout.tsx`

Single post page layout.

```tsx
<PostLayout
  initialPostData={postQueryResult}
  initialGlobalData={globalQueryResult}
/>
```

**Features**:

- Post title and date
- Rich-text body via TinaMarkdown
- Typography styling (prose)
- TinaCMS live editing

---

### BlockRenderer

**File**: `layouts/blockRenderer.layout.tsx`

Dynamic block component loader.

```tsx
<BlockRenderer block={pageBlock} posts={postEdges} />
```

**How it works**:

1. Receives a block with `__typename`
2. Switches on typename to select component
3. Uses `next/dynamic` for code splitting
4. Passes props to the appropriate component

**Adding a new block**:

```typescript
// 1. Add dynamic import
const DynamicMyBlock = dynamic(() =>
  import("@/components/blocks/myBlock.block").then((mod) => mod.default)
);

// 2. Add case to switch
case "PageBlocksMyBlock":
  return <DynamicMyBlock {...block} />;
```

---

## Shortcode Components

### DynamicIcon

**File**: `shortcodes/dynamicIcon.shortcode.tsx`

Renders icons from react-icons dynamically.

```tsx
<DynamicIcon icon="FaGithub" className="w-5 h-5" />
```

**Supported icon sets**:

- `Fa*` — Font Awesome
- `Fi*` — Feather Icons
- `Si*` — Simple Icons

---

### SEO Meta

**File**: `shortcodes/seoMeta.shortcode.tsx`

Builds Next.js metadata from TinaCMS SEO fields.

```typescript
export function buildMetadata(params: {
  title: string;
  seo?: SeoFields;
  routePattern: string;
  ogType?: "website" | "article";
}): Metadata
```

---

### YouTube Embed

**File**: `shortcodes/youtube.shortcode.tsx`

Lazy-loaded YouTube player.

```tsx
<YouTubeEmbed id="dQw4w9WgXcQ" title="Video Title" />
```

Uses `react-lite-youtube-embed` for performance.

---

### Analytics

**File**: `shortcodes/analytics.shortcode.tsx`

Google Tag Manager integration.

---

## Utility Functions

### cn (Class Names)

**File**: `lib/utils.ts`

Combines Tailwind classes with conflict resolution.

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  condition && "conditional-class",
  "override-class"
)} />
```

Uses `clsx` + `tailwind-merge`.

---

### slugify

**File**: `lib/slugify.ts`

Converts strings to URL-safe slugs.

```typescript
import { slugify } from "@/lib/slugify";

slugify("Hello World!"); // "hello-world"
```

---

## Patterns

### TinaCMS Live Editing

All editable components use `tinaField` for live editing:

```tsx
import { tinaField } from "tinacms/react";

<h1 data-tina-field={tinaField(data, "title")}>
  {data.title}
</h1>
```

### Dynamic Imports

Blocks use `next/dynamic` for code splitting:

```typescript
const DynamicComponent = dynamic(() =>
  import("@/components/blocks/component").then((mod) => mod.default)
);
```

### Rich Text Rendering

TinaCMS rich-text fields are rendered with TinaMarkdown:

```tsx
import { TinaMarkdown } from "tinacms/dist/rich-text";

<TinaMarkdown content={richTextContent} />
```

### Enable Toggle Pattern

All blocks support visibility toggle:

```tsx
const MyBlock = (props: Props) => {
  if (props.enable === false) return null;
  
  return <section>...</section>;
};
```
