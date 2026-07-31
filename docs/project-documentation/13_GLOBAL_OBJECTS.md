# Global Objects Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses the global `window` object to expose modules and utilities. Since the project uses IIFE modules without ES6 imports/exports, global objects are the primary way to share code between modules.

---

## Global Object Strategy

### Namespace Management

**Pattern:** Direct attachment to `window` object

**Example:**
```javascript
(function() {
  'use strict';
  
  class Module {
    // Module code
  }
  
  window.Module = Module;
  
})();
```

**Rationale:**
- Compatible with static hosting
- No build process required
- Simple dependency management
- Easy debugging

---

## Core Global Objects

### Utility Functions

#### window.getBaseUrl()

**Location:** `js/core/app.js`

**Purpose:** Get base URL for GitHub Pages compatibility

**Signature:**
```javascript
window.getBaseUrl() → string
```

**Returns:**
- Local: `/`
- GitHub Pages: `/repo-name/`
- Custom Domain: `/`

**Example:**
```javascript
const baseUrl = window.getBaseUrl();
console.log(baseUrl); // "/repo-name/"
```

#### window.resolveAssetPath()

**Location:** `js/core/app.js`

**Purpose:** Resolve asset paths correctly

**Signature:**
```javascript
window.resolveAssetPath(path: string) → string
```

**Parameters:**
- `path` - Asset path (relative or absolute)

**Returns:**
- Resolved asset path with base URL

**Example:**
```javascript
const cssPath = window.resolveAssetPath('css/main.css');
console.log(cssPath); // "/repo-name/css/main.css"
```

---

## Estimator Global Objects

### Singleton Objects

#### window.EstimatorHelper

**Location:** `js/helpers.js`

**Purpose:** Utility helper functions

**Type:** Object (singleton)

**Methods:**
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

**Usage:**
```javascript
const formatted = window.EstimatorHelper.formatCurrency(100000);
console.log(formatted); // "₹1,00,000"

const id = window.EstimatorHelper.generateId();
console.log(id); // "1234567890-abc123def"
```

#### window.EstimatorStorage

**Location:** `js/storage.js`

**Purpose:** Storage engine (IndexedDB + localStorage)

**Type:** Object (singleton)

**Methods:**
```javascript
window.EstimatorStorage = {
  init() → Promise<boolean>,
  saveDraft(data) → Promise<string>,
  loadDraft(draftId) → Promise<Object|null>,
  deleteDraft(draftId) → Promise<boolean>,
  listDrafts() → Promise<Array>,
  saveToCache(key, data) → Promise<void>,
  loadFromCache(key) → Promise<Object|null>,
  clearCache() → Promise<void>
}
```

**Usage:**
```javascript
// Initialize
await window.EstimatorStorage.init();

// Save draft
const draftId = await window.EstimatorStorage.saveDraft({
  projectCategory: 'full_interior',
  budget: 1000000
});

// Load draft
const draft = await window.EstimatorStorage.loadDraft(draftId);

// List drafts
const drafts = await window.EstimatorStorage.listDrafts();
```

#### window.EstimatorState

**Location:** `js/estimator-state.js`

**Purpose:** State manager

**Type:** Object (singleton)

**Methods:**
```javascript
window.EstimatorState = {
  getState() → Object,
  get(path) → any,
  set(path, value, notify = true) → void,
  setMany(updates, notify = true) → void,
  reset(notify = true) → void,
  subscribe(callback) → Function,
  undo() → boolean,
  redo() → boolean,
  export() → string,
  import(data) → void
}
```

**Usage:**
```javascript
// Get state
const state = window.EstimatorState.getState();

// Get specific property
const budget = window.EstimatorState.get('budget');

// Set property
window.EstimatorState.set('budget', 1000000);

// Set multiple properties
window.EstimatorState.setMany({
  'budget': 1000000,
  'projectCategory': 'full_interior'
});

// Subscribe to changes
const unsubscribe = window.EstimatorState.subscribe((state) => {
  console.log('State changed:', state);
});

// Unsubscribe
unsubscribe();

// Undo
window.EstimatorState.undo();

// Reset
window.EstimatorState.reset();
```

