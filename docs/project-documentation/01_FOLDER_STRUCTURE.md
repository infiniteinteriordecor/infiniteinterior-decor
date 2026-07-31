# Folder Structure Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Type:** Static Website (GitHub Pages)  
**Tech Stack:** Vanilla HTML/CSS/JS with IIFE Modules

---

## Overview

The Infinite Interior Decor project follows a modular, component-based architecture designed for static hosting on GitHub Pages. The structure separates concerns across distinct directories for assets, components, CSS, JavaScript, data, and pages.

---

## Root Directory Structure

```
C:\Users\Ayaan\Desktop\Infinite-Interior\
├── .github/                    # GitHub Actions workflows
├── admin/                      # Admin panel (Not Implemented)
├── assets/                     # Static assets (images, fonts, icons)
├── components/                 # HTML component templates
├── config/                     # Configuration files
├── css/                        # Stylesheets (modular architecture)
├── data/                       # JSON data files for estimator
├── docs/                       # Documentation
├── gallery/                    # Gallery images (Not Implemented)
├── js/                         # JavaScript modules (IIFE pattern)
├── layouts/                    # HTML layout templates
├── pages/                      # Page HTML files
├── .gitignore                  # Git ignore rules
├── favicon.ico                 # Site favicon
├── index.html                  # Homepage
├── manifest.json               # PWA manifest
├── README.md                   # Project README
└── robots.txt                  # SEO robots file
```

---

## Detailed Directory Breakdown

### 1. `.github/` - GitHub Configuration
**Purpose:** GitHub Actions workflows and repository configuration  
**Status:** Implemented

```
.github/
└── workflows/                  # CI/CD workflows
```

### 2. `admin/` - Admin Panel
**Purpose:** Administrative interface for content management  
**Status:** Not Implemented

```
admin/
```

### 3. `assets/` - Static Assets
**Purpose:** Images, fonts, icons, and other static media  
**Status:** Partially Implemented

```
assets/
├── images/                     # Site images
├── fonts/                      # Custom fonts (if any)
└── icons/                      # Icon files (if any)
```

### 4. `components/` - HTML Component Templates
**Purpose:** Reusable HTML component fragments  
**Status:** Implemented

```
components/
├── button.html                 # Button component
├── footer.html                 # Footer component
└── navbar.html                 # Navigation component
```

### 5. `config/` - Configuration Files
**Purpose:** Application configuration and settings  
**Status:** Implemented

```
config/
└── site-config.json            # Site-wide configuration
```

### 6. `css/` - Stylesheets
**Purpose:** Modular CSS architecture with BEM naming  
**Status:** Fully Implemented

```
css/
├── core/                       # Core CSS modules
│   ├── breakpoints.css         # Responsive breakpoints
│   ├── design-tokens.css       # Design tokens (colors, fonts, spacing)
│   ├── micro-interactions.css  # Animation and transition utilities
│   ├── reset.css               # CSS reset
│   └── utilities.css           # Utility classes
├── components/                 # Component-specific styles
│   ├── button.css
│   ├── card.css
│   ├── cta.css
│   ├── faq.css
│   ├── features.css
│   ├── footer.css
│   ├── gallery-section.css
│   ├── grid.css
│   ├── image-placeholder.css
│   ├── navbar.css
│   ├── partners.css
│   ├── process.css
│   ├── projects-section.css
│   ├── services-section.css
│   ├── trust.css
│   ├── trusted-by.css
│   └── why-choose.css
├── pages/                      # Page-specific styles
│   ├── 404.css
│   ├── about.css
│   ├── contact.css
│   ├── gallery.css
│   ├── home.css
│   ├── legal.css
│   ├── project-detail.css
│   ├── projects.css
│   └── services.css
├── estimator.css               # Main estimator styles
├── estimator-animations.css    # Estimator animations
├── estimator-components.css    # Estimator component styles
├── estimator-layout.css        # Estimator layout styles
└── estimator-responsive.css    # Estimator responsive styles
└── main.css                    # Main CSS entry point
```

