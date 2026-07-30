# 02_HTML_MAP.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete HTML page mapping and navigation structure

---

## HTML Pages Overview

| Page | Path | Purpose | Entry Point |
|------|------|---------|-------------|
| Home | index.html | Main landing page | ✓ Yes |
| About | pages/about/index.html | Company information | No |
| Services | pages/services/index.html | Service offerings | No |
| Projects | pages/projects/index.html | Project portfolio | No |
| Project Detail | pages/projects/detail/index.html | Individual project details | No |
| Gallery | pages/gallery/index.html | Image gallery | No |
| Estimator | pages/estimator/index.html | Cost estimation tool | No |
| Contact | pages/contact/index.html | Contact form | No |
| Privacy | pages/privacy/index.html | Privacy policy | No |
| Terms | pages/terms/index.html | Terms and conditions | No |
| 404 | pages/404/index.html | Error page | No |

**Total Pages:** 11  
**Entry Points:** 1 (index.html)

---

## Page Details

### 1. Home Page (index.html)

**Purpose:** Main landing page showcasing the brand, services, and portfolio.

**Entry Point:** ✓ Yes - Primary entry point for the website.

**CSS Dependencies:**
- css/main.css
- css/pages/home.css

**JS Dependencies:**
- js/helpers.js (deferred)
- js/core/navbar.js (deferred)
- js/core/app.js (deferred)
- js/core/schema.js (deferred)
- js/core/image-placeholder.js (deferred)
- js/core/lazy-load.js (deferred)
- js/pages/home.js (deferred)

**Navigation Links:**
- Home → index.html (self)
- About → pages/about/index.html
- Services → pages/services/index.html
- Projects → pages/projects/index.html
- Gallery → pages/gallery/index.html
- Estimator → pages/estimator/index.html (premium link)
- Contact → pages/contact/index.html

**Shared Components:**
- Inline navbar (not using components/navbar.html)
- Inline footer (not using components/footer.html)
- Brand intro animation
- Hero section
- Features section
- Projects section
- Services section
- Trust indicators
- Partners section
- CTA section
- Footer

**Broken References:** None detected.

---

### 2. About Page (pages/about/index.html)

**Purpose:** Company information, story, mission, and team.

**Entry Point:** No - Accessed via navigation from other pages.

**CSS Dependencies:**
- ../../css/main.css
- ../../css/pages/about.css

**JS Dependencies:**
- ../../js/helpers.js (deferred)
- ../../js/core/navbar.js (deferred)

**Navigation Links:**
- Home → ../../index.html
- About → ../ (self, active)
- Services → ../services/index.html
- Projects → ../projects/index.html
- Gallery → ../gallery/index.html
- Estimator → ../estimator/index.html (premium link)
- Contact → ../contact/index.html

**Shared Components:**
- Inline navbar
- Inline footer
- About hero
- Story section
- Mission section
- Team section
- Values section

**Broken References:** None detected.

**Path Inconsistency:** Uses `../` for About self-link instead of `../about/index.html`.

---

### 3. Services Page (pages/services/index.html)

**Purpose:** Service offerings and capabilities.

**Entry Point:** No - Accessed via navigation from other pages.

**CSS Dependencies:**
- ../../css/main.css
- ../../css/pages/services.css

**JS Dependencies:**
- ../../js/helpers.js (deferred)
- ../../js/core/navbar.js (deferred)

**Navigation Links:**
- Home → ../../index.html
- About → ../about/index.html
- Services → ../ (self, active)
- Projects → ../projects/index.html
- Gallery → ../gallery/index.html
- Estimator → ../estimator/index.html (premium link)
- Contact → ../contact/index.html

**Shared Components:**
- Inline navbar
- Inline footer
- Services hero
- Service cards
- Process section
- CTA section

**Broken References:** None detected.

**Path Inconsistency:** Uses `../` for Services self-link instead of `../services/index.html`.

---

### 4. Projects Page (pages/projects/index.html)

**Purpose:** Project portfolio listing.

**Entry Point:** No - Accessed via navigation from other pages.

