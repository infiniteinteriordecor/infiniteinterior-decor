# 04_JS_ARCHITECTURE.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete JavaScript architecture and dependency analysis

---

## JS Files Overview

| File | Path | Purpose | Type | Size |
|------|------|---------|------|------|
| Helpers | js/helpers.js | Utility functions | Singleton Object | 502 lines |
| Storage Manager | js/storage-manager.js | Data persistence (IndexedDB) | Singleton Class | 654 lines |
| Storage Engine | js/storage.js | Storage management (localStorage) | Class | 451 lines |
| Estimator State | js/estimator-state.js | Global state management | Singleton Class | 343 lines |
| Validation | js/validation.js | Validation engine | Class | 421 lines |
| Estimator Router | js/estimator-router.js | Wizard navigation | Class | 245 lines |
| Material Engine | js/material-engine.js | Material calculations | Class | 273 lines |
| Package Engine | js/package-engine.js | Package generation | Class | 588 lines |
| Budget Engine | js/budget-engine.js | Budget calculations | Class | 400 lines |
| Recommendation Engine | js/recommendation-engine.js | Recommendations | Class | 241 lines |
| Comparison Engine | js/comparison-engine.js | Comparisons | Class | 486 lines |
| Module Engine | js/module-engine.js | Module calculations | Class | 688 lines |
| BOQ Engine | js/boq-engine.js | Bill of quantities | Class | 855 lines |
| PDF Generator | js/pdf-generator.js | PDF generation | Class | 1,279 lines |
| Estimator Engine | js/estimator-engine.js | Core calculation engine | Class | 424 lines |
| Estimator UI | js/estimator-ui.js | UI management | Class | 1,352 lines |
| Estimator Bootstrap | js/estimator-bootstrap.js | Bootstrap loader | Singleton Object | 539 lines |
| Estimator App | js/estimator.js | Estimator entry point | Class | 336 lines |
| Core App | js/core/app.js | Core application entry | Function | 255 lines |
| Core Navbar | js/core/navbar.js | Navbar functionality | Function | 125 lines |
| Core Schema | js/core/schema.js | Schema.org structured data | Function | 345 lines |
| Core Image Placeholder | js/core/image-placeholder.js | Image placeholders | Function | 188 lines |
| Core Lazy Load | js/core/lazy-load.js | Lazy loading | Function | 149 lines |
| Pages Home | js/pages/home.js | Homepage functionality | Function | 1,429 lines |
| Pages Projects | js/pages/projects.js | Projects page functionality | Function | 481 lines |

**Total JS Files:** 25  
**Core JS:** 5 files  
**Estimator JS:** 14 files  
**Page JS:** 2 files  
**Total Lines:** ~10,000+ lines

---

## Core JavaScript Files

### 1. js/helpers.js

**Purpose:** Shared utility functions for the estimator module.

**Type:** Singleton Object (Helper object with utility methods)

**Exports:**
- `window.Helper` - Helper object with utility methods
- `window.resolveAssetPath` - Asset path resolution function
- `window.getBasePath` - Base path calculation function

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

**Dependencies:** None (core module)

**Used By:**
- All estimator modules
- Core app.js

**Status:** Active - Critical utility module

---

### 2. js/core/app.js

**Purpose:** Core application entry point and module loader.

**Type:** IIFE (Immediately Invoked Function Expression)

**Exports:**
- `window.getBaseUrl()` - Base URL detection for GitHub Pages
- `window.resolveAssetPath()` - Asset path resolution

**Functions:**
- loadCoreModules() - Loads navbar, image placeholder, schema
- loadPageModule() - Loads page-specific JavaScript
- init() - Initializes application
- initPredictivePrefetching() - Performance optimization
- initBackgroundDataHydration() - Performance optimization

**Dependencies:** None (entry point)

**Used By:** All pages (loaded via script tag)

**Status:** Active - Main entry point for core functionality

---

### 3. js/core/navbar.js

**Purpose:** Navbar component JavaScript.

**Type:** IIFE

**Exports:** `window.Navbar` object with init method

**Functions:**
- renderLogo() - Renders navbar logo with correct path
- initScrollEffects() - Initializes scroll-based styling
- initMobileMenu() - Initializes mobile menu toggle
- init() - Main initialization function

