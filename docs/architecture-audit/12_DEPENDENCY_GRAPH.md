# 12_DEPENDENCY_GRAPH.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete dependency graph analysis

---

## Dependency Graph Overview

The project has multiple dependency layers:
- **HTML Dependencies:** CSS and JavaScript files loaded by HTML pages
- **CSS Dependencies:** CSS imports and design tokens
- **JavaScript Dependencies:** Module imports and global objects
- **Data Dependencies:** JSON files loaded by JavaScript
- **Asset Dependencies:** Images, fonts, and other assets

---

## HTML Dependency Graph

### Main Pages (Home, About, Services, Projects, Gallery, Contact)

```
index.html
├── CSS Dependencies:
│   ├── css/main.css
│   │   ├── css/core/design-tokens.css
│   │   ├── css/core/breakpoints.css
│   │   ├── css/core/reset.css
│   │   ├── css/core/utilities.css
│   │   ├── css/core/micro-interactions.css
│   │   ├── css/components/navbar.css
│   │   ├── css/components/footer.css
│   │   ├── css/components/button.css
│   │   ├── css/components/card.css
│   │   ├── css/components/grid.css
│   │   ├── css/components/image-placeholder.css
│   │   ├── css/components/trust.css
│   │   ├── css/components/features.css
│   │   ├── css/components/services-section.css
│   │   ├── css/components/projects-section.css
│   │   ├── css/components/cta.css
│   │   ├── css/components/gallery-section.css
│   │   ├── css/components/trusted-by.css
│   │   ├── css/components/why-choose.css
│   │   ├── css/components/process.css
│   │   ├── css/components/partners.css
│   │   └── css/components/faq.css
│   └── css/pages/home.css
│
├── JavaScript Dependencies:
│   ├── js/helpers.js
│   ├── js/core/app.js
│   ├── js/core/navbar.js
│   ├── js/core/schema.js
│   ├── js/core/image-placeholder.js
│   ├── js/core/lazy-load.js
│   └── js/pages/home.js
│
└── Data Dependencies:
    └── data/database.json
```

### Estimator Page

```
pages/estimator/index.html
├── CSS Dependencies:
│   ├── css/main.css
│   │   └── (all core and component CSS as above)
│   ├── css/estimator.css
│   ├── css/estimator-layout.css
│   ├── css/estimator-components.css
│   ├── css/estimator-responsive.css
│   └── css/estimator-animations.css
│
├── JavaScript Dependencies:
│   ├── js/helpers.js
│   ├── js/core/navbar.js
│   ├── js/estimator-bootstrap.js
│   ├── js/storage-manager.js
│   ├── js/estimator-state.js
│   ├── js/validation.js
│   ├── js/estimator-router.js
│   ├── js/material-engine.js
│   ├── js/package-engine.js
│   ├── js/budget-engine.js
│   ├── js/recommendation-engine.js
│   ├── js/comparison-engine.js
│   ├── js/module-engine.js
│   ├── js/boq-engine.js
│   ├── js/pdf-generator.js
│   ├── js/estimator-engine.js
│   ├── js/estimator-ui.js
│   └── js/estimator.js
│
└── Data Dependencies:
    ├── data/estimator/materials.json
    ├── data/estimator/pricing-rules.json
    ├── data/estimator/recommendations.json
    └── data/estimator/upgrade-rules.json
```

---

## CSS Dependency Graph

### Main CSS Entry Point

