# 01_PROJECT_STRUCTURE.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete folder structure and file inventory

---

## Complete Folder Tree

```
Infinite-Interior/
│
├── .git/
│   └── Git version control repository
│
├── .github/
│   └── GitHub configuration (workflows, settings)
│
├── .gitignore
│   └── Git ignore rules (blocks *.md except docs/architecture-audit/)
│
├── admin/
│   └── Administrative files (empty)
│
├── assets/
│   ├── icons/ (empty)
│   ├── images/
│   │   ├── clients/
│   │   │   ├── adidas.svg
│   │   │   ├── baithke-bihari-cafe.png
│   │   │   ├── blackberrys.png
│   │   │   ├── hairmasters.png
│   │   │   ├── manyavar.png
│   │   │   ├── monte-carlo.png
│   │   │   ├── nazeer.png
│   │   │   ├── red-tape.jpg
│   │   │   ├── reebok.svg
│   │   │   ├── the-salons-company.jpg
│   │   │   └── van-heusen.png
│   │   ├── company/ (empty)
│   │   ├── gallery/
│   │   │   └── WhatsApp Image 2026-07-08 at 13.52.16.jpeg
│   │   ├── hero/ (empty)
│   │   ├── logo/
│   │   │   └── logo.png
│   │   ├── projects/
│   │   │   ├── baithke-bihari-jehanabad-2023/
│   │   │   │   └── gallery/ (empty)
│   │   │   ├── modern-residential-bhimtal-2022/
│   │   │   │   └── gallery/ (empty)
│   │   │   ├── monte-carlo-jehanabad-2023/
│   │   │   │   └── gallery/ (empty)
│   │   │   ├── pahadi-ghonsla-bhimtal/
│   │   │   │   └── gallery/ (empty)
│   │   │   └── the-salon-company-bhimtal-2022/
│   │   │       └── gallery/ (empty)
│   │   ├── services/ (empty)
│   │   └── team/ (empty)
│   └── videos/ (empty)
│
├── components/
│   ├── button.html
│   ├── footer.html
│   └── navbar.html
│
├── config/ (empty)
│
├── css/
│   ├── components/
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
│   ├── core/
│   │   ├── breakpoints.css
│   │   ├── design-tokens.css
│   │   ├── micro-interactions.css
│   │   ├── reset.css
│   │   └── utilities.css
│   ├── pages/
│   │   ├── 404.css
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── gallery.css
│   │   ├── home.css
│   │   ├── legal.css
│   │   ├── project-detail.css
│   │   ├── projects.css
│   │   └── services.css
│   ├── estimator-animations.css
│   ├── estimator-components.css
│   ├── estimator-layout.css
│   ├── estimator-responsive.css
│   ├── estimator.css
│   └── main.css
│
├── data/
│   ├── database.json
│   └── estimator/
│       ├── brands.json
│       ├── cities.json
│       ├── hardware.json
│       ├── materials/
│       │   ├── automation.json
│       │   ├── boards.json
│       │   ├── electrical.json
│       │   ├── false-ceiling.json
│       │   ├── finishes.json
│       │   ├── glass.json
│       │   ├── hardware.json
│       │   ├── kitchen-accessories.json
│       │   ├── laminates.json
│       │   ├── lighting.json
│       │   ├── paint.json
│       │   ├── plumbing.json
│       │   ├── plywood.json
│       │   ├── stone.json
│       │   └── wardrobe-accessories.json
│       ├── materials.json
│       ├── modules.json
│       ├── package-library.json
│       ├── pricing-rules.json
│       ├── recommendations.json
│       ├── room-library.json
│       ├── styles.json
│       ├── upgrade-rules.json
│       └── validation-rules.json
│
├── docs/
│   ├── architecture-audit/ (this folder)
│   └── reports/ (existing reports)
│
├── favicon.ico
│
├── gallery/ (empty)
│
├── index.html
│
├── js/
│   ├── core/
│   │   ├── app.js
│   │   ├── image-placeholder.js
│   │   ├── lazy-load.js
│   │   ├── navbar.js
│   │   └── schema.js
│   ├── pages/
│   │   ├── home.js
│   │   └── projects.js
│   ├── boq-engine.js
│   ├── budget-engine.js
│   ├── comparison-engine.js
│   ├── estimator-bootstrap.js
│   ├── estimator-engine.js
│   ├── estimator-router.js
│   ├── estimator-state.js
│   ├── estimator-ui.js
│   ├── estimator.js
│   ├── helpers.js
│   ├── material-engine.js
│   ├── module-engine.js
│   ├── package-engine.js
│   ├── pdf-generator.js
│   ├── recommendation-engine.js
│   ├── storage-manager.js
│   ├── storage.js
│   └── validation.js
│
├── layouts/
│   └── default.html
│
├── manifest.json
│
├── pages/
│   ├── 404/
│   │   └── index.html
│   ├── about/
│   │   └── index.html
│   ├── contact/
│   │   └── index.html
│   ├── estimator/
│   │   └── index.html
│   ├── gallery/
│   │   └── index.html
│   ├── privacy/
│   │   └── index.html
│   ├── projects/
│   │   ├── detail/
│   │   │   └── index.html
│   │   └── index.html
│   ├── services/
│   │   └── index.html
│   └── terms/
│       └── index.html
│
├── robots.txt
│
├── sitemap.xml
│
└── [Various .md report files in root]
```

