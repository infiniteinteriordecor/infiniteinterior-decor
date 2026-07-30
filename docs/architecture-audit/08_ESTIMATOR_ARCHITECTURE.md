# 08_ESTIMATOR_ARCHITECTURE.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete Estimator module architecture analysis

---

## Estimator Module Overview

The Estimator module is a comprehensive cost estimation tool for interior design projects. It uses a Bootstrap Loader architecture for orchestrated initialization with error resilience.

**Location:** `pages/estimator/index.html`

**Purpose:** Provide instant interior design cost estimates with detailed material and labor breakdowns.

**Architecture Pattern:** Bootstrap Loader with Singleton and Constructor patterns

**Total JS Files:** 18 (including Bootstrap)

**Total Lines of Code:** ~8,000+ lines

---

## Estimator Module Structure

```
Estimator Module
├── Bootstrap Layer
│   ├── estimator-bootstrap.js (Bootstrap Loader)
│   └── helpers.js (Utility functions)
├── Core Layer
│   ├── storage-manager.js (Data persistence)
│   ├── estimator-state.js (State management)
│   └── validation.js (Validation engine)
├── Engine Layer
│   ├── estimator-router.js (Wizard navigation)
│   ├── material-engine.js (Material calculations)
│   ├── package-engine.js (Package generation)
│   ├── budget-engine.js (Budget calculations)
│   ├── recommendation-engine.js (Recommendations)
│   ├── comparison-engine.js (Comparisons)
│   ├── module-engine.js (Module calculations)
│   ├── boq-engine.js (Bill of quantities)
│   └── pdf-generator.js (PDF generation)
├── Integration Layer
│   ├── estimator-engine.js (Core calculation engine)
│   └── estimator-ui.js (UI management)
└── Application Layer
    └── estimator.js (Entry point)
```

---

## Bootstrap Loader Architecture

### Purpose

The Bootstrap Loader orchestrates the complete initialization of the Estimator module with:
- Graceful failure handling
- Comprehensive diagnostics
- Runtime validation
- Asset path resolution

### File: js/estimator-bootstrap.js

**Type:** Singleton Object

**Exports:** `window.EstimatorBootstrap`

**Configuration:**

```javascript
const CONFIG = {
  modules: [
    { name: 'Storage', check: () => window.EstimatorStorage, init: null },
    { name: 'State', check: () => window.EstimatorState, init: null },
    { name: 'Validation', check: () => window.EstimatorValidation, init: null },
    { name: 'Router', check: () => window.EstimatorRouter, init: null },
    { name: 'MaterialEngine', check: () => window.EstimatorMaterialEngine, init: null },
    { name: 'PackageEngine', check: () => window.EstimatorPackageEngine, init: null },
    { name: 'BudgetEngine', check: () => window.EstimatorBudgetEngine, init: null },
    { name: 'RecommendationEngine', check: () => window.EstimatorRecommendationEngine, init: null },
    { name: 'ComparisonEngine', check: () => window.EstimatorComparisonEngine, init: null },
    { name: 'ModuleEngine', check: () => window.EstimatorModuleEngine, init: null },
    { name: 'BOQEngine', check: () => window.EstimatorBOQEngine, init: null },
    { name: 'PDFGenerator', check: () => window.EstimatorPDFGenerator, init: null },
    { name: 'EstimatorEngine', check: () => window.EstimatorEngine, init: null },
    { name: 'UI', check: () => window.EstimatorUI, init: null }
  ],
  dataFiles: [
    { name: 'Materials', path: 'data/estimator/materials.json' },
    { name: 'PricingRules', path: 'data/estimator/pricing-rules.json' },
    { name: 'Recommendations', path: 'data/estimator/recommendations.json' },
    { name: 'UpgradeRules', path: 'data/estimator/upgrade-rules.json' }
  ]
};
```

**Loading Phases:**

1. **Phase 1: Core Modules**
   - Load Storage (singleton)
   - Load State (singleton)
   - Load Validation (constructor)

2. **Phase 2: Router**
   - Load Router (constructor with state dependency)
   - Initialize Router

3. **Phase 3: Data Files**
   - Load materials.json
   - Load pricing-rules.json
   - Load recommendations.json
   - Load upgrade-rules.json

4. **Phase 4: Engine Modules**
   - Load MaterialEngine (constructor)
   - Load PackageEngine (constructor)
   - Load BudgetEngine (constructor)
   - Load RecommendationEngine (constructor)
   - Load ComparisonEngine (constructor)
   - Load ModuleEngine (constructor)
   - Load BOQEngine (constructor)
   - Load PDFGenerator (constructor)