---

### Constructor Classes

#### window.EstimatorRouter

**Location:** `js/estimator-router.js`

**Purpose:** Wizard routing

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorRouter(stateManager)
```

**Parameters:**
- `stateManager` - State manager instance

**Methods:**
```javascript
class EstimatorRouter {
  constructor(stateManager)
  init() → void
  next() → boolean
  previous() → boolean
  goTo(stepId) → boolean
  canNavigateTo(stepId) → boolean
  addGuard(stepId, guard) → void
  removeGuard(stepId) → void
  getStep(stepId) → Object|null
  getCurrentStep() → Object|null
  getAllSteps() → Array
  reset() → void
}
```

**Usage:**
```javascript
// Instantiate
const router = new EstimatorRouter(window.EstimatorState);

// Initialize
router.init();

// Navigate
router.next();
router.previous();
router.goTo(3);

// Add guard
router.addGuard(3, (state) => {
  return state.budget > 0;
});

// Get step info
const step = router.getCurrentStep();
console.log(step.title); // "Budget"
```

#### window.EstimatorUI

**Location:** `js/estimator-ui.js`

**Purpose:** UI controller

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorUI(stateManager, router)
```

**Parameters:**
- `stateManager` - State manager instance
- `router` - Router instance

**Methods:**
```javascript
class EstimatorUI {
  constructor(stateManager, router)
  init() → void
  render() → void
  renderStep(stepId) → void
  updateProgress() → void
  showError(message) → void
  showLoading() → void
  hideLoading() → void
  handleInput(event) → void
  handleNavigation(direction) → void
}
```

**Usage:**
```javascript
// Instantiate
const ui = new EstimatorUI(window.EstimatorState, router);

// Initialize
ui.init();

// Render
ui.render();

// Show error
ui.showError('Please fill in all required fields');
```

#### window.EstimatorValidation

**Location:** `js/validation.js`

**Purpose:** Form validation

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorValidation()
```

**Methods:**
```javascript
class EstimatorValidation {
  constructor()
  validateField(field, value, rules) → Object
  validateStep(stepId, data) → Object
  validateAll(data) → Object
  addRule(field, rule) → void
  removeRule(field, rule) → void
}
```

**Usage:**
```javascript
// Instantiate
const validation = new EstimatorValidation();

// Validate field
const result = validation.validateField('email', 'test@example.com', {
  required: true,
  email: true
});

console.log(result.valid); // true
```

#### window.EstimatorMaterialEngine

**Location:** `js/material-engine.js`

**Purpose:** Material selection engine

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorMaterialEngine()
```

**Methods:**
```javascript
class EstimatorMaterialEngine {
  constructor()
  loadMaterials() → Promise<Object>
  filterMaterials(category, tier) → Array
  calculateMaterialCost(materials, area) → number
  getRecommendations(style, budget) → Array
}
```

**Usage:**
```javascript
// Instantiate
const materialEngine = new EstimatorMaterialEngine();

// Load materials
await materialEngine.loadMaterials();

// Filter materials
const materials = materialEngine.filterMaterials('flooring', 'premium');

// Calculate cost
const cost = materialEngine.calculateMaterialCost(materials, 1000);
```

#### window.EstimatorPackageEngine

**Location:** `js/package-engine.js`

**Purpose:** Package calculation engine

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorPackageEngine()
```

**Methods:**
```javascript
class EstimatorPackageEngine {
  constructor()
  loadPackages() → Promise<Object>
  calculatePackageCost(package, area) → number
  comparePackages(packages) → Object
  getPackageRecommendation(budget, style) → Object
}
```

**Usage:**
```javascript
// Instantiate
const packageEngine = new EstimatorPackageEngine();

// Load packages
await packageEngine.loadPackages();

