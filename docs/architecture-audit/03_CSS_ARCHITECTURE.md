# 03_CSS_ARCHITECTURE.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete CSS architecture and dependency analysis

---

## CSS Files Overview

| File | Path | Purpose | Size |
|------|------|---------|------|
| Main Entry | css/main.css | Main CSS entry point with imports | 46 lines |
| Estimator Main | css/estimator.css | Estimator module main entry | 215 lines |
| Estimator Layout | css/estimator-layout.css | Estimator layout styles | 3,538 bytes |
| Estimator Components | css/estimator-components.css | Estimator UI components | 1,122 lines |
| Estimator Animations | css/estimator-animations.css | Estimator animations | 8,928 bytes |
| Estimator Responsive | css/estimator-responsive.css | Estimator responsive styles | 5,612 bytes |

**Total CSS Files:** 37  
**Core CSS:** 5 files  
**Component CSS:** 17 files  
**Page CSS:** 9 files  
**Estimator CSS:** 5 files  

---

## Core CSS Files

### 1. css/main.css

**Purpose:** Main CSS entry point that imports all core and component stylesheets.

**Imports:**
```css
@import url('core/design-tokens.css');
@import url('core/breakpoints.css');
@import url('core/reset.css');
@import url('core/utilities.css');
@import url('core/micro-interactions.css');
@import url('components/navbar.css');
@import url('components/footer.css');
@import url('components/button.css');
@import url('components/card.css');
@import url('components/grid.css');
@import url('components/image-placeholder.css');
@import url('components/trust.css');
@import url('components/features.css');
@import url('components/services-section.css');
@import url('components/projects-section.css');
@import url('components/cta.css');
@import url('components/gallery-section.css');
@import url('components/trusted-by.css');
@import url('components/why-choose.css');
@import url('components/process.css');
@import url('components/partners.css');
@import url('components/faq.css');
```

**Used By:**
- index.html
- pages/about/index.html
- pages/services/index.html
- pages/projects/index.html
- pages/projects/detail/index.html
- pages/gallery/index.html
- pages/contact/index.html
- pages/estimator/index.html (also loads estimator-specific CSS)

**Status:** Active - Main entry point for all pages except legal pages.

---

### 2. css/core/design-tokens.css

**Purpose:** CSS custom properties (design tokens) as single source of truth for design decisions.

**Categories:**
- Colors (Matte Black, Warm White, Champagne Gold, Walnut Brown, Stone Grey, Glass White, Bronze, Charcoal)
- Typography (font families, sizes, weights, line heights)
- Spacing (scale from 0 to 12)
- Radius (border radius values)
- Shadows (elevation shadows)
- Z-index (layering values)
- Transitions (easing functions)
- Container widths

**Used By:**
- All CSS files via main.css import
- Directly referenced in component styles

**Status:** Critical - Foundation of entire design system.

---

### 3. css/core/reset.css

**Purpose:** Comprehensive CSS reset for browser consistency.

**Resets:**
- Box-sizing to border-box
- Document margins and padding
- Typography (headings, paragraphs, text elements)
- Lists (ul, ol, li)
- Tables
- Form elements (inputs, textarea, select, button)
- Media elements (img, video, canvas, svg)
- Accessibility improvements (focus-visible, sr-only)
- Reduced motion support
- Print styles

**Used By:**
- All pages via main.css import

**Status:** Critical - Ensures cross-browser consistency.

---

### 4. css/core/breakpoints.css

**Purpose:** Responsive breakpoint definitions.

**Breakpoints:**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

**Used By:**
- All component and page CSS files

**Status:** Critical - Foundation of responsive design.

---

### 5. css/core/utilities.css

**Purpose:** Utility classes for common patterns.

**Utilities:**
- Display utilities (flex, grid, block, etc.)
- Flex utilities (flex-row, flex-col, items-center, justify-center, etc.)
- Spacing utilities (margin, padding)
- Text utilities (text-align, text-transform, font-weight)
- Color utilities (text colors, background colors)
- Border utilities
- Position utilities

**Used By:**
- All pages and components

**Status:** Active - Heavily used throughout.

---

### 6. css/core/micro-interactions.css

**Purpose:** Micro-interaction animations and transitions.

**Interactions:**
- Hover effects
- Focus states
- Active states
- Smooth transitions
- Loading animations

**Used By:**
- All pages via main.css import

**Status:** Active - Enhances user experience.

---

## Component CSS Files

### 7. css/components/navbar.css

**Purpose:** Navigation bar component styles.

**Features:**
- Glassmorphism effect
- Scroll detection styling
- Mobile menu
- Logo container
- Navigation links
- Mobile toggle button

**Used By:**
- All pages via main.css import

