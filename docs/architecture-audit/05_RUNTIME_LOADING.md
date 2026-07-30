# 05_RUNTIME_LOADING.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete runtime loading sequence and execution flow

---

## Main Pages Runtime Loading Sequence

### 1. Browser Request

```
User enters URL
↓
Browser sends HTTP request to server
↓
Server returns HTML document
```

---

### 2. HTML Parsing

```
Browser receives HTML
↓
Parse HTML document (index.html or pages/[page]/index.html)
↓
Parse <head> section
  ├─ Meta tags (charset, viewport, SEO)
  ├─ Title
  ├─ Canonical URL
  ├─ Open Graph tags
  ├─ Twitter Card tags
  ├─ Preconnect to Google Fonts
  ├─ Preload critical CSS
  ├─ Google Fonts stylesheet
  ├─ CSS files (main.css + page-specific CSS)
  └─ Favicon
↓
Parse <body> section
  ├─ Skip to main content link
  ├─ Brand intro animation
  ├─ Navbar
  ├─ Main content
  └─ Footer
```

---

### 3. CSS Loading

```
CSS files loaded in order:
↓
css/main.css
  ├─ Imports core/design-tokens.css
  ├─ Imports core/breakpoints.css
  ├─ Imports core/reset.css
  ├─ Imports core/utilities.css
  ├─ Imports core/micro-interactions.css
  ├─ Imports components/navbar.css
  ├─ Imports components/footer.css
  ├─ Imports components/button.css
  ├─ Imports components/card.css
  ├─ Imports components/grid.css
  ├─ Imports components/image-placeholder.css
  ├─ Imports components/trust.css
  ├─ Imports components/features.css
  ├─ Imports components/services-section.css
  ├─ Imports components/projects-section.css
  ├─ Imports components/cta.css
  ├─ Imports components/gallery-section.css
  ├─ Imports components/trusted-by.css
  ├─ Imports components/why-choose.css
  ├─ Imports components/process.css
  ├─ Imports components/partners.css
  └─ Imports components/faq.css
↓
css/pages/[page].css (page-specific overrides)
```

**CSS Loading Strategy:**
- All CSS files use `<link rel="stylesheet">` (blocking render)
- Critical CSS preloaded for performance
- No async/defer on CSS (CSS is render-blocking by design)

---

### 4. JavaScript Loading (Main Pages)

```
JavaScript files loaded with defer attribute (execute after HTML parsing):
↓
js/helpers.js
  ├─ Defines Helper object with utility functions
  ├─ Defines resolveAssetPath function
  └─ Defines getBasePath function
↓
js/core/app.js
  ├─ Defines getBaseUrl function
  ├─ Defines resolveAssetPath function (fallback)
  ├─ Loads core modules
  └─ Loads page-specific modules
↓
js/core/navbar.js
  ├─ Defines Navbar object
  ├─ Renders logo with correct path
  ├─ Initializes scroll effects
  └─ Initializes mobile menu
↓
js/core/schema.js
  ├─ Defines Schema object
  ├─ Loads data/database.json
  └─ Generates Schema.org structured data
↓
js/core/image-placeholder.js
  ├─ Defines ImagePlaceholder object
  └─ Renders image placeholders
↓
js/core/lazy-load.js
  ├─ Defines LazyLoad object
  └─ Initializes lazy loading
↓
js/pages/[page].js
  ├─ Defines page-specific functionality
  └─ Initializes page features
```

**JavaScript Loading Strategy:**
- All JS files use `defer` attribute (non-blocking, execute after HTML parsing)
- Execution order maintained by defer attribute
- No async/defer mixing (all use defer for consistency)

---

### 5. Shared Helpers Initialization

```
After helpers.js loads:
↓
window.Helper object available
  ├─ formatCurrency()
  ├─ formatNumber()
  ├─ generateId()
  ├─ debounce()
  ├─ throttle()
  ├─ deepClone()
  ├─ deepMerge()
  ├─ isEmpty()
  ├─ getNested()
  ├─ setNested()
  ├─ removeFromArray()
  ├─ calculatePercentage()
  ├─ roundTo()
  ├─ clamp()
  ├─ isValidEmail()
  ├─ isValidPhone()
  ├─ isValidPIN()
  ├─ copyToClipboard()
  ├─ downloadFile()
  ├─ isMobile()
  ├─ isTablet()
  ├─ isDesktop()
  └─ LocalStorage wrapper
↓
window.resolveAssetPath function available
  ├─ Resolves asset paths for GitHub Pages
  └─ Handles localhost, file://, and GitHub Pages
↓
window.getBasePath function available
  ├─ Calculates base path for current page
  └─ Used for relative path resolution
```

