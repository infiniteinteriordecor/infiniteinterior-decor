# BOQ Engine Report

## Overview

The Bill of Quantities (BOQ) Engine is responsible for generating detailed, itemized cost breakdowns for interior design projects. It provides room-wise BOQ generation with tier-based pricing and comprehensive material lists.

## Architecture

### Core Component

**BOQEngine** (`js/boq-engine.js`)
- Room-wise BOQ generation
- Tier-based cost calculations
- Itemized material lists
- Project-level summaries

## Supported Room Types

1. **Living Room** - Sofa, center table, TV unit, lighting, decor
2. **Dining Room** - Dining table, chairs, storage, lighting
3. **Kitchen** - Cabinets, countertops, appliances, fixtures
4. **Bedroom** - Bed, wardrobe, side tables, lighting
5. **Master Bedroom** - Premium bedroom with additional features
6. **Guest Bedroom** - Standard bedroom configuration
7. **Kids Bedroom** - Child-friendly design with safety features
8. **Balcony** - Outdoor furniture, flooring, plants
9. **Bathroom** - Fixtures, vanity, storage, accessories
10. **Store Room** - Shelving, storage solutions

## Data Structure

### Room Configuration

```javascript
{
  roomId: 'living',
  roomType: 'living',
  dimensions: {
    length: 15,
    width: 12,
    height: 10
  },
  features: ['sofa', 'tv-unit', 'lighting'],
  materialTier: 'medium'
}
```

### BOQ Item

```javascript
{
  id: 'item-001',
  category: 'furniture',
  name: '3-Seater Sofa',
  description: 'Premium fabric sofa with wooden frame',
  quantity: 1,
  unit: 'piece',
  rate: 45000,
  amount: 45000,
  tier: 'medium'
}
```

### Room BOQ

```javascript
{
  roomId: 'living',
  roomName: 'Living Room',
  items: [...],
  subtotal: 125000,
  labour: 15000,
  gst: 25200,
  total: 165200,
  tier: 'medium'
}
```

## API Reference

### `generateRoomBOQ(roomId, specifications, tier)`

Generates BOQ for a specific room.

**Parameters:**
- `roomId` (string): Room identifier
- `specifications` (object): Room specifications including dimensions, features
- `tier` (string): Material tier ('basic', 'medium', 'premium')

**Returns:**
```javascript
{
  roomId: 'living',
  roomName: 'Living Room',
  items: [...],
  subtotal: 125000,
  labour: 15000,
  gst: 25200,
  total: 165200,
  tier: 'medium'
}
```

### `generateProjectBOQ(rooms, tier)`

Generates complete project BOQ for all rooms.

**Parameters:**
- `rooms` (array): Array of room configurations
- `tier` (string): Material tier for all rooms

**Returns:**
```javascript
{
  rooms: [...],
  projectSubtotal: 850000,
  projectLabour: 120000,
  projectGST: 174600,
  projectTotal: 1144600,
  tier: 'medium',
  breakdown: {
    furniture: 450000,
    fixtures: 250000,
    materials: 150000
  }
}
```

### `getRoomItems(roomType, tier)`

Returns standard items for a room type based on tier.

**Parameters:**
- `roomType` (string): Type of room
- `tier` (string): Material tier

**Returns:** Array of standard items for the room

### `calculateItemCost(item, tier)`

Calculates cost for a single item based on tier.

**Parameters:**
- `item` (object): Item configuration
- `tier` (string): Material tier

**Returns:** Cost calculation with tier multiplier applied

## Tier-based Pricing

### Multipliers

- **Basic**: 1.0x
- **Medium**: 1.4x
- **Premium**: 2.0x

### Cost Components

1. **Material Cost**: Base material cost × tier multiplier
2. **Labour Cost**: Calculated as 12-15% of material cost
3. **GST**: 18% on (material + labour)
4. **Total**: Material + Labour + GST

## Room-specific Features

### Living Room

**Standard Items:**
- Sofa (3-seater, 2-seater)
- Center table
- TV unit
- Entertainment unit
- Floor lamps
- Wall decor
- Curtains
- Rugs

