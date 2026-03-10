export const APP_CONFIG = {
  // Server configuration
  DEFAULT_PORT: 5000,
  
  // CORS configuration
  CORS_ORIGINS: ["http://localhost:3000"],
  CORS_CREDENTIALS: true,
  
  // Trust proxy for nginx
  TRUST_PROXY: 1,
  
  // API routes
  API_ROUTES: {
    HOME: '/api/home',
    ABOUT: '/api/about',
    TOURNAMENTS: '/api/tournaments',
    CONTACT: '/api/contact',
    DONATE: '/api/donate',
    ADMIN: '/api/admin'
  },
  
  // Admin roles
  ADMIN_ROLES: {
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
  }
};
