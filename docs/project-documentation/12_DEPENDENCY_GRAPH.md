# Dependency Graph Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

This document describes the dependency relationships between modules, files, and systems in the Infinite Interior Decor project.

---

## Dependency Types

### 1. HTML Dependencies
- CSS files loaded via `<link>` tags
- JavaScript files loaded via `<script>` tags
- External resources (fonts, images)

### 2. CSS Dependencies
- CSS imports via `@import`
- Design tokens
- Component dependencies

### 3. JavaScript Dependencies
- IIFE module loading order
- Global object dependencies
- Constructor parameter dependencies

### 4. Data Dependencies
- JSON data file loading
- Schema validation
- Data caching

---

## HTML Dependency Graph

### Homepage (index.html)

```
index.html
├── css/main.css
│   ├── css/core/design-tokens.css
│   ├── css/core/breakpoints.css
│   ├── css/core/reset.css
│   ├── css/core/utilities.css
│   ├── css/core/micro-interactions.css
│   ├── css/components/navbar.css
│   ├── css/components/footer.css
│   ├── css/components/button.css
│   ├── css/components/card.css
│   ├── css/components/grid.css
│   ├── css/components/image-placeholder.css
│   ├── css/components/trust.css
│   ├── css/components/features.css
│   ├── css/components/services-section.css
│   ├── css/components/projects-section.css
│   ├── css/components/cta.css
│   ├── css/components/gallery-section.css
│   ├── css/components/trusted-by.css
│   ├── css/components/why-choose.css
│   ├── css/components/process.css
│   ├── css/components/partners.css
│   └── css/components/faq.css
├── css/pages/home.css
├── js/core/app.js
│   ├── js/core/navbar.js
│   ├── js/core/image-placeholder.js
│   └── js/core/schema.js
└── js/pages/home.js
```

### Estimator Page (pages/estimator/index.html)

```
pages/estimator/index.html
├── ../../css/main.css
├── ../../css/estimator.css
├── ../../css/estimator-layout.css
├── ../../css/estimator-components.css
├── ../../css/estimator-responsive.css
├── ../../css/estimator-animations.css
├── ../../js/helpers.js
├── ../../js/storage.js
├── ../../js/estimator-state.js
├── ../../js/estimator-router.js
├── ../../js/estimator-bootstrap.js
└── ../../js/estimator.js
```

---

## CSS Dependency Graph

### Main CSS (css/main.css)

```
css/main.css
├── css/core/design-tokens.css (no dependencies)
├── css/core/breakpoints.css (no dependencies)
├── css/core/reset.css (no dependencies)
├── css/core/utilities.css (depends on design-tokens.css)
└── css/core/micro-interactions.css (no dependencies)
├── css/components/navbar.css (depends on design-tokens.css)
├── css/components/footer.css (depends on design-tokens.css)
├── css/components/button.css (depends on design-tokens.css)
├── css/components/card.css (depends on design-tokens.css)
├── css/components/grid.css (depends on design-tokens.css)
├── css/components/image-placeholder.css (depends on design-tokens.css)
├── css/components/trust.css (depends on design-tokens.css)
├── css/components/features.css (depends on design-tokens.css)
├── css/components/services-section.css (depends on design-tokens.css)
├── css/components/projects-section.css (depends on design-tokens.css)
├── css/components/cta.css (depends on design-tokens.css)
├── css/components/gallery-section.css (depends on design-tokens.css)
├── css/components/trusted-by.css (depends on design-tokens.css)
├── css/components/why-choose.css (depends on design-tokens.css)
├── css/components/process.css (depends on design-tokens.css)
├── css/components/partners.css (depends on design-tokens.css)
└── css/components/faq.css (depends on design-tokens.css)
```

### Estimator CSS

```
css/estimator.css (depends on core CSS)
├── css/estimator-layout.css (depends on estimator.css)
├── css/estimator-components.css (depends on estimator.css)
├── css/estimator-responsive.css (depends on estimator.css)
└── css/estimator-animations.css (depends on estimator.css)
```

---

## JavaScript Dependency Graph

### Core Application (js/core/app.js)

```
js/core/app.js
├── js/core/navbar.js (no dependencies)
├── js/core/image-placeholder.js (no dependencies)
└── js/core/schema.js (no dependencies)
├── js/pages/home.js (depends on app.js)
└── js/pages/projects.js (depends on app.js)
```

### Estimator Bootstrap (js/estimator-bootstrap.js)

```
js/estimator-bootstrap.js
├── js/helpers.js (no dependencies)
├── js/storage.js (depends on helpers.js)
├── js/estimator-state.js (no dependencies)
├── js/validation.js (depends on helpers.js)
├── js/estimator-router.js (depends on estimator-state.js)
├── js/material-engine.js (depends on helpers.js)
├── js/package-engine.js (depends on helpers.js)
├── js/budget-engine.js (depends on helpers.js)
├── js/recommendation-engine.js (depends on helpers.js)
├── js/comparison-engine.js (depends on helpers.js)
├── js/module-engine.js (depends on helpers.js)
├── js/boq-engine.js (depends on helpers.js)
├── js/pdf-generator.js (depends on helpers.js)
├── js/estimator-engine.js (depends on estimator-state.js)
└── js/estimator-ui.js (depends on estimator-state.js, estimator-router.js)
```

