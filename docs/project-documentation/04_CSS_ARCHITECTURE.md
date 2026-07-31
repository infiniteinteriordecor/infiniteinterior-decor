# CSS Architecture Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\css\`  
**Total CSS Files:** 39  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses a modular CSS architecture with BEM naming convention, design tokens, and component-based organization. The architecture is designed for maintainability, performance, and scalability.

---

## CSS Architecture Principles

### 1. Modular Organization
- Core styles in `css/core/`
- Component styles in `css/components/`
- Page styles in `css/pages/`
- Estimator styles separated into 4 specialized files

### 2. BEM Naming Convention
- Block: `.component-name`
- Element: `.component-name__element`
- Modifier: `.component-name--modifier`

### 3. Design Tokens
- Centralized design system in `design-tokens.css`
- Consistent colors, fonts, spacing
- Easy theming and updates

### 4. Utility Classes
- Common utility patterns in `utilities.css`
- Prefix with `u-` to avoid conflicts
- Composable utility classes

### 5. Performance First
- CSS imports for modularity
- Critical CSS inline
- Minimal CSS size
- Optimized for caching

---

## CSS File Structure

### Core CSS (5 files)

#### css/core/design-tokens.css
**Purpose:** Design system tokens (colors, fonts, spacing)

```css
:root {
  /* Colors */
  --color-primary: #9a7d3e;
  --color-secondary: #1a1a1a;
  --color-accent: #c9a962;
  
  /* Typography */
  --font-primary: 'Cormorant Garamond', serif;
  --font-secondary: 'Plus Jakarta Sans', sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  
  /* etc. */
}
```

#### css/core/breakpoints.css
**Purpose:** Responsive breakpoints

```css
:root {
  --breakpoint-mobile: 480px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-wide: 1440px;
}
```

#### css/core/reset.css
**Purpose:** CSS reset and normalization

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

#### css/core/utilities.css
**Purpose:** Utility classes

```css
.u-container { max-width: 1200px; margin: 0 auto; }
.u-display-flex { display: flex; }
.u-flex-row { flex-direction: row; }
.u-items-center { align-items: center; }
.u-gap-6 { gap: 1.5rem; }
.u-sr-only { position: absolute; width: 1px; height: 1px; }
```

#### css/core/micro-interactions.css
**Purpose:** Animations and transitions

```css
:root {
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### Component CSS (18 files)

#### css/components/navbar.css
**Purpose:** Navigation component styles

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar__nav--desktop {
  display: flex;
  flex-direction: row;
}

.navbar__link--active {
  color: var(--color-primary);
}
```

#### css/components/footer.css
**Purpose:** Footer component styles

```css
.footer {
  background: var(--color-secondary);
  color: var(--color-white);
  padding: var(--spacing-lg) 0;
}
```

#### css/components/button.css
**Purpose:** Button component styles

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  cursor: pointer;
}

