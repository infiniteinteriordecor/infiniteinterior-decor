/**
 * Estimator BOQ Engine
 * 
 * Bill of Quantities generation engine.
 * Handles room-wise BOQ generation for Living, Dining, Kitchen, Bedroom, Master, Guest, Kids, Balcony, Bathroom, Store.
 * 
 * Architecture:
 * - Purpose: Generate detailed BOQ for each room
 * - Dependencies: helpers.js, material-engine.js, module-engine.js
 * - Exports: BOQEngine class
 */

(function() {
  'use strict';

  /**
   * BOQ Engine Class
   * Manages BOQ generation
   */
  class BOQEngine {
    constructor() {
      // Room types
      this.rooms = {
        living: { id: 'living', name: 'Living Room', baseRate: 600 },
        dining: { id: 'dining', name: 'Dining Room', baseRate: 550 },
        kitchen: { id: 'kitchen', name: 'Kitchen', baseRate: 1200 },
        bedroom: { id: 'bedroom', name: 'Bedroom', baseRate: 800 },
        master_bedroom: { id: 'master_bedroom', name: 'Master Bedroom', baseRate: 1000 },
        guest_bedroom: { id: 'guest_bedroom', name: 'Guest Bedroom', baseRate: 700 },
        kids_bedroom: { id: 'kids_bedroom', name: 'Kids Bedroom', baseRate: 750 },
        balcony: { id: 'balcony', name: 'Balcony', baseRate: 300 },
        bathroom: { id: 'bathroom', name: 'Bathroom', baseRate: 900 },
        store: { id: 'store', name: 'Store Room', baseRate: 350 }
      };

      // BOQ structure
      this.boqStructure = {
        item: 'Item',
        material: 'Material',
        qty: 'Quantity',
        unit: 'Unit',
        rate: 'Rate',
        amount: 'Amount'
      };
    }

    /**
     * Initialize BOQ engine
     */
    init() {
      // Placeholder for initialization logic
    }

    /**
     * Generate room BOQ
     * @param {string} roomId - Room ID
     * @param {Object} specifications - Room specifications
     * @param {string} tier - Tier (basic, medium, premium)
     * @returns {Object} Room BOQ
     */
    generateRoomBOQ(roomId, specifications, tier = 'medium') {
      const room = this.rooms[roomId];
      if (!room) {
        throw new Error(`Invalid room ID: ${roomId}`);
      }

      const tierMultiplier = this.getTierMultiplier(tier);
      const area = specifications.area || 0;

      // Generate items based on room type
      const items = this.getRoomItems(roomId, specifications, tier);

      // Calculate totals
      const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

      return {
        roomId,
        roomName: room.name,
        tier,
        specifications,
        area,
        items,
        subtotal: totalAmount,
        gst: (totalAmount * 18) / 100,
        total: totalAmount + ((totalAmount * 18) / 100)
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
     * Get room items
     * @param {string} roomId - Room ID
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getRoomItems(roomId, specifications, tier) {
      const itemGenerators = {
        living: this.getLivingRoomItems,
        dining: this.getDiningRoomItems,
        kitchen: this.getKitchenItems,
        bedroom: this.getBedroomItems,
        master_bedroom: this.getMasterBedroomItems,
        guest_bedroom: this.getGuestBedroomItems,
        kids_bedroom: this.getKidsBedroomItems,
        balcony: this.getBalconyItems,
        bathroom: this.getBathroomItems,
        store: this.getStoreItems
      };

      const generator = itemGenerators[roomId];
      if (!generator) {
        return [];
      }

      return generator.call(this, specifications, tier);
    }

    /**
     * Get living room items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getLivingRoomItems(specifications, tier) {
      const area = specifications.area || 150;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = [
        {
          item: 'False Ceiling',
          material: 'Gypsum Board 12.5mm',
          qty: area,
          unit: 'sqft',
          rate: 85 * tierMultiplier,
          amount: area * 85 * tierMultiplier
        },
        {
          item: 'Wall Paint',
          material: tier === 'premium' ? 'Luxury Emulsion Gloss' : tier === 'medium' ? 'Premium Emulsion Satin' : 'Standard Emulsion Matte',
          qty: area * 3,
          unit: 'sqft',
          rate: 25 * tierMultiplier,
          amount: area * 3 * 25 * tierMultiplier
        },
        {
          item: 'Flooring',
          material: tier === 'premium' ? 'Marble' : tier === 'medium' ? 'Vitrified Tiles' : 'Ceramic Tiles',
          qty: area,
          unit: 'sqft',
          rate: tier === 'premium' ? 250 : tier === 'medium' ? 120 : 80,
          amount: area * (tier === 'premium' ? 250 : tier === 'medium' ? 120 : 80)
        },
        {
          item: 'Electrical',
          material: tier === 'premium' ? 'Smart Switches' : 'Modular Switches',
          qty: 8,
          unit: 'points',
          rate: 150 * tierMultiplier,
          amount: 8 * 150 * tierMultiplier
        },
        {
          item: 'Lighting',
          material: tier === 'premium' ? 'LED Panel + Downlights' : 'LED Panel',
          qty: 4,
          unit: 'points',
          rate: 850 * tierMultiplier,
          amount: 4 * 850 * tierMultiplier
        }
      ];

      if (tier !== 'basic') {
        items.push({
          item: 'TV Unit',
          material: tier === 'premium' ? 'Premium Walnut Veneer' : 'Laminated',
          qty: 8,
          unit: 'linear_ft',
          rate: 600 * tierMultiplier,
          amount: 8 * 600 * tierMultiplier
        });
      }

      if (tier === 'premium') {
        items.push({
          item: 'Feature Wall',
          material: 'Accent Paint + Texture',
          qty: 30,
          unit: 'sqft',
          rate: 150,
          amount: 30 * 150
        });
      }

      return items;
    }

    /**
     * Get dining room items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getDiningRoomItems(specifications, tier) {
      const area = specifications.area || 100;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = [
        {
          item: 'False Ceiling',
          material: 'Gypsum Board 12.5mm',
          qty: area,
          unit: 'sqft',
          rate: 85 * tierMultiplier,
          amount: area * 85 * tierMultiplier
        },
        {
          item: 'Wall Paint',
          material: tier === 'premium' ? 'Luxury Emulsion Gloss' : tier === 'medium' ? 'Premium Emulsion Satin' : 'Standard Emulsion Matte',
          qty: area * 3,
          unit: 'sqft',
          rate: 25 * tierMultiplier,
          amount: area * 3 * 25 * tierMultiplier
        },
        {
          item: 'Flooring',
          material: tier === 'premium' ? 'Marble' : tier === 'medium' ? 'Vitrified Tiles' : 'Ceramic Tiles',
          qty: area,
          unit: 'sqft',
          rate: tier === 'premium' ? 250 : tier === 'medium' ? 120 : 80,
          amount: area * (tier === 'premium' ? 250 : tier === 'medium' ? 120 : 80)
        },
        {
          item: 'Electrical',
          material: tier === 'premium' ? 'Smart Switches' : 'Modular Switches',
          qty: 4,
          unit: 'points',
          rate: 150 * tierMultiplier,
          amount: 4 * 150 * tierMultiplier
        },
        {
          item: 'Lighting',
          material: 'Chandelier + LED',
          qty: 2,
          unit: 'points',
          rate: 2500 * tierMultiplier,
          amount: 2 * 2500 * tierMultiplier
        }
      ];

      if (tier !== 'basic') {
        items.push({
          item: 'Dining Table',
          material: tier === 'premium' ? 'Solid Wood' : 'MDF + Laminate',
          qty: 1,
          unit: 'set',
          rate: 35000 * tierMultiplier,
          amount: 35000 * tierMultiplier
        });
      }

      return items;
    }

    /**
     * Get kitchen items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getKitchenItems(specifications, tier) {
      const area = specifications.area || 80;
      const cabinetLength = specifications.cabinetLength || 15;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = [
        {
          item: 'Base Cabinets',
          material: tier === 'premium' ? 'BWP Marine Plywood 19mm' : tier === 'medium' ? 'BWR Grade Plywood 18mm' : 'MR Grade Plywood 18mm',
          qty: cabinetLength,
          unit: 'linear_ft',
          rate: 1200 * tierMultiplier,
          amount: cabinetLength * 1200 * tierMultiplier
        },
        {
          item: 'Wall Cabinets',
          material: tier === 'premium' ? 'BWP Marine Plywood 19mm' : tier === 'medium' ? 'BWR Grade Plywood 18mm' : 'MR Grade Plywood 18mm',
          qty: cabinetLength * 0.6,
          unit: 'linear_ft',
          rate: 1000 * tierMultiplier,
          amount: cabinetLength * 0.6 * 1000 * tierMultiplier
        },
        {
          item: 'Countertop',
          material: tier === 'premium' ? 'Quartz' : tier === 'medium' ? 'Granite' : 'Marble',
          qty: area * 0.4,
          unit: 'sqft',
          rate: tier === 'premium' ? 450 : tier === 'medium' ? 250 : 180,
          amount: area * 0.4 * (tier === 'premium' ? 450 : tier === 'medium' ? 250 : 180)
        },
        {
          item: 'Laminates',
          material: tier === 'premium' ? '1mm Texture' : tier === 'medium' ? '1mm Premium' : '0.8mm Decorative',
          qty: cabinetLength * 2,
          unit: 'sqft',
          rate: 65 * tierMultiplier,
          amount: cabinetLength * 2 * 65 * tierMultiplier
        },
        {
          item: 'Hardware',
          material: tier === 'premium' ? 'Brass Handles + Soft Close' : tier === 'medium' ? 'Stainless Steel + Soft Close' : 'Aluminum Standard',
          qty: cabinetLength,
          unit: 'set',
          rate: 300 * tierMultiplier,
          amount: cabinetLength * 300 * tierMultiplier
        },
        {
          item: 'Sink',
          material: tier === 'premium' ? 'Undermount Granite' : tier === 'medium' ? 'Top Mount Stainless' : 'Top Mount Stainless',
          qty: 1,
          unit: 'piece',
          rate: tier === 'premium' ? 8500 : tier === 'medium' ? 4500 : 2500,
          amount: tier === 'premium' ? 8500 : tier === 'medium' ? 4500 : 2500
        },
        {
          item: 'Faucet',
          material: tier === 'premium' ? 'Premium Mixer' : tier === 'medium' ? 'Standard Mixer' : 'Basic Mixer',
          qty: 1,
          unit: 'piece',
          rate: tier === 'premium' ? 5500 : tier === 'medium' ? 3500 : 1800,
          amount: tier === 'premium' ? 5500 : tier === 'medium' ? 3500 : 1800
        },
        {
          item: 'Chimney',
          material: tier === 'premium' ? 'Auto-Clean' : tier === 'medium' ? 'Standard' : 'Basic',
          qty: 1,
          unit: 'piece',
          rate: tier === 'premium' ? 25000 : tier === 'medium' ? 15000 : 8500,
          amount: tier === 'premium' ? 25000 : tier === 'medium' ? 15000 : 8500
        }
      ];

      if (tier !== 'basic') {
        items.push({
          item: 'Modular Drawers',
          material: 'Tandem Slides',
          qty: 4,
          unit: 'piece',
          rate: 3500 * tierMultiplier,
          amount: 4 * 3500 * tierMultiplier
        });
      }

      if (tier === 'premium') {
        items.push({
          item: 'Tall Unit',
          material: 'BWP Marine Plywood',
          qty: 1,
          unit: 'piece',
          rate: 15000,
          amount: 15000
        });
      }

      return items;
    }

    /**
     * Get bedroom items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getBedroomItems(specifications, tier) {
      const area = specifications.area || 120;
      const wardrobeArea = specifications.wardrobeArea || 40;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = [
        {
          item: 'False Ceiling',
          material: 'Gypsum Board 12.5mm',
          qty: area,
          unit: 'sqft',
          rate: 85 * tierMultiplier,
          amount: area * 85 * tierMultiplier
        },
        {
          item: 'Wall Paint',
          material: tier === 'premium' ? 'Luxury Emulsion Gloss' : tier === 'medium' ? 'Premium Emulsion Satin' : 'Standard Emulsion Matte',
          qty: area * 3,
          unit: 'sqft',
          rate: 25 * tierMultiplier,
          amount: area * 3 * 25 * tierMultiplier
        },
        {
          item: 'Flooring',
          material: tier === 'premium' ? 'Marble' : tier === 'medium' ? 'Vitrified Tiles' : 'Ceramic Tiles',
          qty: area,
          unit: 'sqft',
          rate: tier === 'premium' ? 250 : tier === 'medium' ? 120 : 80,
          amount: area * (tier === 'premium' ? 250 : tier === 'medium' ? 120 : 80)
        },
        {
          item: 'Wardrobe',
          material: tier === 'premium' ? 'BWP Marine Plywood + Veneer' : tier === 'medium' ? 'BWR Grade Plywood + Laminate' : 'MR Grade Plywood + Laminate',
          qty: wardrobeArea,
          unit: 'sqft',
          rate: 800 * tierMultiplier,
          amount: wardrobeArea * 800 * tierMultiplier
        },
        {
          item: 'Electrical',
          material: tier === 'premium' ? 'Smart Switches' : 'Modular Switches',
          qty: 6,
          unit: 'points',
          rate: 150 * tierMultiplier,
          amount: 6 * 150 * tierMultiplier
        },
        {
          item: 'Lighting',
          material: 'LED Panel + Downlights',
          qty: 3,
          unit: 'points',
          rate: 850 * tierMultiplier,
          amount: 3 * 850 * tierMultiplier
        }
      ];

      if (tier !== 'basic') {
        items.push({
          item: 'Bed Frame',
          material: tier === 'premium' ? 'Solid Wood' : 'MDF + Laminate',
          qty: 1,
          unit: 'piece',
          rate: 25000 * tierMultiplier,
          amount: 25000 * tierMultiplier
        });
      }

      return items;
    }

    /**
     * Get master bedroom items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getMasterBedroomItems(specifications, tier) {
      const area = specifications.area || 180;
      const wardrobeArea = specifications.wardrobeArea || 60;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = this.getBedroomItems(specifications, tier);

      // Add master bedroom specific items
      if (tier !== 'basic') {
        items.push({
          item: 'Dressing Table',
          material: tier === 'premium' ? 'Solid Wood + Veneer' : 'MDF + Laminate',
          qty: 1,
          unit: 'piece',
          rate: 15000 * tierMultiplier,
          amount: 15000 * tierMultiplier
        });
      }

      if (tier === 'premium') {
        items.push({
          item: 'TV Unit',
          material: 'Premium Walnut Veneer',
          qty: 8,
          unit: 'linear_ft',
          rate: 800 * tierMultiplier,
          amount: 8 * 800 * tierMultiplier
        });

        items.push({
          item: 'Walk-in Wardrobe',
          material: 'BWP Marine Plywood + Veneer',
          qty: 20,
          unit: 'sqft',
          rate: 1200,
          amount: 20 * 1200
        });
      }

      return items;
    }

    /**
     * Get guest bedroom items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getGuestBedroomItems(specifications, tier) {
      const area = specifications.area || 100;
      const wardrobeArea = specifications.wardrobeArea || 30;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = this.getBedroomItems(specifications, tier);

      // Guest bedroom has simpler specifications
      return items;
    }

    /**
     * Get kids bedroom items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getKidsBedroomItems(specifications, tier) {
      const area = specifications.area || 110;
      const wardrobeArea = specifications.wardrobeArea || 35;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = this.getBedroomItems(specifications, tier);

      // Add kids bedroom specific items
      if (tier !== 'basic') {
        items.push({
          item: 'Study Table',
          material: tier === 'premium' ? 'Solid Wood' : 'MDF + Laminate',
          qty: 1,
          unit: 'piece',
          rate: 12000 * tierMultiplier,
          amount: 12000 * tierMultiplier
        });
      }

      if (tier === 'premium') {
        items.push({
          item: 'Bunk Bed',
          material: 'Solid Wood',
          qty: 1,
          unit: 'piece',
          rate: 35000,
          amount: 35000
        });
      }

      return items;
    }

    /**
     * Get balcony items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getBalconyItems(specifications, tier) {
      const area = specifications.area || 50;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = [
        {
          item: 'Flooring',
          material: tier === 'premium' ? 'Anti-Skid Tiles' : tier === 'medium' ? 'Vitrified Tiles' : 'Ceramic Tiles',
          qty: area,
          unit: 'sqft',
          rate: tier === 'premium' ? 150 : tier === 'medium' ? 100 : 70,
          amount: area * (tier === 'premium' ? 150 : tier === 'medium' ? 100 : 70)
        },
        {
          item: 'Wall Cladding',
          material: tier === 'premium' ? 'Stone Cladding' : tier === 'medium' ? 'Texture Paint' : 'Exterior Paint',
          qty: area * 1.5,
          unit: 'sqft',
          rate: tier === 'premium' ? 250 : tier === 'medium' ? 80 : 35,
          amount: area * 1.5 * (tier === 'premium' ? 250 : tier === 'medium' ? 80 : 35)
        },
        {
          item: 'Railings',
          material: tier === 'premium' ? 'SS Glass Railing' : tier === 'medium' ? 'MS Railing' : 'MS Railing',
          qty: specifications.perimeter || 20,
          unit: 'linear_ft',
          rate: tier === 'premium' ? 1200 : tier === 'medium' ? 600 : 400,
          amount: specifications.perimeter * (tier === 'premium' ? 1200 : tier === 'medium' ? 600 : 400)
        },
        {
          item: 'Electrical',
          material: 'Weatherproof',
          qty: 2,
          unit: 'points',
          rate: 200 * tierMultiplier,
          amount: 2 * 200 * tierMultiplier
        }
      ];

      if (tier === 'premium') {
        items.push({
          item: 'Artificial Grass',
          material: 'Premium',
          qty: area * 0.3,
          unit: 'sqft',
          rate: 150,
          amount: area * 0.3 * 150
        });
      }

      return items;
    }

    /**
     * Get bathroom items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getBathroomItems(specifications, tier) {
      const area = specifications.area || 40;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = [
        {
          item: 'Flooring',
          material: tier === 'premium' ? 'Anti-Skid Marble' : tier === 'medium' ? 'Anti-Skid Vitrified' : 'Anti-Skid Ceramic',
          qty: area,
          unit: 'sqft',
          rate: tier === 'premium' ? 300 : tier === 'medium' ? 150 : 100,
          amount: area * (tier === 'premium' ? 300 : tier === 'medium' ? 150 : 100)
        },
        {
          item: 'Wall Tiles',
          material: tier === 'premium' ? 'Premium Glossy' : tier === 'medium' ? 'Standard Glossy' : 'Matte',
          qty: area * 2.5,
          unit: 'sqft',
          rate: tier === 'premium' ? 120 : tier === 'medium' ? 80 : 55,
          amount: area * 2.5 * (tier === 'premium' ? 120 : tier === 'medium' ? 80 : 55)
        },
        {
          item: 'WC',
          material: tier === 'premium' ? 'Wall Hung Premium' : tier === 'medium' ? 'Floor Mounted Premium' : 'Floor Mounted Standard',
          qty: 1,
          unit: 'piece',
          rate: tier === 'premium' ? 15000 : tier === 'medium' ? 8500 : 4500,
          amount: tier === 'premium' ? 15000 : tier === 'medium' ? 8500 : 4500
        },
        {
          item: 'Wash Basin',
          material: tier === 'premium' ? 'Premium Designer' : tier === 'medium' ? 'Standard Premium' : 'Basic',
          qty: 1,
          unit: 'piece',
          rate: tier === 'premium' ? 8500 : tier === 'medium' ? 4500 : 2500,
          amount: tier === 'premium' ? 8500 : tier === 'medium' ? 4500 : 2500
        },
        {
          item: 'Faucet',
          material: tier === 'premium' ? 'Premium Mixer' : tier === 'medium' ? 'Standard Mixer' : 'Basic Mixer',
          qty: 1,
          unit: 'piece',
          rate: tier === 'premium' ? 5500 : tier === 'medium' ? 3500 : 1800,
          amount: tier === 'premium' ? 5500 : tier === 'medium' ? 3500 : 1800
        },
        {
          item: 'Shower',
          material: tier === 'premium' ? 'Rain Shower System' : tier === 'medium' ? 'Premium Shower' : 'Basic Shower',
          qty: 1,
          unit: 'piece',
          rate: tier === 'premium' ? 18000 : tier === 'medium' ? 8500 : 4500,
          amount: tier === 'premium' ? 18000 : tier === 'medium' ? 8500 : 4500
        },
        {
          item: 'Mirror',
          material: tier === 'premium' ? 'LED Mirror' : tier === 'medium' ? 'Standard Mirror' : 'Basic Mirror',
          qty: 1,
          unit: 'piece',
          rate: tier === 'premium' ? 5500 : tier === 'medium' ? 2500 : 1200,
          amount: tier === 'premium' ? 5500 : tier === 'medium' ? 2500 : 1200
        },
        {
          item: 'Vanity',
          material: tier === 'premium' ? 'Premium Vanity' : tier === 'medium' ? 'Standard Vanity' : 'Basic Vanity',
          qty: 1,
          unit: 'piece',
          rate: tier === 'premium' ? 15000 : tier === 'medium' ? 8500 : 4500,
          amount: tier === 'premium' ? 15000 : tier === 'medium' ? 8500 : 4500
        }
      ];

      if (tier === 'premium') {
        items.push({
          item: 'Exhaust Fan',
          material: 'Premium',
          qty: 1,
          unit: 'piece',
          rate: 3500,
          amount: 3500
        });
      }

      return items;
    }

    /**
     * Get store room items
     * @param {Object} specifications - Specifications
     * @param {string} tier - Tier
     * @returns {Array} BOQ items
     */
    getStoreItems(specifications, tier) {
      const area = specifications.area || 50;
      const tierMultiplier = this.getTierMultiplier(tier);

      const items = [
        {
          item: 'Flooring',
          material: 'Ceramic Tiles',
          qty: area,
          unit: 'sqft',
          rate: 60,
          amount: area * 60
        },
        {
          item: 'Wall Paint',
          material: 'Standard Emulsion Matte',
          qty: area * 3,
          unit: 'sqft',
          rate: 20,
          amount: area * 3 * 20
        },
        {
          item: 'Shelving',
          material: 'MDF',
          qty: area * 0.5,
          unit: 'sqft',
          rate: 300 * tierMultiplier,
          amount: area * 0.5 * 300 * tierMultiplier
        },
        {
          item: 'Electrical',
          material: 'Modular Switches',
          qty: 2,
          unit: 'points',
          rate: 150 * tierMultiplier,
          amount: 2 * 150 * tierMultiplier
        },
        {
          item: 'Lighting',
          material: 'LED Batten',
          qty: 2,
          unit: 'points',
          rate: 350 * tierMultiplier,
          amount: 2 * 350 * tierMultiplier
        }
      ];

      return items;
    }

    /**
     * Generate complete project BOQ
     * @param {Array} rooms - Array of room configurations
     * @param {string} tier - Tier
     * @returns {Object} Complete BOQ
     */
    generateProjectBOQ(rooms, tier = 'medium') {
      const roomBOQs = {};
      let totalSubtotal = 0;

      rooms.forEach(roomConfig => {
        const roomBOQ = this.generateRoomBOQ(roomConfig.id, roomConfig.specifications, tier);
        roomBOQs[roomConfig.id] = roomBOQ;
        totalSubtotal += roomBOQ.subtotal;
      });

      const gst = (totalSubtotal * 18) / 100;
      const total = totalSubtotal + gst;

      return {
        rooms: roomBOQs,
        summary: {
          totalArea: rooms.reduce((sum, r) => sum + (r.specifications.area || 0), 0),
          totalRooms: rooms.length,
          subtotal: totalSubtotal,
          gst,
          gstRate: 18,
          total
        },
        tier
      };
    }

    /**
     * Export BOQ to CSV format
     * @param {Object} boq - BOQ object
     * @returns {string} CSV string
     */
    exportToCSV(boq) {
      let csv = 'Room,Item,Material,Quantity,Unit,Rate,Amount\n';

      for (const [roomId, roomBOQ] of Object.entries(boq.rooms)) {
        roomBOQ.items.forEach(item => {
          csv += `${roomBOQ.roomName},${item.item},${item.material},${item.qty},${item.unit},${item.rate},${item.amount}\n`;
        });
      }

      csv += `\nTotal,,,-,-,-,${boq.summary.total}`;
      return csv;
    }

    /**
     * Get BOQ summary
     * @param {Object} boq - BOQ object
     * @returns {Object} Summary
     */
    getBOQSummary(boq) {
      const roomSummaries = {};
      let totalItems = 0;

      for (const [roomId, roomBOQ] of Object.entries(boq.rooms)) {
        roomSummaries[roomId] = {
          roomName: roomBOQ.roomName,
          area: roomBOQ.area,
          itemCount: roomBOQ.items.length,
          subtotal: roomBOQ.subtotal,
          gst: roomBOQ.gst,
          total: roomBOQ.total
        };
        totalItems += roomBOQ.items.length;
      }

      return {
        rooms: roomSummaries,
        totalItems,
        totalArea: boq.summary.totalArea,
        totalRooms: boq.summary.totalRooms,
        subtotal: boq.summary.subtotal,
        gst: boq.summary.gst,
        total: boq.summary.total,
        tier: boq.tier
      };
    }
  }

  // Export for use in other modules
  window.EstimatorBOQEngine = BOQEngine;

})();
