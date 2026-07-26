/**
 * Lazy Loading System
 * 
 * Implements native lazy loading with fallback for older browsers
 * Prevents Cumulative Layout Shift (CLS) by reserving space
 */

(function() {
  'use strict';

  /**
   * Initialize lazy loading for images
   */
  function initLazyLoading() {
    // Check if native lazy loading is supported
    const supportsNativeLazyLoading = 'loading' in HTMLImageElement.prototype;

    // Get all images that should be lazy loaded
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');

    if (supportsNativeLazyLoading) {
      // Use native lazy loading
      lazyImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    } else {
      // Fallback: use Intersection Observer
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        lazyImages.forEach(img => {
          imageObserver.observe(img);
        });
      } else {
        // Fallback for very old browsers: load all images
        lazyImages.forEach(img => {
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
        });
      }
    }
  }

  /**
   * Add fade-in effect when images load
   */
  function initImageFadeIn() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
      
      // If already loaded
      if (img.complete) {
        img.classList.add('loaded');
      }
    });
  }

  /**
   * Initialize lazy loading system
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initLazyLoading();
        initImageFadeIn();
      });
    } else {
      initLazyLoading();
      initImageFadeIn();
    }
  }

  // Auto-initialize
  init();

  // Export for use in app.js
  window.LazyLoad = {
    init: init
  };
})();
