# AI Developer Master Guide

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Target Audience:** AI Development Assistants  
**Last Updated:** 2026-07-31  
**Version:** 1.0.0

---

## Overview

This is a comprehensive guide for AI development assistants working on the Infinite Interior Decor project. It provides detailed technical information, context, and guidelines for understanding and modifying the codebase.

---

## Project Context

### Project Type
- **Type:** Static Website
- **Hosting:** GitHub Pages
- **Tech Stack:** Vanilla HTML/CSS/JS
- **Architecture:** Client-side only
- **Build Process:** None (static files)

### Key Characteristics
- No backend required
- No build process
- No ES6 modules (IIFE pattern)
- No external JavaScript libraries
- Static hosting compatible
- GitHub Pages optimized

---

## Critical Architecture Rules

### ⚠️ MUST NOT DO

1. **NEVER use ES6 modules**
   - No `import`/`export` statements
   - No `require()` calls
   - Use IIFE pattern instead

2. **NEVER add server-side code**
   - No PHP files
   - No Node.js files
   - No Python files
   - No database connections

3. **NEVER use absolute paths starting with `/`**
   - Use relative paths
   - Use `window.resolveAssetPath()` for asset paths
   - GitHub Pages subpath compatibility

4. **NEVER break the IIFE pattern**
   - All JS files must be wrapped in IIFE
   - Must include `'use strict'`
   - Must export to `window` object

5. **NEVER modify singleton instances directly**
   - Use public methods
   - Don't access private properties
   - Follow API patterns

### ✅ MUST DO

1. **ALWAYS use IIFE pattern**
```javascript
(function() {
  'use strict';
  
  // Your code here
  
  // Export to window
  window.ModuleName = ClassName;
  
})();
```

2. **ALWAYS export to window object**
```javascript
window.ModuleName = ClassName;
window.ObjectName = objectName;
```

3. **ALWAYS use relative paths**
```html
<link rel="stylesheet" href="css/main.css">
<a href="pages/about/index.html">
```

4. **ALWAYS handle errors gracefully**
```javascript
try {
  // Code that might fail
} catch (error) {
  console.error('Error:', error);
  // Fallback behavior
}
```

5. **ALWAYS use BEM naming for CSS**
```css
.block { }
.block__element { }
.block--modifier { }
```

---

## File Structure Reference

### Complete File Map

