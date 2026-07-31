# HTML Architecture Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Total HTML Files:** 17  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses a component-based HTML architecture with semantic markup, accessibility features, and SEO optimization. The architecture follows modern HTML5 standards with a focus on performance and maintainability.

---

## HTML Architecture Principles

### 1. Semantic HTML5
- Use of semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Proper heading hierarchy (h1-h6)
- ARIA attributes for accessibility
- Microdata for SEO

### 2. Component-Based Structure
- Reusable component templates in `components/`
- Layout templates in `layouts/`
- Page composition from components

### 3. Accessibility First
- Skip-to-content links
- ARIA labels and roles
- Keyboard navigation support
- Screen reader optimization

### 4. SEO Optimized
- Meta tags for search engines
- Open Graph tags for social sharing
- Canonical URLs
- Structured data

### 5. Performance Focused
- Critical CSS inline
- Resource preloading
- Lazy loading for images
- Minimal render-blocking resources

---

## HTML File Structure

### Root HTML
```
index.html (643 lines)
├── <!DOCTYPE html>
├── <html lang="en">
├── <head>
│   ├── Meta tags (SEO, viewport, theme)
│   ├── Preconnect to external domains
│   ├── Resource preloading
│   ├── Google Fonts
│   ├── CSS imports
│   └── Favicon
└── <body>
    ├── Skip link (accessibility)
    ├── Brand intro animation
    ├── Navbar component
    ├── Main content
    │   ├── Hero section
    │   ├── Trust section
    │   ├── Features section
    │   ├── Services section
    │   ├── Projects section
    │   ├── Gallery section
    │   ├── Why choose section
    │   ├── Process section
    │   ├── Partners section
    │   ├── FAQ section
    │   └── CTA section
    └── Footer component
```

### Component HTML Files

#### components/navbar.html
- Navigation component with mobile responsive menu
- Desktop and mobile navigation states
- Accessibility features (skip links, ARIA labels)

#### components/footer.html
- Footer component with links and copyright
- Social media links
- Contact information

#### components/button.html
- Reusable button component
- Multiple button variants
- Accessibility attributes

### Layout HTML Files

#### layouts/default.html
- Default page layout template
- Common page structure
- Includes navbar and footer

### Page HTML Files

#### pages/404/index.html
- Custom 404 error page
- Helpful navigation links
- Maintains site branding

#### pages/about/index.html
- About page with company information
- Team section
- Mission and values

#### pages/contact/index.html
- Contact form
- Contact information
- Map integration (placeholder)

#### pages/estimator/index.html
- Multi-step estimator wizard
- Dynamic step rendering
- Form validation
- Progress indicator

#### pages/gallery/index.html
- Image gallery grid
- Lightbox functionality
- Filter categories

#### pages/privacy/index.html
- Privacy policy page
- Legal compliance
- Data handling information

#### pages/projects/index.html
- Projects listing page
- Project cards
- Filter/search functionality

#### pages/projects/detail/index.html
- Project detail page
- Image gallery
- Project specifications
- Related projects

#### pages/services/index.html
- Services listing
- Service descriptions
- Pricing information

#### pages/terms/index.html
- Terms of service
- Legal agreement
- User rights and responsibilities

---

## HTML Head Structure

### Standard Head Elements

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Character Encoding -->
  <meta charset="UTF-8">
  
  <!-- Viewport Configuration -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="...">
  <meta name="keywords" content="...">
  <meta name="author" content="Infinite Interior Decor">
  <meta name="robots" content="index, follow">
  
  <!-- Page Title -->
  <title>Page Title - Infinite Interior Decor</title>
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://infiniteinterior.com/">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://infiniteinterior.com/">
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:image" content="...">
  <meta property="og:site_name" content="Infinite Interior Decor">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://infiniteinterior.com/">
  <meta property="twitter:title" content="...">
  <meta property="twitter:description" content="...">
  <meta property="twitter:image" content="...">
  
  <!-- Preconnect to External Domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Critical Resource Preloading -->
  <link rel="preload" href="css/main.css" as="style">
  <link rel="preload" href="css/pages/home.css" as="style">
  
  <!-- Google Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...">
  
  <!-- CSS Files -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/pages/home.css">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="./favicon.ico">
  
  <!-- Theme Color -->
  <meta name="theme-color" content="#9a7d3e">
</head>
```

---

## HTML Body Structure

### Accessibility Features

#### Skip Links
```html
<a href="#main-content" class="skip-link u-sr-only">
  Skip to main content
