# 15_GLOBAL_OBJECTS.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete global objects analysis

---

## Global Objects Overview

The project exports multiple objects to the global `window` object for inter-module communication and accessibility.

**Total Global Objects:** 22  
**Core Global Objects:** 7  
**Estimator Global Objects:** 15  
**Page-Specific Global Objects:** 2  

---

## Core Global Objects

### 1. window.Helper

**Source:** js/helpers.js

**Type:** Singleton Object (Object Literal)

**Purpose:** Shared utility functions

**Methods:**
- formatCurrency(amount, currency)
- formatNumber(number)
- generateId()
- debounce(func, wait)
- throttle(func, limit)
- deepClone(obj)
- deepMerge(target, ...sources)
- isEmpty(value)
- getNested(obj, path)
- setNested(obj, path, value)
- removeFromArray(array, item)
- calculatePercentage(value, total)
- roundTo(number, decimals)
- clamp(value, min, max)
- isValidEmail(email)
- isValidPhone(phone)
- isValidPIN(pin)
- copyToClipboard(text)
- downloadFile(content, filename)
- isMobile()
- isTablet()
- isDesktop()
- LocalStorage wrapper methods

**Used By:** All JavaScript modules

**Status:** Active

---

### 2. window.resolveAssetPath

**Source:** js/helpers.js, js/core/app.js

**Type:** Function

**Purpose:** Asset path resolution for GitHub Pages compatibility

**Signature:** `resolveAssetPath(assetPath)`

**Implementation:**
```javascript
window.resolveAssetPath = function(assetPath) {
  if (!assetPath) return '';
  const baseUrl = window.getBaseUrl();
  let cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  return baseUrl + cleanPath;
};
```

**Used By:** All JavaScript modules

**Status:** Active (defined in both helpers.js and app.js)

---

### 3. window.getBaseUrl

**Source:** js/core/app.js

**Type:** Function

**Purpose:** Base URL detection for GitHub Pages

**Signature:** `getBaseUrl()`

**Implementation:**
```javascript
window.getBaseUrl = function() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  if (!isGitHubPages) return '/';
  
  const pathSegments = window.location.pathname.split('/').filter(segment => segment.length > 0);
  const repoName = pathSegments[0] || '';
  return '/' + repoName + '/';
};
```

**Used By:** All JavaScript modules

**Status:** Active

---

### 4. window.Navbar

**Source:** js/core/navbar.js

**Type:** Object with init method

**Purpose:** Navbar functionality

**Methods:**
- init() - Initialize navbar

**Used By:** All pages

**Status:** Active

---

### 5. window.Schema

**Source:** js/core/schema.js

**Type:** Object with init method

**Purpose:** Schema.org structured data generation

**Methods:**
- init() - Initialize schema generation

**Used By:** All pages

**Status:** Active

---

### 6. window.ImagePlaceholder

**Source:** js/core/image-placeholder.js

**Type:** Object with init method

**Purpose:** Image placeholder system

**Methods:**
- init() - Initialize image placeholders

**Used By:** All pages

**Status:** Active

---

### 7. window.LazyLoad

**Source:** js/core/lazy-load.js

**Type:** Object with init method

**Purpose:** Lazy loading system

**Methods:**
- init() - Initialize lazy loading

**Used By:** All pages

**Status:** Active

---

## Page-Specific Global Objects

### 8. window.Home

**Source:** js/pages/home.js

**Type:** Object with init method

**Purpose:** Homepage functionality

**Methods:**
- init() - Initialize homepage

**Used By:** index.html

**Status:** Active

---

### 9. window.Projects

**Source:** js/pages/projects.js

**Type:** Object with init method

**Purpose:** Projects page functionality

**Methods:**
- init() - Initialize projects page

**Used By:** pages/projects/index.html

**Status:** Active

---

## Estimator Global Objects

### 10. window.EstimatorStorage

**Source:** js/storage-manager.js

**Type:** Singleton Instance (StorageManager class)

**Purpose:** Data persistence using IndexedDB and localStorage

**Methods:**
- init() - Initialize storage
- saveDraft(draft) - Save draft
- loadDraft(draftId) - Load draft
- deleteDraft(draftId) - Delete draft
- saveCalculation(calculation) - Save calculation
- loadCalculation(id) - Load calculation
- cacheData(key, data) - Cache data
- getCachedData(key) - Get cached data
- clearCache() - Clear cache
- clearAll() - Clear all data
- getCurrentDraftId() - Get current draft ID