5. **Phase 5: Estimator Engine**
   - Load EstimatorEngine (constructor with state dependency)
   - Initialize Estimator Engine
   - Instantiate all sub-engines
   - Load data files
   - Initialize engines with data

6. **Phase 6: UI**
   - Load UI (constructor with state and router dependencies)
   - Initialize UI
   - Cache DOM elements
   - Bind event handlers
   - Render progress
   - Hide loading

**Key Methods:**

- `bootstrap()` - Main bootstrap function
- `validateModule(name, module)` - Validate module (accepts singletons and constructors)
- `loadModule(moduleConfig, context)` - Load module with graceful failure
- `loadDataFile(dataConfig)` - Load data file
- `resolveAssetPath(path)` - Asset path resolution
- `getDiagnostic()` - Get diagnostic report
- `getReport()` - Get bootstrap report

---

## Core Layer Architecture

### 1. Storage Manager (js/storage-manager.js)

**Type:** Singleton Class

**Exports:** `window.EstimatorStorage` (singleton instance)

**Purpose:** Data persistence using IndexedDB and localStorage

**Database:** `InfiniteInteriorEstimator` (Version 1)

**Stores:**
- drafts - Draft estimations
- calculations - Calculation results
- materials - Material data cache
- packages - Package data cache
- cache - General cache

**Key Methods:**
- `init()` - Initialize IndexedDB
- `saveDraft(draft)` - Save draft to IndexedDB
- `loadDraft(draftId)` - Load draft from IndexedDB
- `deleteDraft(draftId)` - Delete draft from IndexedDB
- `saveCalculation(calculation)` - Save calculation
- `loadCalculation(id)` - Load calculation
- `cacheData(key, data)` - Cache data in IndexedDB
- `getCachedData(key)` - Get cached data
- `clearCache()` - Clear cache
- `clearAll()` - Clear all stored data
- `getCurrentDraftId()` - Get current draft ID

**Fallback:** localStorage if IndexedDB fails

---

### 2. State Manager (js/estimator-state.js)

**Type:** Singleton Class

**Exports:** `window.EstimatorState` (singleton instance)

**Purpose:** Global state management with subscription pattern

**State Structure:**

```javascript
{
  // Wizard navigation
  currentStep: 1,
  totalSteps: 8,
  canProceed: false,
  canGoBack: false,
  
  // Package selection
  selectedPackage: null,
  packageTier: null,
  
  // Budget
  budget: null,
  budgetRange: null,
  
  // Rooms
  rooms: [],
  roomCount: 0,
  
  // Modules
  selectedModules: [],
  moduleCount: 0,
  
  // Client details
  clientDetails: {
    name: null,
    email: null,
    phone: null,
    address: null
  },
  
  // Material and style
  materialTier: null,
  style: null,
  
  // Comparison and recommendations
  comparisonData: null,
  recommendations: null,
  
  // Validation
  validationStatus: {},
  
  // Draft
  draftStatus: null,
  
  // Calculations
  calculationResults: null,
  
  // UI state
  uiState: {}
}
```

**Key Methods:**
- `get(key)` - Get state value
- `set(key, value)` - Set state value
- `reset()` - Reset state to initial
- `subscribe(callback)` - Subscribe to state changes
- `unsubscribe(callback)` - Unsubscribe from state changes
- `notify)` - Notify subscribers
- `getState()` - Get entire state
- `setState(newState)` - Set entire state
- `undo()` - Undo last change
- `redo()` - Redo last change

**Pattern:** Observer pattern for state changes

---

### 3. Validation Engine (js/validation.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorValidation` (class constructor)

**Purpose:** Validate user input and state

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

**Key Methods:**
- `addRule(field, rules)` - Add validation rule
- `removeRule(field)` - Remove validation rule
- `addValidator(name, validator)` - Add custom validator
- `removeValidator(name)` - Remove custom validator
- `validate(field, value)` - Validate single field
- `validateSchema(schema, data)` - Validate entire schema
- `getErrors()` - Get validation errors
- `clearErrors()` - Clear validation errors
- `isValid()` - Check if all validations pass

---

## Engine Layer Architecture

### 1. Router (js/estimator-router.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorRouter` (class constructor)

**Purpose:** Wizard step navigation

**Dependency:** StateManager (passed in constructor)

**Steps:**
1. Category
2. Type
3. Information
4. Requirements
5. Style
6. Package
7. Budget
8. Contact

