# Database Report

## Overview

The Infinite Interior OS estimator module uses a modular JSON-based database system for material data, pricing rules, and configuration. This approach ensures GitHub Pages compatibility without requiring backend databases or server-side processing.

## Architecture

### Storage Strategy

1. **JSON Files** - Static data storage
2. **IndexedDB** - Dynamic data storage (drafts, calculations, cache)
3. **localStorage** - Fallback storage and small data

### File Structure

```
data/estimator/
├── materials/
│   ├── boards.json
│   ├── hardware.json
│   ├── laminates.json
│   ├── plywood.json
│   ├── finishes.json
│   ├── lighting.json
│   ├── paint.json
│   ├── false-ceiling.json
│   ├── electrical.json
│   ├── plumbing.json
│   ├── automation.json
│   ├── kitchen-accessories.json
│   ├── wardrobe-accessories.json
│   ├── glass.json
│   └── stone.json
├── pricing-rules.json
├── recommendations.json
└── upgrade-rules.json
```

## Material Categories

### 1. Boards

**File:** `data/estimator/materials/boards.json`

**Types:**
- MDF (Medium Density Fiberboard)
- Particle Board
- Plywood
- Blockboard
- HDF (High Density Fiberboard)

**Data Structure:**
```json
{
  "id": "board-mdf-premium",
  "name": "Premium MDF Board",
  "type": "mdf",
  "grade": "premium",
  "thickness": "18mm",
  "pricePerSqFt": 45,
  "brand": "Greenply",
  "warranty": 10,
  "features": ["water-resistant", "termite-proof", "eco-friendly"]
}
```

### 2. Hardware

**File:** `data/estimator/materials/hardware.json`

**Types:**
- Hinges
- Slides
- Handles
- Knobs
- Locks
- Brackets

**Data Structure:**
```json
{
  "id": "hinge-soft-close",
  "name": "Soft Close Hinge",
  "type": "hinge",
  "grade": "premium",
  "pricePerUnit": 150,
  "brand": "Hettich",
  "warranty": 5,
  "loadCapacity": 25
}
```

### 3. Laminates

**File:** `data/estimator/materials/laminates.json`

**Types:**
- High Gloss
- Matte
- Textured
- Solid Color
- Wood Grain

**Data Structure:**
```json
{
  "id": "laminate-high-gloss",
  "name": "High Gloss Laminate",
  "type": "high-gloss",
  "grade": "premium",
  "pricePerSqFt": 85,
  "brand": "Merino",
  "thickness": "1mm",
  "finish": "glossy"
}
```

### 4. Plywood

**File:** `data/estimator/materials/plywood.json`

**Types:**
- Marine Plywood
- Commercial Plywood
- BWP Plywood
- BWR Plywood

**Data Structure:**
```json
{
  "id": "plywood-marine-710",
  "name": "Marine Plywood 710",
  "type": "marine",
  "grade": "premium",
  "thickness": "19mm",
  "pricePerSqFt": 120,
  "brand": "CenturyPly",
  "warranty": 25,
  "is": 710
}
```

### 5. Finishes

**File:** `data/estimator/materials/finishes.json`

**Types:**
- PU Polish
- Melamine
- Laminate
- Veneer
- Paint

**Data Structure:**
```json
{
  "id": "finish-pu-matte",
  "name": "PU Matte Finish",
  "type": "pu",
  "grade": "premium",
  "pricePerSqFt": 35,
  "durability": "high",
  "maintenance": "low"
}
```

### 6. Lighting

**File:** `data/estimator/materials/lighting.json`

**Types:**
- LED Lights
- Pendant Lights
- Chandeliers
- Spotlights
- Strip Lights

**Data Structure:**
```json
{
  "id": "light-led-warm",
  "name": "Warm White LED",
  "type": "led",
  "grade": "premium",
  "pricePerUnit": 250,
  "wattage": 12,
  "colorTemp": "3000K",
  "brand": "Philips"
}
```

### 7. Paint

**File:** `data/estimator/materials/paint.json`

**Types:**
- Emulsion
- Enamel
- Distemper
- Texture Paint
- Exterior Paint

**Data Structure:**
```json
{
  "id": "paint-emulsion-premium",
  "name": "Premium Emulsion",
  "type": "emulsion",
  "grade": "premium",
  "pricePerLitre": 450,
  "brand": "Asian Paints",
  "coverage": 100,
  "finish": "matte"
}
```

