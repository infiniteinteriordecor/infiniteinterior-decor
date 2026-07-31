# Singleton System Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses the Singleton pattern for core modules that require a single instance throughout the application lifecycle. This ensures consistent state and behavior across the application.

---

## Singleton Pattern

### Definition

The Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance.

### Implementation Pattern

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
      // Initialization code
    }
    
    static getInstance() {
      if (!instance) {
        instance = new Singleton();
      }
      return instance;
    }
  }
  
  // Export singleton instance
  window.Singleton = Singleton.getInstance();
  
})();
```

---

## Singleton Modules

### 1. EstimatorStorage

**Location:** `js/storage.js`

**Purpose:** Storage engine (IndexedDB + localStorage)

**Why Singleton:**
- Single storage connection
- Consistent storage state
- Prevents multiple database connections

**Implementation:**
```javascript
class StorageEngine {
  constructor() {
    if (StorageEngine.instance) {
      return StorageEngine.instance;
    }
    StorageEngine.instance = this;
    
    this.keys = {
      draft: 'estimator_draft',
      drafts: 'estimator_drafts',
      settings: 'estimator_settings',
      cache: 'estimator_cache'
    };
    
    this.dbName = 'InfiniteInteriorEstimator';
    this.dbVersion = 1;
    this.db = null;
  }
  
  static getInstance() {
    if (!StorageEngine.instance) {
      StorageEngine.instance = new StorageEngine();
    }
    return StorageEngine.instance;
  }
}

window.EstimatorStorage = StorageEngine.getInstance();
```

**Usage:**
```javascript
// Always returns same instance
const storage1 = window.EstimatorStorage;
const storage2 = window.EstimatorStorage;
console.log(storage1 === storage2); // true
```

---

### 2. EstimatorState

**Location:** `js/estimator-state.js`

**Purpose:** State manager

**Why Singleton:**
- Single source of truth
- Consistent application state
- Prevents state conflicts

**Implementation:**
```javascript
class StateManager {
  constructor() {
    if (StateManager.instance) {
      return StateManager.instance;
    }
    StateManager.instance = this;
    
    this.state = {
      currentStep: 1,
      totalSteps: 8,
      // ... state properties
    };
    
    this.subscribers = [];
    this.history = [];
    this.historyIndex = -1;
  }
  
  static getInstance() {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }
}

window.EstimatorState = StateManager.getInstance();
```

**Usage:**
```javascript
// Always returns same instance
const state1 = window.EstimatorState;
const state2 = window.EstimatorState;
console.log(state1 === state2); // true

// State is shared
state1.set('budget', 1000000);
console.log(state2.get('budget')); // 1000000
```

---

### 3. EstimatorHelper

**Location:** `js/helpers.js`

**Purpose:** Utility helper functions

**Why Singleton:**
- Utility functions don't need instances
- Consistent helper methods
- No state to manage

**Implementation:**
```javascript
const Helper = {
  formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },
  
  // ... other helper methods
};

window.EstimatorHelper = Helper;
```

**Usage:**
```javascript
// Direct object access
const formatted = window.EstimatorHelper.formatCurrency(100000);
console.log(formatted); // "₹1,00,000"
```

---

## Singleton vs Constructor Pattern

### Singleton Pattern

**Used For:**
- Core modules (Storage, State)
- Utility objects (Helper)
- Single-purpose modules

**Characteristics:**
- Single instance
- Global access
- No constructor parameters
- State management

**Example:**
```javascript
window.EstimatorStorage = StorageEngine.getInstance();
```

### Constructor Pattern

**Used For:**
- Feature modules (Router, UI)
- Engines (Material, Budget)
- Components with dependencies

**Characteristics:**
- Multiple instances possible
- Constructor parameters
- Dependency injection
- Instance-specific state

**Example:**
```javascript
const router = new EstimatorRouter(window.EstimatorState);
const ui = new EstimatorUI(window.EstimatorState, router);
```

---

## Singleton Benefits

### 1. Single Instance
- Guarantees one instance
- Prevents duplication
- Consistent behavior

### 2. Global Access
- Easy to access
- No need to pass around
- Simplifies code

### 3. State Management
- Centralized state
- Consistent state
- Easy to debug

### 4. Resource Management
- Single database connection
- Single storage instance
- Efficient resource use

---

## Singleton Drawbacks

### 1. Global State
- Harder to test
- Hidden dependencies
- Side effects

### 2. Tight Coupling
- Modules depend on globals
- Hard to mock
- Difficult to isolate

### 3. Concurrency Issues
- Not thread-safe (in JS, less concern)
- Race conditions (in some cases)

---

## Singleton Best Practices

### 1. Use Appropriately
- Only for truly single-instance modules
- Not for everything
- Consider alternatives

### 2. Document Clearly
- Mark as singleton
- Document usage
- Provide examples

### 3. Test Carefully
- Reset state between tests
- Mock when needed
- Isolate dependencies

### 4. Limit Globals
- Minimize singleton usage
- Use constructor pattern when possible
- Keep API clean

---

## Singleton Testing

### Testing Singleton Modules

**Challenge:** Singletons maintain state between tests

**Solution:** Reset state before each test

```javascript
describe('EstimatorState', () => {
  beforeEach(() => {
    // Reset state
    window.EstimatorState.reset();
  });
  
  it('should set budget', () => {
    window.EstimatorState.set('budget', 1000000);
    expect(window.EstimatorState.get('budget')).toBe(1000000);
  });
});
```

### Mocking Singletons

**Challenge:** Hard to mock global objects

**Solution:** Create test-specific implementation

```javascript
// Original
window.EstimatorStorage = StorageEngine.getInstance();

// Test mock
window.EstimatorStorage = {
  saveDraft: jest.fn(),
  loadDraft: jest.fn(),
  deleteDraft: jest.fn()
};
```

---

## Singleton vs Constructor Decision Matrix

| Factor | Singleton | Constructor |
|--------|-----------|-------------|
| Single instance needed | ✅ Yes | ❌ No |
| Constructor parameters | ❌ No | ✅ Yes |
| Dependency injection | ❌ No | ✅ Yes |
| State management | ✅ Yes | ⚠️ Maybe |
| Testability | ⚠️ Harder | ✅ Easier |
| Flexibility | ❌ Rigid | ✅ Flexible |

---

## Singleton Implementation Examples

### Simple Singleton

```javascript
(function() {
  'use strict';
  
  let instance = null;
  
  class SimpleSingleton {
    constructor() {
      if (instance) return instance;
      instance = this;
    }
    
    method() {
      return 'Hello from singleton';
    }
  }
  
  window.SimpleSingleton = new SimpleSingleton();
  
})();
```

### Singleton with getInstance

```javascript
(function() {
  'use strict';
  
  let instance = null;
  
  class SingletonWithGetInstance {
    constructor() {
      if (instance) return instance;
      instance = this;
    }
    
    static getInstance() {
      if (!instance) {
        instance = new SingletonWithGetInstance();
      }
      return instance;
    }
  }
  
  window.SingletonWithGetInstance = SingletonWithGetInstance.getInstance();
  
})();
```

### Object Singleton (Utility)

```javascript
(function() {
  'use strict';
  
  const UtilitySingleton = {
    method1() {
      return 'Method 1';
    },
    
    method2() {
      return 'Method 2';
    }
  };
  
  window.UtilitySingleton = UtilitySingleton;
  
})();
```

---

## Notes

- Singleton pattern for core modules
- Constructor pattern for feature modules
- Single instance guarantees
- Global access via window object
- State management
- Resource efficiency
- Testing challenges
- Use appropriately

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