**Key Methods:**
- `init()` - Initialize router
- `checkDeepLink()` - Check for URL deep link
- `checkDraftResumption()` - Check for draft resumption
- `goToStep(stepId)` - Navigate to specific step
- `nextStep()` - Go to next step
- `previousStep()` - Go to previous step
- `getCurrentStep()` - Get current step
- `updateNavigationState()` - Update canProceed/canGoBack
- `setGuard(stepId, guard)` - Set navigation guard
- `removeGuard(stepId)` - Remove navigation guard

---

### 2. Material Engine (js/material-engine.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorMaterialEngine` (class constructor)

**Purpose:** Material selection and pricing calculations

**Tiers:**
- essential (multiplier: 1.0)
- premium (multiplier: 1.3)
- luxury (multiplier: 1.6)
- elite (multiplier: 2.0)

**Categories:**
- flooring, walls, ceiling, furniture, lighting, accessories, hardware

**Key Methods:**
- `init(materialsData)` - Initialize with material data
- `getTier(tierId)` - Get tier information
- `calculateMaterialCost(material, quantity, tier)` - Calculate cost
- `getMaterialsByCategory(category)` - Get materials by category
- `searchMaterials(query)` - Search materials
- `getRecommendations(context)` - Get recommendations
- `compareMaterials(materialIds)` - Compare materials
- `calculateTierUpgradeCost(fromTier, toTier, area)` - Calculate upgrade cost

---

### 3. Package Engine (js/package-engine.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorPackageEngine` (class constructor)

**Purpose:** Package generation and management

**Tiers:**
- basic (multiplier: 1.0, margin: 0.15)
- medium (multiplier: 1.4, margin: 0.20)
- premium (multiplier: 2.0, margin: 0.25)

**Components:**
- materials, hardware, lighting, finish, labor, installation, design, companyMargin, gst

**Key Methods:**
- `init(materialDatabase)` - Initialize with material database
- `generatePackage(projectData, tier)` - Generate package
- `calculatePackageCost(projectData, tier)` - Calculate package cost
- `getPackageSpecifications(projectData, tier)` - Get specifications
- `getDurabilityRating(tier)` - Get durability rating
- `getMaintenanceLevel(tier)` - Get maintenance level
- `getLifeExpectancy(tier)` - Get life expectancy
- `getWarrantyPeriod(tier)` - Get warranty period
- `getTimeline(tier)` - Get timeline
- `getInclusions(tier)` - Get inclusions
- `getExclusions(tier)` - Get exclusions
- `comparePackages(tierIds)` - Compare packages
- `recommendTier(budget)` - Recommend tier based on budget

---

### 4. Budget Engine (js/budget-engine.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorBudgetEngine` (class constructor)

**Purpose:** Budget calculation and management

**Ranges:**
- economy (500K - 1.5M)
- standard (1.5M - 3M)
- premium (3M - 6M)
- luxury (6M - 10M)
- elite (10M+)

**Components:**
- materials, labor, design, installation, contingency, taxes

**Key Methods:**
- `init(pricingRules)` - Initialize with pricing rules
- `getBudgetRanges()` - Get budget ranges
- `calculateTotalCost(projectData)` - Calculate total cost
- `calculateContingency(total)` - Calculate contingency
- `calculateTaxes(subtotal)` - Calculate taxes
- `validateBudget(budget, estimatedCost)` - Validate budget
- `reverseBudgeting(budget)` - Reverse budgeting
- `getBudgetAdjustments(current, target)` - Get budget adjustments
- `getOptimizationSuggestions(projectData)` - Get optimization suggestions

---

### 5. Recommendation Engine (js/recommendation-engine.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorRecommendationEngine` (class constructor)

**Purpose:** Recommendation system for intelligent suggestions

**Types:**
- material, tier, module, style, upgrade

**Key Methods:**
- `init(recommendationsData, upgradeRulesData)` - Initialize with data
- `generateRecommendations(context)` - Generate recommendations
- `getMaterialRecommendations(context)` - Get material recommendations
- `getTierRecommendations(budget)` - Get tier recommendations
- `getModuleRecommendations(projectData)` - Get module recommendations
- `getStyleRecommendations(preferences)` - Get style recommendations
- `getUpgradeRecommendations(currentTier)` - Get upgrade recommendations
- `calculateRecommendationScore(recommendation, context)` - Calculate score
- `filterRecommendations(recommendations, criteria)` - Filter recommendations
- `applyRecommendation(recommendation)` - Apply recommendation
- `dismissRecommendation(recommendationId)` - Dismiss recommendation