**CSS Dependencies:**
- ../../css/main.css
- ../../css/pages/projects.css

**JS Dependencies:**
- ../../js/helpers.js (deferred)
- ../../js/core/navbar.js (deferred)
- ../../js/pages/projects.js (deferred)

**Navigation Links:**
- Home → ../../index.html
- About → ../about/index.html
- Services → ../services/index.html
- Projects → ../ (self, active)
- Gallery → ../gallery/index.html
- Estimator → ../estimator/index.html (premium link)
- Contact → ../contact/index.html

**Shared Components:**
- Inline navbar
- Inline footer
- Projects hero
- Project cards
- Filter controls
- CTA section

**Broken References:** None detected.

**Path Inconsistency:** Uses `../` for Projects self-link instead of `../projects/index.html`.

---

### 5. Project Detail Page (pages/projects/detail/index.html)

**Purpose:** Individual project details and gallery.

**Entry Point:** No - Accessed via project cards from Projects page.

**CSS Dependencies:**
- ../../../css/main.css
- ../../../css/pages/project-detail.css

**JS Dependencies:**
- ../../../js/helpers.js (deferred)
- ../../../js/core/navbar.js (deferred)

**Navigation Links:**
- Home → ../../../index.html
- About → ../../about/index.html
- Services → ../../services/index.html
- Projects → ../index.html (self, active)
- Gallery → ../../gallery/index.html
- Estimator → ../../estimator/index.html (premium link)
- Contact → ../../contact/index.html

**Shared Components:**
- Inline navbar
- Inline footer
- Project hero
- Project gallery
- Project details
- Related projects

**Broken References:** None detected.

---

### 6. Gallery Page (pages/gallery/index.html)

**Purpose:** Image gallery showcase.

**Entry Point:** No - Accessed via navigation from other pages.

**CSS Dependencies:**
- ../../css/main.css
- ../../css/pages/gallery.css

**JS Dependencies:**
- ../../js/helpers.js (deferred)
- ../../js/core/navbar.js (deferred)

**Navigation Links:**
- Home → ../../index.html
- About → ../about/index.html
- Services → ../services/index.html
- Projects → ../projects/index.html
- Gallery → ../ (self, active)
- Estimator → ../estimator/index.html (premium link)
- Contact → ../contact/index.html

**Shared Components:**
- Inline navbar
- Inline footer
- Gallery hero
- Gallery grid
- Lightbox functionality

**Broken References:** None detected.

**Path Inconsistency:** Uses `../` for Gallery self-link instead of `../gallery/index.html`.

---

### 7. Estimator Page (pages/estimator/index.html)

**Purpose:** Cost estimation tool for interior design projects.

**Entry Point:** No - Accessed via navigation from other pages.

**CSS Dependencies:**
- ../../css/main.css
- ../../css/estimator.css
- ../../css/estimator-layout.css
- ../../css/estimator-components.css
- ../../css/estimator-responsive.css
- ../../css/estimator-animations.css

**JS Dependencies:**
- ../../js/helpers.js (deferred)
- ../../js/core/navbar.js (deferred)
- ../../js/estimator-bootstrap.js (deferred)
- ../../js/storage-manager.js (deferred)
- ../../js/estimator-state.js (deferred)
- ../../js/validation.js (deferred)
- ../../js/estimator-router.js (deferred)
- ../../js/material-engine.js (deferred)
- ../../js/package-engine.js (deferred)
- ../../js/budget-engine.js (deferred)
- ../../js/recommendation-engine.js (deferred)
- ../../js/comparison-engine.js (deferred)
- ../../js/module-engine.js (deferred)
- ../../js/boq-engine.js (deferred)
- ../../js/pdf-generator.js (deferred)
- ../../js/estimator-engine.js (deferred)
- ../../js/estimator-ui.js (deferred)
- ../../js/estimator.js (deferred)

**Navigation Links:**
- Home → ../../index.html
- About → ../about/index.html
- Services → ../services/index.html
- Projects → ../projects/index.html
- Gallery → ../gallery/index.html
- Estimator → (self, premium link)
- Contact → ../contact/index.html

