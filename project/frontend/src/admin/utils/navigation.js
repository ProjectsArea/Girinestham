// Admin Navigation Configuration
export const adminRoutes = {
  dashboard: "/admin/dashboard",
  management: "/admin/roles",
  users: "/admin/users",
  settings: "/admin/settings",
  reports: "/admin/reports",
  analytics: "/admin/analytics",
  // Add more routes as needed
};

// Navigation handler
export const handleNavigation = (module, navigate) => {
  const route = adminRoutes[module];
  if (route) {
    navigate(route);
  } else {
    console.warn(`Route for module '${module}' not found`);
    // Default fallback
    navigate(adminRoutes.dashboard);
  }
};

// Get all available modules for menu
export const getAvailableModules = () => {
  return [
    { key: "dashboard", label: "Dashboard", icon: "🏠" },
    { key: "management", label: "User and Role Management", icon: "👥" },
    { key: "settings", label: "Settings", icon: "⚙️" },
    { key: "reports", label: "Reports", icon: "📊" },
    { key: "analytics", label: "Analytics", icon: "📈" },
    // Add more modules as needed
  ];
};