**Dependencies:** 
- window.resolveAssetPath (from helpers.js or app.js)

**Used By:** All pages (loaded via script tag)

**Status:** Active - Used on all pages

---

### 4. js/core/schema.js

**Purpose:** Schema.org structured data generation for SEO.

**Type:** IIFE

**Exports:** `window.Schema` object with init method

**Functions:**
- initSchema() - Loads database and generates schema
- generateHomeSchema(data)
- generateAboutSchema(data)
- generateServicesSchema(data)
- generateProjectsSchema(data)
- generateGallerySchema(data)
- generateContactSchema(data)
- generateOrganizationSchema(data)
- generateLocalBusinessSchema(data)
- init() - Main initialization function

**Dependencies:**
- window.resolveAssetPath (from helpers.js or app.js)
- data/database.json

**Used By:** All pages (loaded via script tag)

**Status:** Active - SEO enhancement

---

### 5. js/core/image-placeholder.js

**Purpose:** Automatic image placeholder generation.

**Type:** IIFE

**Exports:** `window.ImagePlaceholder` object with init method

**Functions:**
- initImagePlaceholders() - Initializes all placeholders
- renderPlaceholder(placeholder) - Renders single placeholder
- init() - Main initialization function

**Dependencies:** None

**Used By:** All pages (loaded via script tag)

**Status:** Active - Image loading enhancement

---

### 6. js/core/lazy-load.js

**Purpose:** Lazy loading system for images.

**Type:** IIFE

**Exports:** `window.LazyLoad` object with init method

**Functions:**
- initLazyLoading() - Initializes lazy loading
- init() - Main initialization function

**Dependencies:** None

**Used By:** All pages (loaded via script tag)

**Status:** Active - Performance optimization

---

## Estimator JavaScript Files

### 7. js/storage-manager.js

**Purpose:** Data persistence system using IndexedDB and localStorage.

**Type:** Singleton Class (StorageManager)

**Exports:** `window.EstimatorStorage` (singleton instance)

**Constructor:** No parameters

**Methods:**
- init() - Initialize IndexedDB
- initIndexedDB() - Set up IndexedDB database
- saveDraft(draft) - Save draft to IndexedDB
- loadDraft(draftId) - Load draft from IndexedDB
- deleteDraft(draftId) - Delete draft from IndexedDB
- saveCalculation(calculation) - Save calculation
- loadCalculation(id) - Load calculation
- cacheData(key, data) - Cache data in IndexedDB
- getCachedData(key) - Get cached data
- clearCache() - Clear cache
- clearAll() - Clear all stored data
- getCurrentDraftId() - Get current draft ID

**Dependencies:** None (core module)

**Used By:**
- Estimator Engine
- Estimator App
- Bootstrap

**Status:** Active - Singleton pattern

---

### 8. js/estimator-state.js

**Purpose:** Global state management with subscription pattern.

**Type:** Singleton Class (StateManager)

**Exports:** `window.EstimatorState` (singleton instance)

**Constructor:** No parameters

**State Structure:**
- currentStep, totalSteps, canProceed, canGoBack (navigation)
- selectedPackage, packageTier (package selection)
- budget, budgetRange (budget)
- rooms, roomCount (rooms)
- selectedModules, moduleCount (modules)
- clientDetails (client information)
- materialTier, style (material and style)
- comparisonData (comparison)
- recommendations (recommendations)
- validationStatus (validation)
- draftStatus (draft)
- calculationResults (calculations)
- uiState (UI)

**Methods:**
- get(key) - Get state value
- set(key, value) - Set state value
- reset() - Reset state to initial
- subscribe(callback) - Subscribe to state changes
- unsubscribe(callback) - Unsubscribe from state changes
- notify() - Notify subscribers
- getState() - Get entire state
- setState(newState) - Set entire state
- hasHistory() - Check if history exists
- undo() - Undo last change
- redo() - Redo last change

**Dependencies:** None (core module)

**Used By:**
- Estimator Router
- Estimator UI
- Estimator Engine
- Bootstrap

**Status:** Active - Singleton pattern

---

### 9. js/validation.js

**Purpose:** Validation engine for user input and state.

**Type:** Class (ValidationEngine)

**Exports:** `window.EstimatorValidation` (class constructor)

**Constructor:** No parameters

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