// Calculate cost
const cost = packageEngine.calculatePackageCost(package, 1000);
```

#### window.EstimatorBudgetEngine

**Location:** `js/budget-engine.js`

**Purpose:** Budget calculation engine

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorBudgetEngine()
```

**Methods:**
```javascript
class EstimatorBudgetEngine {
  constructor()
  calculateTotalCost(data) → Object
  generateBreakdown(data) → Object
  compareWithBudget(cost, budget) → Object
  optimizeBudget(data, targetBudget) → Object
}
```

**Usage:**
```javascript
// Instantiate
const budgetEngine = new EstimatorBudgetEngine();

// Calculate cost
const cost = budgetEngine.calculateTotalCost(data);

console.log(cost.total); // 1500000
```

#### window.EstimatorRecommendationEngine

**Location:** `js/recommendation-engine.js`

**Purpose:** Recommendation engine

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorRecommendationEngine()
```

**Methods:**
```javascript
class EstimatorRecommendationEngine {
  constructor()
  loadRecommendations() → Promise<Object>
  getStyleRecommendations(style) → Array
  getBudgetRecommendations(budget) → Array
  getMaterialRecommendations(tier, style) → Array
}
```

**Usage:**
```javascript
// Instantiate
const recommendationEngine = new EstimatorRecommendationEngine();

// Load recommendations
await recommendationEngine.loadRecommendations();

// Get recommendations
const recommendations = recommendationEngine.getStyleRecommendations('modern');
```

#### window.EstimatorComparisonEngine

**Location:** `js/comparison-engine.js`

**Purpose:** Package comparison engine

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorComparisonEngine()
```

**Methods:**
```javascript
class EstimatorComparisonEngine {
  constructor()
  comparePackages(packages) → Object
  generateComparisonReport(packages) → Object
  getBestValue(packages) → Object
}
```

**Usage:**
```javascript
// Instantiate
const comparisonEngine = new EstimatorComparisonEngine();

// Compare packages
const comparison = comparisonEngine.comparePackages([package1, package2, package3]);
```

#### window.EstimatorModuleEngine

**Location:** `js/module-engine.js`

**Purpose:** Module calculation engine

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorModuleEngine()
```

**Methods:**
```javascript
class EstimatorModuleEngine {
  constructor()
  loadModules() → Promise<Object>
  calculateModuleCost(module, area) → number
  getModuleRecommendations(rooms) → Array
}
```

**Usage:**
```javascript
// Instantiate
const moduleEngine = new EstimatorModuleEngine();

// Load modules
await moduleEngine.loadModules();

// Calculate cost
const cost = moduleEngine.calculateModuleCost(module, 100);
```

#### window.EstimatorBOQEngine

**Location:** `js/boq-engine.js`

**Purpose:** Bill of Quantities engine

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorBOQEngine()
```

**Methods:**
```javascript
class EstimatorBOQEngine {
  constructor()
  generateBOQ(data) → Object
  calculateQuantities(data) → Object
  formatBOQ(boq) → string
}
```

**Usage:**
```javascript
// Instantiate
const boqEngine = new EstimatorBOQEngine();

// Generate BOQ
const boq = boqEngine.generateBOQ(data);
```

#### window.EstimatorPDFGenerator

**Location:** `js/pdf-generator.js`

**Purpose:** PDF generation

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorPDFGenerator()
```

**Methods:**
```javascript
class EstimatorPDFGenerator {
  constructor()
  generateQuote(state) → Promise<Blob>
  generateBOQ(state) → Promise<Blob>
  generateReport(state) → Promise<Blob>
  downloadPDF(blob, filename) → void
}
```

**Usage:**
```javascript
// Instantiate
const pdfGenerator = new EstimatorPDFGenerator();

// Generate quote
const pdf = await pdfGenerator.generateQuote(state);