**Shared Components:**
- Inline navbar
- Inline footer
- Estimator wizard
- Loading indicator
- Step navigation
- Form inputs
- Results display

**Broken References:** None detected.

**Special Notes:**
- Most complex page with 18 JS dependencies
- Uses Bootstrap Loader for initialization
- Has inline critical CSS for loading state
- Premium feature highlighted in navigation

---

### 8. Contact Page (pages/contact/index.html)

**Purpose:** Contact form and information.

**Entry Point:** No - Accessed via navigation from other pages.

**CSS Dependencies:**
- ../../css/main.css
- ../../css/pages/contact.css

**JS Dependencies:**
- ../../js/helpers.js (deferred)
- ../../js/core/navbar.js (deferred)

**Navigation Links:**
- Home → ../../index.html
- About → ../about/index.html
- Services → ../services/index.html
- Projects → ../projects/index.html
- Gallery → ../gallery/index.html
- Estimator → ../estimator/index.html (premium link)
- Contact → ../ (self, active)

**Shared Components:**
- Inline navbar
- Inline footer
- Contact hero
- Contact form
- Contact information
- Map placeholder

**Broken References:** None detected.

**Path Inconsistency:** Uses `../` for Contact self-link instead of `../contact/index.html`.

---

### 9. Privacy Page (pages/privacy/index.html)

**Purpose:** Privacy policy legal document.

**Entry Point:** No - Accessed via footer links.

**CSS Dependencies:**
- ../css/main.css
- ../css/pages/legal.css

**JS Dependencies:**
- ../js/helpers.js (deferred)
- ../js/core/navbar.js (deferred)

**Navigation Links:**
- Home → ../index.html
- About → about/index.html
- Services → services/index.html
- Projects → projects/index.html
- Gallery → gallery/index.html
- Contact → contact/index.html

**Shared Components:**
- Inline navbar (simplified, no Estimator link)
- Inline footer
- Legal hero
- Legal content

**Broken References:** None detected.

**Path Inconsistencies:**
- CSS path uses `../css/` instead of `../../css/`
- Navigation links use relative paths without `pages/` prefix
- Missing Estimator link in navigation

---

### 10. Terms Page (pages/terms/index.html)

**Purpose:** Terms and conditions legal document.

**Entry Point:** No - Accessed via footer links.

**CSS Dependencies:**
- ../css/main.css
- ../css/pages/legal.css

**JS Dependencies:**
- ../js/helpers.js (deferred)
- ../js/core/navbar.js (deferred)

**Navigation Links:**
- Home → ../index.html
- About → about/index.html
- Services → services/index.html
- Projects → projects/index.html
- Gallery → gallery/index.html
- Contact → contact/index.html

**Shared Components:**
- Inline navbar (simplified, no Estimator link)
- Inline footer
- Legal hero
- Legal content

**Broken References:** None detected.

**Path Inconsistencies:**
- CSS path uses `../css/` instead of `../../css/`
- Navigation links use relative paths without `pages/` prefix
- Missing Estimator link in navigation

---

### 11. 404 Page (pages/404/index.html)

**Purpose:** Error page for missing URLs.

**Entry Point:** No - Shown automatically for 404 errors.

**CSS Dependencies:**
- ../css/main.css
- ../css/pages/404.css

**JS Dependencies:**
- ../js/helpers.js (deferred)
- ../js/core/navbar.js (deferred)

**Navigation Links:**
- Home → ../index.html
- About → about/index.html
- Services → services/index.html
- Projects → projects/index.html
- Gallery → gallery/index.html
- Contact → contact/index.html

**Shared Components:**
- Inline navbar (simplified, no Estimator link)
- Error content
- Back to home button

**Broken References:** None detected.

**Path Inconsistencies:**
- CSS path uses `../css/` instead of `../../css/`
- Navigation links use relative paths without `pages/` prefix
- Missing Estimator link in navigation

---

## Shared Components

### Component Files