### Estimator Entry (js/estimator.js)

```
js/estimator.js
└── js/estimator-bootstrap.js (depends on all estimator modules)
```

---

## Data Dependency Graph

### Estimator Data Loading

```
js/estimator-bootstrap.js
├── data/estimator/materials.json
├── data/estimator/pricing-rules.json
├── data/estimator/recommendations.json
└── data/estimator/upgrade-rules.json
```

### Background Data Hydration

```
js/core/app.js
└── data/database.json
```

---

## Module Dependency Matrix

### Core Modules

| Module | Dependencies | Dependents |
|--------|-------------|------------|
| helpers.js | None | All estimator modules |
| storage.js | helpers.js | storage-manager.js |
| estimator-state.js | None | estimator-router.js, estimator-engine.js, estimator-ui.js |
| estimator-router.js | estimator-state.js | estimator-ui.js |
| validation.js | helpers.js | estimator-bootstrap.js |

### Engine Modules

| Module | Dependencies | Dependents |
|--------|-------------|------------|
| material-engine.js | helpers.js | estimator-bootstrap.js |
| package-engine.js | helpers.js | estimator-bootstrap.js |
| budget-engine.js | helpers.js | estimator-bootstrap.js |
| recommendation-engine.js | helpers.js | estimator-bootstrap.js |
| comparison-engine.js | helpers.js | estimator-bootstrap.js |
| module-engine.js | helpers.js | estimator-bootstrap.js |
| boq-engine.js | helpers.js | estimator-bootstrap.js |
| pdf-generator.js | helpers.js | estimator-bootstrap.js |

### UI Modules

| Module | Dependencies | Dependents |
|--------|-------------|------------|
| estimator-ui.js | estimator-state.js, estimator-router.js | estimator-bootstrap.js |
| estimator-engine.js | estimator-state.js | estimator-bootstrap.js |

---

## Load Order Dependencies

### Critical Load Order

**Homepage:**
1. HTML
2. CSS (main.css, home.css)
3. JavaScript (app.js, home.js)

**Estimator:**
1. HTML
2. CSS (estimator CSS files)
3. JavaScript (helpers.js)
4. JavaScript (storage.js)
5. JavaScript (estimator-state.js)
6. JavaScript (estimator-router.js)
7. JavaScript (estimator-bootstrap.js)
8. JavaScript (estimator.js)

### Estimator Module Load Order

1. helpers.js
2. storage.js
3. estimator-state.js
4. validation.js
5. estimator-router.js
6. material-engine.js
7. package-engine.js
8. budget-engine.js
9. recommendation-engine.js
10. comparison-engine.js
11. module-engine.js
12. boq-engine.js
13. pdf-generator.js
14. estimator-engine.js
15. estimator-ui.js
16. estimator-bootstrap.js
17. estimator.js

---

## Circular Dependencies

### Status: No Circular Dependencies

The project is designed to avoid circular dependencies:
- Single direction data flow
- Clear module hierarchy
- Constructor parameter injection
- Singleton pattern for core modules

---

## Dependency Management

### Dependency Resolution

**Static Dependencies:**
- HTML `<link>` and `<script>` tags
- CSS `@import` statements
- Fixed load order

**Dynamic Dependencies:**
- Bootstrap loader checks for module availability
- Graceful failure if module missing
- Diagnostic logging

### Dependency Injection

**Constructor Injection:**
```javascript
// Router requires state
class Router {
  constructor(stateManager) {
    this.state = stateManager;
  }
}

// UI requires state and router
class UI {
  constructor(stateManager, router) {
    this.state = stateManager;
    this.router = router;
  }
}
```

**Singleton Pattern:**
```javascript
// Storage is singleton
window.EstimatorStorage = StorageEngine.getInstance();

// State is singleton
window.EstimatorState = StateManager.getInstance();
```

---

## Dependency Best Practices

### 1. Minimize Dependencies
- Keep modules independent
- Use interfaces
- Avoid tight coupling

### 2. Clear Dependency Direction
- Unidirectional flow
- Clear hierarchy
- No circular dependencies

### 3. Document Dependencies
- Comment dependencies
- Document load order
- Maintain dependency graph

### 4. Handle Missing Dependencies
- Graceful failure
- Fallback behavior
- Error logging

### 5. Test Dependencies
- Test in isolation
- Test integration
- Test load order

---

## Dependency Visualization

### High-Level Dependency Graph

```
┌─────────────┐
│   HTML      │
└──────┬──────┘
       │
       ├──────────┐
       │          │
       ↓          ↓
┌─────────────┐ ┌─────────────┐
│    CSS      │ │  JavaScript │
└──────┬──────┘ └──────┬──────┘
       │               │
       │               ├──────────┐
       │               │          │
       ↓               ↓          ↓
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   Core CSS  │ │  Core JS    │ │  Data (JSON)│
└─────────────┘ └──────┬──────┘ └─────────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ↓               ↓               ↓
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Components │ │   Pages     │ │  Estimator  │
└─────────────┘ └─────────────┘ └─────────────┘
```

---

## Notes

- No circular dependencies
- Clear load order
- Bootstrap loader for estimator
- Constructor injection
- Singleton pattern for core modules
- Graceful failure handling

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
