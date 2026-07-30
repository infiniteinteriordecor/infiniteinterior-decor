/**
 * Estimator Module Entry Point
 * 
 * Main entry point for the estimator module.
 * Initializes all components and manages application lifecycle.
 * 
 * Architecture:
 * - Purpose: Initialize and coordinate all estimator modules
 * - Dependencies: All estimator modules
 * - Exports: EstimatorApp class
 */

(function() {
  'use strict';

  /**
   * Estimator Application Class
   * Main application coordinator
   */
  class EstimatorApp {
    constructor() {
      // Module instances
      this.stateManager = null;
      this.router = null;
      this.ui = null;
      this.engine = null;
      
      // Application state
      this.isInitialized = false;
      this.isLoaded = false;
    }

    /**
     * Initialize application
     * @returns {Promise<boolean>} Success status
     */
    async init() {
      try {
        console.log('Initializing Infinite Interior OS...');
        
        // Initialize state manager
        this.stateManager = window.EstimatorState;
        
        // Initialize router
        this.router = new window.EstimatorRouter(this.stateManager);
        this.router.init();
        
        // Initialize UI manager
        this.ui = new window.EstimatorUI(this.stateManager, this.router);
        
        // Initialize estimator engine
        this.engine = new window.EstimatorEngine(this.stateManager);
        const engineInitialized = await this.engine.init();
        
        if (!engineInitialized) {
          throw new Error('Failed to initialize estimator engine');
        }
        
        // Initialize UI
        this.ui.init();
        
        // Check for draft resumption
        await this.checkDraftResumption();
        
        // Set initialized flag
        this.isInitialized = true;
        
        console.log('Infinite Interior OS initialized successfully');
        
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
        const draftId = this.engine.storage.getCurrentDraftId();
        
        if (draftId) {
          const draft = await this.engine.loadDraft(draftId);
          
          if (draft) {
            // Ask user if they want to resume
            const shouldResume = confirm('You have an unsaved draft. Would you like to resume?');
            
            if (shouldResume) {
              this.stateManager.import(draft);
              this.stateManager.set('isDraft', true);
              this.stateManager.set('draftId', draftId);
              this.ui.renderStep(this.stateManager.get('currentStep'));
            } else {
              // Clear draft
              await this.engine.deleteDraft(draftId);
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
      
      // Render initial step
      this.ui.renderStep(this.router.currentStep);
      
      // Set loaded flag
      this.isLoaded = true;
      
      console.log('Infinite Interior OS started');
    }

    /**
     * Save current state as draft
     * @returns {Promise<string>} Draft ID
     */
    async saveDraft() {
      try {
        const state = this.stateManager.getState();
        const draftId = await this.engine.saveDraft(state);
        
        this.stateManager.set('isDraft', true);
        this.stateManager.set('draftId', draftId);
        this.stateManager.set('lastSaved', new Date().toISOString());
        
        this.ui.showAlert('Draft saved successfully', 'success');
        
        return draftId;
      } catch (error) {
        console.error('Save draft error:', error);
        this.ui.showAlert('Failed to save draft', 'error');
        return null;
      }
    }

    /**
     * Generate quotation PDF
     * @returns {Promise<boolean>} Success status
     */
    async generateQuotation() {
      try {
        const state = this.stateManager.getState();
        const pdfBlob = await this.engine.generatePDF('quotation', state);
        
        if (pdfBlob) {
          this.engine.pdfGenerator.savePDF(pdfBlob, 'quotation.pdf');
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Generate quotation error:', error);
        this.ui.showAlert('Failed to generate quotation', 'error');
        return false;
      }
    }

    /**
     * Generate BOQ PDF
     * @returns {Promise<boolean>} Success status
     */
    async generateBOQ() {
      try {
        const state = this.stateManager.getState();
        const pdfBlob = await this.engine.generatePDF('boq', state);
        
        if (pdfBlob) {
          this.engine.pdfGenerator.savePDF(pdfBlob, 'boq.pdf');
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Generate BOQ error:', error);
        this.ui.showAlert('Failed to generate BOQ', 'error');
        return false;
      }
    }

    /**
     * Reset application
     */
    reset() {
      if (confirm('Are you sure you want to reset? All unsaved changes will be lost.')) {
        this.stateManager.reset();
        this.router.reset();
        this.ui.reset();
        this.ui.showAlert('Application reset successfully', 'info');
      }
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
      const loadingElement = document.getElementById('estimator-loading');
      const loadingText = loadingElement.querySelector('.estimator-loading__text');
      
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
        state: this.stateManager ? this.stateManager.getState() : null
      };
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
      
      this.isInitialized = false;
      this.isLoaded = false;
      
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