---

### 6. Navbar Initialization

```
After core/navbar.js loads:
↓
DOMContentLoaded event fires
↓
core/app.js calls loadCoreModules()
↓
Navbar.init() executes
↓
renderLogo() executes
  ├─ Gets navbar-logo-container element
  ├─ Calls window.resolveAssetPath('assets/images/logo/logo.png')
  ├─ Inserts logo image with correct path
  └─ Logo rendered
↓
initScrollEffects() executes
  ├─ Adds scroll event listener
  ├─ Detects scroll position
  ├─ Adds/removes navbar--scrolled class
  └─ Glassmorphism effect applied
↓
initMobileMenu() executes
  ├─ Adds click listener to toggle button
  ├─ Toggles mobile menu visibility
  └─ Mobile menu functional
```

---

### 7. Storage Initialization

```
Storage modules load (only on Estimator page):
↓
js/storage-manager.js loads
↓
StorageManager class defined
↓
Singleton instance created: new StorageManager()
↓
window.EstimatorStorage = singleton instance
↓
Storage.init() called by Bootstrap
  ├─ initIndexedDB() executes
  ├─ Opens IndexedDB database
  ├─ Creates object stores (drafts, calculations, materials, packages, cache)
  ├─ Sets up localStorage fallback
  └─ Storage ready
```

---

### 8. State Initialization

```
State module loads (only on Estimator page):
↓
js/estimator-state.js loads
↓
StateManager class defined
↓
Singleton instance created: new StateManager()
↓
window.EstimatorState = singleton instance
↓
Initial state structure created:
  ├─ currentStep: 1
  ├─ totalSteps: 8
  ├─ canProceed: false
  ├─ canGoBack: false
  ├─ selectedPackage: null
  ├─ packageTier: null
  ├─ budget: null
  ├─ budgetRange: null
  ├─ rooms: []
  ├─ roomCount: 0
  ├─ selectedModules: []
  ├─ moduleCount: 0
  ├─ clientDetails: {}
  ├─ materialTier: null
  ├─ style: null
  ├─ comparisonData: null
  ├─ recommendations: null
  ├─ validationStatus: {}
  ├─ draftStatus: null
  ├─ calculationResults: null
  └─ uiState: {}
↓
State ready for use
```

---

### 9. Router Initialization

```
Router module loads (only on Estimator page):
↓
js/estimator-router.js loads
↓
Router class defined
↓
Bootstrap instantiates: new Router(window.EstimatorState)
↓
window.EstimatorRouter = constructor
↓
Router.init() called by Bootstrap
  ├─ checkDeepLink() executes
  │   ├─ Parses URL parameters
  │   ├─ Checks for step parameter
  │   └─ Sets initial step if deep link exists
  ├─ checkDraftResumption() executes
  │   ├─ Checks for draftId in state
  │   ├─ Loads draft if exists
  │   └─ Restores state from draft
  ├─ updateNavigationState() executes
  │   ├─ Sets canProceed based on validation
  │   └─ Sets canGoBack based on current step
  └─ Router ready
```

---

### 10. Engine Initialization

```
Engine modules load (only on Estimator page):
↓
js/material-engine.js loads
↓
MaterialEngine class defined
↓
window.EstimatorMaterialEngine = constructor
↓
js/package-engine.js loads
↓
PackageEngine class defined
↓
window.EstimatorPackageEngine = constructor
↓
js/budget-engine.js loads
↓
BudgetEngine class defined
↓
window.EstimatorBudgetEngine = constructor
↓
js/recommendation-engine.js loads
↓
RecommendationEngine class defined
↓
window.EstimatorRecommendationEngine = constructor
↓
js/comparison-engine.js loads
↓
ComparisonEngine class defined
↓
window.EstimatorComparisonEngine = constructor
↓
js/module-engine.js loads
↓
ModuleEngine class defined
↓
window.EstimatorModuleEngine = constructor
↓
js/boq-engine.js loads
↓
BOQEngine class defined
↓
window.EstimatorBOQEngine = constructor
↓
js/pdf-generator.js loads
↓
PDFGenerator class defined
↓
window.EstimatorPDFGenerator = constructor
↓
All engine constructors available
```

---

### 11. Estimator Engine Initialization

