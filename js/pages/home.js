/**
 * Homepage JavaScript
 * 
 * Handles all interactive functionality for the Infinite Interior Decor homepage.
 * Includes navbar scroll effects, mobile menu, animations, counters, parallax, and dynamic JSON loading.
 * 
 * @author Infinite Interior Decor
 * @version 1.0.0
 */

'use strict';

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  // Scroll threshold for navbar glassmorphism (in pixels)
  navbarScrollThreshold: 50,
  
  // Counter animation duration (in milliseconds)
  counterDuration: 2000,
  
  // Scroll animation threshold (percentage of element visible)
  scrollThreshold: 0.2,
  
  // Parallax intensity (0-1)
  parallaxIntensity: 0.3,
  
  // Reduced motion check
  prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Data file path
  dataPath: 'data/database.json'
};

// ============================================
// ASSET PATH RESOLUTION
// ============================================

/**
 * Dynamically set hero background images using bulletproof path resolution
 * This fixes CSS background-image issues on GitHub Pages
 */
function initHeroBackgrounds() {
  // Set hero background for main hero section
  const heroBackgrounds = document.querySelectorAll('.hero, .hero__background');
  const heroImagePath = window.resolveAssetPath('assets/images/hero/hero.webp');
  
  heroBackgrounds.forEach(el => {
    el.style.backgroundImage = `url('${heroImagePath}')`;
  });
}

// ============================================
// DOM ELEMENTS
// ============================================

const DOM = {
  // Navbar
  navbar: null,
  navbarToggle: null,
  navbarMenu: null,
  navbarLinks: null,
  
  // Hero
  hero: null,
  heroParallax: null,
  
  // Trust section
  trustSection: null,
  trustGrid: null,
  trustCounters: null,
  
  
  // Services section
  servicesGrid: null,
  
  // Projects section
  projectsGrid: null,
  
  // Gallery section
  galleryGrid: null,
  
  // New sections
  trustedByTrack: null,
  whyChooseGrid: null,
  processTimeline: null,
  partnersGrid: null,
  faqList: null,
  
  // Scroll animations
  animatedElements: null
};

// ============================================
// STATE
// ============================================

const state = {
  isNavbarScrolled: false,
  isMobileMenuOpen: false,
  animatedCounters: new Set(),
  animatedElements: new Set()
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} threshold - Visibility threshold (0-1)
 * @returns {boolean} Is element visible
 */
function isElementInViewport(element, threshold = 0) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const visibleVertically = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const visibleHorizontally = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  
  if (!visibleVertically || !visibleHorizontally) return false;
  
  // Calculate visible percentage
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  const visibleArea = visibleHeight * visibleWidth;
  const totalArea = rect.height * rect.width;
  const visiblePercentage = visibleArea / totalArea;
  
  return visiblePercentage >= threshold;
}

/**
 * Animate number from start to end
 * @param {HTMLElement} element - Element to update
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Animation duration in milliseconds
 * @param {string} suffix - Optional suffix (e.g., '+', 'years')
 */
function animateNumber(element, start, end, duration, suffix = '') {
  if (CONFIG.prefersReducedMotion) {
    element.textContent = end + suffix;
    return;
  }
  
  const startTime = performance.now();
  const difference = end - start;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out quart)
    const easeOut = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (difference * easeOut));
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end + suffix;
    }
  }
  
  requestAnimationFrame(update);
}

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

/**
 * Initialize navbar elements and event listeners
 */
function initNavbar() {
  DOM.navbar = document.querySelector('.navbar');
  DOM.navbarToggle = document.querySelector('.navbar__toggle');
  DOM.navbarMenu = document.querySelector('.navbar__menu');
  DOM.navbarLinks = document.querySelectorAll('.navbar__link');
  
  if (!DOM.navbar) return;
  
  // Scroll event for glassmorphism effect
  window.addEventListener('scroll', throttle(handleNavbarScroll, 100));
  
  // Initial check
  handleNavbarScroll();
  
  // Mobile menu toggle
  if (DOM.navbarToggle && DOM.navbarMenu) {
    DOM.navbarToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu when clicking a link
  DOM.navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (state.isMobileMenuOpen) {
        closeMobileMenu();
      }
    });
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Close mobile menu on resize to desktop
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth >= 1024 && state.isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, 250));
}

