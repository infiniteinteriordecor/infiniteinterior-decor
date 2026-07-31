# BOQ System Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\js\boq-engine.js`  
**Last Updated:** 2026-07-31

---

## Overview

The Bill of Quantities (BOQ) System is responsible for generating detailed material and labor quantities for interior design projects. The system calculates precise quantities based on project specifications and generates structured BOQ data.

---

## BOQ Architecture

### BOQ Engine Purpose

The BOQ Engine is responsible for:
- Calculating material quantities
- Calculating labor quantities
- Generating BOQ structure
- Formatting BOQ data
- BOQ PDF generation support

### BOQ Generation Strategy

**Method:** Calculation-based generation
- Input: Project specifications (rooms, modules, materials)
- Process: Quantity calculation engine
- Output: Structured BOQ data

---

## BOQ Engine Implementation

### Class Definition

```javascript
class BOQEngine {
  constructor() {
    // BOQ calculation configuration
  }
}
```

### Constructor Pattern

**Pattern:** Constructor class

**Dependencies:**
- EstimatorHelper (for calculations)

---

## BOQ Methods

### generateBOQ(data)

Generate a complete BOQ from project data.

```javascript
generateBOQ(data: Object) → Object
```

**Parameters:**
- `data` - Project data (rooms, modules, materials)

**Returns:** Structured BOQ object

**Process:**
1. Parse project data
2. Calculate material quantities
3. Calculate labor quantities
4. Generate BOQ structure
5. Format BOQ data
6. Return BOQ object

**Example:**
```javascript
const boqEngine = new EstimatorBOQEngine();
const boq = boqEngine.generateBOQ(projectData);
```

### calculateQuantities(data)

Calculate material and labor quantities.

```javascript
calculateQuantities(data: Object) → Object
```

**Parameters:**
- `data` - Project data

**Returns:** Quantities object

**Process:**
1. Calculate room areas
2. Calculate material requirements
3. Calculate labor hours
4. Calculate equipment needs
5. Return quantities

**Example:**
```javascript
const quantities = boqEngine.calculateQuantities(projectData);
```

### formatBOQ(boq)

Format BOQ data for display or export.

```javascript
formatBOQ(boq: Object) → string
```

**Parameters:**
- `boq` - BOQ object

**Returns:** Formatted BOQ string

**Process:**
1. Format material section
2. Format labor section
3. Format summary
4. Return formatted string

**Example:**
```javascript
const formatted = boqEngine.formatBOQ(boq);
console.log(formatted);
```

---

## BOQ Structure

### BOQ Data Structure

```javascript
{
  metadata: {
    projectId: string,
    projectName: string,
    clientName: string,
    date: string,
    version: string
  },
  summary: {
    totalArea: number,
    totalMaterialCost: number,
    totalLaborCost: number,
    totalCost: number
  },
  materials: [
    {
      category: string,
      items: [
        {
          id: string,
          name: string,
          description: string,
          unit: string,
          quantity: number,
          unitPrice: number,
          totalPrice: number,
          supplier: string,
          tier: string
        }
      ]
    }
  ],
  labor: [
    {
      category: string,
      items: [
        {
          id: string,
          name: string,
          description: string,
          unit: string,
          quantity: number,
          rate: number,
          totalCost: number,
          duration: string
        }
      ]
    }
  ],
  equipment: [
    {
      id: string,
      name: string,
      description: string,
      quantity: number,
      unitPrice: number,
      totalPrice: number
    }
  ],
  overhead: [
    {
      id: string,
      name: string,
      description: string,
      percentage: number,
      amount: number
    }
  ],
  contingencies: [
    {
      id: string,
      name: string,
      description: string,
      percentage: number,
      amount: number
    }
  ]
}
```

---

## Material Quantities

### Calculation Methods

#### Flooring Calculation

```javascript
calculateFlooring(area, wastage = 0.1) → {
  quantity: area * (1 + wastage),
  unit: 'sqft'
}
```

#### Wall Calculation

```javascript
calculateWalls(perimeter, height, openings = 0) → {
  quantity: (perimeter * height) - openings,
  unit: 'sqft'
}
```

#### Ceiling Calculation

