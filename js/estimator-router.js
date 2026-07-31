/**
 * Estimator Router
 * 
 * Internal routing system for the estimator wizard.
 * Handles step navigation, deep linking, and dynamic branching.
 * 
 * Architecture:
 * - Purpose: Navigate between wizard steps dynamically based on category
 * - Dependencies: estimator-state.js
 * - Exports: Router class
 */

(function() {
  'use strict';

  /**
   * Router Class
   * Manages dynamic wizard step navigation
   */
  class Router {
    constructor(stateManager) {
      if (!stateManager) {
        throw new Error('stateManager is required');
      }
      this.state = stateManager;
      
      // Navigation guards
      this.guards = {};
      
      // Current step numerical index (Always 1-based)
      this.currentStep = 1;
    }

    /**
     * DYNAMIC FLOW ENGINE
     * Automatically adjusts the steps array based on the chosen category.
     */
    get steps() {
      const category = this.state.get('projectCategory');
      
      // Branch 1: Custom Services (Short Flow)
      if (category === 'custom_services') {
        return [
          { id: 'category', name: 'category', title: 'Category' },
          { id: 'custom_services_selection', name: 'services', title: 'Services' },
          { id: 'budget', name: 'budget', title: 'Budget' },
          { id: 'contact', name: 'contact', title: 'Contact' }
        ];
      } 
      
      // Branch 2: Standard Full Interior (Long Flow)
      return [
        { id: 'category', name: 'category', title: 'Category' },
        { id: 'type', name: 'type', title: 'Type' },
        { id: 'info', name: 'information', title: 'Information' },
        { id: 'requirements', name: 'requirements', title: 'Requirements' },
        { id: 'style', name: 'style', title: 'Style' },
        { id: 'package', name: 'package', title: 'Package' },
        { id: 'budget', name: 'budget', title: 'Budget' },
        { id: 'contact', name: 'contact', title: 'Contact' }
      ];
    }

    /**
     * Total steps getter (useful for UI completion check)
     */
    get totalSteps() {
      return this.steps.length;
    }

    /**
     * Helper to broadcast step changes properly to UI
     * Sends an object that works as both a number (for progress bar) and string (for rendering)
     */
    _broadcastStep(stepIndex) {
      const stepDef = this.steps[stepIndex - 1];
      if (!stepDef) return;
      
      // Magic Payload: Behaves like an index for math operations, but outputs ID string for logic
      const stepPayload = {
        id: stepDef.id,
        name: stepDef.name,
        title: stepDef.title,
        index: stepIndex,
        valueOf: function() { return this.index; },
        toString: function() { return this.id; }
      };
      
      this.state.set('currentStep', stepPayload);
    }

    /**
     * Initialize router
     */
    init() {
      this.checkDeepLink();
      this.checkDraftResumption();
      
      // Extract numeric index if state currently holds the object payload
      let savedStep = this.state.get('currentStep');
      this.currentStep = typeof savedStep === 'object' ? savedStep.index : (savedStep || 1);
      
      this._broadcastStep(this.currentStep);
      this.updateNavigationState();
    }

    /**
     * Navigate to next step
     * @returns {boolean} Success status
     */
    next() {
      const nextStep = this.currentStep + 1;
      
      if (nextStep <= this.steps.length) {
        if (this.canNavigateTo(nextStep)) {
          this.currentStep = nextStep;
          this._broadcastStep(this.currentStep);
          this.updateNavigationState();
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
        this._broadcastStep(this.currentStep);
        this.updateNavigationState();
        return true;
      }
      return false;
    }

    /**
     * Navigate to specific step index
     * @param {number} stepId - Target step index
     * @returns {boolean} Success status
     */
    goTo(stepId) {
      if (stepId >= 1 && stepId <= this.steps.length) {
        if (this.canNavigateTo(stepId)) {
          this.currentStep = stepId;
          this._broadcastStep(this.currentStep);
          this.updateNavigationState();
          return true;
        }
      }
      return false;
    }

    /**
     * Check if navigation to step is allowed
     */
    canNavigateTo(stepId) {
      if (this.guards[stepId]) {
        return this.guards[stepId](this.state.getState());
      }
      return true;
    }

    /**
     * Add navigation guard
     */
    addGuard(stepId, guard) {
      this.guards[stepId] = guard;
    }

    /**
     * Remove navigation guard
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
     * Get step information
     */
    getStep(stepId) {
      return this.steps[stepId - 1] || null;
    }

    /**
     * Get current step information
     */
    getCurrentStep() {
      return this.getStep(this.currentStep);
    }

    /**
     * Get all steps for current active flow
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
      this._broadcastStep(1);
      this.updateNavigationState();
    }
  }

  window.EstimatorRouter = Router;

})();