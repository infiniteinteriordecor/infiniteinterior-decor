# Data Flow Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

This document describes the data flow throughout the Infinite Interior Decor application, including user input, state management, storage, and external data loading.

---

## Data Flow Architecture

### High-Level Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │────▶│    UI       │────▶│   State     │
│   Input     │     │   Layer     │     │  Manager    │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ↓
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Storage   │◀────│   Engines   │◀────│  State      │
│   Layer     │     │  (Calc)     │     │  Updates    │
└─────────────┘     └─────────────┘     └─────────────┘
     │
     ↓
┌─────────────┐
│   External  │
│   Data      │
│  (JSON)     │
└─────────────┘
```

---

## Page Load Data Flow

### Homepage Data Flow

```
1. Browser Request
   ↓
2. HTML Download
   ↓
3. CSS Download & Parse
   ↓
4. JavaScript Download & Execute
   ↓
5. app.js Initialization
   ↓
6. Base URL Detection
   ↓
7. Core Module Loading
   ├─ Navbar.init()
   ├─ ImagePlaceholder.init()
   └─ Schema.init()
   ↓
8. Page Module Loading
   └─ Home.init()
   ↓
9. Performance Optimizations
   ├─ Predictive Prefetching
   ├─ Background Data Hydration
   ├─ Image Preloading
   └─ Drag-to-Scroll
   ↓
10. Ready for User Interaction
```

### Estimator Page Data Flow

```
1. Browser Request
   ↓
2. HTML Download
   ↓
3. CSS Download & Parse
   ├─ estimator.css
   ├─ estimator-layout.css
   ├─ estimator-components.css
   ├─ estimator-responsive.css
   └─ estimator-animations.css
   ↓
4. JavaScript Download & Execute
   ├─ helpers.js
   ├─ storage.js
   ├─ estimator-state.js
   ├─ estimator-router.js
   ├─ estimator-bootstrap.js
   └─ estimator.js
   ↓
5. Bootstrap Loader Init
   ↓
6. Module Loading (in order)
   ├─ Storage (singleton)
   ├─ State (singleton)
   ├─ Validation
   ├─ Router (requires state)
   ├─ MaterialEngine
   ├─ PackageEngine
   ├─ BudgetEngine
   ├─ RecommendationEngine
   ├─ ComparisonEngine
   ├─ ModuleEngine
   ├─ BOQEngine
   ├─ PDFGenerator
   ├─ EstimatorEngine (requires state)
   └─ UI (requires state, router)
   ↓
7. Data File Loading
   ├─ materials.json
   ├─ pricing-rules.json
   ├─ recommendations.json
   └─ upgrade-rules.json
   ↓
8. Router Initialization
   ├─ Check deep link
   ├─ Check draft resumption
   └─ Set initial step
   ↓
9. UI Rendering
   ├─ Show loading state
   ├─ Render wizard
   └─ Hide loading state
   ↓
10. Ready for User Input
```

---

## User Input Data Flow

### Estimator Wizard Input Flow

```
1. User enters data in form
   ↓
2. UI Layer captures input
   ↓
3. Validation layer validates
   ├─ Check required fields
   ├─ Check format
   └─ Check rules
   ↓
4. If invalid
   ├─ Show error message
   └─ Prevent navigation
   ↓
5. If valid
   ├─ Update state
   ├─ Trigger state change event
   └─ Notify subscribers
   ↓
6. State subscribers react
   ├─ Engine recalculates
   ├─ UI updates
   └─ Storage saves draft
   ↓
7. Enable navigation
   ↓
8. User can proceed to next step
```

### State Update Flow

```
1. UI calls state.set(path, value)
   ↓
2. State Manager processes
   ├─ Save to history
   ├─ Update state
   └─ Trigger notify()
   ↓
3. State.notify() called
   ↓
4. All subscribers notified
   ├─ UI subscriber
   ├─ Engine subscriber
   └─ Storage subscriber
   ↓
5. Subscribers react
   ├─ UI re-renders
   ├─ Engine recalculates
   └─ Storage persists
   ↓
