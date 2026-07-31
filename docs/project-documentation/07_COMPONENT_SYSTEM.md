# Component System Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses a component-based architecture for both HTML and CSS. Components are reusable, self-contained units that can be composed to build pages.

---

## HTML Components

### Component Structure

```
components/
├── button.html
├── footer.html
└── navbar.html
```

### Component Usage

Components are HTML fragments that can be included in pages. Since this is a static site without a build process, components are typically copied into pages or referenced via server-side includes (if supported).

### Button Component

**File:** `components/button.html`

**Purpose:** Reusable button component

**Variants:**
- Primary button
- Secondary button
- Large button
- Small button

**HTML Structure:**
```html
<button class="button button--primary button--large">
  <span class="button__text">Click Me</span>
</button>
```

**CSS Classes:**
- `.button` - Base button
- `.button--primary` - Primary variant
- `.button--secondary` - Secondary variant
- `.button--large` - Large size
- `.button--small` - Small size

### Navbar Component

**File:** `components/navbar.html`

**Purpose:** Navigation component with mobile responsive menu

**Features:**
- Desktop navigation
- Mobile navigation drawer
- Active state indication
- Accessibility features

**HTML Structure:**
```html
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar__container u-container">
    <div class="navbar__brand">
      <a href="index.html" class="navbar__logo-link">
        <div id="navbar-logo-container" class="navbar__logo-container"></div>
      </a>
    </div>
    
    <ul class="navbar__nav navbar__nav--desktop">
      <li class="navbar__item">
        <a href="index.html" class="navbar__link navbar__link--active">Home</a>
      </li>
      <!-- More nav items -->
    </ul>
    
    <button class="navbar__toggle" aria-label="Toggle navigation menu">
      <span class="navbar__toggle-icon">
        <span class="navbar__toggle-line"></span>
        <span class="navbar__toggle-line"></span>
        <span class="navbar__toggle-line"></span>
      </span>
    </button>
  </div>
  
  <div class="navbar__menu" id="navbar-menu">
    <ul class="navbar__nav navbar__nav--mobile">
      <!-- Mobile nav items -->
    </ul>
  </div>
</nav>
```

**CSS Classes:**
- `.navbar` - Base navbar
- `.navbar__container` - Container
- `.navbar__brand` - Brand/logo
- `.navbar__nav` - Navigation list
- `.navbar__nav--desktop` - Desktop nav
- `.navbar__nav--mobile` - Mobile nav
- `.navbar__link` - Navigation link
- `.navbar__link--active` - Active state
- `.navbar__link--premium` - Premium link style
- `.navbar__toggle` - Mobile toggle button
- `.navbar__menu` - Mobile menu drawer

### Footer Component

**File:** `components/footer.html`

**Purpose:** Footer component with links and copyright

**Features:**
- Navigation links
- Social media links
- Contact information
- Copyright notice

**HTML Structure:**
```html
<footer class="footer">
  <div class="footer__container u-container">
    <div class="footer__content">
      <div class="footer__section">
        <h3 class="footer__title">Company</h3>
        <ul class="footer__links">
          <li><a href="pages/about/index.html" class="footer__link">About</a></li>
          <!-- More links -->
        </ul>
      </div>
      <!-- More sections -->
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">&copy; 2024 Infinite Interior Decor</p>
    </div>
  </div>
</footer>
```

**CSS Classes:**
- `.footer` - Base footer
- `.footer__container` - Container
- `.footer__content` - Content area
- `.footer__section` - Section
- `.footer__title` - Section title
- `.footer__links` - Links list
- `.footer__link` - Link
- `.footer__bottom` - Bottom area
- `.footer__copyright` - Copyright text

---

## CSS Components

### Component Structure

```
css/components/
├── button.css
├── card.css
├── cta.css
├── faq.css
├── features.css
├── footer.css
├── gallery-section.css
├── grid.css
├── image-placeholder.css
├── navbar.css
├── partners.css
├── process.css
├── projects-section.css
├── services-section.css
├── trust.css
├── trusted-by.css
├── why-choose.css
```

### Button Component

**File:** `css/components/button.css`

**Purpose:** Button styles

**Variants:**
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

.button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.button--secondary {
  background: var(--color-secondary);
  color: var(--color-white);
}

.button--large {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

.button--small {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}
```

### Card Component

**File:** `css/components/card.css`

**Purpose:** Card component styles

**Structure:**
```css
.card {
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card__content {
  padding: var(--spacing-md);
}

.card__title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.card__description {
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-md);
}

.card__link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
}
```

### Grid Component

**File:** `css/components/grid.css`

**Purpose:** Grid system

**Variants:**
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

### Image Placeholder Component

**File:** `css/components/image-placeholder.css`

**Purpose:** Placeholder image styles

**Structure:**
```css
.image-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
}

