# JavaScript Architecture Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\js\`  
**Total JS Files:** 25  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses vanilla JavaScript with IIFE (Immediately Invoked Function Expression) modules for encapsulation. The architecture is designed for static hosting on GitHub Pages with no build process required.

---

## JavaScript Architecture Principles

### 1. IIFE Pattern
All JavaScript files use IIFE pattern for encapsulation:

```javascript
(function() {
  'use strict';
  
  // Private code here
  
  // Export to global scope if needed
  window.ModuleName = ClassName;
  
})();
```

### 2. No ES6 Modules
- No `import`/`export` statements
- No `require()` calls
- Global namespace management via `window` object
- Compatible with static hosting

### 3. Singleton Pattern
Core modules use singleton pattern:
- `EstimatorStorage` - Storage engine
- `EstimatorState` - State manager
- `EstimatorHelper` - Utility functions

### 4. Constructor Pattern
Feature modules use constructor pattern:
- `EstimatorRouter` - Wizard routing
- `EstimatorUI` - UI controller
- `EstimatorEngine` - Main estimator engine

### 5. Bootstrap Loader
Sophisticated bootstrap system for estimator:
- Graceful failure handling
- Module dependency management
- Runtime validation
- Diagnostic logging

---

## JavaScript File Structure

### Core JavaScript (5 files)

#### js/core/app.js
**Purpose:** Main application entry point

**Key Features:**
- Base URL detection for GitHub Pages
- Asset path resolution
- Core module loading
- Page-specific module loading
- Performance optimizations (prefetching, preloading)

**Global Functions:**
```javascript
window.getBaseUrl()           // Returns base URL for GitHub Pages
window.resolveAssetPath(path) // Resolves asset paths correctly
```

**Initialization:**
```javascript
init() {
  loadCoreModules();
  loadPageModule();
  initPredictivePrefetching();
  initBackgroundDataHydration();
  initImagePreloading();
  initDragToScroll();
}
```

#### js/core/navbar.js
**Purpose:** Navbar functionality

**Features:**
- Mobile menu toggle
- Smooth scrolling
- Active state management
- Accessibility features

#### js/core/image-placeholder.js
**Purpose:** Image placeholder generation

**Features:**
- Generates placeholder images
- Lazy loading support
- Fallback for missing images

#### js/core/lazy-load.js
**Purpose:** Lazy loading utility

**Features:**
- Intersection Observer API
- Image lazy loading
- Performance optimization

#### js/core/schema.js
**Purpose:** Schema validation

**Features:**
- JSON schema validation
- Data integrity checks
- Type validation

### Page JavaScript (2 files)

#### js/pages/home.js
**Purpose:** Homepage functionality

**Features:**
- Hero animations
- Scroll effects
- Interactive elements

#### js/pages/projects.js
**Purpose:** Projects page functionality

**Features:**
- Project filtering
- Grid layout
- Project interactions

### Estimator JavaScript (13 files)

#### js/estimator-bootstrap.js
**Purpose:** Bootstrap loader for estimator

**Key Features:**
- Module loading orchestration
- Graceful failure handling
- Diagnostic logging
- Asset path resolution
- Runtime validation

**Module Loading Order:**
```javascript
modules: [
  { name: 'Storage', check: () => window.EstimatorStorage },
  { name: 'State', check: () => window.EstimatorState },
  { name: 'Validation', check: () => window.EstimatorValidation },
  { name: 'Router', check: () => window.EstimatorRouter },
  { name: 'MaterialEngine', check: () => window.EstimatorMaterialEngine },
  { name: 'PackageEngine', check: () => window.EstimatorPackageEngine },
  { name: 'BudgetEngine', check: () => window.EstimatorBudgetEngine },
  { name: 'RecommendationEngine', check: () => window.EstimatorRecommendationEngine },
  { name: 'ComparisonEngine', check: () => window.EstimatorComparisonEngine },
  { name: 'ModuleEngine', check: () => window.EstimatorModuleEngine },
  { name: 'BOQEngine', check: () => window.EstimatorBOQEngine },
  { name: 'PDFGenerator', check: () => window.EstimatorPDFGenerator },
  { name: 'EstimatorEngine', check: () => window.EstimatorEngine },
  { name: 'UI', check: () => window.EstimatorUI }
]
```

