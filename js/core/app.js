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
   * Works universally across all environments
   */
  window.getBaseUrl = function() {
    const isGitHubPages = window.location.hostname.includes('github.io');
    return isGitHubPages ? '/infiniteinterior-decor/' : '/';
  };

  /**
   * Bulletproof asset path resolution
   * Prevents all forms of subpath duplication
   */
  window.resolveAssetPath = function(assetPath) {
    if (!assetPath) return '';
    const baseUrl = window.getBaseUrl();
    // Strip existing base URL if it was accidentally hardcoded to prevent duplication
    let cleanPath = assetPath.replace(/^(\/infiniteinterior-decor\/|\/)/, '');
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
   */
  function loadPageModule() {
    const currentPath = window.location.pathname;
    
    // Homepage
    if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html') && currentPath.split('/').length === 2) {
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
      });
    } else {
      loadCoreModules();
      loadPageModule();
    }
  }

  // Start application
  init();
})();