.image-placeholder__icon {
  width: 48px;
  height: 48px;
  margin-bottom: var(--spacing-sm);
}
```

---

## Section Components

### Features Section

**File:** `css/components/features.css`

**Purpose:** Features section styles

**Structure:**
```css
.features {
  padding: var(--spacing-lg) 0;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.features__item {
  text-align: center;
}

.features__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-md);
}

.features__title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.features__description {
  color: var(--color-gray-600);
}
```

### Services Section

**File:** `css/components/services-section.css`

**Purpose:** Services section styles

**Structure:**
```css
.services {
  padding: var(--spacing-lg) 0;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.services__card {
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  transition: transform var(--transition-base);
}

.services__card:hover {
  transform: translateY(-4px);
}
```

### Projects Section

**File:** `css/components/projects-section.css`

**Purpose:** Projects section styles

**Structure:**
```css
.projects {
  padding: var(--spacing-lg) 0;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.projects__card {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
}

.projects__card:hover .projects__overlay {
  opacity: 1;
}
```

### Gallery Section

**File:** `css/components/gallery-section.css`

**Purpose:** Gallery section styles

**Structure:**
```css
.gallery {
  padding: var(--spacing-lg) 0;
}

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-sm);
}

.gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  cursor: pointer;
}

.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.gallery__item:hover .gallery__image {
  transform: scale(1.05);
}
```

---

## Utility Components

### Container Utility

**File:** `css/core/utilities.css`

**Purpose:** Container utility

**Usage:**
```html
<div class="u-container">
  <!-- Content -->
</div>
```

**CSS:**
```css
.u-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}
```

### Display Utilities

**File:** `css/core/utilities.css`

**Purpose:** Display utilities

**Usage:**
```html
<div class="u-display-flex u-flex-row u-items-center u-gap-6">
  <!-- Content -->
</div>
```

**CSS:**
```css
.u-display-flex { display: flex; }
.u-flex-row { flex-direction: row; }
.u-flex-column { flex-direction: column; }
.u-items-center { align-items: center; }
.u-items-start { align-items: flex-start; }
.u-items-end { align-items: flex-end; }
.u-justify-center { justify-content: center; }
.u-justify-between { justify-content: space-between; }
.u-gap-4 { gap: 1rem; }
.u-gap-6 { gap: 1.5rem; }
.u-gap-8 { gap: 2rem; }
```

### Screen Reader Utility

**File:** `css/core/utilities.css`

**Purpose:** Screen reader only content

**Usage:**
```html
<a href="#main-content" class="u-sr-only">Skip to main content</a>
```

**CSS:**
```css
.u-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Component Composition

### Page Composition Example

**Homepage:**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/pages/home.css">
</head>
<body>
  <!-- Navbar Component -->
  <nav class="navbar">
    <!-- Navbar content -->
  </nav>
  
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <!-- Hero content -->
    </section>
    
    <!-- Features Section -->
    <section class="features">
      <div class="u-container">
        <div class="features__grid">
          <!-- Feature cards -->
        </div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="services">
      <div class="u-container">
        <div class="services__grid">
          <!-- Service cards -->
        </div>
      </div>
    </section>
    
    <!-- Projects Section -->
    <section class="projects">
      <div class="u-container">
        <div class="projects__grid">
          <!-- Project cards -->
        </div>
      </div>
    </section>
  </main>
  
  <!-- Footer Component -->
  <footer class="footer">
    <!-- Footer content -->
  </footer>
</body>
</html>
```

---

## Component Best Practices

### 1. BEM Naming Convention
```css
.block { }
.block__element { }
.block--modifier { }
```

### 2. Component Isolation
- Each component in its own file
- No global styles
- Use design tokens
- Avoid coupling

### 3. Responsive Design
```css
.component {
  /* Mobile first */
  padding: var(--spacing-sm);
}

@media (min-width: 768px) {
  .component {
    padding: var(--spacing-md);
  }
}
```

### 4. Accessibility
```html
<button aria-label="Close menu">×</button>
<nav aria-label="Main navigation">
<div role="navigation">
```

### 5. Performance
- Minimal CSS
- Efficient selectors
- Avoid !important
- Use transforms instead of position changes

---

## Notes

- Components are reusable HTML/CSS units
- BEM naming convention
- Design tokens for consistency
- Responsive by default
- Accessible markup
- No component library (custom implementation)

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
