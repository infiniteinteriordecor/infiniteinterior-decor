# 06_NAVIGATION_GRAPH.md

**Date:** 2025-01-21  
**Project:** Infinite Interior Decor  
**Scope:** Complete page navigation structure and internal links

---

## Navigation Structure Overview

```
Home (index.html)
├── About (pages/about/index.html)
├── Services (pages/services/index.html)
├── Projects (pages/projects/index.html)
│   └── Project Detail (pages/projects/detail/index.html)
├── Gallery (pages/gallery/index.html)
├── Estimator (pages/estimator/index.html)
└── Contact (pages/contact/index.html)

Footer Links:
├── Privacy Policy (pages/privacy/index.html)
└── Terms & Conditions (pages/terms/index.html)

Error Page:
└── 404 (pages/404/index.html)
```

---

## Detailed Navigation Graph

### 1. Home Page (index.html)

**Path:** `/` or `index.html`

**Navigation Links:**
- Home → `index.html` (self, active)
- About → `pages/about/index.html`
- Services → `pages/services/index.html`
- Projects → `pages/projects/index.html`
- Gallery → `pages/gallery/index.html`
- Estimator → `pages/estimator/index.html` (premium link)
- Contact → `pages/contact/index.html`

**Internal Links:**
- Hero CTA → Services page
- Features CTA → Services page
- Projects CTA → Projects page
- Services CTA → Services page
- Contact CTA → Contact page
- Trust indicators → About page
- Partner logos → Projects page

**Footer Links:**
- Privacy Policy → `pages/privacy/index.html`
- Terms & Conditions → `pages/terms/index.html`

---

### 2. About Page (pages/about/index.html)

**Path:** `/about` or `pages/about/index.html`

**Navigation Links:**
- Home → `../../index.html`
- About → `../` (self, active)
- Services → `../services/index.html`
- Projects → `../projects/index.html`
- Gallery → `../gallery/index.html`
- Estimator → `../estimator/index.html` (premium link)
- Contact → `../contact/index.html`

**Internal Links:**
- Team members → Contact page
- Values → Services page
- Mission → Services page

**Footer Links:**
- Privacy Policy → `../privacy/index.html`
- Terms & Conditions → `../terms/index.html`

---

### 3. Services Page (pages/services/index.html)

**Path:** `/services` or `pages/services/index.html`

**Navigation Links:**
- Home → `../../index.html`
- About → `../about/index.html`
- Services → `../` (self, active)
- Projects → `../projects/index.html`
- Gallery → `../gallery/index.html`
- Estimator → `../estimator/index.html` (premium link)
- Contact → `../contact/index.html`

**Internal Links:**
- Service cards → Project detail pages
- Process steps → About page
- CTA → Contact page
- FAQ → Contact page

**Footer Links:**
- Privacy Policy → `../privacy/index.html`
- Terms & Conditions → `../terms/index.html`

---

### 4. Projects Page (pages/projects/index.html)

**Path:** `/projects` or `pages/projects/index.html`

**Navigation Links:**
- Home → `../../index.html`
- About → `../about/index.html`
- Services → `../services/index.html`
- Projects → `../` (self, active)
- Gallery → `../gallery/index.html`
- Estimator → `../estimator/index.html` (premium link)
- Contact → `../contact/index.html`

**Internal Links:**
- Project cards → Project detail pages
- Filter categories → Filtered project list
- Load more → More projects
- CTA → Estimator page

**Footer Links:**
- Privacy Policy → `../privacy/index.html`
- Terms & Conditions → `../terms/index.html`

---

### 5. Project Detail Page (pages/projects/detail/index.html)

**Path:** `/projects/detail` or `pages/projects/detail/index.html`

**Navigation Links:**
- Home → `../../../index.html`
- About → `../../about/index.html`
- Services → `../../services/index.html`
- Projects → `../index.html` (self, active)
- Gallery → `../../gallery/index.html`
- Estimator → `../../estimator/index.html` (premium link)
- Contact → `../../contact/index.html`

**Internal Links:**
- Back to projects → Projects page
- Related projects → Other project detail pages
- CTA → Estimator page
- Contact → Contact page