**Used By:** Estimator Engine, Estimator App, Bootstrap

**Status:** Active

---

### 11. window.EstimatorState

**Source:** js/estimator-state.js

**Type:** Singleton Instance (StateManager class)

**Purpose:** Global state management with subscription pattern

**Methods:**
- get(key) - Get state value
- set(key, value) - Set state value
- reset() - Reset state
- subscribe(callback) - Subscribe to state changes
- unsubscribe(callback) - Unsubscribe from state changes
- getState() - Get entire state
- setState(newState) - Set entire state
- undo() - Undo last change
- redo() - Redo last change

**Used By:** Router, UI, Estimator Engine, Bootstrap

**Status:** Active

---

### 12. window.EstimatorValidation

**Source:** js/validation.js

**Type:** Class Constructor

**Purpose:** Validation engine for user input and state

**Methods:**
- addRule(field, rules) - Add validation rule
- removeRule(field) - Remove validation rule
- addValidator(name, validator) - Add custom validator
- removeValidator(name) - Remove custom validator
- validate(field, value) - Validate single field
- validateSchema(schema, data) - Validate entire schema
- getErrors() - Get validation errors
- clearErrors() - Clear validation errors
- isValid() - Check if all validations pass

**Used By:** Estimator Engine, UI, Bootstrap

**Status:** Active

---

### 13. window.EstimatorRouter

**Source:** js/estimator-router.js

**Type:** Class Constructor

**Purpose:** Wizard step navigation

**Methods:**
- init() - Initialize router
- checkDeepLink() - Check for deep link
- checkDraftResumption() - Check for draft resumption
- goToStep(stepId) - Navigate to specific step
- nextStep() - Go to next step
- previousStep() - Go to previous step
- getCurrentStep() - Get current step
- updateNavigationState() - Update navigation state
- setGuard(stepId, guard) - Set navigation guard
- removeGuard(stepId) - Remove navigation guard

**Used By:** UI, Bootstrap

**Status:** Active

---

### 14. window.EstimatorMaterialEngine

**Source:** js/material-engine.js

**Type:** Class Constructor

**Purpose:** Material selection and pricing calculations

**Methods:**
- init(materialsData) - Initialize with material data
- getTier(tierId) - Get tier information
- calculateMaterialCost(material, quantity, tier) - Calculate cost
- getMaterialsByCategory(category) - Get materials by category
- searchMaterials(query) - Search materials
- getRecommendations(context) - Get recommendations
- compareMaterials(materialIds) - Compare materials
- calculateTierUpgradeCost(fromTier, toTier, area) - Calculate upgrade cost

**Used By:** Estimator Engine, Package Engine, Module Engine, BOQ Engine

**Status:** Active

---

### 15. window.EstimatorPackageEngine

**Source:** js/package-engine.js

**Type:** Class Constructor

**Purpose:** Package generation and management

**Methods:**
- init(materialDatabase) - Initialize with material database
- generatePackage(projectData, tier) - Generate package
- calculatePackageCost(projectData, tier) - Calculate package cost
- getPackageSpecifications(projectData, tier) - Get specifications
- getDurabilityRating(tier) - Get durability rating
- getMaintenanceLevel(tier) - Get maintenance level
- getLifeExpectancy(tier) - Get life expectancy
- getWarrantyPeriod(tier) - Get warranty period
- getTimeline(tier) - Get timeline
- getInclusions(tier) - Get inclusions
- getExclusions(tier) - Get exclusions
- comparePackages(tierIds) - Compare packages
- recommendTier(budget) - Recommend tier based on budget

**Used By:** Estimator Engine

**Status:** Active

---

### 16. window.EstimatorBudgetEngine

**Source:** js/budget-engine.js

**Type:** Class Constructor

**Purpose:** Budget calculation and management

**Methods:**
- init(pricingRules) - Initialize with pricing rules
- getBudgetRanges() - Get budget ranges
- calculateTotalCost(projectData) - Calculate total cost
- calculateContingency(total) - Calculate contingency
- calculateTaxes(subtotal) - Calculate taxes
- validateBudget(budget, estimatedCost) - Validate budget
- reverseBudgeting(budget) - Reverse budgeting
- getBudgetAdjustments(current, target) - Get budget adjustments
- getOptimizationSuggestions(projectData) - Get optimization suggestions