/**
 * Handle navbar scroll for glassmorphism effect
 */
function handleNavbarScroll() {
  // Null check to prevent crash if navbar doesn't exist
  if (!DOM.navbar) return;
  
  const scrollY = window.scrollY;
  const shouldBeScrolled = scrollY > CONFIG.navbarScrollThreshold;
  
  if (shouldBeScrolled !== state.isNavbarScrolled) {
    state.isNavbarScrolled = shouldBeScrolled;
    
    if (shouldBeScrolled) {
      DOM.navbar.classList.add('navbar--scrolled');
    } else {
      DOM.navbar.classList.remove('navbar--scrolled');
    }
  }
  
  // Add dark class if hero is visible
  if (DOM.hero) {
    const heroRect = DOM.hero.getBoundingClientRect();
    const heroBottom = heroRect.bottom;
    
    if (heroBottom > 0) {
      DOM.navbar.classList.add('navbar--dark');
    } else {
      DOM.navbar.classList.remove('navbar--dark');
    }
  }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
  
  DOM.navbarToggle.setAttribute('aria-expanded', state.isMobileMenuOpen);
  DOM.navbarMenu.setAttribute('aria-hidden', !state.isMobileMenuOpen);
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = state.isMobileMenuOpen ? 'hidden' : '';
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  state.isMobileMenuOpen = false;
  
  DOM.navbarToggle.setAttribute('aria-expanded', 'false');
  DOM.navbarMenu.setAttribute('aria-hidden', 'true');
  
  document.body.style.overflow = '';
}

// ============================================
// HERO PARALLAX & MOUSE EFFECTS
// ============================================

/**
 * Initialize hero parallax and mouse-follow effects
 */
function initHeroParallax() {
  DOM.hero = document.querySelector('.hero');
  DOM.heroParallax = document.querySelector('.hero__parallax');
  
  if (!DOM.hero) return;
  
  // Mouse-follow effect
  if (!CONFIG.prefersReducedMotion) {
    const heroMouseLight = document.querySelector('.hero__mouse-light');
    
    if (heroMouseLight) {
      DOM.hero.addEventListener('mousemove', throttle(handleHeroMouseMove, 16));
    }
  }
  
  // Parallax on scroll with throttling (if parallax elements exist)
  if (DOM.heroParallax && !CONFIG.prefersReducedMotion) {
    window.addEventListener('scroll', throttle(handleHeroParallax, 50));
  }
}

/**
 * Handle mouse movement for radial light effect
 */
function handleHeroMouseMove(e) {
  const hero = DOM.hero;
  const rect = hero.getBoundingClientRect();
  
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  
  hero.style.setProperty('--mouse-x', `${x}%`);
  hero.style.setProperty('--mouse-y', `${y}%`);
}

/**
 * Handle hero parallax on scroll
 */
function handleHeroParallax() {
  if (!DOM.heroParallax) return;
  
  const scrollY = window.scrollY;
  const heroHeight = DOM.hero.offsetHeight;
  
  // Only apply parallax when hero is visible
  if (scrollY < heroHeight) {
    const translateY = scrollY * CONFIG.parallaxIntensity;
    DOM.heroParallax.style.transform = `translateY(${translateY}px)`;
  }
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

/**
 * Initialize trust section counters
 */
function initCounters() {
  DOM.trustSection = document.querySelector('.trust');
  DOM.trustGrid = document.getElementById('trust-grid');
  DOM.trustCounters = document.querySelectorAll('.trust__counter');
  
  if (!DOM.trustSection || !DOM.trustGrid) return;
  
  // Check counters on scroll
  window.addEventListener('scroll', throttle(handleCountersScroll, 100));
  
  // Initial check
  handleCountersScroll();
}

/**
 * Handle counter animations on scroll
 */
function handleCountersScroll() {
  // Re-query counters in case new ones were added
  const currentCounters = document.querySelectorAll('.trust__counter');
  
  currentCounters.forEach(counter => {
    if (state.animatedCounters.has(counter)) return;
    
    if (isElementInViewport(counter, CONFIG.scrollThreshold)) {
      animateCounter(counter);
      state.animatedCounters.add(counter);
    }
  });
}

/**
 * Animate individual counter
 * @param {HTMLElement} counter - Counter element
 */
function animateCounter(counter) {
  const targetValue = parseInt(counter.textContent.replace(/[^0-9]/g, ''), 10);
  const suffix = counter.textContent.replace(/[0-9]/g, '');
  
  animateNumber(counter, 0, targetValue, CONFIG.counterDuration, suffix);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  DOM.servicesGrid = document.getElementById('services-grid');
  DOM.projectsGrid = document.getElementById('projects-grid');
  
  // Elements to animate
  const selectors = [
    '.service__card',
    '.project__card',
    '.trust__card'
  ];
  
  DOM.animatedElements = document.querySelectorAll(selectors.join(','));
  
  if (DOM.animatedElements.length === 0) return;
  
  // Add animation class
  DOM.animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });
  
  // Check on scroll
  window.addEventListener('scroll', throttle(handleScrollAnimations, 100));
  
  // Initial check
  handleScrollAnimations();
}

