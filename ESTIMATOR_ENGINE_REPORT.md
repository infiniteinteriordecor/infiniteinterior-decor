# Estimator Engine Report

## Overview

The Estimator Engine is the core business logic component of the Infinite Interior OS estimator module. It coordinates all sub-engines and provides a unified interface for project estimation, package generation, budget optimization, and PDF generation.

## Architecture

### Core Components

1. **EstimatorEngine** (`js/estimator-engine.js`)
   - Main orchestration engine
   - Coordinates all sub-engines
   - Provides unified API for UI integration

2. **Sub-Engines**
   - `EstimatorMaterialEngine` - Material cost calculations
   - `EstimatorPackageEngine` - Package generation and comparison
   - `EstimatorBudgetEngine` - Budget validation and optimization
   - `EstimatorModuleEngine` - Independent module calculations
   - `EstimatorBOQEngine` - Room-wise BOQ generation
   - `EstimatorComparisonEngine` - Package and tier comparisons
   - `EstimatorPDFGenerator` - PDF report generation
   - `EstimatorStorage` - Data persistence (IndexedDB + localStorage)

3. **State Management**
   - `EstimatorState` - Centralized state store with subscription pattern
   - `EstimatorRouter` - Wizard navigation and step management
   - `EstimatorUI` - DOM manipulation and UI rendering

## Data Flow

```
User Input → Validation → State Update → Engine Processing → Results → UI Update → PDF Generation
```

### Workflow Steps

1. **Wizard Navigation** - User progresses through 8-step wizard
2. **Validation** - Each step validated before proceeding
3. **Engine Processing** - Sub-engines process data based on step
4. **Material Selection** - Material engine calculates costs
5. **Package Generation** - Package engine generates tier-based packages
6. **Recommendations** - Recommendation engine provides suggestions
7. **Comparison** - Comparison engine generates tier comparisons
8. **BOQ Generation** - BOQ engine creates detailed bill of quantities
9. **PDF Generation** - PDF generator creates professional reports

## Key Features

### Package Engine

- **Tier-based Packages**: Basic, Medium, Premium
- **Multipliers**: 1.0x, 1.4x, 2.0x
- **Components**: Materials, hardware, lighting, finish, durability, maintenance, life, warranty, price, margin, labour, GST
- **Auto-generation**: Automatically generates packages based on project data

### Budget Engine

- **Reverse Budgeting**: Calculates feasible budget from target
- **Cost Breakdown**: Margin, design fee, execution cost, material limit, labour limit, reserve
- **Optimization**: Provides suggestions to fit budget
- **Validation**: Validates estimates against budget constraints

### Module Engine

- **Independent Modules**: Kitchen, Wardrobe, TV Unit, Bedroom, False Ceiling, Bathroom, Vanity, Furniture
- **Base Rates**: Per-module base pricing
- **Tier Multipliers**: Applies tier-based multipliers
- **Component Breakdown**: Detailed cost breakdown per module

### BOQ Engine

- **Room-wise BOQ**: Living, Dining, Kitchen, Bedroom, Master, Guest, Kids, Balcony, Bathroom, Store
- **Itemized Lists**: Detailed item breakdown per room
- **Tier-based Pricing**: Applies tier-based costs
- **Project-level Summary**: Complete project BOQ

### Comparison Engine

- **Package Comparison**: Compares Basic, Medium, Premium packages
- **Tier Comparison**: Price, life, warranty, material, finish, maintenance, luxury level, durability
- **Upgrade Recommendations**: Suggests optimal tier upgrades

### PDF Generator

- **Multi-page Reports**: Cover, Summary, Package, BOQ, Room BOQ, Material Details, Comparison, Terms, Timeline, Approval, Footer
- **Company Branding**: Consistent design system with Infinite Interior branding
- **Browser Print**: Uses browser print functionality for compatibility
- **Styled HTML**: Rich styled HTML with inline CSS

## Storage Strategy

### IndexedDB

