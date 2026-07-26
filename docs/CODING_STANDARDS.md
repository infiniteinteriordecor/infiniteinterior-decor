# Coding Standards and Guidelines

## Overview

This document outlines the coding standards and best practices for the Infinite Interior Decor project. Following these standards ensures code quality, maintainability, and consistency across the codebase.

## General Principles

- **Readability First**: Code should be easy to read and understand
- **Consistency**: Follow established patterns and conventions
- **Simplicity**: Keep code simple and straightforward
- **Performance**: Optimize for performance without sacrificing readability
- **Accessibility**: Ensure all code follows accessibility best practices
- **Documentation**: Document complex logic and architectural decisions

## HTML Standards

### Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <title>Page Title - Infinite Interior Decor</title>
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- CSS files -->
  <link rel="stylesheet" href="../config/design-tokens.css">
  <link rel="stylesheet" href="../config/breakpoints.css">
  <link rel="stylesheet" href="../config/reset.css">
  <link rel="stylesheet" href="../css/global.css">
  
  <!-- Deferred CSS -->
  <link rel="preload" href="../css/home.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="../assets/icons/favicon.ico">
</head>
<body>
  <!-- Skip to main content for accessibility -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <!-- Main content -->
  <main id="main-content">
    <!-- Page content -->
  </main>
  
  <!-- JavaScript files (deferred) -->
  <script src="../js/app.js" defer></script>
  <script src="../js/animation.js" defer></script>
</body>
</html>
```

### Semantic HTML

- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- Maintain proper heading hierarchy (single H1 per page, sequential H2-H6)
- Use appropriate list elements (`<ul>`, `<ol>`, `<dl>`)
- Use semantic form elements with proper labels

### HTML Best Practices

- Always include `lang` attribute on `<html>` tag
- Use proper meta tags for SEO and social sharing
- Include `alt` text for all images
- Use ARIA attributes when semantic HTML is insufficient
- Validate HTML with W3C validator
- Minimize div nesting
- Use meaningful class names

### HTML Formatting

- Use 2 spaces for indentation
- Use lowercase for all tag names and attributes
- Quote all attribute values
- Self-close void elements (`<img>`, `<br>`, `<hr>`)
- One attribute per line for complex elements
- Close all tags properly

### Example

```html
<!-- Good -->
<nav class="navbar" aria-label="Main navigation">
  <ul class="navbar__list">
    <li class="navbar__item">
      <a href="/about" class="navbar__link">About</a>
    </li>
  </ul>
</nav>

<!-- Bad -->
<div class="nav">
  <div class="nav-item">
    <a HREF="/about">About</a>
  </div>
</div>
```

## CSS Standards

### CSS Organization

Follow the ITCSS (Inverted Triangle CSS) methodology:

1. **Settings** - Design tokens and variables
2. **Tools** - Mixins and functions (if needed)
3. **Generic** - Reset and normalization
4. **Base** - HTML element styling
5. **Objects** - Layout patterns
6. **Components** - Component styling
7. **Utilities** - Utility classes
8. **Trumps** - Overrides and emergency styles

### CSS File Structure

```css
/**
 * File Description
 * 
 * Brief description of what this file contains
 * 
 * @author Your Name
 * @version 1.0.0
 */

/* ============================================
   SECTION NAME
   ============================================ */

/**
 * Subsection description
 */

/* Selector */
.selector {
  /* Properties */
}
```

### CSS Naming Convention

Use BEM (Block Element Modifier) methodology:

```css
/* Block */
.card { }

/* Element */
.card__image { }
.card__title { }
.card__content { }

/* Modifier */
.card--featured { }
.card--large { }

/* Modifier on element */
.card__title--centered { }
```

### CSS Best Practices

- Use design tokens instead of hardcoded values
- Mobile-first responsive design
- Minimal specificity (avoid !important)
- Use CSS Grid and Flexbox for layouts
- Group related properties
- Use shorthand properties when appropriate
- Avoid deep nesting (max 3 levels)
- Comment complex logic
- Remove unused CSS

### CSS Formatting

- Use 2 spaces for indentation
- One selector per line
- Opening brace on same line as selector
- Closing brace on new line
- One property per line
- Space after colon in properties
- Semicolon after every property
- Space after comma in values
- Quotes around font names with spaces

### Example

```css
/* Good */
.card {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-6);
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.card__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
}

