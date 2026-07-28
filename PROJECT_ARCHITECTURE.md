# Infinite Interior Decor - Project Architecture Documentation

## Overview

Infinite Interior Decor is a premium interior design website built with vanilla HTML, CSS, and JavaScript. The project is designed for GitHub Pages deployment with subpath support (`/infiniteinterior-decor/`) and features a modular architecture with dynamic data loading.

---

## Directory Structure

```
Infinite-Interior/
├── .git/                          # Git version control
├── .github/                       # GitHub workflows and configuration
├── assets/                        # Static assets
│   ├── icons/                     # Favicon and app icons
│   ├── images/                    # Image assets
│   │   ├── clients/              # Client logos
│   │   ├── company/              # Company-related images
│   │   ├── gallery/              # General gallery images
│   │   ├── hero/                 # Hero section images
│   │   ├── logo/                 # Company logo (logo.png)
│   │   ├── projects/             # Project-specific images
│   │   │   ├── baithke-bihari-jehanabad-2023/
│   │   │   │   └── gallery/      # Project gallery images
│   │   │   ├── modern-residential-bhimtal-2022/
│   │   │   ├── monte-carlo-jehanabad-2023/
│   │   │   └── the-salon-company-bhimtal-2022/
│   │   ├── services/             # Service-related images
│   │   └── team/                 # Team member photos
│   └── videos/                   # Video assets
├── components/                    # Reusable HTML components
│   ├── navbar.html               # Navigation component
│   └── footer.html               # Footer component
├── config/                        # Configuration files
├── css/                           # Stylesheets
│   ├── components/               # Component-specific CSS
│   │   ├── button.css
│   │   ├── card.css
│   │   ├── cta.css
│   │   ├── faq.css
│   │   ├── features.css
│   │   ├── footer.css
│   │   ├── gallery-section.css
│   │   ├── grid.css
│   │   ├── image-placeholder.css
│   │   ├── navbar.css
│   │   ├── partners.css
│   │   ├── process.css
│   │   ├── projects-section.css
│   │   ├── services-section.css
│   │   ├── trust.css
│   │   ├── trusted-by.css
│   │   └── why-choose.css
│   ├── core/                     # Core CSS utilities
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── typography.css
│   │   ├── utilities.css
│   │   └── variables.css
│   ├── main.css                  # Main stylesheet entry point
│   └── pages/                    # Page-specific CSS
│       ├── about.css
│       ├── contact.css
│       ├── gallery.css
│       ├── home.css
│       ├── privacy.css
│       ├── project-detail.css
│       ├── projects.css
│       ├── services.css
│       └── terms.css
├── data/                          # Data files
│   └── database.json              # Main data store
├── docs/                          # Documentation
│   ├── reports/                   # Project reports
│   ├── ARCHITECTURE.md
│   ├── CODING_STANDARDS.md
│   └── DATA_STRUCTURE.md
├── gallery/                       # Gallery assets
├── js/                            # JavaScript modules
│   ├── core/                     # Core JavaScript modules
│   │   ├── app.js                # Application entry point
│   │   ├── image-placeholder.js  # Image placeholder system
│   │   ├── lazy-load.js          # Lazy loading implementation
│   │   ├── logo-base64.js        # Base64 encoded logo
│   │   ├── navbar.js             # Navigation functionality
│   │   └── schema.js             # Schema.org structured data
│   └── pages/                    # Page-specific JavaScript
│       ├── home.js               # Homepage functionality
│       └── projects.js           # Projects page functionality
├── layouts/                       # Layout templates
├── logo_base64.txt                # Base64 logo data
├── manifest.json                  # PWA manifest
├── pages/                         # Page HTML files
│   ├── 404/
│   │   └── index.html
│   ├── about/
│   │   └── index.html
│   ├── contact/
│   │   └── index.html
│   ├── gallery/
│   │   └── index.html
│   ├── privacy/
│   │   └── index.html
│   ├── projects/
│   │   ├── detail/
│   │   │   └── index.html       # Project detail page
│   │   └── index.html           # Projects listing page
│   ├── services/
│   │   └── index.html
│   └── terms/
│       └── index.html
├── robots.txt                     # SEO robots file
├── sitemap.xml                    # SEO sitemap
├── index.html                     # Homepage
├── README.md                      # Project documentation
└── PROJECT_ARCHITECTURE.md        # This file
```

---

## Tech Stack & Dependencies

### Core Technologies
- **HTML5** - Semantic markup and structure
- **CSS3** - Styling with modern features (Flexbox, Grid, CSS Variables)
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JavaScript

### External Libraries & Services
- **Google Fonts**
  - Cormorant Garamond (300, 400, 500, 600, 700) - Headings and display text
  - Plus Jakarta Sans (300, 400, 500, 600, 700) - Body text
- **No JavaScript Frameworks** - Pure vanilla JS for performance
- **No CSS Frameworks** - Custom CSS architecture

### Icons
- **Inline SVG Icons** - Embedded directly in HTML for performance
- No external icon libraries (Font Awesome, etc.)

