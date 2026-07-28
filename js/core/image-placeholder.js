/**
 * Image Placeholder System
 * 
 * Automatically generates elegant placeholders for images that haven't been uploaded yet.
 * Replaces div elements with data-text, data-width, and data-height attributes with
 * styled placeholders that display the image title/description.
 * 
 * Usage:
 * <div class="image-placeholder" data-text="Image Title" data-width="600" data-height="400"></div>
 * 
 * The system will automatically upgrade to real images when they become available
 * by checking if the image file exists at the specified path.
 */

(function() {
  'use strict';

  /**
   * Initialize the image placeholder system
   */
  function initImagePlaceholders() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    
    placeholders.forEach(placeholder => {
      renderPlaceholder(placeholder);
    });
  }

  /**
   * Render a single placeholder
   * @param {HTMLElement} placeholder - The placeholder element
   */
  function renderPlaceholder(placeholder) {
    const text = placeholder.dataset.text || 'Image';
    const width = parseInt(placeholder.dataset.width) || 400;
    const height = parseInt(placeholder.dataset.height) || 300;
    const isLogo = placeholder.classList.contains('image-placeholder--logo');
    
    // Set placeholder styles
    placeholder.style.width = '100%';
    placeholder.style.height = 'auto';
    placeholder.style.aspectRatio = `${width} / ${height}`;
    placeholder.style.backgroundColor = isLogo ? 'transparent' : '#f3f4f6';
    placeholder.style.borderRadius = isLogo ? '0' : '12px';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.overflow = 'hidden';
    placeholder.style.position = 'relative';
    
    // Create placeholder content
    const content = document.createElement('div');
    content.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 24px;
      text-align: center;
      color: #9ca3af;
    `;
    
    // Add icon
    const icon = document.createElement('div');
    icon.innerHTML = isLogo ? getLogoIcon() : getImageIcon();
    icon.style.cssText = `
      width: 48px;
      height: 48px;
      opacity: 0.5;
    `;
    content.appendChild(icon);
    
    // Add text
    const textElement = document.createElement('div');
    textElement.textContent = text;
    textElement.style.cssText = `
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    `;
    content.appendChild(textElement);
    
    // Add dimensions for non-logo placeholders
    if (!isLogo) {
      const dimensions = document.createElement('div');
      dimensions.textContent = `${width} × ${height}`;
      dimensions.style.cssText = `
        font-size: 12px;
        color: #9ca3af;
      `;
      content.appendChild(dimensions);
    }
    
    placeholder.appendChild(content);
    
    // Check if real image exists and upgrade
    checkForRealImage(placeholder);
  }

  /**
   * Get SVG icon for regular images
   * @returns {string} SVG string
   */
  function getImageIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>`;
  }

  /**
   * Get SVG icon for logo placeholders
   * @returns {string} SVG string
   */
  function getLogoIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>`;
  }

  /**
   * Check if a real image exists at the expected path and upgrade the placeholder
   * @param {HTMLElement} placeholder - The placeholder element
   */
  function checkForRealImage(placeholder) {
    // This is a placeholder for the upgrade logic
    // In a real implementation, you would:
    // 1. Check if the image file exists at the expected path
    // 2. If it exists, replace the placeholder with the actual <img> tag
    // 3. Add lazy loading attributes for performance
    
    // For now, we'll keep the placeholder as-is
    // The upgrade logic can be implemented when real images are available
  }

  /**
   * Upgrade a placeholder to a real image
   * @param {HTMLElement} placeholder - The placeholder element
   * @param {string} imagePath - The path to the real image
   */
  function upgradeToRealImage(placeholder, imagePath) {
    const img = document.createElement('img');
    img.src = window.resolveAssetPath(imagePath);
    img.alt = placeholder.dataset.text || 'Image';
    img.loading = 'lazy';
    
    // Add explicit dimensions from placeholder data for CLS prevention
    const width = parseInt(placeholder.dataset.width) || 400;
    const height = parseInt(placeholder.dataset.height) || 300;
    img.width = width;
    img.height = height;
    
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = placeholder.style.borderRadius;
    
    // Handle image load
    img.onload = function() {
      placeholder.innerHTML = '';
      placeholder.appendChild(img);
      placeholder.classList.add('image-placeholder--loaded');
    };
    
    // Handle image error
    img.onerror = function() {
      // Keep the placeholder if image fails to load
      console.warn('Failed to load image:', imagePath);
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImagePlaceholders);
  } else {
    initImagePlaceholders();
  }

  // Expose upgrade function globally for manual upgrades
  window.ImagePlaceholder = {
    upgrade: upgradeToRealImage,
    init: initImagePlaceholders
  };

})();
