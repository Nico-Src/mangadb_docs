// docmd.config.js: basic config for docmd
module.exports = {
  // Core Site Metadata
  siteTitle: 'MangaDB',
  // Define a base URL for your site, crucial for SEO and absolute paths
  // No trailing slash
  siteUrl: '', // Replace with your actual deployed URL

  // Logo Configuration
  logo: {
    light: 'assets/images/logo.png', // Path relative to outputDir root
    dark: 'assets/images/logo-dark.png',   // Path relative to outputDir root
    alt: 'docmd logo',                      // Alt text for the logo
    href: './',                              // Link for the logo, defaults to site root
  },

  // Directory Configuration
  srcDir: 'docs',       // Source directory for Markdown files
  outputDir: 'site',    // Directory for generated static site

  // Search Configuration
  search: true,        // Enable/disable search functionality

  // Build Options
  minify: true,        // Enable/disable HTML/CSS/JS minification

  // Sidebar Configuration
  sidebar: {
    collapsible: true,        // or false to disable
    defaultCollapsed: false,  // or true to start collapsed
  },

  // Theme Configuration
  theme: {
    name: 'sky',            // Themes: 'default', 'sky'
    defaultMode: 'light',   // Initial color mode: 'light' or 'dark'
    enableModeToggle: true, // Show UI button to toggle light/dark modes
    positionMode: 'top', // 'top' or 'bottom' for the theme toggle
    codeHighlight: true,    // Enable/disable codeblock highlighting and import of highlight.js
    customCss: [            // Array of paths to custom CSS files
      'assets/css/custom-styles.css', // Paths relative to outputDir root
    ]
  },

  // Custom JavaScript Files
  customJs: [  // Array of paths to custom JS files, loaded at end of body
    // 'assets/js/custom-script.js', // Paths relative to outputDir root
    'assets/js/docmd-image-lightbox.js', // Image lightbox functionality
  ],

  // Content Processing
  autoTitleFromH1: true, // Set to true to automatically use the first H1 as page title
  copyCode: true, // Enable/disable the copy code button on code blocks

  // Plugins Configuration
  // Plugins are configured here. docmd will look for these keys.
  plugins: {
    // SEO Plugin Configuration
    // Most SEO data is pulled from page frontmatter (title, description, image, etc.)
    // These are fallbacks or site-wide settings.
    seo: {
      // Default meta description if a page doesn't have one in its frontmatter
      defaultDescription: 'Manga-DB Documentation - A comprehensive guide to using and developing with Manga-DB.',
      openGraph: { // For Facebook, LinkedIn, etc.
        // siteName: 'docmd Documentation', // Optional, defaults to config.siteTitle
        // Default image for og:image if not specified in page frontmatter
        // Path relative to outputDir root
        defaultImage: 'assets/images/docmd-preview.png',
      },
      twitter: { // For Twitter Cards
        cardType: 'summary_large_image',     // 'summary', 'summary_large_image'
        // siteUsername: '@docmd_handle',    // Your site's Twitter handle (optional)
        // creatorUsername: '@your_handle',  // Default author handle (optional, can be overridden in frontmatter)
      }
    },
    // Analytics Plugin Configuration
    analytics: {
      // Google Analytics 4 (GA4)
      googleV4: {
        measurementId: 'G-8QVBDQ4KM1' // Replace with your actual GA4 Measurement ID
      }
    },
    // Enable Sitemap plugin
    sitemap: {
      defaultChangefreq: 'weekly',
      defaultPriority: 0.8
    }
    // Add other future plugin configurations here by their key
  },

  // "Edit this page" Link Configuration
  editLink: {
    enabled: false,
    // The URL to the folder containing your docs in the git repo
    // Note: It usually ends with /edit/main/docs or /blob/main/docs
    baseUrl: 'https://github.com/mgks/docmd/edit/main/docs',
    text: 'Edit this page on GitHub'
  },

  // Navigation Structure (Sidebar)
  // Icons are kebab-case names from Lucide Icons (https://lucide.dev/)
  navigation: [
      { title: 'Welcome', path: '/', icon: 'home' },
      { title: 'System', collapsible: true, icon: 'cpu', children: [
        { title: 'Architecture', path: '/system/architecture/' },
      ] },
      { title: 'Model Reference', collapsible: true, icon: 'book-open', children: [
        { title: 'Base', path: '/model-reference/base-model/', icon: 'layers' },
        { title: 'User', path: '/model-reference/user-model/', icon: 'user' },
        { title: 'List', path: '/model-reference/list-model/', icon: 'list' },
        { title: 'Tag', path: '/model-reference/tag-model/', icon: 'tag' },
        { title: 'Report', path: '/model-reference/report-model/', icon: 'flag' },
        { title: 'Series', path: '/model-reference/series-model/', icon: 'library' },
        { title: 'Volume', path: '/model-reference/volume-model/', icon: 'book-text' },
        { title: 'Publisher', path: '/model-reference/publisher-model/', icon: 'building' },
        { title: 'Contributor', path: '/model-reference/contributor-model/', icon: 'pencil' },
        { title: 'Media', path: '/model-reference/media-model/', icon: 'image' },
      ] },
      { title: 'API Docs', collapsible: true, path: '/api-docs/general', icon: 'code', children: [
        { title: 'Middleware', path: '/api-docs/middleware/', icon: 'layers' },
        { title: 'CDN', path: '/api-docs/cdn-routes/', icon: 'cloud-rain' },
        { title: 'Auth', path: '/api-docs/auth-routes/', icon: 'lock' },
        { title: 'User', path: '/api-docs/user-routes/', icon: 'user' },
        { title: 'Lists', path: '/api-docs/list-routes/', icon: 'list' },
        { title: 'Tags', path: '/api-docs/tag-routes/', icon: 'tag' },
        { title: 'Reports', path: '/api-docs/report-routes/', icon: 'flag' },
        { title: 'Series', path: '/api-docs/series-routes/', icon: 'library' },
        { title: 'Volumes', path: '/api-docs/volume-routes/', icon: 'book-text' },
        { title: 'Publishers', path: '/api-docs/publisher-routes/', icon: 'building' },
        { title: 'Contributors', path: '/api-docs/contributor-routes/', icon: 'pencil' },
        { title: 'Admin Routes', collapsible: true, path: '/api-docs/admin-routes/', icon: 'shield', children: [
          { title: 'System', path: '/api-docs/admin-routes/system-management/', icon: 'settings' },
          { title: 'User', path: '/api-docs/admin-routes/user-management/', icon: 'users' },
          { title: 'Series', path: '/api-docs/admin-routes/series-management/', icon: 'library-big' },
          { title: 'Volumes', path: '/api-docs/admin-routes/volume-management/', icon: 'book-alert' },
          { title: 'Publishers', path: '/api-docs/admin-routes/publisher-management/', icon: 'building-2' },
          { title: 'Contributors', path: '/api-docs/admin-routes/contributor-management/', icon: 'pencil-ruler' },
          { title: 'Media', path: '/api-docs/admin-routes/media-management/', icon: 'image-plus' },
        ] },
      ] },
      // External links:
      { title: 'DigitalOcean', path: 'https://cloud.digitalocean.com/projects/870246cf-9dbb-4f2d-9b71-492827222a17/settings?i=bb1799', icon: 'waves', external: true },
      { title: 'Cloudflare', path: 'https://dash.cloudflare.com/36f277f32e2702e204925f3ff9b2b0a3/workers-and-pages', icon: 'cloud', external: true },
      { title: 'GitHub', path: 'https://github.com/mgks/docmd', icon: 'github', external: true },
      { title: 'Support the Project', path: 'https://github.com/sponsors/mgks', icon: 'heart', external: true },
    ],
    
  pageNavigation: true, // Enable previous / next page navigation at the bottom of each page

  // Sponsor Ribbon Configuration
  Sponsor: {
    enabled: false,
    title: 'Support docmd',
    link: 'https://github.com/sponsors/mgks',
  },

  // Footer Configuration
  // Markdown is supported here.
  footer: '© ' + new Date().getFullYear() + ' Project.',

  // Favicon Configuration
  // Path relative to outputDir root
  favicon: 'assets/favicon.png',
};