---

### 6. Comparison Engine (js/comparison-engine.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorComparisonEngine` (class constructor)

**Purpose:** Comparison system for different estimator options

**Types:**
- package, tier, material, module

**Key Methods:**
- `init()` - Initialize comparison engine
- `comparePackages(packageIds)` - Compare packages
- `compareTiers(tierIds)` - Compare tiers
- `compareMaterials(materialIds)` - Compare materials
- `compareModules(moduleIds)` - Compare modules
- `getComparisonMetrics(type, items)` - Get comparison metrics
- `generateComparisonReport(type, items)` - Generate comparison report
- `getUpgradeRecommendations(current, target)` - Get upgrade recommendations

---

### 7. Module Engine (js/module-engine.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorModuleEngine` (class constructor)

**Purpose:** Independent module calculation engine

**Modules:**
- kitchen, wardrobe, tv_unit, bedroom, false_ceiling, bathroom, vanity, furniture

**Components:**
- materials, hardware, labor, installation

**Key Methods:**
- `init()` - Initialize module engine
- `calculateModuleCost(moduleId, specifications, tier)` - Calculate module cost
- `getModuleComponents(moduleId, tier)` - Get module components
- `getModuleFeatures(moduleId, tier)` - Get module features
- `getModuleBaseRate(moduleId)` - Get base rate
- `calculateComponentCost(component, specifications, tier)` - Calculate component cost
- `getAvailableModules()` - Get available modules
- `getModuleInfo(moduleId)` - Get module information

---

### 8. BOQ Engine (js/boq-engine.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorBOQEngine` (class constructor)

**Purpose:** Bill of Quantities generation engine

**Rooms:**
- living, dining, kitchen, bedroom, master_bedroom, guest_bedroom, kids_bedroom, balcony, bathroom, store

**Key Methods:**
- `init()` - Initialize BOQ engine
- `generateBOQ(projectData, tier)` - Generate complete BOQ
- `generateRoomBOQ(roomType, specifications, tier)` - Generate room BOQ
- `getBOQStructure()` - Get BOQ structure
- `calculateItemCost(material, qty, rate)` - Calculate item cost
- `exportBOQToCSV(boq)` - Export BOQ to CSV
- `getRoomBaseRate(roomType)` - Get room base rate
- `getAvailableRooms()` - Get available rooms

---

### 9. PDF Generator (js/pdf-generator.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorPDFGenerator` (class constructor)

**Purpose:** PDF generation using browser print functionality

**Key Methods:**
- `init()` - Initialize PDF generator
- `generateQuotation(projectData)` - Generate quotation PDF
- `generateBOQ(projectData)` - Generate BOQ PDF
- `generateReport(projectData)` - Generate report PDF
- `printPDF(content)` - Print content as PDF
- `configurePDF(config)` - Configure PDF settings
- `setBranding(branding)` - Set company branding

---

## Integration Layer Architecture

### 1. Estimator Engine (js/estimator-engine.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorEngine` (class constructor)

**Purpose:** Core calculation and business logic engine

**Dependency:** StateManager (passed in constructor)

**Sub-engines:**
- materialEngine
- budgetEngine
- recommendationEngine
- comparisonEngine
- storage
- validation
- packageEngine
- moduleEngine
- boqEngine
- pdfGenerator

**Key Methods:**
- `init()` - Initialize estimator engine
- `loadData()` - Load data from JSON files
- `loadJSON(path)` - Load JSON file
- `calculateCost(projectData)` - Calculate total cost
- `generatePackage(projectData)` - Generate package
- `generateRecommendations(projectData)` - Generate recommendations
- `generateComparison(projectData)` - Generate comparison
- `generateBOQ(projectData)` - Generate BOQ
- `generatePDF(projectData)` - Generate PDF
- `saveDraft(projectData)` - Save draft
- `loadDraft(draftId)` - Load draft

**Initialization Flow:**
1. Instantiate all sub-engines
2. Initialize storage
3. Load data files
4. Initialize engines with data
5. Initialize PDF generator (with fallback)

---

### 2. UI Manager (js/estimator-ui.js)

**Type:** Class (Constructor)

**Exports:** `window.EstimatorUI` (class constructor)

**Purpose:** UI management for estimator module

**Dependencies:** StateManager, Router (passed in constructor)

