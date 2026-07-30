# 09_DATA_FLOW.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete data flow analysis across the application

---

## Data Flow Overview

The application has two distinct data flow patterns:
1. **Main Site Data Flow:** Loads data from `data/database.json` for pages
2. **Estimator Module Data Flow:** Loads data from multiple JSON files for calculations

---

## Main Site Data Flow

### 1. Database Loading Flow

```
User visits page (Home, About, Services, Projects, Gallery, Contact)
↓
HTML parsing completes
↓
JavaScript loads (deferred)
↓
core/app.js executes
↓
loadPageModule() executes
↓
Page-specific JS loads (home.js, projects.js, etc.)
↓
Page JS calls loadData()
↓
Fetch request to data/database.json
↓
window.resolveAssetPath resolves path
↓
JSON data loaded
↓
Data processed and rendered
```

### 2. Database.json Structure

**File:** `data/database.json`

**Purpose:** Central database for main site content

**Data Sections:**
- Company information
- Services data
- Projects data
- Gallery data
- Team data
- Testimonials data
- FAQ data

### 3. Home Page Data Flow

```
home.js loads
↓
initHeroBackgrounds() executes
↓
window.resolveAssetPath resolves hero image path
↓
Hero background image set
↓
loadData() executes
↓
Fetch data/database.json
↓
Process data:
  ├─ Render trust indicators
  ├─ Render features
  ├─ Render services section
  ├─ Render projects section
  ├─ Render testimonials
  └─ Render partners
↓
Data rendered to DOM
```

### 4. Projects Page Data Flow

```
projects.js loads
↓
loadData() executes
↓
Fetch data/database.json
↓
Process projects data:
  ├─ Render project cards
  ├─ Set up filters
  ├─ Set up search
  └─ Set up pagination
↓
User interacts:
  ├─ Filter by category
  ├─ Search by query
  └─ Load more projects
↓
Data filtered and re-rendered
```

### 5. Schema.org Data Flow

```
core/schema.js loads
↓
initSchema() executes
↓
Fetch data/database.json
↓
Determine current page
↓
Generate appropriate schema:
  ├─ Home → LocalBusiness, Organization
  ├─ About → Organization, LocalBusiness
  ├─ Services → Service schema
  ├─ Projects → ItemList schema
  ├─ Gallery → ImageObject schema
  └─ Contact → ContactPoint schema
↓
Schema injected into DOM
↓
SEO enhanced
```

---

## Estimator Module Data Flow

### 1. Estimator Data Loading Flow

```
User visits Estimator page
↓
HTML parsing completes
↓
JavaScript loads (deferred, in order)
↓
estimator-bootstrap.js loads
↓
Bootstrap.bootstrap() executes
↓
Phase 1: Load core modules
  ├─ Storage (singleton)
  ├─ State (singleton)
  └─ Validation (constructor)
↓
Phase 2: Load Router
  ├─ Router (constructor with state)
  └─ Router.init()
↓
Phase 3: Load data files
  ├─ Fetch data/estimator/materials.json
  ├─ Fetch data/estimator/pricing-rules.json
  ├─ Fetch data/estimator/recommendations.json
  └─ Fetch data/estimator/upgrade-rules.json
↓
Phase 4: Load engine modules
  ├─ MaterialEngine
  ├─ PackageEngine
  ├─ BudgetEngine
  ├─ RecommendationEngine
  ├─ ComparisonEngine
  ├─ ModuleEngine
  ├─ BOQEngine
  └─ PDFGenerator
↓
Phase 5: Load Estimator Engine
  ├─ EstimatorEngine (constructor with state)
  ├─ EstimatorEngine.init()
  ├─ Instantiate all sub-engines
  ├─ Initialize storage
  ├─ Load data files
  └─ Initialize engines with data
↓
Phase 6: Load UI
  ├─ UI (constructor with state and router)
  ├─ UIManager.init()
  ├─ Cache elements
  ├─ Bind events
  ├─ Render progress
  └─ Hide loading
↓
Estimator ready for user interaction
```

### 2. Estimator JSON Data Files

#### materials.json

**Path:** `data/estimator/materials.json`