```
C:\Users\Ayaan\Desktop\Infinite-Interior\
├── index.html                          # Homepage
├── favicon.ico                         # Site favicon
├── manifest.json                       # PWA manifest
├── robots.txt                          # SEO robots
├── sitemap.xml                         # XML sitemap
├── .gitignore                          # Git ignore
├── README.md                           # Project README
│
├── components/                         # HTML components
│   ├── button.html
│   ├── footer.html
│   └── navbar.html
│
├── css/                                # Stylesheets
│   ├── main.css                        # Main entry point
│   ├── core/                           # Core CSS
│   │   ├── design-tokens.css
│   │   ├── breakpoints.css
│   │   ├── reset.css
│   │   ├── utilities.css
│   │   └── micro-interactions.css
│   ├── components/                     # Component CSS
│   │   ├── navbar.css
│   │   ├── footer.css
│   │   ├── button.css
│   │   ├── card.css
│   │   ├── grid.css
│   │   └── [14 more component files]
│   ├── pages/                          # Page CSS
│   │   ├── home.css
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── gallery.css
│   │   ├── projects.css
│   │   ├── project-detail.css
│   │   ├── services.css
│   │   ├── 404.css
│   │   └── legal.css
│   ├── estimator.css                    # Estimator main
│   ├── estimator-layout.css            # Estimator layout
│   ├── estimator-components.css        # Estimator components
│   ├── estimator-responsive.css        # Estimator responsive
│   └── estimator-animations.css        # Estimator animations
│
├── js/                                 # JavaScript modules
│   ├── core/                           # Core JS
│   │   ├── app.js                      # Main app entry
│   │   ├── navbar.js                   # Navbar functionality
│   │   ├── image-placeholder.js        # Image placeholders
│   │   ├── lazy-load.js                # Lazy loading
│   │   └── schema.js                   # Schema validation
│   ├── pages/                          # Page-specific JS
│   │   ├── home.js
│   │   └── projects.js
│   ├── helpers.js                      # Utility functions
│   ├── storage.js                      # Storage engine (singleton)
│   ├── storage-manager.js              # Storage management
│   ├── validation.js                   # Form validation
│   ├── estimator-bootstrap.js          # Estimator bootstrap
│   ├── estimator.js                    # Estimator entry
│   ├── estimator-state.js              # State manager (singleton)
│   ├── estimator-router.js             # Router (constructor)
│   ├── estimator-ui.js                 # UI controller (constructor)
│   ├── estimator-engine.js             # Main estimator engine
│   ├── material-engine.js              # Material calculations
│   ├── package-engine.js               # Package calculations
│   ├── budget-engine.js                # Budget calculations
│   ├── module-engine.js                # Module calculations
│   ├── boq-engine.js                   # BOQ generation
│   ├── comparison-engine.js            # Package comparison
│   ├── recommendation-engine.js         # Recommendations
│   └── pdf-generator.js                # PDF generation
│
├── data/                               # JSON data
│   ├── database.json                   # Main database
│   └── estimator/                      # Estimator data
│       ├── materials.json              # Materials schema
│       ├── materials/                   # Material categories
│       │   ├── automation.json
│       │   ├── boards.json
│       │   ├── electrical.json
│       │   ├── false-ceiling.json
│       │   ├── finishes.json
│       │   ├── glass.json
│       │   ├── hardware.json
│       │   ├── kitchen-accessories.json
│       │   ├── laminates.json
│       │   ├── lighting.json
│       │   ├── paint.json
│       │   ├── plumbing.json
│       │   ├── plywood.json
│       │   ├── stone.json
│       │   └── wardrobe-accessories.json
│       ├── pricing-rules.json          # Pricing rules
│       ├── recommendations.json        # Recommendations
│       ├── upgrade-rules.json          # Upgrade rules
│       ├── validation-rules.json       # Validation rules
│       ├── package-library.json        # Package library
│       ├── room-library.json           # Room library
│       ├── styles.json                 # Design styles
│       ├── modules.json                # Module definitions
│       ├── brands.json                 # Brand info
│       ├── cities.json                 # City data
│       └── hardware.json               # Hardware specs
│
├── pages/                              # Page HTML files
│   ├── 404/index.html
│   ├── about/index.html
│   ├── contact/index.html
│   ├── estimator/index.html           # Estimator page
│   ├── gallery/index.html
│   ├── privacy/index.html
│   ├── projects/index.html
│   ├── projects/detail/index.html
│   ├── services/index.html
│   └── terms/index.html
│
├── layouts/                            # HTML layouts
│   └── default.html
│
├── assets/                             # Static assets
│   └── images/                         # Images
│
├── docs/                               # Documentation
│   └── project-documentation/          # Technical docs
│       ├── 00_PROJECT_OVERVIEW.md
│       ├── 01_FOLDER_STRUCTURE.md
│       ├── 02_COMPLETE_FILE_INDEX.md
│       ├── 03_HTML_ARCHITECTURE.md
│       ├── 04_CSS_ARCHITECTURE.md
│       ├── 05_JS_ARCHITECTURE.md
│       ├── 06_RUNTIME_LOADING.md
│       ├── 07_COMPONENT_SYSTEM.md
│       ├── 08_ESTIMATOR_ARCHITECTURE.md
│       ├── 09_DATA_FLOW.md
│       ├── 10_JSON_DATABASE.md
│       ├── 11_ASSET_SYSTEM.md
│       ├── 12_DEPENDENCY_GRAPH.md
│       ├── 13_GLOBAL_OBJECTS.md
│       ├── 14_SINGLETON_SYSTEM.md
│       ├── 15_ROUTING_SYSTEM.md
│       ├── 16_STORAGE_SYSTEM.md
│       ├── 17_PDF_SYSTEM.md
│       ├── 18_BOQ_SYSTEM.md
│       ├── 19_PERFORMANCE_SYSTEM.md
│       ├── 20_CONSOLE_DEBUG_GUIDE.md
│       ├── 21_SAFE_EDIT_RULES.md
│       ├── 22_DEVELOPER_GUIDE.md
│       ├── 23_GITHUB_PAGES_GUIDE.md
│       ├── 24_PROJECT_HEALTH_REPORT.md
│       ├── 25_MASTER_ARCHITECTURE.md
│       ├── 99_AI_DEVELOPER_MASTER_GUIDE.md (this file)
│       └── 100_AI_CONTEXT.md
│
├── .github/                            # GitHub configuration
│   └── workflows/                      # CI/CD workflows
│
├── admin/                              # Admin panel (NOT IMPLEMENTED)
├── gallery/                            # Gallery images (NOT IMPLEMENTED)
└── config/                             # Configuration files
    └── site-config.json
```

