# JSON Database Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\data\`  
**Total JSON Files:** 27  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses JSON files as its database system. All data is stored in JSON format and loaded dynamically via the Fetch API. This is a client-side only solution suitable for static hosting on GitHub Pages.

---

## JSON Database Architecture

### Database Structure

```
data/
├── database.json                    # Main database schema
└── estimator/                       # Estimator-specific data
    ├── brands.json                  # Brand information
    ├── cities.json                  # City/location data
    ├── hardware.json                # Hardware specifications
    ├── materials.json               # Materials library (schema)
    ├── materials/                   # Material categories
    │   ├── automation.json
    │   ├── boards.json
    │   ├── electrical.json
    │   ├── false-ceiling.json
    │   ├── finishes.json
    │   ├── glass.json
    │   ├── hardware.json
    │   ├── kitchen-accessories.json
    │   ├── laminates.json
    │   ├── lighting.json
    │   ├── paint.json
    │   ├── plumbing.json
    │   ├── plywood.json
    │   ├── stone.json
    │   └── wardrobe-accessories.json
    ├── modules.json                 # Module definitions
    ├── package-library.json         # Package configurations
    ├── pricing-rules.json           # Pricing calculation rules
    ├── recommendations.json         # Recommendation engine data
    ├── room-library.json            # Room type definitions
    ├── styles.json                  # Design style definitions
    ├── upgrade-rules.json          # Material upgrade rules
    └── validation-rules.json        # Form validation rules
```

---

## Main Database

### database.json

**Purpose:** Main database schema and metadata

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://infiniteinteriordecor.com/schemas/database.json",
  "title": "Infinite Interior Decor Database",
  "description": "Main database schema for Infinite Interior Decor",
  "type": "object",
  "properties": {
    "version": {
      "type": "string",
      "description": "Database version"
    },
    "last_updated": {
      "type": "string",
      "format": "date-time",
      "description": "Last update timestamp"
    },
    "site": {
      "type": "object",
      "description": "Site configuration"
    },
    "projects": {
      "type": "array",
      "description": "Project data"
    },
    "services": {
      "type": "array",
      "description": "Service data"
    }
  }
}
```

---

## Estimator Data Files

### Materials Library

#### materials.json

**Purpose:** Materials library schema

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://infiniteinteriordecor.com/schemas/materials.json",
  "title": "Materials Library",
  "description": "Material definitions for interior design estimator",
  "type": "object",
  "properties": {
    "schema_version": {
      "type": "string"
    },
    "last_updated": {
      "type": "string",
      "format": "date-time"
    },
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
            "brand": { "type": "string" },
            "tier": {
              "type": "string",
              "enum": ["essential", "premium", "luxury", "elite"]
            },
            "features": { "type": "array" },
            "availability": {
              "type": "string",
              "enum": ["in-stock", "limited", "pre-order"]
            },
            "images": { "type": "array" }
          },
          "required": ["id", "name", "category", "basePrice", "unit"]
        }
      }
    }
  }
}
```

#### Material Categories

**Location:** `data/estimator/materials/`

**Categories:**
- `automation.json` - Home automation materials
- `boards.json` - Board materials (plywood, MDF, etc.)
- `electrical.json` - Electrical materials
- `false-ceiling.json` - False ceiling materials
- `finishes.json` - Finish materials
- `glass.json` - Glass materials
- `hardware.json` - Hardware materials
- `kitchen-accessories.json` - Kitchen accessories
- `laminates.json` - Laminate materials
- `lighting.json` - Lighting materials
- `paint.json` - Paint materials
- `plumbing.json` - Plumbing materials
- `plywood.json` - Plywood materials
- `stone.json` - Stone materials
- `wardrobe-accessories.json` - Wardrobe accessories

**Example Structure:**
```json
{
  "schema_version": "1.0.0",
  "last_updated": "2024-01-01T00:00:00Z",
  "category": "boards",
  "materials": {
    "plywood_7mm": {
      "id": "plywood_7mm",
      "name": "7mm Plywood",
      "category": "boards",
      "basePrice": 45,
      "unit": "sqft",
      "description": "7mm commercial plywood",
      "brand": "Greenply",
      "tier": "essential",
      "features": ["Moisture resistant", "Durable"],
      "availability": "in-stock"
    }
  }
}
```