### Deployment
- **GitHub Pages** - Static site hosting
- **PWA Support** - Progressive Web App via manifest.json

---

## Data Management

### Data Storage
All dynamic content is stored in a single JSON file: `data/database.json`

### Database.json Structure

```json
{
  "company": {
    "name": "Infinite Interior Decor",
    "headOffice": "Bhimtal, Uttarakhand, India",
    "established": "2015",
    "operations": "Pan India",
    "business": "Premium Interior Design & Turnkey Execution",
    "email": "infiniteinteriordecor@gmail.com",
    "phone": "+91 6398038550"
  },
  "about": {
    "description": "Company description",
    "mission": "Company mission",
    "vision": "Company vision",
    "values": [
      {
        "title": "Value Title",
        "description": "Value description"
      }
    ],
    "industries": ["Industry 1", "Industry 2", ...]
  },
  "statistics": [
    {
      "value": "9+",
      "label": "Years Experience"
    }
  ],
  "services": [
    {
      "id": "service-id",
      "title": "Service Title",
      "description": "Service description",
      "features": ["Feature 1", "Feature 2", ...],
      "icon": "icon-name"
    }
  ],
  "projects": [
    {
      "id": "project-id",
      "title": "Project Title",
      "slug": "project-slug",
      "category": "Category",
      "location": "Location",
      "year": "2023",
      "area": "1200 sq ft",
      "status": "Completed",
      "image": "path/to/hero-image.webp",
      "thumbnail": "path/to/thumbnail.webp",
      "gallery": [
        "path/to/gallery-image-1.webp",
        "path/to/gallery-image-2.webp"
      ],
      "featured": true,
      "description": "Project description",
      "scopeOfWork": ["Work item 1", "Work item 2"],
      "materials": ["Material 1", "Material 2"],
      "services": ["Service 1", "Service 2"]
    }
  ],
  "gallery": [],
  "clients": [
    {
      "name": "Client Name",
      "logo": "path/to/logo.png",
      "website": "https://client-website.com",
      "category": "Industry"
    }
  ],
  "whyChoose": [
    {
      "title": "Feature Title",
      "description": "Feature description",
      "iconPath": "SVG path data"
    }
  ],
  "process": [
    {
      "step": 1,
      "title": "Step Title",
      "description": "Step description"
    }
  ],
  "partners": [],
  "faq": [
    {
      "question": "Question",
      "answer": "Answer"
    }
  ],
  "contact": {
    "phone": "+91 6398038550",
    "email": "infiniteinteriordecor@gmail.com",
    "address": "Bhimtal, Uttarakhand, India",
    "workingHours": "Monday - Saturday: 9:00 AM - 7:00 PM",
    "social": {
      "facebook": "",
      "instagram": "",
      "linkedin": "",
      "twitter": ""
    },
    "serviceAreas": ["Area 1", "Area 2", ...]
  },
  "seo": {
    "title": "SEO Title",
    "description": "SEO Description",
    "keywords": "keyword1, keyword2, keyword3"
  }
}
```

### Data Fetching
Data is fetched asynchronously using the JavaScript `fetch()` API:
- JSON files are loaded via `fetch('data/database.json')`
- Dynamic base URL resolution handles GitHub Pages subpaths
- Error handling with try-catch blocks
- Fallback content if data fails to load

---

## Asset Management & Routing

### Asset Storage Structure

**Logo**: `assets/images/logo/logo.png` (310KB)

**Project Images**: Organized by project ID
```
assets/images/projects/
├── baithke-bihari-jehanabad-2023/
│   ├── hero.webp
│   ├── thumbnail.webp
│   └── gallery/
│       ├── image-01.webp-01.webp
│       ├── image-01.webp-02.webp
│       ├── image-01.webp-03.webp
│       └── image-01.webp-04.webp
├── modern-residential-bhimtal-2022/
├── monte-carlo-jehanabad-2023/
└── the-salon-company-bhimtal-2022/
```

**Client Logos**: `assets/images/clients/`
**Hero Images**: `assets/images/hero/`
**Service Images**: `assets/images/services/`

### Dynamic Path Resolution

The project implements a robust base URL resolution system to handle GitHub Pages subpath deployment (`/infiniteinterior-decor/`).

#### Helper Functions

**`getBaseUrl()`** - Detects deployment environment
```javascript
function getBaseUrl() {
  const pathname = window.location.pathname;
  
  // Check if we're on GitHub Pages with the subpath
  if (pathname.includes('/infiniteinterior-decor/')) {
    return '/infiniteinterior-decor/';
  }
  
  // Local development or root deployment
  return '/';
}
```

**`resolveAssetPath(assetPath)`** - Resolves asset paths dynamically
```javascript
function resolveAssetPath(assetPath) {
  const baseUrl = getBaseUrl();
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  
  return baseUrl + cleanPath;
}
```

#### Usage Examples

**Logo Rendering** (navbar.js):
```javascript
const logoPath = resolveAssetPath('assets/images/logo/logo.png');
```