---

## Module Reference

### Singleton Modules (Always single instance)

#### EstimatorStorage
- **File:** `js/storage.js`
- **Global:** `window.EstimatorStorage`
- **Purpose:** Storage engine (IndexedDB + localStorage)
- **Usage:**
```javascript
// Initialize
await window.EstimatorStorage.init();

// Save draft
const draftId = await window.EstimatorStorage.saveDraft(data);

// Load draft
const draft = await window.EstimatorStorage.loadDraft(draftId);

// List drafts
const drafts = await window.EstimatorStorage.listDrafts();
```

#### EstimatorState
- **File:** `js/estimator-state.js`
- **Global:** `window.EstimatorState`
- **Purpose:** State manager
- **Usage:**
```javascript
// Get state
const state = window.EstimatorState.getState();

// Get property
const budget = window.EstimatorState.get('budget');

// Set property
window.EstimatorState.set('budget', 1000000);

// Set multiple
window.EstimatorState.setMany({
  'budget': 1000000,
  'projectCategory': 'full_interior'
});

// Subscribe
const unsubscribe = window.EstimatorState.subscribe((state) => {
  console.log('State changed:', state);
});

// Reset
window.EstimatorState.reset();
```

#### EstimatorHelper
- **File:** `js/helpers.js`
- **Global:** `window.EstimatorHelper`
- **Purpose:** Utility functions
- **Usage:**
```javascript
// Format currency
const formatted = window.EstimatorHelper.formatCurrency(1000000);

// Generate ID
const id = window.EstimatorHelper.generateId();

// Debounce
const debounced = window.EstimatorHelper.debounce(fn, 300);

// Deep clone
const cloned = window.EstimatorHelper.deepClone(object);
```

### Constructor Modules (Require instantiation)

#### EstimatorRouter
- **File:** `js/estimator-router.js`
- **Global:** `window.EstimatorRouter` (class)
- **Purpose:** Wizard routing
- **Constructor:** `new EstimatorRouter(stateManager)`
- **Usage:**
```javascript
const router = new EstimatorRouter(window.EstimatorState);
router.init();
router.next();
router.previous();
router.goTo(3);
```

#### EstimatorUI
- **File:** `js/estimator-ui.js`
- **Global:** `window.EstimatorUI` (class)
- **Purpose:** UI controller
- **Constructor:** `new EstimatorUI(stateManager, router)`
- **Usage:**
```javascript
const ui = new EstimatorUI(window.EstimatorState, router);
ui.init();
ui.render();
```

#### EstimatorValidation
- **File:** `js/validation.js`
- **Global:** `window.EstimatorValidation` (class)
- **Purpose:** Form validation
- **Constructor:** `new EstimatorValidation()`
- **Usage:**
```javascript
const validation = new EstimatorValidation();
const result = validation.validateField('email', 'test@example.com', {
  required: true,
  email: true
});
```

### Engine Modules (Calculations)

#### All engines follow constructor pattern:
```javascript
const engine = new Estimator[EngineName]();
await engine.init();
const result = engine.method(data);
```