**Key Methods:**
- `init()` - Initialize UI manager
- `cacheElements()` - Cache DOM elements
- `bindEvents()` - Bind event handlers
- `renderProgress()` - Render progress indicator
- `renderStep(stepId)` - Render current step
- `hideLoading()` - Hide loading indicator
- `showLoading()` - Show loading indicator
- `showError(message)` - Show error message
- `showSuccess(message)` - Show success message
- `updateNavigationState()` - Update navigation buttons
- `handleNext()` - Handle next button
- `handlePrevious()` - Handle previous button
- `handleStepChange()` - Handle step change

---

## Application Layer Architecture

### Estimator App (js/estimator.js)

**Type:** Class (Constructor)

**Exports:** Constructor (not singleton)

**Purpose:** Estimator module entry point

**Dependencies:** estimator-bootstrap.js, all estimator modules

**Properties:**
- stateManager (populated by Bootstrap)
- router (populated by Bootstrap)
- ui (populated by Bootstrap)
- engine (populated by Bootstrap)
- storage (populated by Bootstrap)
- isInitialized
- isLoaded
- bootstrapResults

**Key Methods:**
- `init()` - Initialize application via Bootstrap
- `checkDraftResumption()` - Check for draft resumption
- `start()` - Start estimator
- `saveDraft()` - Save current draft
- `generateQuotation()` - Generate quotation
- `generateBOQ()` - Generate BOQ
- `reset()` - Reset estimator
- `showError(message)` - Show error
- `getStatus()` - Get application status
- `getDiagnostics()` - Get diagnostics
- `destroy()` - Destroy application

**Initialization Flow:**
1. Check if Bootstrap is available
2. Run Bootstrap
3. Extract results from Bootstrap
4. Assign instances from Bootstrap results
5. Check for draft resumption
6. Set initialized flag
7. Log diagnostic summary

---

## Data Flow Architecture

### User Input Flow

```
User Input
↓
UI Manager (estimator-ui.js)
↓
State Manager (estimator-state.js)
↓
Validation Engine (validation.js)
↓
Estimator Engine (estimator-engine.js)
↓
Sub-engines (material, package, budget, etc.)
↓
Calculation Results
↓
UI Manager (display results)
```

### Data Loading Flow

```
Bootstrap (estimator-bootstrap.js)
↓
Load JSON files (materials.json, pricing-rules.json, etc.)
↓
Estimator Engine (estimator-engine.js)
↓
Initialize sub-engines with data
↓
Engines ready for calculations
```

### Draft Saving Flow

```
User completes step
↓
UI Manager
↓
State Manager (update state)
↓
Storage Manager (save draft to IndexedDB)
↓
Draft ID stored
↓
Draft available for resumption
```

---

## Wizard Architecture

### Step Structure

```
Step 1: Category
├── Residential
└── Commercial

Step 2: Type
├── New Construction
└── Renovation

Step 3: Information
├── Project details
├── Location
└── Timeline

Step 4: Requirements
├── Rooms
├── Modules
└── Special requirements

Step 5: Style
├── Material tier
└── Design style

Step 6: Package
├── Basic
├── Medium
└── Premium

Step 7: Budget
├── Budget range
└── Budget constraints

Step 8: Contact
├── Client details
└── Submission
```

### Navigation Flow

```
Step 1 → Step 2 → Step 3 → Step 4 → Step 5 → Step 6 → Step 7 → Step 8
  ↑         ↓         ↓         ↓         ↓         ↓         ↓         ↓
  └─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
                    (Previous/Next navigation)
```

---

## Error Handling Architecture

### Bootstrap Error Handling

```
Module fails to load
↓
Log error to diagnostic
↓
Continue with remaining modules
↓
Skip failed module
↓
Application continues with available modules
```

### Runtime Error Handling

```
Error occurs in engine
↓
Try/catch block catches error
↓
Log error to console
↓
Show error message to user
↓
Application continues gracefully
```

### Data Loading Error Handling

```
Data file fails to load
↓
Log error to diagnostic
↓
Continue with remaining data files
↓
Skip failed data file
↓
Application continues with available data
```

---

## Estimator Architecture Summary

**Total JS Files:** 18  
**Bootstrap Files:** 1  
**Core Files:** 3  
**Engine Files:** 9  
**Integration Files:** 2  
**Application Files:** 1  
**Singleton Pattern:** 2 (Storage, State)  
**Constructor Pattern:** 11  
**Bootstrap Pattern:** 1  
**Total Lines:** ~8,000+  
**Data Files:** 4 JSON files  
**Wizard Steps:** 8  
**Sub-engines:** 9  
**Error Handling:** Graceful failure with diagnostics