```
css/main.css
├── Core CSS:
│   ├── css/core/design-tokens.css (no dependencies)
│   ├── css/core/breakpoints.css (no dependencies)
│   ├── css/core/reset.css (no dependencies)
│   ├── css/core/utilities.css (depends on design-tokens.css)
│   └── css/core/micro-interactions.css (depends on design-tokens.css)
│
└── Component CSS:
    ├── css/components/navbar.css (depends on design-tokens.css, reset.css)
    ├── css/components/footer.css (depends on design-tokens.css, reset.css)
    ├── css/components/button.css (depends on design-tokens.css)
    ├── css/components/card.css (depends on design-tokens.css)
    ├── css/components/grid.css (depends on design-tokens.css, breakpoints.css)
    ├── css/components/image-placeholder.css (depends on design-tokens.css)
    ├── css/components/trust.css (depends on design-tokens.css, card.css)
    ├── css/components/features.css (depends on design-tokens.css, card.css)
    ├── css/components/services-section.css (depends on design-tokens.css, card.css)
    ├── css/components/projects-section.css (depends on design-tokens.css, card.css)
    ├── css/components/cta.css (depends on design-tokens.css, button.css)
    ├── css/components/gallery-section.css (depends on design-tokens.css, card.css)
    ├── css/components/trusted-by.css (depends on design-tokens.css)
    ├── css/components/why-choose.css (depends on design-tokens.css, card.css)
    ├── css/components/process.css (depends on design-tokens.css)
    ├── css/components/partners.css (depends on design-tokens.css)
    └── css/components/faq.css (depends on design-tokens.css)
```

### Page-Specific CSS

```
css/pages/home.css (depends on design-tokens.css)
css/pages/about.css (depends on design-tokens.css)
css/pages/services.css (depends on design-tokens.css)
css/pages/projects.css (depends on design-tokens.css)
css/pages/project-detail.css (depends on design-tokens.css)
css/pages/gallery.css (depends on design-tokens.css)
css/pages/contact.css (depends on design-tokens.css)
css/pages/404.css (depends on design-tokens.css)
css/pages/legal.css (depends on design-tokens.css)
```

### Estimator CSS

```
css/estimator.css (depends on main.css)
css/estimator-layout.css (depends on estimator.css, main.css)
css/estimator-components.css (depends on estimator.css, main.css, button.css, card.css)
css/estimator-responsive.css (depends on estimator.css, main.css)
css/estimator-animations.css (depends on estimator.css, main.css)
```

---

## JavaScript Dependency Graph

### Core JavaScript

```
js/helpers.js (no dependencies)
├── Exports: window.Helper, window.resolveAssetPath, window.getBasePath
└── Used by: All JavaScript modules

js/core/app.js (depends on helpers.js)
├── Exports: window.getBaseUrl, window.resolveAssetPath
├── Uses: window.resolveAssetPath from helpers.js
└── Used by: All pages

js/core/navbar.js (depends on helpers.js)
├── Exports: window.Navbar
├── Uses: window.resolveAssetPath from helpers.js
└── Used by: All pages

js/core/schema.js (depends on helpers.js)
├── Exports: window.Schema
├── Uses: window.resolveAssetPath from helpers.js
├── Loads: data/database.json
└── Used by: All pages

js/core/image-placeholder.js (no dependencies)
├── Exports: window.ImagePlaceholder
└── Used by: All pages

js/core/lazy-load.js (no dependencies)
├── Exports: window.LazyLoad
└── Used by: All pages
```

### Page-Specific JavaScript

```
js/pages/home.js (depends on helpers.js)
├── Exports: window.Home
├── Uses: window.resolveAssetPath from helpers.js
├── Loads: data/database.json
└── Used by: index.html

js/pages/projects.js (depends on helpers.js)
├── Exports: window.Projects
├── Uses: window.ImagePlaceholder
├── Loads: data/database.json
└── Used by: pages/projects/index.html
```

### Estimator JavaScript