**Status:** Active - Used on all pages.

---

### 8. css/components/footer.css

**Purpose:** Footer component styles.

**Features:**
- Footer layout
- Social links
- Navigation links
- Copyright section

**Used By:**
- All pages via main.css import

**Status:** Active - Used on all pages.

---

### 9. css/components/button.css

**Purpose:** Button component styles.

**Variants:**
- Primary button
- Secondary button
- Outline button
- Ghost button
- Premium button (for Estimator)

**States:**
- Default
- Hover
- Focus
- Active
- Disabled

**Used By:**
- All pages via main.css import
- Estimator module

**Status:** Active - Heavily used.

---

### 10. css/components/card.css

**Purpose:** Card component styles.

**Variants:**
- Default card
- Project card
- Service card
- Feature card

**Used By:**
- All pages via main.css import

**Status:** Active - Heavily used.

---

### 11. css/components/grid.css

**Purpose:** Grid layout system.

**Features:**
- Container classes
- Grid layouts
- Responsive grid

**Used By:**
- All pages via main.css import

**Status:** Active - Foundation of layout system.

---

### 12. css/components/image-placeholder.css

**Purpose:** Image placeholder and lazy loading styles.

**Features:**
- Placeholder background
- Loading spinner
- Fade-in animation

**Used By:**
- All pages via main.css import

**Status:** Active - Used for image loading.

---

### 13. css/components/trust.css

**Purpose:** Trust indicators section styles.

**Features:**
- Trust badges
- Statistics
- Certifications

**Used By:**
- Home page

**Status:** Active - Page-specific component.

---

### 14. css/components/features.css

**Purpose:** Features section styles.

**Features:**
- Feature cards
- Feature grid
- Icons

**Used By:**
- Home page
- Services page

**Status:** Active - Reusable component.

---

### 15. css/components/services-section.css

**Purpose:** Services section component styles.

**Features:**
- Service cards
- Service grid
- Service icons

**Used By:**
- Home page
- Services page

**Status:** Active - Reusable component.

---

### 16. css/components/projects-section.css

**Purpose:** Projects section component styles.

**Features:**
- Project cards
- Project grid
- Project filters

**Used By:**
- Home page
- Projects page

**Status:** Active - Reusable component.

---

### 17. css/components/cta.css

**Purpose:** Call-to-action section styles.

**Features:**
- CTA cards
- CTA buttons
- CTA layouts

**Used By:**
- Home page
- Services page
- Contact page

**Status:** Active - Reusable component.

---

### 18. css/components/gallery-section.css

**Purpose:** Gallery section component styles.

**Features:**
- Gallery grid
- Gallery items
- Lightbox styles

**Used By:**
- Home page
- Gallery page

**Status:** Active - Reusable component.

---

### 19. css/components/trusted-by.css

**Purpose:** Trusted by section styles (client logos).

**Features:**
- Logo grid
- Logo cards
- Partner logos

**Used By:**
- Home page

**Status:** Active - Page-specific component.

---

### 20. css/components/why-choose.css

**Purpose:** Why choose section styles.

**Features:**
- Benefit cards
- Benefit icons
- Benefit grid

**Used By:**
- Home page
- About page

**Status:** Active - Reusable component.

---

### 21. css/components/process.css

**Purpose:** Process section styles.

**Features:**
- Process steps
- Process timeline
- Process icons

**Used By:**
- Services page

**Status:** Active - Page-specific component.

---

### 22. css/components/partners.css

**Purpose:** Partners section styles.

**Features:**
- Partner logos
- Partner grid

**Used By:**
- About page

**Status:** Active - Page-specific component.

---

### 23. css/components/faq.css

**Purpose:** FAQ section styles.

**Features:**
- FAQ accordion
- FAQ items
- FAQ answers

**Used By:**
- Services page
- Contact page

**Status:** Active - Reusable component.

---

## Page CSS Files

### 24. css/pages/home.css

**Purpose:** Home page specific styles.

**Features:**
- Hero section with cinematic animations
- Mesh gradients
- Spotlight effects
- Floating light blobs
- Grain texture
- Gold ambient glow
- Mouse-follow radial light

**Used By:**
- index.html only

**Status:** Active - Page-specific.

---

### 25. css/pages/about.css

**Purpose:** About page specific styles.

**Features:**
- About hero
- Story section
- Mission section
- Team section
- Values section

**Used By:**
- pages/about/index.html only

**Status:** Active - Page-specific.

---

### 26. css/pages/services.css

**Purpose:** Services page specific styles.

**Features:**
- Services hero
- Service details
- Process timeline

**Used By:**
- pages/services/index.html only

**Status:** Active - Page-specific.

---

### 27. css/pages/projects.css

**Purpose:** Projects page specific styles.