**Purpose:** Material database for calculations

**Data Structure:**
```json
{
  "materials": {
    "flooring": [...],
    "walls": [...],
    "ceiling": [...],
    "furniture": [...],
    "lighting": [...],
    "accessories": [...],
    "hardware": [...]
  },
  "tiers": {
    "essential": {...},
    "premium": {...},
    "luxury": {...},
    "elite": {...}
  }
}
```

**Used By:**
- MaterialEngine
- PackageEngine
- ModuleEngine
- BOQEngine

---

#### pricing-rules.json

**Path:** `data/estimator/pricing-rules.json`

**Purpose:** Pricing rules and multipliers

**Data Structure:**
```json
{
  "baseRates": {
    "living": 600,
    "dining": 550,
    "kitchen": 1200,
    ...
  },
  "components": {
    "materials": {...},
    "labor": {...},
    "design": {...},
    "installation": {...}
  },
  "gstRate": 18
}
```

**Used By:**
- BudgetEngine
- PackageEngine
- ModuleEngine
- BOQEngine

---

#### recommendations.json

**Path:** `data/estimator/recommendations.json`

**Purpose:** Recommendation rules and data

**Data Structure:**
```json
{
  "materialRecommendations": [...],
  "tierRecommendations": [...],
  "moduleRecommendations": [...],
  "styleRecommendations": [...]
}
```

**Used By:**
- RecommendationEngine

---

#### upgrade-rules.json

**Path:** `data/estimator/upgrade-rules.json`

**Purpose:** Upgrade cost calculations

**Data Structure:**
```json
{
  "tierUpgrades": {
    "essential_to_premium": {...},
    "premium_to_luxury": {...},
    "luxury_to_elite": {...}
  }
}
```

**Used By:**
- RecommendationEngine
- ComparisonEngine

---

### 3. User Input Data Flow

```
User enters data in wizard
↓
UI Manager captures input
↓
Validation Engine validates input
↓
State Manager updates state
↓
State change notification sent
↓
UI Manager re-renders if needed
↓
Navigation state updated
↓
User can proceed to next step
```

### 4. Calculation Data Flow

```
User completes wizard
↓
User clicks "Generate Estimate"
↓
UI Manager triggers calculation
↓
Estimator Engine coordinates calculation:
  ├─ MaterialEngine calculates material costs
  ├─ PackageEngine generates packages
  ├─ BudgetEngine calculates budget
  ├─ ModuleEngine calculates module costs
  ├─ BOQEngine generates BOQ
  └─ RecommendationEngine generates recommendations
↓
Calculation results stored in State
↓
UI Manager renders results
↓
User can view/download results
```

### 5. Draft Saving Data Flow

```
User completes step
↓
UI Manager triggers draft save
↓
State Manager captures current state
↓
Storage Manager saves draft:
  ├─ Save to IndexedDB (primary)
  └─ Fallback to localStorage
↓
Draft ID stored in State
↓
Draft available for resumption
```

### 6. Draft Resumption Data Flow

```
User visits Estimator page
↓
Bootstrap executes
↓
Router checks for draft resumption
↓
Storage Manager loads draft:
  ├─ Load from IndexedDB (primary)
  └─ Fallback to localStorage
↓
State Manager restores state from draft
↓
Router navigates to saved step
↓
UI Manager renders step
↓
User can continue from where they left off
```

### 7. PDF Generation Data Flow

```
User clicks "Generate PDF"
↓
UI Manager triggers PDF generation
↓
Estimator Engine calls PDF Generator
↓
PDF Generator formats data:
  ├─ Generate quotation PDF
  ├─ Generate BOQ PDF
  └─ Generate report PDF
↓
PDF Generator uses browser print functionality
↓
PDF generated and downloaded
```

---

## State Management Data Flow

### 1. State Update Flow

```
User action or system event
↓
State Manager.set(key, value) called
↓
State updated
↓
State Manager.notify() called
↓
All subscribers notified
↓
Subscribers react to state change
```

### 2. State Subscription Flow

```
Module subscribes to state changes
↓
State Manager.subscribe(callback) called
↓
Callback added to subscribers list
↓
State changes occur
↓
Callback executed with new state
↓
Module updates based on new state
```

