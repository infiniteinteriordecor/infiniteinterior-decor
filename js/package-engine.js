/**
 * Estimator Package Engine
 * 
 * Package generation and management engine.
 * Handles automatic package generation with materials, hardware, lighting, finish, pricing, and GST structure.
 * 
 * Architecture:
 * - Purpose: Auto-generate Basic/Medium/Premium packages
 * - Dependencies: helpers.js, material-engine.js
 * - Exports: PackageEngine class
 */

(function() {
  'use strict';

  /**
   * Package Engine Class
   * Manages package generation and calculations
   */
  class PackageEngine {
    constructor() {
      // Package tiers
      this.tiers = {
        basic: { id: 'basic', name: 'Basic', multiplier: 1.0, margin: 0.15 },
        medium: { id: 'medium', name: 'Medium', multiplier: 1.4, margin: 0.20 },
        premium: { id: 'premium', name: 'Premium', multiplier: 2.0, margin: 0.25 }
      };

      // Package components
      this.components = {
        materials: 'Materials',
        hardware: 'Hardware',
        lighting: 'Lighting',
        finish: 'Finish',
        labor: 'Labor',
        installation: 'Installation',
        design: 'Design Fee',
        companyMargin: 'Company Margin',
        gst: 'GST'
      };

      // GST rate
      this.gstRate = 18;

      // Material database (will be loaded from JSON)
      this.materialDatabase = {};
    }

    /**
     * Initialize package engine
     * @param {Object} materialDatabase - Material database from JSON
     */
    init(materialDatabase) {
      if (materialDatabase) {
        this.materialDatabase = materialDatabase;
      }
    }

    /**
     * Generate package for given tier and project data
     * @param {Object} projectData - Project data from state
     * @param {string} tierId - Tier ID (basic, medium, premium)
     * @returns {Object} Generated package
     */
    generatePackage(projectData, tierId) {
      const tier = this.tiers[tierId];
      if (!tier) {
        throw new Error(`Invalid tier ID: ${tierId}`);
      }

      // Calculate base costs
      const baseCosts = this.calculateBaseCosts(projectData, tierId);
      
      // Calculate package components
      const components = this.calculatePackageComponents(baseCosts, tier);
      
      // Calculate total
      const subtotal = this.calculateSubtotal(components);
      const gst = this.calculateGST(subtotal);
      const total = subtotal + gst;

      // Generate package details
      return {
        id: `package_${tierId}_${Date.now()}`,
        tier: tierId,
        tierName: tier.name,
        multiplier: tier.multiplier,
        margin: tier.margin,
        components,
        subtotal,
        gst,
        gstRate: this.gstRate,
        total,
        specifications: this.generateSpecifications(projectData, tierId),
        durability: this.calculateDurability(tierId),
        maintenance: this.getMaintenanceLevel(tierId),
        life: this.getLifeExpectancy(tierId),
        warranty: this.getWarrantyPeriod(tierId),
        timeline: this.getTimeline(projectData, tierId),
        inclusions: this.getInclusions(tierId),
        exclusions: this.getExclusions(tierId)
      };
    }

    /**
     * Calculate base costs for project
     * @param {Object} projectData - Project data
     * @param {string} tierId - Tier ID
     * @returns {Object} Base costs
     */
    calculateBaseCosts(projectData, tierId) {
      const tier = this.tiers[tierId];
      const area = projectData.projectInfo?.area || 0;
      const rooms = projectData.rooms || [];

      // Base rate per sqft based on tier
      const baseRates = {
        basic: 800,
        medium: 1200,
        premium: 1800
      };

      const baseRate = baseRates[tierId] || 800;
      const baseCost = area * baseRate;

      // Room-specific costs
      let roomCosts = 0;
      rooms.forEach(room => {
        const roomArea = room.area || 0;
        const roomMultiplier = this.getRoomMultiplier(room.type);
        roomCosts += roomArea * baseRate * roomMultiplier;
      });

      return {
        baseCost,
        roomCosts,
        totalBase: baseCost + roomCosts
      };
    }

    /**
     * Get room multiplier for cost calculation
     * @param {string} roomType - Room type
     * @returns {number} Multiplier
     */
    getRoomMultiplier(roomType) {
      const multipliers = {
        living_room: 1.2,
        bedroom: 1.0,
        kitchen: 1.5,
        bathroom: 1.3,
        dining: 1.1,
        study: 1.0,
        balcony: 0.8,
        puja_room: 0.9
      };
      return multipliers[roomType] || 1.0;
    }

    /**
     * Calculate package components
     * @param {Object} baseCosts - Base costs
     * @param {Object} tier - Tier configuration
     * @returns {Object} Package components
     */
    calculatePackageComponents(baseCosts, tier) {
      const totalBase = baseCosts.totalBase;

      // Component percentages based on tier
      const percentages = {
        basic: {
          materials: 0.45,
          hardware: 0.10,
          lighting: 0.08,
          finish: 0.07,
          labor: 0.20,
          installation: 0.10
        },
        medium: {
          materials: 0.48,
          hardware: 0.12,
          lighting: 0.10,
          finish: 0.08,
          labor: 0.15,
          installation: 0.07
        },
        premium: {
          materials: 0.52,
          hardware: 0.14,
          lighting: 0.12,
          finish: 0.10,
          labor: 0.08,
          installation: 0.04
        }
      };

      const tierPercentages = percentages[tier.id] || percentages.basic;

      // Calculate component costs
      const components = {};
      for (const [key, percentage] of Object.entries(tierPercentages)) {
        components[key] = totalBase * percentage * tier.multiplier;
      }

      // Calculate design fee (5% of total)
      components.design = totalBase * 0.05 * tier.multiplier;

      // Calculate company margin
      const subtotal = Object.values(components).reduce((sum, val) => sum + val, 0);
      components.companyMargin = subtotal * tier.margin;

      return components;
    }

    /**
     * Calculate subtotal (excluding GST)
     * @param {Object} components - Package components
     * @returns {number} Subtotal
     */
    calculateSubtotal(components) {
      return Object.values(components).reduce((sum, val) => sum + val, 0);
    }

    /**
     * Calculate GST
     * @param {number} subtotal - Subtotal amount
     * @returns {number} GST amount
     */
    calculateGST(subtotal) {
      return (subtotal * this.gstRate) / 100;
    }

    /**
     * Generate package specifications
     * @param {Object} projectData - Project data
     * @param {string} tierId - Tier ID
     * @returns {Object} Specifications
     */
    generateSpecifications(projectData, tierId) {
      const tier = this.tiers[tierId];
      
      return {
        materials: this.getMaterialSpecifications(tierId),
        hardware: this.getHardwareSpecifications(tierId),
        lighting: this.getLightingAssertions(tierId),
        finish: this.getFinishSpecifications(tierId),
        quality: this.getQualityLevel(tierId),
        brandTier: this.getBrandTier(tierId)
      };
    }

    /**
     * Get material specifications for tier
     * @param {string} tierId - Tier ID
     * @returns {Object} Material specifications
     */
    getMaterialSpecifications(tierId) {
      const specs = {
        basic: {
          plywood: 'MR Grade 18mm',
          mdf: 'Standard 18mm',
          laminates: '0.8mm Decorative',
          hardware: 'Standard Chrome'
        },
        medium: {
          plywood: 'BWR Grade 18mm',
          mdf: 'Moisture Resistant 18mm',
          laminates: '1mm Premium',
          hardware: 'Premium Chrome/Black'
        },
        premium: {
          plywood: 'BWP Marine 19mm',
          mdf: 'Fire Retardant 19mm',
          laminates: '1mm Texture/Metallic',
          hardware: 'Brass/Gold/Black'
        }
      };
      return specs[tierId] || specs.basic;
    }

    /**
     * Get hardware specifications for tier
     * @param {string} tierId - Tier ID
     * @returns {Object} Hardware specifications
     */
    getHardwareSpecifications(tierId) {
      const specs = {
        basic: {
          hinges: 'Standard 90°',
          slides: '75% Extension',
          handles: 'Aluminum 128mm',
          locks: 'Single Cylinder'
        },
        medium: {
          hinges: 'Soft Close 110°',
          slides: '100% Extension',
          handles: 'Stainless Steel 160mm',
          locks: 'Double Cylinder'
        },
        premium: {
          hinges: 'Soft Close Plus 165°',
          slides: '100% Heavy Duty',
          handles: 'Brass 200mm',
          locks: 'Digital/Biometric'
        }
      };
      return specs[tierId] || specs.basic;
    }

    /**
     * Get lighting specifications for tier
     * @param {string} tierId - Tier ID
     * @returns {Object} Lighting specifications
     */
    getLightingAssertions(tierId) {
      const specs = {
        basic: {
          type: 'LED Panel 18W',
          controls: 'Manual Switch',
          color: 'Warm White'
        },
        medium: {
          type: 'LED Panel 24W + Downlights',
          controls: 'Dimmer Switch',
          color: 'Warm/Cool Selectable'
        },
        premium: {
          type: 'LED Panel 36W + Downlights + Strip',
          controls: 'Smart/Automated',
          color: 'RGB + Tunable White'
        }
      };
      return specs[tierId] || specs.basic;
    }

    /**
     * Get finish specifications for tier
     * @param {string} tierId - Tier ID
     * @returns {Object} Finish specifications
     */
    getFinishSpecifications(tierId) {
      const specs = {
        basic: {
          paint: 'Standard Emulsion Matte',
          polish: 'Melamine Polish',
          veneer: 'None'
        },
        medium: {
          paint: 'Premium Emulsion Satin',
          polish: 'PU Matte',
          veneer: 'Natural Oak 0.5mm'
        },
        premium: {
          paint: 'Luxury Emulsion Gloss',
          polish: 'PU Gloss',
          veneer: 'Premium Walnut 0.8mm'
        }
      };
      return specs[tierId] || specs.basic;
    }

    /**
     * Get quality level for tier
     * @param {string} tierId - Tier ID
     * @returns {string} Quality level
     */
    getQualityLevel(tierId) {
      const levels = {
        basic: 'Standard Quality',
        medium: 'Premium Quality',
        premium: 'Luxury Quality'
      };
      return levels[tierId] || 'Standard Quality';
    }

    /**
     * Get brand tier for tier
     * @param {string} tierId - Tier ID
     * @returns {string} Brand tier
     */
    getBrandTier(tierId) {
      const tiers = {
        basic: 'Economy Brands (Greenply, Hafele Standard)',
        medium: 'Premium Brands (Century, Hafele Premium)',
        premium: 'Luxury Brands (Asian Royale, Hettich, Grohe)'
      };
      return tiers[tierId] || 'Economy Brands';
    }

    /**
     * Calculate durability rating
     * @param {string} tierId - Tier ID
     * @returns {number} Durability rating (1-10)
     */
    calculateDurability(tierId) {
      const ratings = {
        basic: 7,
        medium: 8,
        premium: 9
      };
      return ratings[tierId] || 7;
    }

    /**
     * Get maintenance level
     * @param {string} tierId - Tier ID
     * @returns {string} Maintenance level
     */
    getMaintenanceLevel(tierId) {
      const levels = {
        basic: 'Medium - Periodic maintenance required',
        medium: 'Low - Minimal maintenance',
        premium: 'Very Low - Premium materials'
      };
      return levels[tierId] || 'Medium';
    }

    /**
     * Get life expectancy
     * @param {string} tierId - Tier ID
     * @returns {number} Life expectancy in years
     */
    getLifeExpectancy(tierId) {
      const years = {
        basic: 15,
        medium: 20,
        premium: 25
      };
      return years[tierId] || 15;
    }

    /**
     * Get warranty period
     * @param {string} tierId - Tier ID
     * @returns {number} Warranty period in years
     */
    getWarrantyPeriod(tierId) {
      const years = {
        basic: 5,
        medium: 10,
        premium: 15
      };
      return years[tierId] || 5;
    }

    /**
     * Get timeline
     * @param {Object} projectData - Project data
     * @param {string} tierId - Tier ID
     * @returns {string} Timeline
     */
    getTimeline(projectData, tierId) {
      const area = projectData.projectInfo?.area || 0;
      const baseDays = Math.ceil(area / 50); // Base calculation
      
      const multipliers = {
        basic: 1.2,
        medium: 1.0,
        premium: 0.8
      };

      const days = Math.ceil(baseDays * (multipliers[tierId] || 1.0));
      return `${days} days`;
    }

    /**
     * Get inclusions for tier
     * @param {string} tierId - Tier ID
     * @returns {Array} Inclusions
     */
    getInclusions(tierId) {
      const inclusions = {
        basic: [
          'Standard materials',
          'Basic hardware',
          'LED lighting',
          'Standard finish',
          'Labor charges',
          'Installation',
          '2 design revisions'
        ],
        medium: [
          'Premium materials',
          'Soft-close hardware',
          'Premium lighting',
          'Satin finish',
          'Labor charges',
          'Installation',
          '4 design revisions'
        ],
        premium: [
          'Luxury materials',
          'Premium hardware with soft-close',
          'Smart lighting',
          'Gloss finish with veneer',
          'Labor charges',
          'Installation',
          'Unlimited design revisions',
          'Project management'
        ]
      };
      return inclusions[tierId] || inclusions.basic;
    }

    /**
     * Get exclusions for tier
     * @param {string} tierId - Tier ID
     * @returns {Array} Exclusions
     */
    getExclusions(tierId) {
      const exclusions = {
        basic: [
          'Custom furniture',
          'Premium materials',
          'Smart home automation',
          'Architectural modifications'
        ],
        medium: [
          'Smart home automation',
          'Premium furniture',
          'Architectural modifications'
        ],
        premium: [
          'Architectural modifications',
          'Structural changes'
        ]
      };
      return exclusions[tierId] || exclusions.basic;
    }

    /**
     * Compare packages across tiers
     * @param {Object} projectData - Project data
     * @returns {Object} Package comparisons
     */
    comparePackages(projectData) {
      const comparisons = {};
      
      for (const tierId of Object.keys(this.tiers)) {
        comparisons[tierId] = this.generatePackage(projectData, tierId);
      }
      
      return comparisons;
    }

    /**
     * Get recommended tier based on budget
     * @param {Object} projectData - Project data
     * @param {number} budget - Budget amount
     * @returns {Object} Recommendation
     */
    getRecommendedTier(projectData, budget) {
      const comparisons = this.comparePackages(projectData);
      
      for (const [tierId, pkg] of Object.entries(comparisons)) {
        if (pkg.total <= budget) {
          return {
            tierId,
            package: pkg,
            withinBudget: true,
            remaining: budget - pkg.total
          };
        }
      }
      
      // If no tier fits, return the closest
      const closest = Object.entries(comparisons).reduce((closest, [tierId, pkg]) => {
        const diff = pkg.total - budget;
        if (diff < closest.diff) {
          return { tierId, package: pkg, diff };
        }
        return closest;
      }, { tierId: null, package: null, diff: Infinity });
      
      return {
        tierId: closest.tierId,
        package: closest.package,
        withinBudget: false,
        shortfall: closest.diff
      };
    }
  }

  // Export for use in other modules
  window.EstimatorPackageEngine = PackageEngine;

})();
