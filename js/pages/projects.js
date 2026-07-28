/**
 * Projects Page JavaScript
 * 
 * Handles dynamic project rendering, filtering, search, and pagination.
 * Loads data from database.json and integrates with reusable image placeholder component.
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  dataPath: 'data/database.json',
  projectsPerPage: 6,
  debounceDelay: 300
};

// ============================================
// DOM ELEMENTS
// ============================================

const DOM = {
  projectsGrid: document.getElementById('projects-grid'),
  projectsSearch: document.getElementById('projects-search'),
  projectsCount: document.getElementById('projects-count'),
  projectsEmpty: document.getElementById('projects-empty'),
  projectsReset: document.getElementById('projects-reset'),
  projectsLoadMore: document.getElementById('projects-load-more'),
  loadMoreBtn: document.getElementById('load-more-btn'),
  categoryFilters: document.querySelectorAll('.projects-filter__category')
};

// ============================================
// STATE
// ============================================

let state = {
  allProjects: [],
  filteredProjects: [],
  currentPage: 1,
  currentCategory: 'all',
  currentSearch: '',
  isLoading: false
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get the base URL for assets based on the deployment environment
 * Detects GitHub Pages subpath and returns appropriate base URL
 * @returns {string} Base URL for assets (e.g., '/infiniteinterior-decor/' or '/')
 */
function getBaseUrl() {
  const pathname = window.location.pathname;
  
  // Check if we're on GitHub Pages with the subpath
  // Only return the subpath if we're not already on a path that includes it
  if (pathname.startsWith('/infiniteinterior-decor/')) {
    // Extract the subpath from the current URL
    const match = pathname.match(/^\/infiniteinterior-decor/);
    if (match) {
      return '/infiniteinterior-decor/';
    }
  }
  
  // Local development or root deployment
  return '/';
}

/**
 * Resolve an asset path to the full URL based on the current environment
 * @param {string} assetPath - Relative asset path (e.g., 'assets/images/logo/logo.png')
 * @returns {string} Full asset URL with correct base
 */
function resolveAssetPath(assetPath) {
  const baseUrl = getBaseUrl();
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  
  // Also remove the subpath if it's already in the asset path to prevent duplication
  if (cleanPath.startsWith('infiniteinterior-decor/')) {
    return '/' + cleanPath;
  }
  
  return baseUrl + cleanPath;
}

/**
 * Load data from JSON file
 */
