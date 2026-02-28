# Content Guide

This document explains how to create and manage content using TinaCMS.

## Overview

Content is stored as MDX/JSON files in the `src/content/` directory and managed through the TinaCMS admin interface.

## Content Structure

```text
src/content/
├── global/
│   └── _index.mdx       # Header & footer settings
├── pages/
│   ├── home.mdx         # Homepage (/)
│   ├── work.mdx         # Work page (/work)
│   ├── projects.mdx     # Projects page (/projects)
│   ├── posts.mdx        # Blog listing (/posts)
│   └── 404.mdx          # Not found page
└── posts/
    ├── my-first-post.mdx
    └── another-post.mdx
```

---

## Using the Admin Interface

### Access

1. Start the dev server: `pnpm dev`
2. Navigate to: `http://localhost:3000/admin/index.html`

### Features

- **Visual editing**: Click any editable field on the page
- **Form editing**: Use the sidebar form for structured editing
- **Media manager**: Upload and manage images
- **Preview**: See changes in real-time

---

## Creating Pages

### Step 1: Create MDX File

Create a new file in `src/content/pages/`:

```yaml
# src/content/pages/about.mdx
---
draft: false
title: About
seo:
  metaTitle: About Me
  metaDescription: Learn more about my background and experience.
  canonical: https://triwritescode.com/about
blocks: []
---
```

### Step 2: Add Blocks

Add content blocks to the `blocks` array:

```yaml
blocks:
  - _template: richText
    enable: true
    body: |
      ## About Me
      
      This is my about page content...
```

### Step 3: Access the Page

The page will be available at `/{filename}` (e.g., `/about`).

---

## Creating Blog Posts

### Step 1: Create MDX File

Create a new file in `src/content/posts/`:

```yaml
# src/content/posts/my-new-post.mdx
---
draft: false
title: My New Post
publishedDate: 2024-03-15T00:00:00.000Z
seo:
  metaTitle: My New Post
  metaDescription: A brief description of what this post is about.
---

Your markdown content goes here...

## Subheading

More content with **bold** and *italic* text.

- List item 1
- List item 2

```javascript
// Code blocks work too
const greeting = "Hello, World!";
```
```

### Step 2: Publish

Set `draft: false` to make the post visible.

### Step 3: Access the Post

The post will be available at `/posts/{filename}` (e.g., `/posts/my-new-post`).

---

## Block Reference

### Summary Block

Hero section with profile info.

```yaml
blocks:
  - _template: summary
    enable: true
    avatar: /images/avatar.jpg
    name: Your Name
    subtitle: Your Title at Company
    bio: |
      Your bio text here. Supports **bold**, *italic*, and [links](https://example.com).
    socialLinks:
      - label: GitHub
        icon: FaGithub
        url: https://github.com/username
      - label: LinkedIn
        icon: FaLinkedin
        url: https://linkedin.com/in/username
```

---

### Experience Block

Work history timeline.

```yaml
blocks:
  - _template: experience
    enable: true
    title: Work Experience
    description: |
      A brief intro to your work history.
    experiences:
      - role: Senior Developer
        company: Acme Corp
        location: Jakarta, ID
        startDate: Jan 2023
        endDate: Present
        description: |
          Brief description of your role and the company.
        techStacks:
          - React
          - TypeScript
          - Node.js
        contributions:
          - Led the frontend architecture redesign
          - Improved page load times by 40%
          - Mentored junior developers
```

---

### Projects Block

Project showcase.

```yaml
blocks:
  - _template: projects
    enable: true
    title: Projects
    description: |
      Projects I've worked on.
    projects:
      - title: Project Name
        description: |
          Brief project description.
        logo: /images/project-logo.png
        achievements:
          - label: Users
            value: 1000+
          - label: Uptime
            value: 99.9%
        images:
          - src: /images/screenshot-1.png
            alt: Dashboard view
          - src: /images/screenshot-2.png
            alt: Settings page
        links:
          - icon: FiGlobe
            label: Website
            url: https://project.com
          - icon: FiGithub
            label: Source
            url: https://github.com/user/project
```

---

### PostList Block

Blog post listing with pagination.

```yaml
blocks:
  - _template: postList
    enable: true
    title: Blog
    description: |
      My thoughts and tutorials.
    postsPerPage: 10
```

---

### CTA Block

Call-to-action card.

