# JavaScript Routing & Rendering Report
## Infinite Interior Decor - Subpath & Navigation Analysis

**Report Generated:** July 28, 2026  
**Purpose:** Analyze JavaScript routing, rendering logic, and subpath handling for GitHub Pages deployment

---

## Executive Summary

This report analyzes the JavaScript routing and rendering system to determine if the application properly handles running on a subpath (`/infiniteinterior-decor/`) or if there are hardcoded absolute paths pointing to root domain (`/`). The analysis reveals both strengths and critical issues in the current implementation.

---

## Part 1: Core Routing Architecture

### File: js/core/app.js

#### 1.1 Base URL Detection

**Function:** `window.getBaseUrl()` (lines 15-18)

```javascript
window.getBaseUrl = function() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  return isGitHubPages ? '/infiniteinterior-decor/' : '/';
};
```

**Analysis:**
- **Strength:** Simple environment detection based on hostname
- **Weakness:** Hardcoded repository name `/infiniteinterior-decor/`
- **Portability:** Not portable to other repositories or custom domains
- **GitHub Pages:** Correctly returns subpath for GitHub Pages
- **Local Development:** Returns `/` for local development

**Issue:** If repository is renamed or deployed to different GitHub Pages URL, this will break.

---

#### 1.2 Asset Path Resolution

**Function:** `window.resolveAssetPath()` (lines 24-30)

```javascript
window.resolveAssetPath = function(assetPath) {
  if (!assetPath) return '';
  const baseUrl = window.getBaseUrl();
  // Strip existing base URL if it was accidentally hardcoded to prevent duplication
  let cleanPath = assetPath.replace(/^(\/infiniteinterior-decor\/|\/)/, '');
  return baseUrl + cleanPath;
};
```

**Analysis:**
- **Strength:** Prevents subpath duplication
- **Strength:** Strips accidental hardcoded subpaths
- **Weakness:** Hardcoded repository name in regex
- **Weakness:** Strips ALL leading slashes, even intentional ones
- **Subpath Handling:** Correctly handles GitHub Pages subpath

**Transformation Examples:**
```
Local: "assets/images/hero.webp" → "/assets/images/hero.webp"
GitHub Pages: "assets/images/hero.webp" → "/infiniteinterior-decor/assets/images/hero.webp"
```

---

#### 1.3 Page Module Loading

**Function:** `loadPageModule()` (lines 57-73)

```javascript
function loadPageModule() {
  const currentPath = window.location.pathname;
  
  // Homepage
  if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html') && currentPath.split('/').length === 2) {
    if (typeof Home !== 'undefined') {
      Home.init();
    }
  }
  
  // Projects page
  if (currentPath.includes('/projects/')) {
    if (typeof Projects !== 'undefined') {
      Projects.init();
    }
  }
}
```

**Critical Issue Found:**

**Homepage Detection Logic (Line 61):**
```javascript
if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html') && currentPath.split('/').length === 2)
```

**Problem on GitHub Pages:**
- GitHub Pages URL: `https://infiniteinteriordecor.github.io/infiniteinterior-decor/`
- `window.location.pathname`: `/infiniteinterior-decor/` or `/infiniteinterior-decor/index.html`
- Condition `currentPath === '/'`: **FAILS** (path is `/infiniteinterior-decor/`)
- Condition `currentPath === '/index.html'`: **FAILS** (path is `/infiniteinterior-decor/index.html`)
- Condition `currentPath.endsWith('index.html') && currentPath.split('/').length === 2`: **FAILS** (path has 3 segments: `['infiniteinterior-decor', 'index.html']`)

**Impact:** Homepage JavaScript module (`Home.init()`) may not load on GitHub Pages, causing homepage functionality to fail.

**Recommendation:** Update homepage detection to account for subpath:
```javascript
const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/infiniteinterior-decor' : '';
if (currentPath === basePath + '/' || currentPath === basePath + '/index.html') {
  // Load homepage
}
```

---

## Part 2: Navigation Link Handling

### File: js/core/navbar.js

#### 2.1 Relative Path Calculation

**Function:** `getRelativePathPrefix()` (lines 121-147)

```javascript
function getRelativePathPrefix() {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
  
  // Remove GitHub Pages subpath if present
  const repoIndex = pathSegments.indexOf('infiniteinterior-decor');
  let effectiveSegments = pathSegments;
  if (repoIndex !== -1) {
    effectiveSegments = pathSegments.slice(repoIndex + 1);
  }
  
  const depth = effectiveSegments.length;
  
  if (depth === 0 || (depth === 1 && effectiveSegments[0].endsWith('.html'))) {
    // Root level
    return '';
  } else if (depth === 1) {
    // pages/about/ (index.html)
    return '../';
  } else if (depth === 2) {
    // pages/projects/detail/ (index.html)
    return '../../';
  } else {
    // Fallback for deeper levels
    return '../'.repeat(depth);
  }
}
```