.card--featured {
  border: 2px solid var(--color-primary-500);
}

/* Bad */
.card {
  display:flex;
  padding:24px;
  background:#fff;
  border-radius:8px;
  .title {
    font-size:24px;
    color:#333;
  }
}
```

### CSS Specificity Guidelines

- Prefer class selectors over element selectors
- Avoid ID selectors for styling
- Avoid `!important` except for utility classes
- Use specific class names instead of nested selectors
- Keep specificity low and flat

### Responsive Design

- Mobile-first approach
- Use design tokens for breakpoints
- Test at all breakpoints
- Use `min-width` media queries
- Avoid fixed widths
- Use relative units (rem, em, %)

### Example

```css
/* Mobile first (default) */
.component {
  padding: var(--spacing-4);
}

/* Tablet and up */
@media (min-width: 640px) {
  .component {
    padding: var(--spacing-8);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-12);
  }
}
```

## JavaScript Standards

### JavaScript Organization

- Use ES6+ features
- Modular functions with single responsibility
- Separate concerns (UI, data, logic)
- Use const/let instead of var
- Arrow functions for callbacks
- Template literals for strings

### JavaScript File Structure

```javascript
/**
 * File Description
 * 
 * Brief description of what this file contains
 * 
 * @author Your Name
 * @version 1.0.0
 */

'use strict';

// Constants
const CONSTANT_NAME = 'value';

// DOM Elements
const element = document.querySelector('.selector');

// Functions
/**
 * Function description
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 */
function functionName(paramName) {
  // Function logic
  return result;
}

// Event Listeners
element.addEventListener('event', handler);

