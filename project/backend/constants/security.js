export const SECURITY_CONSTANTS = {
  // Password hashing
  SALT_ROUNDS: 10,
  
  // JWT
  JWT_EXPIRES_IN: '1h',
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
  
  // Account lockout
  DEFAULT_MAX_LOGIN_ATTEMPTS: 5,
  DEFAULT_LOCK_TIME_MINUTES: 15,
  
  // Cookie settings
  COOKIE_OPTIONS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
  }
};