```javascript
calculateCeiling(area, wastage = 0.05) → {
  quantity: area * (1 + wastage),
  unit: 'sqft'
}
```

#### Paint Calculation

```javascript
calculatePaint(area, coats = 2, coverage = 100) → {
  quantity: (area * coats) / coverage,
  unit: 'liters'
}
```

---

## Labor Quantities

### Calculation Methods

#### Carpentry Labor

```javascript
calculateCarpentry(area, rate = 50) → {
  hours: area / 10,
  rate: rate,
  totalCost: (area / 10) * rate
}
```

#### Electrical Labor

```javascript
calculateElectrical(points, rate = 100) → {
  hours: points * 2,
  rate: rate,
  totalCost: points * 2 * rate
}
```

#### Plumbing Labor

```javascript
calculatePlumbing(points, rate = 150) → {
  hours: points * 3,
  rate: rate,
  totalCost: points * 3 * rate
}
```

---

## BOQ Categories

### Material Categories

- **Flooring:** Tiles, wood, laminate, carpet
- **Walls:** Paint, wallpaper, paneling
- **Ceiling:** False ceiling, POP, acoustic
- **Doors & Windows:** Frames, shutters, hardware
- **Kitchen:** Cabinets, countertops, appliances
- **Bathroom:** Fixtures, tiles, sanitary ware
- **Electrical:** Wiring, switches, fixtures
- **Plumbing:** Pipes, fittings, fixtures
- **Furniture:** Tables, chairs, storage
- **Accessories:** Curtains, blinds, decor

### Labor Categories

- **Carpentry:** Woodwork, furniture
- **Masonry:** Walls, flooring
- **Electrical:** Wiring, fixtures
- **Plumbing:** Pipes, fixtures
- **Painting:** Walls, ceilings
- **Tiling:** Floors, walls
- **General:** Site work, cleanup

---

## BOQ Generation Flow

### Input Processing

```
1. Receive project data
   ├─ Rooms with dimensions
   ├─ Selected modules
   ├─ Material selections
   └─ Design specifications
   ↓
2. Calculate areas
   ├─ Floor area
   ├─ Wall area
   ├─ Ceiling area
   └─ Special areas
   ↓
3. Calculate material quantities
   ├─ Per material type
   ├─ Add wastage factor
   └─ Calculate costs
   ↓
4. Calculate labor quantities
   ├─ Per labor type
   ├─ Estimate hours
   └─ Calculate costs
   ↓
5. Calculate overhead
   ├─ Project management
   ├─ Site supervision
   └─ Administrative
   ↓
6. Calculate contingencies
   ├─ Risk factor
   ├─ Price fluctuations
   └─ Unforeseen items
   ↓
7. Generate BOQ structure
   ├─ Organize by category
   ├─ Format for display
   └─ Prepare for export
```

---

## BOQ Export Formats

### Supported Formats

**Status:** Not Fully Implemented

**Potential Formats:**
- PDF (via PDF Generator)
- Excel/CSV
- JSON
- HTML

### Example Export

```javascript
// Export to JSON
const json = JSON.stringify(boq, null, 2);

// Export to CSV
const csv = boqEngine.formatCSV(boq);

// Export to PDF
const pdf = await pdfGenerator.generateBOQ(boq);
```

---

## BOQ Best Practices

### 1. Include Wastage Factors
- Flooring: 10%
- Paint: 15%
- Tiles: 10%
- Wood: 5%

### 2. Calculate Accurately
- Use precise measurements
- Account for openings
- Consider standard sizes

### 3. Organize Clearly
- Group by category
- Use consistent units
- Provide descriptions

### 4. Include Pricing
- Unit prices
- Total prices
- Price breakdowns

### 5. Allow Customization
- Custom materials
- Custom labor rates
- Custom overheads

---

## BOQ Validation

### Validation Checks

- **Quantity Validation:** Ensure quantities are reasonable
- **Price Validation:** Ensure prices are within range
- **Total Validation:** Ensure totals match calculations
- **Unit Validation:** Ensure units are correct
- **Completeness:** Ensure all required fields present

---

## Notes

- Calculation-based BOQ generation
- Material and labor quantities
- Structured BOQ data
- Multiple categories
- Export support (partial)
- Validation needed
- Customization support

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