**Built-in Validators:**
- required
- email
- phone
- min
- max
- minLength
- maxLength
- pattern
- numeric
- integer
- positive

**Dependencies:** helpers.js

**Used By:**
- Estimator Engine
- Estimator UI
- Bootstrap

**Status:** Active - Constructor pattern

---

### 10. js/estimator-router.js

**Purpose:** Internal routing system for wizard navigation.

**Type:** Class (Router)

**Exports:** `window.EstimatorRouter` (class constructor)

**Constructor:** stateManager (required parameter)

**Steps:**
1. Category
2. Type
3. Information
4. Requirements
5. Style
6. Package
7. Budget
8. Contact

**Methods:**
- init() - Initialize router
- checkDeepLink() - Check for URL deep link
- checkDraftResumption() - Check for draft resumption
- goToStep(stepId) - Navigate to specific step
- nextStep() - Go to next step
- previousStep() - Go to previous step
- getCurrentStep() - Get current step
- updateNavigationState() - Update canProceed/canGoBack
- setGuard(stepId, guard) - Set navigation guard
- removeGuard(stepId) - Remove navigation guard

**Dependencies:** estimator-state.js

**Used By:**
- Estimator UI
- Bootstrap

**Status:** Active - Constructor pattern with dependency injection

---

### 11. js/material-engine.js

**Purpose:** Material selection and pricing calculations.

**Type:** Class (MaterialEngine)

**Exports:** `window.EstimatorMaterialEngine` (class constructor)

**Constructor:** No parameters

**Tiers:**
- essential (multiplier: 1.0)
- premium (multiplier: 1.3)
- luxury (multiplier: 1.6)
- elite (multiplier: 2.0)

**Categories:**
- flooring, walls, ceiling, furniture, lighting, accessories, hardware

**Methods:**
- init(materialsData) - Initialize with material data
- getTier(tierId) - Get tier information
- calculateMaterialCost(material, quantity, tier) - Calculate cost
- getMaterialsByCategory(category) - Get materials by category
- searchMaterials(query) - Search materials
- getRecommendations(context) - Get recommendations (placeholder)
- compareMaterials(materialIds) - Compare materials
- calculateTierUpgradeCost(fromTier, toTier, area) - Calculate upgrade cost

**Dependencies:** helpers.js

**Used By:**
- Estimator Engine
- Package Engine
- Module Engine
- Bootstrap

**Status:** Active - Constructor pattern

---

### 12. js/package-engine.js

**Purpose:** Package generation and management.

**Type:** Class (PackageEngine)

**Exports:** `window.EstimatorPackageEngine` (class constructor)

**Constructor:** No parameters

**Tiers:**
- basic (multiplier: 1.0, margin: 0.15)
- medium (multiplier: 1.4, margin: 0.20)
- premium (multiplier: 2.0, margin: 0.25)

**Components:**
- materials, hardware, lighting, finish, labor, installation, design, companyMargin, gst

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

**Dependencies:** helpers.js, material-engine.js

**Used By:**
- Estimator Engine
- Bootstrap

**Status:** Active - Constructor pattern

---

### 13. js/budget-engine.js

**Purpose:** Budget calculation and management.

**Type:** Class (BudgetEngine)

**Exports:** `window.EstimatorBudgetEngine` (class constructor)

**Constructor:** No parameters

**Ranges:**
- economy (500K - 1.5M)
- standard (1.5M - 3M)
- premium (3M - 6M)
- luxury (6M - 10M)
- elite (10M+)

**Components:**
- materials, labor, design, installation, contingency, taxes

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

**Dependencies:** helpers.js, material-engine.js

**Used By:**
- Estimator Engine
- Bootstrap

**Status:** Active - Constructor pattern

---

### 14. js/recommendation-engine.js

**Purpose:** Recommendation system for intelligent suggestions.

**Type:** Class (RecommendationEngine)

**Exports:** `window.EstimatorRecommendationEngine` (class constructor)

**Constructor:** No parameters

**Types:**
- material, tier, module, style, upgrade

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

**Dependencies:** helpers.js, material-engine.js, budget-engine.js

**Used By:**
- Estimator Engine
- Bootstrap

**Status:** Active - Constructor pattern

---

### 15. js/comparison-engine.js

