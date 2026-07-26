# Data Structure Documentation

This document describes the JSON structure for dynamic content loading on the Infinite Interior Decor homepage.

## Overview

All website content is loaded from a single `data/database.json` file. This file contains all company information, services, projects, statistics, and contact details. The homepage JavaScript loads this file asynchronously and renders content dynamically into the respective sections.

## Database Structure (`data/database.json`)

The database file contains the following top-level sections:

```json
{
  "company": { ... },
  "about": { ... },
  "statistics": [ ... ],
  "services": [ ... ],
  "projects": [ ... ],
  "clients": [ ... ],
  "contact": { ... }
}
```

## Company

The company section contains basic company information.

### Fields

- **name** (string, required): Company name
- **headOffice** (string, required): Head office location
- **operations** (string, required): Geographic coverage (e.g., "Pan India")
- **business** (string, required): Business description

### Example

```json
{
  "company": {
    "name": "Infinite Interior Decor",
    "headOffice": "Bhimtal, Uttarakhand, India",
    "operations": "Pan India",
    "business": "Premium Interior Design & Turnkey Execution"
  }
}
```

## About

The about section contains company description and values.

### Fields

- **description** (string, optional): Company description
- **mission** (string, optional): Mission statement
- **vision** (string, optional): Vision statement
- **values** (array of strings, optional): Company values

### Example

```json
{
  "about": {
    "description": "",
    "mission": "",
    "vision": "",
    "values": []
  }
}
```

## Statistics

The statistics array controls the trust section counters.

### Fields

- **value** (number, required): The numeric value to display and animate
- **suffix** (string, optional): Text to append after the value (e.g., "+", "%")
- **label** (string, required): The label text displayed below the counter
- **iconPath** (string, optional): SVG path data for the icon. If omitted, a default checkmark icon is used.

### Example

```json
{
  "statistics": [
    {
      "value": 15,
      "suffix": "+",
      "label": "Years Experience",
      "iconPath": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    }
  ]
}
```

## Services

The services array controls the services preview section cards.

### Fields

- **title** (string, required): The service title
- **description** (string, optional): The service description text
- **price** (string, optional): Price text displayed in the footer. If omitted, no price is shown.
- **link** (string, optional): URL for the "Details" link. Defaults to "pages/services/" if omitted.
- **iconPath** (string, optional): SVG path data for the icon. If omitted, a default home icon is used.
- **features** (array of strings, optional): List of feature items to display as bullet points. If omitted or empty, no features list is shown.

### Example

```json
{
  "services": [
    {
      "title": "Residential Interiors",
      "description": "",
      "price": "",
      "link": "pages/services/",
      "iconPath": "",
      "features": []
    }
  ]
}
```

## Projects

The projects array controls the featured projects section cards.

### Fields

- **title** (string, required): The project title
- **category** (string, optional): The project category (e.g., "Residential", "Commercial")
- **location** (string, optional): Location text. If omitted, no location is displayed.
- **year** (string, optional): Year of completion. If omitted, no year is displayed.
- **area** (string, optional): Area in square feet. If omitted, no area is displayed.
- **image** (string, optional): Path to project image. If omitted, a CSS gradient placeholder is used.
- **link** (string, optional): URL for the "View Project" link. Defaults to "pages/projects/" if omitted.
- **featured** (boolean, optional): If true, displays a "Featured" badge on the card. Default is false.

### Example

```json
{
  "projects": [
    {
      "title": "Baithke Bihari Cafe",
      "category": "",
      "location": "",
      "year": "",
      "area": "",
      "image": "",
      "link": "pages/projects/",
      "featured": false
    }
  ]
}
```

## Clients

The clients array contains client information (currently unused on homepage).

### Fields

- **name** (string, required): Client name
- **logo** (string, optional): Path to client logo
- **link** (string, optional): URL to client website

### Example

```json
{
  "clients": []
}
```

## Contact

The contact section contains contact information and social media links.

### Fields

- **phone** (string, optional): Phone number
- **email** (string, optional): Email address
- **address** (string, optional): Physical address
- **social** (object, optional): Social media links
  - **facebook** (string, optional): Facebook URL
  - **instagram** (string, optional): Instagram URL
  - **linkedin** (string, optional): LinkedIn URL
  - **twitter** (string, optional): Twitter URL

### Example

```json
{
  "contact": {
    "phone": "",
    "email": "",
    "address": "",
    "social": {
      "facebook": "",
      "instagram": "",
      "linkedin": "",
      "twitter": ""
    }
  }
}
```

## Empty States

When a section in the database is empty or contains an empty array, the respective section will display a "No [content] available" message. This allows the homepage to function gracefully while data is being populated.

## SVG Icon Paths

Icon paths should be valid SVG path data from Material Design icons or similar icon sets. The path should be the `d` attribute value from the SVG element.

Example sources:
- Material Design Icons: https://material.io/resources/icons/
- Heroicons: https://heroicons.com/

## Loading Order

Data is loaded in the following order:
1. Company information (updates page title and navbar)
2. Statistics
3. Services
4. Projects
5. Contact information (updates footer)

Each section renders independently, so if one section fails to load, the others will still display correctly.

## Error Handling

If the database file fails to load or contains invalid data:
- An error is logged to the console
- Sections with missing data display empty state messages
- Other sections continue to load normally

## Best Practices

1. **Validate JSON**: Use a JSON validator before updating the file
2. **Use Real Data Only**: Only include actual project names, real statistics, and genuine information from the official company profile
3. **Keep Images Optimized**: If using project images, ensure they are optimized for web
4. **Consistent Formatting**: Use consistent indentation (2 spaces recommended)
5. **Escape Special Characters**: Properly escape quotes and special characters in strings
6. **Test Locally**: Test changes locally before deploying to production
7. **No Invented Data**: Never invent statistics, prices, reviews, awards, or other information not provided by the company
