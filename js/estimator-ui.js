/**
 * Estimator UI Manager
 * 
 * UI management for estimator module.
 * Handles DOM manipulation, event handling, and UI rendering.
 */

(function() {
  'use strict';

  class UIManager {
    constructor(stateManager, router) {
      this.state = stateManager;
      this.router = router;
      this.elements = {};
      this.handlers = {};
      this.currentRenderedStep = null;
    }

    init() {
      this.cacheElements();
      this.bindEvents();
      this.renderLanding();
      this.hideLoading();
    }

    cacheElements() {
      this.elements = {
        app: document.getElementById('estimator-app'),
        loading: document.getElementById('estimator-loading'),
        main: document.getElementById('estimator-main'),
        landing: document.getElementById('estimator-landing'),
        landingContinue: document.getElementById('estimator-landing-continue'),
        wizard: document.getElementById('estimator-wizard'),
        stepper: document.getElementById('estimator-stepper'),
        progress: document.getElementById('estimator-progress'),
        stepContainer: document.getElementById('estimator-step-container'),
        navigation: document.getElementById('estimator-navigation'),
        prevButton: document.getElementById('estimator-prev'),
        nextButton: document.getElementById('estimator-next'),
        summary: document.getElementById('estimator-summary')
      };
    }

    bindEvents() {
      this.elements.prevButton.addEventListener('click', () => this.handlePrevious());
      this.elements.nextButton.addEventListener('click', () => this.handleNext());
      this.elements.landingContinue.addEventListener('click', () => this.handleLandingContinue());
      this.state.subscribe((state) => this.handleStateChange(state));
    }

    handleStateChange(state) {
      this.updateNavigationButtons(state);
      this.updateProgress(state);

      if (state.currentStep && this.currentRenderedStep !== state.currentStep) {
        this.renderStep(state.currentStep);
      }
    }

    /**
     * Render Premium Landing Page
     */
    renderLanding() {
      this.elements.landing.hidden = false;
      this.elements.main.hidden = true;

      const cards = this.elements.landing.querySelectorAll('.estimator-landing__card');
      cards.forEach(card => {
        card.addEventListener('click', (e) => this.handleLandingCardSelection(e));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleLandingCardSelection(e);
          }
        });
      });
    }

    handleLandingCardSelection(event) {
      const card = event.currentTarget;
      const categoryId = card.dataset.category;

      this.state.set('projectCategory', categoryId);

      this.elements.landing.querySelectorAll('.estimator-landing__card').forEach(c => {
        c.classList.remove('estimator-landing__card--selected');
      });
      card.classList.add('estimator-landing__card--selected');

      this.elements.landingContinue.disabled = false;
    }

    handleLandingContinue() {
      this.elements.landing.hidden = true;
      this.elements.main.hidden = false;
      this.renderProgress();
      this.renderStep(1);
    }

    handlePrevious() {
      this.router.previous();
    }

    async handleNext() {
      const isFinalStep = this.elements.nextButton.textContent === 'Complete';

      if (isFinalStep) {
        console.log("Completion triggered! Processing BOQ...");
        
        const loadingScreen = document.getElementById('estimator-loading');
        if (loadingScreen) {
            const loadingText = loadingScreen.querySelector('.estimator-loading__text');
            if(loadingText) loadingText.textContent = 'Generating your BOQ...';
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '1';
        }

        try {
            if (window.EstimatorApp && typeof window.EstimatorApp.generateBOQ === 'function') {
                const success = await window.EstimatorApp.generateBOQ();
                if (!success) console.warn("PDF generation returned false, check if estimator-engine.js is fully loaded.");
            } else {
                console.warn("EstimatorApp.generateBOQ not found. Skipping PDF generation.");
            }
        } catch(error) {
            console.error("BOQ Generation failed:", error);
        } finally {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
            }
            this.showSummary();
        }
      } else {
        this.router.next();
      }
    }

    updateNavigationButtons(state) {
      this.elements.prevButton.disabled = !state.canGoBack;
      this.elements.nextButton.disabled = !state.canProceed;
      
      // Update next button text for final step dynamically based on router's total steps
      if (state.currentStep === state.totalSteps || state.currentStep === this.router.totalSteps) {
        this.elements.nextButton.textContent = 'Complete';
      } else {
        this.elements.nextButton.textContent = 'Next';
      }
    }

    renderProgress(state) {
      const steps = (typeof this.router.getAllSteps === 'function') ? this.router.getAllSteps() : [];
      const currentStep = state ? state.currentStep : (this.router.currentStep || 1);

      // Premium stepper with step names
      const stepNames = ['Project', 'Details', 'Furniture', 'Style', 'Services', 'Budget', 'BOQ'];
      const totalStepsToRender = steps.length > 0 ? steps.length : 7;

      let html = '<div class="estimator-stepper__container">';

      for (let index = 0; index < totalStepsToRender; index++) {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        const isFuture = stepNumber > currentStep;
        const title = stepNames[index] || `Step ${stepNumber}`;

        let statusClass = '';
        if (isCompleted) statusClass = 'estimator-stepper__step--completed';
        if (isActive) statusClass = 'estimator-stepper__step--active';
        if (isFuture) statusClass = 'estimator-stepper__step--future';

        html += `
          <div class="estimator-stepper__step ${statusClass}">
            <div class="estimator-stepper__indicator">
              ${isCompleted ? '✓' : stepNumber}
            </div>
            <span class="estimator-stepper__label">${title}</span>
          </div>
        `;

        // Add arrow between steps (except after last step)
        if (index < totalStepsToRender - 1) {
          const arrowClass = isActive ? 'estimator-stepper__arrow--active' : '';
          html += `<div class="estimator-stepper__arrow ${arrowClass}">→</div>`;
        }
      }

      html += '</div>';
      this.elements.stepper.innerHTML = html;
    }

    updateProgress(state) {
      this.renderProgress(state);
    }

    renderStep(stepId) {
      this.currentRenderedStep = stepId;
      
      this.elements.stepContainer.classList.add('estimator-step--exiting');
      
      setTimeout(() => {
        this.elements.stepContainer.innerHTML = '';
        this.elements.stepContainer.classList.remove('estimator-step--exiting');
        this.elements.stepContainer.classList.add('estimator-step--entering');
        
        this.renderStepContent(stepId);
        
        setTimeout(() => {
          this.elements.stepContainer.classList.remove('estimator-step--entering');
        }, 400);
      }, 300);
    }

    /**
     * DYNAMIC STEP RENDERING
     */
    renderStepContent(stepId) {
      // GUARD CLAUSE: Prevent crash if stepId is somehow undefined or null during transition
      if (stepId === undefined || stepId === null) {
        console.warn('UI Manager: renderStepContent called with undefined stepId');
        return;
      }

      // Allow router to send string IDs for dynamic routing, fallback to numbers for legacy
      const stepMapper = typeof stepId === 'object' ? stepId.id : stepId.toString();

      switch (stepMapper) {
        case '1':
        case 'category':
          this.renderProjectTypeStep(); break;

        // RESIDENTIAL FLOW
        case '2':
        case 'type':
          this.renderBasicDetailsStep(); break;
        case '3':
        case 'info':
          this.renderFurnitureSelectionStep(); break;
        case '4':
        case 'requirements':
          this.renderDesignStyleStep(); break;
        case '5':
        case 'style':
          this.renderOptionalServicesStep(); break;
        case '6':
        case 'package':
          this.renderBudgetStep(); break;

        // CUSTOM SERVICES FLOW
        case 'custom_services_selection':
          this.renderCustomServicesStep(); break;

        // SHARED FINAL STEPS
        case '7':
        case 'budget':
          this.renderReviewStep(); break;
        case '8':
        case 'contact':
          this.renderSummaryStep(); break;

        default:
          this.elements.stepContainer.innerHTML = '<div style="text-align: center; padding: 40px;"><h2>Loading...</h2></div>';
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
        { id: 'retail', name: 'Retail', icon: '🛍️', description: 'Showrooms, boutiques, and shopping experiences' },
        { id: 'custom_services', name: 'A La Carte / Custom', icon: '🛠️', description: 'Select specific services like Kitchen, Wardrobes, Ceiling, Wall Paneling, etc.' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Select Project Category</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Choose the type of space or service you need</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-card-grid estimator-card-grid--3">
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

    handleCategorySelection(event) {
      const card = event.currentTarget;
      const categoryId = card.dataset.category;
      
      this.state.set('projectCategory', categoryId);
      
      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(c => {
        c.classList.remove('estimator-card--selected');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('estimator-card--selected');
      card.setAttribute('aria-pressed', 'true');
      
      this.state.set('canProceed', true);
    }

    /**
     * Render Custom Services Selection Step
     */
    renderCustomServicesStep() {
      const selectedServices = this.state.get('selectedCustomServices') || [];
      
      const services = [
        { id: 'modular_kitchen', name: 'Modular Kitchen', icon: '🍳', desc: 'Custom cabinets, countertops, and layouts' },
        { id: 'wardrobe', name: 'Wardrobes & Storage', icon: '🚪', desc: 'Sliding, walk-in, and custom storage' },
        { id: 'false_ceiling', name: 'False Ceiling', icon: '✨', desc: 'POP, Gypsum, and cove lighting designs' },
        { id: 'wall_paneling', name: 'Wall Paneling & Paint', icon: '🎨', desc: 'Louvers, fluted panels, and premium paint' },
        { id: 'flooring', name: 'Flooring', icon: '🪵', desc: 'Tiles, wooden flooring, and marble' },
        { id: 'plumbing_electrical', name: 'Plumbing & Electrical', icon: '⚡', desc: 'Wiring, fixtures, and piping work' },
        { id: 'custom_furniture', name: 'Custom Furniture', icon: '🛋️', desc: 'Bespoke beds, sofas, and dining sets' },
        { id: 'glass_partition', name: 'Partitions & Glass Work', icon: '🪟', desc: 'Space dividers, shower cubicles, and mirrors' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Select Services</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Choose all the specific interior works you require (Select multiple)</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-card-grid estimator-card-grid--3">
      `;

      services.forEach(service => {
        const isSelected = selectedServices.includes(service.id);
        
        html += `
          <div class="estimator-card ${isSelected ? 'estimator-card--selected' : ''}" 
               data-service="${service.id}" 
               role="button" 
               tabindex="0"
               style="position: relative; cursor: pointer;"
               aria-label="Select ${service.name} service"
               aria-pressed="${isSelected}">
            ${isSelected ? '<div style="position: absolute; top: 16px; right: 16px; background: var(--color-champagne-500); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px;">✓</div>' : ''}
            <div class="estimator-card__icon">
              <span style="font-size: 32px;">${service.icon}</span>
            </div>
            <h3 class="estimator-card__title">${service.name}</h3>
            <p class="estimator-card__description">${service.desc}</p>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(card => {
        card.addEventListener('click', (e) => this.handleCustomServiceSelection(e));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleCustomServiceSelection(e);
          }
        });
      });

      this.state.set('canProceed', selectedServices.length > 0);
    }

    handleCustomServiceSelection(event) {
      const card = event.currentTarget;
      const serviceId = card.dataset.service;
      
      let selectedServices = this.state.get('selectedCustomServices') || [];
      
      if (selectedServices.includes(serviceId)) {
        selectedServices = selectedServices.filter(id => id !== serviceId);
      } else {
        selectedServices.push(serviceId);
      }
      
      this.state.set('selectedCustomServices', selectedServices);
      this.renderCustomServicesStep();
    }

    /**
     * Render Step 2 - Project Type
     */
    renderBudgetStep() {
      const projectTypes = [
        { id: 'new_construction', name: 'New Construction', description: 'Complete interior design for newly built spaces', features: ['Full space planning', 'Complete furnishing', 'Custom design elements'], icon: '🏗️' },
        { id: 'renovation', name: 'Renovation', description: 'Transform existing spaces with modern design', features: ['Space optimization', 'Modern upgrades', 'Structural modifications'], icon: '🔧' },
        { id: 'interior_redesign', name: 'Interior Redesign', description: 'Refresh your space with new aesthetics', features: ['Style refresh', 'Furniture updates', 'Decor enhancements'], icon: '🎨' },
        { id: 'partial_upgrade', name: 'Partial Upgrade', description: 'Focus on specific areas or rooms', features: ['Room-specific design', 'Budget-friendly', 'Flexible scope'], icon: '📐' }
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

    handleProjectTypeSelection(event) {
      const card = event.currentTarget;
      const typeId = card.dataset.type;
      
      this.state.set('projectType', typeId);
      this.renderBudgetStep();
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
                <option value="bhimtal" ${projectInfo.city === 'bhimtal' ? 'selected' : ''}>Bhimtal</option>
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

      const inputs = this.elements.stepContainer.querySelectorAll('input, select');
      inputs.forEach(input => {
        input.addEventListener('input', (e) => this.handleProjectInfoChange(e));
        input.addEventListener('change', (e) => this.handleProjectInfoChange(e));
      });

      this.validateProjectInfo();
    }

    handleProjectInfoChange(event) {
      const field = event.target.id;
      const value = event.target.value;
      
      const projectInfo = this.state.get('projectInfo') || {};
      projectInfo[field] = value;
      this.state.set('projectInfo', projectInfo);
      
      this.validateProjectInfo();
    }

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

      const addBtn = this.elements.stepContainer.querySelector('.estimator-add-room-btn');
      addBtn.addEventListener('click', () => this.showAddRoomModal());

      this.elements.stepContainer.querySelectorAll('.estimator-room-card__duplicate').forEach(btn => {
        btn.addEventListener('click', (e) => this.duplicateRoom(e));
      });

      this.elements.stepContainer.querySelectorAll('.estimator-room-card__delete').forEach(btn => {
        btn.addEventListener('click', (e) => this.deleteRoom(e));
      });

      this.state.set('canProceed', rooms.length > 0);
    }

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

    duplicateRoom(event) {
      const index = parseInt(event.target.dataset.index);
      const rooms = this.state.get('rooms') || [];
      const roomToDuplicate = { ...rooms[index], id: Date.now().toString() };
      rooms.splice(index + 1, 0, roomToDuplicate);
      this.state.set('rooms', rooms);
      this.renderModulesStep();
    }

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
        { id: 'modern', name: 'Modern', description: 'Clean lines, neutral colors, functional design', colorPalette: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#333333'], icon: '🏢' },
        { id: 'minimalist', name: 'Minimalist', description: 'Simplicity, clean aesthetics, essential elements', colorPalette: ['#FAFAFA', '#F0F0F0', '#E8E8E8', '#2C2C2C'], icon: '⬜' },
        { id: 'luxury', name: 'Luxury', description: 'Premium materials, elegant finishes, sophisticated', colorPalette: ['#1C1C1C', '#C4A074', '#D4AF37', '#FFFFFF'], icon: '✨' },
        { id: 'industrial', name: 'Industrial', description: 'Raw materials, exposed elements, urban aesthetic', colorPalette: ['#4A4A4A', '#8B7355', '#B8860B', '#D3D3D3'], icon: '🏭' },
        { id: 'japandi', name: 'Japandi', description: 'Japanese minimalism meets Scandinavian warmth', colorPalette: ['#F5F5DC', '#D2B48C', '#8B4513', '#FAF0E6'], icon: '🎋' },
        { id: 'classic', name: 'Classic', description: 'Timeless elegance, traditional elements, refined', colorPalette: ['#FFF8DC', '#DEB887', '#8B4513', '#F5F5DC'], icon: '🏛️' },
        { id: 'scandinavian', name: 'Scandinavian', description: 'Light, airy, natural materials, cozy warmth', colorPalette: ['#F5F5DC', '#E0E0E0', '#87CEEB', '#FFFFFF'], icon: '❄️' },
        { id: 'neo_classical', name: 'Neo Classical', description: 'Modern interpretation of classical elements', colorPalette: ['#FFFDD0', '#C0C0C0', '#DAA520', '#FAFAD2'], icon: '🏛️' },
        { id: 'contemporary', name: 'Contemporary', description: 'Current trends, flexible, adaptable design', colorPalette: ['#E8E8E8', '#A9A9A9', '#696969', '#2F4F4F'], icon: '🎨' }
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

    handleDesignStyleSelection(event) {
      const card = event.currentTarget;
      const styleId = card.dataset.style;
      
      this.state.set('designStyle', styleId);
      
      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(c => {
        c.classList.remove('estimator-card--selected');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('estimator-card--selected');
      card.setAttribute('aria-pressed', 'true');
      
      this.state.set('canProceed', true);
    }

    /**
     * Render Step 6 - Package Selection
     */
    renderDetailsStep() {
      const packages = [
        { id: 'basic', name: 'Basic', tier: 'essential', description: 'Essential interior design for budget-conscious projects', timeline: '15-30 days', features: ['Basic design consultation', 'Material selection', 'Standard installation'], inclusions: ['2 design revisions', 'Standard materials', 'Basic lighting'], exclusions: ['Custom furniture', 'Premium materials', 'Smart home integration'], popular: false },
        { id: 'standard', name: 'Standard', tier: 'premium', description: 'Comprehensive design with quality materials', timeline: '30-45 days', features: ['Full design planning', 'Premium materials', 'Professional installation'], inclusions: ['4 design revisions', 'Premium materials', 'Advanced lighting', 'Custom cabinetry'], exclusions: ['Smart home integration', 'Premium furniture'], popular: true },
        { id: 'premium', name: 'Premium', tier: 'luxury', description: 'Luxury design with premium finishes and custom elements', timeline: '45-60 days', features: ['Bespoke design', 'Luxury materials', 'White-glove installation'], inclusions: ['Unlimited revisions', 'Luxury materials', 'Smart lighting', 'Custom furniture', 'Home automation'], exclusions: ['Architectural modifications'], popular: false },
        { id: 'luxury_signature', name: 'Luxury Signature', tier: 'elite', description: 'Ultra-premium design with exclusive materials and services', timeline: '60-90 days', features: ['Exclusive design', 'Imported materials', 'Concierge service'], inclusions: ['Unlimited revisions', 'Imported materials', 'Smart home integration', 'Custom furniture', 'Project management', 'Post-installation support'], exclusions: ['Structural changes'], popular: false },
        { id: 'custom', name: 'Custom', tier: 'elite', description: 'Fully customized solution tailored to your needs', timeline: 'Based on scope', features: ['Personalized design', 'Flexible scope', 'Dedicated team'], inclusions: ['Custom scope', 'Dedicated designer', 'Priority scheduling'], exclusions: ['None - fully customizable'], popular: false }
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

    handlePackageSelection(event) {
      const card = event.currentTarget;
      const packageId = card.dataset.package;
      
      this.state.set('selectedPackage', packageId);
      this.renderDetailsStep();
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
      
      const summary = {
        projectCategory: this.state.get('projectCategory'),
        projectType: this.state.get('projectType'),
        projectInfo: this.state.get('projectInfo'),
        rooms: this.state.get('rooms'),
        designStyle: this.state.get('designStyle'),
        selectedPackage: this.state.get('selectedPackage'),
        budget: this.state.get('budget'),
        budgetType: this.state.get('budgetType'),
        customServices: this.state.get('selectedCustomServices') 
      };

      const categoryNames = {
        'residential': 'Residential',
        'commercial': 'Commercial',
        'hospitality': 'Hospitality',
        'retail': 'Retail',
        'custom_services': 'A La Carte / Custom Services'
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
                  <span class="estimator-summary-item__value" style="font-weight:bold; color:var(--color-champagne-600);">${categoryNames[summary.projectCategory] || '-'}</span>
                </div>
                
                ${summary.projectCategory === 'custom_services' ? `
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Selected Services</span>
                  <span class="estimator-summary-item__value">${summary.customServices ? summary.customServices.length : 0} Services Selected</span>
                </div>
                ` : `
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Area</span>
                  <span class="estimator-summary-item__value">${summary.projectInfo?.area || 0} sqft</span>
                </div>
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Rooms</span>
                  <span class="estimator-summary-item__value">${summary.rooms?.length || 0}</span>
                </div>
                `}
                
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

      const inputs = this.elements.stepContainer.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', (e) => this.handleContactDetailChange(e));
        input.addEventListener('change', (e) => this.handleContactDetailChange(e));
      });

      this.validateContactForm();
    }

    handleContactDetailChange(event) {
      const field = event.target.id.replace('client-', '');
      const value = event.target.value;
      
      const clientDetails = this.state.get('clientDetails') || {};
      clientDetails[field] = value;
      this.state.set('clientDetails', clientDetails);
      
      this.validateContactForm();
    }

    validateContactForm() {
      const clientDetails = this.state.get('clientDetails') || {};
      const isValid = clientDetails.name && clientDetails.phone && clientDetails.email && clientDetails.city;
      
      this.state.set('canProceed', isValid);
    }

    /**
     * Render Step 1 - Project Type (Residential Flow)
     */
    renderProjectTypeStep() {
      const projectTypes = [
        { id: 'apartment', name: 'Apartment', icon: '🏢', description: 'Modern apartment living with smart space optimization' },
        { id: 'villa', name: 'Villa', icon: '🏠', description: 'Luxury independent villa with premium amenities' },
        { id: 'independent_house', name: 'Independent House', icon: '🏡', description: 'Standalone house with complete design freedom' },
        { id: 'duplex', name: 'Duplex', icon: '🏘️', description: 'Two-story connected living spaces' },
        { id: 'penthouse', name: 'Penthouse', icon: '🌆', description: 'Top-floor luxury with panoramic views' },
        { id: 'farmhouse', name: 'Farmhouse', icon: '🌾', description: 'Rural retreat with rustic charm' },
        { id: 'holiday_home', name: 'Holiday Home', icon: '🏖️', description: 'Vacation property for relaxation' },
        { id: 'builder_floor', name: 'Builder Floor', icon: '🏗️', description: 'Independent floor in multi-story building' },
        { id: 'studio_apartment', name: 'Studio Apartment', icon: '🎨', description: 'Compact living with smart design solutions' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title">Select Project Type</h2>
          <p class="estimator-step__description">Choose the type of residential property</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-card-grid estimator-card-grid--3">
      `;

      projectTypes.forEach(type => {
        const isSelected = this.state.get('projectType') === type.id;
        html += `
          <div class="estimator-card ${isSelected ? 'estimator-card--selected' : ''}"
               data-type="${type.id}"
               role="button"
               tabindex="0"
               aria-label="Select ${type.name}"
               aria-pressed="${isSelected}">
            <div class="estimator-card__icon">
              <span style="font-size: 40px;">${type.icon}</span>
            </div>
            <h3 class="estimator-card__title">${type.name}</h3>
            <p class="estimator-card__description">${type.description}</p>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

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

    handleProjectTypeSelection(event) {
      const card = event.currentTarget;
      const typeId = card.dataset.type;

      this.state.set('projectType', typeId);

      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(c => {
        c.classList.remove('estimator-card--selected');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('estimator-card--selected');
      card.setAttribute('aria-pressed', 'true');

      this.state.set('canProceed', true);
    }

    /**
     * Render Step 2 - Basic Details
     */
    renderBasicDetailsStep() {
      const projectInfo = this.state.get('projectInfo') || {};

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title">Basic Details</h2>
          <p class="estimator-step__description">Tell us about your space</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-form">
            <div class="estimator-form__group">
              <input type="text" id="city" class="estimator-form__input" placeholder=" " value="${projectInfo.city || ''}" aria-required="true">
              <label class="estimator-form__label" for="city">City</label>
            </div>

            <div class="estimator-form__row">
              <div class="estimator-form__group">
                <input type="number" id="carpetArea" class="estimator-form__input" placeholder=" " value="${projectInfo.carpetArea || ''}" aria-required="true">
                <label class="estimator-form__label" for="carpetArea">Carpet Area (sqft)</label>
              </div>
              <div class="estimator-form__group">
                <input type="number" id="builtUpArea" class="estimator-form__input" placeholder=" " value="${projectInfo.builtUpArea || ''}">
                <label class="estimator-form__label" for="builtUpArea">Built-up Area (sqft)</label>
              </div>
            </div>

            <div class="estimator-form__row">
              <div class="estimator-form__group">
                <input type="number" id="floors" class="estimator-form__input" placeholder=" " value="${projectInfo.floors || ''}">
                <label class="estimator-form__label" for="floors">Number of Floors</label>
              </div>
              <div class="estimator-form__group">
                <input type="number" id="bedrooms" class="estimator-form__input" placeholder=" " value="${projectInfo.bedrooms || ''}" aria-required="true">
                <label class="estimator-form__label" for="bedrooms">Bedrooms</label>
              </div>
            </div>

            <div class="estimator-form__row">
              <div class="estimator-form__group">
                <input type="number" id="bathrooms" class="estimator-form__input" placeholder=" " value="${projectInfo.bathrooms || ''}">
                <label class="estimator-form__label" for="bathrooms">Bathrooms</label>
              </div>
              <div class="estimator-form__group">
                <input type="number" id="balconies" class="estimator-form__input" placeholder=" " value="${projectInfo.balconies || ''}">
                <label class="estimator-form__label" for="balconies">Balconies</label>
              </div>
            </div>
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      const inputs = this.elements.stepContainer.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('input', (e) => this.handleBasicDetailsChange(e));
      });

      this.validateBasicDetails();
    }

    handleBasicDetailsChange(event) {
      const field = event.target.id;
      const value = event.target.value;

      const projectInfo = this.state.get('projectInfo') || {};
      projectInfo[field] = value;
      this.state.set('projectInfo', projectInfo);

      this.validateBasicDetails();
    }

    validateBasicDetails() {
      const projectInfo = this.state.get('projectInfo') || {};
      const isValid = projectInfo.city && projectInfo.carpetArea && projectInfo.bedrooms;
      this.state.set('canProceed', isValid);
    }

    /**
     * Render Step 3 - Furniture Selection
     */
    renderFurnitureSelectionStep() {
      const projectInfo = this.state.get('projectInfo') || {};
      const bedroomCount = parseInt(projectInfo.bedrooms) || 2;
      const selectedFurniture = this.state.get('selectedFurniture') || {};

      const roomTypes = [
        {
          id: 'living_room',
          name: 'Living Room',
          items: [
            { id: 'sofa', name: 'Sofa Set', optional: false },
            { id: 'coffee_table', name: 'Coffee Table', optional: false },
            { id: 'tv_unit', name: 'TV Unit', optional: true },
            { id: 'display_units', name: 'Display Units', optional: true }
          ]
        },
        {
          id: 'dining',
          name: 'Dining',
          items: [
            { id: 'dining_table', name: 'Dining Table', optional: false },
            { id: 'sideboard', name: 'Sideboard', optional: true }
          ]
        },
        {
          id: 'kitchen',
          name: 'Kitchen',
          items: [
            { id: 'modular_kitchen', name: 'Modular Kitchen', optional: false },
            { id: 'chimney', name: 'Chimney', optional: true },
            { id: 'dishwasher', name: 'Dishwasher', optional: true }
          ]
        },
        {
          id: 'master_bedroom',
          name: 'Master Bedroom',
          items: [
            { id: 'bed', name: 'Bed', optional: false },
            { id: 'wardrobe', name: 'Wardrobe', optional: false },
            { id: 'nightstands', name: 'Nightstands', optional: true },
            { id: 'dresser', name: 'Dresser', optional: true }
          ]
        }
      ];

      // Add additional bedrooms based on count
      for (let i = 2; i <= bedroomCount; i++) {
        roomTypes.push({
          id: `bedroom_${i}`,
          name: `Bedroom ${i}`,
          items: [
            { id: `bed_${i}`, name: 'Bed', optional: false },
            { id: `wardrobe_${i}`, name: 'Wardrobe', optional: false },
            { id: `study_table_${i}`, name: 'Study Table', optional: true }
          ]
        });
      }

      roomTypes.push(
        { id: 'bathroom', name: 'Bathroom', items: [{ id: 'vanity', name: 'Vanity', optional: false }] },
        { id: 'study', name: 'Study', items: [{ id: 'study_table', name: 'Study Table', optional: true }] },
        { id: 'balcony', name: 'Balcony', items: [{ id: 'seating', name: 'Seating', optional: true }] },
        { id: 'store', name: 'Store Room', items: [{ id: 'shelves', name: 'Shelves', optional: true }] }
      );

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title">Furniture Selection</h2>
          <p class="estimator-step__description">Select furniture for each room</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-furniture">
      `;

      roomTypes.forEach(room => {
        html += `
          <div class="estimator-furniture__room">
            <h3 class="estimator-furniture__room-title">${room.name}</h3>
            <div class="estimator-furniture__items">
        `;

        room.items.forEach(item => {
          const itemKey = `${room.id}_${item.id}`;
          const isSelected = selectedFurniture[itemKey]?.selected || false;
          const quantity = selectedFurniture[itemKey]?.quantity || 1;

          html += `
            <div class="estimator-furniture__item">
              <div class="estimator-furniture__item-info">
                <span class="estimator-furniture__item-name">${item.name}</span>
                ${item.optional ? '<span class="estimator-furniture__item-optional">(Optional)</span>' : ''}
              </div>
              <div class="estimator-furniture__item-controls">
                <div class="estimator-toggle ${isSelected ? 'estimator-toggle--active' : ''}" data-item="${itemKey}" role="button" tabindex="0" aria-label="Toggle ${item.name}">
                  <div class="estimator-toggle__slider"></div>
                </div>
                ${isSelected ? `
                  <div class="estimator-quantity">
                    <button class="estimator-quantity__button" data-action="decrease" data-item="${itemKey}">−</button>
                    <span class="estimator-quantity__value">${quantity}</span>
                    <button class="estimator-quantity__button" data-action="increase" data-item="${itemKey}">+</button>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      // Bind toggle events
      this.elements.stepContainer.querySelectorAll('.estimator-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => this.handleFurnitureToggle(e));
        toggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleFurnitureToggle(e);
          }
        });
      });

      // Bind quantity events
      this.elements.stepContainer.querySelectorAll('.estimator-quantity__button').forEach(button => {
        button.addEventListener('click', (e) => this.handleQuantityChange(e));
      });

      this.validateFurnitureSelection();
    }

    handleFurnitureToggle(event) {
      const toggle = event.currentTarget;
      const itemKey = toggle.dataset.item;

      const selectedFurniture = this.state.get('selectedFurniture') || {};
      if (!selectedFurniture[itemKey]) {
        selectedFurniture[itemKey] = { selected: false, quantity: 1 };
      }

      selectedFurniture[itemKey].selected = !selectedFurniture[itemKey].selected;
      this.state.set('selectedFurniture', selectedFurniture);

      this.renderFurnitureSelectionStep();
    }

    handleQuantityChange(event) {
      const button = event.currentTarget;
      const action = button.dataset.action;
      const itemKey = button.dataset.item;

      const selectedFurniture = this.state.get('selectedFurniture') || {};
      if (selectedFurniture[itemKey]) {
        if (action === 'increase') {
          selectedFurniture[itemKey].quantity++;
        } else if (action === 'decrease' && selectedFurniture[itemKey].quantity > 1) {
          selectedFurniture[itemKey].quantity--;
        }
        this.state.set('selectedFurniture', selectedFurniture);
        this.renderFurnitureSelectionStep();
      }
    }

    validateFurnitureSelection() {
      const selectedFurniture = this.state.get('selectedFurniture') || {};
      const hasSelection = Object.values(selectedFurniture).some(item => item.selected);
      this.state.set('canProceed', hasSelection);
    }

    /**
     * Render Step 4 - Design Style
     */
    renderDesignStyleStep() {
      const selectedStyle = this.state.get('designStyle');

      const styles = [
        { id: 'modern', name: 'Modern', icon: '🏢', description: 'Clean lines, minimal clutter, neutral colors', colors: ['#E5E5E5', '#808080', '#2C2C2C'], luxury: 'High', maintenance: 'Low', cost: 'Premium' },
        { id: 'contemporary', name: 'Contemporary', icon: '🎨', description: 'Current trends, curved lines, mixed materials', colors: ['#F5F5DC', '#D2691E', '#4A4A4A'], luxury: 'High', maintenance: 'Medium', cost: 'Premium' },
        { id: 'minimalist', name: 'Minimalist', icon: '⬜', description: 'Less is more, functional, monochromatic', colors: ['#FFFFFF', '#F0F0F0', '#333333'], luxury: 'Medium', maintenance: 'Low', cost: 'Standard' },
        { id: 'scandinavian', name: 'Scandinavian', icon: '❄️', description: 'Cozy, natural materials, light colors', colors: ['#FEFEFE', '#E8E8E8', '#8B7355'], luxury: 'Medium', maintenance: 'Low', cost: 'Standard' },
        { id: 'japandi', name: 'Japandi', icon: '🎋', description: 'Japanese minimalism meets Scandinavian cozy', colors: ['#F5F5F0', '#D4C4A8', '#4A4A4A'], luxury: 'High', maintenance: 'Low', cost: 'Premium' },
        { id: 'industrial', name: 'Industrial', icon: '🏭', description: 'Raw materials, exposed elements, bold', colors: ['#696969', '#2F4F4F', '#1C1C1C'], luxury: 'Medium', maintenance: 'Medium', cost: 'Standard' },
        { id: 'luxury_modern', name: 'Luxury Modern', icon: '✨', description: 'High-end materials, statement pieces', colors: ['#FFD700', '#1A1A1A', '#FFFFFF'], luxury: 'Ultra', maintenance: 'Medium', cost: 'Ultra Luxury' },
        { id: 'classic_luxury', name: 'Classic Luxury', icon: '👑', description: 'Timeless elegance, rich materials', colors: ['#8B4513', '#DAA520', '#2F2F2F'], luxury: 'Ultra', maintenance: 'High', cost: 'Ultra Luxury' },
        { id: 'traditional_indian', name: 'Traditional Indian', icon: '🪷', description: 'Heritage patterns, warm colors, craftsmanship', colors: ['#FF6347', '#FFD700', '#8B0000'], luxury: 'High', maintenance: 'High', cost: 'Luxury' },
        { id: 'rajputana', name: 'Rajputana Heritage', icon: '🏰', description: 'Royal Rajasthani elegance, intricate details', colors: ['#B8860B', '#800020', '#F5DEB3'], luxury: 'Ultra', maintenance: 'High', cost: 'Ultra Luxury' },
        { id: 'chettinad', name: 'Chettinad', icon: '🕌', description: 'South Indian heritage, bold patterns', colors: ['#A0522D', '#D2691E', '#FAEBD7'], luxury: 'High', maintenance: 'High', cost: 'Luxury' },
        { id: 'modern_indian_fusion', name: 'Modern Indian Fusion', icon: '🇮🇳', description: 'Traditional meets contemporary', colors: ['#FF7F50', '#F0E68C', '#2E8B57'], luxury: 'High', maintenance: 'Medium', cost: 'Premium' },
        { id: 'minimalist_indian', name: 'Minimalist Indian', icon: '🪔', description: 'Subtle Indian elements, clean design', colors: ['#FAF9F6', '#D2B48C', '#4A4A4A'], luxury: 'Medium', maintenance: 'Low', cost: 'Standard' },
        { id: 'indian_colonial', name: 'Indian Colonial', icon: '🏛️', description: 'British colonial influence with Indian touch', colors: ['#DEB887', '#8B4513', '#F5F5DC'], luxury: 'High', maintenance: 'Medium', cost: 'Premium' },
        { id: 'desi_bohemian', name: 'Desi Bohemian', icon: '🎭', description: 'Eclectic, colorful, free-spirited', colors: ['#FF69B4', '#FFD700', '#9370DB'], luxury: 'Medium', maintenance: 'Medium', cost: 'Standard' },
        { id: 'rustic_indian', name: 'Rustic Indian', icon: '🪵', description: 'Natural materials, earthy tones', colors: ['#8B7355', '#A0522D', '#F5DEB3'], luxury: 'Medium', maintenance: 'Medium', cost: 'Standard' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title">Design Style</h2>
          <p class="estimator-step__description">Choose your preferred design aesthetic</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-card-grid estimator-card-grid--4">
      `;

      styles.forEach(style => {
        const isSelected = selectedStyle === style.id;
        html += `
          <div class="estimator-style-card ${isSelected ? 'estimator-style-card--selected' : ''}" data-style="${style.id}" role="button" tabindex="0" aria-label="Select ${style.name} style">
            <div class="estimator-style-card__image">
              <span>${style.icon}</span>
            </div>
            <div class="estimator-style-card__content">
              <h3 class="estimator-style-card__title">${style.name}</h3>
              <p class="estimator-style-card__description">${style.description}</p>
              <div class="estimator-style-card__palette">
                ${style.colors.map(color => `<div class="estimator-style-card__color" style="background: ${color};"></div>`).join('')}
              </div>
              <div class="estimator-style-card__meta">
                <span class="estimator-style-card__badge">${style.luxury}</span>
                <span>${style.maintenance} Maintenance</span>
              </div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      this.elements.stepContainer.querySelectorAll('.estimator-style-card').forEach(card => {
        card.addEventListener('click', (e) => this.handleStyleSelection(e));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleStyleSelection(e);
          }
        });
      });
    }

    handleStyleSelection(event) {
      const card = event.currentTarget;
      const styleId = card.dataset.style;

      this.state.set('designStyle', styleId);

      this.elements.stepContainer.querySelectorAll('.estimator-style-card').forEach(c => {
        c.classList.remove('estimator-style-card--selected');
      });
      card.classList.add('estimator-style-card--selected');

      this.state.set('canProceed', true);
    }

    /**
     * Render Step 5 - Optional Services
     */
    renderOptionalServicesStep() {
      const selectedServices = this.state.get('selectedServices') || [];

      const services = [
        { id: 'false_ceiling', name: 'False Ceiling', icon: '✨', description: 'POP, Gypsum, and cove lighting' },
        { id: 'electrical', name: 'Electrical Work', icon: '⚡', description: 'Wiring, switches, and fixtures' },
        { id: 'lighting', name: 'Lighting Design', icon: '💡', description: 'Ambient, task, and accent lighting' },
        { id: 'painting', name: 'Painting', icon: '🎨', description: 'Interior and exterior painting' },
        { id: 'wallpaper', name: 'Wallpaper', icon: '🖼️', description: 'Premium wallpaper installation' },
        { id: 'smart_home', name: 'Smart Home', icon: '🏠', description: 'Automation and IoT integration' },
        { id: 'hvac', name: 'HVAC', icon: '❄️', description: 'Air conditioning and ventilation' },
        { id: 'cctv', name: 'CCTV Security', icon: '📹', description: 'Security camera installation' },
        { id: 'home_theatre', name: 'Home Theatre', icon: '🎬', description: 'Entertainment system setup' },
        { id: 'automation', name: 'Home Automation', icon: '🤖', description: 'Smart controls and sensors' },
        { id: 'curtains', name: 'Curtains', icon: '🪟', description: 'Window treatments and drapes' },
        { id: 'blinds', name: 'Blinds', icon: '🔲', description: 'Roller, Venetian, and vertical blinds' },
        { id: 'civil_work', name: 'Civil Work', icon: '🏗️', description: 'Demolition and construction' },
        { id: 'flooring', name: 'Flooring', icon: '🪵', description: 'Tiles, marble, and wooden flooring' },
        { id: 'stone_work', name: 'Stone Work', icon: '🪨', description: 'Cladding and stone finishes' },
        { id: 'glass_work', name: 'Glass Work', icon: '🔮', description: 'Partitions and railings' },
        { id: 'acp', name: 'ACP Work', icon: '🏢', description: 'Aluminum composite panel cladding' },
        { id: 'fabrication', name: 'Fabrication', icon: '🔧', description: 'Metal and wood fabrication' },
        { id: 'landscape', name: 'Landscaping', icon: '🌿', description: 'Garden and outdoor design' },
        { id: 'solar', name: 'Solar', icon: '☀️', description: 'Solar panel installation' },
        { id: 'waterproofing', name: 'Waterproofing', icon: '💧', description: 'Water and damp proofing' },
        { id: 'modular_kitchen_upgrade', name: 'Modular Kitchen Upgrade', icon: '🍳', description: 'Premium kitchen enhancements' },
        { id: 'wardrobe_upgrade', name: 'Wardrobe Upgrade', icon: '🚪', description: 'Custom wardrobe solutions' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title">Optional Services</h2>
          <p class="estimator-step__description">Select additional services (Select multiple)</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-card-grid estimator-card-grid--4">
      `;

      services.forEach(service => {
        const isSelected = selectedServices.includes(service.id);
        html += `
          <div class="estimator-card ${isSelected ? 'estimator-card--selected' : ''}" data-service="${service.id}" role="button" tabindex="0" aria-label="Select ${service.name}" aria-pressed="${isSelected}">
            <div class="estimator-card__icon">
              <span style="font-size: 36px;">${service.icon}</span>
            </div>
            <h3 class="estimator-card__title">${service.name}</h3>
            <p class="estimator-card__description">${service.description}</p>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(card => {
        card.addEventListener('click', (e) => this.handleServiceSelection(e));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleServiceSelection(e);
          }
        });
      });

      this.state.set('canProceed', true);
    }

    handleServiceSelection(event) {
      const card = event.currentTarget;
      const serviceId = card.dataset.service;

      let selectedServices = this.state.get('selectedServices') || [];

      if (selectedServices.includes(serviceId)) {
        selectedServices = selectedServices.filter(id => id !== serviceId);
      } else {
        selectedServices.push(serviceId);
      }

      this.state.set('selectedServices', selectedServices);
      this.renderOptionalServicesStep();
    }

    /**
     * Render Step 6 - Budget
     */
    renderBudgetStep() {
      const budget = this.state.get('budget') || 2500000;

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title">Budget Range</h2>
          <p class="estimator-step__description">Select your approximate budget</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-budget">
            <div class="estimator-budget__slider-container">
              <input type="range" id="budget-slider" class="estimator-budget__slider" min="500000" max="10000000" step="100000" value="${budget}">
            </div>
            <div class="estimator-budget__ranges">
              <div class="estimator-budget__range" data-budget="1000000">
                <div class="estimator-budget__range-label">Economy</div>
                <div class="estimator-budget__range-value">₹10L</div>
              </div>
              <div class="estimator-budget__range" data-budget="2500000">
                <div class="estimator-budget__range-label">Standard</div>
                <div class="estimator-budget__range-value">₹25L</div>
              </div>
              <div class="estimator-budget__range" data-budget="5000000">
                <div class="estimator-budget__range-label">Premium</div>
                <div class="estimator-budget__range-value">₹50L</div>
              </div>
              <div class="estimator-budget__range" data-budget="7500000">
                <div class="estimator-budget__range-label">Luxury</div>
                <div class="estimator-budget__range-value">₹75L</div>
              </div>
              <div class="estimator-budget__range" data-budget="10000000">
                <div class="estimator-budget__range-label">Ultra Luxury</div>
                <div class="estimator-budget__range-value">₹1Cr+</div>
              </div>
            </div>
            <div class="estimator-budget__display">
              <div class="estimator-budget__amount">₹${(budget / 100000).toFixed(1)} Lakhs</div>
            </div>
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      const slider = this.elements.stepContainer.querySelector('#budget-slider');
      slider.addEventListener('input', (e) => this.handleBudgetChange(e));

      this.elements.stepContainer.querySelectorAll('.estimator-budget__range').forEach(range => {
        range.addEventListener('click', (e) => {
          const value = parseInt(range.dataset.budget);
          slider.value = value;
          this.handleBudgetChange({ target: slider });
        });
      });

      this.state.set('canProceed', true);
    }

    handleBudgetChange(event) {
      const value = parseInt(event.target.value);
      this.state.set('budget', value);

      const display = this.elements.stepContainer.querySelector('.estimator-budget__amount');
      if (display) {
        display.textContent = `₹${(value / 100000).toFixed(1)} Lakhs`;
      }

      // Update active range
      this.elements.stepContainer.querySelectorAll('.estimator-budget__range').forEach(range => {
        range.classList.remove('estimator-budget__range--active');
        if (parseInt(range.dataset.budget) <= value) {
          range.classList.add('estimator-budget__range--active');
        }
      });
    }

    showLoading() {
      if(this.elements.loading) this.elements.loading.hidden = false;
      if(this.elements.main) this.elements.main.hidden = true;
    }

    hideLoading() {
      if(this.elements.loading) this.elements.loading.hidden = true;
      if(this.elements.main) this.elements.main.hidden = false;
    }

    showAlert(message, type = 'info') {
      const alert = document.createElement('div');
      alert.className = `estimator-alert estimator-alert--${type}`;
      alert.textContent = message;
      
      if(this.elements.stepContainer) {
          this.elements.stepContainer.insertBefore(alert, this.elements.stepContainer.firstChild);
          setTimeout(() => {
            alert.classList.add('estimator-alert--exiting');
            setTimeout(() => alert.remove(), 300);
          }, 5000);
      }
    }

    clearAlerts() {
      if(this.elements.stepContainer) {
          const alerts = this.elements.stepContainer.querySelectorAll('.estimator-alert');
          alerts.forEach(alert => alert.remove());
      }
    }

    showSummary() {
      if(this.elements.wizard) this.elements.wizard.hidden = true;
      
      if(this.elements.summary) {
          this.elements.summary.hidden = false;
          
          this.elements.summary.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-2xl); max-width: 600px; margin: 40px auto; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 20px 40px rgba(0,0,0,0.05);">
                <span style="font-size: 72px; display: block; margin-bottom: 24px;">🎉</span>
                <h2 style="font-family: var(--font-heading); font-size: 32px; color: var(--color-text-primary); margin-bottom: 16px;">Estimation Complete!</h2>
                <p style="color: var(--color-text-secondary); font-size: 18px; margin-bottom: 32px; line-height: 1.6;">Your project details have been successfully recorded. If the PDF engine is active, your BOQ is downloading now.</p>
                <div style="display: flex; gap: 16px; justify-content: center;">
                    <button onclick="location.reload()" style="padding: 16px 32px; background: var(--color-champagne-500); color: white; border: none; border-radius: var(--radius-lg); font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">Start New Estimate</button>
                </div>
            </div>
          `;
      }
    }

    hideSummary() {
      if(this.elements.wizard) this.elements.wizard.hidden = false;
      if(this.elements.summary) this.elements.summary.hidden = true;
    }

    reset() {
      this.hideSummary();
      this.renderStep(1);
      this.renderProgress();
    }
  }

  window.EstimatorUI = UIManager;

})();