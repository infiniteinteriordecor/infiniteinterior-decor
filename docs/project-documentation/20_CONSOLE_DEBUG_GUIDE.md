# Console Debug Guide

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

This guide provides instructions for debugging the Infinite Interior Decor project using browser console tools. It covers available debug commands, diagnostic logging, and troubleshooting techniques.

---

## Console Debugging Tools

### Bootstrap Diagnostics

The Estimator Bootstrap Loader provides comprehensive diagnostic logging.

#### Get Diagnostic Report

```javascript
// Get bootstrap diagnostic report
const report = window.EstimatorBootstrap.getDiagnosticReport();
console.log(report);
```

**Report Structure:**
```javascript
{
  timeline: [...],           // Array of events
  errors: [...],             // Array of errors
  warnings: [...],           // Array of warnings
  modules: { ... },          // Module status
  assets: { ... },           // Asset status
  fetches: { ... },          // Fetch status
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

## Global Object Inspection

### Check Available Globals

```javascript
// Check all Estimator globals
console.log(Object.keys(window).filter(key => key.startsWith('Estimator')));

// Check all globals
console.log(Object.keys(window).filter(key => 
  key === 'Navbar' || 
  key === 'ImagePlaceholder' || 
  key === 'Schema' ||
  key === 'Home' ||
  key === 'Projects'
));
```

### Inspect Specific Module

```javascript
// Inspect state
console.log(window.EstimatorState);

// Inspect helper
console.log(window.EstimatorHelper);

// Inspect storage
console.log(window.EstimatorStorage);
```

---

## State Debugging

### Get Current State

```javascript
// Get full state
const state = window.EstimatorState.getState();
console.log(state);

// Get specific property
const budget = window.EstimatorState.get('budget');
console.log(budget);

// Get nested property
const clientEmail = window.EstimatorState.get('clientDetails.email');
console.log(clientEmail);
```

### Modify State

```javascript
// Set property
window.EstimatorState.set('budget', 1000000);

// Set multiple properties
window.EstimatorState.setMany({
  'budget': 1000000,
  'projectCategory': 'full_interior'
});

// Reset state
window.EstimatorState.reset();
```

### State History

```javascript
// Undo last change
window.EstimatorState.undo();

// Redo last change
window.EstimatorState.redo();
```

---

## Router Debugging

### Router Inspection

```javascript
// Check router (must be instantiated first)
const router = new EstimatorRouter(window.EstimatorState);

// Get current step
const currentStep = router.getCurrentStep();
console.log(currentStep);

// Get all steps
const steps = router.getAllSteps();
console.log(steps);

// Get total steps
console.log(router.totalSteps);
```

### Router Navigation

```javascript
// Navigate to step
router.goTo(3);

// Next step
router.next();

// Previous step
router.previous();

// Reset router
router.reset();
```

---

## Storage Debugging

### Storage Inspection

```javascript
// List all drafts
window.EstimatorStorage.listDrafts().then(drafts => {
  console.log(drafts);
});

// Load specific draft
window.EstimatorStorage.loadDraft('draft-id').then(draft => {
  console.log(draft);
});
```

### localStorage Inspection

```javascript
// Check localStorage
console.log(localStorage.getItem('estimator_draft'));
console.log(localStorage.getItem('estimator_drafts'));
console.log(localStorage.getItem('estimator_settings'));
```

### IndexedDB Inspection

```javascript
// Open IndexedDB
const request = indexedDB.open('InfiniteInteriorEstimator', 1);

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('IndexedDB opened:', db);
  
  // List object stores
  console.log('Object stores:', Array.from(db.objectStoreNames));
};
```

---

## Performance Debugging

### Performance Timing

```javascript
// Time a function
console.time('Function execution');
// Your function here
console.timeEnd('Function execution');

