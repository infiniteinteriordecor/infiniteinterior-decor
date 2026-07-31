# Performance System Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project implements multiple performance optimization strategies to ensure fast loading times and smooth user experience. The performance system includes predictive prefetching, lazy loading, background data hydration, and asset optimization.

---

## Performance Architecture

### Performance Strategies

1. **Predictive Prefetching** - Prefetch pages on hover
2. **Lazy Loading** - Load images as needed
3. **Background Data Hydration** - Load data in background
4. **Image Preloading** - Preload critical images
5. **CSS Optimization** - Modular CSS with imports
6. **JavaScript Optimization** - Defer non-critical JS
7. **Asset Optimization** - WebP format, compression

---

## Predictive Prefetching

### Implementation

**Location:** `js/core/app.js`

**Purpose:** Prefetch pages on hover/touch for instant loading

**Strategy:**
- Desktop: Prefetch on mouseenter
- Mobile: Prefetch on touchstart
- Cache prefetched URLs
- Skip external links

**Code:**
```javascript
function initPredictivePrefetching() {
  const prefetchCache = new Set();
  
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip external links, anchors, and already prefetching
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || prefetchCache.has(href)) {
      return;
    }
    
    // Desktop: prefetch on mouseenter
    link.addEventListener('mouseenter', () => {
      if (!prefetchCache.has(href)) {
        prefetchCache.add(href);
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = window.resolveAssetPath(href);
        document.head.appendChild(prefetchLink);
      }
    });
    
    // Mobile: prefetch on touchstart
    link.addEventListener('touchstart', () => {
      if (!prefetchCache.has(href)) {
        prefetchCache.add(href);
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = window.resolveAssetPath(href);
        document.head.appendChild(prefetchLink);
      }
    }, { passive: true });
  });
}
```

**Benefits:**
- Instant page loads
- Reduced perceived latency
- Better user experience

---

## Background Data Hydration

### Implementation

**Location:** `js/core/app.js`

**Purpose:** Silently fetch database.json in background

**Strategy:**
- Use requestIdleCallback if available
- Fallback to setTimeout
- Cache in sessionStorage
- Handle errors gracefully

**Code:**
```javascript
function initBackgroundDataHydration() {
  const hydrateData = () => {
    const cacheKey = 'infinite-interior-data/database.json';
    
    // Check if already cached
    if (sessionStorage.getItem(cacheKey)) {
      return;
    }
    
    // Fetch and cache in background
    fetch(window.resolveAssetPath('data/database.json'))
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(data => {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      })
      .catch(error => {
        console.warn('Background data hydration failed:', error);
      });
  };
  
  // Use requestIdleCallback with setTimeout fallback
  if ('requestIdleCallback' in window) {
    requestIdleCallback(hydrateData, { timeout: 3000 });
  } else {
    setTimeout(hydrateData, 1000);
  }
}
```

**Benefits:**
- Data ready when needed
- Non-blocking
- Improved performance

---

## Image Preloading

### Implementation

**Location:** `js/core/app.js`

**Purpose:** Preload critical images

**Strategy:**
- Preload first service image
- Preload first project image
- Use Image object
- Browser caches images

**Code:**
```javascript
function initImagePreloading() {
  const preloadImage = (src) => {
    if (!src) return;
    const img = new Image();
    img.src = window.resolveAssetPath(src);
  };
  
  // Preload first service image
  preloadImage('assets/images/services/service-1.webp');
  
  // Preload first project image
  preloadImage('assets/images/projects/project-1.webp');
}
```

**Benefits:**
- Critical images load faster
- Smoother user experience
- Reduced layout shift

---

## Lazy Loading

### Implementation

**Location:** `js/core/lazy-load.js`

**Purpose:** Lazy load images as they enter viewport

**Strategy:**
- Use Intersection Observer API
- Load images when visible
- Replace placeholder with actual image
- Fallback for older browsers

**Code:**
```javascript
class LazyLoad {
  constructor() {
    this.observer = null;
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(this.observerCallback, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.observer.observe(img);
      });
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }
  
  observerCallback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }
  
  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
    }
  }
  
  loadAllImages() {
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.loadImage(img);
    });
  }
}
```

**Benefits:**
- Reduced initial load time
- Bandwidth savings
- Faster page rendering