**Engines:**
- `EstimatorMaterialEngine` - Material calculations
- `EstimatorPackageEngine` - Package calculations
- `EstimatorBudgetEngine` - Budget calculations
- `EstimatorModuleEngine` - Module calculations
- `EstimatorBOQEngine` - BOQ generation
- `EstimatorComparisonEngine` - Package comparison
- `EstimatorRecommendationEngine` - Recommendations
- `EstimatorPDFGenerator` - PDF generation

---

## Estimator Bootstrap System

### Critical Module Loading Order

The estimator bootstrap loader MUST load modules in this exact order:

1. **Storage** (singleton)
2. **State** (singleton)
3. **Validation** (constructor)
4. **Router** (constructor, requires state)
5. **MaterialEngine** (constructor)
6. **PackageEngine** (constructor)
7. **BudgetEngine** (constructor)
8. **RecommendationEngine** (constructor)
9. **ComparisonEngine** (constructor)
10. **ModuleEngine** (constructor)
11. **BOQEngine** (constructor)
12. **PDFGenerator** (constructor)
13. **EstimatorEngine** (constructor, requires state)
14. **UI** (constructor, requires state and router)

### Bootstrap Configuration

**File:** `js/estimator-bootstrap.js`

**Module Loading:**
```javascript
modules: [
  { name: 'Storage', check: () => window.EstimatorStorage, init: null },
  { name: 'State', check: () => window.EstimatorState, init: null },
  { name: 'Validation', check: () => window.EstimatorValidation, init: null },
  { name: 'Router', check: () => window.EstimatorRouter, init: null },
  // ... more modules
]
```

**Data Loading:**
```javascript
dataFiles: [
  { name: 'Materials', path: 'data/estimator/materials.json' },
  { name: 'PricingRules', path: 'data/estimator/pricing-rules.json' },
  { name: 'Recommendations', path: 'data/estimator/recommendations.json' },
  { name: 'UpgradeRules', path: 'data/estimator/upgrade-rules.json' }
]
```

---

## State Management

### State Structure

```javascript
{
  // Navigation
  currentStep: 1,
  totalSteps: 8,
  canProceed: false,
  canGoBack: false,
  
  // Project
  projectCategory: null,
  projectType: null,
  projectInfo: {},
  
  // Selections
  selectedPackage: null,
  packageTier: null,
  budget: null,
  budgetRange: null,
  budgetType: 'known',
  
  // Items
  rooms: [],
  roomCount: 0,
  selectedCustomServices: [],
  selectedModules: [],
  moduleCount: 0,
  
  // Client
  clientDetails: {
    name: null,
    email: null,
    phone: null,
    city: null,
    notes: null
  },
  
  // Design
  designStyle: null,
  materialTier: null,
  
  // Results
  comparisonData: null,
  recommendations: [],
  calculations: {
    subtotal: 0,
    tax: 0,
    total: 0,
    breakdown: {}
  },
  
  // Validation
  validationStatus: {
    currentStep: false,
    overall: false
  },
  
  // Draft
  isDraft: false,
  draftId: null,
  lastSaved: null,
  
  // UI
  ui: {
    isLoading: false,
    isSaving: false,
    error: null
  }
}
```

### State Access Patterns

**Get State:**
```javascript
const state = window.EstimatorState.getState();
```

**Get Property:**
```javascript
const budget = window.EstimatorState.get('budget');
const email = window.EstimatorState.get('clientDetails.email');
```

**Set Property:**
```javascript
window.EstimatorState.set('budget', 1000000);
```

**Set Multiple:**
```javascript
window.EstimatorState.setMany({
  'budget': 1000000,
  'projectCategory': 'full_interior'
});
```

**Subscribe:**
```javascript
const unsubscribe = window.EstimatorState.subscribe((state) => {
  console.log('State changed:', state);
});
```

---

## Router System

### Dynamic Step Flow

The router dynamically adjusts steps based on `projectCategory`:

**Custom Services Flow (4 steps):**
1. Category
2. Services Selection
3. Budget
4. Contact

