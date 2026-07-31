# Routing System Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\js\estimator-router.js`  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses a custom internal routing system for the estimator wizard. The router handles dynamic step navigation, deep linking, and conditional step flow based on user selections.

---

## Routing Architecture

### Router Purpose

The Estimator Router is an internal routing system that:
- Manages wizard step navigation
- Handles dynamic step flow based on category
- Supports deep linking via URL parameters
- Implements navigation guards
- Manages draft resumption

### Router Pattern

**Pattern:** Constructor class (requires state manager)

**Dependencies:**
- EstimatorState (required parameter)

---

## Router Implementation

### Class Definition

```javascript
class Router {
  constructor(stateManager) {
    if (!stateManager) {
      throw new Error('stateManager is required');
    }
    this.state = stateManager;
    this.guards = {};
    this.currentStep = 1;
  }
}
```

### Dynamic Step Flow

The router dynamically adjusts the steps array based on the selected project category:

```javascript
get steps() {
  const category = this.state.get('projectCategory');
  
  // Branch 1: Custom Services (Short Flow)
  if (category === 'custom_services') {
    return [
      { id: 'category', name: 'category', title: 'Category' },
      { id: 'custom_services_selection', name: 'services', title: 'Services' },
      { id: 'budget', name: 'budget', title: 'Budget' },
      { id: 'contact', name: 'contact', title: 'Contact' }
    ];
  }
  
  // Branch 2: Standard Full Interior (Long Flow)
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

### Step Flow Diagram

```
┌─────────────────┐
│   Category      │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ↓                 ↓
┌─────────────────┐  ┌─────────────────┐
│ Custom Services │  │  Full Interior  │
└────────┬────────┘  └────────┬────────┘
         │                    │
         ↓                    ↓
┌─────────────────┐  ┌─────────────────┐
│   Services      │  │      Type       │
└────────┬────────┘  └────────┬────────┘
         │                    │
         ↓                    ↓
┌─────────────────┐  ┌─────────────────┐
│     Budget      │  │   Information   │
└────────┬────────┘  └────────┬────────┘
         │                    │
         ↓                    ↓
┌─────────────────┐  ┌─────────────────┐
│    Contact      │  │  Requirements   │
└─────────────────┘  └────────┬────────┘
                              │
                              ↓
                    ┌─────────────────┐
                    │      Style      │
                    └────────┬────────┘
                              │
                              ↓
                    ┌─────────────────┐
                    │     Package     │
                    └────────┬────────┘
                              │
                              ↓
                    ┌─────────────────┐
                    │     Budget      │
                    └────────┬────────┘
                              │
                              ↓
                    ┌─────────────────┐
                    │    Contact      │
                    └─────────────────┘
