# Estimator Architecture Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\pages\estimator\`  
**Last Updated:** 2026-07-31

---

## Overview

The Estimator is a sophisticated multi-step wizard application for calculating interior design costs. It features dynamic step navigation, state management, material selection, budget calculation, and PDF generation.

---

## Estimator Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Estimator Page                        │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Bootstrap  │→ │   Engine     │→ │      UI      │  │
│  │   Loader     │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         ↓                  ↓                  ↓            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Modules    │  │     State    │  │   Router     │  │
│  │              │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         ↓                  ↓                  ↓            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Storage    │  │    Data      │  │  Validation  │  │
│  │              │  │   (JSON)     │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Core Modules

### 1. Bootstrap Loader

**File:** `js/estimator-bootstrap.js`

**Purpose:** Orchestrate estimator initialization with error resilience

**Responsibilities:**
- Load modules in correct order
- Validate module availability
- Handle initialization errors
- Load data files
- Provide diagnostic logging

**Module Loading Order:**
1. Storage (singleton)
2. State (singleton)
3. Validation (constructor)
4. Router (constructor, requires state)
5. MaterialEngine (constructor)
6. PackageEngine (constructor)
7. BudgetEngine (constructor)
8. RecommendationEngine (constructor)
9. ComparisonEngine (constructor)
10. ModuleEngine (constructor)
11. BOQEngine (constructor)
12. PDFGenerator (constructor)
13. EstimatorEngine (constructor, requires state)
14. UI (constructor, requires state and router)

**Data Files Loading:**
- Materials JSON
- Pricing Rules JSON
- Recommendations JSON
- Upgrade Rules JSON

---

### 2. State Manager

**File:** `js/estimator-state.js`

**Purpose:** Centralized state management with subscription pattern

**Pattern:** Singleton

**State Structure:**
```javascript
{
  // Wizard navigation
  currentStep: 1,
  totalSteps: 8,
  canProceed: false,
  canGoBack: false,
  
  // Project Basics
  projectCategory: null,
  projectType: null,
  projectInfo: {},
  
  // Package selection
  selectedPackage: null,
  packageTier: null,
  
  // Budget
  budget: null,
  budgetRange: null,
  budgetType: 'known',
  
  // Rooms
  rooms: [],
  roomCount: 0,
  
  // Custom Services
  selectedCustomServices: [],
  
  // Modules
  selectedModules: [],
  moduleCount: 0,
  
  // Client details
  clientDetails: {
    name: null,
    email: null,
    phone: null,
    city: null,
    notes: null
  },
  
  // Material tier & Style
  designStyle: null,
  materialTier: null,
  
  // Comparison data
  comparisonData: null,
  
  // Recommendations
  recommendations: [],
  
  // Validation status
  validationStatus: {
    currentStep: false,
    overall: false
  },
  
  // Draft status
  isDraft: false,
  draftId: null,
  lastSaved: null,
  
  // Calculation results
  calculations: {
    subtotal: 0,
    tax: 0,
    total: 0,
    breakdown: {}
  },
  
  // UI state
  ui: {
    isLoading: false,
    isSaving: false,
    error: null
  }
}
```

**Key Methods:**
- `getState()` - Get current state
- `get(path)` - Get specific property
- `set(path, value)` - Set property
- `setMany(updates)` - Set multiple properties
- `reset()` - Reset to initial state
- `subscribe(callback)` - Subscribe to changes
- `undo()` - Undo last change
- `redo()` - Redo last change
- `export()` - Export state
- `import(data)` - Import state

---

### 3. Router

**File:** `js/estimator-router.js`

**Purpose:** Dynamic wizard step navigation

**Pattern:** Constructor (requires state)

**Dynamic Flow:**
- **Custom Services Flow (4 steps):**
  1. Category
  2. Services Selection
  3. Budget
  4. Contact

- **Standard Full Interior Flow (8 steps):**
  1. Category
  2. Type
  3. Information
  4. Requirements
  5. Style
  6. Package
  7. Budget
  8. Contact

**Key Methods:**
- `next()` - Navigate to next step
- `previous()` - Navigate to previous step
- `goTo(stepId)` - Navigate to specific step
- `canNavigateTo(stepId)` - Check navigation permission
- `addGuard(stepId, guard)` - Add navigation guard
- `getStep(stepId)` - Get step information
- `getCurrentStep()` - Get current step
- `getAllSteps()` - Get all steps for current flow