**Standard Full Interior Flow (8 steps):**
1. Category
2. Type
3. Information
4. Requirements
5. Style
6. Package
7. Budget
8. Contact

### Router Usage

```javascript
const router = new EstimatorRouter(window.EstimatorState);
router.init();

// Navigation
router.next();
router.previous();
router.goTo(3);

// Information
const currentStep = router.getCurrentStep();
const allSteps = router.getAllSteps();
const totalSteps = router.totalSteps;

// Guards
router.addGuard(3, (state) => {
  return state.budget > 0;
});
```

---

## Storage System

### Storage Strategy

**Primary:** IndexedDB
- Large data capacity
- Asynchronous operations
- Structured storage

**Fallback:** localStorage
- Synchronous operations
- Smaller capacity
- Universal support

### Storage Usage

```javascript
// Initialize
await window.EstimatorStorage.init();

// Drafts
const draftId = await window.EstimatorStorage.saveDraft(data);
const draft = await window.EstimatorStorage.loadDraft(draftId);
const drafts = await window.EstimatorStorage.listDrafts();
await window.EstimatorStorage.deleteDraft(draftId);

// Cache
await window.EstimatorStorage.saveToCache('key', data, 3600000);
const data = await window.EstimatorStorage.loadFromCache('key');
await window.EstimatorStorage.clearCache();
```

---

## Asset Path Resolution

### Critical Functions

**Base URL Detection:**
```javascript
const baseUrl = window.getBaseUrl();
// Returns: '/' for local, '/repo-name/' for GitHub Pages
```

**Asset Path Resolution:**
```javascript
const path = window.resolveAssetPath('css/main.css');
// Returns: '/repo-name/css/main.css' for GitHub Pages
```

**Always use these functions for asset paths**

---

## CSS Architecture

### Design Tokens

Always use design tokens instead of hardcoded values:

```css
/* Do */
.component {
  color: var(--color-primary);
  padding: var(--spacing-md);
}

/* Don't */
.component {
  color: #9a7d3e;
  padding: 2rem;
}
```

### BEM Naming

Always follow BEM convention:

```css
.block { }
.block__element { }
.block--modifier { }
```

---

## JSON Data Structure

### Schema Validation

All JSON files include schema validation:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://infiniteinteriordecor.com/schemas/file.json",
  "schema_version": "1.0.0",
  "last_updated": "2024-01-01T00:00:00Z"
}
```

### Data Loading

Always use fetch with error handling:

```javascript
try {
  const response = await fetch(window.resolveAssetPath('data/file.json'));
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Error loading data:', error);
  // Fallback behavior
}
```

---

## Common Tasks

### Add New Page

1. Create `pages/new-page/index.html`
2. Create `css/pages/new-page.css`
3. Add CSS link in HTML
4. Add navigation link in navbar
5. Test page

### Add New Component

1. Create `components/new-component.html`
2. Create `css/components/new-component.css`
3. Import CSS in `css/main.css`
4. Use component in pages
5. Test component

### Add New JavaScript Module

1. Create `js/new-module.js`
2. Wrap in IIFE
3. Export to window object
4. Add script tag to HTML
5. Test module

### Add New Data File

1. Create JSON file in `data/`
2. Follow schema structure
3. Validate JSON
4. Load in JavaScript
5. Test data loading

---

## Debugging

### Bootstrap Diagnostics

```javascript
const report = window.EstimatorBootstrap.getDiagnosticReport();
console.log(report);
```

### State Inspection

```javascript
const state = window.EstimatorState.getState();
console.log(state);
```

### Router Inspection

```javascript
const router = new EstimatorRouter(window.EstimatorState);
console.log(router.getCurrentStep());
console.log(router.getAllSteps());
```

### Storage Inspection

```javascript
const drafts = await window.EstimatorStorage.listDrafts();
console.log(drafts);
```

---

## Error Handling

### Always Use Try-Catch

```javascript
try {
  // Code that might fail
} catch (error) {
  console.error('Error:', error);
  // Fallback behavior
}
```

### Always Check for Module Existence

```javascript
if (typeof window.ModuleName !== 'undefined') {
  window.ModuleName.init();
}
```

---

## Performance Guidelines

### Use Lazy Loading

```html
<img src="placeholder.jpg" data-src="actual.jpg" loading="lazy">
```

### Use Debouncing

```javascript
const debounced = window.EstimatorHelper.debounce(fn, 300);
```

### Use Request Animation Frame

```javascript
function animate() {
  requestAnimationFrame(animate);
  // Animation code
}
```

---

## GitHub Pages Specifics

### Subpath Handling

The project automatically handles GitHub Pages subpaths via:
- `window.getBaseUrl()`
- `window.resolveAssetPath()`

### Always Use Relative Paths

```html
<link rel="stylesheet" href="css/main.css">
<a href="pages/about/index.html">
```

---

## Testing Before Committing

### Checklist

- [ ] Page loads correctly
- [ ] No console errors
- [ ] All functionality works
- [ ] Responsive design intact
- [ ] Accessibility features work
- [ ] Paths work on GitHub Pages
- [ ] JSON files validated

---

## File Naming Conventions

- **CSS:** kebab-case (e.g., `component-name.css`)
- **JavaScript:** kebab-case (e.g., `module-name.js`)
- **HTML:** kebab-case directories, `index.html` files
- **JSON:** kebab-case (e.g., `data-name.json`)

---

## Common Pitfalls

### ❌ Don't Do This

```javascript
// Don't use ES6 modules
import { something } from './file.js';