**Footer Links:**
- Privacy Policy → `../../privacy/index.html`
- Terms & Conditions → `../../terms/index.html`

---

### 6. Gallery Page (pages/gallery/index.html)

**Path:** `/gallery` or `pages/gallery/index.html`

**Navigation Links:**
- Home → `../../index.html`
- About → `../about/index.html`
- Services → `../services/index.html`
- Projects → `../projects/index.html`
- Gallery → `../` (self, active)
- Estimator → `../estimator/index.html` (premium link)
- Contact → `../contact/index.html`

**Internal Links:**
- Gallery items → Project detail pages
- CTA → Projects page

**Footer Links:**
- Privacy Policy → `../privacy/index.html`
- Terms & Conditions → `../terms/index.html`

---

### 7. Estimator Page (pages/estimator/index.html)

**Path:** `/estimator` or `pages/estimator/index.html`

**Navigation Links:**
- Home → `../../index.html`
- About → `../about/index.html`
- Services → `../services/index.html`
- Projects → `../projects/index.html`
- Gallery → `../gallery/index.html`
- Estimator → (self, premium link)
- Contact → `../contact/index.html`

**Internal Links:**
- Wizard steps (internal navigation)
- Draft resumption (internal)
- PDF generation (internal)
- BOQ generation (internal)

**Footer Links:**
- Privacy Policy → `../privacy/index.html`
- Terms & Conditions → `../terms/index.html`

---

### 8. Contact Page (pages/contact/index.html)

**Path:** `/contact` or `pages/contact/index.html`

**Navigation Links:**
- Home → `../../index.html`
- About → `../about/index.html`
- Services → `../services/index.html`
- Projects → `../projects/index.html`
- Gallery → `../gallery/index.html`
- Estimator → `../estimator/index.html` (premium link)
- Contact → `../` (self, active)

**Internal Links:**
- Form submission → Thank you (same page)
- Social links → External (LinkedIn, Instagram, etc.)
- Email → mailto:
- Phone → tel:

**Footer Links:**
- Privacy Policy → `../privacy/index.html`
- Terms & Conditions → `../terms/index.html`

---

### 9. Privacy Policy Page (pages/privacy/index.html)

**Path:** `/privacy` or `pages/privacy/index.html`

**Navigation Links:**
- Home → `../index.html`
- About → `about/index.html`
- Services → `services/index.html`
- Projects → `projects/index.html`
- Gallery → `gallery/index.html`
- Contact → `contact/index.html`

**Note:** Missing Estimator link in navigation

**Internal Links:**
- Table of contents → Section anchors
- External links → Privacy policy references

**Footer Links:**
- Privacy Policy → (self)
- Terms & Conditions → `terms/index.html`

---

### 10. Terms & Conditions Page (pages/terms/index.html)

**Path:** `/terms` or `pages/terms/index.html`

**Navigation Links:**
- Home → `../index.html`
- About → `about/index.html`
- Services → `services/index.html`
- Projects → `projects/index.html`
- Gallery → `gallery/index.html`
- Contact → `contact/index.html`

**Note:** Missing Estimator link in navigation

**Internal Links:**
- Table of contents → Section anchors
- External links → Legal references

**Footer Links:**
- Privacy Policy → `privacy/index.html`
- Terms & Conditions → (self)

---

### 11. 404 Error Page (pages/404/index.html)

**Path:** `/404` or `pages/404/index.html`

**Navigation Links:**
- Home → `../index.html`
- About → `about/index.html`
- Services → `services/index.html`
- Projects → `projects/index.html`
- Gallery → `gallery/index.html`
- Contact → `contact/index.html`

**Note:** Missing Estimator link in navigation

**Internal Links:**
- Back to home → Home page

**Footer Links:**
- Privacy Policy → `privacy/index.html`
- Terms & Conditions → `terms/index.html`

---

## Navigation Flow Diagram