**Purpose:** Comparison system for different estimator options.

**Type:** Class (ComparisonEngine)

**Exports:** `window.EstimatorComparisonEngine` (class constructor)

**Constructor:** No parameters

**Types:**
- package, tier, material, module

**Methods:**
- init() - Initialize comparison engine
- comparePackages(packageIds) - Compare packages
- compareTiers(tierIds) - Compare tiers
- compareMaterials(materialIds) - Compare materials
- compareModules(moduleIds) - Compare modules
- getComparisonMetrics(type, items) - Get comparison metrics
- generateComparisonReport(type, items) - Generate comparison report
- getUpgradeRecommendations(current, target) - Get upgrade recommendations

**Dependencies:** helpers.js, budget-engine.js, material-engine.js

**Used By:**
- Estimator Engine
- Bootstrap

**Status:** Active - Constructor pattern

---

### 16. js/module-engine.js

**Purpose:** Independent module calculation engine.

**Type:** Class (ModuleEngine)

**Exports:** `window.EstimatorModuleEngine` (class constructor)

**Constructor:** No parameters

**Modules:**
- kitchen, wardrobe, tv_unit, bedroom, false_ceiling, bathroom, vanity, furniture

**Components:**
- materials, hardware, labor, installation

**Methods:**
- init() - Initialize module engine
- calculateModuleCost(moduleId, specifications, tier) - Calculate module cost
- getModuleComponents(moduleId, tier) - Get module components
- getModuleFeatures(moduleId, tier) - Get module features
- getModuleBaseRate(moduleId) - Get base rate
- calculateComponentCost(component, specifications, tier) - Calculate component cost
- getAvailableModules() - Get available modules
- getModuleInfo(moduleId) - Get module information

**Dependencies:** helpers.js, material-engine.js

**Used By:**
- Estimator Engine
- Bootstrap

**Status:** Active - Constructor pattern

---

### 17. js/boq-engine.js

**Purpose:** Bill of Quantities generation engine.

**Type:** Class (BOQEngine)

**Exports:** `window.EstimatorBOQEngine` (class constructor)

**Constructor:** No parameters

**Rooms:**
- living, dining, kitchen, bedroom, master_bedroom, guest_bedroom, kids_bedroom, balcony, bathroom, store

**Methods:**
- init() - Initialize BOQ engine
- generateBOQ(projectData, tier) - Generate complete BOQ
- generateRoomBOQ(roomType, specifications, tier) - Generate room BOQ
- getBOQStructure() - Get BOQ structure
- calculateItemCost(material, qty, rate) - Calculate item cost
- exportBOQToCSV(boq) - Export BOQ to CSV
- getRoomBaseRate(roomType) - Get room base rate
- getAvailableRooms() - Get available rooms

**Dependencies:** helpers.js, material-engine.js, module-engine.js

**Used By:**
- Estimator Engine
- Bootstrap

**Status:** Active - Constructor pattern

---

### 18. js/pdf-generator.js

**Purpose:** PDF generation system using browser print functionality.

**Type:** Class (PDFGenerator)

**Exports:** `window.EstimatorPDFGenerator` (class constructor)

**Constructor:** No parameters

**Methods:**
- init() - Initialize PDF generator
- generateQuotation(projectData) - Generate quotation PDF
- generateBOQ(projectData) - Generate BOQ PDF
- generateReport(projectData) - Generate report PDF
- printPDF(content) - Print content as PDF
- configurePDF(config) - Configure PDF settings
- setBranding(branding) - Set company branding

**Dependencies:** helpers.js

**Used By:**
- Estimator Engine
- Bootstrap

**Status:** Active - Constructor pattern

---

### 19. js/estimator-engine.js

**Purpose:** Core calculation and business logic engine.

**Type:** Class (EstimatorEngine)

**Exports:** `window.EstimatorEngine` (class constructor)

**Constructor:** stateManager (required parameter)

**Sub-engines:**
- materialEngine, budgetEngine, recommendationEngine, comparisonEngine, storage, validation, packageEngine, moduleEngine, boqEngine, pdfGenerator