**Used By:** Estimator Engine

**Status:** Active

---

### 17. window.EstimatorRecommendationEngine

**Source:** js/recommendation-engine.js

**Type:** Class Constructor

**Purpose:** Recommendation system for intelligent suggestions

**Methods:**
- init(recommendationsData, upgradeRulesData) - Initialize with data
- generateRecommendations(context) - Generate recommendations
- getMaterialRecommendations(context) - Get material recommendations
- getTierRecommendations(budget) - Get tier recommendations
- getModuleRecommendations(projectData) - Get module recommendations
- getStyleRecommendations(preferences) - Get style recommendations
- getUpgradeRecommendations(currentTier) - Get upgrade recommendations
- calculateRecommendationScore(recommendation, context) - Calculate score
- filterRecommendations(recommendations, criteria) - Filter recommendations
- applyRecommendation(recommendation) - Apply recommendation
- dismissRecommendation(recommendationId) - Dismiss recommendation

**Used By:** Estimator Engine

**Status:** Active

---

### 18. window.EstimatorComparisonEngine

**Source:** js/comparison-engine.js

**Type:** Class Constructor

**Purpose:** Comparison system for different estimator options

**Methods:**
- init() - Initialize comparison engine
- comparePackages(packageIds) - Compare packages
- compareTiers(tierIds) - Compare tiers
- compareMaterials(materialIds) - Compare materials
- compareModules(moduleIds) - Compare modules
- getComparisonMetrics(type, items) - Get comparison metrics
- generateComparisonReport(type, items) - Generate comparison report
- getUpgradeRecommendations(current, target) - Get upgrade recommendations

**Used By:** Estimator Engine

**Status:** Active

---

### 19. window.EstimatorModuleEngine

**Source:** js/module-engine.js

**Type:** Class Constructor

**Purpose:** Independent module calculation engine

**Methods:**
- init() - Initialize module engine
- calculateModuleCost(moduleId, specifications, tier) - Calculate module cost
- getModuleComponents(moduleId, tier) - Get module components
- getModuleFeatures(moduleId, tier) - Get module features
- getModuleBaseRate(moduleId) - Get base rate
- calculateComponentCost(component, specifications, tier) - Calculate component cost
- getAvailableModules() - Get available modules
- getModuleInfo(moduleId) - Get module information

**Used By:** Estimator Engine, BOQ Engine

**Status:** Active

---

### 20. window.EstimatorBOQEngine

**Source:** js/boq-engine.js

**Type:** Class Constructor

**Purpose:** Bill of Quantities generation engine

**Methods:**
- init() - Initialize BOQ engine
- generateBOQ(projectData, tier) - Generate complete BOQ
- generateRoomBOQ(roomType, specifications, tier) - Generate room BOQ
- getBOQStructure() - Get BOQ structure
- calculateItemCost(material, qty, rate) - Calculate item cost
- exportBOQToCSV(boq) - Export BOQ to CSV
- getRoomBaseRate(roomType) - Get room base rate
- getAvailableRooms() - Get available rooms

**Used By:** Estimator Engine

**Status:** Active

---

### 21. window.EstimatorPDFGenerator

**Source:** js/pdf-generator.js

**Type:** Class Constructor

**Purpose:** PDF generation using browser print functionality

**Methods:**
- init() - Initialize PDF generator
- generateQuotation(projectData) - Generate quotation PDF
- generateBOQ(projectData) - Generate BOQ PDF
- generateReport(projectData) - Generate report PDF
- printPDF(content) - Print content as PDF
- configurePDF(config) - Configure PDF settings
- setBranding(branding) - Set company branding

**Used By:** Estimator Engine

**Status:** Active (with fallback)

---

### 22. window.EstimatorBootstrap

**Source:** js/estimator-bootstrap.js

**Type:** Singleton Object (Object Literal)

**Purpose:** Bootstrap loader for orchestrated initialization