```yaml
blocks:
  - _template: cta
    enable: true
    title: Get In Touch
    description: |
      Interested in working together? Let's chat!
    buttonLabel: Contact Me
    buttonLink: mailto:hello@example.com
```

---

### RichText Block

Simple markdown content.

```yaml
blocks:
  - _template: richText
    enable: true
    body: |
      ## Heading
      
      Your markdown content here.
```

---

### NotFound Block

404 error page.

```yaml
blocks:
  - _template: notFound
    enable: true
    title: Page Not Found
    description: |
      The page you're looking for doesn't exist.
    buttonLabel: Go Home
    buttonLink: /
```

---

## SEO Configuration

Every page and post supports SEO fields:

```yaml
seo:
  metaTitle: Page Title (60 chars max)
  metaDescription: Brief description for search results (50-160 chars)
  keywords:
    - keyword1
    - keyword2
  canonical: https://triwritescode.com/page-url
  noindex: false
  ogImage: /images/social-share.png
```

### Best Practices

1. **Meta Title**: Keep under 60 characters
2. **Meta Description**: 50-160 characters, include primary keyword
3. **Canonical URL**: Use full URL to prevent duplicates
4. **OG Image**: 1200×630 pixels for social sharing

---

## Global Settings

Edit `src/content/global/_index.mdx` to configure site-wide settings:

```yaml
---
header:
  navLinks:
    - label: Home
      icon: FaHome
      link: /
    - label: Work
      icon: FaBriefcase
      link: /work
    - label: Projects
      icon: FaCode
      link: /projects
    - label: Blog
      icon: FaFeather
      link: /posts
  ctaButton:
    label: Contact
    icon: FaEnvelope
    link: mailto:hello@example.com
footer:
  copyright: © 2024 Your Name. All rights reserved.
---
```

---

## Site Configuration

Edit `src/config/config.json` for site metadata:

```json
{
  "site": {
    "title": "Site Title",
    "description": "Default site description",
    "base_url": "https://yourdomain.com"
  },
  "google_tag_manager": {
    "enable": false,
    "gtm_id": "GTM-XXXXXXX"
  }
}
```

---

## Icons Reference

Icons use [react-icons](https://react-icons.github.io/react-icons/). Common icons:

### Font Awesome (Fa*)

| Icon | Name |
|------|------|
| 🏠 | `FaHome` |
| 💼 | `FaBriefcase` |
| 💻 | `FaCode` |
| ✍️ | `FaFeather` |
| ✉️ | `FaEnvelope` |
| 🔗 | `FaGithub` |
| 🔗 | `FaLinkedin` |
| 🐦 | `FaTwitter` |

### Feather Icons (Fi*)

| Icon | Name |
|------|------|
| 🌐 | `FiGlobe` |
| 📁 | `FiGithub` |
| ↗️ | `FiExternalLink` |
| ⬇️ | `FiChevronDown` |
| ⬅️ | `FiChevronLeft` |
| ➡️ | `FiChevronRight` |

---

## Tips

### Draft Mode

Set `draft: true` to hide content from production:

```yaml
draft: true  # Hidden in production
draft: false # Visible in production
```

### Rich Text Formatting

Rich text fields support:

- **Bold**: `**text**`
- *Italic*: `*text*`
- [Links](https://example.com): `[text](url)`
- Lists: `- item` or `1. item`
- Headings: `## Heading`
- Code: `` `inline` `` or fenced blocks

### Image Optimization

- Use WebP format for better compression
- Place images in `public/images/`
- Reference as `/images/filename.webp`

Convert PNG to WebP:

```bash
for f in *.png; do cwebp -q 80 "$f" -o "${f%.png}.webp" && rm "$f"; done
```

### Date Format

Use ISO 8601 format for dates:

```yaml
publishedDate: 2024-03-15T00:00:00.000Z
```

---

## Troubleshooting

### Content Not Appearing

1. Check `draft` is set to `false`
2. Verify file is in correct directory
3. Restart dev server: `pnpm dev`

### Schema Changes Not Reflected

1. Stop dev server
2. Delete `.next` folder (optional)
3. Restart: `pnpm dev`

### YAML Parsing Errors

- Ensure proper indentation (2 spaces)
- Quote strings with special characters
- Use `|` for multi-line text

```yaml
# Correct
description: |
  Multi-line text
  with proper formatting.

# Also correct
title: "Title with: special characters"
```
