/**
 * Estimator PDF Generator
 * 
 * PDF generation system for estimator module.
 * Generates professional PDF reports from estimator data using browser print functionality.
 * 
 * Architecture:
 * - Purpose: Generate PDF reports and quotations
 * - Dependencies: helpers.js
 * - Exports: PDFGenerator class
 */

(function() {
  'use strict';

  /**
   * PDF Generator Class
   * Manages PDF generation logic
   */
  class PDFGenerator {
    constructor() {
      // PDF configuration
      this.config = {
        format: 'A4',
        orientation: 'portrait',
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      };
      
      // Company branding
      this.branding = {
        name: 'Infinite Interior',
        tagline: 'Luxury Interior Design',
        logo: '/assets/images/company/logo.png',
        primaryColor: '#1a1a1a',
        accentColor: '#c9a962',
        secondaryColor: '#f5f5f5'
      };
      
      // Current PDF data
      this.currentData = null;
    }

    /**
     * Initialize PDF generator
     * @returns {Promise<boolean>} Success status
     */
    async init() {
      return true;
    }

    /**
     * Generate complete quotation PDF
     * @param {Object} data - Estimator data
     * @returns {Promise<boolean>} Success status
     */
    async generateQuotation(data) {
      this.currentData = data;
      
      // Create PDF HTML structure
      const pdfHTML = this.createPDFHTML(data);
      
      // Open in new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(pdfHTML);
        printWindow.document.close();
        
        // Wait for content to load then print
        printWindow.onload = function() {
          setTimeout(() => {
            printWindow.print();
          }, 500);
        };
        
        return true;
      }
      
      return false;
    }

    /**
     * Create complete PDF HTML structure
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    createPDFHTML(data) {
      return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quotation - ${this.branding.name}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #1a1a1a;
      line-height: 1.6;
      background: #ffffff;
    }
    
    @page {
      size: A4;
      margin: 20mm;
    }
    
    .pdf-container {
      max-width: 210mm;
      margin: 0 auto;
      padding: 20mm;
    }
    
    .page {
      page-break-after: always;
      min-height: 250mm;
      padding: 10mm;
    }
    
    .page:last-child {
      page-break-after: auto;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #c9a962;
    }
    
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #1a1a1a;
      letter-spacing: 4px;
      text-transform: uppercase;
    }
    
    .tagline {
      font-size: 14px;
      color: #c9a962;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 5px;
    }
    
    .document-title {
      font-size: 24px;
      color: #c9a962;
      text-align: center;
      margin: 30px 0;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .section-title {
      font-size: 18px;
      color: #1a1a1a;
      margin: 25px 0 15px 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #e0e0e0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 20px 0;
    }
    
    .info-item {
      padding: 10px;
      background: #f9f9f9;
      border-left: 3px solid #c9a962;
    }
    
    .info-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .info-value {
      font-size: 14px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    
    .table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    
    .table th {
      background: #1a1a1a;
      color: #ffffff;
      padding: 12px;
      text-align: left;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .table td {
      padding: 12px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 13px;
    }
    
    .table tr:nth-child(even) {
      background: #f9f9f9;
    }
    
    .total-row {
      background: #c9a962 !important;
      color: #1a1a1a;
      font-weight: bold;
    }
    
    .price {
      text-align: right;
      font-family: 'Courier New', monospace;
    }
    
    .signature-section {
      margin-top: 50px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
    }
    
    .signature-box {
      text-align: center;
      padding-top: 80px;
      border-top: 1px solid #1a1a1a;
    }
    
    .signature-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10mm;
      text-align: center;
      font-size: 10px;
      color: #666;
      border-top: 1px solid #e0e0e0;
      background: #ffffff;
    }
    
    .page-number {
      position: fixed;
      bottom: 10mm;
      right: 20mm;
      font-size: 10px;
      color: #666;
    }
    
    .approval-box {
      border: 2px solid #c9a962;
      padding: 30px;
      margin: 30px 0;
      text-align: center;
    }
    
    .approval-title {
      font-size: 16px;
      color: #c9a962;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }
    
    .approval-text {
      font-size: 14px;
      color: #1a1a1a;
      margin-bottom: 20px;
    }
    
    .approval-date {
      font-size: 12px;
      color: #666;
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="pdf-container">
    ${this.generateCoverPage(data)}
    ${this.generateProjectSummaryPage(data)}
    ${this.generatePackageSummaryPage(data)}
    ${this.generateBOQPage(data)}
    ${this.generateRoomBOQPage(data)}
    ${this.generateMaterialDetailsPage(data)}
    ${this.generateComparisonPage(data)}
    ${this.generateTermsPage(data)}
    ${this.generateTimelinePage(data)}
    ${this.generateApprovalPage(data)}
  </div>
  
  <div class="footer">
    ${this.branding.name} | ${this.branding.tagline} | Generated on ${new Date().toLocaleDateString()}
  </div>
  
  <script>
    // Add page numbers
    window.onload = function() {
      const pages = document.querySelectorAll('.page');
      pages.forEach((page, index) => {
        const pageNum = document.createElement('div');
        pageNum.className = 'page-number';
        pageNum.textContent = \`Page \${index + 1} of \${pages.length}\`;
        page.appendChild(pageNum);
      });
    };
  </script>
</body>
</html>
      `;
    }

    /**
     * Generate cover page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generateCoverPage(data) {
      const clientName = data.clientDetails?.name || 'Client';
      const projectType = data.projectCategory || 'Interior Design';
      
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <div style="text-align: center; margin-top: 100px;">
    <h1 style="font-size: 48px; color: #1a1a1a; margin-bottom: 20px; letter-spacing: 3px;">QUOTATION</h1>
    <div style="width: 100px; height: 3px; background: #c9a962; margin: 30px auto;"></div>
  </div>
  
  <div class="info-grid" style="margin-top: 80px;">
    <div class="info-item">
      <div class="info-label">Client Name</div>
      <div class="info-value">${clientName}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Project Type</div>
      <div class="info-value">${projectType}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Quotation Date</div>
      <div class="info-value">${new Date().toLocaleDateString()}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Valid Until</div>
      <div class="info-value">${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</div>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 100px;">
    <p style="font-size: 14px; color: #666; font-style: italic;">"Transforming spaces into timeless elegance"</p>
  </div>
</div>
      `;
    }

    /**
     * Generate project summary page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generateProjectSummaryPage(data) {
      const projectInfo = data.projectInfo || {};
      const package = data.selectedPackage || 'medium';
      
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <h2 class="document-title">Project Summary</h2>
  
  <h3 class="section-title">Project Information</h3>
  <div class="info-grid">
    <div class="info-item">
      <div class="info-label">Project Type</div>
      <div class="info-value">${data.projectCategory || 'Residential'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Project Scope</div>
      <div class="info-value">${data.projectType || 'Full Interior'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Total Area</div>
      <div class="info-value">${projectInfo.area || 0} sqft</div>
    </div>
    <div class="info-item">
      <div class="info-label">Location</div>
      <div class="info-value">${projectInfo.city || 'Not specified'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Selected Package</div>
      <div class="info-value">${package.charAt(0).toUpperCase() + package.slice(1)}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Design Style</div>
      <div class="info-value">${data.designStyle || 'Modern'}</div>
    </div>
  </div>
  
  <h3 class="section-title">Rooms Included</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Room Type</th>
        <th>Area (sqft)</th>
        <th>Specifications</th>
      </tr>
    </thead>
    <tbody>
      ${(data.rooms || []).map(room => `
        <tr>
          <td>${room.type || 'Room'}</td>
          <td>${room.area || 0}</td>
          <td>${room.specifications || 'Standard'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  
  <h3 class="section-title">Budget Overview</h3>
  <div class="info-grid">
    <div class="info-item">
      <div class="info-label">Estimated Budget</div>
      <div class="info-value">₹${(data.budget || 0).toLocaleString()}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Budget Type</div>
      <div class="info-value">${data.budgetType || 'Known'}</div>
    </div>
  </div>
</div>
      `;
    }

    /**
     * Generate package summary page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generatePackageSummaryPage(data) {
      const package = data.selectedPackage || 'medium';
      const packageName = package.charAt(0).toUpperCase() + package.slice(1);
      
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <h2 class="document-title">Package Summary</h2>
  
  <h3 class="section-title">${packageName} Package</h3>
  
  <div class="info-grid">
    <div class="info-item">
      <div class="info-label">Package Tier</div>
      <div class="info-value">${packageName}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Quality Level</div>
      <div class="info-value">${package === 'premium' ? 'Luxury' : package === 'medium' ? 'Premium' : 'Standard'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Expected Lifespan</div>
      <div class="info-value">${package === 'premium' ? '25 years' : package === 'medium' ? '20 years' : '15 years'}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Warranty Period</div>
      <div class="info-value">${package === 'premium' ? '15 years' : package === 'medium' ? '10 years' : '5 years'}</div>
    </div>
  </div>
  
  <h3 class="section-title">Package Specifications</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Component</th>
        <th>Basic</th>
        <th>Medium</th>
        <th>Premium</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Plywood Grade</td>
        <td>MR Grade 18mm</td>
        <td>BWR Grade 18mm</td>
        <td>BWP Marine 19mm</td>
      </tr>
      <tr>
        <td>Laminates</td>
        <td>0.8mm Decorative</td>
        <td>1mm Premium</td>
        <td>1mm Texture/Metallic</td>
      </tr>
      <tr>
        <td>Hardware</td>
        <td>Standard Chrome</td>
        <td>Premium Chrome/Black</td>
        <td>Brass/Gold/Black</td>
      </tr>
      <tr>
        <td>Finish</td>
        <td>Standard Matte</td>
        <td>Premium Satin</td>
        <td>Luxury Gloss</td>
      </tr>
      <tr>
        <td>Lighting</td>
        <td>LED Panel 18W</td>
        <td>LED Panel 24W + Downlights</td>
        <td>LED Panel 36W + Smart</td>
      </tr>
    </tbody>
  </table>
  
  <h3 class="section-title">Package Inclusions</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Inclusion</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Premium Materials</td>
        <td>${package === 'premium' ? '✓' : package === 'medium' ? '✓' : '✗'}</td>
      </tr>
      <tr>
        <td>Soft-close Hardware</td>
        <td>${package === 'premium' ? '✓' : package === 'medium' ? '✓' : '✗'}</td>
      </tr>
      <tr>
        <td>Premium Lighting</td>
        <td>${package === 'premium' ? '✓' : package === 'medium' ? '✓' : '✗'}</td>
      </tr>
      <tr>
        <td>Veneer Finish</td>
        <td>${package === 'premium' ? '✓' : package === 'medium' ? '✓' : '✗'}</td>
      </tr>
      <tr>
        <td>Design Revisions</td>
        <td>${package === 'premium' ? 'Unlimited' : package === 'medium' ? '4' : '2'}</td>
      </tr>
    </tbody>
  </table>
</div>
      `;
    }

    /**
     * Generate BOQ page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generateBOQPage(data) {
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <h2 class="document-title">Bill of Quantities</h2>
  
  <h3 class="section-title">Cost Breakdown</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Component</th>
        <th>Percentage</th>
        <th class="price">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Materials</td>
        <td>45%</td>
        <td class="price">₹${((data.budget || 0) * 0.45).toLocaleString()}</td>
      </tr>
      <tr>
        <td>Hardware</td>
        <td>10%</td>
        <td class="price">₹${((data.budget || 0) * 0.10).toLocaleString()}</td>
      </tr>
      <tr>
        <td>Lighting</td>
        <td>8%</td>
        <td class="price">₹${((data.budget || 0) * 0.08).toLocaleString()}</td>
      </tr>
      <tr>
        <td>Finish</td>
        <td>7%</td>
        <td class="price">₹${((data.budget || 0) * 0.07).toLocaleString()}</td>
      </tr>
      <tr>
        <td>Labor</td>
        <td>20%</td>
        <td class="price">₹${((data.budget || 0) * 0.20).toLocaleString()}</td>
      </tr>
      <tr>
        <td>Installation</td>
        <td>10%</td>
        <td class="price">₹${((data.budget || 0) * 0.10).toLocaleString()}</td>
      </tr>
      <tr class="total-row">
        <td>Subtotal</td>
        <td>100%</td>
        <td class="price">₹${(data.budget || 0).toLocaleString()}</td>
      </tr>
      <tr>
        <td>GST (18%)</td>
        <td>-</td>
        <td class="price">₹${((data.budget || 0) * 0.18).toLocaleString()}</td>
      </tr>
      <tr class="total-row">
        <td>Grand Total</td>
        <td>-</td>
        <td class="price">₹${((data.budget || 0) * 1.18).toLocaleString()}</td>
      </tr>
    </tbody>
  </table>
</div>
      `;
    }

    /**
     * Generate room BOQ page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generateRoomBOQPage(data) {
      const rooms = data.rooms || [];
      
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <h2 class="document-title">Room-wise Breakdown</h2>
  
  ${rooms.map((room, index) => `
    <h3 class="section-title">${room.type || 'Room ' + (index + 1)}</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Material</th>
          <th>Qty</th>
          <th>Unit</th>
          <th class="price">Rate</th>
          <th class="price">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flooring</td>
          <td>Vitrified Tiles</td>
          <td>${room.area || 0}</td>
          <td>sqft</td>
          <td class="price">₹120</td>
          <td class="price">₹${((room.area || 0) * 120).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Wall Paint</td>
          <td>Premium Emulsion</td>
          <td>${(room.area || 0) * 3}</td>
          <td>sqft</td>
          <td class="price">₹25</td>
          <td class="price">₹${((room.area || 0) * 3 * 25).toLocaleString()}</td>
        </tr>
        <tr>
          <td>False Ceiling</td>
          <td>Gypsum Board</td>
          <td>${room.area || 0}</td>
          <td>sqft</td>
          <td class="price">₹85</td>
          <td class="price">₹${((room.area || 0) * 85).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Electrical</td>
          <td>Modular Switches</td>
          <td>6</td>
          <td>points</td>
          <td class="price">₹150</td>
          <td class="price">₹900</td>
        </tr>
        <tr class="total-row">
          <td colspan="5">Room Total</td>
          <td class="price">₹${((room.area || 0) * 230 + 900).toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  `).join('')}
</div>
      `;
    }

    /**
     * Generate material details page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generateMaterialDetailsPage(data) {
      const package = data.selectedPackage || 'medium';
      
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <h2 class="document-title">Material Specifications</h2>
  
  <h3 class="section-title">Plywood & Boards</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Material</th>
        <th>Grade</th>
        <th>Thickness</th>
        <th>Brand</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Main Plywood</td>
        <td>${package === 'premium' ? 'BWP Marine' : package === 'medium' ? 'BWR' : 'MR'}</td>
        <td>${package === 'premium' ? '19mm' : '18mm'}</td>
        <td>Greenply/Century</td>
      </tr>
      <tr>
        <td>Blockboard</td>
        <td>Standard</td>
        <td>19mm</td>
        <td>Century</td>
      </tr>
      <tr>
        <td>MDF</td>
        <td>${package === 'premium' ? 'Fire Retardant' : 'Standard'}</td>
        <td>18mm</td>
        <td>Greenpanel</td>
      </tr>
    </tbody>
  </table>
  
  <h3 class="section-title">Hardware & Fittings</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Type</th>
        <th>Brand</th>
        <th>Finish</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hinges</td>
        <td>${package === 'premium' ? 'Soft Close Plus' : 'Standard'}</td>
        <td>Hafele</td>
        <td>${package === 'premium' ? 'Brass' : 'Chrome'}</td>
      </tr>
      <tr>
        <td>Slides</td>
        <td>${package === 'premium' ? 'Heavy Duty' : 'Standard'}</td>
        <td>Hettich</td>
        <td>${package === 'premium' ? 'Matte Black' : 'Chrome'}</td>
      </tr>
      <tr>
        <td>Handles</td>
        <td>Bar Handle</td>
        <td>Hafele</td>
        <td>${package === 'premium' ? 'Gold' : 'Stainless Steel'}</td>
      </tr>
    </tbody>
  </table>
  
  <h3 class="section-title">Finishes & Surfaces</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Finish Type</th>
        <th>Product</th>
        <th>Brand</th>
        <th>Quality</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Laminates</td>
        <td>${package === 'premium' ? 'Texture' : 'Decorative'}</td>
        <td>Merino/Greenlam</td>
        <td>${package === 'premium' ? '1mm' : '0.8mm'}</td>
      </tr>
      <tr>
        <td>Paint</td>
        <td>${package === 'premium' ? 'Royal Luxury' : ' Royale'}</td>
        <td>Asian Paints</td>
        <td>${package === 'premium' ? 'Gloss' : 'Satin'}</td>
      </tr>
      <tr>
        <td>Veneer</td>
        <td>${package === 'premium' ? 'Premium Walnut' : 'Natural Oak'}</td>
        <td>Decowood</td>
        <td>${package === 'premium' ? '0.8mm' : '0.5mm'}</td>
      </tr>
    </tbody>
  </table>
</div>
      `;
    }

    /**
     * Generate comparison page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generateComparisonPage(data) {
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <h2 class="document-title">Package Comparison</h2>
  
  <h3 class="section-title">Tier Comparison</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Feature</th>
        <th>Basic</th>
        <th>Medium</th>
        <th>Premium</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Price Multiplier</td>
        <td>1.0x</td>
        <td>1.4x</td>
        <td>2.0x</td>
      </tr>
      <tr>
        <td>Lifespan</td>
        <td>15 years</td>
        <td>20 years</td>
        <td>25 years</td>
      </tr>
      <tr>
        <td>Warranty</td>
        <td>5 years</td>
        <td>10 years</td>
        <td>15 years</td>
      </tr>
      <tr>
        <td>Durability</td>
        <td>7/10</td>
        <td>8/10</td>
        <td>9/10</td>
      </tr>
      <tr>
        <td>Maintenance</td>
        <td>Medium</td>
        <td>Low</td>
        <td>Very Low</td>
      </tr>
      <tr>
        <td>Luxury Level</td>
        <td>Standard</td>
        <td>Premium</td>
        <td>Luxury</td>
      </tr>
    </tbody>
  </table>
  
  <h3 class="section-title">Upgrade Recommendation</h3>
  <div class="info-grid">
    <div class="info-item">
      <div class="info-label">Recommended Tier</div>
      <div class="info-value">Medium</div>
    </div>
    <div class="info-item">
      <div class="info-label">Reason</div>
      <div class="info-value">Best value with premium materials</div>
    </div>
  </div>
  
  <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-left: 4px solid #c9a962;">
    <p style="font-size: 14px; color: #1a1a1a;">
      <strong>Upgrade to Premium:</strong> +40% more life, +10 years warranty, luxury materials. Recommended for long-term investment and premium aesthetics.
    </p>
  </div>
</div>
      `;
    }

    /**
     * Generate terms page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generateTermsPage(data) {
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <h2 class="document-title">Terms & Conditions</h2>
  
  <h3 class="section-title">Payment Terms</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Stage</th>
        <th>Percentage</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Advance</td>
        <td>40%</td>
        <td>Upon agreement signing</td>
      </tr>
      <tr>
        <td>Material Procurement</td>
        <td>30%</td>
        <td>Before material delivery</td>
      </tr>
      <tr>
        <td>Work Completion</td>
        <td>20%</td>
        <td>Upon work completion</td>
      </tr>
      <tr>
        <td>Final Settlement</td>
        <td>10%</td>
        <td>After handover</td>
      </tr>
    </tbody>
  </table>
  
  <h3 class="section-title">General Terms</h3>
  <div style="font-size: 13px; line-height: 1.8; color: #333;">
    <p style="margin-bottom: 15px;">1. This quotation is valid for 30 days from the date of issue.</p>
    <p style="margin-bottom: 15px;">2. Prices are inclusive of material, labor, and installation as specified.</p>
    <p style="margin-bottom: 15px;">3. GST @18% will be charged additionally as applicable.</p>
    <p style="margin-bottom: 15px;">4. Any changes in scope will require a revised quotation.</p>
    <p style="margin-bottom: 15px;">5. Timeline may vary based on project complexity and site conditions.</p>
    <p style="margin-bottom: 15px;">6. Warranty covers manufacturing defects as per manufacturer terms.</p>
    <p style="margin-bottom: 15px;">7. Site conditions must be suitable for work commencement.</p>
    <p style="margin-bottom: 15px;">8. Client approval required for all design milestones.</p>
  </div>
  
  <h3 class="section-title">Cancellation Policy</h3>
  <div style="font-size: 13px; line-height: 1.8; color: #333;">
    <p style="margin-bottom: 15px;">- Cancellation before work start: 10% of advance forfeited</p>
    <p style="margin-bottom: 15px;">- Cancellation after work start: Proportional deduction based on work completed</p>
  </div>
</div>
      `;
    }

    /**
     * Generate timeline page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generateTimelinePage(data) {
      const area = data.projectInfo?.area || 0;
      const estimatedDays = Math.ceil(area / 50);
      
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <h2 class="document-title">Project Timeline</h2>
  
  <h3 class="section-title">Estimated Duration</h3>
  <div class="info-grid">
    <div class="info-item">
      <div class="info-label">Total Area</div>
      <div class="info-value">${area} sqft</div>
    </div>
    <div class="info-item">
      <div class="info-label">Estimated Duration</div>
      <div class="info-value">${estimatedDays} days</div>
    </div>
  </div>
  
  <h3 class="section-title">Project Phases</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Phase</th>
        <th>Duration</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Design Finalization</td>
        <td>7-10 days</td>
        <td>Design approval, drawings, material selection</td>
      </tr>
      <tr>
        <td>Site Preparation</td>
        <td>3-5 days</td>
        <td>Site measurement, demolition, protection</td>
      </tr>
      <tr>
        <td>Rough-in Work</td>
        <td>10-15 days</td>
        <td>Electrical, plumbing, civil work</td>
      </tr>
      <tr>
        <td>Carpentry & Joinery</td>
        <td>15-20 days</td>
        <td>Furniture, cabinets, wardrobes</td>
      </tr>
      <tr>
        <td>Finishing Work</td>
        <td>10-15 days</td>
        <td>Painting, polishing, hardware installation</td>
      </tr>
      <tr>
        <td>Final Touches</td>
        <td>5-7 days</td>
        <td>Cleaning, accessories, handover</td>
      </tr>
    </tbody>
  </table>
  
  <h3 class="section-title">Milestones</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Milestone</th>
        <th>Payment Trigger</th>
        <th>Client Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Design Approval</td>
        <td>Advance Payment</td>
        <td>Approve designs & materials</td>
      </tr>
      <tr>
        <td>Material Delivery</td>
        <td>Material Procurement</td>
        <td>Verify material quality</td>
      </tr>
      <tr>
        <td>Carpentry Complete</td>
        <td>Work Completion</td>
        <td>Inspect work quality</td>
      </tr>
      <tr>
        <td>Project Handover</td>
        <td>Final Settlement</td>
        <td>Final inspection & acceptance</td>
      </tr>
    </tbody>
  </table>
</div>
      `;
    }

    /**
     * Generate approval page
     * @param {Object} data - Estimator data
     * @returns {string} HTML string
     */
    generateApprovalPage(data) {
      const clientName = data.clientDetails?.name || 'Client';
      const totalAmount = (data.budget || 0) * 1.18;
      
      return `
<div class="page">
  <div class="header">
    <div class="logo">${this.branding.name}</div>
    <div class="tagline">${this.branding.tagline}</div>
  </div>
  
  <h2 class="document-title">Approval & Acceptance</h2>
  
  <div class="approval-box">
    <div class="approval-title">Quotation Acceptance</div>
    <div class="approval-text">
      By signing below, you acknowledge that you have reviewed and understood the quotation, 
      terms, and conditions outlined in this document. You agree to proceed with the project 
      as specified.
    </div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Total Quotation Amount</div>
        <div class="info-value" style="font-size: 18px; font-weight: bold; color: #c9a962;">
          ₹${totalAmount.toLocaleString()}
        </div>
      </div>
      <div class="info-item">
        <div class="info-label">Advance Payment Required</div>
        <div class="info-value" style="font-size: 18px; font-weight: bold; color: #c9a962;">
          ₹${(totalAmount * 0.40).toLocaleString()} (40%)
        </div>
      </div>
    </div>
  </div>
  
  <div class="signature-section">
    <div class="signature-box">
      <div class="signature-label">Client Signature</div>
      <div style="margin-top: 10px; font-size: 14px;">${clientName}</div>
      <div class="approval-date">Date: _______________</div>
    </div>
    <div class="signature-box">
      <div class="signature-label">Company Representative</div>
      <div style="margin-top: 10px; font-size: 14px;">${this.branding.name}</div>
      <div class="approval-date">Date: _______________</div>
    </div>
  </div>
  
  <div style="margin-top: 50px; padding: 20px; background: #f9f9f9; border: 1px solid #e0e0e0;">
    <h3 style="font-size: 14px; color: #1a1a1a; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Contact Information</h3>
    <div style="font-size: 13px; color: #333; line-height: 1.8;">
      <p><strong>${this.branding.name}</strong></p>
      <p>Email: info@infiniteinterior.com</p>
      <p>Phone: +91 98765 43210</p>
      <p>Website: www.infiniteinterior.com</p>
    </div>
  </div>
  
  <div style="margin-top: 30px; text-align: center; font-size: 11px; color: #666;">
    <p>Thank you for choosing ${this.branding.name}. We look forward to transforming your space.</p>
  </div>
</div>
      `;
    }

    /**
     * Generate BOQ PDF
     * @param {Object} data - Estimator data
     * @returns {Promise<boolean>} Success status
     */
    async generateBOQ(data) {
      return this.generateQuotation(data);
    }

    /**
     * Generate summary PDF
     * @param {Object} data - Estimator data
     * @returns {Promise<boolean>} Success status
     */
    async generateSummary(data) {
      return this.generateQuotation(data);
    }

    /**
     * Generate comparison PDF
     * @param {Object} comparisonData - Comparison data
     * @returns {Promise<boolean>} Success status
     */
    async generateComparison(comparisonData) {
      return this.generateQuotation(comparisonData);
    }

    /**
     * Save PDF
     * @param {Blob} pdfBlob - PDF blob
     * @param {string} filename - File name
     */
    savePDF(pdfBlob, filename) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    /**
     * Print PDF
     * @param {Blob} pdfBlob - PDF blob
     */
    printPDF(pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const printWindow = window.open(url, '_blank');
      if (printWindow) {
        printWindow.onload = function() {
          printWindow.print();
        };
      }
    }

    /**
     * Get PDF configuration
     * @returns {Object} PDF configuration
     */
    getConfig() {
      return { ...this.config };
    }

    /**
     * Set PDF configuration
     * @param {Object} config - PDF configuration
     */
    setConfig(config) {
      this.config = { ...this.config, ...config };
    }
  }

  // Export for use in other modules
  window.EstimatorPDFGenerator = PDFGenerator;

})();

