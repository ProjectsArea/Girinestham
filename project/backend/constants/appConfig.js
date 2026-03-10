export const APP_CONFIG = {
  // Server configuration
  DEFAULT_PORT: 5000,
  
  // CORS configuration
  CORS_ORIGINS: ["http://localhost:3000"],
  CORS_CREDENTIALS: true,
  
  // API routes
  API_ROUTES: {
    HOME: '/api/home',
    ABOUT: '/api/about',
    TOURNAMENTS: '/api/tournaments',
    CONTACT: '/api/contact',
    DONATE: '/api/donate',
    ADMIN_AUTH: '/api/admin/auth',
    ADMIN: '/api/admin',
    STUDENTS: "/api/volunteer/students",
  },
  
};