- **Purpose**: Large data storage (drafts, calculations, cache)
- **Stores**: drafts, calculations, materials, packages, cache
- **Fallback**: localStorage for older browsers

### localStorage

- **Purpose**: Small data storage and backup
- **Usage**: Draft backup, cache fallback, settings
- **Limit**: ~5MB

### JSON Files

- **Purpose**: Static data (materials, pricing rules)
- **Location**: `data/estimator/materials/`
- **Categories**: boards, hardware, laminates, plywood, finishes, lighting, paint, false-ceiling, electrical, plumbing, automation, kitchen-accessories, wardrobe-accessories, glass, stone

## API Reference

### EstimatorEngine Methods

#### `init()`
Initializes the estimator engine and all sub-engines.
```javascript
await engine.init();
```

#### `calculateEstimate(data)`
Calculates project estimate with all components.
```javascript
const result = engine.calculateEstimate({
  selectedPackage: 'medium',
  budget: 500000,
  rooms: [...],
  selectedModules: [...],
  materialTier: 'medium'
});
```

#### `generatePackage(projectData, tierId)`
Generates a package for the specified tier.
```javascript
const package = engine.generatePackage(projectData, 'premium');
```

#### `comparePackages(projectData)`
Compares all three package tiers.
```javascript
const comparison = engine.comparePackages(projectData);
```

#### `calculateModule(moduleId, specifications, tier)`
Calculates cost for a specific module.
```javascript
const cost = engine.calculateModule('kitchen', { length: 10, width: 8 }, 'medium');
```

#### `generateProjectBOQ(rooms, tier)`
Generates complete project BOQ.
```javascript
const boq = engine.generateProjectBOQ(rooms, 'medium');
```

#### `optimizeBudget(data, targetBudget)`
Optimizes budget to fit target.
```javascript
const suggestions = engine.optimizeBudget(data, 400000);
```

#### `generatePDF(type, data)`
Generates PDF report.
```javascript
const pdf = await engine.generatePDF('quotation', data);
```

## Performance Optimization

### Code Splitting

- All JavaScript modules loaded with `defer` attribute
- Engines loaded on-demand when needed
- Lazy loading for images and heavy components

### Caching

- Material data cached in IndexedDB
- Calculation results cached for reuse
- PDF templates cached for faster generation

### Optimized Algorithms

- Efficient cost calculation algorithms
- Memoization for repeated calculations
- Batch processing for multiple modules

## Accessibility

### Keyboard Navigation

- All interactive elements keyboard accessible
- Tab order follows logical flow
- Focus indicators visible on all elements

### Screen Reader Support

- ARIA labels on all interactive elements
- Screen reader-only content for context
- Semantic HTML structure

### Focus Management

- Focus trap for modals
- Focus restoration after dialogs
- Skip link for main content

### Reduced Motion

- Respects `prefers-reduced-motion` preference
- Disables animations when requested
- Maintains functionality without motion

## Browser Compatibility

### Supported Browsers

- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

### Fallbacks

- localStorage fallback for IndexedDB
- Intersection Observer fallback for lazy loading
- CSS fallbacks for modern features

## Testing Recommendations

### Unit Tests

- Test each engine independently
- Test cost calculation accuracy
- Test validation logic

### Integration Tests

- Test engine coordination
- Test data flow between engines
- Test state management

### E2E Tests

- Test complete wizard flow
- Test PDF generation
- Test storage persistence

## Future Enhancements

1. **Real-time Collaboration** - Multi-user support for projects
2. **AI Recommendations** - ML-powered material suggestions
3. **3D Visualization** - Interactive 3D room previews
4. **Mobile App** - Native mobile application
5. **API Integration** - Third-party supplier integration

## Conclusion

The Estimator Engine provides a robust, modular, and performant solution for interior design estimation. With comprehensive sub-engines, efficient data storage, and professional PDF generation, it delivers a complete estimation workflow suitable for GitHub Pages deployment without requiring backend infrastructure.