async function loadData(path) {
  try {
    const response = await fetch(resolveAssetPath(path));
    if (!response.ok) {
      console.warn(`HTTP error! status: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Error loading data:', error);
    return null;
  }
}

/**
 * Debounce function for search input
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create reusable image placeholder
 */
function createImagePlaceholder(text, width, height, className = '') {
  const placeholder = document.createElement('div');
  placeholder.className = `image-placeholder ${className}`;
  placeholder.setAttribute('data-text', text);
  placeholder.setAttribute('data-width', width);
  placeholder.setAttribute('data-height', height);
  return placeholder;
}

/**
 * Get category display name
 */
function getCategoryDisplayName(category) {
  const categoryNames = {
    'residential': 'Residential',
    'commercial': 'Commercial',
    'retail': 'Retail',
    'hospitality': 'Hospitality'
  };
  return categoryNames[category] || category;
}

/**
 * Get status class based on status
 */
function getStatusClass(status) {
  const statusClasses = {
    'completed': 'project-card__status--completed',
    'ongoing': 'project-card__status--ongoing',
    'planned': 'project-card__status--planned'
  };
  return statusClasses[status] || '';
}

/**
 * Get status display name
 */
function getStatusDisplayName(status) {
  const statusNames = {
    'completed': 'Completed',
    'ongoing': 'Ongoing',
    'planned': 'Planned'
  };
  return statusNames[status] || status;
}

// ============================================
// RENDER FUNCTIONS
// ============================================

/**
 * Render a single project card
 */
function renderProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.setAttribute('data-category', project.category || 'all');
  card.setAttribute('data-id', project.id || '');
  
  // Project image with actual image
  const imageContainer = document.createElement('div');
  imageContainer.className = 'project-card__image';
  
  // Use actual image from project data
  const img = document.createElement('img');
  img.src = resolveAssetPath(project.image || project.thumbnail || '');
  img.alt = project.title || project.name || 'Project Image';
  img.className = 'project-card__img';
  img.loading = 'lazy';
  imageContainer.appendChild(img);
  
  // Overlay with view button
  const overlay = document.createElement('div');
  overlay.className = 'project-card__overlay';
  
  const viewBtn = document.createElement('a');
  viewBtn.className = 'project-card__view-btn';
  viewBtn.href = `detail/index.html?id=${project.id || ''}`;
  viewBtn.innerHTML = `
    <span>View Project</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  `;
  overlay.appendChild(viewBtn);
  imageContainer.appendChild(overlay);
  
  card.appendChild(imageContainer);
  
  // Content
  const content = document.createElement('div');
  content.className = 'project-card__content';
  
  // Category badge
  const category = document.createElement('span');
  category.className = 'project-card__category';
  category.textContent = getCategoryDisplayName(project.category || 'residential');
  content.appendChild(category);
  
  // Title
  const title = document.createElement('h3');
  title.className = 'project-card__title';
  title.textContent = project.title || project.name || 'Project Name';
  content.appendChild(title);
  
  // Location
  const location = document.createElement('div');
  location.className = 'project-card__location';
  location.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    <span>${project.location || 'Location TBD'}</span>
  `;
  content.appendChild(location);
  
  // Footer
  const footer = document.createElement('div');
  footer.className = 'project-card__footer';
  
  // Status
  const status = document.createElement('span');
  status.className = `project-card__status ${getStatusClass(project.status || 'completed')}`;
  status.textContent = getStatusDisplayName(project.status || 'completed');
  footer.appendChild(status);
  
  // View details link
  const detailsLink = document.createElement('a');
  detailsLink.className = 'project-card__details';
  detailsLink.href = `detail/index.html?id=${project.id || ''}`;
  detailsLink.innerHTML = `
    <span>View Details</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  `;
  footer.appendChild(detailsLink);
  
  content.appendChild(footer);
  card.appendChild(content);
  
  return card;
}

/**
 * Render projects grid
 */
function renderProjects(projects, append = false) {
  if (!append) {
    DOM.projectsGrid.innerHTML = '';
  }
  
  projects.forEach(project => {
    const card = renderProjectCard(project);
    DOM.projectsGrid.appendChild(card);
  });
  
  // Initialize image placeholders for newly added cards
  if (window.ImagePlaceholder) {
    window.ImagePlaceholder.init();
  }
}

/**
 * Update results count
 */
function updateResultsCount(count) {
  DOM.projectsCount.textContent = count;
}

/**
 * Show/hide empty state
 */
function toggleEmptyState(show) {
  DOM.projectsEmpty.style.display = show ? 'flex' : 'none';
  DOM.projectsGrid.style.display = show ? 'none' : 'grid';
}

/**
 * Show/hide load more button
 */
function toggleLoadMore(show) {
  DOM.projectsLoadMore.style.display = show ? 'flex' : 'none';
}

// ============================================
// FILTER FUNCTIONS
// ============================================

/**
 * Filter projects by category and search term
 */
function filterProjects() {
  let filtered = state.allProjects;
  
  // Filter by category
  if (state.currentCategory !== 'all') {
    filtered = filtered.filter(project => 
      project.category === state.currentCategory
    );
  }
  
  // Filter by search term
  if (state.currentSearch.trim() !== '') {
    const searchTerm = state.currentSearch.toLowerCase();
    filtered = filtered.filter(project => 
      (project.title || project.name || '').toLowerCase().includes(searchTerm) ||
      (project.location && project.location.toLowerCase().includes(searchTerm)) ||
      project.category.toLowerCase().includes(searchTerm)
    );
  }
  
  state.filteredProjects = filtered;
  state.currentPage = 1;
  
  // Render filtered projects
  const projectsToRender = getProjectsForCurrentPage();
  renderProjects(projectsToRender, false);
  updateResultsCount(filtered.length);
  
  // Show/hide empty state and load more
  toggleEmptyState(filtered.length === 0);
  toggleLoadMore(filtered.length > CONFIG.projectsPerPage);
}

/**
 * Get projects for current page (pagination)
 */
function getProjectsForCurrentPage() {
  const start = 0;
  const end = state.currentPage * CONFIG.projectsPerPage;
  return state.filteredProjects.slice(start, end);
}

/**
 * Load more projects
 */
function loadMoreProjects() {
  if (state.isLoading) return;
  
  state.isLoading = true;
  DOM.loadMoreBtn.textContent = 'Loading...';
  DOM.loadMoreBtn.disabled = true;
  
  // Simulate loading delay for better UX
  setTimeout(() => {
    state.currentPage++;
    const newProjects = getProjectsForCurrentPage();
    renderProjects(newProjects, true);
    
    // Check if there are more projects to load
    const hasMore = state.currentPage * CONFIG.projectsPerPage < state.filteredProjects.length;
    toggleLoadMore(hasMore);
    
    state.isLoading = false;
    DOM.loadMoreBtn.textContent = 'Load More Projects';
    DOM.loadMoreBtn.disabled = false;
  }, 500);
}

/**
 * Reset all filters
 */
function resetFilters() {
  state.currentCategory = 'all';
  state.currentSearch = '';
  state.currentPage = 1;
  
  // Reset search input
  DOM.projectsSearch.value = '';
  
  // Reset category buttons
  DOM.categoryFilters.forEach(btn => {
    btn.classList.remove('projects-filter__category--active');
    if (btn.dataset.category === 'all') {
      btn.classList.add('projects-filter__category--active');
    }
  });
  
  // Re-filter and render
  filterProjects();
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Initialize category filter listeners
 */
function initCategoryFilters() {
  DOM.categoryFilters.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      DOM.categoryFilters.forEach(btn => {
        btn.classList.remove('projects-filter__category--active');
      });
      button.classList.add('projects-filter__category--active');
      
      // Update state and filter
      state.currentCategory = button.dataset.category;
      filterProjects();
    });
  });
}