### 7. `data/` - JSON Data Files
**Purpose:** Estimator data and configuration  
**Status:** Fully Implemented

```
data/
├── database.json               # Main database schema
└── estimator/                  # Estimator-specific data
    ├── brands.json            # Brand information
    ├── cities.json            # City/location data
    ├── hardware.json          # Hardware specifications
    ├── materials.json         # Materials library (schema)
    ├── materials/             # Material categories
    │   ├── automation.json
    │   ├── boards.json
    │   ├── electrical.json
    │   ├── false-ceiling.json
    │   ├── finishes.json
    │   ├── glass.json
    │   ├── hardware.json
    │   ├── kitchen-accessories.json
    │   ├── laminates.json
    │   ├── lighting.json
    │   ├── paint.json
    │   ├── plumbing.json
    │   ├── plywood.json
    │   ├── stone.json
    │   └── wardrobe-accessories.json
    ├── modules.json           # Module definitions
    ├── package-library.json   # Package configurations
    ├── pricing-rules.json     # Pricing calculation rules
    ├── recommendations.json   # Recommendation engine data
    ├── room-library.json      # Room type definitions
    ├── styles.json            # Design style definitions
    ├── upgrade-rules.json     # Material upgrade rules
    └── validation-rules.json  # Form validation rules
```

### 8. `docs/` - Documentation
**Purpose:** Project documentation  
**Status:** In Progress

```
docs/
└── project-documentation/     # Technical documentation
    ├── 00_PROJECT_OVERVIEW.md
    ├── 01_FOLDER_STRUCTURE.md
    ├── 02_COMPLETE_FILE_INDEX.md
    ├── 03_HTML_ARCHITECTURE.md
    ├── 04_CSS_ARCHITECTURE.md
    ├── 05_JS_ARCHITECTURE.md
    ├── 06_RUNTIME_LOADING.md
    ├── 07_COMPONENT_SYSTEM.md
    ├── 08_ESTIMATOR_ARCHITECTURE.md
    ├── 09_DATA_FLOW.md
    ├── 10_JSON_DATABASE.md
    ├── 11_ASSET_SYSTEM.md
    ├── 12_DEPENDENCY_GRAPH.md
    ├── 13_GLOBAL_OBJECTS.md
    ├── 14_SINGLETON_SYSTEM.md
    ├── 15_ROUTING_SYSTEM.md
    ├── 16_STORAGE_SYSTEM.md
    ├── 17_PDF_SYSTEM.md
    ├── 18_BOQ_SYSTEM.md
    ├── 19_PERFORMANCE_SYSTEM.md
    ├── 20_CONSOLE_DEBUG_GUIDE.md
    ├── 21_SAFE_EDIT_RULES.md
    ├── 22_DEVELOPER_GUIDE.md
    ├── 23_GITHUB_PAGES_GUIDE.md
    ├── 24_PROJECT_HEALTH_REPORT.md
    ├── 25_MASTER_ARCHITECTURE.md
    ├── 99_AI_DEVELOPER_MASTER_GUIDE.md
    └── 100_AI_CONTEXT.md
```

### 9. `gallery/` - Gallery Images
**Purpose:** Project gallery images  
**Status:** Not Implemented

```
gallery/
```

### 10. `js/` - JavaScript Modules
**Purpose:** JavaScript modules using IIFE pattern  
**Status:** Fully Implemented