**Methods:**
- bootstrap() - Main bootstrap function
- validateModule(name, module) - Validate module
- loadModule(moduleConfig, context) - Load module
- loadDataFile(dataConfig) - Load data file
- resolveAssetPath(path) - Asset path resolution
- getDiagnostic() - Get diagnostic report
- getReport() - Get bootstrap report

**Used By:** Estimator App, Estimator page

**Status:** Active

---

## Global Object Issues

### Issue 1: Global Namespace Pollution

**Description:** All modules exported to window object without namespace.

**Impact:**
- Global namespace pollution
- Potential naming conflicts
- Difficult to manage
- No organization

**Severity:** Medium

**Current:**
```javascript
window.Helper
window.EstimatorStorage
window.EstimatorState
// ... 20 more global objects
```

**Recommended:**
```javascript
window.InfiniteInterior = {
  Helper: Helper,
  Core: {
    Navbar: Navbar,
    Schema: Schema,
    ImagePlaceholder: ImagePlaceholder,
    LazyLoad: LazyLoad
  },
  Pages: {
    Home: Home,
    Projects: Projects
  },
  Estimator: {
    Storage: EstimatorStorage,
    State: EstimatorState,
    Validation: EstimatorValidation,
    Router: EstimatorRouter,
    MaterialEngine: EstimatorMaterialEngine,
    PackageEngine: EstimatorPackageEngine,
    BudgetEngine: EstimatorBudgetEngine,
    RecommendationEngine: EstimatorRecommendationEngine,
    ComparisonEngine: EstimatorComparisonEngine,
    ModuleEngine: EstimatorModuleEngine,
    BOQEngine: EstimatorBOQEngine,
    PDFGenerator: EstimatorPDFGenerator,
    Bootstrap: EstimatorBootstrap
  }
};
```

---

### Issue 2: Duplicate Global Object

**Description:** window.resolveAssetPath defined in two files.

**Files:**
- js/helpers.js
- js/core/app.js

**Impact:**
- Potential conflict
- Inconsistent behavior
- Confusing for developers

**Severity:** Low (app.js checks if already defined)

**Current Implementation:**
```javascript
// helpers.js
window.resolveAssetPath = function(assetPath) { ... };

// app.js
window.resolveAssetPath = function(assetPath) { ... };
```

**Fix:** Remove duplicate definition

---

### Issue 3: No Global Object Cleanup

**Description:** No mechanism to clean up global objects.

**Impact:**
- Memory leaks
- State persistence between page loads
- Difficult to test

**Severity:** Low (current implementation works)

**Recommended:** Add cleanup method

---

### Issue 4: No Global Object Validation

**Description:** No validation when setting global objects.

**Impact:**
- Overwriting existing objects
- Silent failures
- Difficult to debug

**Severity:** Low (current implementation works)

**Recommended:** Add validation

---

### Issue 5: Inconsistent Naming Convention

**Description:** Some objects use "Estimator" prefix, some don't.

**Examples:**
- window.Helper (no prefix)
- window.Navbar (no prefix)
- window.EstimatorStorage (with prefix)
- window.EstimatorState (with prefix)

**Impact:**
- Inconsistent naming
- Confusing for developers
- Difficult to organize

**Severity:** Low (cosmetic issue)

---

## Global Object Usage Analysis

### Core Global Objects Usage

**window.Helper:** Used by all modules (correct)

**window.resolveAssetPath:** Used by all modules (correct)

**window.getBaseUrl:** Used by all modules (correct)

**window.Navbar:** Used by all pages (correct)

**window.Schema:** Used by all pages (correct)

**window.ImagePlaceholder:** Used by all pages (correct)

**window.LazyLoad:** Used by all pages (correct)

**Status:** All core global objects used correctly

---

### Page-Specific Global Objects Usage

**window.Home:** Used by index.html (correct)

**window.Projects:** Used by pages/projects/index.html (correct)

**Status:** All page-specific global objects used correctly

---

### Estimator Global Objects Usage

**window.EstimatorStorage:** Used by Estimator Engine, Estimator App, Bootstrap (correct)

**window.EstimatorState:** Used by Router, UI, Estimator Engine, Bootstrap (correct)

**window.EstimatorValidation:** Used by Estimator Engine, UI, Bootstrap (correct)

**window.EstimatorRouter:** Used by UI, Bootstrap (correct)

