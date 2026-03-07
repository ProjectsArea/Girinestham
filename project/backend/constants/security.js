export const SECURITY_CONSTANTS = {
  // Password hashing
  SALT_ROUNDS: 10,
  
  // JWT
  JWT_EXPIRES_IN: '1h',
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: 5 * 60 * 1000, // 5 minutes
  RATE_LIMIT_MAX_REQUESTS: 3,
  
  // Account lockout
  DEFAULT_MAX_LOGIN_ATTEMPTS: 3,
  DEFAULT_LOCK_TIME_MINUTES: 5,
  
  // Cookie settings
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }
};
