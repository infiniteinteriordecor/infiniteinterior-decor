# 16_DUPLICATE_CODE.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete duplicate code analysis

---

## Duplicate Code Overview

Duplicate code analysis identifies repeated code patterns across the project that could be refactored into reusable components.

**Total Files Analyzed:** 25 JS files, 37 CSS files, 11 HTML files  
**Duplicate Code Instances:** 8  
**Potential Refactoring Opportunities:** 6  
**Code Duplication Severity:** Low to Medium  

---

## HTML Duplicate Code

### 1. Inline Navbar (High Severity)

**Description:** Navbar HTML is duplicated across all HTML pages.

**Affected Files:**
- index.html
- pages/about/index.html
- pages/services/index.html
- pages/projects/index.html
- pages/projects/detail/index.html
- pages/gallery/index.html
- pages/estimator/index.html
- pages/contact/index.html

**Duplicate Code:** ~50 lines per file

**Example:**
```html
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <a href="#main-content" class="navbar__skip-link u-sr-only">Skip to main content</a>
  <div class="navbar__container u-container">
    <div class="navbar__brand">
      <a href="index.html" class="navbar__logo-link" aria-label="Infinite Interior Decor Home">
        <div id="navbar-logo-container" class="navbar__logo-container"></div>
      </a>
    </div>
    <ul class="navbar__nav navbar__nav--desktop u-display-flex u-flex-row u-items-center u-gap-6">
      <li><a href="index.html" class="navbar__link navbar__link--active">Home</a></li>
      <li><a href="pages/about/index.html" class="navbar__link">About</a></li>
      <!-- ... more links -->
    </ul>
    <!-- ... mobile menu -->
  </div>
</nav>
```

**Impact:**
- Code duplication: 8 files × 50 lines = 400 lines
- Maintenance burden: Changes must be made in 8 files
- Inconsistency risk: Different pages may have different navbar versions

**Severity:** High

**Recommendation:** Use component system (HTML includes or build system)

---

### 2. Inline Footer (High Severity)

**Description:** Footer HTML is duplicated across all HTML pages.

**Affected Files:**
- index.html
- pages/about/index.html
- pages/services/index.html
- pages/projects/index.html
- pages/projects/detail/index.html
- pages/gallery/index.html
- pages/estimator/index.html
- pages/contact/index.html

**Duplicate Code:** ~40 lines per file

**Example:**
```html
<footer class="footer" role="contentinfo">
  <div class="footer__container u-container">
    <div class="footer__content">
      <div class="footer__brand">
        <h3 class="footer__brand-name">Infinite Interior Decor</h3>
        <p class="footer__brand-tagline">Luxury Interior Design</p>
      </div>
      <div class="footer__links">
        <h4 class="footer__links-title">Quick Links</h4>
        <ul class="footer__links-list">
          <li><a href="index.html" class="footer__link">Home</a></li>
          <!-- ... more links -->
        </ul>
      </div>
      <!-- ... more sections -->
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">&copy; 2025 Infinite Interior Decor. All rights reserved.</p>
      <div class="footer__legal">
        <a href="pages/privacy/index.html" class="footer__legal-link">Privacy Policy</a>
        <a href="pages/terms/index.html" class="footer__legal-link">Terms & Conditions</a>
      </div>
    </div>
  </div>
</footer>
```

**Impact:**
- Code duplication: 8 files × 40 lines = 320 lines
- Maintenance burden: Changes must be made in 8 files
- Inconsistency risk: Different pages may have different footer versions

**Severity:** High

**Recommendation:** Use component system (HTML includes or build system)

---

### 3. CSS Link Tags (Medium Severity)

**Description:** CSS link tags are duplicated across all HTML pages.

**Affected Files:** All HTML pages

**Duplicate Code:** ~20 lines per file

**Example:**
```html
<link rel="stylesheet" href="../../css/main.css">
<link rel="stylesheet" href="../../css/pages/home.css">
```

**Impact:**
- Code duplication: 11 files × 20 lines = 220 lines
- Maintenance burden: Changes must be made in 11 files
- Inconsistency risk: Different pages may have different CSS loading order

**Severity:** Medium

**Recommendation:** Use component system or build system

---

## JavaScript Duplicate Code

### 4. Asset Path Resolution (Medium Severity)

**Description:** `window.resolveAssetPath` is defined in two files.

**Affected Files:**
- js/helpers.js
- js/core/app.js

**Duplicate Code:**

**js/helpers.js:**
```javascript
window.resolveAssetPath = function(assetPath) {
  if (!assetPath) return '';
  const baseUrl = window.getBaseUrl();
  let cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  return baseUrl + cleanPath;
};
```

**js/core/app.js:**
```javascript
window.resolveAssetPath = function(assetPath) {
  if (!assetPath) return '';
  const baseUrl = window.getBaseUrl();
  let cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  return baseUrl + cleanPath;
};
```