6. Updated state reflected
```

---

## Storage Data Flow

### Draft Save Flow

```
1. User triggers save (manual or auto)
   ↓
2. UI Layer calls storage.saveDraft(state)
   ↓
3. Storage Engine processes
   ├─ Generate draft ID
   ├─ Add metadata (created, updated)
   └─ Prepare draft object
   ↓
4. Save to IndexedDB
   ├─ Open transaction
   ├─ Put draft in drafts store
   └─ Commit transaction
   ↓
5. Save current draft ID to localStorage
   ↓
6. Update state
   ├─ Set isDraft = true
   ├─ Set draftId
   └─ Set lastSaved
   ↓
7. UI shows save confirmation
```

### Draft Load Flow

```
1. User selects draft to load
   ↓
2. UI Layer calls storage.loadDraft(draftId)
   ↓
3. Storage Engine processes
   ├─ Open transaction
   ├─ Get draft from drafts store
   └─ Return draft data
   ↓
4. State Manager imports
   ├─ Parse draft data
   ├─ Update state
   └─ Set draft metadata
   ↓
5. Router adjusts
   ├─ Set current step from draft
   └─ Update navigation state
   ↓
6. UI renders draft state
   ↓
7. User can continue editing
```

---

## External Data Flow

### JSON Data Loading Flow

```
1. Bootstrap Loader initiates data load
   ↓
2. Fetch request for data file
   ├─ materials.json
   ├─ pricing-rules.json
   ├─ recommendations.json
   └─ upgrade-rules.json
   ↓
3. Browser fetches file
   ↓
4. Response received
   ↓
5. Parse JSON
   ↓
6. Validate data
   ├─ Check structure
   ├─ Check required fields
   └─ Check data types
   ↓
7. Store in memory
   ├─ Materials data
   ├─ Pricing rules
   ├─ Recommendations
   └─ Upgrade rules
   ↓
8. Cache in storage (optional)
   ↓
9. Data available for engines
   ↓
10. Engines use data for calculations
```

### Background Data Hydration Flow

```
1. Page loads
   ↓
2. app.js initBackgroundDataHydration()
   ↓
3. Check sessionStorage for cached data
   ↓
4. If cached
   └─ Skip (data already available)
   ↓
5. If not cached
   ├─ Use requestIdleCallback (if available)
   └─ Fallback to setTimeout
   ↓
6. Fetch database.json
   ↓
7. Parse JSON
   ↓
8. Store in sessionStorage
   ↓
9. Data available for future use
```

---

## Calculation Data Flow

### Cost Calculation Flow

```
1. User completes wizard steps
   ↓
2. State contains all inputs
   ├─ Project type
   ├─ Rooms/Modules
   ├─ Material tier
   ├─ Design style
   └─ Budget
   ↓
3. Budget Engine processes
   ├─ Load pricing rules
   ├─ Calculate material costs
   ├─ Calculate labor costs
   ├─ Add overhead
   ├─ Add contingency
   └─ Add tax
   ↓
4. State updates calculations
   ├─ subtotal
   ├─ tax
   ├─ total
   └─ breakdown
   ↓
5. UI displays results
   ├─ Total cost
   ├─ Cost breakdown
   └─ Comparison data
   ↓
6. User can download PDF
```

### Material Selection Flow

```
1. User selects material tier
   ↓
2. State updates materialTier
   ↓
3. Material Engine processes
   ├─ Filter materials by tier
   ├─ Calculate material costs
   └─ Generate recommendations
   ↓
4. State updates
   ├─ selectedMaterials
   ├─ materialCosts
   └─ recommendations
   ↓
5. UI displays materials
   ├─ Material list
   ├─ Material costs
   └─ Recommendations
   ↓
6. User can adjust selection
```

---

## PDF Generation Data Flow

### Quote PDF Generation Flow

```
1. User clicks "Download Quote"
   ↓
2. UI Layer calls PDFGenerator.generateQuote(state)
   ↓
3. PDF Generator processes
   ├─ Gather state data
   ├─ Format data for PDF
   ├─ Generate PDF content
   └─ Create PDF blob
   ↓
4. Download triggered
   ├─ Create download link
   ├─ Trigger click
   └─ Clean up
   ↓