**Data Fetching** (projects.js, detail page):
```javascript
const response = await fetch(resolveAssetPath('data/database.json'));
```

**Image Loading** (projects.js):
```javascript
img.src = resolveAssetPath(project.image);
```

#### Environment Support
- **Local Development**: Uses `/` as base (e.g., `/assets/images/logo.png`)
- **GitHub Pages**: Uses `/infiniteinterior-decor/` as base (e.g., `/infiniteinterior-decor/assets/images/logo.png`)
- **Root Deployment**: Uses `/` as base

This ensures all assets load correctly regardless of deployment environment or page depth.

---

## Core JavaScript Files

### `js/core/app.js`
**Application Entry Point**
- Initializes all core modules
- Loads page-specific functionality based on current URL
- Manages module loading order
- Coordinates between different JavaScript modules

### `js/core/navbar.js`
**Navigation Component**
- Dynamic logo rendering with base URL resolution
- Scroll effects (glassmorphism on scroll)
- Mobile menu toggle functionality
- Navigation link path updates for nested pages
- Responsive menu behavior

### `js/core/image-placeholder.js`
**Image Placeholder System**
- Generates elegant placeholders for missing images
- Displays text-based placeholders with aspect ratios
- Automatic upgrade to real images when available
- Supports logo-specific placeholder styling
- Prevents layout shift during image loading

### `js/core/lazy-load.js`
**Lazy Loading Implementation**
- Native lazy loading with fallback for older browsers
- Intersection Observer API for performance
- Prevents Cumulative Layout Shift (CLS)
- Fade-in effects when images load
- Reserves space for images before loading

### `js/core/schema.js`
**Schema.org Structured Data**
- Dynamic generation of SEO structured data
- Supports LocalBusiness, InteriorDesigner schemas
- Organization and breadcrumb schemas
- FAQPage and ItemList schemas
- Page-specific schema generation

### `js/core/logo-base64.js`
**Base64 Logo Data**
- Contains Base64-encoded company logo
- Provides fallback for logo loading issues
- Used when external logo file fails to load

### `js/pages/home.js`
**Homepage Functionality**
- Scroll animations and parallax effects
- Counter animations for statistics
- Hero section interactions
- Dynamic content loading from database.json
- Scroll-triggered animations
- Mobile menu integration

### `js/pages/projects.js`
**Projects Page Functionality**
- Dynamic project rendering from database.json
- Category filtering (Residential, Commercial, Retail, Hospitality)
- Search functionality with debouncing
- Pagination with "Load More" functionality
- Project card rendering with actual images
- Empty state handling
- Base URL resolution for all assets

---

## Key Features

### GitHub Pages Subpath Support
- Automatic detection of `/infiniteinterior-decor/` subpath
- Dynamic base URL resolution for all assets
- Works locally and in production without configuration changes

### Performance Optimizations
- Lazy loading for images
- Native browser APIs where available
- Minimal external dependencies
- Optimized CSS with component-based architecture
- Efficient data fetching with async/await

### SEO Features
- Schema.org structured data
- Semantic HTML markup
- Meta tags for social sharing (Open Graph, Twitter)
- Sitemap.xml and robots.txt
- Canonical URLs

### Responsive Design
- Mobile-first approach
- Breakpoint-based CSS
- Responsive navigation with mobile menu
- Touch-friendly interactions
- Optimized for various screen sizes

---

## Development Notes

### Adding New Projects
1. Add project images to `assets/images/projects/{project-id}/`
2. Update `data/database.json` with project details
3. Ensure image paths match actual filenames
4. Use WebP format for optimal performance

### Modifying Styles
- Component CSS files in `css/components/`
- Page-specific CSS in `css/pages/`
- Core utilities in `css/core/`
- Main entry point: `css/main.css`

### Adding New Pages
1. Create HTML file in appropriate `pages/` subdirectory
2. Add corresponding CSS in `css/pages/`
3. Add page-specific JavaScript in `js/pages/` if needed
4. Update navigation links
5. Add to sitemap.xml

### Asset Path Best Practices
- Always use `resolveAssetPath()` for dynamic assets
- Store paths in database.json without leading slashes
- Use relative paths from project root
- Test both locally and on GitHub Pages

---

## Deployment

### GitHub Pages Configuration
- Repository: `infiniteinteriordecor/infiniteinterior-decor`
- Subpath: `/infiniteinterior-decor/`
- Source: `main` branch
- Root directory: `/`

### Build Process
- No build step required (static site)
- Direct deployment of source files
- Automatic GitHub Pages deployment on push

### Environment Variables
None required - all configuration is file-based

---

## Maintenance

### Regular Tasks
- Update project images and data
- Review and update SEO metadata
- Check for broken links
- Optimize image sizes
- Update client logos and testimonials

### Performance Monitoring
- Monitor Core Web Vitals
- Check image load times
- Review lazy loading effectiveness
- Validate structured data

---

*Documentation generated on July 27, 2026*
