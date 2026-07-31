/**
 * js/estimator-router.js
 * Estimator Router
 * 
 * Handles navigation logic and dynamic branching 
 * between Standard and Custom Services flows.
 */

(function() {
  'use strict';

  class Router {
    constructor(stateManager) {
      this.state = stateManager;
      this.currentStepIndex = 0;
      this.currentFlow = [];
      
      // Standard full-interior flow (8 steps)
      this.standardFlow = [
        { id: '1', title: 'Category' },
        { id: '2', title: 'Type' },
        { id: '3', title: 'Information' },
        { id: '4', title: 'Requirements' },
        { id: '5', title: 'Style' },
        { id: '6', title: 'Package' },
        { id: '7', title: 'Budget' },
        { id: '8', title: 'Contact' }
      ];

      // A La Carte / Custom Services flow (5 steps)
      this.customFlow = [
        { id: '1', title: 'Category' },
        { id: 'custom_services_selection', title: 'Services' },
        { id: '5', title: 'Style' },
        { id: '7', title: 'Budget' },
        { id: '8', title: 'Contact' }
      ];
    }

    init() {
      this.updateFlow();
      this.navigate(0);
    }

    updateFlow() {
      const category = this.state.get('projectCategory');
      
      if (category === 'custom_services') {
        this.currentFlow = this.customFlow;
      } else {
        this.currentFlow = this.standardFlow;
      }
      
      // Keep UI total steps in sync
      this.totalSteps = this.currentFlow.length;
    }

    getAllSteps() {
      this.updateFlow();
      return this.currentFlow;
    }

    navigate(index) {
      if (index < 0 || index >= this.currentFlow.length) return;
      
      this.currentStepIndex = index;
      const step = this.currentFlow[this.currentStepIndex];
      
      // Update state so UI listens and renders the mapped step
      this.state.setMany({
        currentStep: step.id,
        canGoBack: this.currentStepIndex > 0,
        canProceed: false 
      });
    }

    next() {
      this.updateFlow();
      if (this.currentStepIndex < this.currentFlow.length - 1) {
        this.navigate(this.currentStepIndex + 1);
      }
    }

    previous() {
      this.updateFlow();
      if (this.currentStepIndex > 0) {
        this.navigate(this.currentStepIndex - 1);
      }
    }
  }

  window.EstimatorRouter = Router;

})();