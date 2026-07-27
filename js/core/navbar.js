/**
 * Navbar Component JavaScript
 * 
 * Shared navbar rendering system for all pages.
 * Handles logo rendering, scroll effects, and mobile menu toggle.
 */

(function() {
  'use strict';

  console.log("navbar.js loaded");

  /**
   * Get the base URL for assets based on the deployment environment
   * Detects GitHub Pages subpath and returns appropriate base URL
   * @returns {string} Base URL for assets (e.g., '/infiniteinterior-decor/' or '')
   */
  function getBaseUrl() {
    const pathname = window.location.pathname;
    
    // Check if we're on GitHub Pages with the subpath
    if (pathname.includes('/infiniteinterior-decor/')) {
      return '/infiniteinterior-decor/';
    }
    
    // Local development or root deployment
    return '/';
  }

  /**
   * Resolve an asset path to the full URL based on the current environment
   * @param {string} assetPath - Relative asset path (e.g., 'assets/images/logo/logo.png')
   * @returns {string} Full asset URL with correct base
   */
  function resolveAssetPath(assetPath) {
    const baseUrl = getBaseUrl();
    
    // Remove leading slash if present to avoid double slashes
    const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
    
    return baseUrl + cleanPath;
  }

  /**
   * Render navbar logo with correct absolute path
   * Uses dynamic base URL resolution for GitHub Pages compatibility
   */
  function renderLogo() {
    console.log("renderLogo() called");
    
    const logoContainer = document.getElementById('navbar-logo-container');
    console.log("logoContainer:", logoContainer);
    
    if (!logoContainer) {
      console.error("navbar-logo-container not found in DOM");
      return;
    }

    // Use Base64 data URI from external file if available
    // Otherwise use dynamic base URL resolution
    const logoPath = (typeof LOGO_BASE64 !== 'undefined') ? LOGO_BASE64 : resolveAssetPath('assets/images/logo/logo.png');
    
    console.log("Using logo source:", logoPath.substring(0, 50) + '...');

    // Insert logo image with standardized class
    const logoHTML = `<img src="${logoPath}" alt="Infinite Interior Decor" class="navbar__logo-image">`;
    console.log("Generated logo HTML");
    
    logoContainer.innerHTML = logoHTML;
    
    // Explicitly update img src attribute for verification
    const logoImg = logoContainer.querySelector('img');
    if (logoImg) {
      console.log("Logo IMG element found and updated");
      console.log("Logo SRC length:", logoImg.src.length);
    } else {
      console.error("Logo IMG element not found after insertion");
    }
    
    console.log("Logo rendered successfully");
  }

  /**
   * Initialize navbar scroll effects
   */
  function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // Add/remove scrolled class
      if (currentScrollY > scrollThreshold) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }

      lastScrollY = currentScrollY;
    });
  }

  /**
   * Initialize mobile menu toggle
   */
  function initMobileMenu() {
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.getElementById('navbar-menu');
    
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      toggle.setAttribute('aria-expanded', !isExpanded);
      menu.setAttribute('aria-hidden', isExpanded);
      
      if (!isExpanded) {
        menu.classList.add('navbar__menu--open');
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.remove('navbar__menu--open');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        if (toggle.getAttribute('aria-expanded') === 'true') {
          toggle.click();
        }
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.click();
      }
    });
  }

  /**
   * Calculate relative path prefix based on current page depth
   * @returns {string} Relative path prefix (e.g., '', '../', '../../')
   */
  function getRelativePathPrefix() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
    
    // Remove GitHub Pages subpath if present
    const repoIndex = pathSegments.indexOf('infiniteinterior-decor');
    let effectiveSegments = pathSegments;
    if (repoIndex !== -1) {
      effectiveSegments = pathSegments.slice(repoIndex + 1);
    }
    
    const depth = effectiveSegments.length;
    
    if (depth === 0 || (depth === 1 && effectiveSegments[0].endsWith('.html'))) {
      // Root level
      return '';
    } else if (depth === 1) {
      // pages/about/ (index.html)
      return '../';
    } else if (depth === 2) {
      // pages/projects/detail/ (index.html)
      return '../../';
    } else {
      // Fallback for deeper levels
      return '../'.repeat(depth);
    }
  }

  /**
   * Update navigation links with correct relative paths
   */
  function updateNavigationLinks() {
    const prefix = getRelativePathPrefix();
    console.log("Navigation path prefix:", prefix);
    
    // Update desktop navigation links
    const desktopLinks = document.querySelectorAll('.navbar__nav--desktop .navbar__link');
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        // Convert absolute path to relative
        const relativePath = prefix + href.substring(1);
        link.setAttribute('href', relativePath);
        console.log(`Updated link: ${href} -> ${relativePath}`);
      }
    });
    
    // Update mobile navigation links
    const mobileLinks = document.querySelectorAll('.navbar__nav--mobile .navbar__link');
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        // Convert absolute path to relative
        const relativePath = prefix + href.substring(1);
        link.setAttribute('href', relativePath);
        console.log(`Updated mobile link: ${href} -> ${relativePath}`);
      }
    });
    
    // Update logo link
    const logoLink = document.querySelector('.navbar__logo-link');
    if (logoLink) {
      const href = logoLink.getAttribute('href');
      if (href === '/' || href === '/index.html') {
        logoLink.setAttribute('href', prefix + 'index.html');
        console.log(`Updated logo link: ${href} -> ${prefix}index.html`);
      }
    }
  }

  /**
   * Initialize navbar
   */
  function init() {
    renderLogo();
    updateNavigationLinks();
    initScrollEffects();
    initMobileMenu();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