```
js/helpers.js (no dependencies)
└── Must load first

js/estimator-bootstrap.js (depends on helpers.js)
├── Exports: window.EstimatorBootstrap
├── Uses: window.resolveAssetPath from helpers.js
├── Loads: data/estimator/*.json files
├─ Loads: All estimator modules
└─ Must load before other estimator modules

js/storage-manager.js (no dependencies)
├─ Exports: window.EstimatorStorage (singleton)
└─ Used by: Estimator Engine, Estimator App

js/estimator-state.js (no dependencies)
├─ Exports: window.EstimatorState (singleton)
└─ Used by: Router, UI, Estimator Engine

js/validation.js (depends on helpers.js)
├─ Exports: window.EstimatorValidation (constructor)
├─ Uses: Helper from helpers.js
└─ Used by: Estimator Engine, UI

js/estimator-router.js (depends on estimator-state.js)
├─ Exports: window.EstimatorRouter (constructor)
├─ Requires: StateManager in constructor
└─ Used by: UI, Bootstrap

js/material-engine.js (depends on helpers.js)
├─ Exports: window.EstimatorMaterialEngine (constructor)
├─ Uses: Helper from helpers.js
└─ Used by: Estimator Engine, Package Engine, Module Engine, BOQ Engine

js/package-engine.js (depends on helpers.js, material-engine.js)
├─ Exports: window.EstimatorPackageEngine (constructor)
├─ Uses: Helper from helpers.js
└─ Used by: Estimator Engine

js/budget-engine.js (depends on helpers.js, material-engine.js)
├─ Exports: window.EstimatorBudgetEngine (constructor)
├─ Uses: Helper from helpers.js
└─ Used by: Estimator Engine

js/recommendation-engine.js (depends on helpers.js, material-engine.js, budget-engine.js)
├─ Exports: window.EstimatorRecommendationEngine (constructor)
├─ Uses: Helper from helpers.js
└─ Used by: Estimator Engine

js/comparison-engine.js (depends on helpers.js, budget-engine.js, material-engine.js)
├─ Exports: window.EstimatorComparisonEngine (constructor)
├─ Uses: Helper from helpers.js
└─ Used by: Estimator Engine

js/module-engine.js (depends on helpers.js, material-engine.js)
├─ Exports: window.EstimatorModuleEngine (constructor)
├─ Uses: Helper from helpers.js
└─ Used by: Estimator Engine, BOQ Engine

js/boq-engine.js (depends on helpers.js, material-engine.js, module-engine.js)
├─ Exports: window.EstimatorBOQEngine (constructor)
├─ Uses: Helper from helpers.js
└─ Used by: Estimator Engine

js/pdf-generator.js (depends on helpers.js)
├─ Exports: window.EstimatorPDFGenerator (constructor)
├─ Uses: Helper from helpers.js
└─ Used by: Estimator Engine

js/estimator-engine.js (depends on estimator-state.js, all engine modules)
├─ Exports: window.EstimatorEngine (constructor)
├─ Requires: StateManager in constructor
├─ Instantiates: All sub-engines
├─ Loads: data/estimator/*.json files
└─ Used by: Estimator App

js/estimator-ui.js (depends on estimator-state.js, estimator-router.js)
├─ Exports: window.EstimatorUI (constructor)
├─ Requires: StateManager, Router in constructor
└─ Used by: Estimator App

js/estimator.js (depends on estimator-bootstrap.js, all estimator modules)
├─ Exports: EstimatorApp constructor
├─ Uses: window.EstimatorBootstrap
└─ Used by: Estimator page
```

---

## Data Dependency Graph

### Main Site Data

```
data/database.json
├── Loaded by:
│   ├── core/schema.js
│   ├── pages/home.js
│   └── pages/projects.js
├── Contains:
│   ├── Company information
│   ├── About section
│   ├── Statistics
│   ├── Services
│   ├── Projects
│   ├── Gallery
│   ├── Team
│   ├── Testimonials
│   └── FAQ
└── No dependencies
```

### Estimator Data

```
data/estimator/materials.json
├── Loaded by: Bootstrap (Phase 3)
├── Used by:
│   ├── MaterialEngine
│   ├── PackageEngine
│   ├── ModuleEngine
│   └── BOQEngine
└── No dependencies

data/estimator/pricing-rules.json
├── Loaded by: Bootstrap (Phase 3)
├── Used by:
│   ├── BudgetEngine
│   ├── PackageEngine
│   ├── ModuleEngine
│   └── BOQEngine
└── No dependencies

data/estimator/recommendations.json
├── Loaded by: Bootstrap (Phase 3)
├── Used by: RecommendationEngine
└── No dependencies

data/estimator/upgrade-rules.json
├── Loaded by: Bootstrap (Phase 3)
├── Used by:
│   ├── RecommendationEngine
│   └── ComparisonEngine
└── No dependencies
```

### Unused Estimator Data

