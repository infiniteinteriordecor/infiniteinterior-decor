/**
 * Estimator Budget Engine
 * 
 * Budget calculation and management engine.
 * Handles budget ranges, cost calculations, and budget validation.
 * 
 * Architecture:
 * - Purpose: Calculate and manage project budgets
 * - Dependencies: helpers.js, material-engine.js
 * - Exports: BudgetEngine class
 */

(function() {
  'use strict';

  /**
   * Budget Engine Class
   * Manages budget calculations and logic
   */
  class BudgetEngine {
    constructor() {
      // Budget ranges
      this.ranges = {
        economy: { min: 500000, max: 1500000, name: 'Economy' },
        standard: { min: 1500000, max: 3000000, name: 'Standard' },
        premium: { min: 3000000, max: 6000000, name: 'Premium' },
        luxury: { min: 6000000, max: 10000000, name: 'Luxury' },
        elite: { min: 10000000, max: Infinity, name: 'Elite' }
      };
      
      // Cost components
      this.components = {
        materials: 'Materials',
        labor: 'Labor',
        design: 'Design',
        installation: 'Installation',
        contingency: 'Contingency',
        taxes: 'Taxes'
      };
      
      // Pricing rules (will be loaded from JSON)
      this.pricingRules = {};
    }

    /**
     * Initialize budget engine
     * @param {Object} pricingRules - Pricing rules from JSON
     */
    init(pricingRules) {
      if (pricingRules) {
        this.pricingRules = pricingRules;
      }
    }

    /**
     * Get budget range
     * @param {number} budget - Budget amount
     * @returns {Object|null} Range information
     */
    getBudgetRange(budget) {
      for (const [id, range] of Object.entries(this.ranges)) {
        if (budget >= range.min && budget <= range.max) {
          return { id, ...range };
        }
      }
      
      return null;
    }

    /**
     * Get all budget ranges
     * @returns {Array} Array of budget ranges
     */
    getAllBudgetRanges() {
      return Object.entries(this.ranges).map(([id, range]) => ({
        id,
        ...range
      }));
    }

    /**
     * Calculate total cost
     * @param {Object} components - Cost components
     * @returns {number} Total cost
     */
    calculateTotalCost(components) {
      return Object.values(components).reduce((total, cost) => total + cost, 0);
    }

    /**
     * Calculate component costs
     * @param {Object} data - Project data
     * @param {string} tierId - Material tier ID
     * @returns {Object} Component costs
     */
    calculateComponentCosts(data, tierId) {
      // Placeholder for component cost calculation
      // Will be implemented with pricing rules
      return {
        materials: 0,
        labor: 0,
        design: 0,
        installation: 0,
        contingency: 0,
        taxes: 0
      };
    }

    /**
     * Calculate contingency
     * @param {number} baseCost - Base cost
     * @param {number} percentage - Contingency percentage
     * @returns {number} Contingency amount
     */
    calculateContingency(baseCost, percentage = 10) {
      return (baseCost * percentage) / 100;
    }

    /**
     * Calculate taxes
     * @param {number} baseCost - Base cost
     * @param {number} taxRate - Tax rate percentage
     * @returns {number} Tax amount
     */
    calculateTaxes(baseCost, taxRate = 18) {
      return (baseCost * taxRate) / 100;
    }

    /**
     * Validate budget
     * @param {number} budget - Budget amount
     * @param {number} estimatedCost - Estimated cost
     * @returns {Object} Validation result
     */
    validateBudget(budget, estimatedCost) {
      const difference = budget - estimatedCost;
      const percentage = (difference / budget) * 100;
      
      return {
        valid: estimatedCost <= budget,
        withinRange: percentage >= -10 && percentage <= 10,
        difference,
        percentage
      };
    }

    /**
     * Get budget recommendations
     * @param {Object} data - Project data
     * @returns {Array} Array of recommendations
     */
    getBudgetRecommendations(data) {
      // Placeholder for budget recommendation logic
      // Will be implemented with recommendation engine
      return [];
    }

    /**
     * Optimize budget with reverse budgeting
     * @param {Object} data - Project data
     * @param {number} targetBudget - Target budget
     * @returns {Object} Optimization suggestions
     */
    optimizeBudget(data, targetBudget) {
      // Reverse budgeting calculation
      const breakdown = this.calculateReverseBudgetBreakdown(targetBudget);
      
      // Check if feasible
      const estimatedCost = this.estimateProjectCost(data, 'medium');
      const isFeasible = estimatedCost.total <= targetBudget;
      
      if (!isFeasible) {
        return {
          feasible: false,
          message: 'Target budget is insufficient for this project scope',
          shortfall: estimatedCost.total - targetBudget,
          suggestions: this.getBudgetAdjustmentSuggestions(data, targetBudget, estimatedCost.total),
          breakdown
        };
      }
      
      // Generate optimization suggestions
      return {
        feasible: true,
        message: 'Target budget is feasible',
        remaining: targetBudget - estimatedCost.total,
        suggestions: this.getOptimizationSuggestions(data, targetBudget),
        breakdown,
        optimizedCost: estimatedCost.total,
        savings: targetBudget - estimatedCost.total
      };
    }

    /**
     * Calculate reverse budget breakdown
     * @param {number} targetBudget - Target budget
     * @returns {Object} Budget breakdown
     */
    calculateReverseBudgetBreakdown(targetBudget) {
      // Remove GST first
      const beforeGST = targetBudget / (1 + (this.gstRate / 100));
      const gst = targetBudget - beforeGST;
      
      // Remove company margin (20% standard)
      const beforeMargin = beforeGST / 1.20;
      const companyMargin = beforeGST - beforeMargin;
      
      // Remove design fee (5%)
      const beforeDesign = beforeMargin / 1.05;
      const designFee = beforeMargin - beforeDesign;
      
      // Remove contingency (10%)
      const beforeContingency = beforeDesign / 1.10;
      const contingency = beforeDesign - beforeContingency;
      
      // Remaining is for materials + labor + installation
      const executionCost = beforeContingency;
      
      // Split execution cost
      const materialLimit = executionCost * 0.55; // 55% materials
      const laborLimit = executionCost * 0.30; // 30% labor
      const installationLimit = executionCost * 0.15; // 15% installation
      
      return {
        targetBudget,
        gst,
        companyMargin,
        designFee,
        contingency,
        executionCost,
        materialLimit,
        laborLimit,
        installationLimit,
        percentages: {
          gst: this.gstRate,
          companyMargin: 20,
          designFee: 5,
          contingency: 10,
          materials: 55,
          labor: 30,
          installation: 15
        }
      };
    }

    /**
     * Get budget adjustment suggestions
     * @param {Object} data - Project data
     * @param {number} targetBudget - Target budget
     * @param {number} estimatedCost - Estimated cost
     * @returns {Array} Suggestions
     */
    getBudgetAdjustmentSuggestions(data, targetBudget, estimatedCost) {
      const shortfall = estimatedCost - targetBudget;
      const suggestions = [];
      
      // Suggest reducing scope
      if (data.rooms && data.rooms.length > 3) {
        suggestions.push({
          type: 'reduce_scope',
          description: 'Reduce number of rooms to fit budget',
          potentialSavings: shortfall * 0.3
        });
      }
      
      // Suggest lower tier
      suggestions.push({
        type: 'lower_tier',
        description: 'Select Basic or Medium package instead of Premium',
        potentialSavings: shortfall * 0.4
      });
      
      // Suggest reducing area
      if (data.projectInfo && data.projectInfo.area > 500) {
        suggestions.push({
          type: 'reduce_area',
          description: 'Consider reducing project area',
          potentialSavings: shortfall * 0.2
        });
      }
      
      return suggestions;
    }

    /**
     * Get optimization suggestions
     * @param {Object} data - Project data
     * @param {number} targetBudget - Target budget
     * @returns {Array} Suggestions
     */
    getOptimizationSuggestions(data, targetBudget) {
      const suggestions = [];
      
      // Suggest premium upgrades if budget allows
      suggestions.push({
        type: 'upgrade_materials',
        description: 'Consider upgrading to Premium materials for better durability',
        impact: '+15% durability, +20% lifespan'
      });
      
      // Suggest smart home integration
      suggestions.push({
        type: 'smart_automation',
        description: 'Add smart home automation for modern convenience',
        impact: '+10% convenience, +5% property value'
      });
      
      // Suggest additional features
      suggestions.push({
        type: 'additional_features',
        description: 'Add premium lighting or custom furniture',
        impact: 'Enhanced aesthetics and functionality'
      });
      
      return suggestions;
    }

    /**
     * Get cost breakdown
     * @param {Object} components - Cost components
     * @returns {Object} Cost breakdown with percentages
     */
    getCostBreakdown(components) {
      const total = this.calculateTotalCost(components);
      const breakdown = {};
      
      for (const [key, value] of Object.entries(components)) {
        breakdown[key] = {
          name: this.components[key] || key,
          cost: value,
          percentage: total > 0 ? (value / total) * 100 : 0
        };
      }
      
      return breakdown;
    }

    /**
     * Estimate project cost
     * @param {Object} data - Project data
     * @param {string} tierId - Material tier ID
     * @returns {Object} Cost estimate
     */
    estimateProjectCost(data, tierId) {
      const components = this.calculateComponentCosts(data, tierId);
      const subtotal = this.calculateTotalCost(components);
      const contingency = this.calculateContingency(subtotal);
      const taxes = this.calculateTaxes(subtotal + contingency);
      const total = subtotal + contingency + taxes;
      
      return {
        components,
        subtotal,
        contingency,
        taxes,
        total
      };
    }

    /**
     * Compare budget options
     * @param {Object} data - Project data
     * @returns {Object} Comparison data
     */
    compareBudgetOptions(data) {
      const tiers = ['essential', 'premium', 'luxury', 'elite'];
      const comparisons = {};
      
      tiers.forEach(tierId => {
        const estimate = this.estimateProjectCost(data, tierId);
        comparisons[tierId] = estimate;
      });
      
      return comparisons;
    }

    /**
     * Get budget status
     * @param {number} budget - Budget amount
     * @param {number} estimatedCost - Estimated cost
     * @returns {string} Budget status
     */
    getBudgetStatus(budget, estimatedCost) {
      const validation = this.validateBudget(budget, estimatedCost);
      
      if (validation.valid && validation.withinRange) {
        return 'on-track';
      } else if (validation.valid) {
        return 'under-budget';
      } else {
        return 'over-budget';
      }
    }
  }

  // Export for use in other modules
  window.EstimatorBudgetEngine = BudgetEngine;

})();
