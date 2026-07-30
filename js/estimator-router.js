/**
 * Estimator Router
 * 
 * Internal routing system for the estimator wizard.
 * Handles step navigation, deep linking, and draft resumption.
 * 
 * Architecture:
 * - Purpose: Navigate between wizard steps
 * - Dependencies: estimator-state.js
 * - Exports: Router class
 */

(function() {
  'use strict';

  /**
   * Router Class
   * Manages wizard step navigation
   */
  class Router {
    constructor(stateManager) {
      if (!stateManager) {
        throw new Error('stateManager is required');
      }
      this.state = stateManager;
      
      // Step definitions
      this.steps = [
        { id: 1, name: 'category', title: 'Category' },
        { id: 2, name: 'type', title: 'Type' },
        { id: 3, name: 'information', title: 'Information' },
        { id: 4, name: 'requirements', title: 'Requirements' },
        { id: 5, name: 'style', title: 'Style' },
        { id: 6, name: 'package', title: 'Package' },
        { id: 7, name: 'budget', title: 'Budget' },
        { id: 8, name: 'contact', title: 'Contact' }
      ];
      
      // Navigation guards
      this.guards = {};
      
      // Current step
      this.currentStep = 1;
    }

    /**
     * Initialize router
     */
    init() {
      // Check for deep link or draft resumption
      this.checkDeepLink();
      this.checkDraftResumption();
      
      // Set initial step
      this.currentStep = this.state.get('currentStep') || 1;
      this.updateNavigationState();
    }

    /**
     * Navigate to next step
     * @returns {boolean} Success status
     */
    next() {
      const nextStep = this.currentStep + 1;
      
      if (nextStep <= this.steps.length) {
        // Check if navigation is allowed
        if (this.canNavigateTo(nextStep)) {
          this.currentStep = nextStep;
          this.state.set('currentStep', nextStep);
          this.updateNavigationState();
          this.renderStep(nextStep);
          return true;
        }
      }
      
      return false;
    }

    /**
     * Navigate to previous step
     * @returns {boolean} Success status
     */
    previous() {
      const prevStep = this.currentStep - 1;
      
      if (prevStep >= 1) {
        this.currentStep = prevStep;
        this.state.set('currentStep', prevStep);
        this.updateNavigationState();
        this.renderStep(prevStep);
        return true;
      }
      
      return false;
    }

    /**
     * Navigate to specific step
     * @param {number} stepId - Target step ID
     * @returns {boolean} Success status
     */
    goTo(stepId) {
      if (stepId >= 1 && stepId <= this.steps.length) {
        if (this.canNavigateTo(stepId)) {
          this.currentStep = stepId;
          this.state.set('currentStep', stepId);
          this.updateNavigationState();
          this.renderStep(stepId);
          return true;
        }
      }
      
      return false;
    }

    /**
     * Check if navigation to step is allowed
     * @param {number} stepId - Target step ID
     * @returns {boolean} Allow status
     */
    canNavigateTo(stepId) {
      // Check guard for target step
      if (this.guards[stepId]) {
        return this.guards[stepId](this.state.getState());
      }
      
      // Default: allow navigation
      return true;
    }

    /**
     * Add navigation guard
     * @param {number} stepId - Step ID
     * @param {Function} guard - Guard function
     */
    addGuard(stepId, guard) {
      this.guards[stepId] = guard;
    }

    /**
     * Remove navigation guard
     * @param {number} stepId - Step ID
     */
    removeGuard(stepId) {
      delete this.guards[stepId];
    }

    /**
     * Update navigation state
     */
    updateNavigationState() {
      const canGoBack = this.currentStep > 1;
      const canProceed = this.currentStep < this.steps.length;
      
      this.state.setMany({
        'canGoBack': canGoBack,
        'canProceed': canProceed
      });
    }

    /**
     * Render step content
     * @param {number} stepId - Step ID
     */
    renderStep(stepId) {
      // Placeholder for step rendering logic
      // Will be implemented in estimator-ui.js
      console.log('Rendering step:', stepId);
    }

    /**
     * Get step information
     * @param {number} stepId - Step ID
     * @returns {Object|null} Step information
     */
    getStep(stepId) {
      return this.steps.find(step => step.id === stepId) || null;
    }

    /**
     * Get current step information
     * @returns {Object} Current step information
     */
    getCurrentStep() {
      return this.getStep(this.currentStep);
    }

    /**
     * Get all steps
     * @returns {Array} All steps
     */
    getAllSteps() {
      return [...this.steps];
    }

    /**
     * Check for deep link
     */
    checkDeepLink() {
      const urlParams = new URLSearchParams(window.location.search);
      const stepParam = urlParams.get('step');
      
      if (stepParam) {
        const stepId = parseInt(stepParam, 10);
        if (stepId >= 1 && stepId <= this.steps.length) {
          this.currentStep = stepId;
        }
      }
    }

    /**
     * Check for draft resumption
     */
    checkDraftResumption() {
      const draftId = this.state.get('draftId');
      
      if (draftId) {
        // Placeholder for draft resumption logic
        // Will be implemented in storage.js
        console.log('Resuming draft:', draftId);
      }
    }

    /**
     * Update URL for deep linking
     */
    updateURL() {
      const url = new URL(window.location);
      url.searchParams.set('step', this.currentStep);
      window.history.replaceState({}, '', url);
    }

    /**
     * Reset router to initial state
     */
    reset() {
      this.currentStep = 1;
      this.state.set('currentStep', 1);
      this.updateNavigationState();
    }
  }

  // Export for use in other modules
  window.EstimatorRouter = Router;

})();