**Analysis:**
- **Strength:** Removes GitHub Pages subpath before calculating depth
- **Strength:** Handles multiple nesting levels
- **Weakness:** Hardcoded repository name `infiniteinterior-decor`
- **Weakness:** Assumes specific directory structure (pages/about/, pages/projects/detail/)
- **Subpath Handling:** Correctly accounts for GitHub Pages subpath

**Test Cases:**
```
Local (/index.html): depth=0 → prefix=''
Local (/pages/about/index.html): depth=2 → prefix='../'
GitHub Pages (/infiniteinterior-decor/): depth=0 → prefix=''
GitHub Pages (/infiniteinterior-decor/pages/about/index.html): depth=2 → prefix='../'
```

---

#### 2.2 Navigation Link Updates

**Function:** `updateNavigationLinks()` (lines 152-189)

```javascript
function updateNavigationLinks() {
  const prefix = getRelativePathPrefix();
  console.log("Navigation path prefix:", prefix);
  
  // Update desktop navigation links
  const desktopLinks = document.querySelectorAll('.navbar__nav--desktop .navbar__link');
  desktopLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/')) {
      // Convert absolute path to relative
      const relativePath = prefix + href.substring(1);
      link.setAttribute('href', relativePath);
      console.log(`Updated link: ${href} -> ${relativePath}`);
    }
  });
  
  // Update mobile navigation links
  const mobileLinks = document.querySelectorAll('.navbar__nav--mobile .navbar__link');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/')) {
      // Convert absolute path to relative
      const relativePath = prefix + href.substring(1);
      link.setAttribute('href', relativePath);
      console.log(`Updated mobile link: ${href} -> ${relativePath}`);
    }
  });
  
  // Update logo link
  const logoLink = document.querySelector('.navbar__logo-link');
  if (logoLink) {
    const href = logoLink.getAttribute('href');
    if (href === '/' || href === '/index.html') {
      logoLink.setAttribute('href', prefix + 'index.html');
      console.log(`Updated logo link: ${href} -> ${prefix}index.html`);
    }
  }
}
```

**Analysis:**
- **Strength:** Converts absolute paths to relative paths dynamically
- **Strength:** Handles both desktop and mobile navigation
- **Strength:** Updates logo link separately
- **Weakness:** Only handles links starting with `/` (absolute paths)
- **Weakness:** Doesn't handle links that are already relative
- **Subpath Handling:** Correctly handles subpath by using relative paths

**Transformation Examples:**
```
Root level (/): prefix='' → '/about/' → 'about/'
About page (/pages/about/index.html): prefix='../' → '/projects/' → '../projects/'
```

---

#### 2.3 Logo Rendering

**Function:** `renderLogo()` (lines 17-50)

```javascript
function renderLogo() {
  console.log("renderLogo() called");
  
  const logoContainer = document.getElementById('navbar-logo-container');
  console.log("logoContainer:", logoContainer);
  
  if (!logoContainer) {
    console.error("navbar-logo-container not found in DOM");
    return;
  }

  // Use Base64 data URI from external file if available
  // Otherwise use global dynamic base URL resolution
  const logoPath = (typeof LOGO_BASE64 !== 'undefined') ? LOGO_BASE64 : window.resolveAssetPath('assets/images/logo/logo.png');
  
  console.log("Using logo source:", logoPath.substring(0, 50) + '...');

  // Insert logo image with standardized class
  const logoHTML = `<img src="${logoPath}" alt="Infinite Interior Decor" class="navbar__logo-image">`;
  console.log("Generated logo HTML");
  
  logoContainer.innerHTML = logoHTML;
  
  // Explicitly update img src attribute for verification
  const logoImg = logoContainer.querySelector('img');
  if (logoImg) {
    console.log("Logo IMG element found and updated");
    console.log("Logo SRC length:", logoImg.src.length);
  } else {
    console.error("Logo IMG element not found after insertion");
  }
  
  console.log("Logo rendered successfully");
}
```

**Analysis:**
- **Strength:** Uses `window.resolveAssetPath()` for logo path
- **Strength:** Falls back to Base64 if available
- **Strength:** Extensive console logging for debugging
- **Subpath Handling:** Correctly uses global resolver for subpath

---

## Part 3: Homepage Rendering Logic

### File: js/pages/home.js

#### 3.1 Data Loading

**Function:** `loadData()` (lines 648-666)