```

---

## Router Methods

### Navigation Methods

#### next()

Navigate to the next step.

```javascript
next() → boolean
```

**Returns:** `true` if navigation successful, `false` otherwise

**Example:**
```javascript
const success = router.next();
if (success) {
  console.log('Moved to next step');
}
```

#### previous()

Navigate to the previous step.

```javascript
previous() → boolean
```

**Returns:** `true` if navigation successful, `false` otherwise

**Example:**
```javascript
const success = router.previous();
if (success) {
  console.log('Moved to previous step');
}
```

#### goTo(stepId)

Navigate to a specific step by index.

```javascript
goTo(stepId: number) → boolean
```

**Parameters:**
- `stepId` - Target step index (1-based)

**Returns:** `true` if navigation successful, `false` otherwise

**Example:**
```javascript
const success = router.goTo(3);
if (success) {
  console.log('Moved to step 3');
}
```

---

### Navigation Guards

#### canNavigateTo(stepId)

Check if navigation to a step is allowed.

```javascript
canNavigateTo(stepId: number) → boolean
```

**Parameters:**
- `stepId` - Target step index

**Returns:** `true` if navigation allowed, `false` otherwise

**Example:**
```javascript
if (router.canNavigateTo(3)) {
  router.goTo(3);
}
```

#### addGuard(stepId, guard)

Add a navigation guard for a specific step.

```javascript
addGuard(stepId: number, guard: Function) → void
```

**Parameters:**
- `stepId` - Step index to guard
- `guard` - Guard function that receives state and returns boolean

**Example:**
```javascript
router.addGuard(3, (state) => {
  return state.budget > 0;
});
```

#### removeGuard(stepId)

Remove a navigation guard.

```javascript
removeGuard(stepId: number) → void
```

**Parameters:**
- `stepId` - Step index to remove guard from

**Example:**
```javascript
router.removeGuard(3);
```

---

### Information Methods

#### getStep(stepId)

Get information about a specific step.

```javascript
getStep(stepId: number) → Object|null
```

**Parameters:**
- `stepId` - Step index

**Returns:** Step object or `null` if not found

**Example:**
```javascript
const step = router.getStep(3);
console.log(step.title); // "Style"
```

#### getCurrentStep()

Get information about the current step.

```javascript
getCurrentStep() → Object|null
```

**Returns:** Current step object or `null`

**Example:**
```javascript
const step = router.getCurrentStep();
console.log(step.title); // "Budget"
```

#### getAllSteps()

Get all steps for the current active flow.

```javascript
getAllSteps() → Array
```

**Returns:** Array of step objects

**Example:**
```javascript
const steps = router.getAllSteps();
console.log(steps.length); // 8
```

---

### Utility Methods

#### totalSteps

Get the total number of steps in the current flow.

```javascript
get totalSteps() → number
```

**Returns:** Total step count

**Example:**
```javascript
console.log(router.totalSteps); // 8
```

#### updateNavigationState()

Update navigation state in the state manager.

```javascript
updateNavigationState() → void
```

**Updates:**
- `canGoBack` - Can navigate to previous step
- `canProceed` - Can navigate to next step

#### reset()

Reset router to initial state.

```javascript
reset() → void
```

**Resets:**
- Current step to 1
- Navigation state
- Clear guards

---

## Deep Linking

### URL Parameter Support

The router supports deep linking via URL parameters:

```
pages/estimator/index.html?step=3
```

### checkDeepLink()

Check for deep link on initialization.

```javascript
checkDeepLink() → void
```

**Implementation:**
```javascript
checkDeepLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const stepParam = urlParams.get('step');
  
  if (stepParam) {
    const stepId = parseInt(stepParam, 10);
    if (stepId >= 1 && stepId <= this.steps.length) {
      this.currentStep = stepId;
    }
  }
}
```

### updateURL()

Update URL for deep linking.

```javascript
updateURL() → void
```

**Implementation:**
```javascript
updateURL() {
  const url = new URL(window.location);
  url.searchParams.set('step', this.currentStep);
  window.history.replaceState({}, '', url);
}
```

---

## Draft Resumption

### checkDraftResumption()

Check for draft resumption on initialization.

```javascript
checkDraftResumption() → void
```

**Implementation:**
```javascript
checkDraftResumption() {
  const draftId = this.state.get('draftId');
  if (draftId) {
    console.log('Resuming draft:', draftId);
  }
}
```

---

## Step Broadcasting

### _broadcastStep(stepIndex)

Broadcast step changes to UI with magic payload.

```javascript
_broadcastStep(stepIndex: number) → void
```

**Purpose:** Sends an object that works as both a number (for progress bar) and string (for rendering)

**Implementation:**
```javascript
_broadcastStep(stepIndex) {
  const stepDef = this.steps[stepIndex - 1];
  if (!stepDef) return;
  
  const stepPayload = {
    id: stepDef.id,
    name: stepDef.name,
    title: stepDef.title,
    index: stepIndex,
    valueOf: function() { return this.index; },
    toString: function() { return this.id; }
  };
  
  this.state.set('currentStep', stepPayload);
}
```

**Usage:**
```javascript
// Can be used as number
const progress = (currentStep / totalSteps) * 100;

// Can be used as string
const stepId = currentStep.toString();
```

---

## Router Initialization

### init()

Initialize the router.

```javascript
init() → void
```

**Process:**
1. Check deep link
2. Check draft resumption
3. Extract numeric index from state
4. Broadcast current step
5. Update navigation state

**Example:**
```javascript
const router = new EstimatorRouter(window.EstimatorState);
router.init();
```

---

## Router Usage Example

### Complete Usage

```javascript
// Instantiate
const router = new EstimatorRouter(window.EstimatorState);

// Initialize
router.init();

// Add navigation guard
router.addGuard(3, (state) => {
  return state.budget > 0;
});

// Navigate
router.next();
router.previous();
router.goTo(3);

// Get information
const currentStep = router.getCurrentStep();
const allSteps = router.getAllSteps();
const totalSteps = router.totalSteps;

// Reset
router.reset();
```

---

## Routing Best Practices

### 1. Use Guards for Validation
```javascript
router.addGuard(3, (state) => {
  return state.budget > 0;
});
```

### 2. Check Navigation Before Moving
```javascript
if (router.canNavigateTo(3)) {
  router.goTo(3);
}
```

### 3. Update URL for Deep Linking
```javascript
router.updateURL();
```

### 4. Handle Dynamic Step Flow
```javascript
// Steps change based on category
const steps = router.steps;
console.log(steps.length); // 4 or 8
```

### 5. Reset When Starting New
```javascript
router.reset();
```

---

## Notes

- Custom internal routing system
- Dynamic step flow based on category
- Deep linking support
- Navigation guards
- Draft resumption
- Magic payload for step broadcasting
- Constructor pattern with state dependency

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