---

### Pricing Rules

#### pricing-rules.json

**Purpose:** Pricing calculation rules

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Pricing Rules",
  "description": "Pricing calculation rules for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "rules": {
      "type": "object",
      "properties": {
        "material_pricing": {
          "type": "object",
          "description": "Material pricing multipliers by tier"
        },
        "labor_pricing": {
          "type": "object",
          "description": "Labor pricing rules"
        },
        "overhead": {
          "type": "object",
          "description": "Overhead calculation rules"
        },
        "contingency": {
          "type": "object",
          "description": "Contingency calculation rules"
        },
        "tax": {
          "type": "object",
          "description": "Tax calculation rules"
        }
      }
    }
  }
}
```

---

### Recommendations

#### recommendations.json

**Purpose:** Recommendation engine data

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Recommendations",
  "description": "Recommendation data for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "recommendations": {
      "type": "object",
      "properties": {
        "style_based": {
          "type": "object",
          "description": "Style-based recommendations"
        },
        "budget_based": {
          "type": "object",
          "description": "Budget-based recommendations"
        },
        "material_based": {
          "type": "object",
          "description": "Material-based recommendations"
        }
      }
    }
  }
}
```

---

### Upgrade Rules

#### upgrade-rules.json

**Purpose:** Material upgrade rules

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Upgrade Rules",
  "description": "Material upgrade rules for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "upgrades": {
      "type": "object",
      "properties": {
        "tier_upgrades": {
          "type": "object",
          "description": "Tier upgrade paths"
        },
        "material_upgrades": {
          "type": "object",
          "description": "Material upgrade options"
        }
      }
    }
  }
}
```

---

### Validation Rules

#### validation-rules.json

**Purpose:** Form validation rules

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Validation Rules",
  "description": "Form validation rules for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "rules": {
      "type": "object",
      "properties": {
        "required_fields": {
          "type": "array",
          "description": "Required fields per step"
        },
        "field_validations": {
          "type": "object",
          "description": "Field-specific validation rules"
        },
        "step_validations": {
          "type": "object",
          "description": "Step completion validations"
        }
      }
    }
  }
}
```

---

### Package Library

#### package-library.json

**Purpose:** Package configurations

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Package Library",
  "description": "Package configurations for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "packages": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9_-]+$": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "name": { "type": "string" },
            "tier": {
              "type": "string",
              "enum": ["essential", "premium", "luxury", "elite"]
            },
            "description": { "type": "string" },
            "includes": { "type": "array" },
            "basePrice": { "type": "number" },
            "multiplier": { "type": "number" }
          }
        }
      }
    }
  }
}
```

---

### Room Library

#### room-library.json

**Purpose:** Room type definitions

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Room Library",
  "description": "Room type definitions for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "rooms": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9_-]+$": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "name": { "type": "string" },
            "category": { "type": "string" },
            "defaultArea": { "type": "number" },
            "minArea": { "type": "number" },
            "maxArea": { "type": "number" },
            "basePrice": { "type": "number" },
            "units": {
              "type": "string",
              "enum": ["sqft", "sqm"]
            }
          }
        }
      }
    }
  }
}
```

---

### Styles

#### styles.json

**Purpose:** Design style definitions

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Design Styles",
  "description": "Design style definitions for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "styles": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9_-]+$": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "name": { "type": "string" },
            "description": { "type": "string" },
            "characteristics": { "type": "array" },
            "materialPreferences": { "type": "object" },
            "colorPalette": { "type": "array" }
          }
        }
      }
    }
  }
}
```

---

### Modules

#### modules.json

**Purpose:** Module definitions

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Modules",
  "description": "Module definitions for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "modules": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9_-]+$": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "name": { "type": "string" },
            "category": { "type": "string" },
            "description": { "type": "string" },
            "basePrice": { "type": "number" },
            "unit": {
              "type": "string",
              "enum": ["sqft", "sqm", "piece"]
            },
            "components": { "type": "array" }
          }
        }
      }
    }
  }
}
```

