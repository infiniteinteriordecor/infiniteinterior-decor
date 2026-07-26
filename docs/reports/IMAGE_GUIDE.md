# Image Guide

This document provides comprehensive guidelines for image naming, organization, and optimization for the Infinite Interior Decor website.

## Table of Contents

1. [Image Naming Standards](#image-naming-standards)
2. [Directory Structure](#directory-structure)
3. [Image Formats](#image-formats)
4. [Image Optimization](#image-optimization)
5. [Image Sizes](#image-sizes)
6. [Placeholder System](#placeholder-system)
7. [Best Practices](#best-practices)

---

## Image Naming Standards

### General Rules

- Use **lowercase** letters only
- Use **hyphens** (-) to separate words
- Use **descriptive** names that reflect the content
- Avoid special characters and spaces
- Keep names concise but meaningful
- Use **kebab-case** format (e.g., `living-room-modern.jpg`)

### Project Images

Project images should be organized by project in dedicated folders:

```
assets/images/projects/{project-slug}/
├── hero.webp              # Main project hero image
├── thumbnail.webp         # Project thumbnail (400x300)
├── gallery-01.webp        # Gallery image 1
├── gallery-02.webp        # Gallery image 2
├── gallery-03.webp        # Gallery image 3
└── ...
```

**Project slug format:** `{client-name}-{location}-{year}`

Examples:
- `sharma-residence-bhimtal-2024`
- `cafe-nainital-2023`
- `hotel-kathgodam-2024`

### Service Images

Service images should follow this pattern:

```
assets/images/services/
├── residential-interior-design.webp
├── commercial-interior-design.webp
├── retail-interior-design.webp
├── hospitality-interior-design.webp
├── turnkey-execution.webp
├── custom-furniture.webp
└── ...
```

### UI/Brand Images

```
assets/images/
├── logo.svg               # Main logo (vector)
├── logo-dark.svg          # Dark version
├── logo-light.svg         # Light version
├── favicon.ico            # Favicon
├── og-image.jpg           # Open Graph image (1200x630)
├── twitter-image.jpg      # Twitter card image (1200x630)
└── icons/                 # PWA icons
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-192x192.png
    └── ...
```

---

## Directory Structure

### Complete Image Structure

```
assets/
└── images/
    ├── projects/
    │   ├── {project-slug-1}/
    │   │   ├── hero.webp
    │   │   ├── thumbnail.webp
    │   │   └── gallery/
    │   │       ├── image-01.webp
    │   │       ├── image-02.webp
    │   │       └── ...
    │   ├── {project-slug-2}/
    │   └── ...
    ├── services/
    │   ├── residential-interior-design.webp
    │   ├── commercial-interior-design.webp
    │   └── ...
    ├── about/
    │   ├── office.webp
    │   ├── team.webp
    │   └── workshop.webp
    ├── icons/
    │   ├── icon-72x72.png
    │   ├── icon-96x96.png
    │   ├── icon-192x192.png
    │   ├── icon-512x512.png
    │   ├── mask-icon-192x192.png
    │   ├── mask-icon-512x512.png
    │   ├── shortcut-projects-96x96.png
    │   └── shortcut-contact-96x96.png
    ├── logo.svg
    ├── logo-dark.svg
    ├── logo-light.svg
    ├── favicon.ico
    ├── og-image.jpg
    └── twitter-image.jpg
```

---

## Image Formats

### Primary Format: WebP

**Use WebP for all images** where possible. WebP provides superior compression and quality compared to JPEG and PNG.

**Benefits:**
- 25-35% smaller than JPEG
- 25-35% smaller than PNG
- Supports transparency (alpha channel)
- Supports animation
- Wide browser support (95%+)

### Fallback Formats

For legacy browser support, provide JPEG/PNG fallbacks:

- **JPEG**: For photographs and complex images
- **PNG**: For images requiring transparency
- **SVG**: For logos, icons, and simple graphics (vector format)

### Format Selection Guide

| Image Type | Primary Format | Fallback |
|------------|---------------|----------|
| Photographs | WebP | JPEG |
| Graphics with transparency | WebP | PNG |
| Logos | SVG | PNG |
| Icons | SVG | PNG |
| Screenshots | WebP | PNG |

---

## Image Optimization

### Compression Guidelines

- **JPEG/WebP Quality**: 80-85%
- **PNG Compression**: Maximum (9)
- **SVG**: Remove unnecessary metadata and comments

### Tools for Optimization

**Online Tools:**
- TinyPNG (tinypng.com)
- Squoosh (squoosh.app)
- Cloudinary (cloudinary.com)

**Command Line Tools:**
```bash
# WebP conversion
cwebp -q 80 input.jpg -o output.webp

# PNG optimization
optipng -o7 input.png

# JPEG optimization
jpegoptim --max-quality=85 input.jpg
```

### Lazy Loading

All images should include lazy loading attributes:

```html
<img 
  src="image.webp" 
  alt="Description" 
  loading="lazy"
  width="800"
  height="600"
>
```

---

## Image Sizes

### Standard Dimensions

#### Project Images

| Type | Width | Height | Aspect Ratio |
|------|-------|--------|--------------|
| Hero | 1920 | 1080 | 16:9 |
| Thumbnail | 400 | 300 | 4:3 |
| Gallery | 1200 | 900 | 4:3 |
| Gallery Large | 1920 | 1440 | 4:3 |

#### Service Images

| Type | Width | Height | Aspect Ratio |
|------|-------|--------|--------------|
| Card Image | 600 | 375 | 16:10 |
| Detail Image | 1200 | 800 | 3:2 |

#### Social Media

| Platform | Width | Height | Aspect Ratio |
|----------|-------|--------|--------------|
| Open Graph | 1200 | 630 | 1.91:1 |
| Twitter Card | 1200 | 630 | 1.91:1 |
| Favicon | 32 | 32 | 1:1 |
| PWA Icon | 512 | 512 | 1:1 |

### Responsive Images

Use `srcset` for responsive images:

```html
<img 
  src="image-400.webp"
  srcset="
    image-400.webp 400w,
    image-800.webp 800w,
    image-1200.webp 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Description"
  loading="lazy"
>
```

---

## Placeholder System

### How It Works

The image placeholder system automatically generates elegant placeholders for images that haven't been uploaded yet.

### Usage

Add a placeholder div with data attributes:

```html
<div 
  class="image-placeholder" 
  data-text="Living Room" 
  data-width="600" 
  data-height="400"
></div>
```

### Data Attributes

- `data-text`: Text to display in the placeholder
- `data-width`: Width of the image (for aspect ratio)
- `data-height`: Height of the image (for aspect ratio)

### Logo Placeholder

For logo placeholders, add the `image-placeholder--logo` class:

```html
<div 
  class="image-placeholder image-placeholder--logo" 
  data-text="IID" 
  data-width="120" 
  data-height="40"
></div>
```

### Upgrading to Real Images

When real images are available, the placeholder system can upgrade automatically:

```javascript
// Manual upgrade
window.ImagePlaceholder.upgrade(placeholderElement, '/path/to/real-image.webp');
```

---

## Best Practices

### 1. Always Include Alt Text

```html
<img src="image.webp" alt="Modern living room with beige sofa and wooden coffee table">
```

### 2. Specify Dimensions

Always specify width and height to prevent layout shift:

```html
<img src="image.webp" width="800" height="600" alt="Description">
```

### 3. Use Progressive Loading

For large images, consider progressive JPEG or WebP:

```html
<img 
  src="image-low-quality.webp"
  data-src="image-high-quality.webp"
  alt="Description"
  class="lazyload"
>
```

### 4. Optimize for Web

- Compress images before uploading
- Use appropriate formats
- Implement lazy loading
- Use CDN for delivery
- Enable browser caching

### 5. Maintain Consistency

- Follow naming conventions consistently
- Use consistent aspect ratios within sections
- Maintain similar quality levels across images
- Keep file sizes reasonable (under 500KB for most images)

### 6. Test Performance

- Use Google PageSpeed Insights
- Check Lighthouse scores
- Monitor Core Web Vitals
- Test on slow connections

### 7. Backup Originals

Always keep original, uncompressed versions of important images for future use or re-optimization.

---

## Checklist

Before deploying images:

- [ ] All images follow naming conventions
- [ ] Images are in correct directories
- [ ] WebP format used where possible
- [ ] Images are optimized and compressed
- [ ] Alt text is descriptive and accurate
- [ ] Dimensions are specified
- [ ] Lazy loading implemented
- [ ] Responsive images with srcset
- [ ] File sizes are reasonable
- [ ] Tested on multiple devices
- [ ] Originals backed up

---

## Contact

For questions or clarifications about image guidelines, contact the development team.

**Last Updated:** January 15, 2024
