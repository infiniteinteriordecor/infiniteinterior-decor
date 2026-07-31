# GitHub Pages Guide

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\`  
**Last Updated:** 2026-07-31

---

## Overview

This guide provides instructions for deploying the Infinite Interior Decor project to GitHub Pages. The project is designed for static hosting on GitHub Pages with no backend requirements.

---

## GitHub Pages Setup

### Prerequisites

- GitHub account
- Git installed
- Project repository on GitHub

### Initial Setup

1. **Create Repository**
   - Go to GitHub
   - Create new repository
   - Name: `infinite-interior`
   - Public or Private (depending on preference)

2. **Push Code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/infinite-interior.git
git push -u origin main
```

3. **Enable GitHub Pages**
   - Go to repository settings
   - Navigate to "Pages" section
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
   - Click Save

4. **Access Site**
   - Wait for deployment (1-2 minutes)
   - Access at: `https://username.github.io/infinite-interior/`

---

## GitHub Pages Configuration

### Custom Domain (Optional)

1. **Purchase Domain**
   - Buy domain from registrar
   - Go to domain DNS settings

2. **Configure DNS**
   - Add CNAME record:
     - Name: `www` (or subdomain)
     - Value: `username.github.io`

3. **Update GitHub Pages**
   - Go to repository settings
   - Pages section
   - Custom domain: `yourdomain.com`
   - Enable Enforce HTTPS

4. **Add CNAME File**
   - Create `CNAME` file in root
   - Content: `yourdomain.com`

---

## GitHub Pages Workflow

### Development Workflow

1. **Work on Feature Branch**
```bash
git checkout -b feature/new-feature
```

2. **Make Changes**
   - Edit files
   - Test locally
   - Commit changes

3. **Push to GitHub**
```bash
git push origin feature/new-feature
```

4. **Create Pull Request**
   - Go to GitHub
   - Create PR
   - Request review
   - Merge after approval

5. **Auto-Deploy**
   - GitHub Pages auto-deploys on merge
   - Site updates within 1-2 minutes

---

## GitHub Pages Specifics

### Base URL Handling

The project handles GitHub Pages subpath automatically:

```javascript
window.getBaseUrl = function() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  if (!isGitHubPages) return '/';
  
  const pathSegments = window.location.pathname.split('/').filter(segment => segment.length > 0);
  const repoName = pathSegments[0] || '';
  return '/' + repoName + '/';
};
```

### Asset Path Resolution

Assets paths are resolved correctly:

```javascript
window.resolveAssetPath = function(assetPath) {
  if (!assetPath) return '';
  const baseUrl = window.getBaseUrl();
  let cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  return baseUrl + cleanPath;
};
```

---

## GitHub Pages Limitations

### File Size Limit
- Individual files: 100 MB
- Total repository: 1 GB

### Bandwidth Limit
- 100 GB per month
- Soft limit with warnings

### Build Time Limit
- 10 minutes per build
- Not applicable (no build process)

### No Server-Side Code
- No PHP
- No Node.js
- No Python
- No database connections

---

## GitHub Pages Best Practices

### 1. Use Relative Paths

**Do:**
```html
<link rel="stylesheet" href="css/main.css">
<a href="pages/about/index.html">
```

**Don't:**
```html
<link rel="stylesheet" href="/css/main.css">
<a href="/pages/about/index.html">
```

### 2. Optimize Assets

- Compress images
- Minify CSS/JS
- Use WebP format
- Lazy load images

### 3. Use Caching

- Set cache headers
- Use versioning
- Cache static assets

### 4. Monitor Usage

- Check bandwidth usage
- Monitor build times
- Track visitor stats

---

## GitHub Pages Troubleshooting

### Issue: 404 Error

**Solutions:**
- Check file paths
- Verify file exists
- Check case sensitivity
- Clear browser cache

### Issue: Styles Not Loading

**Solutions:**
- Check CSS paths
- Verify CSS imports
- Check browser console
- Clear browser cache

### Issue: JavaScript Not Working

**Solutions:**
- Check script paths
- Verify script loading
- Check console errors
- Test in different browser

### Issue: Deployment Failed

**Solutions:**
- Check GitHub Pages status
- Verify branch settings
- Check for build errors
- Review deployment logs

---

## GitHub Pages Analytics

### Enable Analytics

1. **Google Analytics**
   - Create GA account
   - Get tracking ID
   - Add tracking code to pages

2. **GitHub Pages Built-in Analytics**
   - Go to repository settings
   - Pages section
   - Enable Analytics
   - View analytics in Insights

---

## GitHub Pages Security

### HTTPS

**Enable HTTPS:**
- Go to repository settings
- Pages section
- Enable Enforce HTTPS
- Wait for certificate

### Security Headers

**Not Configurable:**
- GitHub Pages doesn't support custom headers
- Use meta tags for security
- Implement CSP via meta tags

---

## GitHub Pages Maintenance

### Regular Maintenance

- Update dependencies (if any)
- Review analytics
- Check bandwidth usage
- Monitor performance
- Update documentation

### Updates

- Keep documentation current
- Update project info
- Review and update content
- Fix bugs and issues

---

## Notes

- Static hosting only
- No server-side code
- Automatic deployment
- Custom domain support
- Bandwidth limits
- No build process
- Relative paths required
- Base URL handling built-in

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
