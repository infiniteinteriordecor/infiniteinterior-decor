/**
 * Estimator UI Manager
 * Upgraded for Premium Flow & Validation
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
      this.renderProgress();
      this.hideLoading();
    }

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

    bindEvents() {
      this.elements.prevButton.addEventListener('click', () => this.handlePrevious());
      this.elements.nextButton.addEventListener('click', () => this.handleNext());
      this.state.subscribe((state) => this.handleStateChange(state));
    }

    handleStateChange(state) {
      this.updateNavigationButtons(state);
      this.updateProgress(state);
      
      if (state.currentStep && this.currentRenderedStep !== state.currentStep) {
        this.renderStep(state.currentStep);
      }
    }

    handlePrevious() {
      this.router.previous();
    }

    async handleNext() {
      const isFinalStep = this.elements.nextButton.textContent === 'Submit';

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
      
      if (state.currentStep === state.totalSteps || state.currentStep === this.router.totalSteps) {
        this.elements.nextButton.textContent = 'Submit';
      } else {
        this.elements.nextButton.textContent = 'Next';
      }
    }

    renderProgress(state) {
      const steps = (typeof this.router.getAllSteps === 'function') ? this.router.getAllSteps() : [];
      const currentStep = state ? state.currentStep : (this.router.currentStep || 1);
      
      const defaultTitles = ['Category', 'Type', 'Information', 'Requirements', 'Style', 'Package', 'Budget', 'Contact'];
      const totalStepsToRender = steps.length > 0 ? steps.length : 8;
      
      let html = '<div class="estimator-progress-line"></div>';
      html += '<div class="estimator-progress-steps">';
      
      for(let index = 0; index < totalStepsToRender; index++) {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        const title = steps[index] ? steps[index].title : defaultTitles[index];
        
        let statusClass = '';
        if (isCompleted) statusClass = 'estimator-progress-step--completed';
        if (isActive) statusClass = 'estimator-progress-step--active';
        
        html += `
          <div class="estimator-progress-step ${statusClass}">
            <div class="estimator-progress-step__indicator">
              ${isCompleted ? '✓' : stepNumber}
            </div>
            <span class="estimator-progress-step__label">${title}</span>
          </div>
        `;
      }
      
      html += '</div>';
      this.elements.progress.innerHTML = html;
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

    renderStepContent(stepId) {
      const stepMapper = typeof stepId === 'object' ? stepId.id : stepId.toString();

      switch (stepMapper) {
        case '1':
        case 'category':
          this.renderPackageStep(); break;
        
        case '2':
        case 'type':
          this.renderBudgetStep(); break;
        case '3':
        case 'info':
          this.renderRoomsStep(); break;
        case '4':
        case 'requirements':
          this.renderModulesStep(); break;
        
        case 'custom_services_selection':
          this.renderCustomServicesStep(); break;

        case '5':
        case 'style':
          this.renderMaterialsStep(); break;
        case '6':
        case 'package':
          this.renderDetailsStep(); break;
        
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
               tabindex="0">
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
      });
    }

    handleCategorySelection(event) {
      const card = event.currentTarget;
      const categoryId = card.dataset.category;
      
      this.state.set('projectCategory', categoryId);
      
      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(c => c.classList.remove('estimator-card--selected'));
      card.classList.add('estimator-card--selected');
      
      this.state.set('canProceed', true);
    }

    renderCustomServicesStep() {
      const selectedServices = this.state.get('selectedCustomServices') || [];
      
      // Premium Visual Grid List
      const services = [
        { id: 'modular_kitchen', name: 'Modular Kitchen', icon: '🍳' },
        { id: 'wardrobe', name: 'Wardrobes & Storage', icon: '🚪' },
        { id: 'false_ceiling', name: 'False Ceiling', icon: '✨' },
        { id: 'wall_paneling', name: 'Wall Paneling', icon: '🖼️' },
        { id: 'painting', name: 'Interior Painting', icon: '🎨' },
        { id: 'flooring', name: 'Flooring (Tiles/Wood)', icon: '🪵' },
        { id: 'plumbing', name: 'Plumbing & Sanitary', icon: '🚰' },
        { id: 'electrical', name: 'Electrical & Wiring', icon: '⚡' },
        { id: 'custom_furniture', name: 'Custom Furniture', icon: '🛋️' },
        { id: 'glass_work', name: 'Glass & Mirrors', icon: '🪞' },
        { id: 'bathroom', name: 'Bathroom Remodel', icon: '🛁' },
        { id: 'civil_work', name: 'Civil & Demolition', icon: '🧱' },
        { id: 'doors_windows', name: 'Doors & Windows', icon: '🪟' },
        { id: 'automation', name: 'Smart Home', icon: '📱' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Select Your Services</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Tap on the specific interior works you require. You can select multiple options.</p>
        </div>
        <div class="estimator-step__content" style="max-width: 900px; margin: 0 auto;">
          
          <div class="estimator-services-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;">
            ${services.map(service => {
              const isSelected = selectedServices.includes(service.id);
              return `
                <div class="estimator-service-chip ${isSelected ? 'selected' : ''}" 
                     data-id="${service.id}" 
                     style="background: ${isSelected ? 'rgba(196,160,116,0.1)' : 'rgba(255,255,255,0.9)'}; 
                            border: 2px solid ${isSelected ? 'var(--color-champagne-500)' : 'rgba(0,0,0,0.08)'}; 
                            border-radius: var(--radius-xl); 
                            padding: 24px 16px; 
                            cursor: pointer; 
                            text-align: center; 
                            backdrop-filter: blur(10px);
                            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                            box-shadow: ${isSelected ? '0 8px 24px rgba(196,160,116,0.15)' : '0 2px 8px rgba(0,0,0,0.04)'};">
                  <div style="font-size: 32px; margin-bottom: 12px; transition: transform 0.3s;" class="chip-icon">${service.icon}</div>
                  <div class="chip-text" style="font-size: 15px; font-weight: ${isSelected ? '600' : '500'}; color: ${isSelected ? 'var(--color-champagne-700)' : 'var(--color-text-primary)'}; line-height: 1.3;">${service.name}</div>
                </div>
              `;
            }).join('')}
          </div>

        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      const chips = this.elements.stepContainer.querySelectorAll('.estimator-service-chip');
      
      const updateNextButtonState = () => {
          const currentSelected = this.state.get('selectedCustomServices') || [];
          this.state.set('canProceed', currentSelected.length > 0);
          this.updateNavigationButtons(this.state.get());
      };

      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const serviceId = chip.dataset.id;
          let currentSelected = this.state.get('selectedCustomServices') || [];
          const textElement = chip.querySelector('.chip-text');
          const iconElement = chip.querySelector('.chip-icon');
          
          if (currentSelected.includes(serviceId)) {
            currentSelected = currentSelected.filter(id => id !== serviceId);
            chip.style.background = 'rgba(255,255,255,0.9)';
            chip.style.borderColor = 'rgba(0,0,0,0.08)';
            chip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            chip.classList.remove('selected');
            textElement.style.fontWeight = '500';
            textElement.style.color = 'var(--color-text-primary)';
            iconElement.style.transform = 'scale(1)';
          } else {
            currentSelected.push(serviceId);
            chip.style.background = 'rgba(196,160,116,0.1)';
            chip.style.borderColor = 'var(--color-champagne-500)';
            chip.style.boxShadow = '0 8px 24px rgba(196,160,116,0.15)';
            chip.classList.add('selected');
            textElement.style.fontWeight = '600';
            textElement.style.color = 'var(--color-champagne-700)';
            iconElement.style.transform = 'scale(1.1)';
          }
          
          this.state.set('selectedCustomServices', currentSelected);
          updateNextButtonState();
        });
      });

      // Run on load to lock/unlock Next button immediately
      updateNextButtonState();
    }

    renderBudgetStep() {
      const projectTypes = [
        { id: 'new_construction', name: 'New Construction', description: 'Complete interior design for newly built spaces', features: [], icon: '🏗️' },
        { id: 'renovation', name: 'Renovation', description: 'Transform existing spaces with modern design', features: [], icon: '🔧' },
        { id: 'interior_redesign', name: 'Interior Redesign', description: 'Refresh your space with new aesthetics', features: [], icon: '🎨' },
        { id: 'partial_upgrade', name: 'Partial Upgrade', description: 'Focus on specific areas or rooms', features: [], icon: '📐' }
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
        html += `
          <div class="estimator-card ${isSelected ? 'estimator-card--selected' : ''}" 
               data-type="${type.id}" 
               role="button" 
               tabindex="0">
            <div class="estimator-card__icon">
              <span style="font-size: 32px;">${type.icon}</span>
            </div>
            <h3 class="estimator-card__title">${type.name}</h3>
            <p class="estimator-card__description">${type.description}</p>
          </div>
        `;
      });

      html += `</div></div>`;
      this.elements.stepContainer.innerHTML = html;

      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(card => {
        card.addEventListener('click', (e) => this.handleProjectTypeSelection(e));
      });
    }

    handleProjectTypeSelection(event) {
      const card = event.currentTarget;
      const typeId = card.dataset.type;
      
      this.state.set('projectType', typeId);
      this.renderBudgetStep();
      this.state.set('canProceed', true);
    }

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
              <input type="number" id="area" class="estimator-input" placeholder="Enter total area" value="${projectInfo.area || ''}">
            </div>
            <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08);">
              <label class="estimator-label" for="city">City</label>
              <select id="city" class="estimator-select">
                <option value="">Select city</option>
                <option value="mumbai" ${projectInfo.city === 'mumbai' ? 'selected' : ''}>Mumbai</option>
                <option value="delhi" ${projectInfo.city === 'delhi' ? 'selected' : ''}>Delhi</option>
                <option value="bangalore" ${projectInfo.city === 'bangalore' ? 'selected' : ''}>Bangalore</option>
                <option value="other" ${projectInfo.city === 'other' ? 'selected' : ''}>Other</option>
              </select>
            </div>
            <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08);">
              <label class="estimator-label" for="constructionType">Construction Type</label>
              <select id="constructionType" class="estimator-select">
                <option value="">Select type</option>
                <option value="apartment" ${projectInfo.constructionType === 'apartment' ? 'selected' : ''}>Apartment</option>
                <option value="villa" ${projectInfo.constructionType === 'villa' ? 'selected' : ''}>Villa</option>
                <option value="commercial" ${projectInfo.constructionType === 'commercial' ? 'selected' : ''}>Commercial</option>
              </select>
            </div>
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      const inputs = this.elements.stepContainer.querySelectorAll('input, select');
      inputs.forEach(input => {
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

    renderModulesStep() {
      const rooms = this.state.get('rooms') || [];
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
          </div>
        `;
      } else {
        rooms.forEach((room, index) => {
          html += `
            <div class="estimator-room-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-6); margin-bottom: var(--spacing-4); border: 1px solid rgba(0,0,0,0.08);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h4 style="margin: 0;">${room.type.replace('_', ' ').toUpperCase()}</h4>
                  <p style="margin: 0;">${room.area || 0} sqft</p>
                </div>
                <button class="estimator-room-card__delete" data-index="${index}" style="padding: 8px 16px; border: 1px solid rgba(239,68,68,0.3); border-radius: var(--radius-lg); background: rgba(239,68,68,0.1); cursor: pointer;">🗑️</button>
              </div>
            </div>
          `;
        });
      }

      html += `
          </div>
          <button class="estimator-add-room-btn" style="width: 100%; padding: var(--spacing-5); border: 2px dashed rgba(196,160,116,0.3); border-radius: var(--radius-xl); background: rgba(196,160,116,0.05); color: var(--color-champagne-600); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: var(--spacing-3);">
            <span style="font-size: 24px;">+</span> Add Room
          </button>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;
      const addBtn = this.elements.stepContainer.querySelector('.estimator-add-room-btn');
      addBtn.addEventListener('click', () => this.showAddRoomModal());

      this.elements.stepContainer.querySelectorAll('.estimator-room-card__delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = parseInt(e.target.dataset.index);
          const currentRooms = this.state.get('rooms') || [];
          currentRooms.splice(index, 1);
          this.state.set('rooms', currentRooms);
          this.renderModulesStep();
        });
      });

      this.state.set('canProceed', rooms.length > 0);
    }

    showAddRoomModal() {
      let modalHtml = `
        <div class="estimator-modal estimator-modal--active" id="add-room-modal">
          <div class="estimator-modal__content">
            <h3 style="margin-bottom: var(--spacing-6);">Add Room</h3>
            <div style="margin-bottom: var(--spacing-6);">
              <label class="estimator-label">Room Type</label>
              <select id="room-type" class="estimator-select">
                <option value="living_room">Living Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
              </select>
            </div>
            <div style="margin-bottom: var(--spacing-6);">
              <label class="estimator-label">Area (sqft)</label>
              <input type="number" id="room-area" class="estimator-input" placeholder="Enter area">
            </div>
            <div style="display: flex; gap: var(--spacing-4); justify-content: flex-end;">
              <button class="estimator-modal-cancel" style="padding: 12px 24px; border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-lg); background: white; cursor: pointer;">Cancel</button>
              <button class="estimator-modal-confirm" style="padding: 12px 24px; border: none; border-radius: var(--radius-lg); background: var(--color-champagne-500); color: white; cursor: pointer;">Add</button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
      const modal = document.getElementById('add-room-modal');
      
      modal.querySelector('.estimator-modal-cancel').addEventListener('click', () => modal.remove());
      modal.querySelector('.estimator-modal-confirm').addEventListener('click', () => {
        const type = modal.querySelector('#room-type').value;
        const area = modal.querySelector('#room-area').value;
        const currentRooms = this.state.get('rooms') || [];
        currentRooms.push({ id: Date.now().toString(), type, area: parseInt(area) || 0 });
        this.state.set('rooms', currentRooms);
        modal.remove();
        this.renderModulesStep();
      });
    }

    renderMaterialsStep() {
      const designStyles = [
        { id: 'modern', name: 'Modern', description: 'Clean lines, neutral colors, functional design', colorPalette: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#333333'], icon: '🏢' },
        { id: 'minimalist', name: 'Minimalist', description: 'Simplicity, clean aesthetics, essential elements', colorPalette: ['#FAFAFA', '#F0F0F0', '#E8E8E8', '#2C2C2C'], icon: '⬜' },
        { id: 'luxury', name: 'Luxury', description: 'Premium materials, elegant finishes, sophisticated', colorPalette: ['#1C1C1C', '#C4A074', '#D4AF37', '#FFFFFF'], icon: '✨' },
        { id: 'industrial', name: 'Industrial', description: 'Raw materials, exposed elements, urban aesthetic', colorPalette: ['#4A4A4A', '#8B7355', '#B8860B', '#D3D3D3'], icon: '🏭' },
        { id: 'japandi', name: 'Japandi', description: 'Japanese minimalism meets Scandinavian warmth', colorPalette: ['#F5F5DC', '#D2B48C', '#8B4513', '#FAF0E6'], icon: '🎋' },
        { id: 'classic', name: 'Classic', description: 'Timeless elegance, traditional elements, refined', colorPalette: ['#FFF8DC', '#DEB887', '#8B4513', '#F5F5DC'], icon: '🏛️' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Preferred Aesthetic</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Choose your preferred design style</p>
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
               tabindex="0">
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
      });
    }

    handleDesignStyleSelection(event) {
      const card = event.currentTarget;
      const styleId = card.dataset.style;
      
      this.state.set('designStyle', styleId);
      
      this.elements.stepContainer.querySelectorAll('.estimator-card').forEach(c => c.classList.remove('estimator-card--selected'));
      card.classList.add('estimator-card--selected');
      
      this.state.set('canProceed', true);
    }

    renderDetailsStep() {
      const packages = [
        { id: 'standard', name: 'Standard', tier: 'premium', description: 'Comprehensive design with quality materials', timeline: '30-45 days' },
        { id: 'premium', name: 'Premium', tier: 'luxury', description: 'Luxury design with premium finishes', timeline: '45-60 days' }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Select Package</h2>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-package-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--spacing-6);">
      `;

      packages.forEach(pkg => {
        const isSelected = this.state.get('selectedPackage') === pkg.id;
        html += `
          <div class="estimator-package-card ${isSelected ? 'estimator-package-card--selected' : ''}" 
               data-package="${pkg.id}" 
               style="background: rgba(255,255,255,0.9); border-radius: var(--radius-2xl); padding: var(--spacing-8); border: 1px solid rgba(0,0,0,0.08); cursor: pointer;"
               role="button" tabindex="0">
            <h3>${pkg.name}</h3>
            <p>${pkg.description}</p>
          </div>
        `;
      });

      html += `</div></div>`;
      this.elements.stepContainer.innerHTML = html;

      this.elements.stepContainer.querySelectorAll('.estimator-package-card').forEach(card => {
        card.addEventListener('click', (e) => {
          this.state.set('selectedPackage', e.currentTarget.dataset.package);
          this.renderDetailsStep();
          this.state.set('canProceed', true);
        });
      });
    }

    renderReviewStep() {
      const budget = this.state.get('budget') || '';
      const budgetType = this.state.get('budgetType') || 'unknown'; 
      
      const presetBudgets = [
        { id: '5L', label: '₹5L', value: 500000 },
        { id: '10L', label: '₹10L', value: 1000000 },
        { id: '25L', label: '₹25L', value: 2500000 },
        { id: '50L', label: '₹50L', value: 5000000 }
      ];

      let html = `
        <div class="estimator-step__header">
          <h2 class="estimator-step__title" style="font-family: var(--font-heading); font-size: var(--font-size-3xl); color: var(--color-text-primary); margin-bottom: var(--spacing-4);">Budget (Optional)</h2>
          <p class="estimator-step__description" style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">Set your budget range or skip to decide later</p>
        </div>
        <div class="estimator-step__content">
          <div class="estimator-budget-type-selector" style="display: flex; gap: var(--spacing-4); margin-bottom: var(--spacing-8);">
            <button class="estimator-chip ${budgetType === 'unknown' ? 'estimator-chip--selected' : ''}" data-type="unknown" style="flex: 1;">
              Skip / Not Sure
            </button>
            <button class="estimator-chip ${budgetType === 'known' ? 'estimator-chip--selected' : ''}" data-type="known" style="flex: 1;">
              I have a budget
            </button>
          </div>
          
          ${budgetType === 'known' ? `
            <div class="estimator-budget-input-section">
              <div class="estimator-form-card" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-8); margin-bottom: var(--spacing-6); border: 1px solid rgba(0,0,0,0.08);">
                <label class="estimator-label" for="budget-amount">Budget Amount (₹)</label>
                <input type="number" id="budget-amount" class="estimator-input" placeholder="Enter your budget" value="${budget}" style="font-size: var(--font-size-xl); font-family: var(--font-heading); font-weight: var(--font-weight-semibold);">
              </div>
              
              <div style="margin-bottom: var(--spacing-4);">
                <div class="estimator-budget-presets" style="display: flex; flex-wrap: wrap; gap: var(--spacing-3);">
                 ${presetBudgets.map(preset => `
                    <button class="estimator-chip ${budget === preset.value ? 'estimator-chip--selected' : ''}" data-value="${preset.value}" style="font-size: var(--font-size-sm);">
                      ${preset.label}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : `
            <div class="estimator-unknown-budget-section" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-radius: var(--radius-xl); padding: var(--spacing-10); text-align: center; border: 1px solid rgba(0,0,0,0.08);">
              <span style="font-size: 48px; display: block; margin-bottom: var(--spacing-4);">💰</span>
              <h3 style="font-family: var(--font-heading); font-size: var(--font-size-xl); color: var(--color-text-primary); margin-bottom: var(--spacing-2);">You can skip this step!</h3>
              <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-6);">No problem. Just click Next, and we'll calculate everything and provide options based on your requirements.</p>
            </div>
          `}
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      this.elements.stepContainer.querySelectorAll('.estimator-budget-type-selector .estimator-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          this.state.set('budgetType', e.target.dataset.type);
          
          if(e.target.dataset.type === 'unknown') {
            this.state.set('budget', null);
          }
          this.renderReviewStep();
        });
      });

      if (budgetType === 'known') {
        const budgetInput = this.elements.stepContainer.querySelector('#budget-amount');
        budgetInput.addEventListener('input', (e) => {
          this.state.set('budget', parseInt(e.target.value) || 0);
          this.validateBudget();
        });
        
        this.elements.stepContainer.querySelectorAll('.estimator-budget-presets .estimator-chip').forEach(chip => {
          chip.addEventListener('click', (e) => {
            const value = parseInt(e.target.dataset.value);
            this.state.set('budget', value);
            this.renderReviewStep();
          });
        });
        this.validateBudget();
      } else {
        this.state.set('canProceed', true);
      }
    }

    validateBudget() {
      const budget = this.state.get('budget');
      const isValid = budget && budget > 0;
      this.state.set('canProceed', isValid);
    }

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
        customServices: this.state.get('selectedCustomServices') || []
      };

      const categoryNames = {
        'residential': 'Residential',
        'commercial': 'Commercial',
        'hospitality': 'Hospitality',
        'retail': 'Retail',
        'custom_services': 'A La Carte / Custom Services'
      };

      const styleNames = {
        'modern': 'Modern',
        'minimalist': 'Minimalist',
        'luxury': 'Luxury',
        'industrial': 'Industrial',
        'japandi': 'Japandi',
        'classic': 'Classic'
      };
      
      // Upgrade: Display actual names of selected custom services
      const servicesMap = {
        'modular_kitchen': 'Modular Kitchen', 'wardrobe': 'Wardrobes', 
        'false_ceiling': 'False Ceiling', 'wall_paneling': 'Wall Paneling',
        'painting': 'Painting', 'flooring': 'Flooring', 'plumbing': 'Plumbing',
        'electrical': 'Electrical', 'custom_furniture': 'Custom Furniture',
        'glass_work': 'Glass Work', 'bathroom': 'Bathroom', 'civil_work': 'Civil Work',
        'doors_windows': 'Doors/Windows', 'automation': 'Smart Home'
      };
      const customServiceNames = summary.customServices.map(id => servicesMap[id] || id).join(', ');

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
                <div class="estimator-summary-item" style="align-items: flex-start;">
                  <span class="estimator-summary-item__label" style="min-width: 120px;">Selected Services</span>
                  <span class="estimator-summary-item__value" style="text-align: right; line-height: 1.4;">${customServiceNames || 'None Selected'}</span>
                </div>
                <div class="estimator-summary-item">
                  <span class="estimator-summary-item__label">Preferred Aesthetic</span>
                  <span class="estimator-summary-item__value">${styleNames[summary.designStyle] || 'Not Selected'}</span>
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
                  <span class="estimator-summary-item__value">${summary.budgetType === 'unknown' ? 'To Be Decided' : '₹' + (summary.budget || 0).toLocaleString()}</span>
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
                  <input type="text" id="client-city" class="estimator-input" placeholder="Enter your city" value="${clientDetails.city || ''}" aria-required="true">
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      this.elements.stepContainer.innerHTML = html;

      const inputs = this.elements.stepContainer.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('input', (e) => this.handleContactDetailChange(e));
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

    showLoading() {
      if(this.elements.loading) this.elements.loading.hidden = false;
      if(this.elements.main) this.elements.main.hidden = true;
    }

    hideLoading() {
      if(this.elements.loading) this.elements.loading.hidden = true;
      if(this.elements.main) this.elements.main.hidden = false;
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