/**
 * Handle scroll animations
 */
function handleScrollAnimations() {
  // Re-query animated elements in case new ones were added
  const selectors = [
    '.service__card',
    '.project__card',
    '.trust__card'
  ];
  
  const currentElements = document.querySelectorAll(selectors.join(','));
  
  currentElements.forEach((element, index) => {
    if (state.animatedElements.has(element)) return;
    
    // Set initial styles if not already set
    if (element.style.opacity === '') {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }
    
    if (isElementInViewport(element, CONFIG.scrollThreshold)) {
      // Add staggered delay based on index
      const delay = Math.min(index * 0.1, 0.5);
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, delay * 1000);
      
      state.animatedElements.add(element);
    }
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offset = 80; // Account for fixed navbar
        
        window.scrollTo({
          top: targetPosition - offset,
          behavior: CONFIG.prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });
}

// ============================================
// FOOTER YEAR
// ============================================

/**
 * Update footer year to current year
 */
function initFooterYear() {
  const yearElements = document.querySelectorAll('.footer__year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
}

// ============================================
// IMAGE COMPONENT
// ============================================

/**
 * Get relative path depth based on current page location
 * @returns {string} Relative path prefix (e.g., './' for root, '../../' for pages/)
 */
function getRelativePathPrefix() {
  const pathname = window.location.pathname;
  // Count how many directory levels deep we are
  const depth = pathname.split('/').filter(segment => segment.length > 0).length;
  // Root level (index.html) -> './'
  // One level deep (pages/index.html) -> '../'
  // Two levels deep (pages/services/index.html) -> '../../'
  const prefix = depth <= 1 ? './' : '../'.repeat(depth - 1);
  return prefix;
}

/**
 * Preload image to check if it exists
 * @param {string} imagePath - Path to the image
 * @returns {Promise<boolean>} True if image exists, false otherwise
 */
function preloadImage(imagePath) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath;
  });
}

/**
 * Render image with development placeholder fallback
 * @param {string} imagePath - Path to the real image
 * @param {string} altText - Alt text for accessibility
 * @param {string} placeholderType - Type of placeholder ('project', 'service', 'logo', 'gallery', 'hero')
 * @param {Object} options - Additional options (className, loading, aspectRatio, showLabel)
 * @returns {string} HTML string for image or placeholder
 */
