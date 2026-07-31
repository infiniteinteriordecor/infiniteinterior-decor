# Master Architecture Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

This document provides a comprehensive master architecture overview of the Infinite Interior Decor project, integrating all system components, data flows, and architectural decisions.

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Client Browser                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   HTML      │  │    CSS      │  │  JavaScript │           │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘           │
│         │                │                │                   │
│         └────────────────┴────────────────┘                   │
│                          │                                     │
│                          ↓                                     │
│              ┌───────────────────────┐                        │
│              │   Application Layer   │                        │
│              ├───────────────────────┤                        │
│              │ • Core App           │                        │
│              │ • Estimator          │                        │
│              │ • Pages              │                        │
│              └───────────┬───────────┘                        │
│                          │                                     │
│         ┌────────────────┼────────────────┐                   │
│         │                │                │                   │
│         ↓                ↓                ↓                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                    │
│  │  State   │  │ Storage  │  │  Data    │                    │
│  │ Manager  │  │  Engine  │  │  (JSON)  │                    │
│  └──────────┘  └──────────┘  └──────────┘                    │
│                          │                                     │
│                          ↓                                     │
│              ┌───────────────────────┐                        │
│              │   Browser Storage     │                        │
│              ├───────────────────────┤                        │
│              │ • IndexedDB           │                        │
│              │ • localStorage        │                        │
│              │ • sessionStorage       │                        │
│              └───────────────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Layer Architecture

### Presentation Layer

**Components:**
- HTML pages and templates
- CSS stylesheets
- JavaScript UI controllers

**Responsibilities:**
- Render user interface
- Handle user interactions
- Display data
- Collect user input

### Application Layer

**Components:**
- Core application (app.js)
- Estimator bootstrap (estimator-bootstrap.js)
- Estimator engine (estimator-engine.js)
- Page-specific modules

**Responsibilities:**
- Orchestrate business logic
- Manage application state
- Coordinate components
- Handle routing

### Data Layer

**Components:**
- State manager (estimator-state.js)
- Storage engine (storage.js)
- Data files (JSON)

**Responsibilities:**
- Manage application state
- Persist data
- Load external data
- Cache data

### Storage Layer

**Components:**
- IndexedDB
- localStorage
- sessionStorage

**Responsibilities:**
- Persistent storage
- Temporary storage
- Session storage
- Cache management

---

## Component Architecture

### Core Components

#### Application Core
- **File:** `js/core/app.js`
- **Pattern:** Singleton
- **Responsibilities:**
  - Base URL detection
  - Asset path resolution
  - Core module loading
  - Page module loading
  - Performance optimizations

#### State Manager
- **File:** `js/estimator-state.js`
- **Pattern:** Singleton
- **Responsibilities:**
  - Centralized state management
  - Subscription pattern
  - History tracking
  - State persistence

#### Storage Engine
- **File:** `js/storage.js`
- **Pattern:** Singleton
- **Responsibilities:**
  - IndexedDB management
  - localStorage fallback
  - Draft management
  - Cache management

### Feature Components

#### Estimator Bootstrap
- **File:** `js/estimator-bootstrap.js`
- **Pattern:** Loader
- **Responsibilities:**
  - Module loading orchestration
  - Data file loading
  - Error handling
  - Diagnostic logging

#### Estimator Router
- **File:** `js/estimator-router.js`
- **Pattern:** Constructor
- **Responsibilities:**
  - Dynamic step navigation
  - Deep linking
  - Navigation guards
  - Draft resumption

#### Estimator UI
- **File:** `js/estimator-ui.js`
- **Pattern:** Constructor
- **Responsibilities:**
  - Step rendering
  - Form handling
  - Progress updates
  - User interactions

---

## Data Architecture

### Data Flow

```
User Input
    ↓
UI Layer
    ↓
Validation
    ↓
State Manager
    ↓
┌───────────┬───────────┬───────────┐
↓           ↓           ↓           ↓
Storage    Engines    Data       External
Layer       Layer      Layer      Data
```

### State Architecture

**State Structure:**
```javascript
{
  // Navigation
  currentStep,
  totalSteps,
  canProceed,
  canGoBack,
  
  // Project
  projectCategory,
  projectType,
  projectInfo,
  
  // Selections
  selectedPackage,
  packageTier,
  budget,
  designStyle,
  materialTier,
  
  // Items
  rooms,
  selectedModules,
  selectedCustomServices,
  
  // Client
  clientDetails,
  
  // Results
  calculations,
  recommendations,
  comparisonData,
  
  // Metadata
  validationStatus,
  isDraft,
  draftId,
  lastSaved,
  
  // UI
  ui: { isLoading, isSaving, error }
}
```

---

## Module Architecture

### Module Categories

#### Core Modules
- `app.js` - Application entry
- `navbar.js` - Navigation
- `image-placeholder.js` - Image placeholders
- `schema.js` - Schema validation
- `helpers.js` - Utility functions

#### Estimator Modules
- `estimator-bootstrap.js` - Bootstrap loader
- `estimator-engine.js` - Main engine
- `estimator-router.js` - Routing
- `estimator-state.js` - State management
- `estimator-ui.js` - UI controller

