/**
 * Core Application Entry Point
 * 
 * Luxury interior design website - Top 1% global standard
 * Initializes all core modules and page-specific functionality
 */

(function() {
  'use strict';

  /**
   * Bulletproof base URL detection for GitHub Pages
   * Dynamically extracts repository name from pathname for portability
   * Works universally across all environments
   */
  window.getBaseUrl = function() {
    const isGitHubPages = window.location.hostname.includes('github.io');
    if (!isGitHubPages) return '/';
    
    // Extract repository name from pathname dynamically
    const pathSegments = window.location.pathname.split('/').filter(segment => segment.length > 0);
    const repoName = pathSegments[0] || '';
    return '/' + repoName + '/';
  };

  /**
   * Bulletproof asset path resolution
   * Prevents all forms of subpath duplication
   * Dynamically strips any existing base URL to prevent duplication
   */
  window.resolveAssetPath = function(assetPath) {
    if (!assetPath) return '';
    const baseUrl = window.getBaseUrl();
    // Strip any leading slash to prevent duplication
    let cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
    return baseUrl + cleanPath;
  };

  /**
   * Core module loader
   * Dynamically loads modules based on current page
   */
  function loadCoreModules() {
    // Load navbar (shared across all pages)
    if (typeof Navbar !== 'undefined') {
      Navbar.init();
    }
    
    // Load image placeholder system
    if (typeof ImagePlaceholder !== 'undefined') {
      ImagePlaceholder.init();
    }
    
    // Load schema.org structured data
    if (typeof Schema !== 'undefined') {
      Schema.init();
    }
  }

  /**
   * Page-specific module loader
   * Loads appropriate JavaScript based on current page
   * Dynamically handles GitHub Pages subpath for homepage detection
   */
  function loadPageModule() {
    const currentPath = window.location.pathname;
    const baseUrl = window.getBaseUrl();
    
    // Homepage detection - accounts for GitHub Pages subpath
    const isHomepage = currentPath === baseUrl || 
                       currentPath === baseUrl + 'index.html' ||
                       (currentPath.endsWith('index.html') && currentPath === baseUrl.replace(/\/$/, '') + '/index.html');
    
    if (isHomepage) {
      if (typeof Home !== 'undefined') {
        Home.init();
      }
    }
    
    // Projects page
    if (currentPath.includes('/projects/')) {
      if (typeof Projects !== 'undefined') {
        Projects.init();
      }
    }
  }

  /**
   * Initialize application
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        loadCoreModules();
        loadPageModule();
        
        // Initialize performance features
        initPredictivePrefetching();
        initBackgroundDataHydration();
        initImagePreloading();
        initDragToScroll();
      });
    } else {
      loadCoreModules();
      loadPageModule();
      
      // Initialize performance features
      initPredictivePrefetching();
      initBackgroundDataHydration();
      initImagePreloading();
      initDragToScroll();
    }
  }

  /**
   * Predictive Prefetching for Navigation Links
   * Prefetches pages on hover/touch for instant loading
   */
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

  /**
   * Background Data Hydration
   * Silently fetches database.json in background after critical DOM loads
   */
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

  /**
   * Aggressive Image Preloading
   * Preloads first images of Services and Projects sections
   */
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

  /**
   * Desktop Drag-to-Scroll Utility
   * Enables click-and-drag scrolling for horizontal carousels
   */
  function initDragToScroll() {
    const carousels = document.querySelectorAll('.services__grid, .projects__grid, .gallery__grid, .materials__grid, .brands__grid');
    
    carousels.forEach(carousel => {
      let isDown = false;
      let startX;
      let scrollLeft;
      
      carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });
      
      carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
      });
      
      carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
      });
      
      carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
      });
      
      // Set initial cursor
      carousel.style.cursor = 'grab';
    });
  }

  // Start application
  init();
})();
