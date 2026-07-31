# Project Overview: Infinite Interior Decor

## Executive Summary

**Infinite Interior Decor** is a premium interior design company website with an integrated cost estimation system. The project showcases luxury interior design services for residential, commercial, retail, and hospitality spaces across India, featuring a sophisticated wizard-based estimator tool for generating project quotations and Bills of Quantities (BOQ).

**Company Details:**
- **Name:** Infinite Interior Decor
- **Headquarters:** Bhimtal, Uttarakhand, India
- **Established:** 2015
- **Operations:** Pan India
- **Business:** Premium Interior Design & Turnkey Execution
- **Contact:** infiniteinteriordecor@gmail.com | +91 6398038550

## Project Type

Static website with client-side JavaScript applications, designed for GitHub Pages deployment without any backend server, database, or build process.

## Technology Stack

### Frontend
- **HTML5:** Semantic markup with component-based architecture
- **CSS3:** Custom CSS with CSS variables, no frameworks
- **JavaScript (ES6+):** Vanilla JavaScript with IIFE modules
- **No Build Tools:** No Webpack, Vite, or bundlers required

### Data & Storage
- **JSON:** Client-side database (database.json, estimator data files)
- **IndexedDB:** Browser-based persistent storage for drafts
- **localStorage:** Fallback storage and session caching
- **No Backend:** No Node.js, Express, Firebase, or MongoDB

### Deployment
- **GitHub Pages:** Static hosting
- **PWA Support:** Progressive Web App with manifest.json
- **SEO:** robots.txt, sitemap.xml, schema.org structured data

## Core Features

### 1. Marketing Website
- **Hero Section:** Cinematic animated background with luxury design
- **Services:** 15+ interior design services with detailed features
- **Projects:** Portfolio gallery with case studies
- **Gallery:** Visual showcase of completed work
- **About:** Company story, mission, vision, values
- **Contact:** Contact form and company information

### 2. Cost Estimator System
**"Infinite Interior OS"** - A sophisticated wizard-based estimation engine:

- **Dynamic Wizard Flow:** Adapts based on project category (Standard vs. Custom Services)
- **Package Generation:** Auto-generates Basic/Medium/Premium packages
- **Material Tiers:** Essential, Premium, Luxury, Elite
- **BOQ Generation:** Room-wise Bill of Quantities for 10 room types
- **PDF Export:** Browser-based PDF generation for quotations and BOQ
- **Draft Management:** Auto-save and resume functionality
- **Budget Optimization:** Reverse budgeting with cost breakdown

### 3. Performance Systems
- **Predictive Prefetching:** Hover/touch-based link prefetching
- **Background Data Hydration:** Silent JSON loading during idle time
- **Image Preloading:** Strategic image preloading
- **Drag-to-Scroll:** Desktop horizontal carousel interaction

## Architecture Overview

### Component System
- **HTML Components:** Modular, reusable HTML fragments
- **CSS Modules:** Organized by page, component, and utility
- **JavaScript Modules:** IIFE-based singleton pattern

### Singleton Pattern
The project uses a singleton pattern for core modules:
- `Navbar` - Navigation management
- `ImagePlaceholder` - Image fallback system
- `Schema` - Structured data injection
- `EstimatorStorage` - Draft persistence
- `EstimatorState` - Global state management

### Bootstrap Loader
The estimator module uses a sophisticated bootstrap system (`estimator-bootstrap.js`) that:
- Orchestrates module initialization with error resilience
- Provides comprehensive diagnostics
- Validates module availability
- Handles graceful degradation

### Global Objects
Key global objects exposed to window:
- `window.getBaseUrl()` - GitHub Pages path resolution
- `window.resolveAssetPath()` - Asset path resolution
- `window.EstimatorApp` - Main estimator application
- `window.EstimatorBootstrap` - Bootstrap loader
- Various estimator engine modules

## File Structure Summary

```
Infinite-Interior/
├── index.html              # Homepage
├── pages/                  # Page subdirectories
│   ├── about/
│   ├── services/
│   ├── projects/
│   ├── gallery/
│   ├── estimator/
│   └── contact/
├── components/             # Reusable HTML components
│   ├── navbar.html
│   ├── footer.html
│   └── schema.html
├── css/                    # Stylesheets
│   ├── main.css           # Global styles
│   ├── estimator.css      # Estimator styles
│   ├── pages/             # Page-specific styles
│   └── components/        # Component styles
├── js/                     # JavaScript modules
│   ├── core/              # Core application logic
│   ├── estimator-*.js    # Estimator modules
│   ├── helpers.js         # Utility functions
│   └── storage.js         # Storage engine
├── data/                   # JSON databases
│   ├── database.json      # Main website data
│   └── estimator/         # Estimator data files
├── assets/                 # Static assets
│   ├── images/           # Images (PNG, JPG, WEBP, SVG)
│   ├── fonts/            # Not Implemented
│   └── icons/            # Not Implemented
├── manifest.json          # PWA manifest
├── robots.txt             # SEO robots file
├── sitemap.xml            # SEO sitemap
└── .gitignore             # Git ignore rules
```