**window.EstimatorMaterialEngine:** Used by Estimator Engine, Package Engine, Module Engine, BOQ Engine (correct)

**window.EstimatorPackageEngine:** Used by Estimator Engine (correct)

**window.EstimatorBudgetEngine:** Used by Estimator Engine (correct)

**window.EstimatorRecommendationEngine:** Used by Estimator Engine (correct)

**window.EstimatorComparisonEngine:** Used by Estimator Engine (correct)

**window.EstimatorModuleEngine:** Used by Estimator Engine, BOQ Engine (correct)

**window.EstimatorBOQEngine:** Used by Estimator Engine (correct)

**window.EstimatorPDFGenerator:** Used by Estimator Engine (correct)

**window.EstimatorBootstrap:** Used by Estimator App, Estimator page (correct)

**Status:** All estimator global objects used correctly

---

## Global Object Recommendations

### Recommendation 1: Use Namespace

**Current:**
```javascript
window.Helper
window.EstimatorStorage
window.EstimatorState
```

**Recommended:**
```javascript
window.InfiniteInterior = {
  Helper: Helper,
  Estimator: {
    Storage: EstimatorStorage,
    State: EstimatorState
  }
};
```

**Benefits:**
- Reduced global namespace pollution
- Better organization
- Easier to manage
- Clear structure

---

### Recommendation 2: Remove Duplicate Definition

**Current:**
```javascript
// helpers.js
window.resolveAssetPath = function(assetPath) { ... };

// app.js
window.resolveAssetPath = function(assetPath) { ... };
```

**Recommended:**
```javascript
// Keep in helpers.js only
// Remove from app.js
```

---

### Recommendation 3: Add Global Object Cleanup

**Recommended:**
```javascript
window.InfiniteInterior = {
  cleanup() {
    delete window.InfiniteInterior;
  }
};
```

---

### Recommendation 4: Add Global Object Validation

**Recommended:**
```javascript
function setGlobal(name, value) {
  if (window[name] !== undefined) {
    console.warn(`Global object ${name} already exists, overwriting`);
  }
  window[name] = value;
}
```

---

### Recommendation 5: Standardize Naming Convention

**Recommended:**
- Use "Estimator" prefix for all estimator modules
- Use "Core" prefix for core modules
- Use "Pages" prefix for page-specific modules

**Example:**
```javascript
window.InfiniteInterior = {
  Core: {
    Helper: Helper,
    Navbar: Navbar
  },
  Estimator: {
    Storage: EstimatorStorage,
    State: EstimatorState
  }
};
```

---

## Global Object Summary

**Total Global Objects:** 22  
**Core Global Objects:** 7  
**Page-Specific Global Objects:** 2  
**Estimator Global Objects:** 15  
**Singleton Objects:** 4 (Helper, EstimatorStorage, EstimatorState, EstimatorBootstrap)  
**Constructor Objects:** 13  
**Function Objects:** 2 (resolveAssetPath, getBaseUrl)  
**Namespace Pollution:** Yes (no namespace)  
**Duplicate Definitions:** 1 (resolveAssetPath)  
**Cleanup Mechanism:** No  
**Validation:** No  
**Naming Convention:** Inconsistent  
**Usage:** All used correctly  
**Memory Leaks:** Potential (no cleanup)

**Global Objects:**
1. window.Helper - Active
2. window.resolveAssetPath - Active (duplicate)
3. window.getBaseUrl - Active
4. window.Navbar - Active
5. window.Schema - Active
6. window.ImagePlaceholder - Active
7. window.LazyLoad - Active
8. window.Home - Active
9. window.Projects - Active
10. window.EstimatorStorage - Active
11. window.EstimatorState - Active
12. window.EstimatorValidation - Active
13. window.EstimatorRouter - Active
14. window.EstimatorMaterialEngine - Active
15. window.EstimatorPackageEngine - Active
16. window.EstimatorBudgetEngine - Active
17. window.EstimatorRecommendationEngine - Active
18. window.EstimatorComparisonEngine - Active
19. window.EstimatorModuleEngine - Active
20. window.EstimatorBOQEngine - Active
21. window.EstimatorPDFGenerator - Active
22. window.EstimatorBootstrap - Active

**Critical Issue:** Global namespace pollution  
**Recommended Fix:** Use namespace to organize global objects
