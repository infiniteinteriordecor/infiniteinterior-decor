/**
 * Estimator Router
 * 
 * Internal routing system for the estimator wizard.
 * Handles step navigation, deep linking, and dynamic branching.
 */

(function() {
  'use strict';

  class Router {
    constructor(stateManager) {
      if (!stateManager) {
        throw new Error('stateManager is required');
      }
      this.state = stateManager;
      this.guards = {};
      this.currentStep = 1;
    }

    /**
     * DYNAMIC FLOW ENGINE
     * Automatically adjusts the steps array based on the chosen category.
     */
    get steps() {
      const category = this.state.get('projectCategory');
      
      // Branch 1: Custom Services (A La Carte 5-Step Flow)
      if (category === 'custom_services') {
        return [
          { id: 'category', name: 'category', title: 'Category' },
          { id: 'custom_services_selection', name: 'services', title: 'Services' },
          { id: 'style', name: 'style', title: 'Aesthetic' }, // NEW STEP ADDED HERE
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

    get totalSteps() {
      return this.steps.length;
    }

    _broadcastStep(stepIndex) {
      const stepDef = this.steps[stepIndex - 1];
      if (!stepDef) return;
      
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

    init() {
      this.checkDeepLink();
      this.checkDraftResumption();
      
      let savedStep = this.state.get('currentStep');
      this.currentStep = typeof savedStep === 'object' ? savedStep.index : (savedStep || 1);
      
      this._broadcastStep(this.currentStep);
      this.updateNavigationState();
    }

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

    canNavigateTo(stepId) {
      if (this.guards[stepId]) {
        return this.guards[stepId](this.state.getState());
      }
      return true;
    }

    addGuard(stepId, guard) {
      this.guards[stepId] = guard;
    }

    removeGuard(stepId) {
      delete this.guards[stepId];
    }

    updateNavigationState() {
      const canGoBack = this.currentStep > 1;
      const canProceed = this.currentStep < this.steps.length;
      
      this.state.setMany({
        'canGoBack': canGoBack,
        'canProceed': canProceed
      });
    }

    getStep(stepId) {
      return this.steps[stepId - 1] || null;
    }

    getCurrentStep() {
      return this.getStep(this.currentStep);
    }

    getAllSteps() {
      return [...this.steps];
    }

    checkDeepLink() {}
    checkDraftResumption() {}
    updateURL() {}

    reset() {
      this.currentStep = 1;
      this._broadcastStep(1);
      this.updateNavigationState();
    }
  }

  window.EstimatorRouter = Router;

})();