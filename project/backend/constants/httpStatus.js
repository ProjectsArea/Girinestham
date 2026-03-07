export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
  // Authentication errors
  NO_TOKEN_PROVIDED: 'No token provided',
  INVALID_TOKEN: 'Invalid token',
  TOKEN_EXPIRED: 'Token expired',
  INVALID_CREDENTIALS: 'Invalid credentials',
  ACCOUNT_LOCKED: 'Account locked. Please try again after 15mins',
  
  // Validation errors
  REQUIRED_FIELDS: 'Required fields are missing',
  EMAIL_PASSWORD_REQUIRED: 'Email and password are required',
  EMAIL_PASSWORD_ROLE_REQUIRED: 'Email, password, and role are required',
  USER_ID_REQUIRED: 'User ID is required',
  
  // Database errors
  DATABASE_ERROR: 'Database error',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  USER_NOT_FOUND: 'User not found',
  
  // General errors
  INTERNAL_SERVER_ERROR: 'Internal server error',
  TOO_MANY_REQUESTS: 'Too many requests from this IP, try again later.',
  INVALID_CSRF_TOKEN: 'Invalid CSRF token',
  FORBIDDEN_ADMIN_ACCESS: 'Forbidden: Admin access required'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESSFUL: 'Login successful',
  LOGOUT_SUCCESSFUL: 'Logged out successfully',
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  TOKEN_VALID: 'Token is valid'
};
