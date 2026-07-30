/**
 * Estimator Module Entry Point
 * 
 * Main entry point for the estimator module.
 * Now uses Bootstrap Loader for orchestrated initialization with error resilience.
 * 
 * Architecture:
 * - Purpose: Initialize and coordinate all estimator modules via Bootstrap
 * - Dependencies: estimator-bootstrap.js, All estimator modules
 * - Exports: EstimatorApp class
 */

(function() {
  'use strict';

  /**
   * Estimator Application Class
   * Main application coordinator - now delegates to Bootstrap
   */
  class EstimatorApp {
    constructor() {
      // Module instances (populated by Bootstrap)
      this.stateManager = null;
      this.router = null;
      this.ui = null;
      this.engine = null;
      this.storage = null;
      
      // Application state
      this.isInitialized = false;
      this.isLoaded = false;
      this.bootstrapResults = null;
    }

    /**
     * Initialize application via Bootstrap
     * @returns {Promise<boolean>} Success status
     */
    async init() {
      try {
        console.log('Initializing Infinite Interior OS via Bootstrap...');
        
        // Check if Bootstrap is available
        if (!window.EstimatorBootstrap) {
          throw new Error('Bootstrap loader not found. Ensure estimator-bootstrap.js is loaded.');
        }

        // Run Bootstrap
        this.bootstrapResults = await window.EstimatorBootstrap.bootstrap();
        
        // Extract results from Bootstrap
        const { results, context, success } = this.bootstrapResults;
        
        if (!success) {
          console.warn('Bootstrap completed with warnings. Some modules may not be available.');
        }

        // Assign instances from Bootstrap results
        this.stateManager = context.state;
        this.router = context.router;
        this.ui = context.ui;
        this.engine = context.engine;
        this.storage = results.storage;

        // Check for draft resumption SAFELY
        await this.checkDraftResumption();
        
        // Set initialized flag
        this.isInitialized = true;
        
        console.log('Infinite Interior OS initialized successfully via Bootstrap');
        
        // Log diagnostic summary
        const diagnostic = window.EstimatorBootstrap.getDiagnostic();
        console.log('Bootstrap Diagnostic Summary:', diagnostic.summary);
        
        return true;
      } catch (error) {
        console.error('Application initialization error:', error);
        this.showError('Failed to initialize application. Please refresh the page.');
        return false;
      }
    }

    /**
     * Check for draft resumption
     * @returns {Promise<void>}
     */
    async checkDraftResumption() {
      try {
        if (!this.storage) {
          console.warn('Storage not available, skipping draft resumption');
          return;
        }

        // SAFE CHECK: Verify if the function exists before calling it
        if (typeof this.storage.getCurrentDraftId !== 'function') {
          console.warn('getCurrentDraftId is not available on storage, skipping draft resumption');
          return;
        }

        const draftId = this.storage.getCurrentDraftId();
        
        if (draftId) {
          const draft = await this.storage.loadDraft(draftId);
          
          if (draft) {
            // Ask user if they want to resume
            const shouldResume = confirm('You have an unsaved draft. Would you like to resume?');
            
            if (shouldResume) {
              this.stateManager.import(draft);
              this.stateManager.set('isDraft', true);
              this.stateManager.set('draftId', draftId);
              if (this.ui) this.ui.renderStep(this.stateManager.get('currentStep'));
            } else {
              // Clear draft
              await this.storage.deleteDraft(draftId);
            }
          }
        }
      } catch (error) {
        console.error('Draft resumption error:', error);
      }
    }

    /**
     * Start application
     */
    start() {
      if (!this.isInitialized) {
        console.error('Application not initialized');
        return;
      }
      
      if (!this.router || !this.ui) {
        console.error('Critical modules not available');
        this.showError('Application failed to initialize properly. Please refresh the page.');
        return;
      }
      
      // Render initial step
      this.ui.renderStep(this.router.currentStep);
      
      // Set loaded flag
      this.isLoaded = true;

      // === HIDE LOADER OVERLAY SAFELY ===
      const loadingScreen = document.getElementById('estimator-loading');
      if (loadingScreen) {
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }
      
      console.log('Infinite Interior OS started');
    }

    /**
     * Save current state as draft
     * @returns {Promise<string>} Draft ID
     */
    async saveDraft() {
      try {
        if (!this.storage || !this.stateManager) {
          throw new Error('Storage or StateManager not available');
        }

        const state = this.stateManager.getState();
        const draftId = await this.storage.saveDraft(state);
        
        this.stateManager.set('isDraft', true);
        this.stateManager.set('draftId', draftId);
        this.stateManager.set('lastSaved', new Date().toISOString());
        
        if (this.ui && this.ui.showAlert) {
          this.ui.showAlert('Draft saved successfully', 'success');
        }
        
        return draftId;
      } catch (error) {
        console.error('Save draft error:', error);
        if (this.ui && this.ui.showAlert) {
          this.ui.showAlert('Failed to save draft', 'error');
        }
        return null;
      }
    }

    /**
     * Generate quotation PDF
     * @returns {Promise<boolean>} Success status
     */
    async generateQuotation() {
      try {
        if (!this.engine || !this.stateManager) {
          throw new Error('Engine or StateManager not available');
        }

        const state = this.stateManager.getState();
        const pdfBlob = await this.engine.generatePDF('quotation', state);
        
        if (pdfBlob && this.engine.pdfGenerator) {
          this.engine.pdfGenerator.savePDF(pdfBlob, 'quotation.pdf');
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Generate quotation error:', error);
        if (this.ui && this.ui.showAlert) {
          this.ui.showAlert('Failed to generate quotation', 'error');
        }
        return false;
      }
    }

    /**
     * Generate BOQ PDF
     * @returns {Promise<boolean>} Success status
     */
    async generateBOQ() {
      try {
        if (!this.engine || !this.stateManager) {
          throw new Error('Engine or StateManager not available');
        }

        const state = this.stateManager.getState();
        const pdfBlob = await this.engine.generatePDF('boq', state);
        
        if (pdfBlob && this.engine.pdfGenerator) {
          this.engine.pdfGenerator.savePDF(pdfBlob, 'boq.pdf');
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Generate BOQ error:', error);
        if (this.ui && this.ui.showAlert) {
          this.ui.showAlert('Failed to generate BOQ', 'error');
        }
        return false;
      }
    }

    /**
     * Reset application
     */
    reset() {
      if (confirm('Are you sure you want to reset? All unsaved changes will be lost.')) {
        if (this.stateManager) this.stateManager.reset();
        if (this.router) this.router.reset();
        if (this.ui) this.ui.reset();
        if (this.ui && this.ui.showAlert) {
          this.ui.showAlert('Application reset successfully', 'info');
        }
      }
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
      const loadingElement = document.getElementById('estimator-loading');
      const loadingText = loadingElement ? loadingElement.querySelector('.estimator-loading__text') : null;
      
      if (loadingText) {
        loadingText.textContent = message;
        loadingText.style.color = '#ef4444';
      }
    }

    /**
     * Get application status
     * @returns {Object} Application status
     */
    getStatus() {
      return {
        initialized: this.isInitialized,
        loaded: this.isLoaded,
        engine: this.engine ? this.engine.getStatus() : null,
        state: this.stateManager ? this.stateManager.getState() : null,
        bootstrap: this.bootstrapResults ? window.EstimatorBootstrap.getDiagnostic() : null
      };
    }

    /**
     * Get diagnostic report
     * @returns {Object} Diagnostic report
     */
    getDiagnostics() {
      if (window.EstimatorBootstrap) {
        return window.EstimatorBootstrap.getDiagnostic();
      }
      return null;
    }

    /**
     * Destroy application
     */
    destroy() {
      // Cleanup resources
      if (this.engine) {
        this.engine = null;
      }
      
      if (this.ui) {
        this.ui = null;
      }
      
      if (this.router) {
        this.router = null;
      }
      
      if (this.stateManager) {
        this.stateManager = null;
      }
      
      if (this.storage) {
        this.storage = null;
      }
      
      this.isInitialized = false;
      this.isLoaded = false;
      this.bootstrapResults = null;
      
      console.log('Infinite Interior OS destroyed');
    }
  }

  // Auto-initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', async () => {
    // Create application instance
    const app = new EstimatorApp();
    
    // Initialize application
    const initialized = await app.init();
    
    if (initialized) {
      // Start application
      app.start();
      
      // Export to global scope for debugging
      window.EstimatorApp = app;
    }
  });

})();