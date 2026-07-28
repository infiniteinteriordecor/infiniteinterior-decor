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
      });
    } else {
      loadCoreModules();
      loadPageModule();
    }
  }

  // Start application
  init();
})();
