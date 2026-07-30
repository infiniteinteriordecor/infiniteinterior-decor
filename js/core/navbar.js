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
   * Render navbar logo with correct absolute path
   * Uses global window.resolveAssetPath for GitHub Pages compatibility
   */
  function renderLogo() {
    const logoContainer = document.getElementById('navbar-logo-container');
    
    if (!logoContainer) {
      console.error("navbar-logo-container not found in DOM");
      return;
    }

    // Use global dynamic base URL resolution for standard image file
    const logoPath = window.resolveAssetPath('assets/images/logo/logo.png');

    // Insert logo image with standardized class
    const logoHTML = `<img src="${logoPath}" alt="Infinite Interior Decor" class="navbar__logo-image">`;
    logoContainer.innerHTML = logoHTML;
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
   * Update navigation links with correct relative paths
   * Uses window.resolveAssetPath for GitHub Pages compatibility
   */
  function updateNavigationLinks() {
    // Navigation links are already relative in HTML
    // No manual path calculation needed
    // window.resolveAssetPath is used for asset paths only
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
