/**
 * Estimator Engine
 * 
 * Core calculation engine for estimator module.
 * Coordinates all sub-engines and handles business logic.
 * 
 * Architecture:
 * - Purpose: Core business logic and calculation coordination
 * - Dependencies: All other estimator modules
 * - Exports: EstimatorEngine class
 */

(function() {
  'use strict';

  /**
   * Estimator Engine Class
   * Core calculation and business logic engine
   */
  class EstimatorEngine {
    constructor(stateManager) {
      this.state = stateManager;
      
      // Sub-engines
      this.materialEngine = null;
      this.budgetEngine = null;
      this.recommendationEngine = null;
      this.comparisonEngine = null;
      this.pdfGenerator = null;
      this.storage = null;
      this.validation = null;
      this.packageEngine = null;
      this.moduleEngine = null;
      this.boqEngine = null;
      
      // Data
      this.materialsData = null;
      this.pricingRules = null;
      this.recommendationsData = null;
      this.upgradeRules = null;
    }

    /**
     * Initialize estimator engine
     * @returns {Promise<boolean>} Success status
     */
    async init() {
      try {
        // Initialize sub-engines
        this.materialEngine = new window.EstimatorMaterialEngine();
        this.budgetEngine = new window.EstimatorBudgetEngine();
        this.recommendationEngine = new window.EstimatorRecommendationEngine();
        this.comparisonEngine = new window.EstimatorComparisonEngine();
        this.storage = new window.EstimatorStorage();
        this.validation = new window.EstimatorValidation();
        this.packageEngine = new window.EstimatorPackageEngine();
        this.moduleEngine = new window.EstimatorModuleEngine();
        this.boqEngine = new window.EstimatorBOQEngine();
        
        // Initialize storage
        await this.storage.init();
        
        // Load data
        await this.loadData();
        
        // Initialize engines with data
        this.materialEngine.init(this.materialsData);
        this.budgetEngine.init(this.pricingRules);
        this.recommendationEngine.init(this.recommendationsData, this.upgradeRules);
        this.packageEngine.init(this.materialsData);
        
        // Initialize PDF generator with safe fallback
        try {
          this.pdfGenerator = new window.EstimatorPDFGenerator();
          await this.pdfGenerator.init();
        } catch (pdfError) {
          console.warn('PDF generator initialization failed, continuing without PDF functionality:', pdfError);
          this.pdfGenerator = null;
        }
        
        return true;
      } catch (error) {
        console.error('Estimator engine initialization error:', error);
        return false;
      }
    }

    /**
     * Load data from JSON files
     * @returns {Promise<void>}
     */
    async loadData() {
      try {
        // Load materials data
        this.materialsData = await this.loadJSON('../../data/estimator/materials.json');
        
        // Load pricing rules
        this.pricingRules = await this.loadJSON('../../data/estimator/pricing-rules.json');
        
        // Load recommendations
        this.recommendationsData = await this.loadJSON('../../data/estimator/recommendations.json');
        
        // Load upgrade rules
        this.upgradeRules = await this.loadJSON('../../data/estimator/upgrade-rules.json');
      } catch (error) {
        console.error('Data loading error:', error);
      }
    }

    /**
     * Load JSON file
     * @param {string} path - File path
     * @returns {Promise<Object>} JSON data
     */
    async loadJSON(path) {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Error loading ${path}:`, error);
        return {};
      }
    }

    /**
     * Calculate project estimate
     * @param {Object} data - Project data
     * @returns {Object} Calculation results
     */
    calculateEstimate(data) {
      const { selectedPackage, budget, rooms, selectedModules, materialTier } = data;
      
      // Generate package using package engine
      const packageData = this.packageEngine.generatePackage(data, selectedPackage || 'medium');
      
      // Calculate material costs
      const materialCosts = this.materialEngine.calculateTotalMaterialCost(
        rooms,
        materialTier
      );
      
      // Calculate component costs
      const componentCosts = this.budgetEngine.calculateComponentCosts(
        data,
        materialTier
      );
      
      // Calculate total estimate
      const estimate = this.budgetEngine.estimateProjectCost(data, materialTier);
      
      // Validate against budget
      const budgetValidation = this.budgetEngine.validateBudget(
        budget,
        estimate.total
      );
      
      // Generate BOQ for rooms
      const roomBOQ = this.boqEngine.generateProjectBOQ(rooms, materialTier);
      
      return {
        packageData,
        materialCosts,
        componentCosts,
        estimate,
        budgetValidation,
        roomBOQ
      };
    }

    /**
     * Generate package
     * @param {Object} projectData - Project data
     * @param {string} tierId - Tier ID
     * @returns {Object} Package data
     */
    generatePackage(projectData, tierId) {
      return this.packageEngine.generatePackage(projectData, tierId);
    }

    /**
     * Compare packages
     * @param {Object} projectData - Project data
     * @returns {Object} Package comparison
     */
    comparePackages(projectData) {
      return this.packageEngine.comparePackages(projectData);
    }

    /**
     * Calculate module cost
     * @param {string} moduleId - Module ID
     * @param {Object} specifications - Module specifications
     * @param {string} tier - Tier
     * @returns {Object} Module cost
     */
    calculateModule(moduleId, specifications, tier = 'medium') {
      return this.moduleEngine.calculateModuleCost(moduleId, specifications, tier);
    }

    /**
     * Calculate multiple modules
     * @param {Array} moduleRequests - Array of module requests
     * @returns {Object} Combined module costs
     */
    calculateModules(moduleRequests) {
      return this.moduleEngine.calculateMultipleModules(moduleRequests);
    }

    /**
     * Generate room BOQ
     * @param {string} roomId - Room ID
     * @param {Object} specifications - Room specifications
     * @param {string} tier - Tier
     * @returns {Object} Room BOQ
     */
    generateRoomBOQ(roomId, specifications, tier = 'medium') {
      return this.boqEngine.generateRoomBOQ(roomId, specifications, tier);
    }

    /**
     * Generate project BOQ
     * @param {Array} rooms - Array of room configurations
     * @param {string} tier - Tier
     * @returns {Object} Complete BOQ
     */
    generateProjectBOQ(rooms, tier = 'medium') {
      return this.boqEngine.generateProjectBOQ(rooms, tier);
    }

    /**
     * Optimize budget
     * @param {Object} data - Project data
     * @param {number} targetBudget - Target budget
     * @returns {Object} Optimization suggestions
     */
    optimizeBudget(data, targetBudget) {
      return this.budgetEngine.optimizeBudget(data, targetBudget);
    }

    /**
     * Get recommendations
     * @param {Object} context - User context
     * @returns {Array} Array of recommendations
     */
    getRecommendations(context) {
      return this.recommendationEngine.getRecommendations(context);
    }

    /**
     * Compare options
     * @param {string} type - Comparison type
     * @param {Array} options - Options to compare
     * @returns {Object} Comparison data
     */
    compareOptions(type, options) {
      switch (type) {
        case 'package':
          return this.comparisonEngine.comparePackages(options);
        case 'tier':
          return this.comparisonEngine.compareTiers(options, this.state.getState());
        case 'material':
          return this.comparisonEngine.compareMaterials(options);
        case 'module':
          return this.comparisonEngine.compareModules(options);
        default:
          return null;
      }
    }

    /**
     * Generate PDF
     * @param {string} type - PDF type
     * @param {Object} data - Data for PDF
     * @returns {Promise<Blob>} PDF blob
     */
    async generatePDF(type, data) {
      switch (type) {
        case 'quotation':
          return await this.pdfGenerator.generateQuotation(data);
        case 'boq':
          return await this.pdfGenerator.generateBOQ(data);
        case 'summary':
          return await this.pdfGenerator.generateSummary(data);
        case 'comparison':
          return await this.pdfGenerator.generateComparison(data);
        default:
          return null;
      }
    }

    /**
     * Save draft
     * @param {Object} data - Draft data
     * @returns {Promise<string>} Draft ID
     */
    async saveDraft(data) {
      return await this.storage.saveDraft(data);
    }

    /**
     * Load draft
     * @param {string} draftId - Draft ID
     * @returns {Promise<Object>} Draft data
     */
    async loadDraft(draftId) {
      return await this.storage.loadDraft(draftId);
    }

    /**
     * Delete draft
     * @param {string} draftId - Draft ID
     * @returns {Promise<boolean>} Success status
     */
    async deleteDraft(draftId) {
      return await this.storage.deleteDraft(draftId);
    }

    /**
     * List drafts
     * @returns {Promise<Array>} Array of drafts
     */
    async listDrafts() {
      return await this.storage.listDrafts();
    }

    /**
     * Validate step
     * @param {number} stepId - Step ID
     * @param {Object} data - Step data
     * @returns {Object} Validation result
     */
    validateStep(stepId, data) {
      return this.validation.validateStep(stepId, data);
    }

    /**
     * Validate field
     * @param {string} field - Field name
     * @param {*} value - Field value
     * @returns {Object} Validation result
     */
    validateField(field, value) {
      return this.validation.validateField(field, value);
    }

    /**
     * Get material tier information
     * @param {string} tierId - Tier ID
     * @returns {Object} Tier information
     */
    getMaterialTier(tierId) {
      return this.materialEngine.getTier(tierId);
    }

    /**
     * Get all material tiers
     * @returns {Array} Array of tiers
     */
    getAllMaterialTiers() {
      return this.materialEngine.getAllTiers();
    }

    /**
     * Get budget range information
     * @param {number} budget - Budget amount
     * @returns {Object} Range information
     */
    getBudgetRange(budget) {
      return this.budgetEngine.getBudgetRange(budget);
    }

    /**
     * Get all budget ranges
     * @returns {Array} Array of budget ranges
     */
    getAllBudgetRanges() {
      return this.budgetEngine.getAllBudgetRanges();
    }

    /**
     * Reset estimator
     */
    reset() {
      this.state.reset();
    }

    /**
     * Get engine status
     * @returns {Object} Engine status
     */
    getStatus() {
      return {
        initialized: true,
        dataLoaded: {
          materials: !!this.materialsData,
          pricingRules: !!this.pricingRules,
          recommendations: !!this.recommendationsData,
          upgradeRules: !!this.upgradeRules
        },
        storageReady: !!this.storage,
        pdfReady: !!this.pdfGenerator
      };
    }
  }

  // Export for use in other modules
  window.EstimatorEngine = EstimatorEngine;

})();