// Download
pdfGenerator.downloadPDF(pdf, 'quote.pdf');
```

#### window.EstimatorEngine

**Location:** `js/estimator-engine.js`

**Purpose:** Main estimator engine

**Type:** Class (constructor)

**Constructor:**
```javascript
new EstimatorEngine(stateManager)
```

**Parameters:**
- `stateManager` - State manager instance

**Methods:**
```javascript
class EstimatorEngine {
  constructor(stateManager)
  init() → Promise<boolean>
  calculate() → Object
  generateResults() → Object
  reset() → void
}
```

**Usage:**
```javascript
// Instantiate
const engine = new EstimatorEngine(window.EstimatorState);

// Initialize
await engine.init();

// Calculate
const results = engine.calculate();
```

---

## Page Global Objects

#### window.Navbar

**Location:** `js/core/navbar.js`

**Purpose:** Navbar functionality

**Type:** Object

**Methods:**
```javascript
window.Navbar = {
  init() → void,
  toggleMenu() → void,
  closeMenu() → void
}
```

**Usage:**
```javascript
window.Navbar.init();
```

#### window.ImagePlaceholder

**Location:** `js/core/image-placeholder.js`

**Purpose:** Image placeholder generation

**Type:** Object

**Methods:**
```javascript
window.ImagePlaceholder = {
  init() → void,
  generate(element) → void
}
```

**Usage:**
```javascript
window.ImagePlaceholder.init();
```

#### window.Schema

**Location:** `js/core/schema.js`

**Purpose:** Schema validation

**Type:** Object

**Methods:**
```javascript
window.Schema = {
  init() → void,
  validate(data, schema) → Object
}
```

**Usage:**
```javascript
window.Schema.init();
```

#### window.Home

**Location:** `js/pages/home.js`

**Purpose:** Homepage functionality

**Type:** Object

**Methods:**
```javascript
window.Home = {
  init() → void
}
```

**Usage:**
```javascript
window.Home.init();
```

#### window.Projects

**Location:** `js/pages/projects.js`

**Purpose:** Projects page functionality

**Type:** Object

**Methods:**
```javascript
window.Projects = {
  init() → void
}
```

**Usage:**
```javascript
window.Projects.init();
```

---

## Global Object Safety

### Collision Prevention

**Strategies:**
1. Use descriptive names
2. Use consistent prefixes
3. Namespace where possible
4. Document all globals

**Naming Convention:**
- Estimator modules: `Estimator*`
- Page modules: Descriptive names
- Utilities: `EstimatorHelper`

### Existence Checking

**Pattern:**
```javascript
if (typeof window.ModuleName !== 'undefined') {
  window.ModuleName.init();
}
```

**Usage in Bootstrap:**
```javascript
if (typeof Navbar !== 'undefined') {
  Navbar.init();
}
```

---

## Global Object Debugging

### Console Inspection

**Check Available Globals:**
```javascript
console.log(Object.keys(window).filter(key => key.startsWith('Estimator')));
```

**Inspect Module:**
```javascript
console.log(window.EstimatorState);
console.log(window.EstimatorHelper);
```

### Debugging Tools

**Bootstrap Diagnostics:**
```javascript
// Get bootstrap report
const report = window.EstimatorBootstrap.getDiagnosticReport();
console.log(report);
```

---

## Global Object Best Practices

### 1. Minimal Globals
- Only expose necessary modules
- Keep private code private
- Use IIFE pattern

### 2. Clear Naming
- Descriptive names
- Consistent prefixes
- No abbreviations

### 3. Document Globals
- Comment all globals
- Document API
- Provide examples

### 4. Check Existence
- Always check before use
- Handle missing modules
- Graceful degradation

### 5. Avoid Pollution
- Don't add unnecessary globals
- Clean up when possible
- Use namespaces

---

## Notes

- Global objects used for module sharing
- IIFE pattern for encapsulation
- Singleton pattern for core modules
- Constructor pattern for feature modules
- No ES6 modules (static hosting)
- Descriptive naming
- Existence checking
- Diagnostic logging

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
