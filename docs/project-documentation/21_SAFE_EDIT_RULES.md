# Safe Edit Rules Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

This document provides safe editing rules for the Infinite Interior Decor project. Following these rules ensures that changes don't break the application and maintain code quality.

---

## General Rules

### 1. Always Backup Before Editing

**Rule:** Create a backup before making significant changes

**Process:**
```bash
# Create backup branch
git checkout -b backup-before-changes

# Or commit current state
git add .
git commit -m "Backup before changes"
```

### 2. Test After Changes

**Rule:** Test changes thoroughly before committing

**Checklist:**
- [ ] Page loads correctly
- [ ] No console errors
- [ ] Functionality works
- [ ] Responsive design intact
- [ ] Accessibility features work

### 3. Commit Frequently

**Rule:** Commit changes frequently with descriptive messages

**Example:**
```bash
git commit -m "Fix navbar mobile menu toggle"
git commit -m "Update hero section styling"
```

---

## HTML Editing Rules

### 1. Maintain Semantic Structure

**Rule:** Use semantic HTML elements

**Do:**
```html
<nav role="navigation" aria-label="Main navigation">
<main id="main-content" role="main">
<section aria-labelledby="section-title">
```

**Don't:**
```html
<div class="nav">
<div class="main">
<div class="section">
```

### 2. Preserve Accessibility

**Rule:** Maintain ARIA attributes and accessibility features

**Do:**
```html
<button aria-label="Toggle navigation menu" aria-expanded="false">
<a href="#main-content" class="skip-link u-sr-only">
```

**Don't:**
```html
<button>
<a href="#main-content">
```

### 3. Update Meta Tags

**Rule:** Update meta tags when adding new pages

**Required Meta Tags:**
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="author" content="Infinite Interior Decor">
<meta name="robots" content="index, follow">
```

### 4. Use Correct Paths

**Rule:** Use relative paths for internal links

**Do:**
```html
<link rel="stylesheet" href="css/main.css">
<a href="pages/about/index.html">
```

**Don't:**
```html
<link rel="stylesheet" href="/css/main.css">
<a href="/pages/about/index.html">
```

---

## CSS Editing Rules

### 1. Follow BEM Convention

**Rule:** Use BEM naming convention

**Do:**
```css
.navbar { }
.navbar__brand { }
.navbar__link--active { }
```

**Don't:**
```css
.navbar { }
.navbar-brand { }
.navbar-link-active { }
```

### 2. Use Design Tokens

**Rule:** Use design tokens instead of hardcoded values

**Do:**
```css
.component {
  color: var(--color-primary);
  padding: var(--spacing-md);
}
```

**Don't:**
```css
.component {
  color: #9a7d3e;
  padding: 2rem;
}
```

### 3. Avoid !important

**Rule:** Avoid using !important

**Do:**
```css
.component--modifier {
  color: var(--color-primary);
}
```

**Don't:**
```css
.component {
  color: var(--color-primary) !important;
}
```

### 4. Mobile-First Approach

**Rule:** Write mobile-first CSS

**Do:**
```css
.component {
  padding: var(--spacing-sm);
}

@media (min-width: 768px) {
  .component {
    padding: var(--spacing-md);
  }
}
```

**Don't:**
```css
.component {
  padding: var(--spacing-md);
}