**Methods:**
- init() - Initialize estimator engine
- loadData() - Load data from JSON files
- loadJSON(path) - Load JSON file
- calculateCost(projectData) - Calculate total cost
- generatePackage(projectData) - Generate package
- generateRecommendations(projectData) - Generate recommendations
- generateComparison(projectData) - Generate comparison
- generateBOQ(projectData) - Generate BOQ
- generatePDF(projectData) - Generate PDF
- saveDraft(projectData) - Save draft
- loadDraft(draftId) - Load draft

**Dependencies:** All other estimator modules

**Used By:**
- Estimator App
- Bootstrap

**Status:** Active - Constructor pattern with dependency injection

---

### 20. js/estimator-ui.js

**Purpose:** UI management for estimator module.

**Type:** Class (UIManager)

**Exports:** `window.EstimatorUI` (class constructor)

**Constructor:** stateManager, router (required parameters)

**Methods:**
- init() - Initialize UI manager
- cacheElements() - Cache DOM elements
- bindEvents() - Bind event handlers
- renderProgress() - Render progress indicator
- renderStep(stepId) - Render current step
- hideLoading() - Hide loading indicator
- showLoading() - Show loading indicator
- showError(message) - Show error message
- showSuccess(message) - Show success message
- updateNavigationState() - Update navigation buttons
- handleNext() - Handle next button
- handlePrevious() - Handle previous button
- handleStepChange() - Handle step change

**Dependencies:** estimator-state.js, estimator-router.js

**Used By:**
- Estimator App
- Bootstrap

**Status:** Active - Constructor pattern with dependency injection

---

### 21. js/estimator-bootstrap.js

**Purpose:** Bootstrap loader for orchestrated initialization with error resilience.

**Type:** Singleton Object (Bootstrap object)

**Exports:** `window.EstimatorBootstrap` (singleton object)

**Configuration:**
- modules: Array of module loading configurations
- dataFiles: Array of data files to load
- diagnostics: Diagnostic settings

**Methods:**
- bootstrap() - Main bootstrap function
- validateModule(name, module) - Validate module (accepts singletons and constructors)
- loadModule(moduleConfig, context) - Load module with graceful failure
- loadDataFile(dataConfig) - Load data file
- resolveAssetPath(path) - Asset path resolution
- getDiagnostic() - Get diagnostic report
- getReport() - Get bootstrap report

**Dependencies:** helpers.js (must load first)

**Used By:**
- Estimator App
- Estimator page

**Status:** Active - Singleton pattern, critical for estimator initialization

---

### 22. js/estimator.js

**Purpose:** Estimator module entry point.

**Type:** Class (EstimatorApp)

**Exports:** Constructor (not singleton, used by estimator-bootstrap.js)

**Constructor:** No parameters

**Properties:**
- stateManager, router, ui, engine, storage (populated by Bootstrap)
- isInitialized, isLoaded, bootstrapResults

**Methods:**
- init() - Initialize application via Bootstrap
- checkDraftResumption() - Check for draft resumption
- start() - Start estimator
- saveDraft() - Save current draft
- generateQuotation() - Generate quotation
- generateBOQ() - Generate BOQ
- reset() - Reset estimator
- showError(message) - Show error
- getStatus() - Get application status
- getDiagnostics() - Get diagnostics
- destroy() - Destroy application

**Dependencies:** estimator-bootstrap.js, all estimator modules

**Used By:** Estimator page (auto-initializes on DOMContentLoaded)

**Status:** Active - Entry point for estimator module

---

### 23. js/storage.js

**Purpose:** Storage management (alternative to storage-manager.js).

**Type:** Class (StorageEngine)

**Exports:** Constructor (not currently used)

**Constructor:** No parameters

**Methods:**
- init() - Initialize storage engine
- initIndexedDB() - Initialize IndexedDB
- save(key, value) - Save to storage
- load(key) - Load from storage
- remove(key) - Remove from storage
- clear() - Clear storage

**Dependencies:** helpers.js

**Used By:** None (appears to be unused)

**Status:** Unused - Duplicate of storage-manager.js

---

## Page JavaScript Files

### 24. js/pages/home.js

**Purpose:** Homepage interactive functionality.

**Type:** IIFE with global exports

**Exports:** `window.Home` object with init method

**Features:**
- Navbar scroll effects
- Mobile menu toggle
- Counter animations
- Scroll animations
- Parallax effects
- Dynamic JSON loading
- Hero background image resolution

