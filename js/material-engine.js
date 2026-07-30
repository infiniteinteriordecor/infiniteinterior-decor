/**
 * Estimator Material Engine
 * 
 * Material selection and pricing engine.
 * Handles material tiers, pricing calculations, and recommendations.
 * 
 * Architecture:
 * - Purpose: Calculate material costs and recommendations
 * - Dependencies: helpers.js
 * - Exports: MaterialEngine class
 */

(function() {
  'use strict';

  /**
   * Material Engine Class
   * Manages material calculations and logic
   */
  class MaterialEngine {
    constructor() {
      // Material tiers
      this.tiers = {
        essential: { name: 'Essential', multiplier: 1.0 },
        premium: { name: 'Premium', multiplier: 1.3 },
        luxury: { name: 'Luxury', multiplier: 1.6 },
        elite: { name: 'Elite', multiplier: 2.0 }
      };
      
      // Material categories
      this.categories = {
        flooring: 'Flooring',
        walls: 'Walls',
        ceiling: 'Ceiling',
        furniture: 'Furniture',
        lighting: 'Lighting',
        accessories: 'Accessories',
        hardware: 'Hardware'
      };
      
      // Material data (will be loaded from JSON)
      this.materials = {};
    }

    /**
     * Initialize material engine
     * @param {Object} materialsData - Materials data from JSON
     */
    init(materialsData) {
      if (materialsData) {
        this.materials = materialsData;
      }
    }

    /**
     * Get material tier
     * @param {string} tierId - Tier ID
     * @returns {Object|null} Tier information
     */
    getTier(tierId) {
      return this.tiers[tierId] || null;
    }

    /**
     * Get all tiers
     * @returns {Array} Array of tiers
     */
    getAllTiers() {
      return Object.entries(this.tiers).map(([id, tier]) => ({
        id,
        ...tier
      }));
    }

    /**
     * Calculate material cost
     * @param {Object} material - Material object
     * @param {number} quantity - Quantity
     * @param {string} tierId - Tier ID
     * @returns {number} Calculated cost
     */
    calculateMaterialCost(material, quantity, tierId) {
      const tier = this.getTier(tierId);
      const multiplier = tier ? tier.multiplier : 1.0;
      
      return (material.basePrice * quantity * multiplier);
    }

    /**
     * Calculate total material cost
     * @param {Array} materials - Array of materials
     * @param {string} tierId - Tier ID
     * @returns {number} Total cost
     */
    calculateTotalMaterialCost(materials, tierId) {
      return materials.reduce((total, material) => {
        return total + this.calculateMaterialCost(material, material.quantity, tierId);
      }, 0);
    }

    /**
     * Get materials by category
     * @param {string} category - Category ID
     * @returns {Array} Array of materials
     */
    getMaterialsByCategory(category) {
      return Object.values(this.materials).filter(
        material => material.category === category
      );
    }

    /**
     * Get material by ID
     * @param {string} materialId - Material ID
     * @returns {Object|null} Material object
     */
    getMaterialById(materialId) {
      return this.materials[materialId] || null;
    }

    /**
     * Search materials
     * @param {string} query - Search query
     * @param {Object} filters - Filter criteria
     * @returns {Array} Array of matching materials
     */
    searchMaterials(query, filters = {}) {
      const results = Object.values(this.materials).filter(material => {
        // Search query
        if (query) {
          const searchLower = query.toLowerCase();
          const matchesName = material.name.toLowerCase().includes(searchLower);
          const matchesCategory = material.category.toLowerCase().includes(searchLower);
          
          if (!matchesName && !matchesCategory) {
            return false;
          }
        }
        
        // Apply filters
        if (filters.category && material.category !== filters.category) {
          return false;
        }
        
        if (filters.minPrice && material.basePrice < filters.minPrice) {
          return false;
        }
        
        if (filters.maxPrice && material.basePrice > filters.maxPrice) {
          return false;
        }
        
        return true;
      });
      
      return results;
    }

    /**
     * Get recommended materials
     * @param {Object} criteria - Recommendation criteria
     * @returns {Array} Array of recommended materials
     */
    getRecommendedMaterials(criteria) {
      // Placeholder for recommendation logic
      // Will be implemented with recommendation engine
      return [];
    }

    /**
     * Compare materials
     * @param {Array} materialIds - Array of material IDs
     * @returns {Object} Comparison data
     */
    compareMaterials(materialIds) {
      const materials = materialIds.map(id => this.getMaterialById(id)).filter(Boolean);
      
      return {
        materials,
        comparison: {
          priceRange: this.getPriceRange(materials),
          categories: this.getCategories(materials),
          features: this.getFeatures(materials)
        }
      };
    }

    /**
     * Get price range for materials
     * @param {Array} materials - Array of materials
     * @returns {Object} Price range
     */
    getPriceRange(materials) {
      const prices = materials.map(m => m.basePrice);
      
      return {
        min: Math.min(...prices),
        max: Math.max(...prices),
        average: prices.reduce((a, b) => a + b, 0) / prices.length
      };
    }

    /**
     * Get categories for materials
     * @param {Array} materials - Array of materials
     * @returns {Array} Array of categories
     */
    getCategories(materials) {
      const categories = [...new Set(materials.map(m => m.category))];
      return categories;
    }

    /**
     * Get features for materials
     * @param {Array} materials - Array of materials
     * @returns {Object} Features object
     */
    getFeatures(materials) {
      // Placeholder for feature comparison logic
      return {};
    }

    /**
     * Calculate tier upgrade cost
     * @param {string} fromTier - Source tier ID
     * @param {string} toTier - Target tier ID
     * @param {number} baseCost - Base cost
     * @returns {number} Upgrade cost
     */
    calculateTierUpgradeCost(fromTier, toTier, baseCost) {
      const fromMultiplier = this.getTier(fromTier)?.multiplier || 1.0;
      const toMultiplier = this.getTier(toTier)?.multiplier || 1.0;
      
      const fromCost = baseCost * fromMultiplier;
      const toCost = baseCost * toMultiplier;
      
      return toCost - fromCost;
    }

    /**
     * Get material breakdown
     * @param {Array} materials - Array of materials
     * @param {string} tierId - Tier ID
     * @returns {Object} Material breakdown
     */
    getMaterialBreakdown(materials, tierId) {
      const breakdown = {};
      
      materials.forEach(material => {
        const category = material.category;
        const cost = this.calculateMaterialCost(material, material.quantity, tierId);
        
        if (!breakdown[category]) {
          breakdown[category] = {
            category: this.categories[category] || category,
            materials: [],
            totalCost: 0
          };
        }
        
        breakdown[category].materials.push(material);
        breakdown[category].totalCost += cost;
      });
      
      return breakdown;
    }
  }

  // Export for use in other modules
  window.EstimatorMaterialEngine = MaterialEngine;

})();