</a>
```

#### ARIA Attributes
```html
<nav role="navigation" aria-label="Main navigation">
<button aria-label="Toggle navigation menu" aria-expanded="false">
<div aria-hidden="true">
```

#### Semantic Structure
```html
<main id="main-content" role="main">
<section aria-labelledby="section-title">
<h2 id="section-title">Section Title</h2>
```

---

## Estimator HTML Structure

The estimator page uses a complex wizard structure with dynamic step rendering:

```html
<div id="estimator-app" class="estimator-app">
  <!-- Loading State -->
  <div id="estimator-loading" class="estimator-loading">
    <div class="estimator-loading__spinner"></div>
    <div class="estimator-loading__text">Loading estimator...</div>
  </div>
  
  <!-- Main Wizard -->
  <div id="estimator-wizard" class="estimator-wizard" hidden>
    <!-- Progress Bar -->
    <div class="estimator-progress">
      <div class="estimator-progress__bar"></div>
      <div class="estimator-progress__steps"></div>
    </div>
    
    <!-- Step Container -->
    <div id="estimator-step-container" class="estimator-step-container">
      <!-- Steps rendered dynamically -->
    </div>
    
    <!-- Navigation -->
    <div class="estimator-navigation">
      <button id="estimator-back" class="estimator-button--back">Back</button>
      <button id="estimator-next" class="estimator-button--next">Next</button>
    </div>
  </div>
  
  <!-- Summary View -->
  <div id="estimator-summary" class="estimator-summary" hidden>
    <!-- Summary content -->
  </div>
</div>
```

---

## HTML Naming Conventions

### BEM Class Naming
```html
<!-- Block -->
<div class="navbar">

<!-- Element -->
<div class="navbar__brand">
<div class="navbar__nav">

<!-- Modifier -->
<div class="navbar__nav--desktop">
<div class="navbar__link--active">
```

### Utility Classes
```html
<div class="u-container">
<div class="u-display-flex">
<div class="u-flex-row">
<div class="u-items-center">
<div class="u-gap-6">
<div class="u-sr-only">
```

### Component Classes
```html
<div class="hero">
<div class="hero__content">
<div class="hero__title">
<div class="hero__description">
```

---

## HTML Component Patterns

### Card Component
```html
<div class="card">
  <div class="card__image">
    <img src="..." alt="..." loading="lazy">
  </div>
  <div class="card__content">
    <h3 class="card__title">Title</h3>
    <p class="card__description">Description</p>
    <a href="..." class="card__link">Learn More</a>
  </div>
</div>
```

### Button Component
```html
<button class="button button--primary button--large">
  <span class="button__text">Click Me</span>
</button>
```

### Grid Component
```html
<div class="grid grid--3">
  <div class="grid__item">Item 1</div>
  <div class="grid__item">Item 2</div>
  <div class="grid__item">Item 3</div>
</div>
```

---

## HTML Performance Optimizations

### 1. Critical CSS Inline
```html
<style>
  /* Critical CSS for above-the-fold content */
  .estimator-loading { display: flex; ... }
</style>
```

### 2. Resource Preloading
```html
<link rel="preload" href="css/main.css" as="style">
<link rel="preload" href="js/core/app.js" as="script">
```

### 3. Lazy Loading Images
```html
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     loading="lazy" 
     alt="Description">
```

### 4. DNS Prefetch
```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

### 5. Preconnect
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## HTML SEO Features

### Meta Tags
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="author" content="Infinite Interior Decor">
<meta name="robots" content="index, follow">
```

### Open Graph Tags
```html
<meta property="og:type" content="website">
<meta property="og:url" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:site_name" content="Infinite Interior Decor">
```

### Twitter Card Tags
```html
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="...">
<meta property="twitter:title" content="...">
<meta property="twitter:description" content="...">
<meta property="twitter:image" content="...">
```

### Canonical URL
```html
<link rel="canonical" href="https://infiniteinterior.com/">
```

---

## HTML Accessibility Features

### 1. Semantic Structure
```html
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>
```

### 2. ARIA Attributes
```html
role="navigation"
aria-label="Main navigation"
aria-expanded="false"
aria-controls="navbar-menu"
aria-current="page"
aria-hidden="true"
```

### 3. Skip Links
```html
<a href="#main-content" class="skip-link u-sr-only">
  Skip to main content
</a>
```

### 4. Alt Text
```html
<img src="..." alt="Descriptive text for screen readers">
```

### 5. Form Labels
```html
<label for="input-id">Label Text</label>
<input id="input-id" name="input-name">
```

---

## HTML Best Practices

### 1. DOCTYPE Declaration
```html
<!DOCTYPE html>
```

### 2. Language Attribute
```html
<html lang="en">
```

### 3. Character Encoding
```html
<meta charset="UTF-8">
```

### 4. Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 5. Heading Hierarchy
```html
<h1>Page Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection Title</h3>
```

### 6. Unique IDs
```html
<div id="unique-id">
```

### 7. Class Naming
```html
<div class="component-name component-name--modifier">
```

---

## HTML Validation

### Validation Tools
- W3C Markup Validation Service
- HTML5 Validator
- Browser DevTools

### Common Validation Issues
- Missing alt attributes
- Unclosed tags
- Invalid nesting
- Duplicate IDs

---

## HTML Maintenance Guidelines

### 1. Keep HTML Semantic
- Use appropriate semantic elements
- Maintain heading hierarchy
- Use ARIA attributes correctly

### 2. Keep HTML Clean
- Remove unused classes
- Minimize nesting depth
- Use comments for sections

### 3. Keep HTML Accessible
- Test with screen readers
- Test keyboard navigation
- Validate with accessibility tools

### 4. Keep HTML Performant
- Minimize DOM depth
- Use lazy loading
- Optimize images

---

## Notes

- All HTML files use HTML5 doctype
- BEM naming convention for classes
- Utility classes for common patterns
- Accessibility features throughout
- SEO optimized with meta tags
- Performance optimized with preloading

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
