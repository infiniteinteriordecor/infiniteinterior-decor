# Developer Guide

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

This guide provides comprehensive information for developers working on the Infinite Interior Decor project. It covers setup, development workflow, coding standards, and deployment.

---

## Getting Started

### Prerequisites

- **Git:** Version control
- **Text Editor:** VS Code recommended
- **Browser:** Chrome/Firefox for testing
- **GitHub Account:** For deployment

### Local Development Setup

1. **Clone Repository**
```bash
git clone https://github.com/username/infinite-interior.git
cd infinite-interior
```

2. **Install Extensions (VS Code)**
- Live Server
- ESLint
- Prettier
- JSON Schema Validator

3. **Start Local Server**
```bash
# Using Live Server extension
# Right-click index.html and select "Open with Live Server"

# Or using Python
python -m http.server 8000

# Or using Node.js
npx serve
```

4. **Open in Browser**
```
http://localhost:8000
```

---

## Project Structure

### Directory Overview

```
infinite-interior/
├── components/          # HTML components
├── css/                # Stylesheets
├── data/               # JSON data files
├── docs/               # Documentation
├── js/                 # JavaScript modules
├── layouts/            # HTML layouts
├── pages/              # Page HTML files
├── assets/             # Static assets
└── index.html          # Homepage
```

---

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Edit files following conventions
- Test changes locally
- Validate JSON files
- Check console for errors

### 3. Commit Changes

```bash
git add .
git commit -m "Descriptive commit message"
```

### 4. Push to GitHub

```bash
git push origin feature/your-feature-name
```

### 5. Create Pull Request

- Go to GitHub
- Create pull request
- Describe changes
- Request review

### 6. Merge and Deploy

- After approval, merge to main
- GitHub Pages auto-deploys
- Verify deployment

---

## Coding Standards

### HTML Standards

- Use semantic HTML5
- Follow BEM naming
- Include ARIA attributes
- Use relative paths
- Validate with W3C validator

### CSS Standards

- Use BEM naming convention
- Use design tokens
- Mobile-first approach
- Avoid !important
- Organize by component

### JavaScript Standards

- Use IIFE pattern
- No ES6 modules
- Export to window object
- Handle errors gracefully
- Use strict mode

### JSON Standards

- Validate with schema
- Use double quotes
- No trailing commas
- Include metadata
- Follow naming conventions

---

## Testing Checklist

### Functionality Testing

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms validate
- [ ] Estimator works
- [ ] Storage works
- [ ] No console errors

### Responsive Testing

- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Wide screens (> 1440px)

### Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Accessibility Testing

- [ ] Keyboard navigation
- [ ] Screen reader compatible
- [ ] ARIA labels present
- [ ] Skip links work

---

## Common Tasks

### Add New Page

1. Create HTML file in `pages/`
2. Create CSS file in `css/pages/`
3. Add link to CSS in HTML
4. Add navigation link in navbar
5. Test page

### Add New Component

1. Create HTML component in `components/`
2. Create CSS component in `css/components/`
3. Import CSS in main.css
4. Use component in pages
5. Test component

### Add New JavaScript Module

1. Create JS file in `js/`
2. Wrap in IIFE
3. Export to window object
4. Add script tag to HTML
5. Test module

### Add New Data File

1. Create JSON file in `data/`
2. Follow schema
3. Validate JSON
4. Load in JavaScript
5. Test data loading

---

## Debugging

### Console Debugging

See `20_CONSOLE_DEBUG_GUIDE.md` for detailed debugging instructions.

### Common Issues

**Issue:** Page not loading
- Check file paths
- Check console errors
- Verify file exists

**Issue:** Styles not applying
- Check CSS imports
- Check selector specificity
- Clear browser cache

**Issue:** JavaScript not working
- Check script loading
- Check console errors
- Verify global object exists

**Issue:** Estimator not loading
- Check bootstrap diagnostics
- Verify module loading order
- Check data file loading

---

## Deployment

### GitHub Pages Deployment

See `23_GITHUB_PAGES_GUIDE.md` for detailed deployment instructions.

### Deployment Checklist

- [ ] All changes committed
- [ ] No console errors
- [ ] All links work
- [ ] Images load
- [ ] Forms work
- [ ] Responsive design works
- [ ] Accessibility features work

---

## Performance Optimization

### Optimization Techniques

- Use WebP images
- Lazy load images
- Minify CSS/JS
- Compress assets
- Use caching

### Performance Testing

- Run Lighthouse audit
- Check Core Web Vitals
- Monitor load times
- Test on slow connections

---

## Documentation

### Updating Documentation

1. Update relevant documentation file
2. Follow documentation format
3. Include examples
4. Update table of contents
5. Commit documentation changes

### Documentation Files

- `00_PROJECT_OVERVIEW.md` - Project overview
- `01_FOLDER_STRUCTURE.md` - Folder structure
- `02_COMPLETE_FILE_INDEX.md` - File index
- `03_HTML_ARCHITECTURE.md` - HTML architecture
- `04_CSS_ARCHITECTURE.md` - CSS architecture
- `05_JS_ARCHITECTURE.md` - JavaScript architecture
- `06_RUNTIME_LOADING.md` - Runtime loading
- `07_COMPONENT_SYSTEM.md` - Component system
- `08_ESTIMATOR_ARCHITECTURE.md` - Estimator architecture
- `09_DATA_FLOW.md` - Data flow
- `10_JSON_DATABASE.md` - JSON database
- `11_ASSET_SYSTEM.md` - Asset system
- `12_DEPENDENCY_GRAPH.md` - Dependency graph
- `13_GLOBAL_OBJECTS.md` - Global objects
- `14_SINGLETON_SYSTEM.md` - Singleton system
- `15_ROUTING_SYSTEM.md` - Routing system
- `16_STORAGE_SYSTEM.md` - Storage system
- `17_PDF_SYSTEM.md` - PDF system
- `18_BOQ_SYSTEM.md` - BOQ system
- `19_PERFORMANCE_SYSTEM.md` - Performance system
- `20_CONSOLE_DEBUG_GUIDE.md` - Console debug guide
- `21_SAFE_EDIT_RULES.md` - Safe edit rules
- `22_DEVELOPER_GUIDE.md` - Developer guide (this file)
- `23_GITHUB_PAGES_GUIDE.md` - GitHub Pages guide
- `24_PROJECT_HEALTH_REPORT.md` - Project health report
- `25_MASTER_ARCHITECTURE.md` - Master architecture
- `99_AI_DEVELOPER_MASTER_GUIDE.md` - AI developer guide
- `100_AI_CONTEXT.md` - AI context

---

## Resources

### Documentation

- MDN Web Docs
- W3C Specifications
- Can I Use
- GitHub Pages Documentation

### Tools

- VS Code
- Chrome DevTools
- Lighthouse
- JSONLint

### Communities

- Stack Overflow
- GitHub Discussions
- Reddit r/webdev

---

## Notes

- Static site, no backend
- GitHub Pages hosting
- Vanilla HTML/CSS/JS
- IIFE pattern for modules
- BEM naming convention
- Design tokens system
- Comprehensive documentation

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