---

## Folder Explanations

### Root Level

**.git/**  
Git version control repository. Contains all commit history, branches, and configuration.

**.github/**  
GitHub-specific configuration. Contains workflows for CI/CD, issue templates, and other GitHub features.

**.gitignore**  
Git ignore rules. Currently blocks all `.md` files except those in `docs/architecture-audit/`.

**admin/**  
Administrative files. Currently empty, reserved for future admin panel.

**assets/**  
Static assets for the website. Contains images, icons, and videos.

**components/**  
Reusable HTML components. Contains navbar, footer, and button components.

**config/**  
Configuration files. Currently empty, reserved for future configuration.

**css/**  
Stylesheets. Organized into components, core, pages, and estimator-specific CSS.

**data/**  
JSON data files. Contains the main database and estimator-specific data.

**docs/**  
Documentation. Contains architecture audit and existing reports.

**favicon.ico**  
Website favicon.

**gallery/**  
Gallery images. Currently empty, gallery images stored in assets/images/gallery/.

**index.html**  
Main homepage entry point.

**js/**  
JavaScript files. Organized into core, pages, and estimator-specific modules.

**layouts/**  
HTML layout templates. Contains default layout.

**manifest.json**  
PWA manifest for progressive web app features.

**pages/**  
Page-specific HTML files. Each page has its own folder with index.html.

**robots.txt**  
Search engine crawler instructions.

**sitemap.xml**  
XML sitemap for SEO.

### Subfolders

**assets/images/**  
All website images organized by category (clients, gallery, logo, projects, services, team).

**assets/images/projects/**  
Project-specific images organized by project name with gallery subfolders.

**css/components/**  
Component-specific stylesheets (button, card, navbar, etc.).

**css/core/**  
Core CSS utilities (reset, design tokens, breakpoints, utilities).

**css/pages/**  
Page-specific stylesheets (home, about, contact, etc.).

**data/estimator/**  
Estimator module data files (materials, pricing, recommendations, etc.).

**data/estimator/materials/**  
Detailed material data organized by category (boards, electrical, lighting, etc.).

**js/core/**  
Core JavaScript modules (app, navbar, schema, image-placeholder, lazy-load).

**js/pages/**  
Page-specific JavaScript (home, projects).

**pages/**  
Each page has its own folder with index.html for better organization.

---

## File Counts

### HTML Files: 15
- index.html (root)
- components/button.html
- components/footer.html
- components/navbar.html
- layouts/default.html
- pages/404/index.html
- pages/about/index.html
- pages/contact/index.html
- pages/estimator/index.html
- pages/gallery/index.html
- pages/privacy/index.html
- pages/projects/detail/index.html
- pages/projects/index.html
- pages/services/index.html
- pages/terms/index.html

### CSS Files: 37
- css/main.css
- css/estimator.css
- css/estimator-layout.css
- css/estimator-components.css
- css/estimator-animations.css
- css/estimator-responsive.css
- css/core/reset.css
- css/core/design-tokens.css
- css/core/breakpoints.css
- css/core/utilities.css
- css/core/micro-interactions.css
- css/components/button.css
- css/components/card.css
- css/components/cta.css
- css/components/faq.css
- css/components/features.css
- css/components/footer.css
- css/components/gallery-section.css
- css/components/grid.css
- css/components/image-placeholder.css
- css/components/navbar.css
- css/components/partners.css
- css/components/process.css
- css/components/projects-section.css
- css/components/services-section.css
- css/components/trust.css
- css/components/trusted-by.css
- css/components/why-choose.css
- css/pages/home.css
- css/pages/about.css
- css/pages/services.css
- css/pages/projects.css
- css/pages/project-detail.css
- css/pages/gallery.css
- css/pages/contact.css
- css/pages/404.css
- css/pages/legal.css

### JS Files: 25
- js/helpers.js
- js/storage.js
- js/storage-manager.js
- js/estimator-state.js
- js/validation.js
- js/estimator-router.js
- js/material-engine.js
- js/package-engine.js
- js/budget-engine.js
- js/recommendation-engine.js
- js/comparison-engine.js
- js/module-engine.js
- js/boq-engine.js
- js/pdf-generator.js
- js/estimator-engine.js
- js/estimator-ui.js
- js/estimator-bootstrap.js
- js/estimator.js
- js/core/app.js
- js/core/navbar.js
- js/core/schema.js
- js/core/image-placeholder.js
- js/core/lazy-load.js
- js/pages/home.js
- js/pages/projects.js

### JSON Files: 29
- data/database.json
- data/estimator/materials.json
- data/estimator/brands.json
- data/estimator/cities.json
- data/estimator/hardware.json
- data/estimator/modules.json
- data/estimator/package-library.json
- data/estimator/pricing-rules.json
- data/estimator/recommendations.json
- data/estimator/room-library.json
- data/estimator/styles.json
- data/estimator/upgrade-rules.json
- data/estimator/validation-rules.json
- data/estimator/materials/automation.json
- data/estimator/materials/boards.json
- data/estimator/materials/electrical.json
- data/estimator/materials/false-ceiling.json
- data/estimator/materials/finishes.json
- data/estimator/materials/glass.json
- data/estimator/materials/hardware.json
- data/estimator/materials/kitchen-accessories.json
- data/estimator/materials/laminates.json
- data/estimator/materials/lighting.json
- data/estimator/materials/paint.json
- data/estimator/materials/plumbing.json
- data/estimator/materials/plywood.json
- data/estimator/materials/stone.json
- data/estimator/materials/wardrobe-accessories.json
- manifest.json

### Images: 12
- assets/images/logo/logo.png
- assets/images/clients/adidas.svg
- assets/images/clients/reebok.svg
- assets/images/clients/baithke-bihari-cafe.png
- assets/images/clients/blackberrys.png
- assets/images/clients/hairmasters.png
- assets/images/clients/manyavar.png
- assets/images/clients/monte-carlo.png
- assets/images/clients/nazeer.png
- assets/images/clients/red-tape.jpg
- assets/images/clients/the-salons-company.jpg
- assets/images/clients/van-heusen.png
- assets/images/gallery/WhatsApp Image 2026-07-08 at 13.52.16.jpeg

### Fonts: 0
No font files found. Fonts likely loaded via Google Fonts or CDN.

### Icons: 0
No icon files found in assets/icons/. Icons likely loaded via CDN or inline SVG.

### Documents: 0
No document files (PDF, DOC, etc.) found.

### Reports: 20+
Multiple .md report files in root directory (PROJECT_ARCHITECTURE.md, ESTIMATOR_ENGINE_REPORT.md, etc.)

---

## Total Files Summary

- **Total Folders:** 50
- **Total HTML Files:** 15
- **Total CSS Files:** 37
- **Total JS Files:** 25
- **Total JSON Files:** 29
- **Total Images:** 12
- **Total Fonts:** 0
- **Total Icons:** 0
- **Total Documents:** 0
- **Total Reports:** 20+ (root level .md files)

**Grand Total Files:** 138+ (excluding git and empty folders)

---

## Folder Purpose Summary

| Folder | Purpose | Status |
|--------|---------|--------|
| assets | Static assets (images, icons, videos) | Active |
| components | Reusable HTML components | Active |
| config | Configuration files | Empty (reserved) |
| css | Stylesheets | Active |
| data | JSON data files | Active |
| docs | Documentation | Active |
| gallery | Gallery images | Empty (reserved) |
| js | JavaScript modules | Active |
| layouts | HTML layout templates | Active |
| pages | Page-specific HTML | Active |
| admin | Admin panel | Empty (reserved) |

---

## Architecture Notes

1. **Modular Structure:** Clear separation of concerns with dedicated folders for assets, components, CSS, JS, and data.

2. **Page Organization:** Each page has its own folder with index.html, enabling better organization and future expansion.

3. **Component System:** Reusable components stored in components/ folder for maintainability.

4. **Estimator Module:** Dedicated estimator-specific files (CSS, JS, data) indicating a complex feature module.

5. **Empty Folders:** Several empty folders (admin, gallery, config, icons, videos) indicate planned features or reserved space.

6. **Documentation:** Multiple report files in root suggest active development and debugging process.

7. **GitHub Pages:** Structure compatible with GitHub Pages static hosting.

8. **PWA Ready:** manifest.json indicates progressive web app capabilities.