**Methods:**
- initHeroBackgrounds() - Set hero backgrounds
- initNavbar() - Initialize navbar
- initCounters() - Initialize counter animations
- initScrollAnimations() - Initialize scroll animations
- initParallax() - Initialize parallax effects
- loadData() - Load data from database.json
- init() - Main initialization function

**Dependencies:**
- window.resolveAssetPath (from helpers.js or app.js)
- data/database.json

**Used By:** index.html only

**Status:** Active - Page-specific

---

### 25. js/pages/projects.js

**Purpose:** Projects page functionality.

**Type:** IIFE with global exports

**Exports:** `window.Projects` object with init method

**Features:**
- Dynamic project rendering
- Project filtering
- Search functionality
- Pagination
- Integration with image placeholder

**Methods:**
- loadData() - Load data from database.json
- renderProjects(projects) - Render project cards
- filterProjects(category) - Filter by category
- searchProjects(query) - Search projects
- paginateProjects() - Paginate projects
- init() - Main initialization function

**Dependencies:**
- data/database.json
- window.ImagePlaceholder

**Used By:** pages/projects/index.html only

**Status:** Active - Page-specific

---

## Global Variables

### window.* Objects

| Object | Purpose | Created By | Used By |
|--------|---------|-----------|---------|
| window.Helper | Utility functions | helpers.js | All estimator modules |
| window.resolveAssetPath | Asset path resolution | helpers.js, app.js | All modules |
| window.getBaseUrl | Base URL detection | app.js | All modules |
| window.Navbar | Navbar functionality | core/navbar.js | All pages |
| window.Schema | Schema.org data | core/schema.js | All pages |
| window.ImagePlaceholder | Image placeholders | core/image-placeholder.js | All pages |
| window.LazyLoad | Lazy loading | core/lazy-load.js | All pages |
| window.Home | Homepage functionality | pages/home.js | index.html |
| window.Projects | Projects functionality | pages/projects.js | projects page |
| window.EstimatorStorage | Storage singleton | storage-manager.js | Estimator modules |
| window.EstimatorState | State singleton | estimator-state.js | Estimator modules |
| window.EstimatorValidation | Validation class | validation.js | Estimator modules |
| window.EstimatorRouter | Router class | estimator-router.js | Estimator modules |
| window.EstimatorMaterialEngine | Material engine class | material-engine.js | Estimator modules |
| window.EstimatorPackageEngine | Package engine class | package-engine.js | Estimator modules |
| window.EstimatorBudgetEngine | Budget engine class | budget-engine.js | Estimator modules |
| window.EstimatorRecommendationEngine | Recommendation class | recommendation-engine.js | Estimator modules |
| window.EstimatorComparisonEngine | Comparison class | comparison-engine.js | Estimator modules |
| window.EstimatorModuleEngine | Module engine class | module-engine.js | Estimator modules |
| window.EstimatorBOQEngine | BOQ engine class | boq-engine.js | Estimator modules |
| window.EstimatorPDFGenerator | PDF generator class | pdf-generator.js | Estimator modules |
| window.EstimatorEngine | Estimator engine class | estimator-engine.js | Estimator modules |
| window.EstimatorUI | UI manager class | estimator-ui.js | Estimator modules |
| window.EstimatorBootstrap | Bootstrap singleton | estimator-bootstrap.js | Estimator modules |
| window.EstimatorApp | Estimator app class | estimator.js | Estimator page |

---

## Execution Order

### Main Pages (Home, About, Services, Projects, Gallery, Contact)

1. helpers.js (deferred)
2. core/app.js (deferred)
3. core/navbar.js (deferred)
4. core/schema.js (deferred)
5. core/image-placeholder.js (deferred)
6. core/lazy-load.js (deferred)
7. pages/[page].js (deferred)

### Estimator Page

1. helpers.js (deferred)
2. core/navbar.js (deferred)
3. estimator-bootstrap.js (deferred)
4. storage-manager.js (deferred)
5. estimator-state.js (deferred)
6. validation.js (deferred)
7. estimator-router.js (deferred)
8. material-engine.js (deferred)
9. package-engine.js (deferred)
10. budget-engine.js (deferred)
11. recommendation-engine.js (deferred)
12. comparison-engine.js (deferred)
13. module-engine.js (deferred)
14. boq-engine.js (deferred)
15. pdf-generator.js (deferred)
16. estimator-engine.js (deferred)
17. estimator-ui.js (deferred)
18. estimator.js (deferred)

