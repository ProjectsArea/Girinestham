export const DATABASE_CONSTANTS = {
  // Connection pool settings
  CONNECTION_LIMIT: 10,
  QUEUE_LIMIT: 0,
  WAIT_FOR_CONNECTIONS: true,
  
  // Query timeouts
  DEFAULT_QUERY_TIMEOUT: 30000, // 30 seconds
  
  // Common table names
  TABLES: {
    USERS: 'users',
    ADMIN_USERS: 'admin_users',
    ROLES: 'roles'
  }
};