```
js/estimator-engine.js loads
↓
EstimatorEngine class defined
↓
Bootstrap instantiates: new EstimatorEngine(window.EstimatorState)
↓
window.EstimatorEngine = constructor
↓
EstimatorEngine.init() called by Bootstrap
  ├─ Instantiate sub-engines:
  │   ├─ this.materialEngine = new EstimatorMaterialEngine()
  │   ├─ this.budgetEngine = new EstimatorBudgetEngine()
  │   ├─ this.recommendationEngine = new EstimatorRecommendationEngine()
  │   ├─ this.comparisonEngine = new EstimatorComparisonEngine()
  │   ├─ this.storage = new EstimatorStorage()
  │   ├─ this.validation = new EstimatorValidation()
  │   ├─ this.packageEngine = new EstimatorPackageEngine()
  │   ├─ this.moduleEngine = new EstimatorModuleEngine()
  │   ├─ this.boqEngine = new EstimatorBOQEngine()
  │   └─ this.pdfGenerator = new EstimatorPDFGenerator()
  ├─ Initialize storage: await this.storage.init()
  ├─ Load data: await this.loadData()
  │   ├─ Load materials.json
  │   ├─ Load pricing-rules.json
  │   ├─ Load recommendations.json
  │   └─ Load upgrade-rules.json
  ├─ Initialize engines with data:
  │   ├─ this.materialEngine.init(this.materialsData)
  │   ├─ this.budgetEngine.init(this.pricingRules)
  │   ├─ this.recommendationEngine.init(this.recommendationsData, this.upgradeRules)
  │   └─ this.packageEngine.init(this.materialsData)
  ├─ Initialize PDF generator (with fallback)
  └─ Estimator Engine ready
```

---

### 12. UI Initialization

```
js/estimator-ui.js loads
↓
UIManager class defined
↓
Bootstrap instantiates: new UIManager(window.EstimatorState, window.EstimatorRouter)
↓
window.EstimatorUI = constructor
↓
UIManager.init() called by Bootstrap
  ├─ cacheElements() executes
  │   ├─ Caches all DOM elements
  │   └─ Stores in this.elements object
  ├─ bindEvents() executes
  │   ├─ Binds event handlers
  │   └─ Sets up user interactions
  ├─ renderProgress() executes
  │   ├─ Renders progress indicator
  │   └─ Shows current step
  ├─ hideLoading() executes
  │   ├─ Hides loading spinner
  │   └─ Shows estimator wizard
  └─ UI ready
```

---

### 13. Application Initialization

```
js/estimator.js loads
↓
EstimatorApp class defined
↓
DOMContentLoaded event fires
↓
new EstimatorApp() created
↓
EstimatorApp.init() executes
  ├─ Check if Bootstrap is available
  ├─ Run Bootstrap: await window.EstimatorBootstrap.bootstrap()
  ├─ Extract results from Bootstrap
  │   ├─ this.stateManager = context.state
  │   ├─ this.router = context.router
  │   ├─ this.ui = context.ui
  │   ├─ this.engine = context.engine
  │   └─ this.storage = results.storage
  ├─ Check for draft resumption
  ├─ Set initialized flag
  ├─ Log diagnostic summary
  └─ Application ready
```

---

## Estimator Page Runtime Loading Sequence

### Complete Estimator Loading Flow

