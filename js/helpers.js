/**
 * Estimator Helper Functions
 * 
 * Utility functions for the estimator module.
 * Provides common helper methods used across modules.
 * 
 * Architecture:
 * - Purpose: Reusable utility functions
 * - Dependencies: None
 * - Exports: Helper object with utility methods
 */

(function() {
  'use strict';

  // Fallback for getBaseUrl if not already defined by app.js
  if (typeof window.getBaseUrl !== 'function') {
    window.getBaseUrl = function() {
      const isGitHubPages = window.location.hostname.includes('github.io');
      if (!isGitHubPages) return '/';
      const pathSegments = window.location.pathname.split('/').filter(segment => segment.length > 0);
      return '/' + (pathSegments[0] || '') + '/';
    };
  }

  /**
   * Helper Object
   * Contains all utility functions
   */
  const Helper = {
    /**
     * Format currency
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code (default: INR)
     * @returns {string} Formatted currency
     */
    formatCurrency(amount, currency = 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    },

    /**
     * Format number with commas
     * @param {number} number - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(number) {
      return new Intl.NumberFormat('en-IN').format(number);
    },

    /**
     * Generate unique ID
     * @returns {string} Unique identifier
     */
    generateId() {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Throttle function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
      let inThrottle;
      return function executedFunction(...args) {
        if (!inThrottle) {
          func(...args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    /**
     * Deep clone object
     * @param {*} obj - Object to clone
     * @returns {*} Cloned object
     */
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Deep merge objects
     * @param {Object} target - Target object
     * @param {...Object} sources - Source objects
     * @returns {Object} Merged object
     */
    deepMerge(target, ...sources) {
      const isObject = (obj) => obj && typeof obj === 'object';
      
      if (!sources.length) return target;
      const source = sources.shift();

      if (isObject(target) && isObject(source)) {
        for (const key in source) {
          if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            this.deepMerge(target[key], source[key]);
          } else {
            Object.assign(target, { [key]: source[key] });
          }
        }
      }
      
      return this.deepMerge(target, ...sources);
    },

    /**
     * Check if object is empty
     * @param {Object} obj - Object to check
     * @returns {boolean} Empty status
     */
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },

    /**
     * Get nested object property
     * @param {Object} obj - Object to search
     * @param {string} path - Dot notation path
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Property value or default
     */
    getNested(obj, path, defaultValue = undefined) {
      const keys = path.split('.');
      let result = obj;
      
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          return defaultValue;
        }
      }
      
      return result;
    },

    /**
     * Set nested object property
     * @param {Object} obj - Object to modify
     * @param {string} path - Dot notation path
     * @param {*} value - Value to set
     */
    setNested(obj, path, value) {
      const keys = path.split('.');
      const lastKey = keys.pop();
      let target = obj;
      
      for (const key of keys) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        target = target[key];
      }
      
      target[lastKey] = value;
    },

    /**
     * Remove item from array
     * @param {Array} array - Array to modify
     * @param {*} item - Item to remove
     * @returns {Array} Modified array
     */
    removeFromArray(array, item) {
      const index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      }
      return array;
    },

    /**
     * Remove item from array by predicate
     * @param {Array} array - Array to modify
     * @param {Function} predicate - Predicate function
     * @returns {Array} Modified array
     */
    removeFromArrayBy(array, predicate) {
      const index = array.findIndex(predicate);
      if (index > -1) {
        array.splice(index, 1);
      }
      return array;
    },

    /**
     * Calculate percentage
     * @param {number} value - Value
     * @param {number} total - Total
     * @returns {number} Percentage
     */
    calculatePercentage(value, total) {
      if (total === 0) return 0;
      return (value / total) * 100;
    },

    /**
     * Round to decimal places
     * @param {number} number - Number to round
     * @param {number} decimals - Decimal places
     * @returns {number} Rounded number
     */
    roundTo(number, decimals = 2) {
      const factor = Math.pow(10, decimals);
      return Math.round(number * factor) / factor;
    },

    /**
     * Clamp number between min and max
     * @param {number} number - Number to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped number
     */
    clamp(number, min, max) {
      return Math.min(Math.max(number, min), max);
    },

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} Valid status
     */
    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    /**
     * Validate phone format
     * @param {string} phone - Phone to validate
     * @returns {boolean} Valid status
     */
    isValidPhone(phone) {
      const regex = /^[0-9]{10}$/;
      return regex.test(phone.replace(/[^0-9]/g, ''));
    },

    /**
     * Validate PIN code format
     * @param {string} pin - PIN to validate
     * @returns {boolean} Valid status
     */
    isValidPIN(pin) {
      const regex = /^[0-9]{6}$/;
      return regex.test(pin);
    },

    /**
     * Parse query string
     * @param {string} queryString - Query string to parse
     * @returns {Object} Parsed parameters
     */
    parseQueryString(queryString) {
      const params = new URLSearchParams(queryString);
      const result = {};
      
      for (const [key, value] of params) {
        result[key] = value;
      }
      
      return result;
    },

    /**
     * Build query string
     * @param {Object} params - Parameters to stringify
     * @returns {string} Query string
     */
    buildQueryString(params) {
      return new URLSearchParams(params).toString();
    },

    /**
     * Get query parameter
     * @param {string} name - Parameter name
     * @returns {string|null} Parameter value
     */
    getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    },

    /**
     * Set query parameter
     * @param {string} name - Parameter name
     * @param {string} value - Parameter value
     */
    setQueryParam(name, value) {
      const url = new URL(window.location);
      url.searchParams.set(name, value);
      window.history.replaceState({}, '', url);
    },

    /**
     * Remove query parameter
     * @param {string} name - Parameter name
     */
    removeQueryParam(name) {
      const url = new URL(window.location);
      url.searchParams.delete(name);
      window.history.replaceState({}, '', url);
    },

    /**
     * Copy to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success status
     */
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        console.error('Copy to clipboard error:', error);
        return false;
      }
    },

    /**
     * Download file
     * @param {string} content - File content
     * @param {string} filename - File name
     * @param {string} mimeType - MIME type
     */
    downloadFile(content, filename, mimeType = 'text/plain') {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },

    /**
     * Get device type
     * @returns {string} Device type
     */
    getDeviceType() {
      const width = window.innerWidth;
      
      if (width < 640) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    },

    /**
     * Check if touch device
     * @returns {boolean} Touch status
     */
    isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    /**
     * Check if online
     * @returns {boolean} Online status
     */
    isOnline() {
      return navigator.onLine;
    },

    /**
     * Local storage wrapper
     */
    storage: {
      set(key, value) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (error) {
          console.error('Local storage set error:', error);
          return false;
        }
      },
      
      get(key) {
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        } catch (error) {
          console.error('Local storage get error:', error);
          return null;
        }
      },
      
      remove(key) {
        try {
          localStorage.removeItem(key);
          return true;
        } catch (error) {
          console.error('Local storage remove error:', error);
          return false;
        }
      },
      
      clear() {
        try {
          localStorage.clear();
          return true;
        } catch (error) {
          console.error('Local storage clear error:', error);
          return false;
        }
      }
    }
  };

  /**
   * Resolve asset path using browser-native URL resolution
   * Works on localhost, file://, and GitHub Pages without manual path calculation
   * @param {string} assetPath - Relative or absolute asset path (e.g., 'assets/images/logo.png' or '/assets/images/logo.png')
   * @returns {string} Resolved asset path
   */
  function resolveAssetPath(assetPath) {
    if (!assetPath) return '';
    
    // If already absolute URL, return as-is
    if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
      return assetPath;
    }
    
    // Use browser-native URL resolution
    try {
      const currentUrl = window.location.href;
      const resolvedUrl = new URL(assetPath, currentUrl);
      
      // Convert to relative path from current page
      const currentPath = window.location.pathname;
      const resolvedPath = resolvedUrl.pathname;
      
      // Calculate relative path
      const currentSegments = currentPath.split('/').filter(s => s.length > 0);
      const resolvedSegments = resolvedPath.split('/').filter(s => s.length > 0);
      
      // Find common prefix
      let commonDepth = 0;
      while (commonDepth < currentSegments.length && 
             commonDepth < resolvedSegments.length && 
             currentSegments[commonDepth] === resolvedSegments[commonDepth]) {
        commonDepth++;
      }
      
      // Calculate relative path
      const upLevels = currentSegments.length - commonDepth;
      const relativePath = '../'.repeat(upLevels) + resolvedSegments.slice(commonDepth).join('/');
      
      return relativePath;
      
    } catch (error) {
      console.error('Asset path resolution error:', error);
      // Fallback to original path if resolution fails
      return assetPath;
    }
  }

  /**
   * Get base path for current page
   * Returns the relative path prefix to reach the root using browser-native URL resolution
   * @returns {string} Base path prefix
   */
  function getBasePath() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(s => s.length > 0);
    
    // Calculate relative path to root
    const depth = pathSegments.length;
    
    if (depth === 0) {
      return '';
    } else {
      return '../'.repeat(depth);
    }
  }

  // Export for use in other modules
  window.EstimatorHelper = Helper;
  window.resolveAssetPath = resolveAssetPath;
  window.getBasePath = getBasePath;

})();