**Features:**
- Projects hero
- Project grid
- Filter controls
- Project cards

**Used By:**
- pages/projects/index.html only

**Status:** Active - Page-specific.

---

### 28. css/pages/project-detail.css

**Purpose:** Project detail page specific styles.

**Features:**
- Project hero
- Project gallery
- Project details
- Related projects

**Used By:**
- pages/projects/detail/index.html only

**Status:** Active - Page-specific.

---

### 29. css/pages/gallery.css

**Purpose:** Gallery page specific styles.

**Features:**
- Gallery hero
- Gallery grid
- Lightbox functionality

**Used By:**
- pages/gallery/index.html only

**Status:** Active - Page-specific.

---

### 30. css/pages/contact.css

**Purpose:** Contact page specific styles.

**Features:**
- Contact hero
- Contact form
- Contact information
- Map placeholder

**Used By:**
- pages/contact/index.html only

**Status:** Active - Page-specific.

---

### 31. css/pages/404.css

**Purpose:** 404 error page specific styles.

**Features:**
- Error page layout
- Error message
- Back to home button

**Used By:**
- pages/404/index.html only

**Status:** Active - Page-specific.

---

### 32. css/pages/legal.css

**Purpose:** Legal pages (Privacy, Terms) specific styles.

**Features:**
- Legal hero
- Legal content
- Legal sections

**Used By:**
- pages/privacy/index.html
- pages/terms/index.html

**Status:** Active - Shared by multiple pages.

---

## Estimator CSS Files

### 33. css/estimator.css

**Purpose:** Estimator module main entry point.

**Features:**
- Estimator page base
- App container
- Loading state
- Main content area
- Wizard container
- Progress indicator
- Step container
- Navigation controls
- Summary view
- Accessibility features

**Dependencies:**
- Inherits from css/main.css (design tokens, components)

**Used By:**
- pages/estimator/index.html

**Status:** Active - Estimator module entry point.

---

### 34. css/estimator-layout.css

**Purpose:** Estimator layout styles.

**Features:**
- Layout containers
- Grid systems
- Responsive layouts
- Spacing

**Dependencies:**
- css/estimator.css
- css/main.css

**Used By:**
- pages/estimator/index.html

**Status:** Active - Estimator module layout.

---

### 35. css/estimator-components.css

**Purpose:** Estimator UI components.

**Features:**
- Progress steps
- Form inputs
- Select dropdowns
- Radio buttons
- Checkboxes
- Range sliders
- Cards
- Buttons
- Modals
- Accordions

**Dependencies:**
- css/estimator.css
- css/main.css (button, card styles)

**Used By:**
- pages/estimator/index.html

**Status:** Active - Estimator module components.

---

### 36. css/estimator-animations.css

**Purpose:** Estimator animations.

**Features:**
- Step transitions
- Loading animations
- Success animations
- Error animations
- Micro-interactions

**Dependencies:**
- css/estimator.css
- css/main.css

**Used By:**
- pages/estimator/index.html

**Status:** Active - Estimator module animations.

---

### 37. css/estimator-responsive.css

**Purpose:** Estimator responsive styles.

**Features:**
- Mobile layouts
- Tablet layouts
- Desktop layouts
- Breakpoint-specific adjustments

**Dependencies:**
- css/estimator.css
- css/main.css

**Used By:**
- pages/estimator/index.html

**Status:** Active - Estimator module responsive design.

---

## CSS Dependency Tree

```
css/main.css (Entry Point)
├── css/core/design-tokens.css (Critical)
├── css/core/breakpoints.css (Critical)
├── css/core/reset.css (Critical)
├── css/core/utilities.css (Critical)
├── css/core/micro-interactions.css (Critical)
├── css/components/navbar.css (Active)
├── css/components/footer.css (Active)
├── css/components/button.css (Active)
├── css/components/card.css (Active)
├── css/components/grid.css (Active)
├── css/components/image-placeholder.css (Active)
├── css/components/trust.css (Page-specific)
├── css/components/features.css (Reusable)
├── css/components/services-section.css (Reusable)
├── css/components/projects-section.css (Reusable)
├── css/components/cta.css (Reusable)
├── css/components/gallery-section.css (Reusable)
├── css/components/trusted-by.css (Page-specific)
├── css/components/why-choose.css (Reusable)
├── css/components/process.css (Page-specific)
├── css/components/partners.css (Page-specific)
└── css/components/faq.css (Reusable)

css/estimator.css (Estimator Entry Point)
├── Inherits from css/main.css
├── css/estimator-layout.css
├── css/estimator-components.css
├── css/estimator-animations.css
└── css/estimator-responsive.css

Page-Specific CSS:
├── css/pages/home.css
├── css/pages/about.css
├── css/pages/services.css
├── css/pages/projects.css
├── css/pages/project-detail.css
├── css/pages/gallery.css
├── css/pages/contact.css
├── css/pages/404.css
└── css/pages/legal.css (shared by Privacy & Terms)
```