**Data Files Loading:**
```javascript
dataFiles: [
  { name: 'Materials', path: 'data/estimator/materials.json' },
  { name: 'PricingRules', path: 'data/estimator/pricing-rules.json' },
  { name: 'Recommendations', path: 'data/estimator/recommendations.json' },
  { name: 'UpgradeRules', path: 'data/estimator/upgrade-rules.json' }
]
```

#### js/estimator-engine.js
**Purpose:** Main estimator engine

**Features:**
- Orchestrates all estimator modules
- Manages calculation pipeline
- Coordinates state, routing, and UI

#### js/estimator-router.js
**Purpose:** Wizard routing system

**Features:**
- Dynamic step navigation
- Deep linking support
- Navigation guards
- Draft resumption

**Dynamic Flow:**
```javascript
get steps() {
  const category = this.state.get('projectCategory');
  
  // Custom Services (Short Flow)
  if (category === 'custom_services') {
    return [
      { id: 'category', name: 'category', title: 'Category' },
      { id: 'custom_services_selection', name: 'services', title: 'Services' },
      { id: 'budget', name: 'budget', title: 'Budget' },
      { id: 'contact', name: 'contact', title: 'Contact' }
    ];
  }
  
  // Standard Full Interior (Long Flow)
  return [
    { id: 'category', name: 'category', title: 'Category' },
    { id: 'type', name: 'type', title: 'Type' },
    { id: 'info', name: 'information', title: 'Information' },
    { id: 'requirements', name: 'requirements', title: 'Requirements' },
    { id: 'style', name: 'style', title: 'Style' },
    { id: 'package', name: 'package', title: 'Package' },
    { id: 'budget', name: 'budget', title: 'Budget' },
    { id: 'contact', name: 'contact', title: 'Contact' }
  ];
}
```

#### js/estimator-state.js
**Purpose:** State management

**Features:**
- Centralized state store
- Subscription pattern
- History (undo/redo)
- State persistence

**State Structure:**
```javascript
{
  currentStep: 1,
  totalSteps: 8,
  canProceed: false,
  canGoBack: false,
  projectCategory: null,
  projectType: null,
  projectInfo: {},
  selectedPackage: null,
  packageTier: null,
  budget: null,
  budgetRange: null,
  budgetType: 'known',
  rooms: [],
  roomCount: 0,
  selectedCustomServices: [],
  selectedModules: [],
  moduleCount: 0,
  clientDetails: { name, email, phone, city, notes },
  designStyle: null,
  materialTier: null,
  comparisonData: null,
  recommendations: [],
  validationStatus: { currentStep: false, overall: false },
  isDraft: false,
  draftId: null,
  lastSaved: null,
  calculations: { subtotal: 0, tax: 0, total: 0, breakdown: {} },
  ui: { isLoading: false, isSaving: false, error: null }
}
```

#### js/estimator-ui.js
**Purpose:** UI controller

**Features:**
- Step rendering
- Form handling
- Progress updates
- User interactions

#### js/estimator.js
**Purpose:** Estimator entry point

**Features:**
- Initializes bootstrap loader
- Handles estimator page initialization

#### js/boq-engine.js
**Purpose:** Bill of Quantities engine

**Features:**
- BOQ generation
- Material quantification
- Labor calculation

#### js/budget-engine.js
**Purpose:** Budget calculation engine

**Features:**
- Cost estimation
- Budget breakdown
- Price calculation

#### js/comparison-engine.js
**Purpose:** Package comparison engine

**Features:**
- Package comparison
- Cost analysis
- Recommendation generation

#### js/material-engine.js
**Purpose:** Material selection engine

**Features:**
- Material filtering
- Tier-based selection
- Price calculation

#### js/module-engine.js
**Purpose:** Module calculation engine

**Features:**
- Module selection
- Area calculation
- Cost estimation