```
                    ┌─────────────┐
                    │    Home     │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌─────────┐      ┌──────────┐      ┌──────────┐
   │  About  │      │ Services │      │ Projects │
   └────┬────┘      └────┬─────┘      └────┬─────┘
        │                │                 │
        │                │                 ▼
        │                │          ┌──────────────┐
        │                │          │ Project Detail│
        │                │          └──────────────┘
        │                │
        ▼                ▼
   ┌──────────┐   ┌──────────┐
   │  Gallery  │   │ Estimator │
   └────┬─────┘   └────┬─────┘
        │              │
        │              │
        ▼              ▼
   ┌──────────┐   ┌──────────┐
   │ Contact  │   │ (Wizard) │
   └────┬─────┘   └──────────┘
        │
        ▼
   ┌──────────────────┐
   │ Footer Links     │
   ├──────────────────┤
   │ Privacy Policy   │
   │ Terms & Conditions│
   └──────────────────┘
```

---

## Internal Link Categories

### Primary Navigation Links

**Present on all pages except legal pages and 404:**
- Home
- About
- Services
- Projects
- Gallery
- Estimator (premium link)
- Contact

**Missing on legal pages and 404:**
- Estimator link

---

### Secondary Navigation Links

**CTA Buttons:**
- Home → Services, Projects, Contact
- About → Services, Contact
- Services → Contact
- Projects → Estimator, Contact
- Gallery → Projects
- Estimator → (internal wizard navigation)
- Contact → (form submission)

**Project Links:**
- Projects page → Project detail pages
- Gallery page → Project detail pages
- Service cards → Project detail pages

**Footer Links:**
- Privacy Policy
- Terms & Conditions

---

## External Links

### Social Media

**LinkedIn:** External link (not implemented in current code)

**Instagram:** External link (not implemented in current code)

**Facebook:** External link (not implemented in current code)

**Twitter:** External link (not implemented in current code)

---

### Contact Links

**Email:** mailto: (contact page)

**Phone:** tel: (contact page)

**Address:** Google Maps (contact page, not implemented)

---

## Navigation Issues

### Issue 1: Missing Estimator Link

**Pages affected:**
- pages/privacy/index.html
- pages/terms/index.html
- pages/404/index.html

**Impact:** Users cannot access Estimator from legal pages

**Severity:** Low (legal pages are less frequently visited)

---

### Issue 2: Self-Link Inconsistency

**Pages using `../` for self-link:**
- pages/about/index.html → `../`
- pages/services/index.html → `../`
- pages/projects/index.html → `../`
- pages/gallery/index.html → `../`
- pages/contact/index.html → `../`

**Expected:** Should use full path like `../about/index.html`

**Impact:** Minor - works but inconsistent

**Severity:** Low

---

### Issue 3: Legal Pages Path Structure

**CSS Paths:**
- pages/privacy/index.html → `../css/main.css` (should be `../../css/main.css`)
- pages/terms/index.html → `../css/main.css` (should be `../../css/main.css`)
- pages/404/index.html → `../css/main.css` (should be `../../css/main.css`)

**Navigation Links:**
- pages/privacy/index.html → `about/index.html` (should be `../about/index.html`)
- pages/terms/index.html → `about/index.html` (should be `../about/index.html`)
- pages/404/index.html → `about/index.html` (should be `../about/index.html`)

**Impact:** These pages will have 404 errors for CSS and navigation

**Severity:** High (broken navigation and styling)

---

## Navigation Best Practices

### Current Implementation

**Strengths:**
- Consistent navigation structure across main pages
- Semantic HTML with proper ARIA labels
- Skip to main content link for accessibility
- Mobile menu with proper toggle
- Active state indication on current page
- Premium link styling for Estimator

**Weaknesses:**
- Legal pages have inconsistent navigation
- Missing Estimator link on legal pages
- Self-link inconsistencies
- Path structure issues on legal pages

---

## Navigation Summary

**Total Pages:** 11  
**Primary Navigation Links:** 7  
**Secondary Navigation Links:** Multiple CTAs  
**Footer Links:** 2  
**External Links:** 0 (not implemented)  
**Internal Links:** 20+  
**Navigation Issues:** 3  
**Broken Links:** 0 (except legal page path issues)  
**Accessibility:** Good (ARIA labels, skip links)  
**Mobile Support:** Good (mobile menu)