// Initialization
function init() {
  // Initialization logic
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

### JavaScript Best Practices

- Use strict mode
- Use meaningful variable and function names
- Write small, focused functions
- Handle errors gracefully
- Use event delegation for dynamic content
- Cache DOM queries
- Debounce/throttle event handlers
- Avoid global namespace pollution
- Use modern array methods

### JavaScript Formatting

- Use 2 spaces for indentation
- Space after keywords
- Space around operators
- No trailing whitespace
- One statement per line
- Semicolons after statements
- CamelCase for variables and functions
- PascalCase for constructors/classes
- UPPER_SNAKE_CASE for constants

### Example

```javascript
// Good
const button = document.querySelector('.button');

function handleClick(event) {
  event.preventDefault();
  console.log('Button clicked');
}

button.addEventListener('click', handleClick);

// Bad */
var btn = document.querySelector('.btn');
function click(e){
  e.preventDefault()
  console.log('clicked')
}
btn.addEventListener('click',click)
```

### JavaScript Documentation

Use JSDoc for function documentation:

```javascript
/**
 * Calculates the total price including tax
 * @param {number} price - The base price
 * @param {number} taxRate - The tax rate as a decimal (e.g., 0.1 for 10%)
 * @returns {number} The total price including tax
 */
function calculateTotal(price, taxRate) {
  return price * (1 + taxRate);
}
```

### Event Handling

- Use event delegation for dynamic content
- Remove event listeners when no longer needed
- Use passive event listeners for scroll/touch
- Handle both click and keyboard events for accessibility

### Example

```javascript
// Good - Event delegation
document.addEventListener('click', (event) => {
  if (event.target.matches('.button')) {
    handleClick(event);
  }
});

// Good - Keyboard accessible
button.addEventListener('click', handleClick);
button.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    handleClick(event);
  }
});
```

## File Naming Conventions

### HTML Files

- Use lowercase
- Use hyphens to separate words
- Use `.html` extension
- Index files for directories

```
about.html
contact.html
projects/index.html
```

### CSS Files

- Use lowercase
- Use hyphens to separate words
- Use `.css` extension
- Match component/page names

```
global.css
home.css
button.css
```

### JavaScript Files

- Use lowercase
- Use hyphens to separate words
- Use `.js` extension
- Match component/page names

```
app.js
animation.js
button.js
```

### Image Files

- Use lowercase
- Use hyphens to separate words
- Use descriptive names
- Include dimensions for optimization

```
hero-banner-1920x1080.jpg
project-thumbnail-400x300.webp
icon-menu.svg
```

## Accessibility Standards

### WCAG 2.1 AA Compliance

- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance (4.5:1 for text)
- Screen reader optimization
- Alternative text for images

### Accessibility Checklist

- [ ] All images have alt text
- [ ] Form inputs have associated labels
- [ ] Links have descriptive text
- [ ] Color is not the only indicator of meaning
- [ ] Keyboard navigation works for all features
- [ ] Focus indicators are visible
- [ ] ARIA attributes are used correctly
- [ ] Skip to main content link exists
- [ ] Reduced motion is respected
- [ ] Error messages are descriptive

### Example

```html
<!-- Good - Accessible -->
<button 
  type="button" 
  aria-label="Close modal"
  class="modal__close"
>
  <span aria-hidden="true">&times;</span>
</button>

<!-- Bad - Not accessible -->
<button class="close">&times;</button>
```

## Performance Standards

### Performance Targets

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.8s

### Performance Best Practices

- Optimize images (WebP, proper sizing)
- Minimize CSS and JavaScript
- Use lazy loading for images
- Defer non-critical JavaScript
- Preload critical resources
- Use system fonts or optimize font loading
- Minimize HTTP requests
- Enable compression (gzip/brotli)
- Use CDN for static assets

### Example

```html
<!-- Lazy load images -->
<img 
  src="placeholder.jpg" 
  data-src="image.jpg" 
  loading="lazy" 
  alt="Description"
  class="lazy-image"
>

<!-- Preload critical CSS -->
<link rel="preload" href="critical.css" as="style">

<!-- Defer JavaScript -->
<script src="script.js" defer></script>
```

## SEO Standards

### SEO Best Practices

- Unique title tags for each page
- Meta descriptions for each page
- Proper heading hierarchy
- Semantic HTML structure
- Descriptive alt text for images
- Clean URL structure
- Internal linking
- Mobile-friendly design
- Fast page load times
- XML sitemap

### Meta Tags

```html
<!-- Primary meta tags -->
<title>Page Title - Infinite Interior Decor</title>
<meta name="description" content="Page description">
<meta name="keywords" content="relevant, keywords">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://example.com/">
<meta property="twitter:title" content="Page Title">
<meta property="twitter:description" content="Page description">
<meta property="twitter:image" content="image.jpg">
```

## Security Standards

### Security Best Practices

- Use HTTPS only
- Validate and sanitize user input
- Use Content Security Policy (CSP)
- Implement proper error handling
- Keep dependencies updated
- Use secure cookie attributes
- Implement rate limiting (if applicable)
- Regular security audits

### Example

```html
<!-- Content Security Policy -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

## Git Standards

### Commit Messages

Use conventional commit format:

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test changes
- `chore`: Build process or tool changes

### Example

```
feat(navbar): add mobile menu toggle

Add hamburger menu for mobile navigation with smooth
slide-in animation.

Closes #123
```

### Branch Naming

- `feature/feature-name`
- `fix/bug-description`
- `docs/documentation-update`
- `refactor/code-refactoring`

## Code Review Standards

### Review Checklist

- [ ] Code follows coding standards
- [ ] Code is properly documented
- [ ] Code is performant
- [ ] Code is accessible
- [ ] Code is SEO-friendly
- [ ] Code is secure
- [ ] Tests are included (if applicable)
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] No hardcoded values (use tokens)

## Testing Standards

### Manual Testing

- Test on all supported browsers
- Test on mobile devices
- Test accessibility with screen reader
- Test keyboard navigation
- Test performance with Lighthouse

### Browser Testing

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Documentation Standards

### Code Documentation

- Every CSS section contains comments
- Every JS file contains JSDoc documentation
- Complex logic is explained
- Architecture decisions are documented
- Component usage is documented

### File Documentation

Each file should include:
- File description
- Author
- Version
- Dependencies (if any)
- Usage examples (if applicable)

## Conclusion

Following these coding standards ensures code quality, maintainability, and consistency across the Infinite Interior Decor project. All team members should adhere to these standards and suggest improvements when appropriate.
