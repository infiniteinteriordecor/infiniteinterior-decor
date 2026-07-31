# Asset System Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\assets\`  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses a static asset system optimized for GitHub Pages hosting. Assets include images, fonts, icons, and other media files.

---

## Asset Structure

```
assets/
├── images/                     # Image assets
│   ├── hero/                   # Hero section images
│   ├── services/               # Service images
│   ├── projects/               # Project images
│   ├── gallery/                # Gallery images
│   ├── brand/                  # Brand/logo images
│   └── icons/                  # Icon images
├── fonts/                      # Font files (if custom)
└── icons/                      # Icon files (SVG, etc.)
```

---

## Image Assets

### Image Categories

#### Hero Images
**Location:** `assets/images/hero/`

**Purpose:** Hero section background and featured images

**Types:**
- Background images
- Featured project images
- Atmospheric images

**Formats:**
- WebP (preferred)
- JPEG (fallback)
- PNG (for transparency)

#### Service Images
**Location:** `assets/images/services/`

**Purpose:** Service section images

**Naming Convention:**
```
service-1.webp
service-2.webp
service-3.webp
```

#### Project Images
**Location:** `assets/images/projects/`

**Purpose:** Project showcase images

**Naming Convention:**
```
project-1.webp
project-2.webp
project-3.webp
```

#### Gallery Images
**Location:** `assets/images/gallery/`

**Purpose:** Gallery section images

**Naming Convention:**
```
gallery-1.webp
gallery-2.webp
gallery-3.webp
```

#### Brand Images
**Location:** `assets/images/brand/`

**Purpose:** Brand and logo images

**Files:**
- Logo files
- Brand assets
- Marketing materials

#### Icon Images
**Location:** `assets/images/icons/`

**Purpose:** Icon images

**Types:**
- Feature icons
- UI icons
- Social media icons

---

## Image Placeholder System

### Purpose

The project uses a sophisticated image placeholder system to handle missing images gracefully and provide visual consistency.

### Implementation

**File:** `js/core/image-placeholder.js`

**Features:**
- Generates placeholder images
- Displays text overlays
- Provides fallback for missing images
- Consistent sizing and styling

**Usage:**
```javascript
ImagePlaceholder.init();
```

**CSS:** `css/components/image-placeholder.css`

**Styles:**
```css
.image-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
}
```

---

## Font Assets

### Google Fonts

**Primary Fonts:**
- **Cormorant Garamond** - Serif font for headings
- **Plus Jakarta Sans** - Sans-serif font for body text

**Loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap">
```

**Font Weights:**
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Custom Fonts

**Location:** `assets/fonts/`

**Status:** Not Implemented (using Google Fonts)

---

## Icon Assets

### Icon System

**Status:** Using inline SVG icons and emoji icons

**Inline SVG:**
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M18 6L6 18M6 6l12 12"/>
</svg>
```

**Emoji Icons:**
```html
<span>🏠</span>
<span>📞</span>
<span>✉️</span>
```

### Icon Locations

**Status:** Not using external icon files (using inline SVGs)

---

## Asset Optimization

### Image Optimization

**Techniques:**
1. **WebP Format**
   - Smaller file size
   - Better compression
   - Modern browser support

2. **Lazy Loading**
   ```html
   <img src="placeholder.jpg" data-src="actual.jpg" loading="lazy">
   ```

3. **Responsive Images**
   ```html
   <img src="image-small.jpg"
        srcset="image-small.jpg 480w,
                image-medium.jpg 768w,
                image-large.jpg 1024w"
        sizes="(max-width: 768px) 480px,
               (max-width: 1024px) 768px,
               1024px">
   ```

4. **Image Preloading**
   ```javascript
   preloadImage('assets/images/services/service-1.webp');
   ```

### Font Optimization

