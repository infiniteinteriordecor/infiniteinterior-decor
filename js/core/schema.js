/**
 * Schema.org Structured Data
 * 
 * Dynamically generates and injects Schema.org structured data
 * for SEO and rich search results.
 * 
 * Supports:
 * - LocalBusiness
 * - InteriorDesigner
 * - Organization
 * - BreadcrumbList
 * - FAQPage
 * - ItemList (projects, services)
 */

(function() {
  'use strict';

  /**
   * Load database and generate schema
   */
  async function initSchema() {
    try {
      const response = await fetch('data/database.json');
      const data = await response.json();
      
      // Determine current page
      const currentPath = window.location.pathname;
      
      // Generate appropriate schema based on page
      if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
        generateHomeSchema(data);
      } else if (currentPath.includes('about')) {
        generateAboutSchema(data);
      } else if (currentPath.includes('services')) {
        generateServicesSchema(data);
      } else if (currentPath.includes('projects')) {
        generateProjectsSchema(data);
      } else if (currentPath.includes('gallery')) {
        generateGallerySchema(data);
      } else if (currentPath.includes('contact')) {
        generateContactSchema(data);
      }
      
      // Always add organization and local business schema
      generateOrganizationSchema(data);
      generateLocalBusinessSchema(data);
      
    } catch (error) {
      console.error('Error loading schema data:', error);
    }
  }

  /**
   * Generate Home Page Schema
   */
  function generateHomeSchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: data.company.name,
      url: data.seo.baseUrl,
      description: data.seo.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${data.seo.baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
    injectSchema(schema);
  }

  /**
   * Generate About Page Schema
   */
  function generateAboutSchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About - ' + data.company.name,
      description: data.about.description,
      mainEntity: {
        '@type': 'Organization',
        name: data.company.name,
        foundingDate: data.company.established,
        foundingLocation: data.company.headOffice,
        description: data.about.description
      }
    };
    injectSchema(schema);
  }

  /**
   * Generate Services Page Schema
   */
  function generateServicesSchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      name: 'Services - ' + data.company.name,
      description: 'Interior design services offered by ' + data.company.name,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: data.services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
            provider: {
              '@type': 'Organization',
              name: data.company.name
            }
          }
        }))
      }
    };
    injectSchema(schema);
  }

  /**
   * Generate Projects Page Schema
   */
  function generateProjectsSchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Projects - ' + data.company.name,
      description: 'Portfolio of interior design projects by ' + data.company.name,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: data.projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            image: project.heroImage,
            dateCreated: project.year,
            author: {
              '@type': 'Organization',
              name: data.company.name
            }
          }
        }))
      }
    };
    injectSchema(schema);
  }

  /**
   * Generate Gallery Page Schema
   */
  function generateGallerySchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Gallery - ' + data.company.name,
      description: 'Interior design gallery showcasing our work',
      about: {
        '@type': 'Organization',
        name: data.company.name
      }
    };
    injectSchema(schema);
  }

  /**
   * Generate Contact Page Schema
   */
  function generateContactSchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact - ' + data.company.name,
      description: 'Contact ' + data.company.name + ' for interior design services',
      mainEntity: {
        '@type': 'ContactPoint',
        telephone: data.contact.phone,
        email: data.contact.email,
        contactType: 'customer service',
        areaServed: data.contact.serviceAreas.join(', '),
        availableLanguage: ['English', 'Hindi'],
        hoursAvailable: data.contact.workingHours
      }
    };
    injectSchema(schema);
  }

  /**
   * Generate Organization Schema
   */
  function generateOrganizationSchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.company.name,
      url: data.seo.baseUrl,
      logo: data.seo.baseUrl + '/assets/images/logo.svg',
      description: data.about.description,
      foundingDate: data.company.established,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bhimtal',
        addressRegion: 'Uttarakhand',
        addressCountry: 'IN'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: data.contact.phone,
        email: data.contact.email,
        contactType: 'customer service'
      },
      sameAs: Object.values(data.contact.social).filter(url => url)
    };
    injectSchema(schema);
  }

  /**
   * Generate LocalBusiness Schema
   */
  function generateLocalBusinessSchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: data.company.name,
      image: data.seo.baseUrl + '/assets/images/og-image.jpg',
      url: data.seo.baseUrl,
      telephone: data.contact.phone,
      email: data.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.contact.address,
        addressLocality: 'Bhimtal',
        addressRegion: 'Uttarakhand',
        postalCode: '263136',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '29.3578',
        longitude: '79.5667'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00'
      },
      priceRange: '$$$',
      areaServed: data.contact.serviceAreas.join(', '),
      description: data.about.description
    };
    injectSchema(schema);
  }

  /**
   * Generate Interior Designer Schema
   */
  function generateInteriorDesignerSchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'InteriorDesigner',
      name: data.company.name,
      image: data.seo.baseUrl + '/assets/images/og-image.jpg',
      url: data.seo.baseUrl,
      telephone: data.contact.phone,
      email: data.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.contact.address,
        addressLocality: 'Bhimtal',
        addressRegion: 'Uttarakhand',
        addressCountry: 'IN'
      },
      description: data.about.description,
      serviceType: data.services.map(s => s.title).join(', ')
    };
    injectSchema(schema);
  }

  /**
   * Generate FAQ Schema
   */
  function generateFAQSchema(data) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
    injectSchema(schema);
  }

  /**
   * Generate Breadcrumb Schema
   */
  function generateBreadcrumbSchema(breadcrumbs) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
    injectSchema(schema);
  }

  /**
   * Inject schema into page head
   */
  function injectSchema(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSchema);
  } else {
    initSchema();
  }

  // Expose functions globally
  window.SchemaGenerator = {
    init: initSchema,
    generateFAQ: generateFAQSchema,
    generateBreadcrumb: generateBreadcrumbSchema
  };

})();