### 8. False Ceiling

**File:** `data/estimator/materials/false-ceiling.json`

**Types:**
- Gypsum Board
- POP (Plaster of Paris)
- PVC
- Metal
- Acoustic

**Data Structure:**
```json
{
  "id": "ceiling-gypsum",
  "name": "Gypsum False Ceiling",
  "type": "gypsum",
  "grade": "premium",
  "pricePerSqFt": 85,
  "thickness": "12mm",
  "fireRating": "class-A"
}
```

### 9. Electrical

**File:** `data/estimator/materials/electrical.json`

**Types:**
- Switches
- Sockets
- MCBs
- Wires
- Lights

**Data Structure:**
```json
{
  "id": "switch-modular",
  "name": "Modular Switch",
  "type": "switch",
  "grade": "premium",
  "pricePerUnit": 85,
  "brand": "Legrand",
  "rating": "10A"
}
```

### 10. Plumbing

**File:** `data/estimator/materials/plumbing.json`

**Types:**
- Pipes
- Fittings
- Faucets
- Valves
- Sanitary Ware

**Data Structure:**
```json
{
  "id": "faucet-basin",
  "name": "Basin Mixer",
  "type": "faucet",
  "grade": "premium",
  "pricePerUnit": 3500,
  "brand": "Grohe",
  "finish": "chrome"
}
```

### 11. Automation

**File:** `data/estimator/materials/automation.json`

**Types:**
- Smart Switches
- Sensors
- Controllers
- Hubs
- Remotes

**Data Structure:**
```json
{
  "id": "automation-switch-smart",
  "name": "Smart Switch",
  "type": "switch",
  "grade": "premium",
  "pricePerUnit": 1200,
  "brand": "Philips Hue",
  "protocol": "Zigbee"
}
```

### 12. Kitchen Accessories

**File:** `data/estimator/materials/kitchen-accessories.json`

**Types:**
- Baskets
- Pull-outs
- Dividers
- Racks
- Waste Bins

**Data Structure:**
```json
{
  "id": "kitchen-basket-utensil",
  "name": "Utensil Basket",
  "type": "basket",
  "grade": "premium",
  "pricePerUnit": 2800,
  "brand": "Hettich",
  "material": "ss-304"
}
```

### 13. Wardrobe Accessories

**File:** `data/estimator/materials/wardrobe-accessories.json`

**Types:**
- Hangers
- Tie Racks
- Shoe Racks
- Drawers
- Dividers

**Data Structure:**
```json
{
  "id": "wardrobe-hanger-wooden",
  "name": "Wooden Hanger",
  "type": "hanger",
  "grade": "premium",
  "pricePerUnit": 150,
  "material": "solid-wood"
}
```

### 14. Glass

**File:** `data/estimator/materials/glass.json`

**Types:**
- Clear Glass
- Tinted Glass
- Frosted Glass
- Tempered Glass
- Laminated Glass

**Data Structure:**
```json
{
  "id": "glass-tempered-10mm",
  "name": "Tempered Glass 10mm",
  "type": "tempered",
  "grade": "premium",
  "pricePerSqFt": 250,
  "thickness": "10mm",
  "finish": "clear"
}
```

### 15. Stone

**File:** `data/estimator/materials/stone.json`

**Types:**
- Granite
- Marble
- Quartz
- Slate
- Sandstone

**Data Structure:**
```json
{
  "id": "stone-granite-black",
  "name": "Black Granite",
  "type": "granite",
  "grade": "premium",
  "pricePerSqFt": 180,
  "origin": "india",
  "finish": "polished"
}
```

## Configuration Files

### Pricing Rules

**File:** `data/estimator/pricing-rules.json`

**Structure:**
```json
{
  "gstRate": 18,
  "labourPercentage": 15,
  "marginPercentage": 20,
  "designFeePercentage": 5,
  "contingencyPercentage": 5,
  "tierMultipliers": {
    "basic": 1.0,
    "medium": 1.4,
    "premium": 2.0
  }
}
```

### Recommendations

**File:** `data/estimator/recommendations.json`

