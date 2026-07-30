# 18_RUNTIME_RISK.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete runtime risk analysis

---

## Runtime Risk Overview

Runtime risk analysis identifies potential issues that could cause runtime errors, crashes, or unexpected behavior.

**Total Risk Categories:** 8  
**High Severity Risks:** 3  
**Medium Severity Risks:** 3  
**Low Severity Risks:** 2  
**Overall Risk Level:** Medium  

---

## High Severity Risks

### Risk 1: Bootstrap Validation Failure for Singletons

**Location:** js/estimator-bootstrap.js

**Description:** Bootstrap's `validateConstructor` function checks if module is a function (constructor), but singletons are objects.

**Code:**
```javascript
function validateConstructor(name, constructor) {
  if (!constructor) {
    Diagnostic.error(`Constructor not found: ${name}`);
    return false;
  }
  
  if (typeof constructor !== 'function') {
    Diagnostic.error(`Constructor is not a function: ${name}`, { type: typeof constructor });
    return false;
  }
  
  Diagnostic.info(`Constructor validated: ${name}`);
  return true;
}
```

**Impact:**
- Singletons (Storage, State) fail validation
- Error logged but module continues to load
- Potential runtime error if validation logic changes
- Confusing diagnostic output

**Severity:** High

**Likelihood:** High (singletons always fail validation)

**Mitigation:** Bootstrap continues loading despite validation failure

**Recommended Fix:** Update validation to accept both constructors and singletons

---

### Risk 2: Storage Manager Instantiated as Constructor

**Location:** js/estimator-engine.js

**Description:** Estimator Engine instantiates new StorageManager instead of using singleton.

**Code:**
```javascript
// Estimator Engine (incorrect)
this.storage = new window.EstimatorStorage();
```

**Expected:**
```javascript
// Should use singleton
this.storage = window.EstimatorStorage;
```

**Impact:**
- Creates multiple database connections
- State duplication
- Memory overhead
- Inconsistent state
- Potential data corruption

**Severity:** High

**Likelihood:** High (occurs every time Estimator Engine initializes)

**Mitigation:** None (no current mitigation)

**Recommended Fix:** Use singleton instance instead of instantiating new instance

---

### Risk 3: Router State Dependency

**Location:** js/estimator-router.js

**Description:** Router expects stateManager in constructor but may receive undefined if state fails to load.

**Code:**
```javascript
constructor(stateManager) {
  this.state = stateManager;
  // ...
}

init() {
  this.currentStep = this.state.get('currentStep') || 1;
  // ...
}
```

**Impact:**
- If stateManager is undefined, `this.state.get()` will throw error
- Router initialization will fail
- Estimator will crash

**Severity:** High

**Likelihood:** Medium (only if state fails to load)

**Mitigation:** Bootstrap continues loading despite validation failure

**Recommended Fix:** Add parameter validation in Router constructor

---

## Medium Severity Risks

### Risk 4: Legal Pages Path Inconsistency

**Location:** pages/privacy/index.html, pages/terms/index.html, pages/404/index.html

**Description:** Legal pages use incorrect CSS and navigation paths.

**CSS Paths:**
- pages/privacy/index.html → `../css/main.css` (should be `../../css/main.css`)
- pages/terms/index.html → `../css/main.css` (should be `../../css/main.css`)
- pages/404/index.html → `../css/main.css` (should be `../../css/main.css`)

**Navigation Paths:**
- pages/privacy/index.html → `about/index.html` (should be `../about/index.html`)
- pages/terms/index.html → `about/index.html` (should be `../about/index.html`)
- pages/404/index.html → `about/index.html` (should be `../about/index.html`)

**Impact:**
- CSS 404 errors on legal pages
- Broken navigation on legal pages
- Unstyled pages
- Poor user experience

**Severity:** Medium

**Likelihood:** High (occurs on every legal page visit)

**Mitigation:** None (no current mitigation)

**Recommended Fix:** Correct CSS and navigation paths

---

### Risk 5: Missing Estimator Link on Legal Pages

**Location:** pages/privacy/index.html, pages/terms/index.html, pages/404/index.html

**Description:** Legal pages are missing Estimator link in navigation.

**Impact:**
- Users cannot access Estimator from legal pages
- Inconsistent navigation
- Poor user experience

**Severity:** Medium

**Likelihood:** High (occurs on every legal page visit)

**Mitigation:** None (no current mitigation)

**Recommended Fix:** Add Estimator link to legal page navigation

---

### Risk 6: Asset Path Resolution Error

**Location:** js/helpers.js (line 443)

