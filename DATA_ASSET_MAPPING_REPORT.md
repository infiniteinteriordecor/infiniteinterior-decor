# Data & Asset Mapping Report
## Infinite Interior Decor - Path Resolution Analysis

**Report Generated:** July 28, 2026  
**Purpose:** Analyze database.json structure, window.resolveAssetPath() implementation, and image path transformation logic

---

## Executive Summary

This report documents how image paths from `database.json` are transformed into HTML `src` attributes through the JavaScript rendering pipeline. It identifies the step-by-step transformation process and highlights potential flaws in the path construction logic.

---

## Part 1: database.json Structure Analysis

### Image Path Storage Format

All image paths in `database.json` are stored as **relative paths from the project root**:

```json
{
  "projects": [
    {
      "id": "baithke-bihari-jehanabad-2023",
      "title": "Baithke Bihari Cafe",
      "image": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp",
      "thumbnail": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp",
      "gallery": [
        "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp",
        "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-02.webp",
        "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-03.webp",
        "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-04.webp"
      ]
    }
  ]
}
```

### Path Format Characteristics

- **No leading slash:** Paths start with `assets/` not `/assets/`
- **Relative to project root:** Paths are relative to the repository root
- **No protocol/domain:** No `http://` or `https://` prefixes
- **Consistent structure:** All paths follow `assets/images/[category]/[project]/[file]` pattern

### Data Inconsistencies Found

**Issue:** Multiple projects reference the same image files:

```json
// Monte Carlo Home Store (should have its own images)
{
  "id": "monte-carlo-jehanabad-2023",
  "image": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp",  // WRONG
  "thumbnail": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"  // WRONG
}

// Modern Residential Apartment (should have its own images)
{
  "id": "modern-residential-bhimtal-2022",
  "image": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp",  // WRONG
  "thumbnail": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"  // WRONG
}
```

**Impact:** These projects are displaying Baithke Bihari Cafe images instead of their own.

---

## Part 2: window.resolveAssetPath() Implementation

### Function Location & Code

**File:** `js/core/app.js` (lines 24-30)

```javascript
window.resolveAssetPath = function(assetPath) {
  if (!assetPath) return '';
  const baseUrl = window.getBaseUrl();
  // Strip existing base URL if it was accidentally hardcoded to prevent duplication
  let cleanPath = assetPath.replace(/^(\/infiniteinterior-decor\/|\/)/, '');
  return baseUrl + cleanPath;
};
```

### Supporting Function: window.getBaseUrl()

**File:** `js/core/app.js` (lines 15-18)

```javascript
window.getBaseUrl = function() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  return isGitHubPages ? '/infiniteinterior-decor/' : '/';
};
```

### How It Works

1. **Environment Detection:** Checks if hostname contains `github.io`
2. **Base URL Selection:**
   - GitHub Pages: Returns `/infiniteinterior-decor/`
   - Local/Other: Returns `/`
3. **Path Cleaning:** Strips leading slashes and existing subpath to prevent duplication
4. **Path Assembly:** Concatenates base URL with cleaned path

### Transformation Examples

**Local Development (localhost):**
```
Input:  "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"
Output: "/assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"
```

**GitHub Pages:**
```
Input:  "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"
Output: "/infiniteinterior-decor/assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"
```

---

## Part 3: Image Rendering Logic

### Implementation 1: renderImage() (Homepage)

**File:** `js/pages/home.js` (lines 558-591)

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

### Implementation 2: Direct DOM Creation (Projects Page)

**File:** `js/pages/projects.js` (lines 150-155)

```javascript
// Use actual image from project data
const img = document.createElement('img');
img.src = window.resolveAssetPath(project.image || project.thumbnail || '');
img.alt = project.title || project.name || 'Project Image';
img.className = 'project-card__img';
img.loading = 'lazy';
imageContainer.appendChild(img);
```

### Implementation 3: Data Fetching

**File:** `js/pages/projects.js` (lines 53-66)

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

---

## Part 4: Step-by-Step Path Transformation Process

### Complete Flow for Homepage Featured Project

**Step 1: Data Fetch**
```
File: js/pages/home.js
Function: loadData(CONFIG.dataPath)
Input: 'data/database.json'
Resolver: window.resolveAssetPath('data/database.json')
Output: '/infiniteinterior-decor/data/database.json' (GitHub Pages)
```

**Step 2: JSON Parsing**
```
File: database.json
Project: Baithke Bihari Cafe
Raw Path: "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"
```

**Step 3: Project Rendering**
```
File: js/pages/home.js
Function: renderProjects(projects)
Template: renderImage(project.image, project.title, 'project', {...})
Input Path: "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"
```

**Step 4: Path Resolution**
```
File: js/pages/home.js
Function: renderImage()
Check: typeof window.resolveAssetPath === 'function'
Action: window.resolveAssetPath(imagePath)
```

**Step 5: Base URL Detection**
```
File: js/core/app.js
Function: window.getBaseUrl()
Detection: window.location.hostname.includes('github.io')
Result: '/infiniteinterior-decor/'
```