```javascript
async function loadData(path) {
  try {
    const response = await fetch(window.resolveAssetPath(path));
    if (!response.ok) {
      console.warn(`HTTP error! status: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Error loading data:', error);
    return null;
  }
}
```

**Analysis:**
- **Strength:** Uses `window.resolveAssetPath()` for data fetching
- **Strength:** Proper error handling
- **Subpath Handling:** Correctly handles subpath for data loading

---

#### 3.2 Image Rendering

**Function:** `renderImage()` (lines 558-591)

```javascript
function renderImage(imagePath, altText, placeholderType = 'project', options = {}) {
  const {
    className = '',
    loading = 'lazy',
    aspectRatio = null,
    showLabel = true
  } = options;
  
  // If image path exists and is not empty, return real image with explicit dimensions
  if (imagePath && imagePath.trim() !== '') {
    // Get dimensions based on placeholder type for CLS prevention
    const dimensions = {
      project: { width: 1920, height: 1080 },
      service: { width: 600, height: 375 },
      logo: { width: 200, height: 100 },
      gallery: { width: 1200, height: 900 },
      hero: { width: 1920, height: 1080 }
    };
    const dims = dimensions[placeholderType] || dimensions.project;
    
    // Use global resolver for GitHub Pages compatibility
    const srcPath = typeof window !== 'undefined' && typeof window.resolveAssetPath === 'function' 
      ? window.resolveAssetPath(imagePath) 
      : (imagePath.startsWith('./') || imagePath.startsWith('/') ? imagePath : `./${imagePath}`);
    
    return `<img 
      src="${srcPath}" 
      alt="${altText}" 
      class="${className}" 
      loading="${loading}"
      width="${dims.width}"
      height="${dims.height}"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
    >`;
  }
  
  // Otherwise, return development placeholder
  // ... placeholder code ...
}
```

**Analysis:**
- **Strength:** Uses `window.resolveAssetPath()` for image paths
- **Strength:** Has fallback for environments without resolver
- **Weakness:** Fallback logic is inconsistent with resolver
- **Subpath Handling:** Correctly handles subpath for images

---

#### 3.3 Smooth Scroll

**Function:** `initSmoothScroll()` (lines 504-528)

```javascript
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offset = 80; // Account for fixed navbar
        
        window.scrollTo({
          top: targetPosition - offset,
          behavior: CONFIG.prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });
}
```

**Analysis:**
- **Strength:** Handles anchor links for smooth scrolling
- **Strength:** Accounts for fixed navbar offset
- **Strength:** Respects reduced motion preference
- **Subpath Handling:** Anchor links (`#`) are not affected by subpath

---

## Part 4: Hardcoded Absolute Paths Check

### Search Results

**Searched for:** `href="/` and `src="/` in JavaScript files

**Results:** No hardcoded absolute paths found in JavaScript files

**Analysis:**
- **Strength:** No hardcoded absolute paths in JavaScript
- **Strength:** All paths use dynamic resolution or relative paths
- **Subpath Handling:** JavaScript code is subpath-aware

---

## Part 5: Subpath Handling Assessment

### GitHub Pages Subpath: `/infiniteinterior-decor/`

#### ✅ Correctly Handled:

1. **Asset Path Resolution** - `window.resolveAssetPath()` correctly adds subpath
2. **Logo Rendering** - Uses global resolver for logo path
3. **Data Loading** - Uses global resolver for JSON data
4. **Image Rendering** - Uses global resolver for all images
5. **Navigation Links** - Converts absolute to relative paths based on depth
6. **Relative Path Calculation** - Removes subpath before calculating depth

#### ❌ Issues Found:

1. **Homepage Module Loading** - `loadPageModule()` homepage detection fails on subpath
   - **Location:** `js/core/app.js` line 61
   - **Impact:** Homepage JavaScript may not initialize on GitHub Pages
   - **Severity:** HIGH

2. **Hardcoded Repository Name** - Repository name hardcoded in multiple places
   - **Locations:** 
     - `js/core/app.js` line 17 (`/infiniteinterior-decor/`)
     - `js/core/app.js` line 28 (regex pattern)
     - `js/core/navbar.js` line 126 (`infiniteinterior-decor`)
   - **Impact:** Not portable to other repositories
   - **Severity:** MEDIUM

3. **Directory Structure Assumptions** - Assumes specific directory structure
   - **Location:** `js/core/navbar.js` `getRelativePathPrefix()`
   - **Impact:** May break if directory structure changes
   - **Severity:** LOW

---

## Part 6: Recommendations

### Critical Fixes (Required for GitHub Pages)

#### Fix #1: Homepage Module Loading

**Current Code (js/core/app.js line 61):**
```javascript
if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html') && currentPath.split('/').length === 2)
```

**Recommended Fix:**
```javascript
const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/infiniteinterior-decor' : '';
const isHomepage = currentPath === basePath + '/' || 
                   currentPath === basePath + '/index.html' ||
                   (currentPath.endsWith('index.html') && currentPath.split('/').length === (isGitHubPages ? 3 : 2));

if (isHomepage) {
  if (typeof Home !== 'undefined') {
    Home.init();
  }
}
```