#### js/package-engine.js
**Purpose:** Package calculation engine

**Features:**
- Package selection
- Tier calculation
- Price estimation

#### js/recommendation-engine.js
**Purpose:** Recommendation engine

**Features:**
- Smart recommendations
- Style matching
- Budget optimization

### Utility JavaScript (5 files)

#### js/helpers.js
**Purpose:** Utility helper functions

**Global Object:**
```javascript
window.EstimatorHelper = {
  formatCurrency(amount, currency = 'INR'),
  formatNumber(number),
  generateId(),
  debounce(func, wait),
  throttle(func, limit),
  deepClone(obj),
  deepMerge(target, ...sources),
  isEmpty(obj),
  getNested(obj, path, defaultValue),
  setNested(obj, path, value),
  removeFromArray(array, item),
  removeFromArrayBy(array, predicate),
  calculatePercentage(value, total),
  roundTo(number, decimals),
  clamp(number, min, max),
  isValidEmail(email),
  isValidPhone(phone),
  isValidPIN(pin),
  parseQueryString(queryString),
  buildQueryString(params),
  formatDate(date, format),
  parseDate(dateString, format),
  calculateAge(birthdate),
  getRandomItem(array),
  shuffleArray(array),
  groupBy(array, key),
  sortBy(array, key, order),
  unique(array),
  flatten(array),
  chunk(array, size),
  truncate(string, length),
  capitalize(string),
  camelCase(string),
  kebabCase(string),
  snakeCase(string),
  slugify(string),
  stripHtml(html),
  escapeHtml(text),
  sanitizeInput(input),
  validateURL(url),
  validateIP(ip),
  validateMAC(mac),
  validateUUID(uuid),
  calculateDistance(lat1, lon1, lat2, lon2),
  calculateArea(width, height),
  calculateVolume(width, height, depth),
  calculatePerimeter(width, height),
  calculateCircleArea(radius),
  calculateCircleCircumference(radius),
  calculateRectangleArea(width, height),
  calculateTriangleArea(base, height),
  generateUUID(),
  generateHash(string),
  encodeBase64(string),
  decodeBase64(string),
  compress(string),
  decompress(string),
  wait(ms),
  retry(fn, retries, delay),
  parallel(tasks),
  series(tasks),
  race(tasks),
  memoize(fn),
  curry(fn),
  compose(...fns),
  pipe(...fns),
  once(fn),
  after(n, fn),
  before(n, fn),
  negate(predicate),
  matches(source),
  matchesProperty(path, srcValue),
  property(path),
  identity(value),
  constant(value),
  noop(),
  times(n, fn),
  range(start, end, step),
  random(min, max),
  now(),
  timestamp()
}
```

#### js/pdf-generator.js
**Purpose:** PDF generation

**Features:**
- Quote PDF generation
- BOQ PDF generation
- Report generation

#### js/storage-manager.js
**Purpose:** Storage management

**Features:**
- Storage abstraction layer
- Cache management
- Data synchronization

#### js/storage.js
**Purpose:** Storage engine (IndexedDB + localStorage)

**Features:**
- IndexedDB integration
- localStorage fallback
- Draft management
- Cache management

**Storage Keys:**
```javascript
keys: {
  draft: 'estimator_draft',
  drafts: 'estimator_drafts',
  settings: 'estimator_settings',
  cache: 'estimator_cache'
}
```

**IndexedDB Stores:**
```javascript
stores: {
  drafts: { keyPath: 'id', indexes: ['created', 'updated'] },
  cache: { keyPath: 'key', indexes: ['expiry'] }
}
```

#### js/validation.js
**Purpose:** Form validation

**Features:**
- Form validation
- Field validation
- Error handling
- Validation rules

---

## JavaScript Patterns

### IIFE Pattern
```javascript
(function() {
  'use strict';
  
  // Private variables and functions
  const privateVar = 'private';
  
  function privateFunction() {
    // Private logic
  }
  
  // Public API
  window.ModuleName = {
    publicMethod: function() {
      // Public logic
    }
  };
  
})();
```

