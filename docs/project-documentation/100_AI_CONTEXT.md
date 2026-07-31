# AI Context - Quick Reference

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Purpose:** Quick AI understanding  
**Last Updated:** 2026-07-31

---

## Project Summary

**Type:** Static Website (GitHub Pages)  
**Tech Stack:** Vanilla HTML/CSS/JS (no frameworks)  
**Architecture:** Client-side only, no backend  
**Build Process:** None (static files)

---

## Critical Rules

### ⚠️ NEVER DO
- No ES6 modules (no import/export)
- No server-side code (PHP, Node.js, Python)
- No absolute paths starting with `/`
- No breaking IIFE pattern
- No modifying singleton instances directly

### ✅ ALWAYS DO
- Use IIFE pattern for all JS
- Export to window object
- Use relative paths
- Handle errors gracefully
- Use BEM naming for CSS

---

## Quick Code Patterns

### IIFE Pattern (Required)
```javascript
(function() {
  'use strict';
  
  // Your code here
  
  window.ModuleName = ClassName;
  
})();
```

### State Access
```javascript
// Get
const state = window.EstimatorState.getState();
const budget = window.EstimatorState.get('budget');

// Set
window.EstimatorState.set('budget', 1000000);
```

### Asset Paths
```javascript
const path = window.resolveAssetPath('css/main.css');
```

### Singleton Usage
```javascript
// Storage
await window.EstimatorStorage.init();
const draftId = await window.EstimatorStorage.saveDraft(data);

// Helper
const formatted = window.EstimatorHelper.formatCurrency(1000000);
```

### Constructor Usage
```javascript
const router = new EstimatorRouter(window.EstimatorState);
router.init();
router.next();
```

---

## File Structure

```
infinite-interior/
├── index.html
├── css/ (39 files)
├── js/ (25 files)
├── data/ (27 JSON files)
├── pages/ (10 pages)
├── components/ (3 components)
├── docs/ (27 documentation files)
└── assets/ (images)
```

---

## Key Modules

### Singletons
- `window.EstimatorStorage` - Storage engine
- `window.EstimatorState` - State manager
- `window.EstimatorHelper` - Utilities

### Constructors
- `EstimatorRouter` - Wizard routing
- `EstimatorUI` - UI controller
- `EstimatorValidation` - Form validation
- All engines (Material, Package, Budget, etc.)

---

## Estimator Bootstrap Order

1. Storage (singleton)
2. State (singleton)
3. Validation
4. Router (requires state)
5. Engines
6. EstimatorEngine (requires state)
7. UI (requires state, router)

---

## CSS Conventions

### BEM Naming
```css
.block { }
.block__element { }
.block--modifier { }
```

### Design Tokens
```css
.component {
  color: var(--color-primary);
  padding: var(--spacing-md);
}
```

---

## State Structure

```javascript
{
  currentStep: 1,
  projectCategory: null,
  budget: null,
  selectedPackage: null,
  rooms: [],
  clientDetails: { name, email, phone, city, notes },
  designStyle: null,
  materialTier: null,
  calculations: { subtotal, tax, total, breakdown }
}
```

---

## Router Flow

**Custom Services (4 steps):** Category → Services → Budget → Contact  
**Full Interior (8 steps):** Category → Type → Info → Requirements → Style → Package → Budget → Contact

---

## Storage

**Primary:** IndexedDB  
**Fallback:** localStorage  
**Keys:** `estimator_draft`, `estimator_drafts`, `estimator_settings`, `estimator_cache`

---

## Global Functions

- `window.getBaseUrl()` - Base URL for GitHub Pages
- `window.resolveAssetPath(path)` - Resolve asset paths
- `window.EstimatorHelper.formatCurrency(amount)` - Format currency
- `window.EstimatorHelper.generateId()` - Generate unique ID

---

## Debugging

```javascript
// Bootstrap diagnostics
const report = window.EstimatorBootstrap.getDiagnosticReport();
console.log(report);

// State inspection
console.log(window.EstimatorState.getState());

// Router inspection
const router = new EstimatorRouter(window.EstimatorState);
console.log(router.getCurrentStep());
```

---

## Common Tasks

### Add Page
1. Create `pages/new-page/index.html`
2. Create `css/pages/new-page.css`
3. Add CSS link in HTML
4. Add nav link
5. Test

### Add JS Module
1. Create `js/new-module.js`
2. Wrap in IIFE
3. Export to window
4. Add script tag
5. Test

### Add Data File
1. Create JSON in `data/`
2. Follow schema
3. Validate JSON
4. Load in JS
5. Test

---

## Testing Checklist

- [ ] Page loads
- [ ] No console errors
- [ ] Functionality works
- [ ] Responsive design
- [ ] Accessibility works
- [ ] GitHub Pages paths work

---

## Key Documentation

- `99_AI_DEVELOPER_MASTER_GUIDE.md` - Detailed guide
- `21_SAFE_EDIT_RULES.md` - Safe editing rules
- `20_CONSOLE_DEBUG_GUIDE.md` - Debugging guide
- `08_ESTIMATOR_ARCHITECTURE.md` - Estimator details

---

## Quick Tips

- Always use `window.resolveAssetPath()` for assets
- Always use BEM for CSS classes
- Always use design tokens for values
- Always handle errors with try-catch
- Always check module existence before use
- Always use relative paths for links
- Always follow IIFE pattern for JS

---

## GitHub Pages Notes

- Subpath handled automatically
- Use relative paths only
- No server-side code allowed
- Auto-deploys on push

---

**For detailed information, see `99_AI_DEVELOPER_MASTER_GUIDE.md`**

---

**Last Updated:** 2026-07-31  
**Version:** 1.0.0