// Performance API
const perfData = performance.getEntriesByType('navigation');
console.log('Load time:', perfData[0].loadEventEnd);
```

### Resource Timing

```javascript
// Get resource timing
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log(resource.name, resource.duration);
});
```

---

## Error Debugging

### Error Logging

The bootstrap loader logs errors to console:

```
[Estimator Bootstrap ERROR] Module not found: ModuleName
[Estimator Bootstrap WARN] Module ModuleName skipped - module not available
```

### Error Inspection

```javascript
// Check for errors in bootstrap report
const report = window.EstimatorBootstrap.getDiagnosticReport();
console.log('Errors:', report.errors);
console.log('Warnings:', report.warnings);
```

---

## Network Debugging

### Fetch Monitoring

```javascript
// Monitor fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('Fetching:', args[0]);
  return originalFetch.apply(this, args);
};
```

### Network Tab

Use Chrome DevTools Network tab to:
- Monitor HTTP requests
- Check response status
- Inspect response data
- Measure load times

---

## Asset Debugging

### Asset Path Resolution

```javascript
// Test asset path resolution
const cssPath = window.resolveAssetPath('css/main.css');
console.log(cssPath);

const imagePath = window.resolveAssetPath('assets/images/hero.jpg');
console.log(imagePath);
```

### Base URL Detection

```javascript
// Check base URL
const baseUrl = window.getBaseUrl();
console.log(baseUrl);
```

---

## Console Commands Reference

### Helper Functions

```javascript
// Format currency
window.EstimatorHelper.formatCurrency(1000000);
// Output: "₹10,00,000"

// Generate ID
window.EstimatorHelper.generateId();
// Output: "1234567890-abc123def"

// Deep clone
window.EstimatorHelper.deepClone(object);

// Debounce
const debounced = window.EstimatorHelper.debounce(fn, 300);
```

### Validation

```javascript
// Validate email
window.EstimatorHelper.isValidEmail('test@example.com');
// Output: true

// Validate phone
window.EstimatorHelper.isValidPhone('1234567890');
// Output: true

// Validate PIN
window.EstimatorHelper.isValidPIN('123456');
// Output: true
```

---

## Debugging Workflows

### Workflow 1: Estimator Not Loading

```javascript
// 1. Check if bootstrap loaded
console.log(typeof window.EstimatorBootstrap);

// 2. Get diagnostic report
const report = window.EstimatorBootstrap.getDiagnosticReport();
console.log(report);

// 3. Check for errors
console.log('Errors:', report.errors);

// 4. Check module status
console.log('Modules:', report.modules);
```

### Workflow 2: State Not Updating

```javascript
// 1. Check current state
const state = window.EstimatorState.getState();
console.log(state);

// 2. Try manual update
window.EstimatorState.set('budget', 1000000);

// 3. Check if updated
console.log(window.EstimatorState.get('budget'));

// 4. Check subscribers
console.log('Subscribers:', window.EstimatorState.subscribers);
```

### Workflow 3: Storage Not Working

```javascript
// 1. Check if storage initialized
console.log(typeof window.EstimatorStorage);

// 2. Try to save draft
window.EstimatorStorage.saveDraft({ test: true }).then(id => {
  console.log('Draft saved:', id);
});

// 3. Check localStorage
console.log(localStorage.getItem('estimator_draft'));

// 4. Check IndexedDB
const request = indexedDB.open('InfiniteInteriorEstimator', 1);
request.onsuccess = (event) => {
  console.log('IndexedDB OK');
};
request.onerror = (event) => {
  console.error('IndexedDB error:', event.target.error);
};
```

---

## Debugging Best Practices

### 1. Use Console Groups

```javascript
console.group('Estimator Debug');
console.log('State:', state);
console.log('Router:', router);
console.groupEnd();
```

### 2. Use Console Tables

```javascript
console.table(report.modules);
console.table(drafts);
```

### 3. Use Conditional Logging

```javascript
if (DEBUG_MODE) {
  console.log('Debug info:', data);
}
```

### 4. Clear Console

```javascript
console.clear();
```

### 5. Use Breakpoints

Set breakpoints in Chrome DevTools to pause execution and inspect variables.

---

## Notes

- Bootstrap diagnostics available
- Global object inspection
- State debugging
- Router debugging
- Storage debugging
- Performance monitoring
- Error logging
- Network monitoring

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
