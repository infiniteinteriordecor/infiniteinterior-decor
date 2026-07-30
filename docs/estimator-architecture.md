# Infinite Interior OS - Architecture Documentation

## Overview

Infinite Interior OS is a comprehensive interior design estimation platform built as a modular, scalable system. The architecture follows clean separation of concerns with independent modules that can be developed, tested, and deployed independently.

## System Architecture

### Design Principles

- **Modularity**: Each component is self-contained with clear interfaces
- **Scalability**: Architecture supports future expansion without refactoring
- **Performance**: Lazy loading, deferred JS, modular CSS for optimal performance
- **Maintainability**: Clear code structure with comprehensive documentation
- **Independence**: Estimator module operates independently from existing website

## Folder Structure

```
Infinite-Interior/
├── pages/
│   └── estimator/
│       └── index.html              # Estimator entry point
├── css/
│   ├── estimator.css               # Main estimator styles
│   ├── estimator-layout.css        # Layout systems
│   ├── estimator-components.css    # UI components
│   ├── estimator-responsive.css    # Responsive design
│   └── estimator-animations.css    # Animations
├── js/
│   ├── estimator.js                # Main entry point
│   ├── estimator-ui.js            # UI management
│   ├── estimator-state.js         # State management
│   ├── estimator-router.js        # Routing system
│   ├── estimator-engine.js        # Core business logic
│   ├── material-engine.js         # Material calculations
│   ├── budget-engine.js           # Budget calculations
│   ├── recommendation-engine.js   # Recommendations
│   ├── comparison-engine.js       # Comparisons
│   ├── pdf-generator.js           # PDF generation
│   ├── storage.js                 # Storage management
│   ├── validation.js             # Validation system
│   └── helpers.js                 # Utility functions
├── data/
│   └── estimator/
│       ├── materials.json          # Material definitions
│       ├── brands.json             # Brand definitions
│       ├── hardware.json           # Hardware definitions
│       ├── room-library.json       # Room type definitions
│       ├── pricing-rules.json      # Pricing calculation rules
│       ├── package-library.json    # Package definitions
│       ├── styles.json             # Design style definitions
│       ├── modules.json            # Module definitions
│       ├── cities.json             # City/location definitions
│       ├── recommendations.json     # Recommendation rules
│       ├── upgrade-rules.json      # Upgrade path rules
│       └── validation-rules.json   # Validation rules
└── docs/
    └── estimator-architecture.md   # This document
```

## Module Responsibilities

### Core Modules

#### estimator.js
- **Purpose**: Main application entry point and coordinator
- **Responsibilities**:
  - Initialize all sub-modules
  - Manage application lifecycle
  - Handle draft resumption
  - Coordinate between modules
- **Dependencies**: All other estimator modules

#### estimator-state.js
- **Purpose**: Centralized state management
- **Responsibilities**:
  - Maintain global application state
  - Provide state subscription pattern
  - Handle state history (undo/redo)
  - Export/import state for persistence
- **Dependencies**: None (core module)

#### estimator-router.js
- **Purpose**: Internal routing for wizard navigation
- **Responsibilities**:
  - Manage wizard step navigation
  - Handle deep linking
  - Support draft resumption
  - Implement navigation guards
- **Dependencies**: estimator-state.js

#### estimator-ui.js
- **Purpose**: UI rendering and DOM manipulation
- **Responsibilities**:
  - Render wizard steps
  - Handle user interactions
  - Update progress indicators
  - Display alerts and notifications
- **Dependencies**: estimator-state.js, estimator-router.js

### Engine Modules

#### estimator-engine.js
- **Purpose**: Core business logic coordination
- **Responsibilities**:
  - Coordinate all sub-engines
  - Load and manage data
  - Calculate estimates
  - Generate reports
- **Dependencies**: All other estimator modules

#### material-engine.js
- **Purpose**: Material calculations and pricing
- **Responsibilities**:
  - Calculate material costs by tier
  - Manage material tiers
  - Provide material recommendations
  - Compare materials
- **Dependencies**: helpers.js

#### budget-engine.js
- **Purpose**: Budget calculations and validation
- **Responsibilities**:
  - Calculate total project costs
  - Validate budget constraints
  - Provide budget recommendations
  - Optimize budget allocations
- **Dependencies**: helpers.js, material-engine.js

#### recommendation-engine.js
- **Purpose**: Generate intelligent recommendations
- **Responsibilities**:
  - Analyze user context
  - Suggest optimal materials/tiers
  - Provide upgrade recommendations
  - Calculate recommendation scores
