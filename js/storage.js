/**
 * Estimator Storage Engine
 * 
 * Storage management for estimator module.
 * Handles local storage, IndexedDB, and draft management.
 * 
 * Architecture:
 * - Purpose: Persist estimator data locally
 * - Dependencies: helpers.js
 * - Exports: StorageEngine class
 */

(function() {
  'use strict';

  /**
   * Storage Engine Class
   * Manages all storage operations
   */
  class StorageEngine {
    constructor() {
      // Storage keys
      this.keys = {
        draft: 'estimator_draft',
        drafts: 'estimator_drafts',
        settings: 'estimator_settings',
        cache: 'estimator_cache'
      };
      
      // IndexedDB setup
      this.dbName = 'InfiniteInteriorEstimator';
      this.dbVersion = 1;
      this.db = null;
    }

    /**
     * Initialize storage engine
     * @returns {Promise<boolean>} Success status
     */
    async init() {
      try {
        await this.initIndexedDB();
        return true;
      } catch (error) {
        console.error('Storage initialization error:', error);
        return false;
      }
    }

    /**
     * Initialize IndexedDB
     * @returns {Promise<void>}
     */
    initIndexedDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.dbVersion);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          this.db = request.result;
          resolve();
        };
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          
          // Create drafts store
          if (!db.objectStoreNames.contains('drafts')) {
            const draftsStore = db.createObjectStore('drafts', { keyPath: 'id' });
            draftsStore.createIndex('created', 'created', { unique: false });
            draftsStore.createIndex('updated', 'updated', { unique: false });
          }
          
          // Create cache store
          if (!db.objectStoreNames.contains('cache')) {
            const cacheStore = db.createObjectStore('cache', { keyPath: 'key' });
            cacheStore.createIndex('expiry', 'expiry', { unique: false });
          }
        };
      });
    }

    /**
     * Save draft to storage
     * @param {Object} data - Draft data
     * @returns {Promise<string>} Draft ID
     */
    async saveDraft(data) {
      try {
        const draftId = data.id || window.EstimatorHelper.generateId();
        const draft = {
          id: draftId,
          data: data,
          created: data.created || new Date().toISOString(),
          updated: new Date().toISOString()
        };
        
        // Save to IndexedDB
        await this.saveToIndexedDB('drafts', draft);
        
        // Save current draft ID to localStorage
        localStorage.setItem(this.keys.draft, draftId);
        
        return draftId;
      } catch (error) {
        console.error('Save draft error:', error);
        // Fallback to localStorage
        return this.saveDraftToLocalStorage(data);
      }
    }

    /**
     * Load draft from storage
     * @param {string} draftId - Draft ID
     * @returns {Promise<Object|null>} Draft data
     */
    async loadDraft(draftId) {
      try {
        // Load from IndexedDB
        const draft = await this.loadFromIndexedDB('drafts', draftId);
        
        if (draft) {
          return draft.data;
        }
        
        return null;
      } catch (error) {
        console.error('Load draft error:', error);
        // Fallback to localStorage
        return this.loadDraftFromLocalStorage(draftId);
      }
    }

    /**
     * Delete draft from storage
     * @param {string} draftId - Draft ID
     * @returns {Promise<boolean>} Success status
     */
    async deleteDraft(draftId) {
      try {
        await this.deleteFromIndexedDB('drafts', draftId);
        
        // Clear current draft ID if it was the deleted draft
        const currentDraftId = localStorage.getItem(this.keys.draft);
        if (currentDraftId === draftId) {
          localStorage.removeItem(this.keys.draft);
        }
        
        return true;
      } catch (error) {
        console.error('Delete draft error:', error);
        return false;
      }
    }

    /**
     * List all drafts
     * @returns {Promise<Array>} Array of drafts
     */
    async listDrafts() {
      try {
        const drafts = await this.getAllFromIndexedDB('drafts');
        return drafts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      } catch (error) {
        console.error('List drafts error:', error);
        return [];
      }
    }

    /**
     * Save to IndexedDB
     * @param {string} storeName - Store name
     * @param {Object} data - Data to save
     * @returns {Promise<void>}
     */
    saveToIndexedDB(storeName, data) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    /**
     * Load from IndexedDB
     * @param {string} storeName - Store name
     * @param {string} key - Data key
     * @returns {Promise<Object|null>} Data
     */
    loadFromIndexedDB(storeName, key) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);
        
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    }

    /**
     * Delete from IndexedDB
     * @param {string} storeName - Store name
     * @param {string} key - Data key
     * @returns {Promise<void>}
     */
    deleteFromIndexedDB(storeName, key) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    /**
     * Get all from IndexedDB store
     * @param {string} storeName - Store name
     * @returns {Promise<Array>} All data
     */
    getAllFromIndexedDB(storeName) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    }

    /**
     * Save draft to localStorage (fallback)
     * @param {Object} data - Draft data
     * @returns {string} Draft ID
     */
    saveDraftToLocalStorage(data) {
      const draftId = data.id || window.EstimatorHelper.generateId();
      const drafts = this.getDraftsFromLocalStorage();
      
      drafts[draftId] = {
        id: draftId,
        data: data,
        created: data.created || new Date().toISOString(),
        updated: new Date().toISOString()
      };
      
      localStorage.setItem(this.keys.drafts, JSON.stringify(drafts));
      localStorage.setItem(this.keys.draft, draftId);
      
      return draftId;
    }

    /**
     * Load draft from localStorage (fallback)
     * @param {string} draftId - Draft ID
     * @returns {Object|null} Draft data
     */
    loadDraftFromLocalStorage(draftId) {
      const drafts = this.getDraftsFromLocalStorage();
      return drafts[draftId] ? drafts[draftId].data : null;
    }

    /**
     * Delete draft from localStorage (fallback)
     * @param {string} draftId - Draft ID
     * @returns {boolean} Success status
     */
    deleteDraftFromLocalStorage(draftId) {
      const drafts = this.getDraftsFromLocalStorage();
      delete drafts[draftId];
      localStorage.setItem(this.keys.drafts, JSON.stringify(drafts));
      
      const currentDraftId = localStorage.getItem(this.keys.draft);
      if (currentDraftId === draftId) {
        localStorage.removeItem(this.keys.draft);
      }
      
      return true;
    }

    /**
     * Get drafts from localStorage
     * @returns {Object} Drafts object
     */
    getDraftsFromLocalStorage() {
      try {
        const drafts = localStorage.getItem(this.keys.drafts);
        return drafts ? JSON.parse(drafts) : {};
      } catch (error) {
        console.error('Get drafts error:', error);
        return {};
      }
    }

    /**
     * Cache data with expiry
     * @param {string} key - Cache key
     * @param {*} data - Data to cache
     * @param {number} ttl - Time to live in milliseconds
     * @returns {Promise<boolean>} Success status
     */
    async cache(key, data, ttl = 3600000) {
      try {
        const expiry = Date.now() + ttl;
        await this.saveToIndexedDB('cache', { key, data, expiry });
        return true;
      } catch (error) {
        console.error('Cache error:', error);
        return false;
      }
    }

    /**
     * Get cached data
     * @param {string} key - Cache key
     * @returns {Promise<*>} Cached data or null
     */
    async getCached(key) {
      try {
        const cached = await this.loadFromIndexedDB('cache', key);
        
        if (cached && cached.expiry > Date.now()) {
          return cached.data;
        }
        
        // Remove expired cache
        if (cached) {
          await this.deleteFromIndexedDB('cache', key);
        }
        
        return null;
      } catch (error) {
        console.error('Get cached error:', error);
        return null;
      }
    }

    /**
     * Clear expired cache entries
     * @returns {Promise<number>} Number of cleared entries
     */
    async clearExpiredCache() {
      try {
        const allCache = await this.getAllFromIndexedDB('cache');
        const now = Date.now();
        let cleared = 0;
        
        for (const entry of allCache) {
          if (entry.expiry < now) {
            await this.deleteFromIndexedDB('cache', entry.key);
            cleared++;
          }
        }
        
        return cleared;
      } catch (error) {
        console.error('Clear expired cache error:', error);
        return 0;
      }
    }

    /**
     * Get current draft ID
     * @returns {string|null} Draft ID
     */
    getCurrentDraftId() {
      return localStorage.getItem(this.keys.draft);
    }

    /**
     * Set current draft ID
     * @param {string} draftId - Draft ID
     */
    setCurrentDraftId(draftId) {
      localStorage.setItem(this.keys.draft, draftId);
    }

    /**
     * Clear current draft ID
     */
    clearCurrentDraftId() {
      localStorage.removeItem(this.keys.draft);
    }

    /**
     * Clear all storage
     * @returns {Promise<boolean>} Success status
     */
    async clearAll() {
      try {
        // Clear IndexedDB
        const drafts = await this.getAllFromIndexedDB('drafts');
        for (const draft of drafts) {
          await this.deleteFromIndexedDB('drafts', draft.id);
        }
        
        const cache = await this.getAllFromIndexedDB('cache');
        for (const entry of cache) {
          await this.deleteFromIndexedDB('cache', entry.key);
        }
        
        // Clear localStorage
        localStorage.removeItem(this.keys.draft);
        localStorage.removeItem(this.keys.drafts);
        localStorage.removeItem(this.keys.settings);
        localStorage.removeItem(this.keys.cache);
        
        return true;
      } catch (error) {
        console.error('Clear all error:', error);
        return false;
      }
    }

    /**
     * Get storage usage
     * @returns {Promise<Object>} Storage usage info
     */
    async getStorageUsage() {
      try {
        const drafts = await this.getAllFromIndexedDB('drafts');
        const cache = await this.getAllFromIndexedDB('cache');
        
        return {
          draftsCount: drafts.length,
          cacheCount: cache.length,
          localStorage: {
            draft: localStorage.getItem(this.keys.draft),
            drafts: localStorage.getItem(this.keys.drafts),
            settings: localStorage.getItem(this.keys.settings),
            cache: localStorage.getItem(this.keys.cache)
          }
        };
      } catch (error) {
        console.error('Get storage usage error:', error);
        return null;
      }
    }
  }

  // Export for use in other modules
  window.EstimatorStorage = StorageEngine;

})();
