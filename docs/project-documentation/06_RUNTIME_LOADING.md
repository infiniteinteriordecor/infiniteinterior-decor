# Runtime Loading Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses a sophisticated runtime loading system designed for static hosting on GitHub Pages. The system handles dynamic module loading, asset path resolution, and performance optimizations without a build process.

---

## Runtime Loading Architecture

### 1. Base URL Detection

**Location:** `js/core/app.js`

**Purpose:** Dynamically detect the base URL for GitHub Pages compatibility

```javascript
window.getBaseUrl = function() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  if (!isGitHubPages) return '/';
  
  // Extract repository name from pathname dynamically
  const pathSegments = window.location.pathname.split('/').filter(segment => segment.length > 0);
  const repoName = pathSegments[0] || '';
  return '/' + repoName + '/';
};
```

**How It Works:**
- Detects if running on GitHub Pages
- Extracts repository name from URL path
- Returns appropriate base URL
- Works across all environments (local, staging, production)

**Examples:**
- Local: `http://localhost:3000/` → `/`
- GitHub Pages: `https://username.github.io/repo/` → `/repo/`
- Custom Domain: `https://example.com/` → `/`

---

### 2. Asset Path Resolution

**Location:** `js/core/app.js`

**Purpose:** Resolve asset paths correctly to prevent duplication

```javascript
window.resolveAssetPath = function(assetPath) {
  if (!assetPath) return '';
  const baseUrl = window.getBaseUrl();
  // Strip any leading slash to prevent duplication
  let cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  return baseUrl + cleanPath;
};
```

**How It Works:**
- Takes relative or absolute asset path
- Strips leading slash to prevent duplication
- Prepends base URL
- Returns resolved path

**Examples:**
- Input: `css/main.css` → Output: `/repo/css/main.css`
- Input: `/css/main.css` → Output: `/repo/css/main.css`
- Input: `data/database.json` → Output: `/repo/data/database.json`

---

### 3. Core Module Loading

**Location:** `js/core/app.js`

**Purpose:** Load core modules shared across all pages

```javascript
function loadCoreModules() {
  // Load navbar (shared across all pages)
  if (typeof Navbar !== 'undefined') {
    Navbar.init();
  }
  
  // Load image placeholder system
  if (typeof ImagePlaceholder !== 'undefined') {
    ImagePlaceholder.init();
  }
  
  // Load schema.org structured data
  if (typeof Schema !== 'undefined') {
    Schema.init();
  }
}
```

**Modules Loaded:**
- `Navbar` - Navigation functionality
- `ImagePlaceholder` - Image placeholder generation
- `Schema` - Schema validation

**Loading Strategy:**
- Check if module exists before initializing
- Safe fallback if module not loaded
- No errors if module missing

---

### 4. Page-Specific Module Loading

**Location:** `js/core/app.js`

**Purpose:** Load appropriate JavaScript based on current page