**Impact:**
- Code duplication: 2 files × 8 lines = 16 lines
- Potential conflict if both loaded
- Confusing for developers

**Severity:** Medium

**Recommendation:** Remove duplicate definition from app.js

---

### 5. IIFE Pattern (Low Severity)

**Description:** All JavaScript files use the same IIFE pattern.

**Affected Files:** All 25 JS files

**Duplicate Code:**
```javascript
(function() {
  'use strict';
  // ... code
})();
```

**Impact:**
- Code duplication: 25 files × 3 lines = 75 lines
- Standard pattern, not a real issue
- Consistent across project

**Severity:** Low (standard pattern)

**Recommendation:** No action needed (standard pattern)

---

### 6. Export Pattern (Low Severity)

**Description:** All JavaScript files use the same export pattern.

**Affected Files:** All 25 JS files

**Duplicate Code:**
```javascript
window.ModuleName = ModuleName;
// or
window.ModuleName = { ... };
```

**Impact:**
- Code duplication: 25 files × 1 line = 25 lines
- Standard pattern, not a real issue
- Consistent across project

**Severity:** Low (standard pattern)

**Recommendation:** No action needed (standard pattern)

---

## CSS Duplicate Code

### 7. CSS Reset (Low Severity)

**Description:** CSS reset is included in all pages via main.css import.

**Affected Files:** All HTML pages

**Duplicate Code:** Not actual duplication, but shared via import

**Impact:**
- No actual code duplication
- Shared via css/main.css import
- Good practice

**Severity:** None (good practice)

**Recommendation:** No action needed

---

### 8. Design Tokens (Low Severity)

**Description:** Design tokens are used across all CSS files.

**Affected Files:** All CSS files

**Duplicate Code:** Not actual duplication, but shared via import

**Impact:**
- No actual code duplication
- Shared via css/core/design-tokens.css import
- Good practice

**Severity:** None (good practice)

**Recommendation:** No action needed

---

## Potential Refactoring Opportunities

### 1. HTML Component System

**Current:** Inline navbar and footer in all HTML pages

**Recommended:** Use component system

**Options:**
- Build system (Eleventy, Hugo, Jekyll)
- JavaScript component injection
- Server-side includes

**Benefits:**
- Eliminate 720 lines of duplicate HTML
- Single source of truth
- Easier maintenance

**Effort:** High

---

### 2. CSS Consolidation

**Current:** Multiple CSS files with similar patterns

**Recommended:** Consolidate similar CSS files

**Options:**
- Merge page-specific CSS into main.css
- Use CSS-in-JS
- Use CSS modules

**Benefits:**
- Reduce HTTP requests
- Easier maintenance
- Better performance

**Effort:** Medium

---

### 3. JavaScript Module System

**Current:** Global window object exports

**Recommended:** Use ES6 modules

**Options:**
- Convert to ES6 modules
- Use bundler (Webpack, Rollup)
- Use import/export

**Benefits:**
- Better organization
- Tree shaking
- Better performance

**Effort:** High

---

### 4. Utility Function Library

**Current:** Helper functions in helpers.js

**Recommended:** Extract common patterns into utility functions

**Examples:**
- DOM manipulation utilities
- Event handling utilities
- Validation utilities

**Benefits:**
- Reduce code duplication
- Reusable functions
- Easier testing

**Effort:** Low

---

### 5. CSS Utility Classes

**Current:** Repeated CSS patterns

**Recommended:** Expand utility class system

**Examples:**
- Flexbox utilities
- Spacing utilities
- Color utilities

**Benefits:**
- Reduce custom CSS
- Faster development
- Consistent design

**Effort:** Medium

---

### 6. Template System

**_current:** Inline HTML in all pages

**Recommended:** Use template system

**Options:**
- HTML template tags
- JavaScript template literals
- Template engine

**Benefits:**
- Reduce HTML duplication
- Dynamic rendering
- Easier maintenance

**Effort:** Medium

---

## Duplicate Code Summary

**Total Duplicate Code Instances:** 8  
**High Severity:** 2 (HTML navbar, HTML footer)  
**Medium Severity:** 2 (CSS links, asset path resolution)  
**Low Severity:** 4 (IIFE pattern, export pattern, CSS reset, design tokens)  
**Total Duplicate Lines:** ~1,100 lines  
**Potential Refactoring Opportunities:** 6  
**Code Duplication Severity:** Low to Medium  

**Duplicate Code by Category:**
- HTML: 720 lines (navbar + footer)
- CSS: 220 lines (link tags)
- JavaScript: 116 lines (IIFE + export patterns + asset resolution)

**Critical Duplicates:**
1. Inline navbar (8 files × 50 lines = 400 lines)
2. Inline footer (8 files × 40 lines = 320 lines)

**Recommended Actions:**
1. Implement component system for HTML (navbar, footer)
2. Remove duplicate asset path resolution
3. Consider build system for HTML includes
4. Evaluate ES6 module system for JavaScript
5. Expand CSS utility class system