```
1. Browser Request
   ↓
2. HTML Parsing (pages/estimator/index.html)
   ↓
3. CSS Loading
   ├─ css/main.css
   ├─ css/estimator.css
   ├─ css/estimator-layout.css
   ├─ css/estimator-components.css
   ├─ css/estimator-responsive.css
   └─ css/estimator-animations.css
   ↓
4. JavaScript Loading (deferred, in order)
   ├─ js/helpers.js
   ├─ js/core/navbar.js
   ├─ js/estimator-bootstrap.js
   ├─ js/storage-manager.js
   ├─ js/estimator-state.js
   ├─ js/validation.js
   ├─ js/estimator-router.js
   ├─ js/material-engine.js
   ├─ js/package-engine.js
   ├─ js/budget-engine.js
   ├─ js/recommendation-engine.js
   ├─ js/comparison-engine.js
   ├─ js/module-engine.js
   ├─ js/boq-engine.js
   ├─ js/pdf-generator.js
   ├─ js/estimator-engine.js
   ├─ js/estimator-ui.js
   └─ js/estimator.js
   ↓
5. Bootstrap Execution
   ├─ Phase 1: Core Modules
   │   ├─ Load Storage (singleton)
   │   ├─ Load State (singleton)
   │   ├─ Load Validation (constructor)
   │   └─ ✓ Storage Loaded
   │   └─ ✓ State Loaded
   ├─ Phase 2: Router
   │   ├─ Load Router (constructor with state)
   │   ├─ Router.init()
   │   └─ ✓ Router Loaded
   ├─ Phase 3: Data Files
   │   ├─ Load materials.json
   │   ├─ Load pricing-rules.json
   │   ├─ Load recommendations.json
   │   ├─ Load upgrade-rules.json
   │   └─ ✓ Assets Loaded
   ├─ Phase 4: Engine Modules
   │   ├─ Load MaterialEngine (constructor)
   │   ├─ Load PackageEngine (constructor)
   │   ├─ Load BudgetEngine (constructor)
   │   ├─ Load RecommendationEngine (constructor)
   │   ├─ Load ComparisonEngine (constructor)
   │   ├─ Load ModuleEngine (constructor)
   │   ├─ Load BOQEngine (constructor)
   │   ├─ Load PDFGenerator (constructor)
   │   └─ ✓ Engine Loaded
   ├─ Phase 5: Estimator Engine
   │   ├─ Load EstimatorEngine (constructor with state)
   │   ├─ EstimatorEngine.init()
   │   │   ├─ Instantiate all sub-engines
   │   │   ├─ Initialize storage
   │   │   ├─ Load data files
   │   │   └─ Initialize engines with data
   │   └─ ✓ Estimator Engine Loaded
   └─ Phase 6: UI
       ├─ Load UI (constructor with state and router)
       ├─ UIManager.init()
       │   ├─ Cache elements
       │   ├─ Bind events
       │   ├─ Render progress
       │   └─ Hide loading
       └─ ✓ UI Loaded
   ↓
6. Application Ready
   ├─ Estimator wizard visible
   ├─ Step 1 (Category) active
   ├─ User can interact with estimator
   └─ All modules initialized
```

---

## Critical Path Analysis

### Main Pages Critical Path

```
HTML Parsing → CSS Loading → JavaScript Loading → Navbar Initialization → Page Initialization
```

**Critical Dependencies:**
- CSS must load before rendering (blocking)
- helpers.js must load before other JS (utility functions)
- core/app.js must load before page-specific JS (module loader)
- navbar.js must load before logo rendering (navigation)

---

### Estimator Page Critical Path

```
HTML Parsing → CSS Loading → helpers.js → Bootstrap → Storage → State → Router → Engines → UI
```

**Critical Dependencies:**
- helpers.js must load first (utility functions)
- estimator-bootstrap.js must load before other estimator modules (orchestrator)
- storage-manager.js must load before estimator-state.js (data persistence)
- estimator-state.js must load before estimator-router.js (dependency)
- estimator-router.js must load before estimator-ui.js (dependency)
- All engines must load before estimator-engine.js (sub-engines)
- estimator-engine.js must load before estimator-ui.js (data ready)

---

## Error Handling

### Bootstrap Error Handling

```
Bootstrap implements graceful failure:
↓
If module fails to load:
  ├─ Log error to diagnostic
  ├─ Continue with remaining modules
  ├─ Skip failed module
  └─ Application continues with available modules
↓
If data file fails to load:
  ├─ Log error to diagnostic
  ├─ Continue with remaining data files
  ├─ Skip failed data file
  └─ Application continues with available data
↓
If critical module fails (State, Router):
  ├─ Log error to diagnostic
  ├─ Show error message to user
  └─ Application stops gracefully
```

---

## Performance Optimization

### Loading Optimizations

1. **CSS Preloading**
   - Critical CSS preloaded in `<head>`
   - Reduces render-blocking time

2. **JavaScript Defer**
   - All JS files use `defer` attribute
   - Non-blocking HTML parsing
   - Maintains execution order

3. **Font Preconnect**
   - Preconnect to Google Fonts
   - Reduces font loading delay

4. **Lazy Loading**
   - Images lazy-loaded
   - Reduces initial page load time

5. **Image Placeholders**
   - Elegant placeholders for missing images
   - Prevents layout shift

6. **Asset Path Resolution**
   - Single asset resolver function
   - GitHub Pages compatible
   - No hardcoded paths

---

## GitHub Pages Compatibility

### Path Resolution

```
GitHub Pages adds repository name to URL:
↓
https://username.github.io/repository-name/
↓
Asset path resolution handles this:
↓
window.getBaseUrl() extracts repository name
↓
window.resolveAssetPath() prepends base URL
↓
All assets load correctly
```

---

## Summary

**Main Pages Loading Steps:** 7  
**Estimator Page Loading Steps:** 18  
**Critical Path Dependencies:** 5  
**Error Handling:** Graceful failure with diagnostics  
**Performance Optimizations:** 6  
**GitHub Pages Compatibility:** Full support via asset resolver