function renderImage(imagePath, altText, placeholderType = 'project', options = {}) {
  const {
    className = '',
    loading = 'lazy',
    aspectRatio = null,
    showLabel = true
  } = options;
  
  // If image path exists and is not empty, return real image with explicit dimensions
  if (imagePath && imagePath.trim() !== '') {
    // Get dimensions based on placeholder type for CLS prevention
    const dimensions = {
      project: { width: 1920, height: 1080 },
      service: { width: 600, height: 375 },
      logo: { width: 200, height: 100 },
      gallery: { width: 1200, height: 900 },
      hero: { width: 1920, height: 1080 }
    };
    const dims = dimensions[placeholderType] || dimensions.project;
    
    // Use global resolver for GitHub Pages compatibility
    const srcPath = window.resolveAssetPath(imagePath);
    
    // Return img with data-src for async preloading
    // The actual src will be set after preloading check
    return `<img 
      data-src="${srcPath}"
      data-alt="${altText}"
      data-class="${className}"
      data-loading="${loading}"
      data-width="${dims.width}"
      data-height="${dims.height}"
      class="${className} image-pending"
      width="${dims.width}"
      height="${dims.height}"
      decoding="async"
      style="display:none;"
    >`;
  }
  
  // Otherwise, return development placeholder
  const placeholderStyles = {
    project: {
      aspectRatio: aspectRatio || '16/9',
      gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      icon: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
      label: 'PROJECT IMAGE'
    },
    service: {
      aspectRatio: aspectRatio || '4/3',
      gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      label: 'SERVICE IMAGE'
    },
    logo: {
      aspectRatio: aspectRatio || '1/1',
      gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      icon: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z',
      label: 'LOGO'
    },
    gallery: {
      aspectRatio: aspectRatio || '3/2',
      gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      icon: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
      label: 'GALLERY IMAGE'
    },
    hero: {
      aspectRatio: aspectRatio || '21/9',
      gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      icon: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z',
      label: 'HERO IMAGE'
    }
  };
  
  const style = placeholderStyles[placeholderType] || placeholderStyles.project;
  
  return `
    <div class="image-placeholder image-placeholder--${placeholderType} ${className}" style="aspect-ratio: ${style.aspectRatio}; background: ${style.gradient};">
      <div class="image-placeholder__content">
        <svg class="image-placeholder__icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="${style.icon}"/>
        </svg>
        ${showLabel ? `
          <span class="image-placeholder__label">${style.label}</span>
          <span class="image-placeholder__sublabel">Replace With Real Project</span>
          <span class="image-placeholder__brand">Infinite Interior Decor</span>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Process all pending images with preloading check
 * Checks if images exist before displaying them
 */
async function processPendingImages() {
  const pendingImages = document.querySelectorAll('img.image-pending');
  
  for (const img of pendingImages) {
    const src = img.dataset.src;
    if (!src) continue;
    
    try {
      const exists = await preloadImage(src);
      if (exists) {
        // Image exists: set actual src and show it
        img.src = src;
        img.alt = img.dataset.alt || '';
        img.classList.remove('image-pending');
        img.classList.add('loaded');
        img.style.display = '';
        
        // Add onload handler for CSS visibility
        img.onload = function() {
          this.classList.add('loaded');
        };
        
        // If there's a placeholder sibling, hide it
        const placeholder = img.nextElementSibling;
        if (placeholder && placeholder.classList.contains('image-placeholder')) {
          placeholder.style.display = 'none';
        }
      } else {
        // Image doesn't exist: remove img element, keep placeholder
        const placeholder = img.nextElementSibling;
        if (placeholder && placeholder.classList.contains('image-placeholder')) {
          placeholder.style.display = '';
        }
        img.remove();
      }
    } catch (error) {
      console.error('Error preloading image:', src, error);
      // On error, remove img and show placeholder
      const placeholder = img.nextElementSibling;
      if (placeholder && placeholder.classList.contains('image-placeholder')) {
        placeholder.style.display = '';
      }
      img.remove();
    }
  }
}

// ============================================
// DATA LOADING
// ============================================

/**
 * Load JSON data from file with sessionStorage caching
 * @param {string} path - Path to JSON file
 * @returns {Promise<Object>} Parsed JSON data
 */
async function loadData(path) {
  const cacheKey = `infinite-interior-${path}`;
  
  try {
    // Check sessionStorage first
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    
    // Fetch from network if not cached
    const response = await fetch(window.resolveAssetPath(path));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Cache in sessionStorage
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    
    return data;
  } catch (error) {
    console.error(`Error loading data from ${path}:`, error);
    return null;
  }
}

/**
 * Render company information
 * @param {Object} company - Company object
 */
function renderCompany(company) {
  if (!company) return;
  
  // Update page title
  if (company.name) {
    document.title = `${company.name} - Premium Interior Design & Turnkey Execution`;
  }
}

/**
 * Render statistics from database
 * @param {Array} statistics - Array of statistic objects
 */
function renderStatistics(statistics) {
  if (!statistics || !Array.isArray(statistics) || statistics.length === 0) {
    DOM.trustGrid.innerHTML = '<p class="u-text-center u-text-secondary">No statistics available</p>';
    return;
  }
  
  DOM.trustGrid.innerHTML = statistics.map(stat => `
    <div class="trust__card">
      <div class="trust__icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="${stat.iconPath || 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'}"/>
        </svg>
      </div>
      <div class="trust__counter" data-value="${stat.value}">${stat.value}<span class="trust__suffix">${stat.suffix || ''}</span></div>
      <p class="trust__label-text">${stat.label}</p>
    </div>
  `).join('');
  
  // Re-initialize counters after rendering
  DOM.trustCounters = DOM.trustGrid.querySelectorAll('.trust__counter');
}

/**
 * Render services from database
 * @param {Array} services - Array of service objects
 */
function renderServices(services) {
  if (!services || !Array.isArray(services) || services.length === 0) {
    DOM.servicesGrid.innerHTML = '<p class="u-text-center u-text-secondary">No services available</p>';
    return;
  }
  
  const fragment = document.createDocumentFragment();
  
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service__card';
    card.innerHTML = `
      <div class="service__icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="${service.iconPath || 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'}"/>
        </svg>
      </div>
      <h3 class="service__title">${service.title}</h3>
      ${service.description ? `<p class="service__description">${service.description}</p>` : ''}
      ${service.features && service.features.length > 0 ? `
        <ul class="service__features">
          ${service.features.map(feat => `
            <li class="service__feature">
              <span class="service__feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </span>
              ${feat}
            </li>
          `).join('')}
        </ul>
      ` : ''}
      <div class="service__image">
        ${renderImage(`assets/images/services/service-${service.id}.webp`, service.title, 'service', {
          className: 'service__img',
          loading: 'lazy',
          showLabel: false
        })}
      </div>
      <div class="service__footer">
        ${service.price ? `<span class="service__price">${service.price}</span>` : ''}
        <a href="${service.link || 'pages/services/'}" class="service__link">
          Details
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </a>
      </div>
    `;
    fragment.appendChild(card);
  });
  
  DOM.servicesGrid.innerHTML = '';
  DOM.servicesGrid.appendChild(fragment);
}

