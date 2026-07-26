# Path Report

**Project Name:** Infinite Interior Decor Website  
**Version:** 2.0  
**Date:** January 15, 2024  
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#overview)
2. [Navigation Paths](#navigation-paths)
3. [Page Paths](#page-paths)
4. [Asset Paths](#asset-paths)
5. [JavaScript Paths](#javascript-paths)
6. [CSS Paths](#css-paths)
7. [Data Paths](#data-paths)
8. [External Paths](#external-paths)
9. [Path Validation](#path-validation)
10. [Best Practices](#best-practices)

---

## Overview

This document provides a comprehensive overview of all paths used in the Infinite Interior Decor website. All paths are designed to work correctly in both web server mode (http://) and local file mode (file://).

### Path Convention

- **Navigation Links:** Point explicitly to `index.html` files
- **Relative Paths:** Use `../` or `../../` based on directory depth
- **Asset Paths:** Relative to the root directory from pages
- **External Paths:** Absolute URLs for external resources

---

## Navigation Paths

### Homepage Navigation

**From:** `index.html`

| Link | Destination | Type |
|------|-------------|------|
| `index.html` | Homepage | Self |
| `pages/about/index.html` | About Page | Internal |
| `pages/services/index.html` | Services Page | Internal |
| `pages/projects/index.html` | Projects Page | Internal |
| `pages/gallery/index.html` | Gallery Page | Internal |
| `pages/contact/index.html` | Contact Page | Internal |

### About Page Navigation

**From:** `pages/about/index.html`

| Link | Destination | Type |
|------|-------------|------|
| `../../index.html` | Homepage | Internal |
| `../` | About Page | Self |
| `../services/index.html` | Services Page | Internal |
| `../projects/index.html` | Projects Page | Internal |
| `../gallery/index.html` | Gallery Page | Internal |
| `../contact/index.html` | Contact Page | Internal |

### Services Page Navigation

**From:** `pages/services/index.html`

| Link | Destination | Type |
|------|-------------|------|
| `../../index.html` | Homepage | Internal |
| `../about/index.html` | About Page | Internal |
| `../` | Services Page | Self |
| `../projects/index.html` | Projects Page | Internal |
| `../gallery/index.html` | Gallery Page | Internal |
| `../contact/index.html` | Contact Page | Internal |

### Projects Page Navigation

**From:** `pages/projects/index.html`

| Link | Destination | Type |
|------|-------------|------|
| `../../index.html` | Homepage | Internal |
| `../about/index.html` | About Page | Internal |
| `../services/index.html` | Services Page | Internal |
| `../` | Projects Page | Self |
| `../gallery/index.html` | Gallery Page | Internal |
| `../contact/index.html` | Contact Page | Internal |

### Gallery Page Navigation

**From:** `pages/gallery/index.html`

| Link | Destination | Type |
|------|-------------|------|
| `../../index.html` | Homepage | Internal |
| `../about/index.html` | About Page | Internal |
| `../services/index.html` | Services Page | Internal |
| `../projects/index.html` | Projects Page | Internal |
| `../` | Gallery Page | Self |
| `../contact/index.html` | Contact Page | Internal |

### Contact Page Navigation

**From:** `pages/contact/index.html`

| Link | Destination | Type |
|------|-------------|------|
| `../../index.html` | Homepage | Internal |
| `../about/index.html` | About Page | Internal |
| `../services/index.html` | Services Page | Internal |
| `../projects/index.html` | Projects Page | Internal |
| `../gallery/index.html` | Gallery Page | Internal |
| `../` | Contact Page | Self |

### 404 Page Navigation

**From:** `pages/404/index.html`

| Link | Destination | Type |
|------|-------------|------|
| `../index.html` | Homepage | Internal |
| `javascript:history.back()` | Previous Page | JavaScript |

---

## Page Paths

### Root Level Pages

| File | URL | Purpose |
|------|-----|---------|
| `index.html` | `/` or `/index.html` | Homepage |
| `robots.txt` | `/robots.txt` | Search engine directives |
| `sitemap.xml` | `/sitemap.xml` | XML sitemap |
| `manifest.json` | `/manifest.json` | PWA manifest |

### Pages Directory

| File | URL | Purpose |
|------|-----|---------|
| `pages/about/index.html` | `/pages/about/` | About page |
| `pages/services/index.html` | `/pages/services/` | Services page |
| `pages/projects/index.html` | `/pages/projects/` | Projects page |
| `pages/gallery/index.html` | `/pages/gallery/` | Gallery page |
| `pages/contact/index.html` | `/pages/contact/` | Contact page |
| `pages/privacy/index.html` | `/pages/privacy/` | Privacy Policy |
| `pages/terms/index.html` | `/pages/terms/` | Terms & Conditions |
| `pages/404/index.html` | `/pages/404/` | 404 error page |

### Documentation

| File | Purpose |
|------|---------|
| `IMAGE_GUIDE.md` | Image naming and optimization guidelines |
| `PROJECT_ARCHITECTURE_REPORT.md` | Project architecture documentation |
| `SEO_REPORT.md` | SEO implementation report |
| `PATH_REPORT.md` | This file - path documentation |

---

## Asset Paths

### From Root Level Pages

**From:** `index.html`

| Asset Type | Path | Notes |
|------------|------|-------|
| CSS | `config/design-tokens.css` | Design tokens |
| CSS | `config/breakpoints.css` | Breakpoints |
| CSS | `config/reset.css` | CSS reset |
| CSS | `css/global.css` | Global styles |
| CSS | `css/navbar.css` | Navigation styles |
| CSS | `css/hero.css` | Hero styles |
| CSS | `css/services.css` | Services styles |
| CSS | `css/projects.css` | Projects styles |
| CSS | `css/cta.css` | CTA styles |
| CSS | `css/footer.css` | Footer styles |
| CSS | `css/image-placeholder.css` | Placeholder styles |
| JS | `js/home.js` | Homepage logic |
| JS | `js/app.js` | Application logic |
| JS | `js/animation.js` | Animation utilities |
| JS | `js/navbar.js` | Navigation logic |
| JS | `js/hero.js` | Hero logic |
| JS | `js/services.js` | Services logic |
| JS | `js/projects.js` | Projects logic |
| JS | `js/cta.js` | CTA logic |
| JS | `js/footer.js` | Footer logic |
| JS | `js/schema.js` | Schema.org data |
| Data | `data/database.json` | Content data |

### From Pages Directory

**From:** `pages/*/index.html`

| Asset Type | Path | Notes |
|------------|------|-------|
| CSS | `../../config/design-tokens.css` | Design tokens |
| CSS | `../../config/breakpoints.css` | Breakpoints |
| CSS | `../../config/reset.css` | CSS reset |
| CSS | `../../css/global.css` | Global styles |
| CSS | `../../css/navbar.css` | Navigation styles |
| CSS | `../../css/footer.css` | Footer styles |
| CSS | `../../css/image-placeholder.css` | Placeholder styles |
| CSS | `../../css/about-page.css` | About page styles |
| CSS | `../../css/services-page.css` | Services page styles |
| CSS | `../../css/gallery-page.css` | Gallery page styles |
| CSS | `../../css/contact-page.css` | Contact page styles |
| CSS | `../../css/404-page.css` | 404 page styles |
| CSS | `../../css/legal-page.css` | Legal pages styles |
| CSS | `../../css/cta.css` | CTA styles |
| JS | `../../js/image-placeholder.js` | Placeholder system |
| JS | `../../js/schema.js` | Schema.org data |
| Data | `../../data/database.json` | Content data |

### From 404 Page

**From:** `pages/404/index.html`

| Asset Type | Path | Notes |
|------------|------|-------|
| CSS | `../config/design-tokens.css` | Design tokens |
| CSS | `../config/breakpoints.css` | Breakpoints |
| CSS | `../config/reset.css` | CSS reset |
| CSS | `../css/global.css` | Global styles |
| CSS | `../css/404-page.css` | 404 page styles |
| CSS | `../css/button.css` | Button styles |

---

## JavaScript Paths

### Data Fetching

**From:** All pages with dynamic content

| Script | Data Path | Purpose |
|--------|-----------|---------|
| `js/projects.js` | `../../data/database.json` | Load projects data |
| `js/schema.js` | `data/database.json` | Load schema data |

### Image Placeholder System

**From:** All pages with images

| Script | Purpose |
|--------|---------|
| `js/image-placeholder.js` | Render image placeholders |

### Schema Generator

**From:** All pages

| Script | Purpose |
|--------|---------|
| `js/schema.js` | Generate Schema.org structured data |

---

## CSS Paths

### Configuration CSS

| File | Used By | Purpose |
|------|---------|---------|
| `config/design-tokens.css` | All pages | CSS custom properties |
| `config/breakpoints.css` | All pages | Responsive breakpoints |
| `config/reset.css` | All pages | CSS reset |

### Component CSS

| File | Used By | Purpose |
|------|---------|---------|
| `css/global.css` | All pages | Global styles |
| `css/navbar.css` | All pages | Navigation styles |
| `css/footer.css` | All pages | Footer styles |
| `css/cta.css` | All pages | CTA styles |
| `css/image-placeholder.css` | All pages | Placeholder styles |

### Page-Specific CSS

| File | Used By | Purpose |
|------|---------|---------|
| `css/hero.css` | Homepage | Hero section |
| `css/services.css` | Homepage | Services section |
| `css/projects.css` | Homepage | Projects section |
| `css/about-page.css` | About page | About page styles |
| `css/services-page.css` | Services page | Services page styles |
| `css/gallery-page.css` | Gallery page | Gallery page styles |
| `css/contact-page.css` | Contact page | Contact page styles |
| `css/404-page.css` | 404 page | 404 page styles |
| `css/legal-page.css` | Privacy/Terms | Legal pages styles |

---

## Data Paths

### Database

| File | Path | Purpose |
|------|------|---------|
| `data/database.json` | `data/database.json` (root) | Central content database |
| `data/database.json` | `../../data/database.json` (pages) | Central content database |

### Data Structure

```json
{
  "company": { ... },
  "about": { ... },
  "services": [ ... ],
  "projects": [ ... ],
  "faq": [ ... ],
  "contact": { ... },
  "seo": { ... }
}
```

---

## External Paths

### Fonts

| Resource | URL | Purpose |
|----------|-----|---------|
| Google Fonts | `https://fonts.googleapis.com` | Font delivery |
| Google Fonts | `https://fonts.gstatic.com` | Font delivery |

### Social Media Links

| Platform | URL Pattern | Example |
|----------|-------------|---------|
| WhatsApp | `https://wa.me/{number}` | `https://wa.me/916398038550` |
| Email | `mailto:{email}` | `mailto:infiniteinteriordecor@gmail.com` |
| Phone | `tel:{number}` | `tel:+916398038550` |

### External Links (Future)

| Type | URL Pattern | Notes |
|------|-------------|-------|
| Social Media | Platform-specific | Instagram, Pinterest, LinkedIn |
| Reviews | Google Business Profile | Customer reviews |
| Analytics | Google Analytics | Tracking |

---

## Path Validation

### Validation Rules

1. **All navigation links must point to `index.html` files**
2. **Relative paths must be correct for directory depth**
3. **Asset paths must work from both root and pages directories**
4. **External paths must use absolute URLs**
5. **No broken links or missing files**

### Validation Status

| Category | Status | Notes |
|----------|--------|-------|
| Navigation Links | ✅ Valid | All point to index.html |
| CSS Paths | ✅ Valid | Correct relative paths |
| JS Paths | ✅ Valid | Correct relative paths |
| Data Paths | ✅ Valid | Correct relative paths |
| Asset Paths | ✅ Valid | Correct relative paths |
| External Paths | ✅ Valid | Absolute URLs used |

### File Mode Compatibility

All paths are designed to work in:
- **Web Server Mode:** `http://localhost/` or `https://domain.com/`
- **Local File Mode:** `file:///C:/path/to/file`

---

## Best Practices

### 1. Navigation Links

**Do:**
```html
<a href="pages/about/index.html">About</a>
```

**Don't:**
```html
<a href="pages/about/">About</a>
```

### 2. Relative Paths

**From Root:**
```html
<link rel="stylesheet" href="css/global.css">
```

**From Pages:**
```html
<link rel="stylesheet" href="../../css/global.css">
```

### 3. Asset References

**Images:**
```html
<img src="assets/images/projects/project-name/hero.webp" alt="...">
```

**Data:**
```javascript
fetch('data/database.json')
```

### 4. External Links

**Always use absolute URLs:**
```html
<a href="https://wa.me/916398038550">WhatsApp</a>
```

### 5. Consistency

- Use consistent path patterns across the site
- Follow the established directory structure
- Maintain the same relative path depth for similar files

---

## Path Maintenance

### Adding New Pages

1. Create directory in `pages/`
2. Create `index.html` in the directory
3. Update navigation links in all pages
4. Add to sitemap.xml
5. Update this PATH_REPORT.md

### Adding New Assets

1. Add to appropriate `assets/` subdirectory
2. Follow IMAGE_GUIDE.md naming conventions
3. Update paths in relevant pages
4. Update this PATH_REPORT.md

### Updating Paths

1. Update the path in the relevant file
2. Test in both web server and file mode
3. Update this PATH_REPORT.md
4. Verify all links still work

---

## Troubleshooting

### Common Issues

#### Issue: Navigation links show directory listing in file mode

**Solution:** Ensure all links point to `index.html` explicitly

#### Issue: CSS/JS not loading from pages

**Solution:** Check relative path depth - use `../../` for pages directory

#### Issue: Images not displaying

**Solution:** Verify image path relative to the HTML file location

#### Issue: Data not loading

**Solution:** Check data path - use `../../data/database.json` from pages

---

## Conclusion

All paths in the Infinite Interior Decor website are correctly configured for both web server and local file modes. Navigation links explicitly point to `index.html` files, and all asset paths use correct relative paths based on directory depth.

Regular path validation and maintenance will ensure the site continues to function correctly as the project grows.

---

**Document Version:** 1.0  
**Last Updated:** January 15, 2024  
**Next Review:** April 15, 2024