### Singleton Pattern
```javascript
(function() {
  'use strict';
  
  let instance = null;
  
  class Singleton {
    constructor() {
      if (instance) {
        return instance;
      }
      instance = this;
    }
    
    static getInstance() {
      if (!instance) {
        instance = new Singleton();
      }
      return instance;
    }
  }
  
  window.Singleton = Singleton.getInstance();
  
})();
```

### Constructor Pattern
```javascript
(function() {
  'use strict';
  
  class Constructor {
    constructor(options = {}) {
      this.options = options;
      this.init();
    }
    
    init() {
      // Initialization logic
    }
    
    method() {
      // Instance method
    }
  }
  
  window.Constructor = Constructor;
  
})();
```

### Module Pattern
```javascript
(function() {
  'use strict';
  
  const Module = (function() {
    // Private
    const privateVar = 'private';
    
    function privateMethod() {
      // Private logic
    }
    
    // Public
    return {
      publicMethod: function() {
        // Public logic
      }
    };
  })();
  
  window.Module = Module;
  
})();
```

---

## Global Objects

### Core Globals
```javascript
window.getBaseUrl()           // Base URL for GitHub Pages
window.resolveAssetPath(path) // Asset path resolution
```

### Estimator Globals
```javascript
window.EstimatorHelper        // Utility functions
window.EstimatorStorage       // Storage engine (singleton)
window.EstimatorState         // State manager (singleton)
window.EstimatorRouter        // Router class (constructor)
window.EstimatorUI            // UI class (constructor)
window.EstimatorEngine        // Engine class (constructor)
window.EstimatorValidation    // Validation class (constructor)
window.EstimatorMaterialEngine    // Material engine (constructor)
window.EstimatorPackageEngine     // Package engine (constructor)
window.EstimatorBudgetEngine      // Budget engine (constructor)
window.EstimatorRecommendationEngine  // Recommendation engine (constructor)
window.EstimatorComparisonEngine    // Comparison engine (constructor)
window.EstimatorModuleEngine        // Module engine (constructor)
window.EstimatorBOQEngine           // BOQ engine (constructor)
window.EstimatorPDFGenerator       // PDF generator (constructor)
```

### Page Globals
```javascript
window.Navbar                 // Navbar module
window.ImagePlaceholder       // Image placeholder module
window.Schema                 // Schema validation module
window.Home                   // Home page module
window.Projects               // Projects page module
```

---

## JavaScript Best Practices

### 1. Use IIFE Pattern
```javascript
(function() {
  'use strict';
  // Code here
})();
```

### 2. Use Strict Mode
```javascript
'useuse strict';
```

### 3. Global Namespace Management
```javascript
window.ModuleName = Module;
```

### 4. Error Handling
```javascript
try {
  // Code that might fail
} catch (error) {
  console.error('Error:', error);
}
```

### 5. Async/Await
```javascript
async function loadData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## JavaScript Performance

### 1. Lazy Loading
- Use Intersection Observer for images
- Load modules on demand
- Defer non-critical JavaScript

### 2. Event Delegation
```javascript
document.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    // Handle button click
  }
});
```

### 3. Debouncing and Throttling
```javascript
// Debounce
const debounced = debounce(function() {
  // Code here
}, 300);

// Throttle
const throttled = throttle(function() {
  // Code here
}, 300);
```

### 4. Request Animation Frame
```javascript
function animate() {
  requestAnimationFrame(animate);
  // Animation code
}
```

---

## JavaScript Debugging

### Console Logging
```javascript
console.log('Info');
console.warn('Warning');
console.error('Error');
console.table(data);
console.group('Group');
console.groupEnd();
```

### Debugging Tools
- Browser DevTools
- Breakpoints
- Performance profiling
- Memory profiling

---

## Notes

- All JavaScript uses IIFE pattern
- No ES6 modules (static hosting compatibility)
- Singleton pattern for core modules
- Constructor pattern for feature modules
- Bootstrap loader for estimator
- Global namespace management
- No build process required

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