**Optional Features:**
- Recliner
- Coffee table set
- Display cabinets
- Partition

### Dining Room

**Standard Items:**
- Dining table (6-seater)
- Dining chairs
- Sideboard
- Crockery cabinet
- Pendant lights
- Table linen

**Optional Features:**
- Bar cabinet
- Wine rack
- Server trolley

### Kitchen

**Standard Items:**
- Base cabinets
- Wall cabinets
- Countertop (granite/quartz)
- Sink
- Faucet
- Chimney
- Hob
- Oven
- Storage accessories

**Optional Features:**
- Island
- Breakfast counter
- Built-in appliances
- Pull-out baskets

### Bedroom

**Standard Items:**
- Bed (king/queen)
- Wardrobe
- Side tables
- Dressing table
- Mattress
- Bed linen
- Curtains
- Bedside lamps

**Optional Features:**
- Study table
- Bookshelf
- TV unit
- Armchair

### Master Bedroom

**Standard Items:** (All bedroom items plus)
- Larger wardrobe
- Premium mattress
- Additional storage
- Seating area

**Optional Features:**
- Walk-in closet
- En-suite fixtures
- Mini bar

### Kids Bedroom

**Standard Items:**
- Single/Double bed
- Study table
- Bookshelf
- Toy storage
- Safety features
- Bright lighting

**Optional Features:**
- Bunk bed
- Play area
- Theme decor

### Balcony

**Standard Items:**
- Outdoor furniture
- Flooring
- Planters
- Lighting
- Weather protection

**Optional Features:**
- BBQ setup
- Vertical garden
- Water feature

### Bathroom

**Standard Items:**
- Vanity
- Mirror
- Faucet
- Shower
- Toilet
- Storage
- Towel rack
- Lighting

**Optional Features:**
- Bathtub
- Jacuzzi
- Heated floor
- Smart fixtures

### Store Room

**Standard Items:**
- Shelving units
- Cabinets
- Racks
- Storage boxes
- Lighting

**Optional Features:**
- Pull-down stairs
- Built-in organizers

## Integration with Other Engines

### Package Engine

- BOQ engine uses package tier for material selection
- Package specifications influence BOQ items
- Package pricing aligns with BOQ totals

### Module Engine

- Module costs integrated into room BOQ
- Independent module calculations used for custom items
- Module specifications affect room totals

### Budget Engine

- BOQ totals validated against budget
- Budget optimization uses BOQ breakdown
- Material limits enforced per BOQ

### PDF Generator

- BOQ data formatted for PDF reports
- Room-wise BOQ pages generated
- Itemized lists included in PDF

## Performance Optimization

### Caching

- Room item templates cached
- Tier calculations memoized
- BOQ results cached for reuse

### Batch Processing

- Multiple rooms processed in batch
- Item calculations parallelized
- Summary calculations optimized

### Lazy Loading

- Heavy item details loaded on demand
- Room specifications loaded progressively
- Large BOQs paginated

## Data Validation

### Input Validation

- Room dimensions validated
- Feature lists checked
- Tier values verified

### Output Validation

- Cost calculations verified
- Totals cross-checked
- GST calculations validated

## Error Handling

### Common Errors

1. **Invalid Room Type**: Returns error with supported types
2. **Invalid Tier**: Returns error with valid tiers
3. **Missing Dimensions**: Uses default dimensions
4. **Calculation Error**: Returns partial BOQ with error flag

### Error Recovery

- Graceful degradation on errors
- Partial BOQ generation
- Error logging for debugging

## Future Enhancements

1. **Custom Room Types**: User-defined room configurations
2. **Material Substitution**: Alternative material suggestions
3. **Quantity Optimization**: Optimal quantity calculations
4. **Supplier Integration**: Direct supplier pricing
5. **3D Visualization**: Visual BOQ with 3D models

## Conclusion

The BOQ Engine provides comprehensive, room-wise cost breakdowns with tier-based pricing. With support for 10 room types, detailed itemization, and integration with other estimator engines, it delivers professional-grade BOQ generation suitable for interior design projects of all scales.
