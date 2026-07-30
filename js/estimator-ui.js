/**
 * Estimator UI Manager
 * 
 * UI management for estimator module.
 * Handles DOM manipulation, event handling, and UI rendering.
 * 
 * Architecture:
 * - Purpose: Manage UI interactions and rendering
 * - Dependencies: estimator-state.js, estimator-router.js
 * - Exports: UIManager class
 */

(function() {
  'use strict';

  /**
   * UI Manager Class
   * Manages all UI operations
   */
  class UIManager {
    constructor(stateManager, router) {
      this.state = stateManager;
      this.router = router;
      
      // UI elements
      this.elements = {};
      
      // Event handlers
      this.handlers = {};
    }

    /**
     * Initialize UI manager
     */
    init() {
      this.cacheElements();
      this.bindEvents();
      this.renderProgress();
      this.hideLoading();
    }

    /**
     * Cache DOM elements
     */
    cacheElements() {
      this.elements = {
        app: document.getElementById('estimator-app'),
        loading: document.getElementById('estimator-loading'),
        main: document.getElementById('estimator-main'),
        wizard: document.getElementById('estimator-wizard'),
        progress: document.getElementById('estimator-progress'),
        stepContainer: document.getElementById('estimator-step-container'),
        navigation: document.getElementById('estimator-navigation'),
        prevButton: document.getElementById('estimator-prev'),
        nextButton: document.getElementById('estimator-next'),
        summary: document.getElementById('estimator-summary')
      };
    }

    /**
     * Bind event handlers
     */
    bindEvents() {
      // Navigation buttons
      this.elements.prevButton.addEventListener('click', () => this.handlePrevious());
      this.elements.nextButton.addEventListener('click', () => this.handleNext());
      
      // State subscription
      this.state.subscribe((state) => this.handleStateChange(state));
    }

    /**
     * Handle state changes
     * @param {Object} state - Current state
     */
    handleStateChange(state) {
      this.updateNavigationButtons(state);
      this.updateProgress(state);
    }

    /**
     * Handle previous button click
     */
    handlePrevious() {
      this.router.previous();
    }

    /**
     * Handle next button click
     */
    handleNext() {
      this.router.next();
    }

    /**
     * Update navigation buttons
     * @param {Object} state - Current state
     */
    updateNavigationButtons(state) {
      this.elements.prevButton.disabled = !state.canGoBack;
      this.elements.nextButton.disabled = !state.canProceed;
      
      // Update next button text for final step
      if (state.currentStep === state.totalSteps) {
        this.elements.nextButton.textContent = 'Complete';
      } else {
        this.elements.nextButton.textContent = 'Next';
      }
    }

    /**
     * Render progress indicator
     * @param {Object} state - Current state
     */
    renderProgress(state) {
      const steps = this.router.getAllSteps();
      const currentStep = state ? state.currentStep : this.router.currentStep;
      
      let html = '<div class="estimator-progress-line"></div>';
      html += '<div class="estimator-progress-steps">';
      
      steps.forEach((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        
        let statusClass = '';
        if (isCompleted) statusClass = 'estimator-progress-step--completed';
        if (isActive) statusClass = 'estimator-progress-step--active';
        
        html += `
          <div class="estimator-progress-step ${statusClass}">
            <div class="estimator-progress-step__indicator">
              ${isCompleted ? '✓' : stepNumber}
            </div>
            <span class="estimator-progress-step__label">${step.title}</span>
          </div>
        `;
      });
      
      html += '</div>';
      
      this.elements.progress.innerHTML = html;
    }

    /**
     * Update progress indicator
     * @param {Object} state - Current state
     */
    updateProgress(state) {
      this.renderProgress(state);
    }

    /**
     * Render step content
     * @param {number} stepId - Step ID
     */
    renderStep(stepId) {
      const step = this.router.getStep(stepId);
      
      if (!step) return;
      
      // Add exiting animation
      this.elements.stepContainer.classList.add('estimator-step--exiting');
      
      setTimeout(() => {
        // Clear container
        this.elements.stepContainer.innerHTML = '';
        
        // Add entering animation
        this.elements.stepContainer.classList.remove('estimator-step--exiting');
        this.elements.stepContainer.classList.add('estimator-step--entering');
        
        // Render step-specific content
        this.renderStepContent(stepId);
        
        // Remove animation class after animation completes
        setTimeout(() => {
          this.elements.stepContainer.classList.remove('estimator-step--entering');
        }, 400);
      }, 300);
    }

    /**
     * Render step-specific content
     * @param {number} stepId - Step ID
     */
    renderStepContent(stepId) {
      // Placeholder for step-specific rendering logic
      // Will be implemented with step-specific renderers
      
      switch (stepId) {
        case 1:
          this.renderPackageStep();
          break;
        case 2:
          this.renderBudgetStep();
          break;
        case 3:
          this.renderRoomsStep();
          break;
        case 4:
          this.renderModulesStep();
          break;
        case 5:
          this.renderMaterialsStep();
          break;
        case 6:
          this.renderDetailsStep();
          break;
        case 7:
          this.renderReviewStep();
          break;
        case 8:
          this.renderSummaryStep();
          break;
        default:
          this.elements.stepContainer.innerHTML = '<p>Step not found</p>';
      }
    }

    /**
     * Render Step 1 - Project Category
     */
    renderPackageStep() {
      const categories = [
        { id: 'residential', name: 'Residential', icon: '🏠', description: 'Home interior design for apartments, villas, and independent houses' },
        { id: 'commercial', name: 'Commercial', icon: '🏢', description: 'Office spaces, retail stores, and business interiors' },
        { id: 'hospitality', name: 'Hospitality', icon: '🏨', description: 'Hotels, restaurants, cafes, and entertainment spaces' },
        { id: 'retail', name: 'Retail', icon: '🛍️', description: 'Showrooms, boutiques, and shopping experiences' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Select Project Category</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Choose the type of space you want to design</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-card-grid estimator-card-grid--2">
      `;

      categories.forEach(category => {
        const isSelected = this.state.get('projectCategory') === category.id;
        html += `
          <div class="estimator-card ${isSelected ? 'estimator-card--selected' : ''}" 
               data-category="${category.id}" 
               role="button" 
               tabindex="0"
               aria-label="Select ${category.name} category"
               aria-pressed="${isSelected}">
            <div class="estimator-card__icon">
              <span style="font-size: 32px;">${category.icon}</span>
            </div>
            <h3 class="estimator-card__title">${category.name}</h3>
            <p class="estimator-card__description">${category.description}</p>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      // Add event listeners
      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(card => {
        card.addEventListener('click', (e) => this.handleCategorySelection(e));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleCategorySelection(e);
          }
        });
      });
    }

    /**
     * Handle category selection
     */
    handleCategorySelection(event) {
      const card = event.currentTarget;
      const categoryId = card.dataset.category;
      
      this.state.set('projectCategory', categoryId);
      
      // Update UI
      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(c => {
        c.classList.remove('estimator-card--selected');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('estimator-card--selected');
      card.setAttribute('aria-pressed', 'true');
      
      // Enable next button
      this.state.set('canProceed', true);
    }

    /**
     * Render Step 2 - Project Type
     */
    renderBudgetStep() {
      const projectTypes = [
        { 
          id: 'new_construction', 
          name: 'New Construction', 
          description: 'Complete interior design for newly built spaces',
          features: ['Full space planning', 'Complete furnishing', 'Custom design elements'],
          icon: '🏗️'
        },
        { 
          id: 'renovation', 
          name: 'Renovation', 
          description: 'Transform existing spaces with modern design',
          features: ['Space optimization', 'Modern upgrades', 'Structural modifications'],
          icon: '🔧'
        },
        { 
          id: 'interior_redesign', 
          name: 'Interior Redesign', 
          description: 'Refresh your space with new aesthetics',
          features: ['Style refresh', 'Furniture updates', 'Decor enhancements'],
          icon: '🎨'
        },
        { 
          id: 'partial_upgrade', 
          name: 'Partial Upgrade', 
          description: 'Focus on specific areas or rooms',
          features: ['Room-specific design', 'Budget-friendly', 'Flexible scope'],
          icon: '📐'
        }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Select Project Type</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Choose the scope of your project</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-card-grid estimator-card-grid--2">
      `;

      projectTypes.forEach(type => {
        const isSelected = this.state.get('projectType') === type.id;
        const isExpanded = isSelected;
        
        html += `
          <div class="estimator-card ${isSelected ? 'estimator-card--selected' : ''}" 
               data-type="${type.id}" 
               role="button" 
               tabindex="0"
               aria-label="Select ${type.name} project type"
               aria-pressed="${isSelected}"
               aria-expanded="${isExpanded}">
            <div class="estimator-card__icon">
              <span style="font-size: 32px;">${type.icon}</span>
            </div>
            <h3 class="estimator-card__title">${type.name}</h3>
            <p class="estimator-card__description">${type.description}</p>
            ${isExpanded ? `
              <div class="estimator-card__features" style="margin-top: var(--spacing-4); padding-top: var(--spacing-4); border-top: 1px solid rgba(0,0,0,0.05);">
                ${type.features.map(f => `<span class="estimator-tag" style="margin-right: var(--spacing-2); margin-bottom: var(--spacing-2);">${f}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      // Add event listeners
      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(card => {
        card.addEventListener('click', (e) => this.handleProjectTypeSelection(e));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleProjectTypeSelection(e);
          }
        });
      });
    }

    /**
     * Handle project type selection
     */
    handleProjectTypeSelection(event) {
      const card = event.currentTarget;
      const typeId = card.dataset.type;
      
      this.state.set('projectType', typeId);
      
      // Re-render to show expanded state
      this.renderBudgetStep();
      
      // Enable next button
      this.state.set('canProceed', true);
    }

    /**
     * Render Step 3 - Project Information
     */
    renderRoomsStep() {
      const projectInfo = this.state.get('projectInfo') || {};
      
      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Project Information</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Tell us about your space</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-form-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-6);">
            <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08);">
              <label class="estimator-label" for="area">Total Area (sqft)</label>
              <input type="number" id="area" class="estimator-input" placeholder="Enter total area" value="${projectInfo.area || ''}" aria-required="true">
            </div>
            
            <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08);">
              <label class="estimator-label" for="floor">Floor Number</label>
              <input type="number" id="floor" class="estimator-input" placeholder="Enter floor number" value="${projectInfo.floor || ''}">
            </div>
            
            <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08);">
              <label class="estimator-label" for="city">City</label>
              <select id="city" class="estimator-select" aria-required="true">
                <option value="">Select city</option>
                <option value="mumbai" ${projectInfo.city === 'mumbai' ? 'selected' : ''}>Mumbai</option>
                <option value="delhi" ${projectInfo.city === 'delhi' ? 'selected' : ''}>Delhi</option>
                <option value="bangalore" ${projectInfo.city === 'bangalore' ? 'selected' : ''}>Bangalore</option>
                <option value="chennai" ${projectInfo.city === 'chennai' ? 'selected' : ''}>Chennai</option>
                <option value="hyderabad" ${projectInfo.city === 'hyderabad' ? 'selected' : ''}>Hyderabad</option>
                <option value="pune" ${projectInfo.city === 'pune' ? 'selected' : ''}>Pune</option>
                <option value="other" ${projectInfo.city === 'other' ? 'selected' : ''}>Other</option>
              </select>
            </div>
            
            <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08);">
              <label class="estimator-label" for="constructionType">Construction Type</label>
              <select id="constructionType" class="estimator-select" aria-required="true">
                <option value="">Select type</option>
                <option value="apartment" ${projectInfo.constructionType === 'apartment' ? 'selected' : ''}>Apartment</option>
                <option value="villa" ${projectInfo.constructionType === 'villa' ? 'selected' : ''}>Villa</option>
                <option value="independent_house" ${projectInfo.constructionType === 'independent_house' ? 'selected' : ''}>Independent House</option>
                <option value="penthouse" ${projectInfo.constructionType === 'penthouse' ? 'selected' : ''}>Penthouse</option>
                <option value="commercial_space" ${projectInfo.constructionType === 'commercial_space' ? 'selected' : ''}>Commercial Space</option>
              </select>
            </div>
            
            <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08);">
              <label class="estimator-label" for="propertySize">Property Size</label>
              <select id="propertySize" class="estimator-select">
                <option value="">Select size</option>
                <option value="1bhk" ${projectInfo.propertySize === '1bhk' ? 'selected' : ''}>1 BHK</option>
                <option value="2bhk" ${projectInfo.propertySize === '2bhk' ? 'selected' : ''}>2 BHK</option>
                <option value="3bhk" ${projectInfo.propertySize === '3bhk' ? 'selected' : ''}>3 BHK</option>
                <option value="4bhk" ${projectInfo.propertySize === '4bhk' ? 'selected' : ''}>4 BHK</option>
                <option value="5bhk" ${projectInfo.propertySize === '5bhk' ? 'selected' : ''}>5 BHK</option>
                <option value="studio" ${projectInfo.propertySize === 'studio' ? 'selected' : ''}>Studio</option>
                <option value="office" ${projectInfo.propertySize === 'office' ? 'selected' : ''}>Office Space</option>
                <option value="retail" ${projectInfo.propertySize === 'retail' ? 'selected' : ''}>Retail Space</option>
              </select>
            </div>
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      // Add event listeners
      const inputs = this.elements.stepContainer.querySelectorAll('input, select');
      inputs.forEach(input => {
        input.addEventListener('input', (e) => this.handleProjectInfoChange(e));
        input.addEventListener('change', (e) => this.handleProjectInfoChange(e));
      });

      // Check if form is valid
      this.validateProjectInfo();
    }

    /**
     * Handle project info change
     */
    handleProjectInfoChange(event) {
      const field = event.target.id;
      const value = event.target.value;
      
      const projectInfo = this.state.get('projectInfo') || {};
      projectInfo[field] = value;
      this.state.set('projectInfo', projectInfo);
      
      this.validateProjectInfo();
    }

    /**
     * Validate project info
     */
    validateProjectInfo() {
      const projectInfo = this.state.get('projectInfo') || {};
      const isValid = projectInfo.area && projectInfo.city && projectInfo.constructionType;
      
      this.state.set('canProceed', isValid);
    }

    /**
     * Render Step 4 - Requirement Builder
     */
    renderModulesStep() {
      const rooms = this.state.get('rooms') || [];
      
      const roomTypes = [
        { id: 'living_room', name: 'Living Room', icon: '🛋️' },
        { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
        { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
        { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
        { id: 'dining', name: 'Dining Room', icon: '🍽️' },
        { id: 'study', name: 'Study Room', icon: '📚' },
        { id: 'balcony', name: 'Balcony', icon: '🌿' },
        { id: 'puja_room', name: 'Puja Room', icon: '🙏' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Requirement Builder</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Add the rooms you want to design</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-rooms-list" style="margin-bottom: var(--spacing-8);">
      `;

      if (rooms.length === 0) {
        html += `
          <div class="estimator-empty-state" style="text-align: center; padding: var(--spacing-12); color: var(--color-text-tertiary);">
            <span style="font-size: 48px; display: block; margin-bottom: var(--spacing-4);">🏠</span>
            <p style="font-size: var(--font-size-lg);">No rooms added yet</p>
            <p style="font-size: var(--font-size-sm);">Click "Add Room" to get started</p>
          </div>
        `;
      } else {
        rooms.forEach((room, index) => {
          html += `
            <div class="estimator-room-card" data-room-index="${index}" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-6); margin-bottom: var(--spacing-4); border: 1px solid rgba(0,0,0,0.08);">
              <div class="estimator-room-card__header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-4);">
                <div style="display: flex; align-items: center; gap: var(--spacing-4);">
                  <span style="font-size: 24px;">${roomTypes.find(t => t.id === room.type)?.icon || '🏠'}</span>
                  <div>
                    <h4 style="font-family: var(--font-heading); font-size: var(--font-size-lg); color: var(--color-text-primary); margin: 0;">${roomTypes.find(t => t.id === room.type)?.name || 'Room'}</h4>
                    <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin: 0;">${room.area || 0} sqft</p>
                  </div>
                </div>
                <div style="display: flex; gap: var(--spacing-2);">
                  <button class="estimator-room-card__duplicate" data-index="${index}" style="padding: var(--spacing-2) var(--spacing-4); border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-lg); background: rgba(255,255,255,0.9); cursor: pointer; transition: all 0.3s var(--ease-luxury);" aria-label="Duplicate room">📋</button>
                  <button class="estimator-room-card__delete" data-index="${index}" style="padding: var(--spacing-2) var(--spacing-4); border: 1px solid rgba(239,68,68,0.3); border-radius: var(--radius-lg); background: rgba(239,68,68,0.1); cursor: pointer; transition: all 0.3s var(--ease-luxury);" aria-label="Delete room">🗑️</button>
                </div>
              </div>
            </div>
          `;
        });
      }

      html += `
          </div>
          <button class="estimator-add-room-btn" style="width: 100%; padding: var(--spacing-5); border: 2px dashed rgba(196,160,116,0.3); border-radius: var(--radius-xl); background: rgba(196,160,116,0.05); color: var(--color-champagne-600); font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); cursor: pointer; transition: all 0.3s var(--ease-luxury); display: flex; align-items: center; justify-content: center; gap: var(--spacing-3);" aria-label="Add new room">
            <span style="font-size: 24px;">+</span>
            Add Room
          </button>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      // Add event listeners
      const addBtn = this.elements.stepContainer.querySelector('.estimator-add-room-btn');
      addBtn.addEventListener('click', () => this.showAddRoomModal());

      this.elements.stepContainer.querySelectorAll('.estimator-room-card__duplicate').forEach(btn => {
        btn.addEventListener('click', (e) => this.duplicateRoom(e));
      });

      this.elements.stepContainer.querySelectorAll('.estimator-room-card__delete').forEach(btn => {
        btn.addEventListener('click', (e) => this.deleteRoom(e));
      });

      // Validate
      this.state.set('canProceed', rooms.length > 0);
    }

    /**
     * Show add room modal
     */
    showAddRoomModal() {
      const roomTypes = [
        { id: 'living_room', name: 'Living Room', icon: '🛋️' },
        { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
        { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
        { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
        { id: 'dining', name: 'Dining Room', icon: '🍽️' },
        { id: 'study', name: 'Study Room', icon: '📚' },
        { id: 'balcony', name: 'Balcony', icon: '🌿' },
        { id: 'puja_room', name: 'Puja Room', icon: '🙏' }
      ];

      let modalHtml = `
        <div class="estimator-modal estimator-modal--active" id="add-room-modal">
          <div class="estimator-modal__content">
            <h3 style="font-family: var(--font-heading); font-size: var(--font-size-2xl); color: var(--color-text-primary); margin-bottom: var(--spacing-6);">Add Room</h3>
            <div class="estimator-form-group" style="margin-bottom: var(--spacing-6);">
              <label class="estimator-label" for="room-type">Room Type</label>
              <select id="room-type" class="estimator-select">
                ${roomTypes.map(type => `<option value="${type.id}">${type.icon} ${type.name}</option>`).join('')}
              </select>
            </div>
            <div class="estimator-form-group" style="margin-bottom: var(--spacing-6);">
              <label class="estimator-label" for="room-area">Area (sqft)</label>
              <input type="number" id="room-area" class="estimator-input" placeholder="Enter area">
            </div>
            <div style="display: flex; gap: var(--spacing-4); justify-content: flex-end; margin-top: var(--spacing-8);">
              <button class="estimator-modal-cancel" style="padding: var(--spacing-4) var(--spacing-6); border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-lg); background: rgba(255,255,255,0.9); cursor: pointer;">Cancel</button>
              <button class="estimator-modal-confirm" style="padding: var(--spacing-4) var(--spacing-6); border: none; border-radius: var(--radius-lg); background: var(--color-champagne-500); color: white; cursor: pointer;">Add Room</button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);

      const modal = document.getElementById('add-room-modal');
      const cancelBtn = modal.querySelector('.estimator-modal-cancel');
      const confirmBtn = modal.querySelector('.estimator-modal-confirm');

      cancelBtn.addEventListener('click', () => modal.remove());
      confirmBtn.addEventListener('click', () => this.addRoom(modal));
    }

    /**
     * Add room
     */
    addRoom(modal) {
      const type = modal.querySelector('#room-type').value;
      const area = modal.querySelector('#room-area').value;

      const rooms = this.state.get('rooms') || [];
      rooms.push({
        id: Date.now().toString(),
        type,
        area: parseInt(area) || 0
      });

      this.state.set('rooms', rooms);
      modal.remove();
      this.renderModulesStep();
    }

    /**
     * Duplicate room
     */
    duplicateRoom(event) {
      const index = parseInt(event.target.dataset.index);
      const rooms = this.state.get('rooms') || [];
      const roomToDuplicate = { ...rooms[index], id: Date.now().toString() };
      rooms.splice(index + 1, 0, roomToDuplicate);
      this.state.set('rooms', rooms);
      this.renderModulesStep();
    }

    /**
     * Delete room
     */
    deleteRoom(event) {
      const index = parseInt(event.target.dataset.index);
      const rooms = this.state.get('rooms') || [];
      rooms.splice(index, 1);
      this.state.set('rooms', rooms);
      this.renderModulesStep();
    }

    /**
     * Render Step 5 - Design Style
     */
    renderMaterialsStep() {
      const designStyles = [
        { 
          id: 'modern', 
          name: 'Modern', 
          description: 'Clean lines, neutral colors, functional design',
          colorPalette: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#333333'],
          icon: '🏢'
        },
        { 
          id: 'minimalist', 
          name: 'Minimalist', 
          description: 'Simplicity, clean aesthetics, essential elements',
          colorPalette: ['#FAFAFA', '#F0F0F0', '#E8E8E8', '#2C2C2C'],
          icon: '⬜'
        },
        { 
          id: 'luxury', 
          name: 'Luxury', 
          description: 'Premium materials, elegant finishes, sophisticated',
          colorPalette: ['#1C1C1C', '#C4A074', '#D4AF37', '#FFFFFF'],
          icon: '✨'
        },
        { 
          id: 'industrial', 
          name: 'Industrial', 
          description: 'Raw materials, exposed elements, urban aesthetic',
          colorPalette: ['#4A4A4A', '#8B7355', '#B8860B', '#D3D3D3'],
          icon: '🏭'
        },
        { 
          id: 'japandi', 
          name: 'Japandi', 
          description: 'Japanese minimalism meets Scandinavian warmth',
          colorPalette: ['#F5F5DC', '#D2B48C', '#8B4513', '#FAF0E6'],
          icon: '🎋'
        },
        { 
          id: 'classic', 
          name: 'Classic', 
          description: 'Timeless elegance, traditional elements, refined',
          colorPalette: ['#FFF8DC', '#DEB887', '#8B4513', '#F5F5DC'],
          icon: '🏛️'
        },
        { 
          id: 'scandinavian', 
          name: 'Scandinavian', 
          description: 'Light, airy, natural materials, cozy warmth',
          colorPalette: ['#F5F5DC', '#E0E0E0', '#87CEEB', '#FFFFFF'],
          icon: '❄️'
        },
        { 
          id: 'neo_classical', 
          name: 'Neo Classical', 
          description: 'Modern interpretation of classical elements',
          colorPalette: ['#FFFDD0', '#C0C0C0', '#DAA520', '#FAFAD2'],
          icon: '🏛️'
        },
        { 
          id: 'contemporary', 
          name: 'Contemporary', 
          description: 'Current trends, flexible, adaptable design',
          colorPalette: ['#E8E8E8', '#A9A9A9', '#696969', '#2F4F4F'],
          icon: '🎨'
        }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Design Style</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Choose your preferred aesthetic</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-card-grid estimator-card-grid--3">
      `;

      designStyles.forEach(style => {
        const isSelected = this.state.get('designStyle') === style.id;
        
        html += `
          <div class="estimator-card ${isSelected ? 'estimator-card--selected' : ''}" 
               data-style="${style.id}" 
               role="button" 
               tabindex="0"
               aria-label="Select ${style.name} design style"
               aria-pressed="${isSelected}">
            <div class="estimator-card__image">
              <div style="display: flex; gap: var(--spacing-2);">
                ${style.colorPalette.slice(0, 4).map(color => 
                  `<div style="width: 24px; height: 24px; border-radius: 50%; background: ${color}; border: 1px solid rgba(0,0,0,0.1);"></div>`
                ).join('')}
              </div>
            </div>
            <h3 class="estimator-card__title">${style.name}</h3>
            <p class="estimator-card__description">${style.description}</p>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      // Add event listeners
      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(card => {
        card.addEventListener('click', (e) => this.handleDesignStyleSelection(e));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleDesignStyleSelection(e);
          }
        });
      });
    }

    /**
     * Handle design style selection
     */
    handleDesignStyleSelection(event) {
      const card = event.currentTarget;
      const styleId = card.dataset.style;
      
      this.state.set('designStyle', styleId);
      
      // Update UI
      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(c => {
        c.classList.remove('estimator-card--selected');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('estimator-card--selected');
      card.setAttribute('aria-pressed', 'true');
      
      // Enable next button
      this.state.set('canProceed', true);
    }

    /**
     * Render Step 6 - Package Selection
     */
    renderDetailsStep() {
      const packages = [
        {
          id: 'basic',
          name: 'Basic',
          tier: 'essential',
          description: 'Essential interior design for budget-conscious projects',
          timeline: '15-30 days',
          features: ['Basic design consultation', 'Material selection', 'Standard installation'],
          inclusions: ['2 design revisions', 'Standard materials', 'Basic lighting'],
          exclusions: ['Custom furniture', 'Premium materials', 'Smart home integration'],
          popular: false
        },
        {
          id: 'standard',
          name: 'Standard',
          tier: 'premium',
          description: 'Comprehensive design with quality materials',
          timeline: '30-45 days',
          features: ['Full design planning', 'Premium materials', 'Professional installation'],
          inclusions: ['4 design revisions', 'Premium materials', 'Advanced lighting', 'Custom cabinetry'],
          exclusions: ['Smart home integration', 'Premium furniture'],
          popular: true
        },
        {
          id: 'premium',
          name: 'Premium',
          tier: 'luxury',
          description: 'Luxury design with premium finishes and custom elements',
          timeline: '45-60 days',
          features: ['Bespoke design', 'Luxury materials', 'White-glove installation'],
          inclusions: ['Unlimited revisions', 'Luxury materials', 'Smart lighting', 'Custom furniture', 'Home automation'],
          exclusions: ['Architectural modifications'],
          popular: false
        },
        {
          id: 'luxury_signature',
          name: 'Luxury Signature',
          tier: 'elite',
          description: 'Ultra-premium design with exclusive materials and services',
          timeline: '60-90 days',
          features: ['Exclusive design', 'Imported materials', 'Concierge service'],
          inclusions: ['Unlimited revisions', 'Imported materials', 'Smart home integration', 'Custom furniture', 'Project management', 'Post-installation support'],
          exclusions: ['Structural changes'],
          popular: false
        },
        {
          id: 'custom',
          name: 'Custom',
          tier: 'elite',
          description: 'Fully customized solution tailored to your needs',
          timeline: 'Based on scope',
          features: ['Personalized design', 'Flexible scope', 'Dedicated team'],
          inclusions: ['Custom scope', 'Dedicated designer', 'Priority scheduling'],
          exclusions: ['None - fully customizable'],
          popular: false
        }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Select Package</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Choose the level of service that fits your needs</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-package-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--spacing-6);">
      `;

      packages.forEach(pkg => {
        const isSelected = this.state.get('selectedPackage') === pkg.id;
        const isExpanded = isSelected;
        
        html += `
          <div class="estimator-package-card ${isSelected ? 'estimator-package-card--selected' : ''} ${pkg.popular ? 'estimator-package-card--popular' : ''}" 
               data-package="${pkg.id}" 
               style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-2xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08); cursor: pointer; transition: all 0.4s var(--ease-luxury); position: relative;"
               role="button" 
               tabindex="0"
               aria-label="Select ${pkg.name} package"
               aria-pressed="${isSelected}"
               aria-expanded="${isExpanded}">
            ${pkg.popular ? '<span class="estimator-badge" style="position: absolute; top: var(--spacing-4); right: var(--spacing-4);">Popular</span>' : ''}
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-4);">
              <h3 class="estimator-card__title" style="margin: 0;">${pkg.name}</h3>
              <span class="estimator-tag" style="background: rgba(196,160,116,0.1); color: var(--color-champagne-600);">${pkg.tier}</span>
            </div>
            <p class="estimator-card__description" style="margin-bottom: var(--spacing-4);">${pkg.description}</p>
            <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-4); color: var(--color-text-secondary); font-size: var(--font-size-sm);">
              <span>⏱️</span>
              <span>${pkg.timeline}</span>
            </div>
            ${isExpanded ? `
              <div class="estimator-package-details" style="margin-top: var(--spacing-6); padding-top: var(--spacing-6); border-top: 1px solid rgba(0,0,0,0.05);">
                <div style="margin-bottom: var(--spacing-4);">
                  <h4 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text-primary); margin-bottom: var(--spacing-2);">Features</h4>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    ${pkg.features.map(f => `<li style="font-size: var(--font-size-sm); color: var(--color-text-secondary); padding: var(--spacing-1) 0;">✓ ${f}</li>`).join('')}
                  </ul>
                </div>
                <div style="margin-bottom: var(--spacing-4);">
                  <h4 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text-primary); margin-bottom: var(--spacing-2);">What's Included</h4>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    ${pkg.inclusions.map(i => `<li style="font-size: var(--font-size-sm); color: var(--color-text-secondary); padding: var(--spacing-1) 0;">✓ ${i}</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <h4 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text-primary); margin-bottom: var(--spacing-2);">Exclusions</h4>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    ${pkg.exclusions.map(e => `<li style="font-size: var(--font-size-sm); color: var(--color-text-tertiary); padding: var(--spacing-1) 0;">✗ ${e}</li>`).join('')}
                  </ul>
                </div>
              </div>
            ` : ''}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      // Add event listeners
      this.elements.stepContainer.querySelectorAll('.estimator-package-card').forEach(card => {
        card.addEventListener('click', (e) => this.handlePackageSelection(e));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handlePackageSelection(e);
          }
        });
      });
    }

    /**
     * Handle package selection
     */
    handlePackageSelection(event) {
      const card = event.currentTarget;
      const packageId = card.dataset.package;
      
      this.state.set('selectedPackage', packageId);
      
      // Re-render to show expanded state
      this.renderDetailsStep();
      
      // Enable next button
      this.state.set('canProceed', true);
    }

    /**
     * Render Step 7 - Budget
     */
    renderReviewStep() {
      const budget = this.state.get('budget') || '';
      const budgetType = this.state.get('budgetType') || 'known';
      
      const presetBudgets = [
        { id: '5L', label: '₹5L', value: 500000 },
        { id: '10L', label: '₹10L', value: 1000000 },
        { id: '25L', label: '₹25L', value: 2500000 },
        { id: '50L', label: '₹50L', value: 5000000 },
        { id: '1Cr', label: '₹1Cr', value: 10000000 },
        { id: '2Cr', label: '₹2Cr', value: 20000000 },
        { id: '5Cr', label: '₹5Cr', value: 50000000 }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Budget</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Set your budget range</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-budget-type-selector" style="display: flex; gap: var(--spacing-4); margin-bottom: var(--spacing-8);">
            <button class="estimator-chip ${budgetType === 'known' ? 'estimator-chip--selected' : ''}" data-type="known" style="flex: 1;">
              Known Budget
            </button>
            <button class="estimator-chip ${budgetType === 'unknown' ? 'estimator-chip--selected' : ''}" data-type="unknown" style="flex: 1;">
              Unknown Budget
            </button>
          </div>
          
          ${budgetType === 'known' ? `
            <div class="estimator-budget-input-section">
              <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); margin-bottom: var(--spacing-6); border: 1px solid rgba(0,0,0,0.08);">
                <label class="estimator-label" for="budget-amount">Budget Amount (₹)</label>
                <input type="number" id="budget-amount" class="estimator-input" placeholder="Enter your budget" value="${budget}" style="font-size: var(--font-size-xl); font-family: var(--font-heading); font-weight: var(--font-weight-semibold);">
              </div>
              
              <div style="margin-bottom: var(--spacing-4);">
                <p style="font-size: var(--font-size-sm); color: var(--color-text-tertiary); margin-bottom: var(--spacing-4);">Or select a preset:</p>
                <div class="estimator-budget-presets" style="display: flex; flex-wrap: wrap; gap: var(--spacing-3);">
                 ${presetBudgets.map(preset => `
                    <button class="estimator-chip ${budget === preset.value ? 'estimator-chip--selected' : ''}" data-value="${preset.value}" style="font-size: var(--font-size-sm);">
                      ${preset.label}
                    </button>
                  `).join('')}
                </div>
              </div>
              
              <div class="estimator-budget-slider-section" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08);">
                <label class="estimator-label">Budget Range</label>
                <input type="range" id="budget-slider" class="estimator-slider" min="500000" max="50000000" step="100000" value="${budget || 2500000}" style="width: 100%;">
                <div style="display: flex; justify-content: space-between; margin-top: var(--spacing-4); font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                  <span>₹5L</span>
                  <span>₹5Cr</span>
                </div>
              </div>
            </div>
          ` : `
            <div class="estimator-unknown-budget-section" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-10); text-align: center; border: 1px solid rgba(0,0,0,0.08);">
              <span style="font-size: 48px; display: block; margin-bottom: var(--spacing-4);">💰</span>
              <h3 style="font-family: var(--font-heading); font-size: var(--font-size-xl); color: var(--color-text-primary); margin-bottom: var(--spacing-2);">Not Sure About Budget?</h3>
              <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-6);">No problem! We'll help you explore options and provide estimates based on your requirements.</p>
              <button class="estimator-chip estimator-chip--selected" style="margin: 0 auto;">
                I'll Explore Options
              </button>
            </div>
          `}
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      // Add event listeners
      this.elements.stepContainer.querySelectorAll('.estimator-budget-type-selector .estimator-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          this.state.set('budgetType', e.target.dataset.type);
          this.renderReviewStep();
        });
      });

      if (budgetType === 'known') {
        const budgetInput = this.elements.stepContainer.querySelector('#budget-amount');
        const budgetSlider = this.elements.stepContainer.querySelector('#budget-slider');
        
        budgetInput.addEventListener('input', (e) => {
          this.state.set('budget', parseInt(e.target.value) || 0);
          this.validateBudget();
        });
        
        budgetSlider.addEventListener('input', (e) => {
          this.state.set('budget', parseInt(e.target.value));
          budgetInput.value = e.target.value;
          this.validateBudget();
        });

        this.elements.stepContainer.querySelectorAll('.estimator-budget-presets .estimator-chip').forEach(chip => {
          chip.addEventListener('click', (e) => {
            const value = parseInt(e.target.dataset.value);
            this.state.set('budget', value);
            budgetInput.value = value;
            budgetSlider.value = value;
            this.renderReviewStep();
          });
        });
      } else {
        this.state.set('canProceed', true);
      }
    }

    /**
     * Validate budget
     */
    validateBudget() {
      const budget = this.state.get('budget');
      const isValid = budget && budget >= 500000;
      this.state.set('canProceed', isValid);
    }

    /**
     * Render Step 8 - Contact & Review
     */
    renderSummaryStep() {
      const clientDetails = this.state.get('clientDetails') || {};
      
      // Get summary data
      const summary = {
        projectCategory: this.state.get('projectCategory'),
        projectType: this.state.get('projectType'),
        projectInfo: this.state.get('projectInfo'),
        rooms: this.state.get('rooms'),
        designStyle: this.state.get('designStyle'),
        selectedPackage: this.state.get('selectedPackage'),
        budget: this.state.get('budget'),
        budgetType: this.state.get('budgetType')
      };

      const categoryNames = {
        'residential': 'Residential',
        'commercial': 'Commercial',
        'hospitality': 'Hospitality',
        'retail': 'Retail'
      };

      const typeNames = {
        'new_construction': 'New Construction',
        'renovation': 'Renovation',
        'interior_redesign': 'Interior Redesign',
        'partial_upgrade': 'Partial Upgrade'
      };

      const styleNames = {
        'modern': 'Modern',
        'minimalist': 'Minimalist',
        'luxury': 'Luxury',
        'industrial': 'Industrial',
        'japandi': 'Japandi',
        'classic': 'Classic',
        'scandinavian': 'Scandinavian',
        'neo_classical': 'Neo Classical',
        'contemporary': 'Contemporary'
      };

      const packageNames = {
        'basic': 'Basic',
        'standard': 'Standard',
        'premium': 'Premium',
        'luxury_signature': 'Luxury Signature',
        'custom': 'Custom'
      };

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Contact & Review</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Review your selections and provide contact details</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-review-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-8);">
            <div class="estimator-review-summary">
              <h3 style="font-family: var(--font-heading); font-size: var(--font-size-xl); color: var(--color-text-primary); margin-bottom: var(--spacing-6);">Project Summary</h3>
              
              <div class="estimator-summary-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-6); margin-bottom: var(--spacing-4); border: 1px solid rgba(0,0,0,0.08);">
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Project Category</span>
                  <span class="estimator-summary-item__value">${categoryNames[summary.projectCategory] || '-'}</span>
                </div>
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Project Type</span>
                  <span class="estimator-summary-item__value">${typeNames[summary.projectType] || '-'}</span>
                </div>
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Area</span>
                  <span class="estimator-summary-item__value">${summary.projectInfo?.area || 0} sqft</span>
                </div>
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">City</span>
                  <span class="estimator-summary-item__value">${summary.projectInfo?.city || '-'}</span>
                </div>
              </div>

              <div class="estimator-summary-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-6); margin-bottom: var(--spacing-4); border: 1px solid rgba(0,0,0,0.08);">
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Rooms</span>
                  <span class="estimator-summary-item__value">${summary.rooms?.length || 0}</span>
                </div>
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Design Style</span>
                  <span class="estimator-summary-item__value">${styleNames[summary.designStyle] || '-'}</span>
                </div>
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Package</span>
                  <span class="estimator-summary-item__value">${packageNames[summary.selectedPackage] || '-'}</span>
                </div>
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Budget</span>
                  <span class="estimator-summary-item__value">${summary.budgetType === 'unknown' ? 'Unknown' : '₹' + (summary.budget || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div class="estimator-contact-form">
              <h3 style="font-family: var(--font-heading); font-size: var(--font-size-xl); color: var(--color-text-primary); margin-bottom: var(--spacing-6);">Contact Details</h3>
              
              <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08);">
                <div style="margin-bottom: var(--spacing-6);">
                  <label class="estimator-label" for="client-name">Full Name *</label>
                  <input type="text" id="client-name" class="estimator-input" placeholder="Enter your name" value="${clientDetails.name || ''}" aria-required="true">
                </div>
                
                <div style="margin-bottom: var(--spacing-6);">
                  <label class="estimator-label" for="client-phone">Phone Number *</label>
                  <input type="tel" id="client-phone" class="estimator-input" placeholder="Enter your phone number" value="${clientDetails.phone || ''}" aria-required="true">
                </div>
                
                <div style="margin-bottom: var(--spacing-6);">
                  <label class="estimator-label" for="client-email">Email Address *</label>
                  <input type="email" id="client-email" class="estimator-input" placeholder="Enter your email" value="${clientDetails.email || ''}" aria-required="true">
                </div>
                
                <div style="margin-bottom: var(--spacing-6);">
                  <label class="estimator-label" for="client-city">City *</label>
                  <select id="client-city" class="estimator-select" aria-required="true">
                    <option value="">Select city</option>
                    <option value="mumbai" ${clientDetails.city === 'mumbai' ? 'selected' : ''}>Mumbai</option>
                    <option value="delhi" ${clientDetails.city === 'delhi' ? 'selected' : ''}>Delhi</option>
                    <option value="bangalore" ${clientDetails.city === 'bangalore' ? 'selected' : ''}>Bangalore</option>
                    <option value="chennai" ${clientDetails.city === 'chennai' ? 'selected' : ''}>Chennai</option>
                    <option value="hyderabad" ${clientDetails.city === 'hyderabad' ? 'selected' : ''}>Hyderabad</option>
                    <option value="pune" ${clientDetails.city === 'pune' ? 'selected' : ''}>Pune</option>
                    <option value="other" ${clientDetails.city === 'other' ? 'selected' : ''}>Other</option>
                  </select>
                </div>
                
                <div style="margin-bottom: var(--spacing-6);">
                  <label class="estimator-label" for="client-notes">Additional Notes</label>
                  <textarea id="client-notes" class="estimator-textarea" placeholder="Any specific requirements or notes...">${clientDetails.notes || ''}</textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      // Add event listeners
      const inputs = this.elements.stepContainer.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', (e) => this.handleContactDetailChange(e));
        input.addEventListener('change', (e) => this.handleContactDetailChange(e));
      });

      // Validate
      this.validateContactForm();
    }

    /**
     * Handle contact detail change
     */
    handleContactDetailChange(event) {
      const field = event.target.id.replace('client-', '');
      const value = event.target.value;
      
      const clientDetails = this.state.get('clientDetails') || {};
      clientDetails[field] = value;
      this.state.set('clientDetails', clientDetails);
      
      this.validateContactForm();
    }

    /**
     * Validate contact form
     */
    validateContactForm() {
      const clientDetails = this.state.get('clientDetails') || {};
      const isValid = clientDetails.name && clientDetails.phone && clientDetails.email && clientDetails.city;
      
      this.state.set('canProceed', isValid);
    }

    /**
     * Show loading state
     */
    showLoading() {
      this.elements.loading.hidden = false;
      this.elements.main.hidden = true;
    }

    /**
     * Hide loading state
     */
    hideLoading() {
      this.elements.loading.hidden = true;
      this.elements.main.hidden = false;
    }

    /**
     * Show alert
     * @param {string} message - Alert message
     * @param {string} type - Alert type
     */
    showAlert(message, type = 'info') {
      const alert = document.createElement('div');
      alert.className = `estimator-alert estimator-alert--${type}`;
      alert.textContent = message;
      
      this.elements.stepContainer.insertBefore(alert, this.elements.stepContainer.firstChild);
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        alert.classList.add('estimator-alert--exiting');
        setTimeout(() => alert.remove(), 300);
      }, 5000);
    }

    /**
     * Clear alerts
     */
    clearAlerts() {
      const alerts = this.elements.stepContainer.querySelectorAll('.estimator-alert');
      alerts.forEach(alert => alert.remove());
    }

    /**
     * Show summary view
     */
    showSummary() {
      this.elements.wizard.hidden = true;
      this.elements.summary.hidden = false;
    }

    /**
     * Hide summary view
     */
    hideSummary() {
      this.elements.wizard.hidden = false;
      this.elements.summary.hidden = true;
    }

    /**
     * Reset UI
     */
    reset() {
      this.hideSummary();
      this.renderStep(1);
      this.renderProgress();
    }
  }

  // Export for use in other modules
  window.EstimatorUI = UIManager;

})();