/**
 * Initialize search listener with debounce
 */
function initSearchListener() {
  const debouncedSearch = debounce((value) => {
    state.currentSearch = value;
    filterProjects();
  }, CONFIG.debounceDelay);
  
  DOM.projectsSearch.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
}

/**
 * Initialize load more listener
 */
function initLoadMoreListener() {
  DOM.loadMoreBtn.addEventListener('click', loadMoreProjects);
}

/**
 * Initialize reset button listener
 */
function initResetListener() {
  DOM.projectsReset.addEventListener('click', resetFilters);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize projects page
 */
async function initProjectsPage() {
  // Load data from database.json
  const database = await loadData(CONFIG.dataPath);
  
  if (!database) {
    console.error('Failed to load database.json');
    toggleEmptyState(true);
    return;
  }
  
  // Get projects from database
  state.allProjects = database.projects || [];
  state.filteredProjects = [...state.allProjects];
  
  // If no projects exist, show empty state
  if (state.allProjects.length === 0) {
    toggleEmptyState(true);
    updateResultsCount(0);
    return;
  }
  
  // Render initial projects
  const initialProjects = getProjectsForCurrentPage();
  renderProjects(initialProjects, false);
  updateResultsCount(state.allProjects.length);
  
  // Show load more if there are more projects
  toggleLoadMore(state.allProjects.length > CONFIG.projectsPerPage);
  
  // Initialize event listeners
  initCategoryFilters();
  initSearchListener();
  initLoadMoreListener();
  initResetListener();
  
  console.log('Projects page initialized successfully');
}

// ============================================
// DOM CONTENT LOADED
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectsPage);
} else {
  initProjectsPage();
}