#### Engine Modules
- `material-engine.js` - Material calculations
- `package-engine.js` - Package calculations
- `budget-engine.js` - Budget calculations
- `module-engine.js` - Module calculations
- `boq-engine.js` - BOQ generation
- `comparison-engine.js` - Package comparison
- `recommendation-engine.js` - Recommendations

#### Utility Modules
- `storage.js` - Storage engine
- `storage-manager.js` - Storage management
- `validation.js` - Form validation
- `pdf-generator.js` - PDF generation

---

## Pattern Architecture

### Design Patterns Used

#### 1. Singleton Pattern
**Used For:**
- State manager
- Storage engine
- Helper functions

**Benefits:**
- Single instance
- Global access
- Consistent state

#### 2. Constructor Pattern
**Used For:**
- Router
- UI controller
- Engines

**Benefits:**
- Multiple instances
- Dependency injection
- Instance-specific state

#### 3. Observer Pattern
**Used For:**
- State subscriptions
- Event handling

**Benefits:**
- Reactive updates
- Loose coupling
- Event-driven

#### 4. Strategy Pattern
**Used For:**
- Dynamic step flow
- Validation rules

**Benefits:**
- Flexible algorithms
- Runtime selection
- Easy extension

---

## Security Architecture

### Security Measures

#### Client-Side Security
- Input validation
- XSS prevention (recommended DOMPurify)
- No sensitive data in client code
- Secure storage (IndexedDB)

#### Data Security
- Local storage encryption (not implemented)
- Session storage for temporary data
- No server-side data exposure

#### Recommendations
- Implement CSP headers
- Add DOMPurify
- Sanitize all inputs
- Implement rate limiting

---

## Performance Architecture

### Performance Strategies

#### Loading Performance
- Predictive prefetching
- Lazy loading
- Background data hydration
- Image preloading
- Resource preloading

#### Runtime Performance
- Debouncing and throttling
- Request animation frame
- Efficient DOM manipulation
- Optimized selectors

#### Caching Strategy
- Browser caching
- Session storage caching
- IndexedDB caching
- Service worker (not implemented)

---

## Deployment Architecture

### Deployment Strategy

#### Static Hosting
- GitHub Pages
- No build process
- Automatic deployment
- Custom domain support

#### Deployment Pipeline
```
Git Push
    ↓
GitHub Repository
    ↓
GitHub Pages Build
    ↓
Deployment
    ↓
Live Site
```

---

## Scalability Architecture

### Scalability Considerations

#### Client-Side Scalability
- Modular architecture
- Lazy loading
- Code splitting (not implemented)
- Dynamic imports (not implemented)

#### Data Scalability
- IndexedDB for large datasets
- localStorage for small data
- Session storage for temporary data
- External API integration (not implemented)

#### Performance Scalability
- CDN distribution (GitHub Pages)
- Asset optimization
- Caching strategies
- Performance monitoring

---

## Integration Architecture

### External Integrations

#### Current Integrations
- Google Fonts
- GitHub Pages
- No third-party APIs

#### Potential Integrations
- Payment gateway
- Email service
- Analytics service
- CRM system

---

## Monitoring Architecture

### Monitoring Strategies

#### Performance Monitoring
- Lighthouse audits
- Core Web Vitals
- Performance API
- Bootstrap diagnostics

#### Error Monitoring
- Console logging
- Bootstrap error tracking
- User feedback (not implemented)

#### Analytics
- GitHub Pages analytics (not implemented)
- Google Analytics (not implemented)
- Custom analytics (not implemented)

---

## Documentation Architecture

### Documentation Structure

#### Technical Documentation
- Architecture documentation
- API documentation
- Debugging guides
- Developer guides

#### User Documentation
- Project overview
- Feature documentation
- Usage guides (not implemented)

#### AI Documentation
- AI developer guide
- AI context

---

## Technology Stack

### Core Technologies
- **HTML5** - Markup
- **CSS3** - Styling
- **Vanilla JavaScript** - Logic
- **JSON** - Data

### Tools
- **Git** - Version control
- **GitHub** - Hosting
- **VS Code** - Development
- **Chrome DevTools** - Debugging

### Libraries
- **Google Fonts** - Typography
- **No JavaScript libraries** - Vanilla JS only

---

## Architecture Principles

### 1. Simplicity
- Vanilla JavaScript
- No build process
- Clear structure
- Easy to understand

### 2. Modularity
- Component-based
- Separation of concerns
- Independent modules
- Reusable components

### 3. Performance
- Fast loading
- Efficient rendering
- Optimized assets
- Smart caching

### 4. Maintainability
- Comprehensive documentation
- Clear conventions
- Consistent patterns
- Easy to modify

### 5. Scalability
- Modular architecture
- Extensible design
- Performance optimized
- Future-ready

---

## Architecture Evolution

### Current State
- Static website
- Client-side only
- GitHub Pages hosting
- No backend

### Future Considerations
- Headless CMS integration
- API integration
- Service worker
- Progressive Web App
- TypeScript migration

---

## Notes

- Client-side only architecture
- No backend required
- Static hosting compatible
- Modular and extensible
- Well-documented
- Performance optimized
- Security aware

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