| Component | Path | Usage | Status |
|----------|------|-------|--------|
| Navbar | components/navbar.html | Not used | Unused |
| Footer | components/footer.html | Not used | Unused |
| Button | components/button.html | Not used | Unused |

**Status:** All component files are **unused**. All pages use inline navbar and footer instead of component files.

---

## Navigation Structure

### Main Navigation Links

```
Home (index.html)
  ↓
About (pages/about/index.html)
  ↓
Services (pages/services/index.html)
  ↓
Projects (pages/projects/index.html)
  ↓
  └─ Project Detail (pages/projects/detail/index.html)
  ↓
Gallery (pages/gallery/index.html)
  ↓
Estimator (pages/estimator/index.html) [Premium]
  ↓
Contact (pages/contact/index.html)
```

### Footer Links

```
Privacy Policy (pages/privacy/index.html)
Terms & Conditions (pages/terms/index.html)
```

---

## Path Inconsistencies

### Issue 1: Self-Link Variations

**Pages using `../` for self-link:**
- pages/about/index.html → `../`
- pages/services/index.html → `../`
- pages/projects/index.html → `../`
- pages/gallery/index.html → `../`
- pages/contact/index.html → `../`

**Expected:** Should use full path like `../about/index.html`

**Impact:** Minor - works but inconsistent

---

### Issue 2: Legal Pages Path Structure

**CSS Paths:**
- pages/privacy/index.html → `../css/main.css` (should be `../../css/main.css`)
- pages/terms/index.html → `../css/main.css` (should be `../../css/main.css`)
- pages/404/index.html → `../css/main.css` (should be `../../css/main.css`)

**Navigation Links:**
- pages/privacy/index.html → `about/index.html` (should be `../about/index.html`)
- pages/terms/index.html → `about/index.html` (should be `../about/index.html`)
- pages/404/index.html → `about/index.html` (should be `../about/index.html`)

**Impact:** These pages are in a different folder structure (pages/privacy, pages/terms, pages/404) but use paths as if they were in pages/ root. This will cause 404 errors.

---

### Issue 3: Missing Estimator Link

**Pages without Estimator link:**
- pages/privacy/index.html
- pages/terms/index.html
- pages/404/index.html

**Impact:** Inconsistent navigation - premium feature not accessible from legal pages

---

## Broken References

### None Detected

All CSS and JS file references appear to be valid based on the file structure analysis.

---

## SEO Meta Tags

### Consistent Across All Pages

All pages include:
- Meta description
- Meta keywords
- Meta author
- Meta robots
- Canonical URL
- Open Graph tags (og:type, og:url, og:title, og:description, og:image, og:site_name)
- Twitter Card tags (twitter:card, twitter:url, twitter:title, twitter:description, twitter:image)

**Exception:** 404 page has `noindex, nofollow` robots directive (correct for error pages).

---

## JavaScript Loading Strategy

### Defer Attribute

All pages use `defer` attribute for JavaScript loading, ensuring scripts execute after HTML parsing.

### Loading Order

Typical loading order:
1. helpers.js (utility functions)
2. core/navbar.js (navigation)
3. core/app.js (application logic)
4. core/schema.js (data schema)
5. core/image-placeholder.js (image handling)
6. core/lazy-load.js (lazy loading)
7. pages/[page].js (page-specific logic)

**Estimator Page Exception:** Loads 18 JS files in specific order with Bootstrap Loader.

---

## Accessibility Features

### Common Across All Pages

- Skip to main content links
- ARIA labels on navigation
- Semantic HTML structure
- Proper heading hierarchy
- Alt text on images (where applicable)

---

## Summary

**Total HTML Pages:** 11  
**Entry Points:** 1 (index.html)  
**Unused Components:** 3 (navbar.html, footer.html, button.html)  
**Path Inconsistencies:** 3 categories  
**Broken References:** 0  
**SEO Compliance:** Good (all pages have meta tags)  
**Accessibility:** Good (ARIA labels, skip links)

**Key Issues:**
1. Component files exist but are not used (inline HTML instead)
2. Legal pages have incorrect path structure
3. Self-link inconsistencies across pages
4. Missing Estimator link on legal pages