.button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.button--large {
  padding: var(--spacing-md) var(--spacing-lg);
}
```

#### Other Component Files
- `card.css` - Card component
- `cta.css` - Call-to-action component
- `faq.css` - FAQ component
- `features.css` - Features section
- `gallery-section.css` - Gallery section
- `grid.css` - Grid system
- `image-placeholder.css` - Image placeholder
- `partners.css` - Partners section
- `process.css` - Process section
- `projects-section.css` - Projects section
- `services-section.css` - Services section
- `trust.css` - Trust indicators
- `trusted-by.css` - Trusted by section
- `why-choose.css` - Why choose section

### Page CSS (9 files)

#### css/pages/home.css
**Purpose:** Homepage-specific styles

```css
.hero {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

#### Other Page Files
- `404.css` - 404 error page
- `about.css` - About page
- `contact.css` - Contact page
- `gallery.css` - Gallery page
- `legal.css` - Legal pages
- `project-detail.css` - Project detail
- `projects.css` - Projects listing
- `services.css` - Services page

### Estimator CSS (5 files)

#### css/estimator.css
**Purpose:** Main estimator styles

```css
.estimator-app {
  min-height: 100vh;
  background: var(--color-secondary);
}

.estimator-wizard {
  max-width: 1200px;
  margin: 0 auto;
}
```

#### css/estimator-layout.css
**Purpose:** Estimator layout styles

```css
.estimator-step-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .estimator-step-container {
    grid-template-columns: 2fr 1fr;
  }
}
```

#### css/estimator-components.css
**Purpose:** Estimator component styles

```css
.estimator-card {
  background: var(--color-white);
  border-radius: 8px;
  padding: var(--spacing-md);
}

.estimator-input {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
}
```

#### css/estimator-animations.css
**Purpose:** Estimator animations

```css
@keyframes estimator-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.estimator-step {
  animation: estimator-fade-in 0.3s ease;
}
```

#### css/estimator-responsive.css
**Purpose:** Estimator responsive styles

```css
@media (max-width: 768px) {
  .estimator-wizard {
    padding: var(--spacing-sm);
  }
  
  .estimator-progress {
    display: none;
  }
}
```

### Main CSS (1 file)

#### css/main.css
**Purpose:** CSS entry point with imports

```css
/* ============================================
   CORE STYLES
   ============================================ */

@import url('core/design-tokens.css');
@import url('core/breakpoints.css');
@import url('core/reset.css');
@import url('core/utilities.css');
@import url('core/micro-interactions.css');

/* ============================================
   COMPONENT STYLES
   ============================================ */

@import url('components/navbar.css');
@import url('components/footer.css');
@import url('components/button.css');
/* ... other component imports ... */

/* ============================================
   PAGE STYLES
   ============================================ */

/* Page styles loaded separately per page */
```

---

## CSS Naming Conventions

### BEM (Block Element Modifier)

```css
/* Block */
.navbar { }

/* Element */
.navbar__brand { }
.navbar__nav { }
.navbar__link { }

/* Modifier */
.navbar__nav--desktop { }
.navbar__nav--mobile { }
.navbar__link--active { }
.navbar__link--premium { }
```

### Utility Classes

```css
/* Prefix with u- */
.u-container { }
.u-display-flex { }
.u-flex-row { }
.u-items-center { }
.u-gap-6 { }
.u-sr-only { }
```

### Component Modifiers

```css
.button { }
.button--primary { }
.button--secondary { }
.button--large { }
.button--small { }
```

---

## CSS Design Tokens

### Color Tokens

```css
:root {
  /* Primary Colors */
  --color-primary: #9a7d3e;
  --color-primary-light: #c9a962;
  --color-primary-dark: #7a5d2e;
  
  /* Secondary Colors */
  --color-secondary: #1a1a1a;
  --color-secondary-light: #2a2a2a;
  
  /* Accent Colors */
  --color-accent: #c9a962;
  
  /* Neutral Colors */
  --color-white: #ffffff;
  --color-black: #000000;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
  
  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

### Typography Tokens

```css
:root {
  /* Font Families */
  --font-primary: 'Cormorant Garamond', serif;
  --font-secondary: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'Courier New', monospace;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

### Spacing Tokens

```css
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
}
```

### Border Tokens

```css
:root {
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
  --border-radius-full: 9999px;
  
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;
}
```

### Shadow Tokens

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Transition Tokens

```css
:root {
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
  --transition-slower: 0.75s ease;
}
```

---

## CSS Grid System

### Grid Classes

```css
.grid {
  display: grid;
  gap: var(--spacing-md);
}

.grid--2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid--3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid--4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .grid--2,
  .grid--3,
  .grid--4 {
    grid-template-columns: 1fr;
  }
}
```

---

## CSS Responsive Design

### Mobile-First Approach

```css
/* Base styles (mobile) */
.component {
  padding: var(--spacing-sm);
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: var(--spacing-md);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-lg);
  }
}
```

### Breakpoint Usage

```css
/* Mobile (default) */
@media (min-width: 480px) { /* Mobile large */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Wide */ }
```

---

## CSS Performance Optimizations

### 1. CSS Imports
- Modular imports for maintainability
- Page-specific CSS loaded separately
- Critical CSS inline

### 2. Minification
- Remove comments in production
- Remove whitespace
- Optimize selectors

### 3. Selector Optimization
- Avoid deep nesting
- Use class selectors over tag selectors
- Avoid universal selectors

### 4. CSS Caching
- Long cache headers for CSS files
- Version-based file naming
- CDN distribution

---

## CSS Best Practices

### 1. Use BEM Naming
```css
.card { }
.card__title { }
.card--featured { }
```

### 2. Use Design Tokens
```css
.component {
  color: var(--color-primary);
  padding: var(--spacing-md);
}
```

### 3. Avoid Magic Numbers
```css
/* Bad */
.component { margin: 23px; }

/* Good */
.component { margin: var(--spacing-6); }
```

### 4. Use Utility Classes
```html
<div class="u-display-flex u-items-center u-gap-6">
```

### 5. Organize by Function
```css
/* Layout */
.component { }

/* Typography */
.component__title { }

/* States */
.component:hover { }
```

---

## CSS Maintenance Guidelines

### 1. Keep CSS Modular
- One component per file
- Clear file naming
- Logical grouping

### 2. Keep CSS Semantic
- Use meaningful class names
- Avoid presentational classes
- Use BEM convention

### 3. Keep CSS Performant
- Minimize CSS size
- Optimize selectors
- Use CSS efficiently

### 4. Keep CSS Consistent
- Follow naming conventions
- Use design tokens
- Maintain style guide

---

## CSS Tools

### Validation
- W3C CSS Validator
- Stylelint
- Browser DevTools

### Optimization
- CSS Nano
- PurgeCSS
- CSS Minifier

### Debugging
- Browser DevTools
- CSS Grid Inspector
- Flexbox Inspector

---

## Notes

- All CSS uses BEM naming convention
- Design tokens for consistency
- Modular architecture for maintainability
- Mobile-first responsive design
- Performance optimized
- No CSS framework (custom implementation)

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