**Techniques:**
1. **Preconnect**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```

2. **Font Display**
   ```css
   @font-face {
     font-display: swap;
   }
   ```

3. **Subset Fonts**
   - Load only needed characters
   - Reduce file size

---

## Asset Loading

### Loading Strategy

**Critical Assets:**
- Favicon
- Above-the-fold images
- Critical CSS
- Critical JavaScript

**Deferred Assets:**
- Below-the-fold images
- Non-critical JavaScript
- Font files

**Background Assets:**
- Secondary images
- Media files
- Large assets

### Loading Implementation

**Preloading:**
```html
<link rel="preload" href="css/main.css" as="style">
<link rel="preload" href="js/core/app.js" as="script">
```

**Lazy Loading:**
```html
<img src="placeholder.jpg" data-src="actual.jpg" loading="lazy">
```

**Predictive Prefetching:**
```javascript
link.addEventListener('mouseenter', () => {
  const prefetchLink = document.createElement('link');
  prefetchLink.rel = 'prefetch';
  prefetchLink.href = window.resolveAssetPath(href);
  document.head.appendChild(prefetchLink);
});
```

---

## Asset Path Resolution

### Base URL Detection

**Function:** `window.getBaseUrl()`

**Purpose:** Detect base URL for GitHub Pages

```javascript
window.getBaseUrl = function() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  if (!isGitHubPages) return '/';
  
  const pathSegments = window.location.pathname.split('/').filter(segment => segment.length > 0);
  const repoName = pathSegments[0] || '';
  return '/' + repoName + '/';
};
```

### Asset Path Resolution

**Function:** `window.resolveAssetPath(path)`

**Purpose:** Resolve asset paths correctly

```javascript
window.resolveAssetPath = function(assetPath) {
  if (!assetPath) return '';
  const baseUrl = window.getBaseUrl();
  let cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  return baseUrl + cleanPath;
};
```

**Examples:**
- `resolveAssetPath('css/main.css')` → `/repo/css/main.css`
- `resolveAssetPath('assets/images/hero.jpg')` → `/repo/assets/images/hero.jpg`

---

## Asset Caching

### Browser Caching

**Cache Headers:** (GitHub Pages default)
- CSS/JS: 1 year
- Images: 1 year
- Fonts: 1 year

### Application Caching

**Session Storage:**
```javascript
sessionStorage.setItem('infinite-interior-data/database.json', JSON.stringify(data));
```

**Service Worker:** (Not Implemented)

---

## Asset Management

### File Naming Conventions

**Images:**
- kebab-case: `hero-background.webp`
- Descriptive: `service-kitchen.webp`
- Numbered: `project-1.webp`

**Fonts:**
- kebab-case: `font-name.woff2`

**Icons:**
- kebab-case: `icon-name.svg`

### Directory Structure

**Organized by:**
- Type (images, fonts, icons)
- Category (hero, services, projects)
- Purpose (brand, ui, social)

---

## Asset Best Practices

### 1. Use WebP Format
- Smaller file size
- Better quality
- Modern browser support

### 2. Lazy Load Images
- Reduce initial load time
- Load images as needed
- Improve performance

### 3. Optimize Images
- Compress images
- Remove metadata
- Use appropriate dimensions

### 4. Use Placeholders
- Handle missing images
- Provide visual consistency
- Improve user experience

### 5. Resolve Paths Correctly
- Use asset path resolution
- Handle GitHub Pages subpath
- Prevent broken links

---

## Asset Status

### Implemented
- ✅ Image placeholder system
- ✅ Google Fonts integration
- ✅ Inline SVG icons
- ✅ Asset path resolution
- ✅ Lazy loading
- ✅ Predictive prefetching
- ✅ Image preloading

### Not Implemented
- ❌ Custom font files
- ❌ External icon files
- ❌ Service Worker caching
- ❌ Image CDN
- ❌ Asset optimization pipeline

---

## Notes

- Static asset system
- GitHub Pages compatible
- Image placeholder system
- Google Fonts integration
- Inline SVG icons
- Asset path resolution
- Lazy loading
- Predictive prefetching

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
