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
      { name: 'Storage', check: () => window.EstimatorStorage, init: async (storage) => await storage.init() },
      { name: 'State', check: () => window.EstimatorState, init: null },
      { name: 'Validation', check: () => window.EstimatorValidation, init: null },
      { name: 'Router', check: () => window.EstimatorRouter, init: (state) => new window.EstimatorRouter(state) },
      { name: 'MaterialEngine', check: () => window.EstimatorMaterialEngine, init: null },
      { name: 'PackageEngine', check: () => window.EstimatorPackageEngine, init: null },
      { name: 'BudgetEngine', check: () => window.EstimatorBudgetEngine, init: null },
      { name: 'RecommendationEngine', check: () => window.EstimatorRecommendationEngine, init: null },
      { name: 'ComparisonEngine', check: () => window.EstimatorComparisonEngine, init: null },
      { name: 'ModuleEngine', check: () => window.EstimatorModuleEngine, init: null },
      { name: 'BOQEngine', check: () => window.EstimatorBOQEngine, init: null },
      { name: 'PDFGenerator', check: () => window.EstimatorPDFGenerator, init: async (pdf) => await pdf.init() },
      { name: 'EstimatorEngine', check: () => window.EstimatorEngine, init: async (engine, state) => await engine.init() },
      { name: 'UI', check: () => window.EstimatorUI, init: (state, router) => new window.EstimatorUI(state, router) }
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
   * Falls back to a simple implementation if not
   */
  function resolveAssetPath(path) {
    if (!path) return '';
    
    // Use existing resolver from helpers.js if available
    if (window.resolveAssetPath && typeof window.resolveAssetPath === 'function') {
      const resolved = window.resolveAssetPath(path);
      Diagnostic.info('Asset resolved via helpers.js', { original: path, resolved });
      return resolved;
    }
    
    // Fallback implementation
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
      return path;
    }

    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(s => s.length > 0);
    const depth = pathSegments.length;
    
    let prefix = '';
    for (let i = 0; i < depth; i++) {
      prefix += '../';
    }
    
    if (depth === 0 || (depth === 1 && pathSegments[0] === 'pages')) {
      prefix = '';
    }

    const resolvedPath = prefix + path.replace(/^\.\//, '').replace(/^\.\.\//, '');
    
    Diagnostic.info('Asset resolved via fallback', { original: path, resolved: resolvedPath, currentPath, depth });
    
    return resolvedPath;
  }

  /**
   * Validate Constructor Exists
   */
  function validateConstructor(name, constructor) {
    if (!constructor) {
      Diagnostic.error(`Constructor not found: ${name}`);
      return false;
    }
    
    if (typeof constructor !== 'function') {
      Diagnostic.error(`Constructor is not a function: ${name}`, { type: typeof constructor });
      return false;
    }
    
    Diagnostic.info(`Constructor validated: ${name}`);
    return true;
  }

  /**
   * Load Module with Graceful Failure
   */
  async function loadModule(moduleConfig, context = {}) {
    const { name, check, init } = moduleConfig;
    
    Diagnostic.info(`Loading module: ${name}`);
    
    try {
      // Check if constructor exists
      const constructor = check();
      
      if (!validateConstructor(name, constructor)) {
        Diagnostic.modules[name] = { status: 'failed', error: 'Constructor not found' };
        Diagnostic.warn(`Module ${name} skipped - constructor not available`);
        return null;
      }

      // Initialize if init function provided
      let instance = constructor;
      
      if (init) {
        // Handle different init signatures
        if (name === 'Router') {
          instance = init(context.state);
        } else if (name === 'UI') {
          instance = init(context.state, context.router);
        } else if (name === 'EstimatorEngine') {
          instance = new constructor(context.state);
          const initialized = await init(instance, context.state);
          if (!initialized) {
            throw new Error('EstimatorEngine initialization failed');
          }
        } else {
          await init(instance);
        }
      }

      Diagnostic.modules[name] = { status: 'loaded', instance: !!instance };
      Diagnostic.info(`Module loaded: ${name}`);
      
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
      }
    }

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
    resolveAssetPath,
    getDiagnostic: () => Diagnostic.getReport(),
    CONFIG
  };

  // Export global asset resolver for use by other modules
  window.resolveAssetPath = resolveAssetPath;

  Diagnostic.info('Bootstrap loader loaded');

})();
