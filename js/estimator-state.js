/**
 * js/estimator-state.js
 * Estimator State Manager
 * 
 * Global state management for the estimator module.
 * Implements a centralized state store with subscription pattern.
 */

(function() {
  'use strict';

  class StateManager {
    constructor() {
      this.state = {
        currentStep: 1,
        totalSteps: 8,
        canProceed: false,
        canGoBack: false,
        
        projectCategory: null,
        projectType: null,
        projectInfo: {},
        
        selectedPackage: null,
        packageTier: null,
        
        budget: null,
        budgetRange: null,
        budgetType: 'known',
        
        rooms: [],
        roomCount: 0,
        
        selectedCustomServices: [],
        
        selectedModules: [],
        moduleCount: 0,
        
        clientDetails: {
          name: null,
          email: null,
          phone: null,
          city: null,
          notes: null
        },
        
        designStyle: null,
        materialTier: null,
        
        comparisonData: null,
        recommendations: [],
        
        validationStatus: {
          currentStep: false,
          overall: false
        },
        
        isDraft: false,
        draftId: null,
        lastSaved: null,
        
        calculations: {
          subtotal: 0,
          tax: 0,
          total: 0,
          breakdown: {}
        },
        
        ui: {
          isLoading: false,
          isSaving: false,
          error: null
        }
      };
      
      this.subscribers = [];
      this.history = [];
      this.historyIndex = -1;
    }

    getState() {
      return { ...this.state };
    }

    get(path) {
      // Safety check to prevent undefined 'split' crash
      if (!path || typeof path !== 'string') return undefined;
      
      const keys = path.split('.');
      let value = this.state;
      
      for (const key of keys) {
        if (value && typeof value === 'object') {
          value = value[key];
        } else {
          return undefined;
        }
      }
      
      return value;
    }

    set(path, value, notify = true) {
      // Safety check to prevent undefined 'split' crash
      if (!path || typeof path !== 'string') return;
      
      const keys = path.split('.');
      const lastKey = keys.pop();
      let target = this.state;
      
      for (const key of keys) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        target = target[key];
      }
      
      this.saveToHistory();
      
      target[lastKey] = value;
      
      if (notify) {
        this.notify();
      }
    }

    setMany(updates, notify = true) {
      this.saveToHistory();
      
      for (const [path, value] of Object.entries(updates)) {
        this.set(path, value, false);
      }
      
      if (notify) {
        this.notify();
      }
    }

    reset(notify = true) {
      this.saveToHistory();
      
      this.state = {
        currentStep: 1,
        totalSteps: 8,
        canProceed: false,
        canGoBack: false,
        projectCategory: null,
        projectType: null,
        projectInfo: {},
        selectedPackage: null,
        packageTier: null,
        budget: null,
        budgetRange: null,
        budgetType: 'known',
        rooms: [],
        roomCount: 0,
        selectedCustomServices: [],
        selectedModules: [],
        moduleCount: 0,
        clientDetails: {
          name: null,
          email: null,
          phone: null,
          city: null,
          notes: null
        },
        designStyle: null,
        materialTier: null,
        comparisonData: null,
        recommendations: [],
        validationStatus: {
          currentStep: false,
          overall: false
        },
        isDraft: false,
        draftId: null,
        lastSaved: null,
        calculations: {
          subtotal: 0,
          tax: 0,
          total: 0,
          breakdown: {}
        },
        ui: {
          isLoading: false,
          isSaving: false,
          error: null
        }
      };
      
      if (notify) {
        this.notify();
      }
    }

    subscribe(callback) {
      this.subscribers.push(callback);
      return () => {
        const index = this.subscribers.indexOf(callback);
        if (index > -1) {
          this.subscribers.splice(index, 1);
        }
      };
    }

    notify() {
      const state = this.getState();
      this.subscribers.forEach(callback => {
        try {
          callback(state);
        } catch (error) {
          console.error('State subscriber error:', error);
        }
      });
    }

    saveToHistory() {
      if (this.historyIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.historyIndex + 1);
      }
      
      this.history.push(JSON.stringify(this.state));
      this.historyIndex++;
      
      if (this.history.length > 50) {
        this.history.shift();
        this.historyIndex--;
      }
    }

    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.state = JSON.parse(this.history[this.historyIndex]);
        this.notify();
        return true;
      }
      return false;
    }

    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.state = JSON.parse(this.history[this.historyIndex]);
        this.notify();
        return true;
      }
      return false;
    }

    export() {
      return JSON.stringify(this.state);
    }

    import(serialized, notify = true) {
      try {
        this.saveToHistory();
        this.state = JSON.parse(serialized);
        if (notify) {
          this.notify();
        }
        return true;
      } catch (error) {
        console.error('State import error:', error);
        return false;
      }
    }
  }

  const stateManager = new StateManager();
  window.EstimatorState = stateManager;

})();