```
js/
├── core/                       # Core JavaScript modules
│   ├── app.js                 # Main application entry
│   ├── image-placeholder.js   # Image placeholder generator
│   ├── lazy-load.js           # Lazy loading utility
│   ├── navbar.js              # Navbar functionality
│   └── schema.js              # Schema validation
├── pages/                      # Page-specific scripts
│   ├── home.js                # Homepage functionality
│   └── projects.js            # Projects page functionality
├── boq-engine.js              # Bill of Quantities engine
├── budget-engine.js           # Budget calculation engine
├── comparison-engine.js       # Package comparison engine
├── estimator-bootstrap.js    # Estimator bootstrap loader
├── estimator-engine.js        # Main estimator engine
├── estimator-router.js        # Estimator wizard routing
├── estimator-state.js         # State management
├── estimator-ui.js            # UI controller
├── estimator.js               # Estimator entry point
├── helpers.js                 # Utility helper functions
├── material-engine.js         # Material selection engine
├── module-engine.js           # Module calculation engine
├── package-engine.js          # Package calculation engine
├── pdf-generator.js           # PDF generation
├── recommendation-engine.js   # Recommendation engine
├── storage-manager.js         # Storage management
├── storage.js                 # Storage engine (IndexedDB + localStorage)
└── validation.js              # Form validation
```

### 11. `layouts/` - HTML Layout Templates
**Purpose:** Page layout templates  
**Status:** Implemented

```
layouts/
└── default.html               # Default page layout
```

### 12. `pages/` - Page HTML Files
**Purpose:** Individual page HTML files  
**Status:** Fully Implemented

```
pages/
├── 404/
│   └── index.html            # 404 error page
├── about/
│   └── index.html            # About page
├── contact/
│   └── index.html            # Contact page
├── estimator/
│   └── index.html            # Cost estimator page
├── gallery/
│   └── index.html            # Gallery page
├── privacy/
│   └── index.html            # Privacy policy page
├── projects/
│   ├── detail/
│   │   └── index.html        # Project detail page
│   └── index.html            # Projects listing page
├── services/
│   └── index.html            # Services page
└── terms/
    └── index.html            # Terms of service page
```

---

## Root Files

### Configuration Files
- **`.gitignore`** - Git ignore patterns
- **`manifest.json`** - Progressive Web App manifest
- **`robots.txt`** - Search engine crawler instructions
- **`sitemap.xml`** - XML sitemap for SEO

### Core Files
- **`index.html`** - Homepage (main landing page)
- **`favicon.ico`** - Site favicon
- **`README.md`** - Project documentation

---

## Key Architectural Patterns

### 1. Modular CSS
- Core styles in `css/core/`
- Component styles in `css/components/`
- Page styles in `css/pages/`
- Estimator styles separated into 4 specialized files

### 2. IIFE JavaScript Modules
- All JS files wrapped in IIFE pattern
- No ES6 modules (for static hosting compatibility)
- Global namespace management via `window` object

### 3. Component-Based HTML
- Reusable components in `components/`
- Layout templates in `layouts/`
- Pages composed of components

### 4. Data-Driven Estimator
- JSON data files in `data/estimator/`
- Schema-based validation
- Material libraries separated by category

### 5. Static Hosting Ready
- No backend dependencies
- Client-side only functionality
- GitHub Pages compatible

---

## File Naming Conventions

### CSS Files
- Use kebab-case: `component-name.css`
- Core files: `category-name.css`
- Page files: `page-name.css`

### JavaScript Files
- Use kebab-case: `module-name.js`
- Engine files: `feature-engine.js`
- Core files: `core-name.js`

### HTML Files
- Pages: `index.html` in page directory
- Components: `component-name.html`
- Layouts: `layout-name.html`

### JSON Files
- Use kebab-case: `data-name.json`
- Schema files include schema definition

---

## Directory Access Patterns

### Relative Paths (Recommended)
```
./                 # Current directory
../                # Parent directory
../../             # Two levels up
css/               # css directory from root
js/                # js directory from root
```

### Absolute Paths (For Documentation)
```
C:\Users\Ayaan\Desktop\Infinite-Interior\
```

---

## Deployment Structure

When deployed to GitHub Pages, the structure remains identical. The root `index.html` serves as the entry point, and all relative paths work correctly in the static hosting environment.

---

## Notes

- **Admin Panel:** Directory exists but functionality not implemented
- **Gallery:** Directory exists but not populated
- **Images:** Most images use placeholder system
- **No Backend:** All functionality is client-side only
- **No Build Process:** Files are served as-is (no bundling, no compilation)

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