5. PDF file downloaded
```

### BOQ PDF Generation Flow

```
1. User clicks "Download BOQ"
   ↓
2. UI Layer calls PDFGenerator.generateBOQ(state)
   ↓
3. BOQ Engine processes
   ├─ Calculate quantities
   ├─ Generate BOQ structure
   └─ Format BOQ data
   ↓
4. PDF Generator processes
   ├─ Receive BOQ data
   ├─ Format for PDF
   ├─ Generate PDF content
   └─ Create PDF blob
   ↓
5. Download triggered
   ├─ Create download link
   ├─ Trigger click
   └─ Clean up
   ↓
6. PDF file downloaded
```

---

## Navigation Data Flow

### Step Navigation Flow

```
1. User clicks "Next" button
   ↓
2. UI Layer calls router.next()
   ↓
3. Router checks
   ├─ Can navigate to next step?
   ├─ Navigation guards allow?
   └─ Step valid?
   ↓
4. If not allowed
   ├─ Show error
   └─ Prevent navigation
   ↓
5. If allowed
   ├─ Update current step
   ├─ Update navigation state
   └─ Notify state
   ↓
6. State updates
   ├─ currentStep
   ├─ canProceed
   └─ canGoBack
   ↓
7. UI re-renders
   ├─ New step content
   ├─ Update progress bar
   └─ Update navigation buttons
   ↓
8. User can interact with new step
```

### Deep Link Flow

```
1. User navigates to URL with ?step=N
   ↓
2. Page loads
   ↓
3. Router checks deep link
   ├─ Parse URL parameter
   ├─ Validate step number
   └─ Set current step
   ↓
4. Router checks navigation guards
   ├─ Can navigate to step?
   └─ Guards allow?
   ↓
5. If not allowed
   ├─ Redirect to step 1
   └─ Show error
   ↓
6. If allowed
   ├─ Set current step
   ├─ Update state
   └─ Render step
   ↓
7. User lands on requested step
```

---

## Error Handling Data Flow

### Error Flow

```
1. Error occurs
   ├─ Network error
   ├─ Validation error
   ├─ Calculation error
   └─ Storage error
   ↓
2. Error caught
   ├─ Try-catch block
   └─ Error handler
   ↓
3. Error logged
   ├─ Console error
   ├─ Diagnostic log
   └─ State error
   ↓
4. UI informed
   ├─ Show error message
   ├─ Show error state
   └─ Provide recovery options
   ↓
5. Graceful degradation
   ├─ Use fallback data
   ├─ Retry operation
   └─ Continue with reduced functionality
   ↓
6. User can continue
```

---

## Data Flow Diagrams

### Complete Estimator Data Flow

```
User Input
    ↓
UI Layer
    ↓
Validation Layer
    ↓
State Manager ←→ History
    ↓
    ├─→ Storage Engine ←→ IndexedDB
    ├─→ localStorage
    └─→ sessionStorage
    ↓
Engines
    ├─ Material Engine
    ├─ Package Engine
    ├─ Budget Engine
    ├─ Module Engine
    ├─ BOQ Engine
    ├─ Comparison Engine
    └─ Recommendation Engine
    ↓
External Data
    ├─ materials.json
    ├─ pricing-rules.json
    ├─ recommendations.json
    └─ upgrade-rules.json
    ↓
PDF Generator
    ↓
User Output
```

---

## Data Flow Best Practices

### 1. Unidirectional Data Flow
- Data flows from UI → State → Storage
- State is single source of truth
- UI reflects state

### 2. Immutable State Updates
- Never mutate state directly
- Use state.set() for updates
- History tracking

### 3. Reactive Updates
- Subscribers notified on state change
- UI auto-updates
- Engines recalculate

### 4. Error Handling
- Graceful degradation
- Fallback data
- User feedback

### 5. Performance
- Debounce inputs
- Cache calculations
- Lazy load data

---

## Notes

- Single source of truth (state manager)
- Unidirectional data flow
- Subscription pattern for reactivity
- IndexedDB + localStorage persistence
- Graceful error handling
- Performance optimized

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
