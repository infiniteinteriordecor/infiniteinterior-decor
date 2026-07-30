# PDF Engine Report

## Overview

The PDF Generator is responsible for creating professional, museum-quality PDF reports for interior design quotations and project documentation. It uses browser print functionality with styled HTML to ensure compatibility without requiring external PDF libraries.

## Architecture

### Core Component

**PDFGenerator** (`js/pdf-generator.js`)
- Multi-page PDF generation
- Company design system integration
- Browser print compatibility
- Dynamic HTML generation

## PDF Types

### 1. Quotation PDF

**Pages:**
- Cover Page
- Project Summary
- Package Summary
- BOQ
- Room-wise BOQ
- Material Details
- Comparison
- Terms & Conditions
- Timeline
- Approval
- Footer

### 2. BOQ PDF

**Pages:**
- Cover Page
- Project Summary
- Complete BOQ
- Room-wise Breakdown
- Material Details
- Terms & Conditions
- Footer

### 3. Summary PDF

**Pages:**
- Cover Page
- Executive Summary
- Package Overview
- Budget Breakdown
- Timeline
- Footer

### 4. Comparison PDF

**Pages:**
- Cover Page
- Package Comparison
- Tier Comparison
- Upgrade Recommendations
- Footer

## Design System

### Branding

- **Company Name**: Infinite Interior
- **Tagline**: Luxury Interior Design
- **Logo**: `/assets/images/company/logo.png`
- **Primary Color**: Champagne Gold (#C9A962)
- **Secondary Color**: Matte Black (#1A1A1A)
- **Accent Color**: Walnut (#8B7355)

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Lato (sans-serif)
- **Numbers**: Roboto Mono (monospace)

### Layout

- **Page Size**: A4 (210mm × 297mm)
- **Margins**: 20mm all sides
- **Grid**: 12-column grid
- **Spacing**: 8px base unit

## Page Templates

### Cover Page

**Elements:**
- Company logo
- Company name
- Document title
- Project name
- Client name
- Date
- Document number
- Confidentiality notice

**Styling:**
- Full-page gradient background
- Centered content
- Gold accents
- Premium typography

### Project Summary

**Elements:**
- Project overview
- Client details
- Project specifications
- Budget summary
- Timeline overview
- Key highlights

**Styling:**
- Two-column layout
- Card-based sections
- Data tables
- Progress indicators

### Package Summary

**Elements:**
- Selected package details
- Tier specifications
- Material grades
- Warranty information
- Maintenance details
- Price breakdown

**Styling:**
- Tier-specific color coding
- Feature comparison tables
- Price highlights
- Badge indicators

### BOQ

**Elements:**
- Complete bill of quantities
- Itemized list
- Quantity, rate, amount columns
- Subtotals
- GST calculation
- Grand total

**Styling:**
- Tabular layout
- Alternating row colors
- Bold totals
- Currency formatting

### Room-wise BOQ

**Elements:**
- Room-specific BOQ
- Room dimensions
- Item breakdown per room
- Room subtotals
- Room totals

**Styling:**
- Room headers
- Nested tables
- Room-specific colors
- Summary cards

### Material Details

**Elements:**
- Material specifications
- Brand information
- Technical details
- Warranty details
- Maintenance instructions

**Styling:**
- Material cards
- Specification tables
- Brand logos
- Technical icons

### Comparison

**Elements:**
- Package comparison table
- Tier comparison
- Feature comparison
- Price comparison
- Upgrade recommendations

**Styling:**
- Comparison matrix
- Highlighted differences
- Recommendation badges
- Visual indicators

### Terms & Conditions

**Elements:**
- Payment terms
- Delivery terms
- Warranty terms
- Cancellation policy
- Liability clauses
- Dispute resolution

**Styling:**
- Numbered sections
- Clear headings
- Important terms highlighted
- Signature blocks

### Timeline

**Elements:**
- Project phases
- Milestone dates
- Duration estimates
- Dependencies
- Critical path

**Styling:**
- Gantt chart visualization
- Timeline bars
- Milestone markers
- Phase indicators

### Approval

**Elements:**
- Summary for approval
- Terms acceptance
- Signature blocks
- Date fields
- Authorization

**Styling:**
- Clear acceptance section
- Signature lines
- Date placeholders
- Authorization stamps

## API Reference

### `generateQuotation(data)`

Generates complete quotation PDF.

**Parameters:**
```javascript
{
  projectName: 'Luxury Apartment',
  clientName: 'John Doe',
  address: '123 Main Street',
  package: 'premium',
  budget: 1500000,
  rooms: [...],
  modules: [...],
  materials: [...],
  timeline: {...}
}
```

**Returns:** Opens print dialog with formatted PDF

### `generateBOQ(data)`

Generates BOQ-focused PDF.

**Parameters:**
```javascript
{
  projectName: 'Luxury Apartment',
  rooms: [...],
  tier: 'premium',
  items: [...]
}
```

**Returns:** Opens print dialog with formatted PDF

### `generateSummary(data)`

Generates executive summary PDF.

**Parameters:**
```javascript
{
  projectName: 'Luxury Apartment',
  package: 'premium',
  budget: 1500000,
  timeline: {...},
  highlights: [...]
}
```

**Returns:** Opens print dialog with formatted PDF

### `generateComparison(data)`

Generates comparison PDF.

**Parameters:**
```javascript
{
  projectName: 'Luxury Apartment',
  packages: {
    basic: {...},
    medium: {...},
    premium: {...}
  },
  recommendations: [...]
}
```

**Returns:** Opens print dialog with formatted PDF

## HTML Generation

### `createPDFHTML(data)`

Creates complete HTML document for PDF.

**Structure:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Document Title</title>
  <style>
    /* Inline CSS for print styling */
  </style>
</head>
<body>
  <!-- Page content -->
</body>
</html>
```

### Page-specific Methods

- `createCoverPage(data)` - Cover page HTML
- `createSummaryPage(data)` - Summary page HTML
- `createPackagePage(data)` - Package page HTML
- `createBOQPage(data)` - BOQ page HTML
- `createRoomBOQPage(data)` - Room BOQ page HTML
- `createMaterialPage(data)` - Material details HTML
- `createComparisonPage(data)` - Comparison page HTML
- `createTermsPage(data)` - Terms page HTML
- `createTimelinePage(data)` - Timeline page HTML
- `createApprovalPage(data)` - Approval page HTML

## Print Styling

### CSS Print Rules

```css
@media print {
  @page {
    size: A4;
    margin: 20mm;
  }
  
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .page-break {
    page-break-before: always;
  }
  
  .no-print {
    display: none;
  }
}
```

### Print Optimization

- **Color Accuracy**: Ensures colors print accurately
- **Page Breaks**: Controlled page breaks for clean layout
- **Background Graphics**: Enabled for visual elements
- **Font Embedding**: Web fonts embedded for consistency

## Data Integration

### Estimator Engine Integration

- Project data from estimator engine
- Package data from package engine
- BOQ data from BOQ engine
- Comparison data from comparison engine

### State Management Integration

- Current state from state manager
- Client details from state
- Project specifications from state

### Storage Integration

- Draft data from storage
- Cached calculations from storage
- Material data from storage

## Performance Optimization

### Lazy Generation

- Pages generated on demand
- Heavy content loaded progressively
- Images optimized for print

### Caching

- HTML templates cached
- Style sheets cached
- Repeated content cached

### Compression

- HTML minified before print
- CSS optimized for size
- Images compressed

## Browser Compatibility

### Supported Browsers

- Chrome 90+ (full support)
- Edge 90+ (full support)
- Firefox 88+ (full support)
- Safari 14+ (full support)

### Fallbacks

- Basic styling for older browsers
- Simplified layout for limited CSS support
- Text-only fallback for no CSS

## Accessibility

### Print Accessibility

- High contrast for readability
- Large font sizes for clarity
- Clear section headings
- Logical reading order

### Screen Reader Support

- Semantic HTML structure
- ARIA labels for interactive elements
- Alt text for images
- Descriptive link text

## Error Handling

### Common Errors

1. **Missing Data**: Uses default values
2. **Invalid Data**: Shows error message in PDF
3. **Print Failure**: Shows error alert
4. **Browser Incompatibility**: Shows compatibility message

### Error Recovery

- Graceful degradation
- Partial PDF generation
- Error logging
- User notification

## Future Enhancements

1. **Digital Signatures**: Embedded digital signatures
2. **Interactive PDFs**: Form fields and calculations
3. **Version Control**: PDF versioning and history
4. **Email Integration**: Direct email from PDF
5. **Cloud Storage**: Save to cloud services

## Conclusion

The PDF Generator provides professional, museum-quality PDF reports using browser print functionality. With comprehensive page templates, company design system integration, and dynamic HTML generation, it delivers publication-ready documents suitable for client presentations and project documentation without requiring external PDF libraries or backend processing.