- **Dependencies**: helpers.js, material-engine.js, budget-engine.js

#### comparison-engine.js
- **Purpose**: Compare estimator options
- **Responsibilities**:
  - Compare packages, tiers, materials
  - Generate comparison tables
  - Calculate comparison scores
  - Export comparison data
- **Dependencies**: helpers.js, budget-engine.js, material-engine.js

### Utility Modules

#### pdf-generator.js
- **Purpose**: Generate PDF reports
- **Responsibilities**:
  - Generate quotations
  - Generate BOQ documents
  - Generate summary reports
  - Add headers, footers, tables
- **Dependencies**: helpers.js

#### storage.js
- **Purpose**: Data persistence management
- **Responsibilities**:
  - Manage IndexedDB storage
  - Handle localStorage fallback
  - Manage draft storage
  - Implement caching
- **Dependencies**: helpers.js

#### validation.js
- **Purpose**: Input and data validation
- **Responsibilities**:
  - Validate form fields
  - Validate step data
  - Apply business rules
  - Provide validation feedback
- **Dependencies**: helpers.js

#### helpers.js
- **Purpose**: Reusable utility functions
- **Responsibilities**:
  - Currency formatting
  - Data manipulation
  - Debounce/throttle functions
  - Storage wrappers
- **Dependencies**: None (utility module)

## Data Flow

### Initialization Flow

1. **DOM Ready** → `estimator.js` initializes
2. **State Manager** → Creates global state store
3. **Router** → Initializes with current step
4. **Engine** → Loads JSON data and initializes sub-engines
5. **UI Manager** → Renders initial step
6. **Application Ready** → User can interact

### User Interaction Flow

1. **User Action** → Triggers UI event handler
2. **UI Manager** → Updates state via state manager
3. **State Manager** → Notifies subscribers
4. **Engine** → Performs calculations if needed
5. **UI Manager** → Re-renders based on new state

### Navigation Flow

1. **User clicks Next/Previous** → Router handles navigation
2. **Router** → Validates navigation guards
3. **Router** → Updates current step in state
4. **UI Manager** → Renders new step
5. **State Manager** → Persists draft if needed

### Calculation Flow

1. **User completes step** → Validation engine validates
2. **Engine** → Coordinates calculation engines
3. **Material Engine** → Calculates material costs
4. **Budget Engine** → Calculates total costs
5. **State Manager** → Stores calculation results
6. **UI Manager** → Displays results

## Dependency Graph

```
estimator.js (Entry Point)
├── estimator-state.js (Core)
├── estimator-router.js
│   └── estimator-state.js
├── estimator-ui.js
│   ├── estimator-state.js
│   └── estimator-router.js
└── estimator-engine.js
    ├── estimator-state.js
    ├── material-engine.js
    │   └── helpers.js
    ├── budget-engine.js
    │   ├── helpers.js
    │   └── material-engine.js
    ├── recommendation-engine.js
    │   ├── helpers.js
    │   ├── material-engine.js
    │   └── budget-engine.js
    ├── comparison-engine.js
    │   ├── helpers.js
    │   ├── budget-engine.js
    │   └── material-engine.js
    ├── pdf-generator.js
    │   └── helpers.js
    ├── storage.js
    │   └── helpers.js
    └── validation.js
        └── helpers.js
```

## State Architecture

### State Structure

The global state is managed by `estimator-state.js` and contains:

```javascript
{
  // Wizard Navigation
  currentStep: 1,
  totalSteps: 8,
  canProceed: false,
  canGoBack: false,
  
  // Package Selection
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
  
  // Client Details
  clientDetails: {
    name: null,
    email: null,
    phone: null,
    city: null,
    address: null
  },
  
  // Material Tier
  materialTier: null,
  
  // Comparison Data
  comparisonData: null,
  
  // Recommendations
  recommendations: [],
  
  // Validation Status
  validationStatus: {
    currentStep: false,
    overall: false
  },
  
  // Draft Status
  isDraft: false,
  draftId: null,
  lastSaved: null,
  
  // Calculation Results
  calculations: {
    subtotal: 0,
    tax: 0,
    total: 0,
    breakdown: {}
  },
  
  // UI State
  ui: {
    isLoading: false,
    isSaving: false,
    error: null
  }
}
```

### State Management Pattern

- **Single Source of Truth**: All data stored in centralized state
- **Subscription Pattern**: Modules subscribe to state changes
- **Immutability**: State updates create new state objects
- **History**: State history supports undo/redo functionality
- **Persistence**: State can be exported/imported for storage