```
data/estimator/brands.json (not loaded)
data/estimator/cities.json (not loaded)
data/estimator/hardware.json (not loaded)
data/estimator/modules.json (not loaded)
data/estimator/package-library.json (not loaded)
data/estimator/room-library.json (not loaded)
data/estimator/styles.json (not loaded)
data/estimator/validation-rules.json (not loaded)
data/estimator/materials/*.json (18 files, not loaded)
```

---

## Asset Dependency Graph

### Logo Asset

```
assets/images/logo/logo.png
├── Loaded by: core/navbar.js
├── Path resolution: window.resolveAssetPath()
├── Used in: Navbar (all pages)
└── No dependencies
```

### Hero Asset

```
assets/images/hero/hero.webp
├── Loaded by: pages/home.js
├── Path resolution: window.resolveAssetPath()
├── Used in: Homepage hero section
└── No dependencies
```

### Client Logo Assets

```
assets/images/clients/*.png
├── Loaded by: database.json (references)
├── Used in: Trusted by section
└── No dependencies
```

### Project Image Assets

```
assets/images/projects/*/gallery/*.webp
├── Loaded by: database.json (references)
├── Used in: Projects page, Project detail pages
└── No dependencies
```

### Service Image Assets

```
assets/images/services/*.webp
├── Loaded by: database.json (references)
├── Used in: Services page
└── No dependencies
```

### Gallery Assets

```
assets/images/gallery/*.jpeg
├── Loaded by: database.json (references)
├── Used in: Gallery page
└─ No dependencies
```

---

## Dependency Issues

### Issue 1: Circular Dependencies

**Description:** No circular dependencies detected.

**Status:** Good

---

### Issue 2: Missing Dependencies

**Description:** Some JSON files are defined but not loaded.

**Files:**
- data/estimator/brands.json
- data/estimator/cities.json
- data/estimator/hardware.json
- data/estimator/modules.json
- data/estimator/package-library.json
- data/estimator/room-library.json
- data/estimator/styles.json
- data/estimator/validation-rules.json
- data/estimator/materials/*.json (18 files)

**Impact:** Limited functionality

**Severity:** Medium

---

### Issue 3: Duplicate Dependencies

**Description:** window.resolveAssetPath defined in multiple files.

**Files:**
- js/helpers.js
- js/core/app.js

**Impact:** Potential conflict if both loaded

**Severity:** Low (core/app.js checks if already defined)

---

### Issue 4: Dependency Loading Order

**Description:** Estimator modules must load in specific order.

**Required Order:**
1. helpers.js (must load first)
2. estimator-bootstrap.js (orchestrates loading)
3. storage-manager.js (singleton)
4. estimator-state.js (singleton)
5. validation.js (constructor)
6. estimator-router.js (requires state)
7. All engine modules
8. estimator-engine.js (requires state and engines)
9. estimator-ui.js (requires state and router)
10. estimator.js (entry point)

**Current Implementation:** Correct order enforced via defer attribute

**Status:** Good

---

### Issue 5: Hardcoded Paths

**Description:** Some paths are hardcoded in HTML component files.

**Files:**
- components/navbar.html (uses absolute paths)
- components/footer.html (uses absolute paths)

**Impact:** Components would break on GitHub Pages

**Severity:** High (but components are unused)

**Status:** Not an issue (components unused)

---

## Dependency Summary

**Total CSS Files:** 37  
**Total JS Files:** 25  
**Total JSON Files:** 29  
**Total Asset Files:** 18+  
**CSS Dependencies:** Hierarchical imports via main.css  
**JS Dependencies:** Global window objects with defer loading  
**Data Dependencies:** Fetch API with asset resolution  
**Asset Dependencies:** JavaScript-based path resolution  
**Circular Dependencies:** 0  
**Missing Dependencies:** 24 JSON files  
**Duplicate Dependencies:** 1 (resolveAssetPath)  
**Loading Order:** Enforced via defer attribute  
**Dependency Injection:** Used in Router, UI, Estimator Engine  
**Singleton Pattern:** Used for Storage, State, Bootstrap  
**Constructor Pattern:** Used for most modules  
**GitHub Pages Compatibility:** Full support via asset resolver
