# Image Routing Diagnostic Report
## Infinite Interior Decor - GitHub Pages Deployment Analysis

**Report Generated:** July 28, 2026  
**Purpose:** Deep diagnostic scan of image routing issues causing 404 errors on live GitHub Pages site

---

## Executive Summary

The diagnostic scan reveals **multiple critical issues** that explain why images are not displaying despite the JavaScript `resolveAssetPath()` function being implemented:

1. **CSS Background Images** - Hardcoded relative paths in CSS that bypass JavaScript resolution
2. **Missing Project Images** - 3 out of 4 project folders are completely empty
3. **HTML Script References** - Outdated script references in index.html
4. **Path Resolution Timing** - Potential race condition between CSS loading and JavaScript initialization

---

## 1. CSS Files Audit

### Critical Findings

#### `css/pages/home.css` - Lines 37, 71
```css
background-image: url('../../assets/images/hero/hero.webp');
```

**Issue:** Hardcoded relative paths in CSS that **cannot be resolved by JavaScript**. CSS files are loaded before JavaScript executes, so these paths are resolved by the browser using standard relative path resolution.

**Impact:** 
- Hero section background images will 404 on GitHub Pages
- The path `../../assets/images/hero/hero.webp` resolves incorrectly from nested pages
- No dynamic base URL resolution is possible in CSS

**Files Affected:**
- `css/pages/home.css` (2 occurrences)
- `css/core/reset.css` (data URI - not an issue)

### CSS Background Image Summary
| File | Line | Path | Status |
|------|------|------|--------|
| `css/pages/home.css` | 37 | `../../assets/images/hero/hero.webp` | **CRITICAL** - Will 404 on GitHub Pages |
| `css/pages/home.css` | 71 | `../../assets/images/hero/hero.webp` | **CRITICAL** - Will 404 on GitHub Pages |
| `css/core/reset.css` | 422 | Data URI (SVG) | OK - Inline data |

---

## 2. JSON Data vs. Physical Files Analysis

### Physical Directory Structure
```
assets/images/projects/
├── baithke-bihari-jehanabad-2023/
│   └── gallery/
│       ├── image-01.webp (123KB) ✓ EXISTS
│       ├── image-02.webp (164KB) ✓ EXISTS
│       ├── image-03.webp (183KB) ✓ EXISTS
│       └── image-04.webp (138KB) ✓ EXISTS
├── modern-residential-bhimtal-2022/
│   └── gallery/ (0 items) ✗ EMPTY
├── monte-carlo-jehanabad-2023/
│   └── gallery/ (0 items) ✗ EMPTY
└── the-salon-company-bhimtal-2022/
    └── gallery/ (0 items) ✗ EMPTY
```

### database.json Current Configuration

All 4 projects are configured to use images from `baithke-bihari-jehanabad-2023/gallery/`:

| Project ID | Configured Path | Physical File Status |
|------------|-----------------|---------------------|
| `baithke-bihari-jehanabad-2023` | `baithke-bihari-jehanabad-2023/gallery/image-01.webp` | ✓ EXISTS |
| `monte-carlo-jehanabad-2023` | `baithke-bihari-jehanabad-2023/gallery/image-01.webp` | ✓ EXISTS (shared) |
| `modern-residential-bhimtal-2022` | `baithke-bihari-jehanabad-2023/gallery/image-01.webp` | ✓ EXISTS (shared) |
| `the-salon-company-bhimtal-2022` | `baithke-bihari-jehanabad-2023/gallery/image-01.webp` | ✓ EXISTS (shared) |

### Hero Image Status
```
assets/images/hero/
└── hero.webp (71KB) ✓ EXISTS
```

**Status:** The hero image exists but is referenced via CSS with incorrect relative paths.

---

## 3. HTML Image Tags Audit

### Hardcoded img src Analysis

#### `index.html` - Lines 591-594 (OUTDATED REFERENCES)
```html
<script src="js/home.js" defer></script>
<script src="js/app.js" defer></script>
<script src="js/animation.js" defer></script>
<script src="js/schema.js" defer></script>
```

**Issue:** These script references are **outdated and incorrect**:
- `js/home.js` should be `./js/pages/home.js`
- `js/app.js` should be `./js/core/app.js`
- `js/animation.js` - **FILE DOES NOT EXIST**
- `js/schema.js` should be `./js/core/schema.js`

**Impact:** These scripts will 404, causing JavaScript errors and potentially preventing the `resolveAssetPath()` function from being defined.

#### Dynamic Image Rendering (CORRECT)
All dynamic images are properly using `window.resolveAssetPath()`:
- `pages/projects/detail/index.html` - Gallery images (line 329)
- `pages/projects/detail/index.html` - Related projects (line 349)
- `js/pages/projects.js` - Project cards (line 151)
- `js/core/navbar.js` - Logo rendering (line 30)

### HTML Image Tag Summary
| File | Type | Status | Notes |
|------|------|--------|-------|
| `index.html` | Script tags | **CRITICAL** | Outdated paths, non-existent files |
| `pages/projects/detail/index.html` | Dynamic images | OK | Uses `window.resolveAssetPath()` |
| `js/pages/projects.js` | Dynamic images | OK | Uses `window.resolveAssetPath()` |
| `js/core/navbar.js` | Logo | OK | Uses `window.resolveAssetPath()` |

---

## 4. Console Error Context Analysis

### Why 404 Errors Persist Despite resolveAssetPath()

#### Issue #1: CSS Background Images (Primary Cause)
**Problem:** CSS `background-image: url(...)` properties are resolved by the browser **before JavaScript executes**. The `resolveAssetPath()` function cannot affect CSS paths.