---

### Important Improvements

#### Improvement #1: Dynamic Repository Detection

**Current Code (js/core/app.js line 17):**
```javascript
return isGitHubPages ? '/infiniteinterior-decor/' : '/';
```

**Recommended Fix:**
```javascript
window.getBaseUrl = function() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  if (!isGitHubPages) return '/';
  
  // Extract repository name from pathname
  const pathSegments = window.location.pathname.split('/').filter(s => s.length > 0);
  const repoName = pathSegments[0] || '';
  return '/' + repoName + '/';
};
```

**Apply to:**
- `js/core/app.js` `getBaseUrl()`
- `js/core/app.js` `resolveAssetPath()` regex
- `js/core/navbar.js` `getRelativePathPrefix()`

---

#### Improvement #2: Standardize Path Resolution

**Current Issue:** Inconsistent fallback logic in `renderImage()`

**Recommendation:** Remove fallback or make it consistent with resolver:
```javascript
const srcPath = window.resolveAssetPath(imagePath);
```

---

### Optional Enhancements

#### Enhancement #1: Cache Base URL

**Current:** `getBaseUrl()` called on every `resolveAssetPath()`

**Recommendation:** Cache result on first call
```javascript
let cachedBaseUrl = null;
window.getBaseUrl = function() {
  if (cachedBaseUrl) return cachedBaseUrl;
  
  const isGitHubPages = window.location.hostname.includes('github.io');
  cachedBaseUrl = isGitHubPages ? '/infiniteinterior-decor/' : '/';
  return cachedBaseUrl;
};
```

---

#### Enhancement #2: Add Path Validation

**Current:** No validation that resolved paths point to existing files

**Recommendation:** Add pre-flight checks
```javascript
window.resolveAssetPath = function(assetPath) {
  if (!assetPath) return '';
  const baseUrl = window.getBaseUrl();
  let cleanPath = assetPath.replace(/^(\/infiniteinterior-decor\/|\/)/, '');
  const resolvedPath = baseUrl + cleanPath;
  
  // Log for debugging
  console.log(`Resolved: ${assetPath} → ${resolvedPath}`);
  
  return resolvedPath;
};
```

---

## Part 7: Subpath Testing Scenarios

### Test Case 1: Homepage on GitHub Pages

**URL:** `https://infiniteinteriordecor.github.io/infiniteinterior-decor/`

**Expected Behavior:**
- `window.location.pathname`: `/infiniteinterior-decor/`
- `getBaseUrl()`: `/infiniteinterior-decor/`
- `resolveAssetPath('data/database.json')`: `/infiniteinterior-decor/data/database.json`
- `loadPageModule()`: Should load `Home.init()` ⚠️ **CURRENTLY FAILS**

---

### Test Case 2: About Page on GitHub Pages

**URL:** `https://infiniteinteriordecor.github.io/infiniteinterior-decor/pages/about/`

**Expected Behavior:**
- `window.location.pathname`: `/infiniteinterior-decor/pages/about/`
- `getBaseUrl()`: `/infiniteinterior-decor/`
- `getRelativePathPrefix()`: `../`
- Navigation link `/projects/`: Becomes `../projects/`
- ✅ **Should work correctly**

---

### Test Case 3: Project Detail Page on GitHub Pages

**URL:** `https://infiniteinteriordecor.github.io/infiniteinterior-decor/pages/projects/detail/`

**Expected Behavior:**
- `window.location.pathname`: `/infiniteinterior-decor/pages/projects/detail/`
- `getBaseUrl()`: `/infiniteinterior-decor/`
- `getRelativePathPrefix()`: `../../`
- Navigation link `/`: Becomes `../../index.html`
- ✅ **Should work correctly**

---

### Test Case 4: Local Development

**URL:** `http://localhost:5500/`

**Expected Behavior:**
- `window.location.pathname`: `/`
- `getBaseUrl()`: `/`
- `resolveAssetPath('data/database.json')`: `/data/database.json`
- `loadPageModule()`: Should load `Home.init()` ✅ **Works correctly**

---

## Part 8: Conclusion

### Overall Assessment

**Subpath Readiness:** **PARTIALLY READY** ⚠️

**Strengths:**
- Asset path resolution correctly handles subpath
- Navigation link conversion works correctly
- Logo rendering uses global resolver
- No hardcoded absolute paths in JavaScript

**Critical Issues:**
- Homepage module loading fails on GitHub Pages subpath
- Repository name hardcoded in multiple places

**Recommendation Priority:**
1. **HIGH:** Fix homepage module loading (required for GitHub Pages)
2. **MEDIUM:** Implement dynamic repository detection (for portability)
3. **LOW:** Add caching and validation (for performance and debugging)

---

## End of Report
