/**
 * Estimator Validation Engine
 * 
 * Validation architecture for estimator module.
 * Provides schema validation and form validation capabilities.
 * 
 * Architecture:
 * - Purpose: Validate user input and state
 * - Dependencies: helpers.js
 * - Exports: ValidationEngine class
 */

(function() {
  'use strict';

  /**
   * Validation Engine Class
   * Manages all validation logic
   */
  class ValidationEngine {
    constructor() {
      // Validation rules
      this.rules = {};
      
      // Custom validators
      this.validators = {};
      
      // Validation errors
      this.errors = {};
    }

    /**
     * Add validation rule
     * @param {string} field - Field name
     * @param {Array} rules - Array of validation rules
     */
    addRule(field, rules) {
      this.rules[field] = rules;
    }

    /**
     * Remove validation rule
     * @param {string} field - Field name
     */
    removeRule(field) {
      delete this.rules[field];
    }

    /**
     * Add custom validator
     * @param {string} name - Validator name
     * @param {Function} validator - Validator function
     */
    addValidator(name, validator) {
      this.validators[name] = validator;
    }

    /**
     * Remove custom validator
     * @param {string} name - Validator name
     */
    removeValidator(name) {
      delete this.validators[name];
    }

    /**
     * Validate field
     * @param {string} field - Field name
     * @param {*} value - Field value
     * @returns {Object} Validation result
     */
    validateField(field, value) {
      const fieldRules = this.rules[field];
      
      if (!fieldRules) {
        return { valid: true, errors: [] };
      }
      
      const errors = [];
      
      for (const rule of fieldRules) {
        const result = this.validateRule(rule, value);
        
        if (!result.valid) {
          errors.push(result.message);
        }
      }
      
      return {
        valid: errors.length === 0,
        errors: errors
      };
    }

    /**
     * Validate single rule
     * @param {Object} rule - Rule object
     * @param {*} value - Field value
     * @returns {Object} Validation result
     */
    validateRule(rule, value) {
      const { type, message, ...params } = rule;
      
      // Check for custom validator
      if (this.validators[type]) {
        const result = this.validators[type](value, params);
        return {
          valid: result,
          message: result ? null : message
        };
      }
      
      // Built-in validators
      switch (type) {
        case 'required':
          return this.validateRequired(value, message);
        case 'email':
          return this.validateEmail(value, message);
        case 'phone':
          return this.validatePhone(value, message);
        case 'min':
          return this.validateMin(value, params.value, message);
        case 'max':
          return this.validateMax(value, params.value, message);
        case 'minLength':
          return this.validateMinLength(value, params.value, message);
        case 'maxLength':
          return this.validateMaxLength(value, params.value, message);
        case 'pattern':
          return this.validatePattern(value, params.regex, message);
        case 'numeric':
          return this.validateNumeric(value, message);
        case 'integer':
          return this.validateInteger(value, message);
        case 'positive':
          return this.validatePositive(value, message);
        default:
          return { valid: true, message: null };
      }
    }

    /**
     * Validate required field
     * @param {*} value - Field value
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validateRequired(value, message) {
      const valid = value !== null && value !== undefined && value !== '';
      return {
        valid,
        message: valid ? null : message || 'This field is required'
      };
    }

    /**
     * Validate email
     * @param {string} value - Email value
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validateEmail(value, message) {
      if (!value) return { valid: true, message: null };
      
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = regex.test(value);
      
      return {
        valid,
        message: valid ? null : message || 'Please enter a valid email address'
      };
    }

    /**
     * Validate phone number
     * @param {string} value - Phone value
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validatePhone(value, message) {
      if (!value) return { valid: true, message: null };
      
      const regex = /^[0-9]{10}$/;
      const valid = regex.test(value.replace(/[^0-9]/g, ''));
      
      return {
        valid,
        message: valid ? null : message || 'Please enter a valid phone number'
      };
    }

    /**
     * Validate minimum value
     * @param {number} value - Field value
     * @param {number} min - Minimum value
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validateMin(value, min, message) {
      if (value === null || value === undefined) return { valid: true, message: null };
      
      const valid = parseFloat(value) >= min;
      return {
        valid,
        message: valid ? null : message || `Minimum value is ${min}`
      };
    }

    /**
     * Validate maximum value
     * @param {number} value - Field value
     * @param {number} max - Maximum value
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validateMax(value, max, message) {
      if (value === null || value === undefined) return { valid: true, message: null };
      
      const valid = parseFloat(value) <= max;
      return {
        valid,
        message: valid ? null : message || `Maximum value is ${max}`
      };
    }

    /**
     * Validate minimum length
     * @param {string} value - Field value
     * @param {number} min - Minimum length
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validateMinLength(value, min, message) {
      if (!value) return { valid: true, message: null };
      
      const valid = value.length >= min;
      return {
        valid,
        message: valid ? null : message || `Minimum length is ${min} characters`
      };
    }

    /**
     * Validate maximum length
     * @param {string} value - Field value
     * @param {number} max - Maximum length
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validateMaxLength(value, max, message) {
      if (!value) return { valid: true, message: null };
      
      const valid = value.length <= max;
      return {
        valid,
        message: valid ? null : message || `Maximum length is ${max} characters`
      };
    }

    /**
     * Validate pattern
     * @param {string} value - Field value
     * @param {RegExp} pattern - Regular expression
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validatePattern(value, pattern, message) {
      if (!value) return { valid: true, message: null };
      
      const valid = pattern.test(value);
      return {
        valid,
        message: valid ? null : message || 'Invalid format'
      };
    }

    /**
     * Validate numeric value
     * @param {*} value - Field value
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validateNumeric(value, message) {
      if (value === null || value === undefined) return { valid: true, message: null };
      
      const valid = !isNaN(parseFloat(value)) && isFinite(value);
      return {
        valid,
        message: valid ? null : message || 'Please enter a valid number'
      };
    }

    /**
     * Validate integer value
     * @param {*} value - Field value
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validateInteger(value, message) {
      if (value === null || value === undefined) return { valid: true, message: null };
      
      const valid = Number.isInteger(Number(value));
      return {
        valid,
        message: valid ? null : message || 'Please enter a whole number'
      };
    }

    /**
     * Validate positive value
     * @param {number} value - Field value
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    validatePositive(value, message) {
      if (value === null || value === undefined) return { valid: true, message: null };
      
      const valid = parseFloat(value) > 0;
      return {
        valid,
        message: valid ? null : message || 'Value must be positive'
      };
    }

    /**
     * Validate object against schema
     * @param {Object} data - Data to validate
     * @param {Object} schema - Validation schema
     * @returns {Object} Validation result
     */
    validateSchema(data, schema) {
      const errors = {};
      let valid = true;
      
      for (const [field, fieldRules] of Object.entries(schema)) {
        const value = data[field];
        const result = this.validateField(field, value);
        
        if (!result.valid) {
          errors[field] = result.errors;
          valid = false;
        }
      }
      
      return {
        valid,
        errors
      };
    }

    /**
     * Validate step data
     * @param {number} stepId - Step ID
     * @param {Object} data - Step data
     * @returns {Object} Validation result
     */
    validateStep(stepId, data) {
      // Placeholder for step-specific validation
      // Will be implemented with validation rules from JSON
      const stepSchemas = {
        1: 'package',
        2: 'budget',
        3: 'rooms',
        4: 'modules',
        5: 'materials',
        6: 'details',
        7: 'review',
        8: 'summary'
      };
      
      const schemaName = stepSchemas[stepId];
      
      if (schemaName && this.rules[schemaName]) {
        return this.validateSchema(data, this.rules[schemaName]);
      }
      
      return { valid: true, errors: {} };
    }

    /**
     * Clear all errors
     */
    clearErrors() {
      this.errors = {};
    }

    /**
     * Get errors for field
     * @param {string} field - Field name
     * @returns {Array} Field errors
     */
    getFieldErrors(field) {
      return this.errors[field] || [];
    }

    /**
     * Set error for field
     * @param {string} field - Field name
     * @param {string} error - Error message
     */
    setFieldError(field, error) {
      if (!this.errors[field]) {
        this.errors[field] = [];
      }
      this.errors[field].push(error);
    }

    /**
     * Clear errors for field
     * @param {string} field - Field name
     */
    clearFieldError(field) {
      delete this.errors[field];
    }
  }

  // Export for use in other modules
  window.EstimatorValidation = ValidationEngine;

})();
