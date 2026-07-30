/**
 * Estimator Bootstrap Loader
 * 
 * Orchestrates the complete initialization of the Estimator module with:
 * - Graceful failure handling
 * - Comprehensive diagnostics
 * - Runtime validation
 * - Asset path resolution
 * 
 * Architecture:
 * - Purpose: Bootstrap the Estimator application with error resilience
 * - Dependencies: helpers.js (must load first)
 * - Exports: Bootstrap object with diagnostic capabilities
 */

(function() {
  'use strict';

  /**
   * Bootstrap Configuration
   */
  const CONFIG = {
    // Module loading order
    modules: [
      { name: 'Storage', check: () => window.EstimatorStorage, init: null }, // Singleton, will call init() if exists
      { name: 'State', check: () => window.EstimatorState, init: null }, // Singleton
      { name: 'Validation', check: () => window.EstimatorValidation, init: null }, // Constructor
      { name: 'Router', check: () => window.EstimatorRouter, init: null }, // Constructor, will receive state from context
      { name: 'MaterialEngine', check: () => window.EstimatorMaterialEngine, init: null }, // Constructor
      { name: 'PackageEngine', check: () => window.EstimatorPackageEngine, init: null }, // Constructor
      { name: 'BudgetEngine', check: () => window.EstimatorBudgetEngine, init: null }, // Constructor
      { name: 'RecommendationEngine', check: () => window.EstimatorRecommendationEngine, init: null }, // Constructor
      { name: 'ComparisonEngine', check: () => window.EstimatorComparisonEngine, init: null }, // Constructor
      { name: 'ModuleEngine', check: () => window.EstimatorModuleEngine, init: null }, // Constructor
      { name: 'BOQEngine', check: () => window.EstimatorBOQEngine, init: null }, // Constructor
      { name: 'PDFGenerator', check: () => window.EstimatorPDFGenerator, init: null }, // Constructor, will call init() if exists
      { name: 'EstimatorEngine', check: () => window.EstimatorEngine, init: null }, // Constructor
      { name: 'UI', check: () => window.EstimatorUI, init: null } // Constructor, will receive state and router from context
    ],

    // Data files to load
    dataFiles: [
      { name: 'Materials', path: 'data/estimator/materials.json' },
      { name: 'PricingRules', path: 'data/estimator/pricing-rules.json' },
      { name: 'Recommendations', path: 'data/estimator/recommendations.json' },
      { name: 'UpgradeRules', path: 'data/estimator/upgrade-rules.json' }
    ],

    // Diagnostic settings
    diagnostics: {
      logToConsole: true,
      showWarnings: true,
      showErrors: true,
      trackTimeline: true
    }
  };

  /**
   * Diagnostic Logger
   */
  const Diagnostic = {
    timeline: [],
    errors: [],
    warnings: [],
    modules: {},
    assets: {},
    fetches: {},

    log(level, message, data = null) {
      const timestamp = new Date().toISOString();
      const entry = { timestamp, level, message, data };
      
      this.timeline.push(entry);
      
      if (CONFIG.diagnostics.logToConsole) {
        const prefix = `[Estimator Bootstrap ${level.toUpperCase()}]`;
        if (data) {
          console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](prefix, message, data);
        } else {
          console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](prefix, message);
        }
      }

      if (level === 'error') this.errors.push(entry);
      if (level === 'warn') this.warnings.push(entry);
    },

    info(message, data) { this.log('info', message, data); },
    warn(message, data) { this.log('warn', message, data); },
    error(message, data) { this.log('error', message, data); },

    getReport() {
      return {
        timeline: this.timeline,
        errors: this.errors,
        warnings: this.warnings,
        modules: this.modules,
        assets: this.assets,
        fetches: this.fetches,
        summary: {
          totalErrors: this.errors.length,
          totalWarnings: this.warnings.length,
          totalModules: Object.keys(this.modules).length,
          successfulModules: Object.values(this.modules).filter(m => m.status === 'loaded').length,
          failedModules: Object.values(this.modules).filter(m => m.status === 'failed').length
        }
      };
    }
  };

  /**
   * Global Asset Resolver
   * Uses the existing resolveAssetPath from helpers.js if available
   * Falls back to browser-native URL resolution if not
   */
  function resolveAssetPath(path) {
    if (!path) return '';
    
    // Use existing resolver from helpers.js if available
    if (window.resolveAssetPath && typeof window.resolveAssetPath === 'function') {
      const resolved = window.resolveAssetPath(path);
      Diagnostic.info('Asset resolved via helpers.js', { original: path, resolved });
      return resolved;
    }
    
    // Fallback: Use browser-native URL resolution
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    try {
      const currentUrl = window.location.href;
      const resolvedUrl = new URL(path, currentUrl);
      
      // Convert to relative path from current page
      const currentPath = window.location.pathname;
      const resolvedPath = resolvedUrl.pathname;
      
      // Calculate relative path
      const currentSegments = currentPath.split('/').filter(s => s.length > 0);
      const resolvedSegments = resolvedPath.split('/').filter(s => s.length > 0);
      
      // Find common prefix
      let commonDepth = 0;
      while (commonDepth < currentSegments.length && 
             commonDepth < resolvedSegments.length && 
             currentSegments[commonDepth] === resolvedSegments[commonDepth]) {
        commonDepth++;
      }
      
      // Calculate relative path
      const upLevels = currentSegments.length - commonDepth;
      const relativePath = '../'.repeat(upLevels) + resolvedSegments.slice(commonDepth).join('/');
      
      Diagnostic.info('Asset resolved via fallback', { original: path, resolved: relativePath });
      
      return relativePath;
      
    } catch (error) {
      Diagnostic.error('Asset path resolution error', { error: error.message });
      return path;
    }
  }

  /**
   * Validate Module (accepts both singletons and constructors)
   */
  function validateModule(name, module) {
    if (!module) {
      Diagnostic.error(`Module not found: ${name}`);
      return false;
    }
    
    // Accept both singleton instances (object) and constructors (function)
    if (typeof module !== 'object' && typeof module !== 'function') {
      Diagnostic.error(`Module is neither object nor function: ${name}`, { type: typeof module });
      return false;
    }
    
    Diagnostic.info(`Module validated: ${name}`, { type: typeof module });
    return true;
  }

  /**
   * Load Module with Graceful Failure
   */
  async function loadModule(moduleConfig, context = {}) {
    const { name, check, init } = moduleConfig;
    
    Diagnostic.info(`Loading module: ${name}`);
    
    try {
      // Check if module exists
      const module = check();
      
      if (!validateModule(name, module)) {
        Diagnostic.modules[name] = { status: 'failed', error: 'Module not found' };
        Diagnostic.warn(`Module ${name} skipped - module not available`);
        return null;
      }

      // Handle singleton instances vs constructors
      let instance = module;
      
      if (typeof module === 'function') {
        // It's a constructor, instantiate it
        Diagnostic.info(`Instantiating constructor: ${name}`);
        
        // Handle different constructor signatures
        if (name === 'Router') {
          // Router requires state parameter
          if (!context.state) {
            throw new Error('Router requires state to be available');
          }
          instance = new module(context.state);
        } else if (name === 'UI') {
          // UI requires state and router parameters
          if (!context.state || !context.router) {
            throw new Error('UI requires state and router to be available');
          }
          instance = new module(context.state, context.router);
        } else if (name === 'EstimatorEngine') {
          // EstimatorEngine requires state parameter
          if (!context.state) {
            throw new Error('EstimatorEngine requires state to be available');
          }
          instance = new module(context.state);
        } else {
          instance = new module();
        }
      } else {
        // It's a singleton instance, use directly
        Diagnostic.info(`Using singleton instance: ${name}`);
      }

      // Call init if provided and exists on the instance
      if (init) {
        if (typeof init === 'function') {
          // Custom init function provided in config
          if (name === 'Router') {
            instance = init(context.state);
          } else if (name === 'UI') {
            instance = init(context.state, context.router);
          } else if (name === 'EstimatorEngine') {
            const initialized = await init(instance, context.state);
            if (!initialized) {
              throw new Error('EstimatorEngine initialization failed');
            }
          } else {
            await init(instance);
          }
        }
      } else if (typeof instance.init === 'function') {
        // Call the instance's init method if it exists
        Diagnostic.info(`Calling init() on ${name}`);
        await instance.init();
      }

      Diagnostic.modules[name] = { status: 'loaded', instance: !!instance, type: typeof module };
      console.log(`✓ ${name} Loaded`);
      
      return instance;
      
    } catch (error) {
      Diagnostic.modules[name] = { status: 'failed', error: error.message };
      Diagnostic.error(`Module failed: ${name}`, { error: error.message, stack: error.stack });
      Diagnostic.warn(`Module ${name} skipped due to error - continuing startup`);
      return null;
    }
  }

  /**
   * Load Data File with Validation
   */
  async function loadDataFile(dataConfig) {
    const { name, path } = dataConfig;
    const resolvedPath = resolveAssetPath(path);
    
    Diagnostic.info(`Loading data file: ${name}`, { path, resolvedPath });
    
    try {
      const response = await fetch(resolvedPath);
      
      Diagnostic.fetches[name] = {
        requestedURL: path,
        resolvedURL: resolvedPath,
        httpStatus: response.status,
        ok: response.ok,
        statusText: response.statusText
      };

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Validate JSON structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON structure - expected object');
      }

      Diagnostic.fetches[name].fileExists = true;
      Diagnostic.fetches[name].jsonParsed = true;
      Diagnostic.fetches[name].data = data;
      
      Diagnostic.info(`Data file loaded: ${name}`, { size: JSON.stringify(data).length });
      
      return data;
      
    } catch (error) {
      Diagnostic.fetches[name] = {
        requestedURL: path,
        resolvedURL: resolvedPath,
        httpStatus: 'ERROR',
        fileExists: false,
        jsonParsed: false,
        error: error.message
      };
      
      Diagnostic.error(`Data file failed: ${name}`, { error: error.message, resolvedPath });
      Diagnostic.warn(`Data file ${name} skipped - using empty object`);
      
      return null;
    }
  }

  /**
   * Main Bootstrap Function
   */
  async function bootstrap() {
    Diagnostic.info('=== ESTIMATOR BOOTSTRAP START ===');
    Diagnostic.info('Current page context', { 
      pathname: window.location.pathname,
      href: window.location.href 
    });

    const context = {};
    const results = {
      storage: null,
      state: null,
      router: null,
      engines: {},
      ui: null,
      engine: null
    };

    // Phase 1: Load Core Modules
    Diagnostic.info('--- PHASE 1: CORE MODULES ---');
    
    // Storage
    results.storage = await loadModule(CONFIG.modules[0]); // Storage
    if (results.storage) {
      context.storage = results.storage;
    }

    // State
    results.state = await loadModule(CONFIG.modules[1]); // State
    if (results.state) {
      context.state = results.state;
    }

    // Validation
    await loadModule(CONFIG.modules[2]); // Validation

    // Phase 2: Load Router
    Diagnostic.info('--- PHASE 2: ROUTER ---');
    results.router = await loadModule(CONFIG.modules[3], context); // Router
    if (results.router) {
      context.router = results.router;
      results.router.init();
    }

    // Phase 3: Load Data Files
    Diagnostic.info('--- PHASE 3: DATA FILES ---');
    const dataResults = {};
    for (const dataConfig of CONFIG.dataFiles) {
      const data = await loadDataFile(dataConfig);
      if (data) {
        dataResults[dataConfig.name] = data;
        console.log(`✓ ${dataConfig.name} Loaded`);
      }
    }
    console.log('✓ Assets Loaded');

    // Phase 4: Load Engine Modules
    Diagnostic.info('--- PHASE 4: ENGINE MODULES ---');
    
    results.engines.material = await loadModule(CONFIG.modules[4]); // MaterialEngine
    results.engines.package = await loadModule(CONFIG.modules[5]); // PackageEngine
    results.engines.budget = await loadModule(CONFIG.modules[6]); // BudgetEngine
    results.engines.recommendation = await loadModule(CONFIG.modules[7]); // RecommendationEngine
    results.engines.comparison = await loadModule(CONFIG.modules[8]); // ComparisonEngine
    results.engines.module = await loadModule(CONFIG.modules[9]); // ModuleEngine
    results.engines.boq = await loadModule(CONFIG.modules[10]); // BOQEngine

    // Initialize engines with data
    if (results.engines.material && dataResults.Materials) {
      results.engines.material.init(dataResults.Materials);
    }
    if (results.engines.package && dataResults.Materials) {
      results.engines.package.init(dataResults.Materials);
    }
    if (results.engines.budget && dataResults.PricingRules) {
      results.engines.budget.init(dataResults.PricingRules);
    }
    if (results.engines.recommendation && dataResults.Recommendations && dataResults.UpgradeRules) {
      results.engines.recommendation.init(dataResults.Recommendations, dataResults.UpgradeRules);
    }

    // Phase 5: Load PDF Generator
    Diagnostic.info('--- PHASE 5: PDF GENERATOR ---');
    const pdfGenerator = await loadModule(CONFIG.modules[11]); // PDFGenerator
    if (pdfGenerator) {
      context.pdfGenerator = pdfGenerator;
    }

    // Phase 6: Load Estimator Engine
    Diagnostic.info('--- PHASE 6: ESTIMATOR ENGINE ---');
    
    // Create EstimatorEngine instance
    const EstimatorEngineConstructor = window.EstimatorEngine;
    if (!EstimatorEngineConstructor) {
      Diagnostic.error('EstimatorEngine constructor not found');
    } else {
      results.engine = new EstimatorEngineConstructor(context.state);
      
      // Initialize storage
      if (results.storage) {
        results.engine.storage = results.storage;
      }
      
      // Set data directly on engine (bypassing loadJSON which may fail)
      results.engine.materialsData = dataResults.Materials || null;
      results.engine.pricingRules = dataResults.PricingRules || null;
      results.engine.recommendationsData = dataResults.Recommendations || null;
      results.engine.upgradeRules = dataResults.UpgradeRules || null;
      
      // Initialize sub-engines
      try {
        results.engine.materialEngine = results.engines.material;
        results.engine.budgetEngine = results.engines.budget;
        results.engine.recommendationEngine = results.engines.recommendation;
        results.engine.comparisonEngine = results.engines.comparison;
        results.engine.packageEngine = results.engines.package;
        results.engine.moduleEngine = results.engines.module;
        results.engine.boqEngine = results.engines.boq;
        results.engine.validation = new window.EstimatorValidation();
        
        // Initialize engines with data
        if (results.engine.materialEngine && dataResults.Materials) {
          results.engine.materialEngine.init(dataResults.Materials);
        }
        if (results.engine.packageEngine && dataResults.Materials) {
          results.engine.packageEngine.init(dataResults.Materials);
        }
        if (results.engine.budgetEngine && dataResults.PricingRules) {
          results.engine.budgetEngine.init(dataResults.PricingRules);
        }
        if (results.engine.recommendationEngine && dataResults.Recommendations && dataResults.UpgradeRules) {
          results.engine.recommendationEngine.init(dataResults.Recommendations, dataResults.UpgradeRules);
        }
        
        // Initialize PDF generator with safe fallback
        try {
          if (context.pdfGenerator) {
            results.engine.pdfGenerator = context.pdfGenerator;
          }
        } catch (pdfError) {
          Diagnostic.warn('PDF generator initialization failed', { error: pdfError.message });
          results.engine.pdfGenerator = null;
        }
        
        Diagnostic.modules['EstimatorEngine'] = { status: 'loaded', instance: true };
        Diagnostic.info('EstimatorEngine initialized successfully');
        
      } catch (error) {
        Diagnostic.modules['EstimatorEngine'] = { status: 'failed', error: error.message };
        Diagnostic.error('EstimatorEngine initialization failed', { error: error.message });
        results.engine = null;
      }
      
      if (results.engine) {
        context.engine = results.engine;
      }
    }

    // Phase 7: Load UI
    Diagnostic.info('--- PHASE 7: UI MODULE ---');
    results.ui = await loadModule(CONFIG.modules[13], context); // UI
    if (results.ui) {
      results.ui.init();
      context.ui = results.ui;
    }

    // Phase 8: Final Validation
    Diagnostic.info('--- PHASE 8: FINAL VALIDATION ---');
    
    const criticalModules = ['Storage', 'State', 'Router', 'UI'];
    const criticalStatus = criticalModules.map(name => ({
      name,
      loaded: Diagnostic.modules[name]?.status === 'loaded'
    }));

    const allCriticalLoaded = criticalStatus.every(m => m.loaded);

    if (!allCriticalLoaded) {
      Diagnostic.error('Critical modules failed to load', { criticalStatus });
      Diagnostic.warn('Application may not function correctly');
    } else {
      Diagnostic.info('All critical modules loaded successfully');
    }

    Diagnostic.info('=== ESTIMATOR BOOTSTRAP COMPLETE ===');

    // Return results and diagnostic report
    return {
      success: allCriticalLoaded,
      results,
      context,
      diagnostic: Diagnostic.getReport()
    };
  }

  // Export Bootstrap object
  window.EstimatorBootstrap = {
    bootstrap,
    resolveAssetPath: function(path) {
      if (!path) return '';
      if (window.resolveAssetPath && typeof window.resolveAssetPath === 'function' && window.resolveAssetPath !== this.resolveAssetPath) {
        return window.resolveAssetPath(path);
      }
      const baseUrl = (typeof window.getBaseUrl === 'function') ? window.getBaseUrl() : '/';
      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      return baseUrl + cleanPath;
    },
    getDiagnostic: () => Diagnostic.getReport(),
    CONFIG
  };

  // Export global asset resolver for use by other modules
  window.resolveAssetPath = resolveAssetPath;

  Diagnostic.info('Bootstrap loader loaded');

})();
