# Image Guidelines & Management SOP

This document provides comprehensive guidelines for uploading, managing, and referencing images across the Infinite Interior Decor website.

---

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [Image Categories & Conventions](#image-categories--conventions)
3. [File Format Requirements](#file-format-requirements)
4. [Image Reference Methods](#image-reference-methods)
5. [Upload Procedures](#upload-procedures)
6. [Best Practices](#best-practices)

---

## Directory Structure

```
assets/images/
├── clients/              # Client logo images
├── company/             # Company-related images (team, office, etc.)
├── gallery/             # General gallery images
├── hero/                # Hero banner images
├── logo/                # Company logo variations
├── projects/            # Project-specific images
│   ├── {project-id}/    # Individual project folder
│   │   └── gallery/     # Project gallery images
├── services/            # Service-related images
└── team/                # Team member photos
```

---

## Image Categories & Conventions

### 1. Hero Images

**Location:** `assets/images/hero/`

| Purpose | File Name | Format | Dimensions | Usage |
|---------|-----------|--------|------------|-------|
| Main hero banner | `hero.webp` | WebP | 1920x1080 | JavaScript (home.js) |

**Reference Method:** JavaScript
```javascript
// File: js/pages/home.js
const heroImagePath = window.resolveAssetPath('assets/images/hero/hero.webp');
el.style.backgroundImage = `url('${heroImagePath}')`;
```

---

### 2. Logo Images

**Location:** `assets/images/logo/`

| Purpose | File Name | Format | Dimensions | Usage |
|---------|-----------|--------|------------|-------|
| Main navbar logo | `logo.png` | PNG | 200x100 | JavaScript (navbar.js) |
| Schema.org logo | `logo.svg` | SVG | Variable | JavaScript (schema.js) |

**Reference Method:** JavaScript
```javascript
// File: js/core/navbar.js
const logoPath = window.resolveAssetPath('assets/images/logo/logo.png');
const logoHTML = `<img src="${logoPath}" alt="Infinite Interior Decor" class="navbar__logo-image">`;
```

---

### 3. Project Images

**Location:** `assets/images/projects/{project-id}/gallery/`

**Naming Convention:**
- Project folder: `{project-id}` (kebab-case, matches database.json `id` field)
- Gallery images: `image-01.webp`, `image-02.webp`, `image-03.webp`, etc.

| Purpose | File Name | Format | Dimensions | Usage |
|---------|-----------|--------|------------|-------|
| Project thumbnail | `image-01.webp` | WebP | 1920x1080 | database.json |
| Gallery images | `image-01.webp` to `image-N.webp` | WebP | 1920x1080 | database.json |

**Reference Method:** database.json
```json
{
  "id": "baithke-bihari-jehanabad-2023",
  "image": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp",
  "thumbnail": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp",
  "gallery": [
    "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp",
    "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-02.webp",
    "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-03.webp",
    "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-04.webp"
  ]
}
```

**Project ID Examples:**
- `baithke-bihari-jehanabad-2023`
- `monte-carlo-jehanabad-2023`
- `modern-residential-bhimtal-2022`
- `the-salon-company-bhimtal-2022`

---

### 4. Client Logos

**Location:** `assets/images/clients/`

**Naming Convention:** `{client-name}.{ext}` (lowercase, hyphens for spaces)

| Purpose | File Name | Format | Dimensions | Usage |
|---------|-----------|--------|------------|-------|
| Client logos | `{client-name}.svg` or `{client-name}.png` | SVG/PNG/JPG | Variable | database.json |

**Reference Method:** database.json
```json
{
  "name": "Reebok",
  "logo": "assets/images/clients/reebok.svg",
  "website": "https://www.reebok.com",
  "category": "Sportswear"
}
```

**Current Client Logos:**
- `reebok.svg`
- `adidas.svg`
- `blackberrys.png`
- `monte-carlo.png`
- `manyavar.png`
- `red-tape.jpg`
- `van-heusen.png`
- `nazeer.png`
- `baithke-bihari-cafe.png`
- `hairmasters.png`
- `the-salons-company.jpg`

---

### 5. Social Media & SEO Images

**Location:** `assets/images/` (root level)

| Purpose | File Name | Format | Dimensions | Usage |
|---------|-----------|--------|------------|-------|
| Open Graph image | `og-image.jpg` | JPG | 1200x630 | HTML meta tags |
| Twitter image | `twitter-image.jpg` | JPG | 1200x630 | HTML meta tags |

**Reference Method:** HTML (meta tags)
```html
<!-- Open Graph -->
<meta property="og:image" content="https://infiniteinterior.com/assets/images/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:image" content="https://infiniteinterior.com/assets/images/twitter-image.jpg">
```

**Files to Update:** All HTML files (index.html, pages/about/index.html, pages/services/index.html, pages/projects/index.html, pages/projects/detail/index.html, pages/gallery/index.html, pages/contact/index.html)

---

### 6. Service Images

**Location:** `assets/images/services/`

**Naming Convention:** `service-{id}.webp` (e.g., `service-residential.webp`)

| Purpose | File Name | Format | Dimensions | Usage |
|---------|-----------|--------|------------|-------|
| Service icons/images | `service-{id}.webp` | WebP | 600x375 | database.json (future) |

**Status:** Currently empty - to be implemented when service images are added.

---

### 7. Team Images

**Location:** `assets/images/team/`

**Naming Convention:** `team-{name}.webp` (e.g., `team-john-doe.webp`)

| Purpose | File Name | Format | Dimensions | Usage |
|---------|-----------|--------|------------|-------|
| Team member photos | `team-{name}.webp` | WebP | 400x400 | database.json (future) |

**Status:** Currently empty - to be implemented when team section is added.

---

### 8. Company Images

**Location:** `assets/images/company/`

**Naming Convention:** Descriptive names (e.g., `office-01.webp`, `about-banner.webp`)

| Purpose | File Name | Format | Dimensions | Usage |
|---------|-----------|--------|------------|-------|
| Office photos | `office-{N}.webp` | WebP | 1920x1080 | database.json (future) |
| About section images | `about-{section}.webp` | WebP | 1920x1080 | database.json (future) |

**Status:** Currently empty - to be implemented when company images are added.

---

### 9. General Gallery Images

**Location:** `assets/images/gallery/`

**Naming Convention:** `gallery-{category}-{N}.webp` (e.g., `gallery-residential-01.webp`)

| Purpose | File Name | Format | Dimensions | Usage |
|---------|-----------|--------|------------|-------|
| General gallery | `gallery-{category}-{N}.webp` | WebP | 1920x1080 | database.json (future) |

**Status:** Currently empty - to be implemented when general gallery is added.

---

## File Format Requirements

### Preferred Formats

| Image Type | Preferred Format | Alternative Formats | Notes |
|------------|------------------|-------------------|-------|
| Photographs | WebP | JPG, PNG | WebP provides best compression/quality ratio |
| Logos (vector) | SVG | PNG | SVG preferred for scalability |
| Logos (raster) | PNG | JPG, WebP | PNG supports transparency |
| Icons | SVG | PNG | SVG preferred for scalability |

### Format Guidelines

1. **WebP** - Use for all photographs and raster images
   - Superior compression compared to JPEG/PNG
   - Supports transparency (alpha channel)
   - Browser support: 95%+ globally

2. **SVG** - Use for logos and icons
   - Scalable without quality loss
   - Smaller file size for simple graphics
   - Editable with text editors

3. **PNG** - Use when transparency is required and WebP is not an option
   - Lossless compression
   - Supports alpha channel

4. **JPG** - Use for social media/OG images
   - Maximum compatibility
   - Good compression for photographs

---

## Image Reference Methods

### Method 1: database.json (Dynamic Content)

**Used For:** Projects, Clients, Services, Team, Gallery

**Process:**
1. Add image files to appropriate directory
2. Update `data/database.json` with file paths
3. JavaScript automatically loads and renders images

**Example:**
```json
// data/database.json
{
  "projects": [
    {
      "id": "project-id",
      "image": "assets/images/projects/project-id/gallery/image-01.webp",
      "thumbnail": "assets/images/projects/project-id/gallery/image-01.webp",
      "gallery": [
        "assets/images/projects/project-id/gallery/image-01.webp",
        "assets/images/projects/project-id/gallery/image-02.webp"
      ]
    }
  ]
}
```

---

### Method 2: JavaScript (Hardcoded References)

**Used For:** Hero images, Logo, Schema.org structured data

**Process:**
1. Add image file to appropriate directory
2. Update JavaScript file with correct path
3. Use `window.resolveAssetPath()` for GitHub Pages compatibility

**Example:**
```javascript
// js/pages/home.js
const heroImagePath = window.resolveAssetPath('assets/images/hero/hero.webp');
el.style.backgroundImage = `url('${heroImagePath}')`;
```

---

### Method 3: HTML (Meta Tags)

**Used For:** Open Graph images, Twitter cards, Schema.org references

**Process:**
1. Add image file to appropriate directory
2. Update HTML meta tags in all page files
3. Use absolute URLs for social media

**Example:**
```html
<meta property="og:image" content="https://infiniteinterior.com/assets/images/og-image.jpg">
```

**Files to Update:**
- `index.html`
- `pages/about/index.html`
- `pages/services/index.html`
- `pages/projects/index.html`
- `pages/projects/detail/index.html`
- `pages/gallery/index.html`
- `pages/contact/index.html`

---

## Upload Procedures

### Adding New Project Images

1. **Create Project Folder:**
   ```bash
   mkdir assets/images/projects/{project-id}
   mkdir assets/images/projects/{project-id}/gallery
   ```

2. **Add Image Files:**
   - Copy images to `assets/images/projects/{project-id}/gallery/`
   - Rename to `image-01.webp`, `image-02.webp`, etc.

3. **Update database.json:**
   ```json
   {
     "id": "{project-id}",
     "image": "assets/images/projects/{project-id}/gallery/image-01.webp",
     "thumbnail": "assets/images/projects/{project-id}/gallery/image-01.webp",
     "gallery": [
       "assets/images/projects/{project-id}/gallery/image-01.webp",
       "assets/images/projects/{project-id}/gallery/image-02.webp",
       "assets/images/projects/{project-id}/gallery/image-03.webp"
     ]
   }
   ```

4. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Add gallery images for {project-name} project"
   git push origin main
   ```

---

### Adding New Client Logo

1. **Add Logo File:**
   - Copy logo to `assets/images/clients/`
   - Rename to `{client-name}.{ext}` (lowercase, hyphens)

2. **Update database.json:**
   ```json
   {
     "name": "Client Name",
     "logo": "assets/images/clients/{client-name}.svg",
     "website": "https://example.com",
     "category": "Category"
   }
   ```

3. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Add client logo for {client-name}"
   git push origin main
   ```

---

### Updating Hero Image

1. **Replace Hero File:**
   - Replace `assets/images/hero/hero.webp`

2. **No Code Changes Required:**
   - JavaScript automatically loads the file

3. **Commit and Push:**
   ```bash
   git add assets/images/hero/hero.webp
   git commit -m "Update hero banner image"
   git push origin main
   ```

---

### Updating Logo

1. **Replace Logo File:**
   - Replace `assets/images/logo/logo.png`

2. **No Code Changes Required:**
   - JavaScript automatically loads the file

3. **Commit and Push:**
   ```bash
   git add assets/images/logo/logo.png
   git commit -m "Update company logo"
   git push origin main
   ```

---

### Updating Social Media Images

1. **Replace OG/Twitter Images:**
   - Replace `assets/images/og-image.jpg`
   - Replace `assets/images/twitter-image.jpg`

2. **Update All HTML Files:**
   - Update meta tags in all 7 HTML files (see list above)

3. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Update social media images"
   git push origin main
   ```

---

## Best Practices

### Image Optimization

1. **Compression:**
   - Use tools like Squoosh, TinyPNG, or ImageOptim
   - Target file size: < 500KB for hero images, < 200KB for thumbnails

2. **Dimensions:**
   - Hero images: 1920x1080 (16:9 aspect ratio)
   - Thumbnails: 600x375 (16:9 aspect ratio)
   - Logos: Maintain original aspect ratio, max width 200px

3. **Quality:**
   - WebP: Quality 80-85%
   - JPG: Quality 80%
   - PNG: Use PNG-8 for simple graphics, PNG-24 for photos

### Accessibility

1. **Alt Text:**
   - Always provide descriptive alt text
   - Use `alt=""` for decorative images

2. **Lazy Loading:**
   - Use `loading="lazy"` for below-the-fold images
   - Use `loading="eager"` for hero/above-the-fold images

3. **Dimensions:**
   - Always specify width and height to prevent layout shift

### GitHub Pages Compatibility

1. **Path Resolution:**
   - Always use `window.resolveAssetPath()` for dynamic paths
   - Never hardcode absolute URLs

2. **Relative Paths:**
   - Use paths relative to `assets/images/`
   - Example: `assets/images/projects/{id}/gallery/image-01.webp`

### Version Control

1. **Commit Messages:**
   - Use descriptive commit messages
   - Include project/client names when relevant

2. **File Naming:**
   - Use kebab-case for all file names
   - Use sequential numbering for galleries (image-01, image-02, etc.)

3. **Large Files:**
   - GitHub has a 100MB file size limit
   - Use compression to stay under this limit

---

## Quick Reference

| Category | Location | Naming | Format | Reference |
|----------|----------|--------|--------|-----------|
| Hero | `assets/images/hero/` | `hero.webp` | WebP | JS (home.js) |
| Logo | `assets/images/logo/` | `logo.png` | PNG | JS (navbar.js) |
| Projects | `assets/images/projects/{id}/gallery/` | `image-01.webp` | WebP | database.json |
| Clients | `assets/images/clients/` | `{name}.svg` | SVG/PNG | database.json |
| OG Image | `assets/images/` | `og-image.jpg` | JPG | HTML meta |
| Twitter | `assets/images/` | `twitter-image.jpg` | JPG | HTML meta |

---

## Troubleshooting

### Images Not Loading

1. **Check File Path:**
   - Verify path matches exactly (case-sensitive)
   - Ensure file exists in correct directory

2. **Check database.json:**
   - Verify JSON syntax is valid
   - Ensure paths are wrapped in quotes

3. **Check Browser Console:**
   - Look for 404 errors
   - Check for path resolution errors

### Images Not Visible

1. **CSS Visibility:**
   - Ensure `onload` handler adds `.loaded` class
   - Check CSS for `img:not(.loaded)` rules

2. **Lazy Loading:**
   - Verify `loading="lazy"` is not preventing above-the-fold images
   - Check Intersection Observer is working

### GitHub Pages Issues

1. **Path Resolution:**
   - Ensure `window.resolveAssetPath()` is used
   - Check repository name matches subpath

2. **File Case:**
   - GitHub Pages is case-sensitive
   - Ensure file names match exactly (lowercase recommended)