## JSON Architecture

### Schema Design

All JSON files follow JSON Schema Draft 7 specification:

- **$schema**: Schema version identifier
- **$id**: Unique schema identifier
- **title**: Human-readable title
- **description**: Schema description
- **properties**: Property definitions
- **required**: Required properties
- **example**: Example structure

### Data Files

#### materials.json
- Material definitions with pricing and tier information
- Supports multiple categories (flooring, walls, ceiling, etc.)
- Includes brand, availability, and features

#### brands.json
- Brand definitions with quality tiers
- Includes warranty and country information
- Links to product categories

#### hardware.json
- Hardware definitions (handles, hinges, locks, etc.)
- Pricing by unit with material and finish information
- Compatibility information

#### room-library.json
- Room type definitions with standard dimensions
- Default and dimension ranges
- Required and optional materials/modules

#### pricing-rules.json
- Base rates for cost components
- Tier multipliers for material quality
- Complexity and location multipliers
- Discount rules

#### package-library.json
- Package definitions with bundled services
- Pricing tiers and inclusions
- Duration and feature information

#### styles.json
- Design style definitions
- Color palettes and material preferences
- Suitable room types and complexity

#### modules.json
- Module definitions for add-on features
- Pricing by unit with installation complexity
- Required materials and duration

#### cities.json
- City definitions for location-based pricing
- Multipliers and service availability
- Lead times and service zones

#### recommendations.json
- Recommendation rules and conditions
- Priority-based suggestions
- Cost impact and benefits

#### upgrade-rules.json
- Tier upgrade paths and costs
- Material and module upgrade rules
- Timeline impact information

#### validation-rules.json
- Field-level validation rules
- Step-level validation requirements
- Business logic constraints

## Future Expansion

### Planned Features

1. **AI-Powered Recommendations**
   - Machine learning for personalized suggestions
   - Image recognition for style matching
   - Predictive budget optimization

2. **Real-time Collaboration**
   - Multi-user support
   - Live editing
   - Comment and review system

3. **Advanced Analytics**
   - Usage analytics
   - Cost trend analysis
   - Market price tracking

4. **Integration Capabilities**
   - CRM integration
   - Payment gateway integration
   - Project management integration

5. **Mobile Applications**
   - Native iOS/Android apps
   - Offline-first architecture
   - Push notifications

### Extension Points

The architecture supports extension through:

- **Custom Engines**: Add new calculation engines
- **Custom Validators**: Add validation rules
- **Custom Recommendations**: Add recommendation logic
- **Custom PDF Templates**: Add report templates
- **Custom Data Sources**: Add external data integrations

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Modules loaded on demand
2. **Deferred JavaScript**: Non-critical JS deferred
3. **Modular CSS**: Critical CSS inline, rest deferred
4. **Caching**: IndexedDB for data caching
5. **Debouncing**: Input debouncing for performance
6. **Virtual Scrolling**: For large lists (future)

### Monitoring

- Performance metrics tracking
- Error logging and reporting
- User behavior analytics
- A/B testing framework (future)

## Security Considerations

### Data Protection

- Client-side encryption for sensitive data
- Secure storage practices
- Input validation and sanitization
- XSS prevention

### Access Control

- User authentication (future)
- Role-based access control (future)
- API rate limiting (future)

## Testing Strategy

### Unit Testing

- Test individual modules in isolation
- Mock dependencies
- Test state management
- Test validation logic

### Integration Testing

- Test module interactions
- Test data flow
- Test storage operations
- Test PDF generation

### End-to-End Testing

- Test complete user flows
- Test navigation
- Test form submissions
- Test draft management

## Deployment

### Build Process

1. **Minification**: CSS and JS minification
2. **Bundling**: Module bundling with tree-shaking
3. **Optimization**: Image optimization
4. **Versioning**: Asset versioning for cache busting

### Environment Support

- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production: Optimized production build

## Maintenance

### Code Quality

- ESLint for JavaScript linting
- Stylelint for CSS linting
- Prettier for code formatting
- TypeScript for type safety (future)

### Documentation

- Inline code comments
- API documentation
- Architecture documentation
- User documentation (future)

## Conclusion

The Infinite Interior OS architecture provides a solid foundation for a comprehensive interior design estimation platform. The modular design ensures maintainability, scalability, and performance while maintaining independence from the existing website infrastructure.

The architecture supports future expansion through well-defined extension points and follows industry best practices for modern web application development.