**Step 6: Path Cleaning**
```
File: js/core/app.js
Function: window.resolveAssetPath()
Regex: /^(\/infiniteinterior-decor\/|\/)/
Input: "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"
Cleaned: "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp" (no change)
```

**Step 7: Path Assembly**
```
File: js/core/app.js
Function: window.resolveAssetPath()
Base URL: '/infiniteinterior-decor/'
Cleaned Path: 'assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp'
Final: '/infiniteinterior-decor/assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp'
```

**Step 8: HTML Generation**
```
File: js/pages/home.js
Function: renderImage()
Output: <img src="/infiniteinterior-decor/assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp" ...>
```

---

## Part 5: Flaws in Path Construction Logic

### Critical Flaw #1: Data Inconsistency

**Issue:** Multiple projects in `database.json` reference the same image files.

**Example:**
```json
// Project 1: Baithke Bihari Cafe (CORRECT)
"image": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"

// Project 2: Monte Carlo Home Store (INCORRECT - references Project 1's images)
"image": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"

// Project 3: Modern Residential Apartment (INCORRECT - references Project 1's images)
"image": "assets/images/projects/baithke-bihari-jehanabad-2023/gallery/image-01.webp"
```

**Impact:** 
- Monte Carlo Home Store and Modern Residential Apartment display Baithke Bihari Cafe images
- Confusing user experience
- Misleading project portfolio

**Root Cause:** Image files don't exist for these projects, so paths were copied from existing project as placeholders.

**Recommendation:** 
1. Create actual image files for each project
2. Or use generic placeholder images
3. Or remove image references and use placeholders

---

### Flaw #2: Fallback Logic Inconsistency

**Issue:** `renderImage()` has inconsistent fallback behavior.

**Code:**
```javascript
const srcPath = typeof window !== 'undefined' && typeof window.resolveAssetPath === 'function' 
  ? window.resolveAssetPath(imagePath) 
  : (imagePath.startsWith('./') || imagePath.startsWith('/') ? imagePath : `./${imagePath}`);
```

**Problems:**
1. **Environment-specific:** Fallback only triggers if `window.resolveAssetPath` doesn't exist
2. **Inconsistent path handling:** Fallback adds `./` prefix but resolver doesn't
3. **No error handling:** If resolver fails, no graceful degradation
4. **Development vs Production:** Different behavior in different environments

**Recommendation:** Standardize path resolution across all environments or remove fallback entirely.

---

### Flaw #3: No Path Validation

**Issue:** No validation that resolved paths point to existing files.

**Current Behavior:**
- Path is constructed and inserted into HTML
- Browser attempts to load image
- If file doesn't exist, `onerror` handler hides image
- No console warning about missing files

**Problems:**
- Silent failures
- No logging of 404 errors
- Difficult to debug missing assets
- Placeholder fallback only triggers after image load fails

**Recommendation:** Add pre-flight validation to check if files exist before rendering.

---

### Flaw #4: Hardcoded Repository Name

**Issue:** Repository name is hardcoded in `getBaseUrl()`.

**Code:**
```javascript
window.getBaseUrl = function() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  return isGitHubPages ? '/infiniteinterior-decor/' : '/';
};
```

**Problems:**
- Not portable to other repositories
- Requires code change if repository is renamed
- Breaks if deployed to different GitHub Pages URL

**Recommendation:** Extract repository name from `window.location.pathname` dynamically.

---

### Flaw #5: Regex Over-Stripping

**Issue:** Path cleaning regex may strip too much.

**Code:**
```javascript
let cleanPath = assetPath.replace(/^(\/infiniteinterior-decor\/|\/)/, '');
```

**Problems:**
- Strips any leading slash, even if intentional
- Strips repository name if accidentally included
- No way to preserve absolute paths if needed

**Example:**
```
Input: "/assets/images/hero.webp"
Output: "assets/images/hero.webp" (leading slash removed)
```

**Recommendation:** Be more selective about what to strip, or add configuration options.

---

### Flaw #6: No Caching of Base URL

**Issue:** `getBaseUrl()` is called every time `resolveAssetPath()` is invoked.

**Impact:**
- Unnecessary function calls
- Performance overhead on pages with many images
- Hostname check repeated unnecessarily

**Recommendation:** Cache base URL on first call and reuse.

---

## Part 6: Recommendations

### Immediate Fixes

1. **Fix Data Inconsistency**
   - Update database.json to point to correct project images
   - Create placeholder images for projects without real images
   - Or remove image references for projects without images

2. **Add Path Validation**
   - Implement pre-flight checks for file existence
   - Log warnings for missing files
   - Provide better error messages

3. **Improve Fallback Logic**
   - Standardize path resolution across environments
   - Add graceful degradation
   - Better error handling

### Long-term Improvements

1. **Dynamic Repository Detection**
   - Extract repository name from URL
   - Make code portable across repositories

2. **Performance Optimization**
   - Cache base URL
   - Batch path resolution
   - Lazy load resolver

3. **Better Debugging**
   - Add logging for path transformations
   - Track 404 errors
   - Provide diagnostic tools

---

## End of Report