// Don't use absolute paths
<link rel="stylesheet" href="/css/main.css">

// Don't break IIFE pattern
// Code without IIFE

// Don't modify singleton directly
window.EstimatorState.state.budget = 1000000;

// Don't use !important
.component { color: red !important; }
```

### ✅ Do This Instead

```javascript
// Use IIFE pattern
(function() {
  'use strict';
  // Code here
  window.ModuleName = ClassName;
})();

// Use relative paths
<link rel="stylesheet" href="css/main.css">

// Use public methods
window.EstimatorState.set('budget', 1000000);

// Use design tokens
.component { color: var(--color-primary); }
```

---

## Quick Reference

### Global Objects

- `window.getBaseUrl()` - Get base URL
- `window.resolveAssetPath(path)` - Resolve asset paths
- `window.EstimatorHelper` - Utility functions
- `window.EstimatorStorage` - Storage engine
- `window.EstimatorState` - State manager
- `window.EstimatorRouter` - Router class
- `window.EstimatorUI` - UI class
- `window.EstimatorValidation` - Validation class

### Key Files

- `js/core/app.js` - Main application entry
- `js/estimator-bootstrap.js` - Estimator bootstrap
- `js/estimator-state.js` - State manager
- `js/estimator-router.js` - Router
- `js/storage.js` - Storage engine
- `js/helpers.js` - Utility functions

### Documentation

- `00_PROJECT_OVERVIEW.md` - Project overview
- `21_SAFE_EDIT_RULES.md` - Safe editing rules
- `22_DEVELOPER_GUIDE.md` - Developer guide
- `20_CONSOLE_DEBUG_GUIDE.md` - Debugging guide

---

## Notes for AI

### When Modifying Code

1. **Read the existing code** - Understand the pattern
2. **Follow the pattern** - Don't introduce new patterns
3. **Test thoroughly** - Ensure no regressions
4. **Document changes** - Update relevant documentation

### When Adding Features

1. **Check if it fits the architecture** - Static hosting compatible?
2. **Use existing patterns** - IIFE, BEM, design tokens
3. **Follow conventions** - Naming, structure, organization
4. **Update documentation** - Keep docs in sync

### When Debugging

1. **Use console debugging** - See guide
2. **Check bootstrap diagnostics** - For estimator issues
3. **Inspect state** - For state issues
4. **Check storage** - For data persistence issues

---

**This guide is your primary reference for understanding and modifying the Infinite Interior Decor project. Always refer to this guide before making changes.**

---

**Last Updated:** 2026-07-31  
**Guide Version:** 1.0.0