### 3. State History Flow

```
State change occurs
↓
State Manager saves previous state to history
↓
User can undo
↓
State Manager.undo() called
↓
Previous state restored
↓
Subscribers notified
↓
UI re-rendered
```

---

## Storage Data Flow

### 1. IndexedDB Storage Flow

```
Storage operation requested
↓
Storage Manager checks IndexedDB availability
↓
IndexedDB operation executed:
  ├─ saveDraft() → drafts store
  ├─ loadDraft() → drafts store
  ├─ deleteDraft() → drafts store
  ├─ saveCalculation() → calculations store
  ├─ loadCalculation() → calculations store
  ├─ cacheData() → cache store
  └─ getCachedData() → cache store
↓
Operation result returned
↓
Error handled with fallback to localStorage
```

### 2. localStorage Fallback Flow

```
IndexedDB operation fails
↓
Storage Manager catches error
↓
Fallback to localStorage:
  ├─ saveDraft() → localStorage.setItem()
  ├─ loadDraft() → localStorage.getItem()
  ├─ deleteDraft() → localStorage.removeItem()
  └─ clearAll() → localStorage.clear()
↓
Operation result returned
↓
Error logged to console
```

---

## UI Rendering Data Flow

### 1. Step Rendering Flow

```
Router navigates to step
↓
State Manager updates currentStep
↓
UI Manager.renderStep(stepId) called
↓
UI Manager retrieves step data from State
↓
UI Manager renders step HTML:
  ├─ Clear previous step
  ├─ Render new step
  ├─ Bind step-specific events
  └─ Update navigation state
↓
Step visible to user
```

### 2. Progress Rendering Flow

```
Step changes
↓
State Manager updates currentStep
↓
UI Manager.renderProgress() called
↓
UI Manager calculates progress percentage
↓
UI Manager updates progress bar:
  ├─ Update progress line width
  ├─ Update step indicators
  └─ Update active/inactive states
↓
Progress visible to user
```

### 3. Error Display Flow

```
Error occurs
↓
Error caught by try/catch
↓
Error logged to console
↓
UI Manager.showError(message) called
↓
UI Manager displays error message:
  ├─ Show error banner
  └─ Display error details
↓
Error visible to user
```

---

## Asset Path Resolution Data Flow

### 1. Asset Path Resolution Flow

```
Asset path requested
↓
window.resolveAssetPath(path) called
↓
Check if window.resolveAssetPath exists
↓
If exists (from helpers.js or app.js):
  ├─ Get base URL from window.getBaseUrl()
  ├─ Strip leading slash from path
  ├─ Prepend base URL
  └─ Return resolved path
↓
If not exists (fallback in bootstrap):
  ├─ Use browser-native URL resolution
  ├─ new URL(relativePath, window.location.href)
  └─ Return resolved path
↓
Asset loads correctly
```

### 2. GitHub Pages Path Resolution

```
GitHub Pages URL: https://username.github.io/repo-name/
↓
window.getBaseUrl() extracts repository name
↓
Base URL: /repo-name/
↓
Asset path: assets/images/logo.png
↓
Resolved path: /repo-name/assets/images/logo.png
↓
Asset loads correctly
```

---

## Data Flow Summary

**Main Site Data Flow:**
- Single JSON file (database.json)
- Loaded by page-specific JavaScript
- Rendered to DOM
- No state persistence

**Estimator Data Flow:**
- Multiple JSON files (4 files)
- Loaded by Bootstrap
- Stored in State Manager
- Persisted in IndexedDB/localStorage
- Complex calculation pipeline

**State Management:**
- Centralized state store
- Subscription pattern for updates
- History for undo/redo
- Draft resumption capability

**Storage:**
- IndexedDB (primary)
- localStorage (fallback)
- Draft persistence
- Calculation caching

**UI Rendering:**
- Step-based rendering
- Progress updates
- Error display
- Dynamic updates based on state

**Asset Resolution:**
- Single resolver function
- GitHub Pages compatible
- Browser-native URL API
- Fallback mechanism
