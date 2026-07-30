/**
 * Estimator State Manager
 * 
 * Global state management for the estimator module.
 * Implements a centralized state store with subscription pattern.
 * 
 * Architecture:
 * - Purpose: Single source of truth for all estimator data
 * - Dependencies: None (core module)
 * - Exports: StateManager class
 */

(function() {
  'use strict';

  /**
   * State Manager Class
   * Manages global application state with subscription pattern
   */
  class StateManager {
    constructor() {
      // Initial state structure
      this.state = {
        // Wizard navigation
        currentStep: 1,
        totalSteps: 8,
        canProceed: false,
        canGoBack: false,
        
        // Package selection
        selectedPackage: null,
        packageTier: null,
        
        // Budget
        budget: null,
        budgetRange: null,
        
        // Rooms
        rooms: [],
        roomCount: 0,
        
        // Modules
        selectedModules: [],
        moduleCount: 0,
        
        // Client details
        clientDetails: {
          name: null,
          email: null,
          phone: null,
          city: null,
          address: null
        },
        
        // Material tier
        materialTier: null,
        
        // Comparison data
        comparisonData: null,
        
        // Recommendations
        recommendations: [],
        
        // Validation status
        validationStatus: {
          currentStep: false,
          overall: false
        },
        
        // Draft status
        isDraft: false,
        draftId: null,
        lastSaved: null,
        
        // Calculation results
        calculations: {
          subtotal: 0,
          tax: 0,
          total: 0,
          breakdown: {}
        },
        
        // UI state
        ui: {
          isLoading: false,
          isSaving: false,
          error: null
        }
      };
      
      // Subscribers
      this.subscribers = [];
      
      // State history for undo functionality
      this.history = [];
      this.historyIndex = -1;
    }

    /**
     * Get current state
     * @returns {Object} Current state
     */
    getState() {
      return { ...this.state };
    }

    /**
     * Get specific state property
     * @param {string} path - Dot notation path to property
     * @returns {*} Property value
     */
    get(path) {
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

    /**
     * Set state property
     * @param {string} path - Dot notation path to property
     * @param {*} value - New value
     * @param {boolean} notify - Whether to notify subscribers
     */
    set(path, value, notify = true) {
      const keys = path.split('.');
      const lastKey = keys.pop();
      let target = this.state;
      
      for (const key of keys) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        target = target[key];
      }
      
      // Save to history before change
      this.saveToHistory();
      
      target[lastKey] = value;
      
      if (notify) {
        this.notify();
      }
    }

    /**
     * Set multiple state properties at once
     * @param {Object} updates - Object with path-value pairs
     * @param {boolean} notify - Whether to notify subscribers
     */
    setMany(updates, notify = true) {
      this.saveToHistory();
      
      for (const [path, value] of Object.entries(updates)) {
        this.set(path, value, false);
      }
      
      if (notify) {
        this.notify();
      }
    }

    /**
     * Reset state to initial values
     * @param {boolean} notify - Whether to notify subscribers
     */
    reset(notify = true) {
      this.saveToHistory();
      
      this.state = {
        currentStep: 1,
        totalSteps: 8,
        canProceed: false,
        canGoBack: false,
        selectedPackage: null,
        packageTier: null,
        budget: null,
        budgetRange: null,
        rooms: [],
        roomCount: 0,
        selectedModules: [],
        moduleCount: 0,
        clientDetails: {
          name: null,
          email: null,
          phone: null,
          city: null,
          address: null
        },
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

    /**
     * Subscribe to state changes
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    subscribe(callback) {
      this.subscribers.push(callback);
      
      // Return unsubscribe function
      return () => {
        const index = this.subscribers.indexOf(callback);
        if (index > -1) {
          this.subscribers.splice(index, 1);
        }
      };
    }

    /**
     * Notify all subscribers
     */
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

    /**
     * Save current state to history
     */
    saveToHistory() {
      // Remove any future history if we're not at the end
      if (this.historyIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.historyIndex + 1);
      }
      
      // Save current state
      this.history.push(JSON.stringify(this.state));
      this.historyIndex++;
      
      // Limit history size
      if (this.history.length > 50) {
        this.history.shift();
        this.historyIndex--;
      }
    }

    /**
     * Undo last state change
     * @returns {boolean} Success status
     */
    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.state = JSON.parse(this.history[this.historyIndex]);
        this.notify();
        return true;
      }
      return false;
    }

    /**
     * Redo last undone state change
     * @returns {boolean} Success status
     */
    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.state = JSON.parse(this.history[this.historyIndex]);
        this.notify();
        return true;
      }
      return false;
    }

    /**
     * Export state for persistence
     * @returns {Object} Serializable state
     */
    export() {
      return JSON.stringify(this.state);
    }

    /**
     * Import state from persistence
     * @param {string} serialized - Serialized state
     * @param {boolean} notify - Whether to notify subscribers
     */
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

  // Create singleton instance
  const stateManager = new StateManager();

  // Export for use in other modules
  window.EstimatorState = stateManager;

})();
