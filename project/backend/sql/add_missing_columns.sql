-- Add missing columns to admin_users table
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS login_attempts INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS lock_until DATETIME NULL;

-- Check if is_active column exists, if not add it
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
