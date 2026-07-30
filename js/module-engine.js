/**
 * Estimator Module Engine
 * 
 * Independent module calculation engine.
 * Handles Kitchen, Wardrobe, TV Unit, Bedroom, False Ceiling, Bathroom, Vanity, Furniture modules independently.
 * 
 * Architecture:
 * - Purpose: Calculate costs for independent modules
 * - Dependencies: helpers.js, material-engine.js
 * - Exports: ModuleEngine class
 */

(function() {
  'use strict';

  /**
   * Module Engine Class
   * Manages independent module calculations
   */
  class ModuleEngine {
    constructor() {
      // Module types
      this.modules = {
        kitchen: { id: 'kitchen', name: 'Kitchen', baseRate: 1200 },
        wardrobe: { id: 'wardrobe', name: 'Wardrobe', baseRate: 800 },
        tv_unit: { id: 'tv_unit', name: 'TV Unit', baseRate: 600 },
        bedroom: { id: 'bedroom', name: 'Bedroom', baseRate: 1000 },
        false_ceiling: { id: 'false_ceiling', name: 'False Ceiling', baseRate: 150 },
        bathroom: { id: 'bathroom', name: 'Bathroom', baseRate: 900 },
        vanity: { id: 'vanity', name: 'Vanity', baseRate: 500 },
        furniture: { id: 'furniture', name: 'Furniture', baseRate: 700 }
      };

      // Module components
      this.components = {
        materials: 'Materials',
        hardware: 'Hardware',
        labor: 'Labor',
        installation: 'Installation'
      };
    }

    /**
     * Initialize module engine
     */
    init() {
      // Placeholder for initialization logic
    }

    /**
     * Calculate module cost
     * @param {string} moduleId - Module ID
     * @param {Object} specifications - Module specifications
     * @param {string} tier - Tier (basic, medium, premium)
     * @returns {Object} Module cost breakdown
     */
    calculateModuleCost(moduleId, specifications, tier = 'medium') {
      const module = this.modules[moduleId];
      if (!module) {
        throw new Error(`Invalid module ID: ${moduleId}`);
      }

      const tierMultiplier = this.getTierMultiplier(tier);
      const area = specifications.area || 0;
      const length = specifications.length || 0;
      const width = specifications.width || 0;

      // Calculate base cost
      let baseCost = 0;
      if (moduleId === 'false_ceiling') {
        baseCost = area * module.baseRate * tierMultiplier;
      } else if (moduleId === 'tv_unit') {
        baseCost = length * module.baseRate * tierMultiplier;
      } else if (moduleId === 'vanity') {
        baseCost = module.baseRate * tierMultiplier;
      } else {
        baseCost = area * module.baseRate * tierMultiplier;
      }

      // Calculate component costs
      const components = this.calculateModuleComponents(baseCost, moduleId, tier);

      return {
        moduleId,
        moduleName: module.name,
        tier,
        specifications,
        baseCost,
        components,
        subtotal: Object.values(components).reduce((sum, val) => sum + val, 0),
        gst: 0,
        total: 0
      };
    }

    /**
     * Get tier multiplier
     * @param {string} tier - Tier ID
     * @returns {number} Multiplier
     */
    getTierMultiplier(tier) {
      const multipliers = {
        basic: 1.0,
        medium: 1.4,
        premium: 2.0
      };
      return multipliers[tier] || 1.4;
    }

    /**
     * Calculate module components
     * @param {number} baseCost - Base cost
     * @param {string} moduleId - Module ID
     * @param {string} tier - Tier ID
     * @returns {Object} Component costs
     */
    calculateModuleComponents(baseCost, moduleId, tier) {
      // Component percentages based on module type
      const percentages = {
        kitchen: { materials: 0.50, hardware: 0.15, labor: 0.25, installation: 0.10 },
        wardrobe: { materials: 0.55, hardware: 0.20, labor: 0.20, installation: 0.05 },
        tv_unit: { materials: 0.60, hardware: 0.15, labor: 0.20, installation: 0.05 },
        bedroom: { materials: 0.45, hardware: 0.10, labor: 0.35, installation: 0.10 },
        false_ceiling: { materials: 0.40, hardware: 0.05, labor: 0.40, installation: 0.15 },
        bathroom: { materials: 0.50, hardware: 0.15, labor: 0.25, installation: 0.10 },
        vanity: { materials: 0.55, hardware: 0.20, labor: 0.20, installation: 0.05 },
        furniture: { materials: 0.70, hardware: 0.10, labor: 0.15, installation: 0.05 }
      };

      const modulePercentages = percentages[moduleId] || percentages.kitchen;

      // Calculate component costs
      const components = {};
      for (const [key, percentage] of Object.entries(modulePercentages)) {
        components[key] = baseCost * percentage;
      }

      return components;
    }

    /**
     * Calculate kitchen module
     * @param {Object} specifications - Kitchen specifications
     * @param {string} tier - Tier
     * @returns {Object} Kitchen module
     */
    calculateKitchen(specifications, tier = 'medium') {
      const baseCost = this.calculateModuleCost('kitchen', specifications, tier);
      
      return {
        ...baseCost,
        items: this.getKitchenItems(specifications, tier),
        features: this.getKitchenFeatures(specifications, tier)
      };
    }

    /**
     * Get kitchen items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Kitchen items
     */
    getKitchenItems(specifications, tier) {
      const items = {
        basic: [
          { name: 'Base Cabinets', unit: 'linear_ft', qty: specifications.cabinetLength || 10 },
          { name: 'Wall Cabinets', unit: 'linear_ft', qty: specifications.wallCabinetLength || 8 },
          { name: 'Countertop', unit: 'sqft', qty: specifications.countertopArea || 20 },
          { name: 'Sink', unit: 'piece', qty: 1 },
          { name: 'Faucet', unit: 'piece', qty: 1 }
        ],
        medium: [
          { name: 'Base Cabinets', unit: 'linear_ft', qty: specifications.cabinetLength || 10 },
          { name: 'Wall Cabinets', unit: 'linear_ft', qty: specifications.wallCabinetLength || 8 },
          { name: 'Countertop', unit: 'sqft', qty: specifications.countertopArea || 20 },
          { name: 'Sink', unit: 'piece', qty: 1 },
          { name: 'Faucet', unit: 'piece', qty: 1 },
          { name: 'Chimney', unit: 'piece', qty: 1 },
          { name: 'Modular Drawers', unit: 'piece', qty: 4 }
        ],
        premium: [
          { name: 'Base Cabinets', unit: 'linear_ft', qty: specifications.cabinetLength || 10 },
          { name: 'Wall Cabinets', unit: 'linear_ft', qty: specifications.wallCabinetLength || 8 },
          { name: 'Countertop', unit: 'sqft', qty: specifications.countertopArea || 20 },
          { name: 'Sink', unit: 'piece', qty: 1 },
          { name: 'Faucet', unit: 'piece', qty: 1 },
          { name: 'Chimney', unit: 'piece', qty: 1 },
          { name: 'Modular Drawers', unit: 'piece', qty: 6 },
          { name: 'Tall Unit', unit: 'piece', qty: 1 },
          { name: 'Corner Unit', unit: 'piece', qty: 1 }
        ]
      };
      return items[tier] || items.medium;
    }

    /**
     * Get kitchen features
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Features
     */
    getKitchenFeatures(specifications, tier) {
      const features = {
        basic: ['Standard hardware', 'Basic lighting', 'Standard finish'],
        medium: ['Soft-close hardware', 'Premium lighting', 'Satin finish', 'Pull-out baskets'],
        premium: ['Premium soft-close hardware', 'Smart lighting', 'Gloss finish', 'Tandem pull-outs', 'Magic corners']
      };
      return features[tier] || features.medium;
    }

    /**
     * Calculate wardrobe module
     * @param {Object} specifications - Wardrobe specifications
     * @param {string} tier - Tier
     * @returns {Object} Wardrobe module
     */
    calculateWardrobe(specifications, tier = 'medium') {
      const baseCost = this.calculateModuleCost('wardrobe', specifications, tier);
      
      return {
        ...baseCost,
        items: this.getWardrobeItems(specifications, tier),
        features: this.getWardrobeFeatures(specifications, tier)
      };
    }

    /**
     * Get wardrobe items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Wardrobe items
     */
    getWardrobeItems(specifications, tier) {
      const items = {
        basic: [
          { name: 'Shelves', unit: 'sqft', qty: specifications.shelfArea || 20 },
          { name: 'Hangers', unit: 'piece', qty: 12 },
          { name: 'Drawers', unit: 'piece', qty: 2 }
        ],
        medium: [
          { name: 'Shelves', unit: 'sqft', qty: specifications.shelfArea || 20 },
          { name: 'Hangers', unit: 'piece', qty: 12 },
          { name: 'Drawers', unit: 'piece', qty: 4 },
          { name: 'Tie Rack', unit: 'piece', qty: 1 }
        ],
        premium: [
          { name: 'Shelves', unit: 'sqft', qty: specifications.shelfArea || 20 },
          { name: 'Hangers', unit: 'piece', qty: 12 },
          { name: 'Drawers', unit: 'piece', qty: 6 },
          { name: 'Tie Rack', unit: 'piece', qty: 1 },
          { name: 'Shoe Rack', unit: 'piece', qty: 1 },
          { name: 'LED Lighting', unit: 'piece', qty: 1 }
        ]
      };
      return items[tier] || items.medium;
    }

    /**
     * Get wardrobe features
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Features
     */
    getWardrobeFeatures(specifications, tier) {
      const features = {
        basic: ['Standard hinges', 'Basic slides', 'Standard handles'],
        medium: ['Soft-close hinges', '100% extension slides', 'Premium handles'],
        premium: ['Soft-close plus hinges', 'Heavy-duty slides', 'Brass handles', 'LED interior lighting']
      };
      return features[tier] || features.medium;
    }

    /**
     * Calculate TV unit module
     * @param {Object} specifications - TV unit specifications
     * @param {string} tier - Tier
     * @returns {Object} TV unit module
     */
    calculateTVUnit(specifications, tier = 'medium') {
      const baseCost = this.calculateModuleCost('tv_unit', specifications, tier);
      
      return {
        ...baseCost,
        items: this.getTVUnitItems(specifications, tier),
        features: this.getTVUnitFeatures(specifications, tier)
      };
    }

    /**
     * Get TV unit items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} TV unit items
     */
    getTVUnitItems(specifications, tier) {
      const items = {
        basic: [
          { name: 'TV Cabinet', unit: 'linear_ft', qty: specifications.length || 8 },
          { name: 'Shelves', unit: 'piece', qty: 2 }
        ],
        medium: [
          { name: 'TV Cabinet', unit: 'linear_ft', qty: specifications.length || 8 },
          { name: 'Shelves', unit: 'piece', qty: 3 },
          { name: 'Drawers', unit: 'piece', qty: 2 }
        ],
        premium: [
          { name: 'TV Cabinet', unit: 'linear_ft', qty: specifications.length || 8 },
          { name: 'Shelves', unit: 'piece', qty: 4 },
          { name: 'Drawers', unit: 'piece', qty: 3 },
          { name: 'LED Backlight', unit: 'piece', qty: 1 }
        ]
      };
      return items[tier] || items.medium;
    }

    /**
     * Get TV unit features
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Features
     */
    getTVUnitFeatures(specifications, tier) {
      const features = {
        basic: ['Standard finish', 'Basic hardware'],
        medium: ['Premium finish', 'Soft-close drawers'],
        premium: ['Luxury finish', 'Soft-close plus drawers', 'LED backlighting', 'Cable management']
      };
      return features[tier] || features.medium;
    }

    /**
     * Calculate bedroom module
     * @param {Object} specifications - Bedroom specifications
     * @param {string} tier - Tier
     * @returns {Object} Bedroom module
     */
    calculateBedroom(specifications, tier = 'medium') {
      const baseCost = this.calculateModuleCost('bedroom', specifications, tier);
      
      return {
        ...baseCost,
        items: this.getBedroomItems(specifications, tier),
        features: this.getBedroomFeatures(specifications, tier)
      };
    }

    /**
     * Get bedroom items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Bedroom items
     */
    getBedroomItems(specifications, tier) {
      const items = {
        basic: [
          { name: 'Bed Frame', unit: 'piece', qty: 1 },
          { name: 'Side Tables', unit: 'piece', qty: 2 },
          { name: 'Wardrobe', unit: 'sqft', qty: specifications.wardrobeArea || 40 }
        ],
        medium: [
          { name: 'Bed Frame', unit: 'piece', qty: 1 },
          { name: 'Side Tables', unit: 'piece', qty: 2 },
          { name: 'Wardrobe', unit: 'sqft', qty: specifications.wardrobeArea || 40 },
          { name: 'Dressing Table', unit: 'piece', qty: 1 }
        ],
        premium: [
          { name: 'Bed Frame', unit: 'piece', qty: 1 },
          { name: 'Side Tables', unit: 'piece', qty: 2 },
          { name: 'Wardrobe', unit: 'sqft', qty: specifications.wardrobeArea || 40 },
          { name: 'Dressing Table', unit: 'piece', qty: 1 },
          { name: 'TV Unit', unit: 'linear_ft', qty: 6 },
          { name: 'Study Table', unit: 'piece', qty: 1 }
        ]
      };
      return items[tier] || items.medium;
    }

    /**
     * Get bedroom features
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Features
     */
    getBedroomFeatures(specifications, tier) {
      const features = {
        basic: ['Standard finish', 'Basic lighting'],
        medium: ['Premium finish', 'LED lighting', 'Soft-close hardware'],
        premium: ['Luxury finish', 'Smart lighting', 'Premium hardware', 'False ceiling']
      };
      return features[tier] || features.medium;
    }

    /**
     * Calculate false ceiling module
     * @param {Object} specifications - False ceiling specifications
     * @param {string} tier - Tier
     * @returns {Object} False ceiling module
     */
    calculateFalseCeiling(specifications, tier = 'medium') {
      const baseCost = this.calculateModuleCost('false_ceiling', specifications, tier);
      
      return {
        ...baseCost,
        items: this.getFalseCeilingItems(specifications, tier),
        features: this.getFalseCeilingFeatures(specifications, tier)
      };
    }

    /**
     * Get false ceiling items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} False ceiling items
     */
    getFalseCeilingItems(specifications, tier) {
      const items = {
        basic: [
          { name: 'Gypsum Board', unit: 'sqft', qty: specifications.area || 100 },
          { name: 'LED Panel', unit: 'piece', qty: 2 }
        ],
        medium: [
          { name: 'Gypsum Board', unit: 'sqft', qty: specifications.area || 100 },
          { name: 'LED Panel', unit: 'piece', qty: 4 },
          { name: 'Cove Lighting', unit: 'linear_ft', qty: specifications.perimeter || 40 }
        ],
        premium: [
          { name: 'Gypsum Board', unit: 'sqft', qty: specifications.area || 100 },
          { name: 'LED Panel', unit: 'piece', qty: 6 },
          { name: 'Cove Lighting', unit: 'linear_ft', qty: specifications.perimeter || 40 },
          { name: 'Acoustic Panels', unit: 'sqft', qty: specifications.acousticArea || 20 }
        ]
      };
      return items[tier] || items.medium;
    }

    /**
     * Get false ceiling features
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Features
     */
    getFalseCeilingFeatures(specifications, tier) {
      const features = {
        basic: ['Standard design', 'Basic lighting'],
        medium: ['Cove design', 'Premium lighting', 'Dimmer control'],
        premium: ['Complex design', 'Smart lighting', 'Acoustic treatment', 'Hidden wiring']
      };
      return features[tier] || features.medium;
    }

    /**
     * Calculate bathroom module
     * @param {Object} specifications - Bathroom specifications
     * @param {string} tier - Tier
     * @returns {Object} Bathroom module
     */
    calculateBathroom(specifications, tier = 'medium') {
      const baseCost = this.calculateModuleCost('bathroom', specifications, tier);
      
      return {
        ...baseCost,
        items: this.getBathroomItems(specifications, tier),
        features: this.getBathroomFeatures(specifications, tier)
      };
    }

    /**
     * Get bathroom items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Bathroom items
     */
    getBathroomItems(specifications, tier) {
      const items = {
        basic: [
          { name: 'WC', unit: 'piece', qty: 1 },
          { name: 'Wash Basin', unit: 'piece', qty: 1 },
          { name: 'Faucet', unit: 'piece', qty: 1 },
          { name: 'Shower', unit: 'piece', qty: 1 }
        ],
        medium: [
          { name: 'WC', unit: 'piece', qty: 1 },
          { name: 'Wash Basin', unit: 'piece', qty: 1 },
          { name: 'Faucet', unit: 'piece', qty: 1 },
          { name: 'Shower', unit: 'piece', qty: 1 },
          { name: 'Mirror', unit: 'piece', qty: 1 },
          { name: 'Vanity', unit: 'piece', qty: 1 }
        ],
        premium: [
          { name: 'WC', unit: 'piece', qty: 1 },
          { name: 'Wash Basin', unit: 'piece', qty: 1 },
          { name: 'Faucet', unit: 'piece', qty: 1 },
          { name: 'Rain Shower', unit: 'piece', qty: 1 },
          { name: 'Mirror', unit: 'piece', qty: 1 },
          { name: 'Vanity', unit: 'piece', qty: 1 },
          { name: 'Exhaust Fan', unit: 'piece', qty: 1 }
        ]
      };
      return items[tier] || items.medium;
    }

    /**
     * Get bathroom features
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Features
     */
    getBathroomFeatures(specifications, tier) {
      const features = {
        basic: ['Standard fixtures', 'Basic tiles'],
        medium: ['Premium fixtures', 'Premium tiles', 'Mirror cabinet'],
        premium: ['Luxury fixtures', 'Luxury tiles', 'Smart mirror', 'Rain shower system']
      };
      return features[tier] || features.medium;
    }

    /**
     * Calculate vanity module
     * @param {Object} specifications - Vanity specifications
     * @param {string} tier - Tier
     * @returns {Object} Vanity module
     */
    calculateVanity(specifications, tier = 'medium') {
      const baseCost = this.calculateModuleCost('vanity', specifications, tier);
      
      return {
        ...baseCost,
        items: this.getVanityItems(specifications, tier),
        features: this.getVanityFeatures(specifications, tier)
      };
    }

    /**
     * Get vanity items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Vanity items
     */
    getVanityItems(specifications, tier) {
      const items = {
        basic: [
          { name: 'Vanity Cabinet', unit: 'piece', qty: 1 },
          { name: 'Basin', unit: 'piece', qty: 1 },
          { name: 'Faucet', unit: 'piece', qty: 1 }
        ],
        medium: [
          { name: 'Vanity Cabinet', unit: 'piece', qty: 1 },
          { name: 'Basin', unit: 'piece', qty: 1 },
          { name: 'Faucet', unit: 'piece', qty: 1 },
          { name: 'Mirror', unit: 'piece', qty: 1 },
          { name: 'Drawers', unit: 'piece', qty: 2 }
        ],
        premium: [
          { name: 'Vanity Cabinet', unit: 'piece', qty: 1 },
          { name: 'Basin', unit: 'piece', qty: 1 },
          { name: 'Premium Faucet', unit: 'piece', qty: 1 },
          { name: 'LED Mirror', unit: 'piece', qty: 1 },
          { name: 'Drawers', unit: 'piece', qty: 3 }
        ]
      };
      return items[tier] || items.medium;
    }

    /**
     * Get vanity features
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Features
     */
    getVanityFeatures(specifications, tier) {
      const features = {
        basic: ['Standard finish', 'Basic hardware'],
        medium: ['Premium finish', 'Soft-close drawers'],
        premium: ['Luxury finish', 'Soft-close plus drawers', 'LED mirror', 'Premium hardware']
      };
      return features[tier] || features.medium;
    }

    /**
     * Calculate furniture module
     * @param {Object} specifications - Furniture specifications
     * @param {string} tier - Tier
     * @returns {Object} Furniture module
     */
    calculateFurniture(specifications, tier = 'medium') {
      const baseCost = this.calculateModuleCost('furniture', specifications, tier);
      
      return {
        ...baseCost,
        items: this.getFurnitureItems(specifications, tier),
        features: this.getFurnitureFeatures(specifications, tier)
      };
    }

    /**
     * Get furniture items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Furniture items
     */
    getFurnitureItems(specifications, tier) {
      const items = {
        basic: [
          { name: 'Sofa Set', unit: 'piece', qty: 1 },
          { name: 'Coffee Table', unit: 'piece', qty: 1 },
          { name: 'Dining Table', unit: 'piece', qty: 1 }
        ],
        medium: [
          { name: 'Sofa Set', unit: 'piece', qty: 1 },
          { name: 'Coffee Table', unit: 'piece', qty: 1 },
          { name: 'Dining Table', unit: 'piece', qty: 1 },
          { name: 'Dining Chairs', unit: 'piece', qty: 6 },
          { name: 'TV Unit', unit: 'piece', qty: 1 }
        ],
        premium: [
          { name: 'Luxury Sofa Set', unit: 'piece', qty: 1 },
          { name: 'Coffee Table', unit: 'piece', qty: 1 },
          { name: 'Dining Table', unit: 'piece', qty: 1 },
          { name: 'Dining Chairs', unit: 'piece', qty: 6 },
          { name: 'TV Unit', unit: 'piece', qty: 1 },
          { name: 'Accent Chairs', unit: 'piece', qty: 2 },
          { name: 'Console Table', unit: 'piece', qty: 1 }
        ]
      };
      return items[tier] || items.medium;
    }

    /**
     * Get furniture features
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} Features
     */
    getFurnitureFeatures(specifications, tier) {
      const features = {
        basic: ['Standard materials', 'Basic finish'],
        medium: ['Premium materials', 'Satin finish', 'Custom upholstery'],
        premium: ['Luxury materials', 'Gloss finish', 'Custom design', 'Premium upholstery']
      };
      return features[tier] || features.medium;
    }

    /**
     * Calculate multiple modules
     * @param {Array} moduleRequests - Array of module requests
     * @returns {Object} Combined module costs
     */
    calculateMultipleModules(moduleRequests) {
      const results = {};
      let totalCost = 0;

      moduleRequests.forEach(request => {
        const result = this.calculateModuleCost(request.moduleId, request.specifications, request.tier);
        results[request.moduleId] = result;
        totalCost += result.subtotal;
      });

      return {
        modules: results,
        subtotal: totalCost,
        gst: (totalCost * 18) / 100,
        total: totalCost + ((totalCost * 18) / 100)
      };
    }

    /**
     * Get module summary
     * @param {Object} moduleCost - Module cost object
     * @returns {Object} Summary
     */
    getModuleSummary(moduleCost) {
      return {
        moduleName: moduleCost.moduleName,
        tier: moduleCost.tier,
        subtotal: moduleCost.subtotal,
        gst: (moduleCost.subtotal * 18) / 100,
        total: moduleCost.subtotal + ((moduleCost.subtotal * 18) / 100),
        itemCount: moduleCost.items ? moduleCost.items.length : 0,
        featureCount: moduleCost.features ? moduleCost.features.length : 0
      };
    }
  }

  // Export for use in other modules
  window.EstimatorModuleEngine = ModuleEngine;

})();
