// Global test setup
process.env.NODE_ENV = 'test';

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

console.error = (...args) => {
  // Filter out expected MySQL connection errors in tests
  if (typeof args[0] === 'string' && args[0].includes('MySQL Connection Failed')) {
    return;
  }
  if (typeof args[0] === 'string' && args[0].includes('Database logging failed')) {
    return;
  }
  if (typeof args[0] === 'string' && args[0].includes('Logging failed: cb is not a function')) {
    return;
  }
  originalConsoleError(...args);
};

console.log = (...args) => {
  // Filter out dotenv messages in tests
  if (typeof args[0] === 'string' && args[0].includes('[dotenv@')) {
    return;
  }
  originalConsoleLog(...args);
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