---

## CSS Performance

### Optimization Strategies

#### 1. Modular CSS

**Strategy:** Split CSS into modules

**Benefits:**
- Smaller file sizes
- Better caching
- Easier maintenance

#### 2. Critical CSS Inline

**Strategy:** Inline critical CSS in head

**Example:**
```html
<style>
  /* Critical CSS for above-the-fold content */
  .estimator-loading { display: flex; ... }
</style>
```

**Benefits:**
- Faster first paint
- Reduced render blocking

#### 3. CSS Imports

**Strategy:** Use @import for modularity

**Example:**
```css
@import url('core/design-tokens.css');
@import url('core/reset.css');
```

**Benefits:**
- Modular architecture
- Maintainable code

---

## JavaScript Performance

### Optimization Strategies

#### 1. Defer Non-Critical JS

**Strategy:** Use defer attribute

**Example:**
```html
<script src="js/core/app.js" defer></script>
```

**Benefits:**
- Non-blocking
- Faster page load

#### 2. Debounce and Throttle

**Strategy:** Use debounce/throttle for event handlers

**Example:**
```javascript
const debounced = debounce(function() {
  // Code here
}, 300);
```

**Benefits:**
- Reduced function calls
- Better performance

#### 3. Request Animation Frame

**Strategy:** Use rAF for animations

**Example:**
```javascript
function animate() {
  requestAnimationFrame(animate);
  // Animation code
}
```

**Benefits:**
- Smooth animations
- Better performance

---

## Asset Optimization

### Image Optimization

#### 1. WebP Format

**Strategy:** Use WebP for better compression

**Benefits:**
- Smaller file sizes
- Better quality
- Modern browser support

#### 2. Responsive Images

**Strategy:** Use srcset and sizes

**Example:**
```html
<img src="image-small.jpg"
     srcset="image-small.jpg 480w,
             image-medium.jpg 768w,
             image-large.jpg 1024w"
     sizes="(max-width: 768px) 480px,
            (max-width: 1024px) 768px,
            1024px">
```

**Benefits:**
- Appropriate image sizes
- Bandwidth savings
- Better performance

#### 3. Image Compression

**Strategy:** Compress images before deployment

**Benefits:**
- Smaller file sizes
- Faster loading

---

## Performance Metrics

### Target Metrics

- **First Contentful Paint (FCP):** < 1.5s
- **First Meaningful Paint (FMP):** < 2.5s
- **Time to Interactive (TTI):** < 3.5s
- **Total Load Time:** < 5s
- **Lighthouse Score:** > 90

### Measurement Tools

- **Lighthouse:** Performance auditing
- **Chrome DevTools:** Performance profiling
- **WebPageTest:** Detailed performance analysis
- **PageSpeed Insights:** Google's performance tool

---

## Performance Monitoring

### Monitoring Strategies

#### 1. Console Logging

**Strategy:** Log performance events

**Example:**
```javascript
console.time('Page Load');
// Page load code
console.timeEnd('Page Load');
```

#### 2. Performance API

**Strategy:** Use Performance API for metrics

**Example:**
```javascript
const perfData = performance.getEntriesByType('navigation');
console.log(perfData[0].loadEventEnd);
```

#### 3. Bootstrap Diagnostics

**Strategy:** Use bootstrap diagnostics for estimator

**Example:**
```javascript
const report = window.EstimatorBootstrap.getDiagnosticReport();
console.log(report);
```

---

## Performance Best Practices

### 1. Minimize HTTP Requests
- Combine CSS/JS files
- Use CSS sprites
- Use data URIs for small images

### 2. Optimize Assets
- Compress images
- Minify CSS/JS
- Use WebP format

### 3. Use Caching
- Set cache headers
- Use service workers (not implemented)
- Cache in localStorage/sessionStorage

### 4. Lazy Load
- Lazy load images
- Lazy load non-critical JS
- Load data on demand

### 5. Monitor Performance
- Use Lighthouse
- Monitor Core Web Vitals
- Track performance over time

---

## Notes

- Predictive prefetching implemented
- Lazy loading implemented
- Background data hydration implemented
- Image preloading implemented
- CSS optimization implemented
- JavaScript optimization implemented
- Asset optimization implemented
- Performance monitoring available

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