```javascript
function loadPageModule() {
  const currentPath = window.location.pathname;
  const baseUrl = window.getBaseUrl();
  
  // Homepage detection - accounts for GitHub Pages subpath
  const isHomepage = currentPath === baseUrl || 
                     currentPath === baseUrl + 'index.html' ||
                     (currentPath.endsWith('index.html') && currentPath === baseUrl.replace(/\/$/, '') + '/index.html');
  
  if (isHomepage) {
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

**Page Detection:**
- Homepage: Root path or index.html
- Projects: Path contains `/projects/`
- Other pages: Similar pattern matching

**Loading Strategy:**
- Detect current page from URL
- Load corresponding page module
- Safe fallback if module not loaded

---

### 5. Estimator Bootstrap Loading

**Location:** `js/estimator-bootstrap.js`

**Purpose:** Orchestrate estimator module loading with error resilience

**Module Loading Order:**
```javascript
modules: [
  { name: 'Storage', check: () => window.EstimatorStorage, init: null },
  { name: 'State', check: () => window.EstimatorState, init: null },
  { name: 'Validation', check: () => window.EstimatorValidation, init: null },
  { name: 'Router', check: () => window.EstimatorRouter, init: null },
  { name: 'MaterialEngine', check: () => window.EstimatorMaterialEngine, init: null },
  { name: 'PackageEngine', check: () => window.EstimatorPackageEngine, init: null },
  { name: 'BudgetEngine', check: () => window.EstimatorBudgetEngine, init: null },
  { name: 'RecommendationEngine', check: () => window.EstimatorRecommendationEngine, init: null },
  { name: 'ComparisonEngine', check: () => window.EstimatorComparisonEngine, init: null },
  { name: 'ModuleEngine', check: () => window.EstimatorModuleEngine, init: null },
  { name: 'BOQEngine', check: () => window.EstimatorBOQEngine, init: null },
  { name: 'PDFGenerator', check: () => window.EstimatorPDFGenerator, init: null },
  { name: 'EstimatorEngine', check: () => window.EstimatorEngine, init: null },
  { name: 'UI', check: () => window.EstimatorUI, init: null }
]
```

**Loading Process:**
1. Check if module exists in global scope
2. Validate module (singleton or constructor)
3. Instantiate if constructor
4. Call init method if exists
5. Handle errors gracefully
6. Log diagnostic information

**Data File Loading:**
```javascript
dataFiles: [
  { name: 'Materials', path: 'data/estimator/materials.json' },
  { name: 'PricingRules', path: 'data/estimator/pricing-rules.json' },
  { name: 'Recommendations', path: 'data/estimator/recommendations.json' },
  { name: 'UpgradeRules', path: 'data/estimator/upgrade-rules.json' }
]
```

**Loading Strategy:**
- Load JSON data files via fetch
- Cache in memory
- Handle fetch errors gracefully
- Log diagnostic information

---

### 6. Performance Optimizations

#### Predictive Prefetching

**Location:** `js/core/app.js`

**Purpose:** Prefetch pages on hover/touch for instant loading

```javascript
function initPredictivePrefetching() {
  const prefetchCache = new Set();
  
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip external links, anchors, and already prefetching
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || prefetchCache.has(href)) {
      return;
    }
    
    // Desktop: prefetch on mouseenter
    link.addEventListener('mouseenter', () => {
      if (!prefetchCache.has(href)) {
        prefetchCache.add(href);
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = window.resolveAssetPath(href);
        document.head.appendChild(prefetchLink);
      }
    });
    
    // Mobile: prefetch on touchstart
    link.addEventListener('touchstart', () => {
      if (!prefetchCache.has(href)) {
        prefetchCache.add(href);
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = window.resolveAssetPath(href);
        document.head.appendChild(prefetchLink);
      }
    }, { passive: true });
  });
}
```

**How It Works:**
- Attach event listeners to all links
- Prefetch on mouseenter (desktop)
- Prefetch on touchstart (mobile)
- Cache prefetched URLs
- Skip external links and anchors

#### Background Data Hydration

**Location:** `js/core/app.js`

**Purpose:** Silently fetch database.json in background

```javascript
function initBackgroundDataHydration() {
  const hydrateData = () => {
    const cacheKey = 'infinite-interior-data/database.json';
    
    // Check if already cached
    if (sessionStorage.getItem(cacheKey)) {
      return;
    }
    
    // Fetch and cache in background
    fetch(window.resolveAssetPath('data/database.json'))
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(data => {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      })
      .catch(error => {
        console.warn('Background data hydration failed:', error);
      });
  };
  
  // Use requestIdleCallback with setTimeout fallback
  if ('requestIdleCallback' in window) {
    requestIdleCallback(hydrateData, { timeout: 3000 });
  } else {
    setTimeout(hydrateData, 1000);
  }
}
```

**How It Works:**
- Use requestIdleCallback if available
- Fallback to setTimeout if not
- Fetch database.json in background
- Cache in sessionStorage
- Handle errors gracefully

#### Image Preloading

**Location:** `js/core/app.js`

**Purpose:** Preload critical images

```javascript
function initImagePreloading() {
  const preloadImage = (src) => {
    if (!src) return;
    const img = new Image();
    img.src = window.resolveAssetPath(src);
  };
  
  // Preload first service image
  preloadImage('assets/images/services/service-1.webp');
  
  // Preload first project image
  preloadImage('assets/images/projects/project-1.webp');
}
```

**How It Works:**
- Create new Image objects
- Set src to preload
- Browser caches images
- Critical images load faster

---

## Loading Sequence

### Page Load Sequence

1. **HTML Parsing**
   - Browser parses HTML
   - DOM tree construction

2. **CSS Loading**
   - CSS files loaded via `<link>` tags
   - CSSOM tree construction
   - Render tree construction

3. **JavaScript Loading**
   - `js/core/app.js` loads
   - Core modules initialize
   - Page modules initialize

4. **Performance Optimizations**
   - Predictive prefetching
   - Background data hydration
   - Image preloading

### Estimator Load Sequence

1. **HTML Loading**
   - Estimator page loads
   - Loading state displayed

2. **CSS Loading**
   - Estimator CSS files load
   - Styles applied

3. **JavaScript Loading**
   - `js/estimator.js` loads
   - Bootstrap loader initializes

4. **Module Loading**
   - Storage module loads
   - State module loads
   - Validation module loads
   - Router module loads
   - Engine modules load
   - UI module loads

5. **Data Loading**
   - Materials JSON loads
   - Pricing rules JSON loads
   - Recommendations JSON loads
   - Upgrade rules JSON loads

6. **Initialization**
   - Estimator initializes
   - Wizard displays
   - User can interact

---

## Error Handling

### Graceful Failure

**Location:** `js/estimator-bootstrap.js`

**Strategy:**
- Module loading continues even if one fails
- Errors logged to console
- Diagnostic information collected
- UI shows appropriate error state

**Example:**
```javascript
try {
  const module = check();
  if (!validateModule(name, module)) {
    Diagnostic.warn(`Module ${name} skipped - module not available`);
    return null;
  }
  // Initialize module
} catch (error) {
  Diagnostic.error(`Module ${name} failed to load`, { error: error.message });
  return null;
}
```

### Diagnostic Logging

**Location:** `js/estimator-bootstrap.js`

**Purpose:** Comprehensive diagnostic logging

**Logged Information:**
- Module loading status
- Data file loading status
- Asset path resolution
- Error details
- Timeline of events

**Diagnostic Report:**
```javascript
{
  timeline: [...],
  errors: [...],
  warnings: [...],
  modules: { ... },
  assets: { ... },
  fetches: { ... },
  summary: {
    totalErrors: 0,
    totalWarnings: 2,
    totalModules: 14,
    successfulModules: 13,
    failedModules: 1
  }
}
```

---

## Asset Loading Strategies

### CSS Loading

**Strategy:** Static import via `<link>` tags

```html
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/pages/home.css">
```

**For Estimator:**
```html
<link rel="stylesheet" href="../../css/estimator.css">
<link rel="stylesheet" href="../../css/estimator-layout.css">
<link rel="stylesheet" href="../../css/estimator-components.css">
<link rel="stylesheet" href="../../css/estimator-responsive.css">
<link rel="stylesheet" href="../../css/estimator-animations.css">
```

### JavaScript Loading

**Strategy:** Script tags with defer attribute

```html
<script src="js/core/app.js" defer></script>
<script src="js/pages/home.js" defer></script>
```

**For Estimator:**
```html
<script src="../../js/helpers.js" defer></script>
<script src="../../js/storage.js" defer></script>
<script src="../../js/estimator-state.js" defer></script>
<script src="../../js/estimator-router.js" defer></script>
<script src="../../js/estimator-bootstrap.js" defer></script>
<script src="../../js/estimator.js" defer></script>
```

### Data Loading

**Strategy:** Fetch API with error handling

```javascript
fetch(window.resolveAssetPath('data/database.json'))
  .then(response => response.json())
  .then(data => {
    // Use data
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });
```

---

## Loading Performance

### Critical Path Optimization

**Critical Resources:**
- HTML document
- Main CSS
- Core JavaScript
- Above-the-fold images

**Optimization Techniques:**
- Critical CSS inline
- Resource preloading
- Lazy loading for images
- Defer non-critical JavaScript

### Loading Metrics

**Target Metrics:**
- First Contentful Paint: < 1.5s
- First Meaningful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Total Load Time: < 5s

**Actual Performance:**
- Depends on network conditions
- GitHub Pages CDN is fast
- Lazy loading helps performance

---

## Loading Fallbacks

### localStorage Fallback

**Location:** `js/storage.js`

**Purpose:** Fallback if IndexedDB fails

```javascript
async saveDraft(data) {
  try {
    await this.saveToIndexedDB('drafts', draft);
    localStorage.setItem(this.keys.draft, draftId);
    return draftId;
  } catch (error) {
    console.error('Save draft error:', error);
    // Fallback to localStorage
    return this.saveDraftToLocalStorage(data);
  }
}
```

### Module Fallback

**Location:** `js/estimator-bootstrap.js`

**Purpose:** Continue if module fails to load

```javascript
if (!validateModule(name, module)) {
  Diagnostic.warn(`Module ${name} skipped - module not available`);
  return null;
}
```

### Data Fallback

**Purpose:** Use default data if fetch fails

```javascript
fetch(window.resolveAssetPath('data/database.json'))
  .then(response => response.json())
  .then(data => {
    // Use fetched data
  })
  .catch(error => {
    console.warn('Using default data');
    // Use default data
  });
```

---

## Loading Best Practices

### 1. Use Defer for Scripts
```html
<script src="js/core/app.js" defer></script>
```

### 2. Preload Critical Resources
```html
<link rel="preload" href="css/main.css" as="style">
<link rel="preload" href="js/core/app.js" as="script">
```

### 3. Lazy Load Images
```html
<img src="placeholder.jpg" data-src="actual.jpg" loading="lazy">
```

### 4. Handle Errors Gracefully
```javascript
try {
  // Code that might fail
} catch (error) {
  console.error('Error:', error);
  // Fallback behavior
}
```

### 5. Use Asset Path Resolution
```javascript
const path = window.resolveAssetPath('css/main.css');
```

---

## Notes

- All loading is client-side only
- No server-side rendering
- No build process required
- GitHub Pages compatible
- Graceful failure handling
- Comprehensive diagnostic logging

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