**Navigation Guards:**
- Prevent navigation without validation
- Custom guard functions per step
- State-based validation

---

### 4. UI Controller

**File:** `js/estimator-ui.js`

**Purpose:** UI rendering and user interaction

**Pattern:** Constructor (requires state and router)

**Responsibilities:**
- Render wizard steps
- Handle form inputs
- Update progress bar
- Display validation errors
- Show loading states
- Handle user interactions

**Key Methods:**
- `render()` - Render current step
- `renderStep(stepId)` - Render specific step
- `updateProgress()` - Update progress bar
- `showError(message)` - Display error
- `showLoading()` - Show loading state
- `hideLoading()` - Hide loading state
- `handleInput(event)` - Handle form input
- `handleNavigation(direction)` - Handle navigation

---

### 5. Storage Engine

**File:** `js/storage.js`

**Purpose:** Data persistence (IndexedDB + localStorage)

**Pattern:** Singleton

**Storage System:**
- **IndexedDB:** Primary storage for drafts and cache
- **localStorage:** Fallback storage
- **Session Storage:** Temporary cache

**Storage Keys:**
```javascript
{
  draft: 'estimator_draft',
  drafts: 'estimator_drafts',
  settings: 'estimator_settings',
  cache: 'estimator_cache'
}
```

**IndexedDB Stores:**
- `drafts` - Draft estimates
- `cache` - Cached data

**Key Methods:**
- `init()` - Initialize storage
- `saveDraft(data)` - Save draft
- `loadDraft(draftId)` - Load draft
- `deleteDraft(draftId)` - Delete draft
- `listDrafts()` - List all drafts
- `saveToCache(key, data)` - Save to cache
- `loadFromCache(key)` - Load from cache

---

## Feature Engines

### 1. Material Engine

**File:** `js/material-engine.js`

**Purpose:** Material selection and pricing

**Responsibilities:**
- Filter materials by category
- Calculate material costs
- Apply tier-based pricing
- Generate material recommendations

**Material Categories:**
- Automation
- Boards
- Electrical
- False Ceiling
- Finishes
- Glass
- Hardware
- Kitchen Accessories
- Laminates
- Lighting
- Paint
- Plumbing
- Plywood
- Stone
- Wardrobe Accessories

**Material Tiers:**
- Essential
- Premium
- Luxury
- Elite

---

### 2. Package Engine

**File:** `js/package-engine.js`

**Purpose:** Package calculation and selection

**Responsibilities:**
- Calculate package costs
- Compare packages
- Generate package recommendations
- Apply package discounts

**Package Tiers:**
- Essential
- Premium
- Luxury
- Elite

---

### 3. Budget Engine

**File:** `js/budget-engine.js`

**Purpose:** Budget calculation and analysis

**Responsibilities:**
- Calculate total cost
- Generate cost breakdown
- Compare with budget
- Budget optimization

**Cost Components:**
- Materials
- Labor
- Overhead
- Contingency
- Tax

---

### 4. Module Engine

**File:** `js/module-engine.js`

**Purpose:** Module calculation

**Responsibilities:**
- Calculate module costs
- Area-based pricing
- Module selection
- Module recommendations

**Module Types:**
- Kitchen
- Wardrobe
- Bathroom
- Living Room
- Bedroom
- Dining Room
- Office
- Entertainment

---

### 5. BOQ Engine

**File:** `js/boq-engine.js`

**Purpose:** Bill of Quantities generation

**Responsibilities:**
- Generate BOQ
- Material quantification
- Labor calculation
- BOQ formatting

**BOQ Sections:**
- Materials
- Labor
- Equipment
- Overhead
- Miscellaneous

---

### 6. Comparison Engine

**File:** `js/comparison-engine.js`

**Purpose:** Package comparison

**Responsibilities:**
- Compare packages
- Cost analysis
- Feature comparison
- Recommendation generation

---

### 7. Recommendation Engine

**File:** `js/recommendation-engine.js`

**Purpose:** Smart recommendations

**Responsibilities:**
- Style-based recommendations
- Budget-based recommendations
- Material recommendations
- Package recommendations

---

### 8. PDF Generator