---

### Reference Data

#### brands.json

**Purpose:** Brand information

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Brands",
  "description": "Brand information for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "brands": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9_-]+$": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "name": { "type": "string" },
            "category": { "type": "string" },
            "tier": {
              "type": "string",
              "enum": ["essential", "premium", "luxury", "elite"]
            },
            "description": { "type": "string" }
          }
        }
      }
    }
  }
}
```

#### cities.json

**Purpose:** City/location data

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Cities",
  "description": "City/location data for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "cities": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "state": { "type": "string" },
          "country": { "type": "string" },
          "region": { "type": "string" },
          "priceMultiplier": { "type": "number" }
        }
      }
    }
  }
}
```

#### hardware.json

**Purpose:** Hardware specifications

**Structure:**
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Hardware",
  "description": "Hardware specifications for estimator",
  "type": "object",
  "properties": {
    "schema_version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date-time" },
    "hardware": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9_-]+$": {
          "type": "object",
          "properties": {
            "id": { "type": "string" },
            "name": { "type": "string" },
            "category": { "type": "string" },
            "description": { "type": "string" },
            "basePrice": { "type": "number" },
            "unit": { "type": "string" }
          }
        }
      }
    }
  }
}
```

---

## JSON Schema Validation

### Schema Standards

All JSON files follow JSON Schema draft-07 specification:
- `$schema` - Schema version
- `$id` - Unique schema identifier
- `title` - Schema title
- `description` - Schema description
- `type` - Data type
- `properties` - Property definitions
- `required` - Required fields
- `enum` - Enumerated values
- `pattern` - Regular expression patterns

### Validation Process

1. **Load JSON File**
   ```javascript
   fetch('data/estimator/materials.json')
     .then(response => response.json())
     .then(data => validate(data))
   ```

2. **Validate Against Schema**
   ```javascript
   function validate(data) {
     // Check required fields
     if (!data.schema_version) throw new Error('Missing schema_version');
     if (!data.last_updated) throw new Error('Missing last_updated');
     // Additional validation
     return data;
   }
   ```

3. **Handle Validation Errors**
   ```javascript
   try {
     const data = await loadData();
   } catch (error) {
     console.error('Validation error:', error);
     // Use fallback data
   }
   ```

---

## JSON Loading Strategy

### Fetch API

**Method:** Fetch API with error handling

```javascript
async function loadJSON(path) {
  try {
    const response = await fetch(window.resolveAssetPath(path));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading JSON:', error);
    throw error;
  }
}
```

### Caching Strategy

**Session Storage Cache:**
```javascript
async function loadWithCache(path) {
  const cacheKey = `infinite-interior-data/${path}`;
  
  // Check cache
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Load from network
  const data = await loadJSON(path);
  
  // Cache in session storage
  sessionStorage.setItem(cacheKey, JSON.stringify(data));
  
  return data;
}
```

---

## JSON Data Updates

### Versioning

Each JSON file includes:
- `schema_version` - Schema version
- `last_updated` - Last update timestamp

### Update Process

1. Update JSON file
2. Update `last_updated` timestamp
3. Update `schema_version` if schema changes
4. Test with validation
5. Deploy to GitHub Pages

---

## JSON Best Practices

### 1. Use JSON Schema
- Define schema for each file
- Validate on load
- Document structure

### 2. Use Consistent Naming
- kebab-case for keys
- Descriptive names
- No abbreviations

### 3. Include Metadata
- Schema version
- Last updated
- Description

### 4. Use Enums
- Restrict values
- Prevent invalid data
- Document options

### 5. Error Handling
- Validate on load
- Graceful fallback
- Log errors

---

## Notes

- Client-side only JSON database
- No backend required
- Static hosting compatible
- Schema-based validation
- Fetch API for loading
- Session storage caching
- Versioned schemas

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