---

## Singleton Pattern

### Singleton Instances

| Module | Singleton | How Created | Global Name |
|--------|-----------|-------------|-------------|
| Storage Manager | ✓ Yes | `new StorageManager()` | window.EstimatorStorage |
| State Manager | ✓ Yes | `new StateManager()` | window.EstimatorState |
| Helper | ✓ Yes | Helper object literal | window.Helper |
| Bootstrap | ✓ Yes | Bootstrap object literal | window.EstimatorBootstrap |

### Constructor Pattern

| Module | Constructor | How Used | Global Name |
|--------|-----------|----------|-------------|
| Validation | ✓ Yes | `new EstimatorValidation()` | window.EstimatorValidation |
| Router | ✓ Yes | `new EstimatorRouter(state)` | window.EstimatorRouter |
| Material Engine | ✓ Yes | `new EstimatorMaterialEngine()` | window.EstimatorMaterialEngine |
| Package Engine | ✓ Yes | `new EstimatorPackageEngine()` | window.EstimatorPackageEngine |
| Budget Engine | ✓ Yes | `new EstimatorBudgetEngine()` | window.EstimatorBudgetEngine |
| Recommendation Engine | ✓ Yes | `new EstimatorRecommendationEngine()` | window.EstimatorRecommendationEngine |
| Comparison Engine | ✓ Yes | `new EstimatorComparisonEngine()` | window.EstimatorComparisonEngine |
| Module Engine | ✓ Yes | `new EstimatorModuleEngine()` | window.EstimatorModuleEngine |
| BOQ Engine | ✓ Yes | `new EstimatorBOQEngine()` | window.EstimatorBOQEngine |
| PDF Generator | ✓ Yes | `new EstimatorPDFGenerator()` | window.EstimatorPDFGenerator |
| Estimator Engine | ✓ Yes | `new EstimatorEngine(state)` | window.EstimatorEngine |
| UI Manager | ✓ Yes | `new EstimatorUI(state, router)` | window.EstimatorUI |
| Estimator App | ✓ Yes | `new EstimatorApp()` | window.EstimatorApp |

---

## Dependencies

### Core Dependencies

- helpers.js (utility functions)
- core/app.js (application entry)
- core/navbar.js (navigation)
- core/schema.js (SEO)
- core/image-placeholder.js (images)
- core/lazy-load.js (performance)

### Estimator Dependencies

**Storage Manager:** None (core module)

**State Manager:** None (core module)

**Validation:** helpers.js

**Router:** estimator-state.js

**Material Engine:** helpers.js

**Package Engine:** helpers.js, material-engine.js

**Budget Engine:** helpers.js, material-engine.js

**Recommendation Engine:** helpers.js, material-engine.js, budget-engine.js

**Comparison Engine:** helpers.js, budget-engine.js, material-engine.js

**Module Engine:** helpers.js, material-engine.js

**BOQ Engine:** helpers.js, material-engine.js, module-engine.js

**PDF Generator:** helpers.js

**Estimator Engine:** All other estimator modules

**UI Manager:** estimator-state.js, estimator-router.js

**Bootstrap:** helpers.js

**Estimator App:** estimator-bootstrap.js, all estimator modules

---

## Unused Code

### Unused JavaScript Files

| File | Status | Reason |
|------|--------|--------|
| js/storage.js | Unused | Duplicate of storage-manager.js |

**Note:** storage.js appears to be an alternative implementation of storage-manager.js but is not used anywhere in the codebase.

---

## Summary

**Total JS Files:** 25  
**Core JS:** 5 files  
**Estimator JS:** 14 files  
**Page JS:** 2 files  
**Singletons:** 4 (Helper, Storage, State, Bootstrap)  
**Constructors:** 13 (Validation, Router, Material, Package, Budget, Recommendation, Comparison, Module, BOQ, PDF, Estimator Engine, UI, Estimator App)  
**Unused Files:** 1 (storage.js)  
**Global Objects:** 22 window.* objects  
**Total Lines:** ~10,000+ lines  
**Execution Order:** Main pages load 7 files, Estimator loads 18 files