/**
 * Render projects from database
 * @param {Array} projects - Array of project objects
 */
function renderProjects(projects) {
  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    DOM.projectsGrid.innerHTML = '<p class="u-text-center u-text-secondary">No projects available</p>';
    return;
  }
  
  const fragment = document.createDocumentFragment();
  
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project__card';
    card.innerHTML = `
      ${project.featured ? `
        <div class="project__badge">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          Featured
        </div>
      ` : ''}
      <div class="project__image">
        ${renderImage(project.image, project.title, 'project', {
          className: 'project__img',
          loading: 'lazy',
          showLabel: false
        })}
        <div class="project__overlay">
          <a href="${project.link || 'pages/projects/'}" class="project__view-btn">
            View Project
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="project__content">
        ${project.category ? `<span class="project__category">${project.category}</span>` : ''}
        <h3 class="project__title">${project.title}</h3>
        ${project.location ? `
          <div class="project__location">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            ${project.location}
          </div>
        ` : ''}
        <div class="project__footer">
          ${project.year ? `<span class="project__year">${project.year}</span>` : ''}
          ${project.area ? `<span class="project__area">${project.area}</span>` : ''}
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });
  
  DOM.projectsGrid.innerHTML = '';
  DOM.projectsGrid.appendChild(fragment);
}

/**
 * Render gallery from database
 * @param {Array} gallery - Array of gallery objects
 */
function renderGallery(gallery) {
  // If gallery is empty, show development placeholders
  if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
    const placeholderItems = [
      { title: 'Gallery Image 1', category: 'Residential', image: '', link: 'pages/gallery/' },
      { title: 'Gallery Image 2', category: 'Commercial', image: '', link: 'pages/gallery/' },
      { title: 'Gallery Image 3', category: 'Hospitality', image: '', link: 'pages/gallery/' },
      { title: 'Gallery Image 4', category: 'Retail', image: '', link: 'pages/gallery/' }
    ];
    
    DOM.galleryGrid.innerHTML = placeholderItems.map(item => `
      <div class="gallery__card">
        <div class="gallery__image">
          ${renderImage(item.image, item.title, 'gallery', {
            className: 'gallery__img',
            loading: 'lazy',
            showLabel: false
          })}
          <div class="gallery__overlay">
            <div class="gallery__content">
              <h3 class="gallery__title-text">${item.title}</h3>
              <span class="gallery__category">${item.category}</span>
              <a href="${item.link}" class="gallery__view-btn">
                View Details
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    return;
  }
  
  DOM.galleryGrid.innerHTML = gallery.map(item => `
    <div class="gallery__card">
      <div class="gallery__image">
        ${renderImage(item.image, item.title, 'gallery', {
          className: 'gallery__img',
          loading: 'lazy',
          showLabel: false
        })}
        <div class="gallery__overlay">
          <div class="gallery__content">
            <h3 class="gallery__title-text">${item.title}</h3>
            <span class="gallery__category">${item.category || 'Gallery'}</span>
            <a href="${item.link || 'pages/gallery/'}" class="gallery__view-btn">
              View Details
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Render trusted by clients marquee
 * @param {Array} clients - Array of client objects
 */
function renderTrustedBy(clients) {
  if (!clients || !Array.isArray(clients) || clients.length === 0) {
    // Show development placeholders
    const placeholderClients = Array(8).fill(null).map((_, i) => ({
      name: `Client ${i + 1}`,
      logo: ''
    }));
    
    const logosHtml = placeholderClients.map(client => `
      <div class="trusted-by__logo">
        ${renderImage(client.logo, client.name, 'logo', {
          className: '',
          loading: 'lazy',
          showLabel: false
        })}
      </div>
    `).join('');
    
    DOM.trustedByTrack.innerHTML = logosHtml + logosHtml; // Duplicate for seamless loop
    return;
  }
  
  const logosHtml = clients.map(client => `
    <div class="trusted-by__logo">
      ${renderImage(client.logo, client.name, 'logo', {
        className: '',
        loading: 'lazy',
        showLabel: false
      })}
    </div>
  `).join('');
  
  DOM.trustedByTrack.innerHTML = logosHtml + logosHtml; // Duplicate for seamless loop
}

/**
 * Render why choose section
 * @param {Array} whyChoose - Array of why choose objects
 */
function renderWhyChoose(whyChoose) {
  if (!whyChoose || !Array.isArray(whyChoose) || whyChoose.length === 0) {
    DOM.whyChooseGrid.innerHTML = '<p class="u-text-center u-text-secondary">No information available</p>';
    return;
  }
  
  DOM.whyChooseGrid.innerHTML = whyChoose.map(item => `
    <div class="why-choose__card">
      <div class="why-choose__icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="${item.iconPath}"/>
        </svg>
      </div>
      <h3 class="why-choose__card-title">${item.title}</h3>
      <p class="why-choose__card-description">${item.description}</p>
    </div>
  `).join('');
}

/**
 * Render process timeline
 * @param {Array} process - Array of process step objects
 */
function renderProcess(process) {
  if (!process || !Array.isArray(process) || process.length === 0) {
    DOM.processTimeline.innerHTML = '<p class="u-text-center u-text-secondary">No process information available</p>';
    return;
  }
  
  DOM.processTimeline.innerHTML = `
    <div class="process__line"></div>
    ${process.map(step => `
      <div class="process__step">
        <div class="process__step-number">${step.step}</div>
        <div class="process__step-content">
          <h3 class="process__step-title">${step.title}</h3>
          <p class="process__step-description">${step.description}</p>
        </div>
      </div>
    `).join('')}
  `;
}

/**
 * Render partners section
 * @param {Array} partners - Array of partner objects
 */
function renderPartners(partners) {
  if (!partners || !Array.isArray(partners) || partners.length === 0) {
    // Show development placeholders
    const placeholderPartners = Array(5).fill(null).map((_, i) => ({
      name: `Partner ${i + 1}`,
      logo: ''
    }));
    
    DOM.partnersGrid.innerHTML = placeholderPartners.map(partner => `
      <div class="partners__logo">
        ${renderImage(partner.logo, partner.name, 'logo', {
          className: '',
          loading: 'lazy',
          showLabel: false
        })}
      </div>
    `).join('');
    return;
  }
  
  DOM.partnersGrid.innerHTML = partners.map(partner => `
    <div class="partners__logo">
      ${renderImage(partner.logo, partner.name, 'logo', {
        className: '',
        loading: 'lazy',
        showLabel: false
      })}
    </div>
  `).join('');
}

/**
 * Render FAQ section
 * @param {Array} faq - Array of FAQ objects
 */
function renderFAQ(faq) {
  if (!faq || !Array.isArray(faq) || faq.length === 0) {
    // Show development placeholders
    const placeholderFAQs = [
      { question: 'What services do you offer?', answer: 'We offer comprehensive interior design services including residential, commercial, retail, and hospitality interiors.' },
      { question: 'What is your design process?', answer: 'Our process includes consultation, planning, design, execution, and handover phases.' },
      { question: 'Do you work across India?', answer: 'Yes, we operate pan India with our headquarters in Bhimtal, Uttarakhand.' },
      { question: 'How do I get started?', answer: 'Contact us to schedule a free consultation and discuss your project requirements.' }
    ];
    
    DOM.faqList.innerHTML = placeholderFAQs.map((item, index) => `
      <div class="faq__item" aria-expanded="false">
        <button class="faq__button" aria-expanded="false" aria-controls="faq-answer-${index}">
          ${item.question}
          <svg class="faq__button-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </button>
        <div class="faq__answer" id="faq-answer-${index}">
          ${item.answer}
        </div>
      </div>
    `).join('');
    
    // Initialize FAQ accordion
    initFAQAccordion();
    return;
  }
  
  DOM.faqList.innerHTML = faq.map((item, index) => `
    <div class="faq__item" aria-expanded="false">
      <button class="faq__button" aria-expanded="false" aria-controls="faq-answer-${index}">
        ${item.question}
        <svg class="faq__button-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </button>
      <div class="faq__answer" id="faq-answer-${index}">
        ${item.answer}
      </div>
    </div>
  `).join('');
  
  // Initialize FAQ accordion
  initFAQAccordion();
}

/**
 * Initialize FAQ accordion functionality
 */
function initFAQAccordion() {
  const faqButtons = document.querySelectorAll('.faq__button');
  
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isExpanded = item.getAttribute('aria-expanded') === 'true';
      
      // Close all other items
      document.querySelectorAll('.faq__item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq__button').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      item.setAttribute('aria-expanded', !isExpanded);
      button.setAttribute('aria-expanded', !isExpanded);
    });
  });
}

/**
 * Render contact information
 * @param {Object} contact - Contact object
 */
function renderContact(contact) {
  if (!contact) return;
  
  // Update footer contact info
  const footerPhone = document.querySelector('.footer__phone');
  const footerEmail = document.querySelector('.footer__email');
  const footerAddress = document.querySelector('.footer__address');
  
  if (footerPhone && contact.phone) {
    footerPhone.textContent = contact.phone;
    footerPhone.href = `tel:${contact.phone}`;
  }
  
  if (footerEmail && contact.email) {
    footerEmail.textContent = contact.email;
    footerEmail.href = `mailto:${contact.email}`;
  }
  
  if (footerAddress && contact.address) {
    footerAddress.textContent = contact.address;
  }
  
  // Update social links
  if (contact.social) {
    const facebookLink = document.querySelector('.footer__social-link[href*="facebook"]');
    const instagramLink = document.querySelector('.footer__social-link[href*="instagram"]');
    const linkedinLink = document.querySelector('.footer__social-link[href*="linkedin"]');
    const twitterLink = document.querySelector('.footer__social-link[href*="twitter"]');
    
    if (facebookLink && contact.social.facebook) {
      facebookLink.href = contact.social.facebook;
    }
    if (instagramLink && contact.social.instagram) {
      instagramLink.href = contact.social.instagram;
    }
    if (linkedinLink && contact.social.linkedin) {
      linkedinLink.href = contact.social.linkedin;
    }
    if (twitterLink && contact.social.twitter) {
      twitterLink.href = contact.social.twitter;
    }
  }
}

/**
 * Initialize dynamic data loading from database.json
 */
async function initDataLoading() {
  // Initialize DOM elements for dynamic sections
  DOM.trustedByTrack = document.getElementById('trusted-by-track');
  DOM.whyChooseGrid = document.getElementById('why-choose-grid');
  DOM.processTimeline = document.getElementById('process-timeline');
  DOM.partnersGrid = document.getElementById('partners-grid');
  DOM.faqList = document.getElementById('faq-list');
  DOM.galleryGrid = document.getElementById('gallery-grid');
  
  const database = await loadData(CONFIG.dataPath);
  
  if (!database) {
    console.error('Failed to load database.json');
    return;
  }
  
  // Render company information
  if (database.company) {
    renderCompany(database.company);
  }
  
  // Render statistics
  if (database.statistics && Array.isArray(database.statistics)) {
    renderStatistics(database.statistics);
  }
  
  // Render services
  if (database.services && Array.isArray(database.services)) {
    renderServices(database.services);
  }
  
  // Render projects
  if (database.projects && Array.isArray(database.projects)) {
    renderProjects(database.projects);
  }
  
  // Render why choose
  if (database.whyChoose && Array.isArray(database.whyChoose)) {
    renderWhyChoose(database.whyChoose);
  }
  
  // Render process
  if (database.process && Array.isArray(database.process)) {
    renderProcess(database.process);
  }
  
  // Render gallery (always renders, shows placeholders if empty)
  renderGallery(database.gallery || []);
  
  // Render partners
  renderPartners(database.partners || []);
  
  // Render FAQ
  renderFAQ(database.faq || []);
  
  // Render trusted by
  renderTrustedBy(database.clients || []);
  
  // Render contact information
  if (database.contact) {
    renderContact(database.contact);
  }
  
  // Process pending images with preloading check
  await processPendingImages();
  
  // Re-initialize scroll animations after content is loaded
  setTimeout(() => {
    initScrollAnimations();
    handleScrollAnimations();
    initScrollReveal();
  }, 100);
}

/**
 * Initialize scroll reveal animations using IntersectionObserver
 * More efficient than scroll event listeners
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-up');
  
  if (revealElements.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// ============================================
// LUXURY BRAND INTRO ANIMATION
// ============================================

/**
 * Initialize luxury brand intro animation
 * Shows only once per browser session
 */
function initBrandIntro() {
  // Check if intro has already been shown in this session
  const hasSeenIntro = sessionStorage.getItem('brandIntroSeen');
  
  // If already seen, hide immediately
  if (hasSeenIntro) {
    const brandIntro = document.getElementById('brand-intro');
    if (brandIntro) {
      brandIntro.classList.add('brand-intro--hidden');
    }
    return;
  }
  
  // Show intro animation
  const brandIntro = document.getElementById('brand-intro');
  if (!brandIntro) return;
  
  // Mark as seen in session storage
  sessionStorage.setItem('brandIntroSeen', 'true');
  
  // Wait for animation to complete (total ~3.5 seconds)
  // Words: 0.3s, 0.9s, 1.5s delays + 0.8s duration each
  // Accent: 2.1s delay + 0.6s duration
  // Pause: 0.5s
  // Fade out: 0.8s
  setTimeout(() => {
    // Fade out brand intro
    brandIntro.classList.add('brand-intro--hidden');
    
  }, 3500);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
  // Initialize hero backgrounds first (for GitHub Pages compatibility)
  initHeroBackgrounds();
  
  // Initialize brand intro
  initBrandIntro();
  
  // Initialize components
  initNavbar();
  initHeroParallax();
  initDataLoading();
  initCounters();
  initScrollAnimations();
  initSmoothScroll();
  initFooterYear();
  
  // Log initialization
  console.log('Infinite Interior Decor - Homepage initialized');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    CONFIG,
    DOM,
    state
  };
}