@media (max-width: 768px) {
  .component {
    padding: var(--spacing-sm);
  }
}
```

---

## JavaScript Editing Rules

### 1. Use IIFE Pattern

**Rule:** Wrap all JavaScript in IIFE

**Do:**
```javascript
(function() {
  'use strict';
  
  // Code here
  
})();
```

**Don't:**
```javascript
// Code here without IIFE
```

### 2. Don't Use ES6 Modules

**Rule:** Avoid import/export statements

**Do:**
```javascript
(function() {
  'use strict';
  
  class Module {
    // Code here
  }
  
  window.Module = Module;
  
})();
```

**Don't:**
```javascript
import { something } from './file.js';
export default Module;
```

### 3. Use Global Objects

**Rule:** Export to window object

**Do:**
```javascript
window.ModuleName = ClassName;
window.ModuleName = objectName;
```

**Don't:**
```javascript
// Don't create globals without window
ModuleName = ClassName;
```

### 4. Handle Errors Gracefully

**Rule:** Use try-catch for error handling

**Do:**
```javascript
try {
  const data = await loadData();
} catch (error) {
  console.error('Error loading data:', error);
  // Fallback behavior
}
```

**Don't:**
```javascript
const data = await loadData();
```

---

## JSON Editing Rules

### 1. Validate JSON

**Rule:** Validate JSON before committing

**Tools:**
- JSONLint
- VS Code JSON validator
- Online JSON validators

### 2. Follow Schema

**Rule:** Follow JSON schema definitions

**Do:**
```json
{
  "schema_version": "1.0.0",
  "last_updated": "2024-01-01T00:00:00Z",
  "materials": { ... }
}
```

**Don't:**
```json
{
  "materials": { ... }
}
```

### 3. Use Double Quotes

**Rule:** Use double quotes for keys and values

**Do:**
```json
{
  "key": "value"
}
```

**Don't:**
```json
{
  'key': 'value'
}
```

### 4. No Trailing Commas

**Rule:** Avoid trailing commas in JSON

**Do:**
```json
{
  "key1": "value1",
  "key2": "value2"
}
```

**Don't:**
```json
{
  "key1": "value1",
  "key2": "value2",
}
```

---

## Estimator Editing Rules

### 1. Don't Break Module Loading Order

**Rule:** Maintain module loading order in bootstrap

**Loading Order:**
1. Storage
2. State
3. Validation
4. Router
5. Engines
6. EstimatorEngine
7. UI

### 2. Don't Modify Singleton Instances

**Rule:** Don't modify singleton instances directly

**Do:**
```javascript
window.EstimatorState.set('budget', 1000000);
```

**Don't:**
```javascript
window.EstimatorState.state.budget = 1000000;
```

### 3. Don't Break State Flow

**Rule:** Maintain unidirectional data flow

**Flow:** UI → State → Storage

### 4. Test Estimator After Changes

**Rule:** Test estimator thoroughly after changes

**Test Checklist:**
- [ ] Bootstrap loads correctly
- [ ] All modules load
- [ ] State updates correctly
- [ ] Navigation works
- [ ] Validation works
- [ ] Storage works

---

## File Naming Rules

### 1. Use kebab-case

**Rule:** Use kebab-case for file names

**Do:**
```
css/components/navbar.css
js/estimator-router.js
data/estimator/materials.json
```

**Don't:**
```
css/components/Navbar.css
js/EstimatorRouter.js
data/estimator/materials.JSON
```

### 2. Use Descriptive Names

**Rule:** Use descriptive file names

**Do:**
```
estimator-bootstrap.js
estimator-router.js
estimator-state.js
```

**Don't:**
```
bootstrap.js
router.js
state.js
```

---

## Path Resolution Rules

### 1. Use Asset Path Resolution

**Rule:** Use window.resolveAssetPath() for asset paths

**Do:**
```javascript
const path = window.resolveAssetPath('css/main.css');
```

**Don't:**
```javascript
const path = 'css/main.css';
```

### 2. Use Base URL

**Rule:** Use window.getBaseUrl() for base URL

**Do:**
```javascript
const baseUrl = window.getBaseUrl();
```

**Don't:**
```javascript
const baseUrl = '/';
```

---

## GitHub Pages Rules

### 1. No Server-Side Code

**Rule:** Don't add server-side code

**Not Allowed:**
- PHP files
- Node.js files
- Python files
- Database connections

### 2. Use Relative Paths

**Rule:** Use relative paths for GitHub Pages compatibility

**Do:**
```html
<link rel="stylesheet" href="css/main.css">
```

**Don't:**
```html
<link rel="stylesheet" href="/css/main.css">
```

---

## Dangerous Operations

### ⚠️ DON'T DO THESE

1. **Don't delete core files**
   - index.html
   - css/main.css
   - js/core/app.js
   - js/estimator-bootstrap.js

2. **Don't modify IIFE structure**
   - Keep IIFE pattern
   - Keep strict mode
   - Keep window exports

3. **Don't break module dependencies**
   - Check dependencies before deleting
   - Update all references
   - Test thoroughly

4. **Don't change global object names**
   - Keep consistent naming
   - Update all references
   - Document changes

---

## Pre-Commit Checklist

### Before Committing

- [ ] Code follows project conventions
- [ ] No console errors
- [ ] All functionality works
- [ ] Responsive design intact
- [ ] Accessibility features work
- [ ] JSON files validated
- [ ] Paths tested on GitHub Pages
- [ ] Changes documented

---

## Notes

- Backup before editing
- Test thoroughly
- Follow conventions
- Maintain accessibility
- Use design tokens
- Handle errors gracefully
- Validate JSON
- Test on GitHub Pages

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