**Example:**
```css
/* This path is resolved by browser CSS parser */
background-image: url('../../assets/images/hero/hero.webp');
```

**Result:** On GitHub Pages at `infiniteinteriordecor.github.io/infiniteinterior-decor/`, this resolves to:
- Incorrect: `infiniteinteriordecor.github.io/infiniteinterior-decor/../../assets/images/hero/hero.webp`
- Expected: `infiniteinteriordecor.github.io/infiniteinterior-decor/assets/images/hero/hero.webp`

#### Issue #2: Script Loading Race Condition
**Problem:** The outdated script references in `index.html` (lines 591-594) cause 404 errors before the correct scripts load.

**Sequence:**
1. Browser loads `index.html`
2. Browser attempts to load `js/home.js` → 404 error
3. Browser attempts to load `js/app.js` → 404 error  
4. Browser attempts to load `js/animation.js` → 404 error (file doesn't exist)
5. Browser attempts to load `js/schema.js` → 404 error
6. Later, correct scripts load: `./js/core/app.js`, etc.

**Result:** JavaScript errors may prevent proper initialization of `window.resolveAssetPath()`.

#### Issue #3: CSS Path Resolution from Nested Pages
**Problem:** Relative CSS paths work from root but fail from nested pages.

**Example:**
- From `index.html`: `../../assets/images/hero/hero.webp` → `/assets/images/hero/hero.webp` ✓
- From `pages/projects/index.html`: `../../assets/images/hero/hero.webp` → `/assets/images/hero/hero.webp` ✓
- From `pages/projects/detail/index.html`: CSS not loaded, but if it were: `../../assets/images/hero/hero.webp` → `/assets/images/hero/hero.webp` ✓

**Actually:** The CSS paths might work locally but the issue is that CSS cannot use the dynamic base URL resolution.

---

## 5. Root Cause Analysis

### Primary Root Cause: CSS Background Images
The **main issue** is that CSS background images use hardcoded relative paths that cannot be dynamically resolved by JavaScript. CSS is parsed and applied before JavaScript executes, making it impossible to use `window.resolveAssetPath()` for CSS `url()` properties.

### Secondary Root Cause: Outdated Script References
The `index.html` file contains outdated script references that cause 404 errors and may prevent proper JavaScript initialization.

### Tertiary Issue: Missing Project Images
Three project folders are empty, but this has been mitigated by configuring all projects to use the existing images from `baithke-bihari-jehanabad-2023/gallery/`.

---

## 6. Recommended Solutions

### Solution 1: Fix CSS Background Images (HIGH PRIORITY)
**Option A: Use CSS Custom Properties with JavaScript**
```css
.hero__background {
  background-image: var(--hero-bg-image, url('../../assets/images/hero/hero.webp'));
}
```
```javascript
// Set CSS variable with resolved path
document.documentElement.style.setProperty('--hero-bg-image', 
  `url(${window.resolveAssetPath('assets/images/hero/hero.webp')})`);
```

**Option B: Move Background Images to JavaScript**
Remove CSS background images and set them via JavaScript:
```javascript
document.querySelector('.hero__background').style.backgroundImage = 
  `url(${window.resolveAssetPath('assets/images/hero/hero.webp')})`;
```

**Option C: Use Absolute Paths in CSS**
Update CSS to use absolute paths that work with GitHub Pages:
```css
background-image: url('/infiniteinterior-decor/assets/images/hero/hero.webp');
```

### Solution 2: Fix Script References (HIGH PRIORITY)
Remove outdated script references from `index.html` lines 591-594:
```html
<!-- REMOVE THESE LINES -->
<script src="js/home.js" defer></script>
<script src="js/app.js" defer></script>
<script src="js/animation.js" defer></script>
<script src="js/schema.js" defer></script>
```

The correct scripts are already loaded at lines 627-633.

### Solution 3: Add Project Images (MEDIUM PRIORITY)
Create actual project images for the empty folders or continue using the shared images approach.

---

## 7. File-by-File Action Items

### Immediate Actions Required

1. **`css/pages/home.css`**
   - Line 37: Update background-image path or move to JavaScript
   - Line 71: Update background-image path or move to JavaScript

2. **`index.html`**
   - Lines 591-594: Remove outdated script references

3. **`js/pages/home.js`**
   - Add JavaScript to set CSS background images dynamically

### Optional Actions

4. **`assets/images/projects/`**
   - Add actual images to empty project folders
   - Update `data/database.json` to use correct project-specific paths

---

## 8. Testing Recommendations

After implementing fixes:

1. **Test CSS Background Images**
   - Load homepage and verify hero background loads
   - Check browser DevTools Network tab for 404s
   - Test from root and nested pages

2. **Test JavaScript Loading**
   - Verify no script 404 errors in console
   - Confirm `window.resolveAssetPath` is defined
   - Test dynamic image loading on projects page

3. **Test GitHub Pages Deployment**
   - Deploy to GitHub Pages
   - Test all image loads from live URL
   - Verify no 404 errors in browser console

---

## 9. Conclusion

The primary cause of image 404 errors is **CSS background images using hardcoded relative paths** that cannot be resolved by the JavaScript `resolveAssetPath()` function. CSS is parsed before JavaScript executes, making dynamic path resolution impossible for CSS `url()` properties.

The secondary issue is **outdated script references** in `index.html` that cause additional 404 errors and may prevent proper JavaScript initialization.

**Recommended Priority:**
1. Fix CSS background images (Solution 1)
2. Remove outdated script references (Solution 2)
3. Add project-specific images (Solution 3 - optional)

---

**Report End**
