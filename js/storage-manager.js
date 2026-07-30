/**
 * Estimator Storage Manager
 * 
 * Data persistence system for estimator module.
 * Handles JSON, IndexedDB, and Browser Storage for GitHub Pages compatibility.
 * No backend server, Firebase, MongoDB, Node, or Express required.
 * 
 * Architecture:
 * - Purpose: Persist estimator data using browser storage
 * - Dependencies: None (core module)
 * - Exports: StorageManager class
 */

(function() {
  'use strict';

  /**
   * Storage Manager Class
   * Manages data persistence using IndexedDB and localStorage
   */
  class StorageManager {
    constructor() {
      // Database name
      this.dbName = 'InfiniteInteriorEstimator';
      this.dbVersion = 1;
      
      // Store names
      this.stores = {
        drafts: 'drafts',
        calculations: 'calculations',
        materials: 'materials',
        packages: 'packages',
        cache: 'cache'
      };
      
      // IndexedDB instance
      this.db = null;
      
      // localStorage prefix
      this.storagePrefix = 'estimator_';
    }

    /**
     * Initialize storage manager
     * @returns {Promise<boolean>} Success status
     */
    async init() {
      try {
        // Initialize IndexedDB
        await this.initIndexedDB();
        return true;
      } catch (error) {
        console.error('Storage initialization error:', error);
        // Fallback to localStorage only
        return true;
      }
    }

    /**
     * Initialize IndexedDB
     * @returns {Promise<void>}
     */
    async initIndexedDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.dbVersion);
        
        request.onerror = () => {
          console.error('IndexedDB error:', request.error);
          reject(request.error);
        };
        
        request.onsuccess = () => {
          this.db = request.result;
          resolve();
        };
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          
          // Create object stores
          if (!db.objectStoreNames.contains(this.stores.drafts)) {
            db.createObjectStore(this.stores.drafts, { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains(this.stores.calculations)) {
            db.createObjectStore(this.stores.calculations, { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains(this.stores.materials)) {
            db.createObjectStore(this.stores.materials, { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains(this.stores.packages)) {
            db.createObjectStore(this.stores.packages, { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains(this.stores.cache)) {
            db.createObjectStore(this.stores.cache, { keyPath: 'key' });
          }
        };
      });
    }

    /**
     * Save draft to IndexedDB
     * @param {Object} draftData - Draft data
     * @returns {Promise<string>} Draft ID
     */
    async saveDraft(draftData) {
      const draft = {
        id: draftData.id || this.generateId(),
        data: draftData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      try {
        await this.put(this.stores.drafts, draft);
        // Also save to localStorage as backup
        this.setLocalStorage(`draft_${draft.id}`, draft);
        return draft.id;
      } catch (error) {
        console.error('Save draft error:', error);
        // Fallback to localStorage
        return this.saveDraftToLocalStorage(draftData);
      }
    }

    /**
     * Load draft from IndexedDB
     * @param {string} draftId - Draft ID
     * @returns {Promise<Object|null>} Draft data
     */
    async loadDraft(draftId) {
      try {
        const draft = await this.get(this.stores.drafts, draftId);
        return draft ? draft.data : null;
      } catch (error) {
        console.error('Load draft error:', error);
        // Fallback to localStorage
        return this.loadDraftFromLocalStorage(draftId);
      }
    }

    /**
     * Get all drafts
     * @returns {Promise<Array>} Array of drafts
     */
    async getAllDrafts() {
      try {
        const drafts = await this.getAll(this.stores.drafts);
        return drafts.map(draft => ({
          id: draft.id,
          createdAt: draft.createdAt,
          updatedAt: draft.updatedAt,
          data: draft.data
        }));
      } catch (error) {
        console.error('Get all drafts error:', error);
        return this.getAllDraftsFromLocalStorage();
      }
    }

    /**
     * Delete draft
     * @param {string} draftId - Draft ID
     * @returns {Promise<boolean>} Success status
     */
    async deleteDraft(draftId) {
      try {
        await this.delete(this.stores.drafts, draftId);
        this.removeLocalStorage(`draft_${draftId}`);
        return true;
      } catch (error) {
        console.error('Delete draft error:', error);
        return this.deleteDraftFromLocalStorage(draftId);
      }
    }

    /**
     * Save calculation result
     * @param {Object} calculation - Calculation data
     * @returns {Promise<string>} Calculation ID
     */
    async saveCalculation(calculation) {
      const calc = {
        id: calculation.id || this.generateId(),
        data: calculation,
        createdAt: new Date().toISOString()
      };
      
      try {
        await this.put(this.stores.calculations, calc);
        this.setLocalStorage(`calc_${calc.id}`, calc);
        return calc.id;
      } catch (error) {
        console.error('Save calculation error:', error);
        return this.saveCalculationToLocalStorage(calculation);
      }
    }

    /**
     * Load calculation
     * @param {string} calcId - Calculation ID
     * @returns {Promise<Object|null>} Calculation data
     */
    async loadCalculation(calcId) {
      try {
        const calc = await this.get(this.stores.calculations, calcId);
        return calc ? calc.data : null;
      } catch (error) {
        console.error('Load calculation error:', error);
        return this.loadCalculationFromLocalStorage(calcId);
      }
    }

    /**
     * Cache material data
     * @param {string} key - Cache key
     * @param {Object} data - Data to cache
     * @param {number} ttl - Time to live in seconds
     * @returns {Promise<boolean>} Success status
     */
    async cacheData(key, data, ttl = 3600) {
      const cacheEntry = {
        key,
        data,
        expiresAt: new Date(Date.now() + ttl * 1000).toISOString()
      };
      
      try {
        await this.put(this.stores.cache, cacheEntry);
        this.setLocalStorage(`cache_${key}`, cacheEntry);
        return true;
      } catch (error) {
        console.error('Cache data error:', error);
        return this.cacheDataToLocalStorage(key, data, ttl);
      }
    }

    /**
     * Get cached data
     * @param {string} key - Cache key
     * @returns {Promise<Object|null>} Cached data
     */
    async getCachedData(key) {
      try {
        const entry = await this.get(this.stores.cache, key);
        
        if (!entry) {
          return this.getCachedDataFromLocalStorage(key);
        }
        
        // Check if expired
        if (new Date(entry.expiresAt) < new Date()) {
          await this.delete(this.stores.cache, key);
          return null;
        }
        
        return entry.data;
      } catch (error) {
        console.error('Get cached data error:', error);
        return this.getCachedDataFromLocalStorage(key);
      }
    }

    /**
     * Clear expired cache entries
     * @returns {Promise<boolean>} Success status
     */
    async clearExpiredCache() {
      try {
        const entries = await this.getAll(this.stores.cache);
        const now = new Date();
        
        for (const entry of entries) {
          if (new Date(entry.expiresAt) < now) {
            await this.delete(this.stores.cache, entry.key);
          }
        }
        
        return true;
      } catch (error) {
        console.error('Clear expired cache error:', error);
        return false;
      }
    }

    /**
     * IndexedDB: Put operation
     * @param {string} storeName - Store name
     * @param {Object} data - Data to store
     * @returns {Promise<void>}
     */
    async put(storeName, data) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    /**
     * IndexedDB: Get operation
     * @param {string} storeName - Store name
     * @param {string} key - Key
     * @returns {Promise<Object|null>} Data
     */
    async get(storeName, key) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);
        
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    }

    /**
     * IndexedDB: Get all operation
     * @param {string} storeName - Store name
     * @returns {Promise<Array>} All data
     */
    async getAll(storeName) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    }

    /**
     * IndexedDB: Delete operation
     * @param {string} storeName - Store name
     * @param {string} key - Key
     * @returns {Promise<void>}
     */
    async delete(storeName, key) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    /**
     * LocalStorage: Set item
     * @param {string} key - Key
     * @param {*} value - Value
     */
    setLocalStorage(key, value) {
      try {
        const prefixedKey = this.storagePrefix + key;
        localStorage.setItem(prefixedKey, JSON.stringify(value));
      } catch (error) {
        console.error('LocalStorage set error:', error);
      }
    }

    /**
     * LocalStorage: Get item
     * @param {string} key - Key
     * @returns {*} Value
     */
    getLocalStorage(key) {
      try {
        const prefixedKey = this.storagePrefix + key;
        const value = localStorage.getItem(prefixedKey);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('LocalStorage get error:', error);
        return null;
      }
    }

    /**
     * LocalStorage: Remove item
     * @param {string} key - Key
     */
    removeLocalStorage(key) {
      try {
        const prefixedKey = this.storagePrefix + key;
        localStorage.removeItem(prefixedKey);
      } catch (error) {
        console.error('LocalStorage remove error:', error);
      }
    }

    /**
     * LocalStorage: Save draft fallback
     * @param {Object} draftData - Draft data
     * @returns {string} Draft ID
     */
    saveDraftToLocalStorage(draftData) {
      const draft = {
        id: draftData.id || this.generateId(),
        data: draftData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.setLocalStorage(`draft_${draft.id}`, draft);
      return draft.id;
    }

    /**
     * LocalStorage: Load draft fallback
     * @param {string} draftId - Draft ID
     * @returns {Object|null} Draft data
     */
    loadDraftFromLocalStorage(draftId) {
      const draft = this.getLocalStorage(`draft_${draftId}`);
      return draft ? draft.data : null;
    }

    /**
     * LocalStorage: Get all drafts fallback
     * @returns {Array} Array of drafts
     */
    getAllDraftsFromLocalStorage() {
      const drafts = [];
      const prefix = this.storagePrefix + 'draft_';
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          const draft = this.getLocalStorage(key.replace(prefix, ''));
          if (draft) {
            drafts.push(draft);
          }
        }
      }
      
      return drafts;
    }

    /**
     * LocalStorage: Delete draft fallback
     * @param {string} draftId - Draft ID
     * @returns {boolean} Success status
     */
    deleteDraftFromLocalStorage(draftId) {
      this.removeLocalStorage(`draft_${draftId}`);
      return true;
    }

    /**
     * LocalStorage: Save calculation fallback
     * @param {Object} calculation - Calculation data
     * @returns {string} Calculation ID
     */
    saveCalculationToLocalStorage(calculation) {
      const calc = {
        id: calculation.id || this.generateId(),
        data: calculation,
        createdAt: new Date().toISOString()
      };
      this.setLocalStorage(`calc_${calc.id}`, calc);
      return calc.id;
    }

    /**
     * LocalStorage: Load calculation fallback
     * @param {string} calcId - Calculation ID
     * @returns {Object|null} Calculation data
     */
    loadCalculationFromLocalStorage(calcId) {
      const calc = this.getLocalStorage(`calc_${calcId}`);
      return calc ? calc.data : null;
    }

    /**
     * LocalStorage: Cache data fallback
     * @param {string} key - Cache key
     * @param {Object} data - Data to cache
     * @param {number} ttl - Time to live in seconds
     * @returns {boolean} Success status
     */
    cacheDataToLocalStorage(key, data, ttl) {
      const cacheEntry = {
        key,
        data,
        expiresAt: new Date(Date.now() + ttl * 1000).toISOString()
      };
      this.setLocalStorage(`cache_${key}`, cacheEntry);
      return true;
    }

    /**
     * LocalStorage: Get cached data fallback
     * @param {string} key - Cache key
     * @returns {Object|null} Cached data
     */
    getCachedDataFromLocalStorage(key) {
      const entry = this.getLocalStorage(`cache_${key}`);
      
      if (!entry) {
        return null;
      }
      
      // Check if expired
      if (new Date(entry.expiresAt) < new Date()) {
        this.removeLocalStorage(`cache_${key}`);
        return null;
      }
      
      return entry.data;
    }

    /**
     * Generate unique ID
     * @returns {string} Unique ID
     */
    generateId() {
      return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Clear all storage
     * @returns {Promise<boolean>} Success status
     */
    async clearAll() {
      try {
        // Clear IndexedDB
        const stores = Object.values(this.stores);
        for (const storeName of stores) {
          const transaction = this.db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          store.clear();
        }
        
        // Clear localStorage
        const prefix = this.storagePrefix;
        const keysToRemove = [];
        
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(prefix)) {
            keysToRemove.push(key);
          }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        return true;
      } catch (error) {
        console.error('Clear all storage error:', error);
        return false;
      }
    }

    /**
     * Get storage usage
     * @returns {Promise<Object>} Storage usage info
     */
    async getStorageUsage() {
      try {
        // Estimate localStorage usage
        let localStorageUsage = 0;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            localStorageUsage += localStorage.getItem(key).length;
          }
        }
        
        return {
          localStorage: {
            used: localStorageUsage,
            percentage: (localStorageUsage / (5 * 1024 * 1024)) * 100 // Assuming 5MB limit
          },
          indexedDB: {
            available: true,
            stores: Object.keys(this.stores)
          }
        };
      } catch (error) {
        console.error('Get storage usage error:', error);
        return null;
      }
    }

    /**
     * Export all data
     * @returns {Promise<Object>} All stored data
     */
    async exportAllData() {
      try {
        const drafts = await this.getAllDrafts();
        const calculations = await this.getAll(this.stores.calculations);
        const cache = await this.getAll(this.stores.cache);
        
        return {
          drafts,
          calculations,
          cache,
          exportedAt: new Date().toISOString()
        };
      } catch (error) {
        console.error('Export all data error:', error);
        return null;
      }
    }

    /**
     * Import data
     * @param {Object} data - Data to import
     * @returns {Promise<boolean>} Success status
     */
    async importData(data) {
      try {
        if (data.drafts) {
          for (const draft of data.drafts) {
            await this.put(this.stores.drafts, draft);
          }
        }
        
        if (data.calculations) {
          for (const calc of data.calculations) {
            await this.put(this.stores.calculations, calc);
          }
        }
        
        if (data.cache) {
          for (const entry of data.cache) {
            await this.put(this.stores.cache, entry);
          }
        }
        
        return true;
      } catch (error) {
        console.error('Import data error:', error);
        return false;
      }
    }
  }

  // Create singleton instance
  const storageManager = new StorageManager();

  // Export for use in other modules
  window.EstimatorStorage = storageManager;

})();