**Description:** `resolveAssetPath` function has incorrect path slicing for GitHub Pages.

**Code:**
```javascript
// Incorrect line
effectiveSegments = pathSegments.slice(1); // Removes repository name
```

**Impact:**
- Asset resolution fails on GitHub Pages
- Images don't load
- Broken assets
- Poor user experience

**Severity:** Medium

**Likelihood:** High (occurs on GitHub Pages deployment)

**Mitigation:** None (no current mitigation)

**Recommended Fix:** Correct path slicing logic

---

## Low Severity Risks

### Risk 7: No Error Handling in Constructors

**Location:** All constructor modules

**Description:** Constructors don't validate parameters or handle errors.

**Example:**
```javascript
constructor(stateManager) {
  this.state = stateManager; // No validation if stateManager is null/undefined
}
```

**Impact:**
- Runtime errors if dependencies not provided
- Poor error messages
- Difficult to debug

**Severity:** Low

**Likelihood:** Low (dependencies usually provided by Bootstrap)

**Mitigation:** Bootstrap orchestrates loading

**Recommended Fix:** Add parameter validation

---

### Risk 8: No Fallback for IndexedDB

**Location:** js/storage-manager.js

**Description:** IndexedDB may not be available in some browsers.

**Impact:**
- Storage initialization may fail
- Draft saving may fail
- Limited functionality

**Severity:** Low

**Likelihood:** Low (IndexedDB widely supported)

**Mitigation:** localStorage fallback implemented

**Recommended Fix:** None adequate (fallback already exists)

---

## Risk Mitigation Strategies

### Current Mitigations

**Bootstrap Graceful Failure:**
- Bootstrap continues loading despite validation failures
- Diagnostic logging for errors
- Application continues with available modules

**localStorage Fallback:**
- IndexedDB falls back to localStorage if unavailable
- Storage operations continue with fallback

**PDF Generator Fallback:**
- PDF generator initialization fails gracefully
- Application continues without PDF functionality

---

### Recommended Mitigations

**1. Fix Bootstrap Validation:**
```javascript
function validateModule(name, module) {
  if (!module) {
    Diagnostic.error(`Module not found: ${name}`);
    return false;
  }
  
  // Accept both constructors (functions) and singletons (objects)
  if (typeof module !== 'function' && typeof module !== 'object') {
    Diagnostic.error(`Module is invalid: ${name}`, { type: typeof module });
    return false;
  }
  
  Diagnostic.info(`Module validated: ${name}`);
  return true;
}
```

**2. Fix Storage Manager Usage:**
```javascript
// Estimator Engine
this.storage = window.EstimatorStorage; // Use singleton
```

**3. Add Router Validation:**
```javascript
constructor(stateManager) {
  if (!stateManager) {
    throw new Error('stateManager is required');
  }
  this.state = stateManager;
}
```

**4. Fix Legal Pages Paths:**
- Update CSS paths to `../../css/main.css`
- Update navigation paths to `../about/index.html`
- Add Estimator link to navigation

**5. Fix Asset Path Resolution:**
- Correct path slicing logic in helpers.js
- Test on GitHub Pages

**6. Add Constructor Validation:**
- Add parameter validation to all constructors
- Add error handling
- Add default values where appropriate

---

## Risk Summary

**Total Risks Identified:** 8  
**High Severity:** 3  
**Medium Severity:** 3  
**Low Severity:** 2  
**Overall Risk Level:** Medium  

**High Severity Risks:**
1. Bootstrap validation failure for singletons
2. Storage Manager instantiated as constructor
3. Router state dependency

**Medium Severity Risks:**
4. Legal pages path inconsistency
5. Missing Estimator link on legal pages
6. Asset path resolution error

**Low Severity Risks:**
7. No error handling in constructors
8. No fallback for IndexedDB (has localStorage fallback)

**Current Mitigations:** 3 (Bootstrap graceful failure, localStorage fallback, PDF generator fallback)

**Recommended Actions:**
1. Fix Bootstrap validation to accept singletons
2. Fix Storage Manager usage to use singleton
3. Add Router parameter validation
4. Fix legal pages CSS and navigation paths
5. Add Estimator link to legal pages
6. Fix asset path resolution logic
7. Add constructor parameter validation

**Risk Mitigation Priority:**
1. High: Fix Bootstrap validation
2. High: Fix Storage Manager usage
3. High: Add Router validation
4. Medium: Fix legal pages paths
5. Medium: Add Estimator link to legal pages
6. Medium: Fix asset path resolution
7. Low: Add constructor validation
