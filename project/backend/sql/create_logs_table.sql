-- Create logs table for centralized logging
CREATE TABLE IF NOT EXISTS application_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Timestamp information
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Log level and type
    log_level ENUM('ERROR', 'SUCCESS', 'WARNING', 'INFO') NOT NULL,
    log_type VARCHAR(50) NOT NULL COMMENT 'Type of log: auth, database, api, system, etc.',
    
    -- Request information (for API logs)
    method VARCHAR(10) NULL COMMENT 'HTTP method: GET, POST, PUT, DELETE, etc.',
    endpoint VARCHAR(255) NULL COMMENT 'API endpoint path',
    user_id INT NULL COMMENT 'User ID if applicable',
    admin_id INT NULL COMMENT 'Admin ID if applicable',
    ip_address VARCHAR(45) NULL COMMENT 'Client IP address',
    user_agent TEXT NULL COMMENT 'Browser/client user agent',
    
    -- Error/Success details
    status_code INT NULL COMMENT 'HTTP status code',
    message TEXT NOT NULL COMMENT 'Log message',
    details JSON NULL COMMENT 'Additional error/success details in JSON format',
    stack_trace TEXT NULL COMMENT 'Error stack trace for debugging',
    
    -- Performance metrics
    response_time_ms INT NULL COMMENT 'Response time in milliseconds',
    
    -- System information
    server_name VARCHAR(100) NULL COMMENT 'Server name or instance',
    environment ENUM('development', 'production', 'staging', 'test') NULL,
    
    -- Indexes for better query performance
    INDEX idx_created_at (created_at),
    INDEX idx_log_level (log_level),
    INDEX idx_log_type (log_type),
    INDEX idx_user_id (user_id),
    INDEX idx_admin_id (admin_id),
    INDEX idx_endpoint (endpoint),
    INDEX idx_status_code (status_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Centralized application logging table';

-- Create a view for recent errors (last 24 hours)
CREATE OR REPLACE VIEW recent_errors AS
SELECT 
    id,
    created_at,
    log_type,
    method,
    endpoint,
    user_id,
    admin_id,
    ip_address,
    status_code,
    message,
    details,
    stack_trace,
    response_time_ms
FROM application_logs 
WHERE log_level = 'ERROR' 
AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
ORDER BY created_at DESC;

-- Create a view for recent successes (last 24 hours)
CREATE OR REPLACE VIEW recent_successes AS
SELECT 
    id,
    created_at,
    log_type,
    method,
    endpoint,
    user_id,
    admin_id,
    ip_address,
    status_code,
    message,
    details,
    response_time_ms
FROM application_logs 
WHERE log_level = 'SUCCESS' 
AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
ORDER BY created_at DESC;

-- Create a view for authentication logs
CREATE OR REPLACE VIEW auth_logs AS
SELECT 
    id,
    created_at,
    log_level,
    method,
    endpoint,
    user_id,
    admin_id,
    ip_address,
    status_code,
    message,
    details,
    response_time_ms
FROM application_logs 
WHERE log_type IN ('auth', 'login', 'logout', 'token_verification')
ORDER BY created_at DESC;

-- Create a stored procedure for logging
DELIMITER //
CREATE PROCEDURE log_application_event(
    IN p_log_level VARCHAR(10),
    IN p_log_type VARCHAR(50),
    IN p_method VARCHAR(10),
    IN p_endpoint VARCHAR(255),
    IN p_user_id INT,
    IN p_admin_id INT,
    IN p_ip_address VARCHAR(45),
    IN p_user_agent TEXT,
    IN p_status_code INT,
    IN p_message TEXT,
    IN p_details JSON,
    IN p_stack_trace TEXT,
    IN p_response_time_ms INT,
    IN p_server_name VARCHAR(100),
    IN p_environment VARCHAR(20)
)
BEGIN
    INSERT INTO application_logs (
        log_level,
        log_type,
        method,
        endpoint,
        user_id,
        admin_id,
        ip_address,
        user_agent,
        status_code,
        message,
        details,
        stack_trace,
        response_time_ms,
        server_name,
        environment
    ) VALUES (
        p_log_level,
        p_log_type,
        p_method,
        p_method,
        p_endpoint,
        p_user_id,
        p_admin_id,
        p_ip_address,
        p_user_agent,
        p_status_code,
        p_message,
        p_details,
        p_stack_trace,
        p_response_time_ms,
        p_server_name,
        p_environment
    );
END //
DELIMITER ;

-- Sample queries for common log analysis

-- Get error summary by type (last 7 days)
-- SELECT log_type, COUNT(*) as error_count 
-- FROM application_logs 
-- WHERE log_level = 'ERROR' 
-- AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
-- GROUP BY log_type 
-- ORDER BY error_count DESC;

-- Get most active users (last 24 hours)
-- SELECT user_id, COUNT(*) as activity_count
-- FROM application_logs 
-- WHERE user_id IS NOT NULL
-- AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
-- GROUP BY user_id 
-- ORDER BY activity_count DESC;

-- Get slow endpoints (response time > 1000ms, last 24 hours)
-- SELECT endpoint, AVG(response_time_ms) as avg_response_time, COUNT(*) as request_count
-- FROM application_logs 
-- WHERE response_time_ms > 1000
-- AND created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
-- GROUP BY endpoint 
-- ORDER BY avg_response_time DESC;
