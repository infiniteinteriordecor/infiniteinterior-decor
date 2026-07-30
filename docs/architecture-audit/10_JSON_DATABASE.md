# 10_JSON_DATABASE.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete JSON database structure and analysis

---

## JSON Files Overview

| File | Path | Purpose | Size | Schema |
|------|------|---------|------|--------|
| Main Database | data/database.json | Main site content database | 734 lines | No |
| Materials | data/estimator/materials.json | Material definitions | 106 lines | JSON Schema |
| Pricing Rules | data/estimator/pricing-rules.json | Pricing calculation rules | 164 lines | JSON Schema |
| Recommendations | data/estimator/recommendations.json | Recommendation rules | 159 lines | JSON Schema |
| Upgrade Rules | data/estimator/upgrade-rules.json | Upgrade cost rules | Unknown | JSON Schema |
| Validation Rules | data/estimator/validation-rules.json | Validation rules | Unknown | JSON Schema |
| Brands | data/estimator/brands.json | Brand database | Unknown | No |
| Cities | data/estimator/cities.json | City database | Unknown | No |
| Hardware | data/estimator/hardware.json | Hardware database | Unknown | No |
| Modules | data/estimator/modules.json | Module definitions | Unknown | No |
| Package Library | data/estimator/package-library.json | Package library | Unknown | No |
| Room Library | data/estimator/room-library.json | Room library | Unknown | No |
| Styles | data/estimator/styles.json | Style definitions | Unknown | No |
| Material Sub-files | data/estimator/materials/*.json | Detailed material data | 18 files | No |
| Manifest | manifest.json | PWA manifest | Unknown | No |

**Total JSON Files:** 29  
**Main Site JSON:** 1  
**Estimator JSON:** 28  
**Schema Validated:** 4  
**Material Sub-files:** 18  

---

## Main Site Database

### data/database.json

**Purpose:** Central database for main website content

**Schema Version:** Not defined

**Structure:**

```json
{
  "company": {
    "name": "Infinite Interior Decor",
    "headOffice": "Bhimtal, Uttarakhand, India",
    "established": "2015",
    "operations": "Pan India",
    "business": "Premium Interior Design & Turnkey Execution",
    "email": "infiniteinteriordecor@gmail.com",
    "phone": "+91 6398038550"
  },
  "about": {
    "description": "...",
    "mission": "...",
    "vision": "...",
    "values": [...],
    "industries": [...]
  },
  "statistics": [...],
  "services": [...],
  "projects": [...],
  "gallery": [...],
  "team": [...],
  "testimonials": [...],
  "faq": [...]
}
```

**Sections:**
- **company:** Company information
- **about:** About section content
- **statistics:** Company statistics (9+ years, 500+ projects, etc.)
- **services:** Service offerings
- **projects:** Project portfolio
- **gallery:** Gallery images
- **team:** Team members
- **testimonials:** Client testimonials
- **faq:** Frequently asked questions

**Used By:**
- core/schema.js (Schema.org generation)
- pages/home.js (Homepage rendering)
- pages/projects.js (Projects page rendering)

**Loading:** Fetch via `window.resolveAssetPath('data/database.json')`

---

## Estimator JSON Database

### 1. data/estimator/materials.json

**Purpose:** Material definitions for estimator calculations

**Schema Version:** Defined (JSON Schema Draft 07)

**Schema ID:** https://infiniteinteriordecor.com/schemas/materials.json

**Structure:**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://infiniteinteriordecor.com/schemas/materials.json",
  "title": "Materials Library",
  "description": "Material definitions for interior design estimator with pricing and tier information",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "materials": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9_-]+$": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "name": { "type": "string" },
            "category": {
              "type": "string",
              "enum": ["flooring", "walls", "ceiling", "furniture", "lighting", "accessories", "hardware"]
            },
            "basePrice": { "type": "number", "minimum": 0 },
            "unit": {
              "type": "string",
              "enum": ["sqft", "sqm", "piece", "meter", "kg", "liter"]
            },
            "description": { "type": "string" },
            "tierPricing": {
              "type": "object",
              "properties": {
                "essential": { "type": "number" },
                "premium": { "type": "number" },
                "luxury": { "type": "number" },
                "elite": { "type": "number" }
              }
            }
          }
        }
      }
    }
  }
}
```

**Categories:**
- flooring
- walls
- ceiling
- furniture
- lighting
- accessories
- hardware

**Tiers:**
- essential (multiplier: 1.0)
- premium (multiplier: 1.3)
- luxury (multiplier: 1.6)
- elite (multiplier: 2.0)

**Units:**
- sqft (square feet)
- sqm (square meter)
- piece (per piece)
- meter (per meter)
- kg (per kilogram)
- liter (per liter)

**Used By:**
- MaterialEngine
- PackageEngine
- ModuleEngine
- BOQEngine

**Loading:** Loaded by Bootstrap in Phase 3

---

### 2. data/estimator/pricing-rules.json

**Purpose:** Pricing calculation rules and cost multipliers

**Schema Version:** Defined (JSON Schema Draft 07)

**Schema ID:** https://infiniteinteriordecor.com/schemas/pricing-rules.json

**Structure:**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://infiniteinteriordecor.com/schemas/pricing-rules.json",
  "title": "Pricing Rules",
  "description": "Pricing calculation rules and cost multipliers for estimator engine",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "baseRates": {
      "type": "object",
      "properties": {
        "labor": { "type": "number" },
        "design": { "type": "number" },
        "installation": { "type": "number" },
        "contingency": { "type": "number" },
        "tax": { "type": "number" }
      }
    },
    "tierMultipliers": {
      "type": "object",
      "properties": {
        "essential": { "type": "number" },
        "premium": { "type": "number" },
        "luxury": { "type": "number" },
        "elite": { "type": "number" }
      }
    },
    "componentMargins": {
      "type": "object",
      "properties": {
        "materials": { "type": "number" },
        "hardware": { "type": "number" },
        "lighting": { "type": "number" },
        "finish": { "type": "number" }
      }
    },
    "gstRate": { "type": "number" }
  }
}
```

**Base Rates:**
- labor: Base labor rate per sqft
- design: Base design fee percentage
- installation: Base installation fee percentage
- contingency: Base contingency percentage
- tax: Base tax percentage (GST)

**Tier Multipliers:**
- essential: 1.0
- premium: 1.3
- luxury: 1.6
- elite: 2.0

**Component Margins:**
- materials margin
- hardware margin
- lighting margin
- finish margin

**GST Rate:** 18%

**Used By:**
- BudgetEngine
- PackageEngine
- ModuleEngine
- BOQEngine

**Loading:** Loaded by Bootstrap in Phase 3

---

### 3. data/estimator/recommendations.json

**Purpose:** Recommendation rules and suggestions

**Schema Version:** Defined (JSON Schema Draft 07)

**Schema ID:** https://infiniteinteriordecor.com/schemas/recommendations.json

**Structure:**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://infiniteinteriordecor.com/schemas/recommendations.json",
  "title": "Recommendations Library",
  "description": "Recommendation rules and suggestions for estimator engine",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "recommendations": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9_-]+$": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "type": {
              "type": "string",
              "enum": ["material", "tier", "module", "style", "upgrade"]
            },
            "title": { "type": "string" },
            "description": { "type": "string" },
            "priority": { "type": "integer", "minimum": 1, "maximum": 10 },
            "conditions": {
              "type": "object",
              "properties": {
                "budgetRange": { "type": "object" },
                "projectType": { "type": "string" },
                "materialTier": { "type": "string" }
              }
            },
            "suggestions": {
              "type": "array",
              "items": { "type": "string" }
            }
          }
        }
      }
    }
  }
}
```

**Recommendation Types:**
- material
- tier
- module
- style
- upgrade

**Priority:** 1-10 (10 = highest priority)

**Conditions:**
- budgetRange
- projectType
- materialTier

**Used By:**
- RecommendationEngine

**Loading:** Loaded by Bootstrap in Phase 3

---

### 4. data/estimator/upgrade-rules.json

**Purpose:** Upgrade cost calculation rules

**Schema Version:** Defined (JSON Schema Draft 07)

**Schema ID:** https://infiniteinteriordecor.com/schemas/upgrade-rules.json

**Structure:**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://infiniteinteriordecor.com/schemas/upgrade-rules.json",
  "title": "Upgrade Rules",
  "description": "Upgrade cost calculation rules for material tiers",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "tierUpgrades": {
      "type": "object",
      "properties": {
        "essential_to_premium": {
          "type": "object",
          "properties": {
            "multiplier": { "type": "number" },
            "additionalCost": { "type": "number" }
          }
        },
        "premium_to_luxury": {
          "type": "object",
          "properties": {
            "multiplier": { "type": "number" },
            "additionalCost": { "type": "number" }
          }
        },
        "luxury_to_elite": {
          "type": "object",
          "properties": {
            "multiplier": { "type": "number" },
            "additionalCost": { "type": "number" }
          }
        }
      }
    }
  }
}
```

**Upgrade Paths:**
- essential_to_premium
- premium_to_luxury
- luxury_to_elite

**Upgrade Properties:**
- multiplier: Cost multiplier for upgrade
- additionalCost: Additional fixed cost for upgrade

**Used By:**
- RecommendationEngine
- ComparisonEngine

**Loading:** Loaded by Bootstrap in Phase 3

---

### 5. data/estimator/validation-rules.json

**Purpose:** Validation rules for form fields

**Schema Version:** Defined (JSON Schema Draft 07)

**Schema ID:** https://infiniteinteriordecor.com/schemas/validation-rules.json

**Structure:**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://infiniteinteriordecor.com/schemas/validation-rules.json",
  "title": "Validation Rules",
  "description": "Validation rules for estimator form fields",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "fieldRules": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9_-]+$": {
          "type": "object",
          "properties": {
            "field": { "type": "string" },
            "rules": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["required", "email", "phone", "min", "max", "minLength", "maxLength", "pattern", "numeric", "integer", "positive"]
              }
            },
            "parameters": {
              "type": "object"
            }
          }
        }
      }
    }
  }
}
```

**Validation Rules:**
- required
- email
- phone
- min
- max
- minLength
- maxLength
- pattern
- numeric
- integer
- positive

**Used By:**
- ValidationEngine

**Loading:** Loaded by Bootstrap in Phase 3

---

## Additional Estimator JSON Files

### 6. data/estimator/brands.json

**Purpose:** Brand database for materials and hardware

**Status:** Not loaded by Bootstrap (may be used for dropdowns)

---

### 7. data/estimator/cities.json

**Purpose:** City database for location-based pricing

**Status:** Not loaded by Bootstrap (may be used for location dropdowns)

---

### 8. data/estimator/hardware.json

**Purpose:** Hardware database

**Status:** Not loaded by Bootstrap (may be used for hardware selection)

---

### 9. data/estimator/modules.json

**Purpose:** Module definitions and specifications

**Status:** Not loaded by Bootstrap (may be used for module selection)

---

### 10. data/estimator/package-library.json

**Purpose:** Pre-defined package library

**Status:** Not loaded by Bootstrap (may be used for package selection)

---

### 11. data/estimator/room-library.json

**Purpose:** Room type definitions and specifications

**Status:** Not loaded by Bootstrap (may be used for room selection)

---

### 12. data/estimator/styles.json

**Purpose:** Style definitions for interior design

**Status:** Not loaded by Bootstrap (may be used for style selection)

---

## Material Sub-files

### data/estimator/materials/*.json

**Purpose:** Detailed material data organized by category

**Files:**
- automation.json - Automation materials
- boards.json - Board materials
- electrical.json - Electrical materials
- false-ceiling.json - False ceiling materials
- finishes.json - Finish materials
- glass.json - Glass materials
- hardware.json - Hardware materials
- kitchen-accessories.json - Kitchen accessories
- laminates.json - Laminate materials
- lighting.json - Lighting materials
- paint.json - Paint materials
- plumbing.json - Plumbing materials
- plywood.json - Plywood materials
- stone.json - Stone materials
- wardrobe-accessories.json - Wardrobe accessories

**Total Sub-files:** 18

**Status:** Not loaded by Bootstrap (may be used for detailed material selection)

---

## PWA Manifest

### manifest.json

**Purpose:** Progressive Web App manifest

**Status:** Not currently used (PWA not implemented)

---

## JSON Schema Validation

### Schema-Validated Files

1. **materials.json** - JSON Schema Draft 07
2. **pricing-rules.json** - JSON Schema Draft 07
3. **recommendations.json** - JSON Schema Draft 07
4. **upgrade-rules.json** - JSON Schema Draft 07
5. **validation-rules.json** - JSON Schema Draft 07

### Schema Properties

**Common Schema Properties:**
- `$schema`: JSON Schema version
- `$id`: Unique schema identifier
- `title`: Schema title
- `description`: Schema description
- `type`: Data type (usually "object")
- `properties`: Property definitions
- `required`: Required properties
- `patternProperties`: Pattern-based property definitions
- `enum`: Enumerated values
- `minimum`/`maximum`: Numeric constraints
- `format`: Data format (e.g., "date-time")

---

## JSON Loading Strategy

### Main Site

**Single File Loading:**
```
data/database.json
↓
Fetched by page-specific JavaScript
↓
Processed and rendered
```

### Estimator Module

**Multiple File Loading:**
```
Bootstrap Phase 3:
├─ data/estimator/materials.json
├─ data/estimator/pricing-rules.json
├─ data/estimator/recommendations.json
└─ data/estimator/upgrade-rules.json
↓
Fetched by Bootstrap
↓
Validated against JSON Schema
↓
Passed to engines
↓
Used for calculations
```

---

## JSON Database Issues

### Issue 1: Unused JSON Files

**Description:** Many JSON files in data/estimator/ are not loaded by Bootstrap.

**Files Not Loaded:**
- brands.json
- cities.json
- hardware.json
- modules.json
- package-library.json
- room-library.json
- styles.json
- validation-rules.json
- All material sub-files (18 files)

**Impact:**
- Data not available for dropdowns
- Limited material selection options
- Missing validation rules

**Severity:** Medium (functionality limited)

---

### Issue 2: JSON Schema Not Enforced

**Description:** JSON Schema is defined but not enforced at runtime.

**Impact:**
- Invalid JSON could be loaded
- No runtime validation
- Potential errors if JSON structure changes

**Severity:** Low (schemas are well-defined)

---

### Issue 3: No Data Versioning

**Description:** Only schema_version is defined, no data versioning strategy.

**Impact:**
- Difficult to track data changes
- No migration strategy for data updates
- Potential compatibility issues

**Severity:** Low (current implementation works)

---

## JSON Database Summary

**Total JSON Files:** 29  
**Main Site JSON:** 1  
**Estimator JSON:** 28  
**Schema Validated:** 5  
**Loaded by Bootstrap:** 4  
**Unused JSON Files:** 24  
**Material Sub-files:** 18  
**PWA Manifest:** 1  
**Schema Version:** JSON Schema Draft 07  
**Data Loading:** Fetch API with asset resolution  
**Validation:** JSON Schema defined but not enforced  
**Versioning:** Schema version only, no data versioning