**Structure:**
```json
{
  "budgetRanges": [
    {
      "min": 0,
      "max": 500000,
      "recommendation": "basic",
      "reason": "Budget-friendly option with essential materials"
    }
  ],
  "roomRecommendations": {
    "kitchen": {
      "essential": ["cabinets", "countertop", "sink"],
      "optional": ["island", "breakfast-counter"]
    }
  }
}
```

### Upgrade Rules

**File:** `data/estimator/upgrade-rules.json`

**Structure:**
```json
{
  "basicToMedium": {
    "materialUpgrade": "standard to premium",
    "warrantyIncrease": "5 to 10 years",
    "priceIncrease": "40%"
  },
  "mediumToPremium": {
    "materialUpgrade": "premium to luxury",
    "warrantyIncrease": "10 to 15 years",
    "priceIncrease": "43%"
  }
}
```

## IndexedDB Schema

### Database: InfiniteInteriorEstimator

### Stores

#### 1. drafts

**KeyPath:** id

**Structure:**
```javascript
{
  id: "draft-123",
  data: {
    projectName: "Luxury Apartment",
    clientName: "John Doe",
    // ... project data
  },
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T11:45:00Z"
}
```

#### 2. calculations

**KeyPath:** id

**Structure:**
```javascript
{
  id: "calc-456",
  data: {
    estimate: 1500000,
    breakdown: {...},
    validation: {...}
  },
  createdAt: "2024-01-15T10:30:00Z"
}
```

#### 3. materials

**KeyPath:** id

**Structure:**
```javascript
{
  id: "material-789",
  data: {
    category: "boards",
    items: [...]
  },
  cachedAt: "2024-01-15T10:30:00Z"
}
```

#### 4. packages

**KeyPath:** id

**Structure:**
```javascript
{
  id: "package-101",
  data: {
    tier: "premium",
    specifications: {...}
  },
  createdAt: "2024-01-15T10:30:00Z"
}
```

#### 5. cache

**KeyPath:** key

**Structure:**
```javascript
{
  key: "cache-key",
  data: {...},
  expiresAt: "2024-01-16T10:30:00Z"
}
```

## localStorage Schema

### Keys

- `estimator_draft_{id}` - Draft data
- `estimator_calc_{id}` - Calculation data
- `estimator_cache_{key}` - Cached data
- `estimator_settings` - User settings
- `estimator_preferences` - User preferences

### Structure

```javascript
{
  key: "estimator_draft_123",
  value: {
    id: "draft-123",
    data: {...},
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T11:45:00Z"
  }
}
```

## Data Loading

### JSON Loading

```javascript
async loadJSON(path) {
  const response = await fetch(path);
  return await response.json();
}
```

### Caching Strategy

1. **First Load**: Load from JSON, cache in IndexedDB
2. **Subsequent Loads**: Load from IndexedDB cache
3. **Cache Expiry**: 24 hours for material data
4. **Cache Invalidation**: Manual or time-based

## Data Validation

### JSON Validation

- Schema validation using JSON Schema
- Required field validation
- Data type validation
- Range validation

### IndexedDB Validation

- Key uniqueness validation
- Data structure validation
- Reference integrity validation

### localStorage Validation

- Key format validation
- JSON parsing validation
- Size limit validation

## Performance Optimization

### Lazy Loading

- Material categories loaded on demand
- Heavy data loaded progressively
- Images loaded lazily

### Compression

- JSON files minified
- Gzip compression enabled
- Data compression for storage

### Indexing

- IndexedDB indexes on frequently queried fields
- localStorage keys organized for fast lookup
- JSON files organized by category

## Backup and Recovery

### Backup Strategy

- localStorage backup for IndexedDB
- Export functionality for drafts
- Version history for important data

### Recovery

- Restore from localStorage
- Import from exported files
- Default data fallback

## Security

### Data Privacy

- No sensitive data in localStorage
- Draft data encrypted in IndexedDB
- Client-side only processing

### Access Control

- No server-side access
- Client-side validation
- No external API calls

## Future Enhancements

1. **Cloud Sync**: Optional cloud backup
2. **Offline Mode**: Full offline capability
3. **Data Import**: Import from external sources
4. **Data Export**: Export to multiple formats
5. **Version Control**: Data versioning and rollback

## Conclusion

The modular JSON-based database system provides a robust, GitHub Pages-compatible solution for material data storage. With 15 material categories, comprehensive configuration files, and IndexedDB for dynamic data, it delivers a complete data management solution without requiring backend infrastructure.