## Design System

### Color Palette
- **Primary:** Champagne Gold (#D4AF37, #C4A074)
- **Secondary:** Walnut Brown (#6D5438, #8B6914)
- **Background:** Matte Black (#0A0A0A)
- **Text:** Warm White (#FFFFFF, #F5F5F5)
- **Glass:** Frosted glass effects with backdrop-filter

### Typography
- **Primary Font:** Sans-serif (system fonts)
- **Secondary Font:** Serif (for headings)
- **Luxury Feel:** Elegant letter-spacing and line-height

### Design Philosophy
- **Premium Luxury:** High-end interior design aesthetic
- **Cinematic Effects:** Animated backgrounds, grain textures, spotlights
- **Glassmorphism:** Frosted glass UI elements
- **Responsive:** Mobile-first responsive design
- **Accessibility:** WCAG AA compliance focus

## Estimator Module Architecture

### Core Engines
1. **EstimatorEngine** - Main calculation coordinator
2. **MaterialEngine** - Material pricing and selection
3. **BudgetEngine** - Budget calculation and validation
4. **PackageEngine** - Package generation and comparison
5. **ModuleEngine** - Independent module calculations
6. **BOQEngine** - Bill of Quantities generation
7. **ComparisonEngine** - Package and tier comparisons
8. **RecommendationEngine** - Smart recommendations
9. **ValidationEngine** - Input validation
10. **PDFGenerator** - PDF report generation

### State Management
- **StateManager** - Centralized state with subscription pattern
- **Router** - Dynamic wizard navigation
- **UIManager** - DOM manipulation and rendering

### Storage System
- **StorageManager** - IndexedDB + localStorage hybrid
- **Draft Management** - Auto-save and resume
- **Cache System** - TTL-based data caching

## Data Models

### Main Database (database.json)
- Company information
- Services (15+ services)
- Projects (3 project galleries)
- Testimonials
- Brands/Partners
- FAQ

### Estimator Data
- **materials.json** - Material definitions with pricing
- **pricing-rules.json** - Cost calculation rules
- **recommendations.json** - Recommendation logic
- **upgrade-rules.json** - Upgrade path rules

## GitHub Pages Compatibility

The project is designed for GitHub Pages deployment with:
- **Dynamic Base URL Detection:** Automatic repository name extraction
- **Asset Path Resolution:** Bulletproof path handling for subpaths
- **Relative Navigation:** All links use relative paths
- **No Server-Side Routing:** Pure client-side navigation

## Performance Characteristics

- **Initial Load:** Optimized with critical CSS and deferred JS
- **Predictive Loading:** Prefetch links on hover/touch
- **Background Hydration:** Load data during idle time
- **Image Optimization:** WebP format with fallbacks
- **No Bundle Size:** No build step, direct file loading

## Security Considerations

- **No Backend:** Reduced attack surface
- **Client-Side Only:** No server-side vulnerabilities
- **Local Storage:** Data stored in browser only
- **No Authentication:** Public-facing marketing site
- **Input Validation:** Client-side validation for estimator

## Browser Compatibility

- **Modern Browsers:** Chrome, Firefox, Safari, Edge (latest versions)
- **IndexedDB Required:** For draft persistence
- **ES6+ Support:** Modern JavaScript features
- **CSS Variables:** Custom property support required
- **Backdrop Filter:** Glassmorphism effects (graceful degradation)

## Development Workflow

1. **No Build Process:** Direct file editing
2. **Git Version Control:** Track changes
3. **GitHub Pages:** Automatic deployment on push
4. **Local Testing:** Open index.html directly in browser
5. **No Dependencies:** Pure HTML/CSS/JS

## Known Limitations

- **No Fonts Folder:** Uses system fonts
- **No Icons Folder:** Uses text/SVG icons
- **No Backend:** All data is static JSON
- **No Server-Side Rendering:** Client-side only
- **Browser Storage Limits:** IndexedDB quota limits
- **PDF Generation:** Browser print-based (not native PDF)

## Future Enhancement Opportunities

- **Real Backend:** Add Node.js/Express for dynamic features
- **Database:** MongoDB/PostgreSQL for persistent data
- **Authentication:** User accounts and saved projects
- **Payment Integration:** Stripe/Razorpay for deposits
- **Admin Panel:** Content management system
- **Real-Time Updates:** WebSocket for live project tracking

---

**Documentation Version:** 1.0.0  
**Last Updated:** 2026-07-31  
**Generated By:** Devin AI Documentation System