**File:** `js/pdf-generator.js`

**Purpose:** PDF generation

**Responsibilities:**
- Generate quote PDF
- Generate BOQ PDF
- Generate report PDF

**PDF Types:**
- Quote
- BOQ
- Detailed Report

---

### 9. Validation

**File:** `js/validation.js`

**Purpose:** Form validation

**Responsibilities:**
- Validate form inputs
- Validate step completion
- Display validation errors
- Validation rules

**Validation Rules:**
- Required fields
- Email format
- Phone format
- Numeric ranges
- Custom rules

---

## Estimator Flow

### Initialization Flow

```
1. Page Load
   ↓
2. Bootstrap Loader Init
   ↓
3. Load Helpers
   ↓
4. Load Storage (Singleton)
   ↓
5. Load State (Singleton)
   ↓
6. Load Validation
   ↓
7. Load Router (requires State)
   ↓
8. Load Engines
   ↓
9. Load EstimatorEngine (requires State)
   ↓
10. Load UI (requires State, Router)
    ↓
11. Load Data Files
    ↓
12. Initialize Router
    ↓
13. Render Wizard
    ↓
14. Ready for User Input
```

### User Flow

```
1. User selects Category
   ↓
2. Router adjusts steps based on category
   ↓
3. User completes each step
   ↓
4. Validation checks each step
   ↓
5. State updates on valid input
   ↓
6. Navigation to next step
   ↓
7. Repeat until final step
   ↓
8. Generate results
   ↓
9. Show summary
   ↓
10. Download PDF / Save Draft
```

---

## Estimator Data

### Data Files

**Location:** `data/estimator/`

**Files:**
- `materials.json` - Materials library schema
- `materials/*.json` - Material categories
- `pricing-rules.json` - Pricing calculation rules
- `recommendations.json` - Recommendation data
- `upgrade-rules.json` - Material upgrade rules
- `validation-rules.json` - Form validation rules
- `package-library.json` - Package configurations
- `room-library.json` - Room type definitions
- `styles.json` - Design style definitions
- `modules.json` - Module definitions
- `brands.json` - Brand information
- `cities.json` - City/location data
- `hardware.json` - Hardware specifications

---

## Estimator UI

### UI Components

**Loading State:**
```html
<div id="estimator-loading" class="estimator-loading">
  <div class="estimator-loading__spinner"></div>
  <div class="estimator-loading__text">Loading estimator...</div>
</div>
```

**Wizard Container:**
```html
<div id="estimator-wizard" class="estimator-wizard">
  <div class="estimator-progress">
    <div class="estimator-progress__bar"></div>
    <div class="estimator-progress__steps"></div>
  </div>
  
  <div id="estimator-step-container" class="estimator-step-container">
    <!-- Steps rendered dynamically -->
  </div>
  
  <div class="estimator-navigation">
    <button id="estimator-back" class="estimator-button--back">Back</button>
    <button id="estimator-next" class="estimator-button--next">Next</button>
  </div>
</div>
```

**Summary View:**
```html
<div id="estimator-summary" class="estimator-summary">
  <!-- Summary content -->
</div>
```

---

## Estimator Features

### Dynamic Wizard
- Category-based step flow
- Conditional step display
- Navigation guards
- Deep linking support

### State Management
- Centralized state store
- Subscription pattern
- History (undo/redo)
- State persistence

### Draft Management
- Auto-save drafts
- Manual save
- Draft resumption
- Draft listing

### Validation
- Real-time validation
- Step completion validation
- Custom validation rules
- Error display

### Calculations
- Real-time cost calculation
- Material cost calculation
- Labor cost calculation
- Package comparison

### PDF Generation
- Quote PDF
- BOQ PDF
- Detailed report
- Download functionality

---

## Estimator Performance

### Optimization Techniques
- Lazy loading of data
- Cached calculations
- Debounced inputs
- Optimized rendering

### Loading Performance
- Progressive loading
- Graceful degradation
- Error handling
- Diagnostic logging

---

## Notes

- Sophisticated bootstrap loader
- Dynamic wizard flow
- Singleton pattern for core modules
- Constructor pattern for feature modules
- Comprehensive state management
- IndexedDB + localStorage persistence
- Graceful failure handling
- Diagnostic logging for debugging

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