---

## Unused CSS

### Component Files Not Used

| File | Status | Notes |
|------|--------|-------|
| components/navbar.html | Unused | HTML component file not used (inline HTML instead) |
| components/footer.html | Unused | HTML component file not used (inline HTML instead) |
| components/button.html | Unused | HTML component file not used (inline HTML instead) |

**Note:** CSS component files ARE used, but HTML component files are not. All pages use inline HTML for navbar and footer.

---

## Duplicate CSS

### Potential Duplicates

1. **Button Styles**
   - css/components/button.css defines button styles
   - css/estimator-components.css may redefine some button styles
   - **Impact:** Low - Estimator may need specific button variants

2. **Card Styles**
   - css/components/card.css defines card styles
   - css/estimator-components.css may redefine some card styles
   - **Impact:** Low - Estimator may need specific card variants

3. **Grid Styles**
   - css/components/grid.css defines grid system
   - css/estimator-layout.css may define grid layouts
   - **Impact:** Low - Estimator may need specific grid layouts

---

## Shared CSS

### Shared Across All Pages

- css/main.css (via import)
- css/core/design-tokens.css
- css/core/reset.css
- css/core/utilities.css
- css/components/navbar.css
- css/components/footer.css
- css/components/button.css
- css/components/card.css

### Shared Component CSS

- css/components/features.css (Home, About)
- css/components/services-section.css (Home, Services)
- css/components/projects-section.css (Home, Projects)
- css/components/cta.css (Home, Services, Contact)
- css/components/gallery-section.css (Home, Gallery)
- css/components/why-choose.css (Home, About)
- css/components/faq.css (Services, Contact)

### Shared Page CSS

- css/pages/legal.css (Privacy, Terms)

---

## Critical CSS

### Critical for Rendering

1. **css/core/design-tokens.css** - Foundation of design system
2. **css/core/reset.css** - Browser consistency
3. **css/core/breakpoints.css** - Responsive design
4. **css/core/utilities.css** - Layout utilities
5. **css/main.css** - Entry point

### Critical for Functionality

1. **css/components/navbar.css** - Navigation
2. **css/components/button.css** - Interactive elements
3. **css/estimator.css** - Estimator module
4. **css/estimator-components.css** - Estimator UI

---

## CSS Loading Strategy

### Main Pages

All main pages load:
1. css/main.css (imports all core and component CSS)
2. css/pages/[page].css (page-specific overrides)

### Estimator Page

Estimator page loads:
1. css/main.css (imports all core and component CSS)
2. css/estimator.css (estimator base)
3. css/estimator-layout.css (estimator layout)
4. css/estimator-components.css (estimator components)
5. css/estimator-responsive.css (estimator responsive)
6. css/estimator-animations.css (estimator animations)

### Legal Pages

Legal pages load:
1. css/main.css (imports all core and component CSS)
2. css/pages/legal.css (legal page styles)

**Note:** Legal pages have path inconsistencies (use ../css/ instead of ../../css/).

---

## CSS Architecture Strengths

1. **Modular Design:** Clear separation of core, component, and page CSS
2. **Design Tokens:** Single source of truth for design decisions
3. **Consistent Naming:** BEM-like naming convention (block__element--modifier)
4. **Responsive First:** Breakpoints defined and used consistently
5. **Component Reusability:** Component CSS can be shared across pages
6. **Estimator Isolation:** Estimator CSS is isolated from main site CSS

---

## CSS Architecture Weaknesses

1. **HTML Components Unused:** Component HTML files exist but are not used
2. **Path Inconsistencies:** Legal pages use incorrect CSS paths
3. **Potential Duplicates:** Button and card styles may be duplicated in estimator
4. **Large File Sizes:** Some CSS files are large (home.css: 875 lines)
5. **No CSS Minification:** CSS files are not minified for production
6. **No CSS Purge:** Unused CSS may be included in production

---

## Summary

**Total CSS Files:** 37  
**Core CSS:** 5 files  
**Component CSS:** 17 files  
**Page CSS:** 9 files  
**Estimator CSS:** 5 files  
**Unused CSS:** 0 (all CSS files are used)  
**Unused HTML Components:** 3 files  
**Duplicate CSS:** Potential duplicates in estimator  
**Shared CSS:** Well-organized and reused  
**Critical CSS:** 5 files for rendering, 4 files for functionality  
**CSS Loading:** Main pages use main.css + page CSS, Estimator uses dedicated CSS stack
