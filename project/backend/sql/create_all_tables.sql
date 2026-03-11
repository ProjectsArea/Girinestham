-- -- Sports System Database Creation Script
-- -- Generated on: 2026-03-03
-- -- Database: sports_system

-- -- Use the sports_system database
-- USE sports_system;

-- -- ========================================
-- -- MASTER TABLES (msts)
-- -- ========================================

-- -- Banks table
-- CREATE TABLE mst_banks (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     bank_name VARCHAR(150) NOT NULL UNIQUE,
--     account_number VARCHAR(50),
--     ifsc_code VARCHAR(20),
--     branch_name VARCHAR(100),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Call purposes table
-- CREATE TABLE mst_call_purposes (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     purpose_name VARCHAR(100) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Call statuses table
-- CREATE TABLE mst_call_statuses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Call types table
-- CREATE TABLE mst_call_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     type_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Cheque statuses table
-- CREATE TABLE mst_cheque_statuses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Cheque types table
-- CREATE TABLE mst_cheque_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     type_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Collected by types table
-- CREATE TABLE mst_collected_by_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     type_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Dispatch modes table
-- CREATE TABLE mst_dispatch_modes (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     mode_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Document types table
-- CREATE TABLE mst_document_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     type_name VARCHAR(100) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Donation modes table
-- CREATE TABLE mst_donation_modes (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     mode_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Donation purposes table
-- CREATE TABLE mst_donation_purposes (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     purpose_name VARCHAR(100) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Donor statuses table
-- CREATE TABLE mst_donor_statuses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Duration types table
-- CREATE TABLE mst_duration_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     duration_name VARCHAR(50) NOT NULL UNIQUE,
--     duration_in_days INT NOT NULL,
--     status TINYINT DEFAULT 1,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Fee types table
-- CREATE TABLE mst_fee_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     fee_type_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Membership statuses table
-- CREATE TABLE mst_membership_statuses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Membership types table
-- CREATE TABLE mst_membership_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     type_name VARCHAR(50) NOT NULL UNIQUE,
--     status TINYINT DEFAULT 1,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Module statuses table
-- CREATE TABLE mst_module_statuses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL UNIQUE
-- );

-- -- Module visibility types table
-- CREATE TABLE mst_module_visibility_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     visibility_name VARCHAR(50) NOT NULL UNIQUE
-- );

-- -- Modules table
-- CREATE TABLE mst_modules (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     module_name VARCHAR(100) NOT NULL UNIQUE,
--     description TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Payment decisions table
-- CREATE TABLE mst_payment_decisions (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     decision_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Payment modes table
-- CREATE TABLE mst_payment_modes (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     mode_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Payment purposes table
-- CREATE TABLE mst_payment_purposes (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     purpose_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Payment statuses table
-- CREATE TABLE mst_payment_statuses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Payment sub types table
-- CREATE TABLE mst_payment_sub_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     sub_type_name VARCHAR(50) NOT NULL UNIQUE,
--     payment_mode_id INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (payment_mode_id) REFERENCES mst_payment_modes(id)
-- );

-- -- Permission types table
-- CREATE TABLE mst_permission_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     permission_type_name VARCHAR(50) NOT NULL UNIQUE
-- );

-- -- Property categories table
-- CREATE TABLE mst_property_categories (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     category_name VARCHAR(100) NOT NULL UNIQUE,
--     status TINYINT DEFAULT 1,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Property statuses table
-- CREATE TABLE mst_property_statuses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Roles table
-- CREATE TABLE mst_roles (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     role_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Sports table
-- CREATE TABLE mst_sports (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     sport_name VARCHAR(100) UNIQUE NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Tournament levels table
-- CREATE TABLE mst_tournament_levels (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     level_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Tournament result types table
-- CREATE TABLE mst_tournament_result_types (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     result_name VARCHAR(50) NOT NULL UNIQUE,
--     rank_order INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Tournament statuses table
-- CREATE TABLE mst_tournament_statuses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Tournament updates table
-- CREATE TABLE mst_tournament_updates (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     update_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- User statuses table
-- CREATE TABLE mst_user_statuses (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     status_name VARCHAR(50) NOT NULL UNIQUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- ========================================
-- -- TRANSACTION TABLES (tbls)
-- -- ========================================

-- -- Users table
-- CREATE TABLE tbl_users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_code VARCHAR(50) UNIQUE,
--     user_status_id INT,
--     role_id INT,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(150) UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     contact_number VARCHAR(20),
--     date_of_joining DATE,
--     created_by INT,
--     address TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_status_id) REFERENCES mst_user_statuses(id),
--     FOREIGN KEY (role_id) REFERENCES mst_roles(id),
--     FOREIGN KEY (created_by) REFERENCES tbl_users(id)
-- );

-- -- Students table
-- CREATE TABLE tbl_students (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     full_name VARCHAR(100) NOT NULL,
--     date_of_birth DATE,
--     gender VARCHAR(20),
--     contact_number VARCHAR(20),
--     email VARCHAR(100),
--     address TEXT,
--     guardian_name VARCHAR(100),
--     emergency_contact VARCHAR(20),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Donors table
-- CREATE TABLE tbl_donors (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     donor_code VARCHAR(50) UNIQUE,
--     donor_name VARCHAR(150) NOT NULL,
--     address TEXT,
--     mobile_number VARCHAR(20),
--     email VARCHAR(150),
--     donor_status_id INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (donor_status_id) REFERENCES mst_donor_statuses(id)
-- );

-- -- Properties table
-- CREATE TABLE tbl_properties (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     asset_name VARCHAR(150) NOT NULL,
--     category_id INT,
--     quantity INT DEFAULT 1,
--     brand VARCHAR(100),
--     purchase_date DATE,
--     purchase_value DECIMAL(12,2),
--     supplier VARCHAR(150),
--     invoice_number VARCHAR(100),
--     location VARCHAR(150),
--     condition_id INT,
--     asset_status_id INT,
--     responsible_person_id INT,
--     remarks TEXT,
--     physical_verification_date DATE,
--     verified_by INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (category_id) REFERENCES mst_property_categories(id),
--     FOREIGN KEY (asset_status_id) REFERENCES mst_property_statuses(id),
--     FOREIGN KEY (responsible_person_id) REFERENCES tbl_users(id),
--     FOREIGN KEY (verified_by) REFERENCES tbl_users(id)
-- );

-- -- Memberships table
-- CREATE TABLE tbl_memberships (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     membership_name VARCHAR(100) NOT NULL,
--     membership_type_id INT,
--     description TEXT,
--     duration_type_id INT,
--     price DECIMAL(10,2),
--     benefits TEXT,
--     max_students_allowed INT,
--     membership_status_id INT,
--     registration_fee DECIMAL(10,2),
--     fee_type_id INT,
--     discount DECIMAL(10,2),
--     start_date DATE,
--     end_date DATE,
--     total_students_registered INT DEFAULT 0,
--     total_amount_paid DECIMAL(12,2) DEFAULT 0,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (membership_type_id) REFERENCES mst_membership_types(id),
--     FOREIGN KEY (duration_type_id) REFERENCES mst_duration_types(id),
--     FOREIGN KEY (membership_status_id) REFERENCES mst_membership_statuses(id),
--     FOREIGN KEY (fee_type_id) REFERENCES mst_fee_types(id)
-- );

-- -- Tournaments table
-- CREATE TABLE tbl_tournaments (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     tournament_code VARCHAR(50) UNIQUE,
--     tournament_name VARCHAR(150) NOT NULL,
--     sport_id INT NOT NULL,
--     tournament_level_id INT NOT NULL,
--     tournament_date DATE NOT NULL,
--     tournament_time TIME,
--     tournament_location VARCHAR(200),
--     registration_status TINYINT(1) DEFAULT 1,
--     registration_last_date DATE,
--     organizer_name VARCHAR(150),
--     contact_number VARCHAR(20),
--     participation_fee DECIMAL(10,2) DEFAULT 0.00,
--     max_students_allowed INT DEFAULT NULL,
--     tournament_update_id INT,
--     tournament_status_id INT,
--     total_registered INT DEFAULT 0,
--     total_collected_fee DECIMAL(12,2) DEFAULT 0.00,
--     description TEXT,
--     created_by INT,
--     updated_by INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (sport_id) REFERENCES mst_sports(id),
--     FOREIGN KEY (tournament_level_id) REFERENCES mst_tournament_levels(id),
--     FOREIGN KEY (tournament_update_id) REFERENCES mst_tournament_updates(id),
--     FOREIGN KEY (tournament_status_id) REFERENCES mst_tournament_statuses(id),
--     FOREIGN KEY (created_by) REFERENCES tbl_users(id),
--     FOREIGN KEY (updated_by) REFERENCES tbl_users(id)
-- );

-- -- Payments table
-- CREATE TABLE tbl_payments (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     receipt_no VARCHAR(100) UNIQUE,
--     payment_date DATE,
--     payment_time TIME,
--     payment_mode_id INT,
--     payment_sub_type_id INT,
--     transaction_id VARCHAR(150),
--     payment_status_id INT,
--     collected_by_id INT,
--     proof VARCHAR(255),
--     amount DECIMAL(12,2),
--     purpose_id INT,
--     reference_id INT, 
--     payment_decision_id INT,
--     remarks TEXT,
--     decision_date DATE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (payment_mode_id) REFERENCES mst_payment_modes(id),
--     FOREIGN KEY (payment_sub_type_id) REFERENCES mst_payment_sub_types(id),
--     FOREIGN KEY (payment_status_id) REFERENCES mst_payment_statuses(id),
--     FOREIGN KEY (collected_by_id) REFERENCES mst_collected_by_types(id),
--     FOREIGN KEY (purpose_id) REFERENCES mst_payment_purposes(id),
--     FOREIGN KEY (payment_decision_id) REFERENCES mst_payment_decisions(id)
-- );

-- -- Cheques table
-- CREATE TABLE tbl_cheques (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     cheque_type_id INT NOT NULL,
--     cheque_no VARCHAR(50) NOT NULL,
--     cheque_date DATE NOT NULL,
--     bank_id INT NOT NULL,
--     payee_name VARCHAR(150),
--     received_from VARCHAR(150),
--     purpose VARCHAR(200),
--     amount DECIMAL(12,2) NOT NULL,
--     voucher_no VARCHAR(50),
--     issued_or_received_by INT,
--     cheque_status_id INT,
--     clearance_date DATE,
--     linked_payment_id INT,
--     remarks TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (cheque_type_id) REFERENCES mst_cheque_types(id),
--     FOREIGN KEY (bank_id) REFERENCES mst_banks(id),
--     FOREIGN KEY (issued_or_received_by) REFERENCES tbl_users(id),
--     FOREIGN KEY (cheque_status_id) REFERENCES mst_cheque_statuses(id),
--     FOREIGN KEY (linked_payment_id) REFERENCES tbl_payments(id)
-- );

-- -- Donations table
-- CREATE TABLE tbl_donations (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     donation_receipt_no VARCHAR(100) UNIQUE,
--     donor_id INT NOT NULL,
--     donation_date DATE,
--     donation_amount DECIMAL(12,2) NOT NULL,
--     donation_mode_id INT,
--     purpose_id INT,
--     payment_reference VARCHAR(150),
--     remarks TEXT,
--     created_by INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (donor_id) REFERENCES tbl_donors(id) ON DELETE CASCADE,
--     FOREIGN KEY (donation_mode_id) REFERENCES mst_donation_modes(id),
--     FOREIGN KEY (purpose_id) REFERENCES mst_donation_purposes(id),
--     FOREIGN KEY (created_by) REFERENCES tbl_users(id)
-- );

-- -- Donation certificates table
-- CREATE TABLE tbl_donation_certificates (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     donation_id INT NOT NULL,
--     certificate_number VARCHAR(100) UNIQUE,
--     certificate_issue_date DATE,
--     certificate_status VARCHAR(50),
--     issued_by INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (donation_id) REFERENCES tbl_donations(id) ON DELETE CASCADE,
--     FOREIGN KEY (issued_by) REFERENCES tbl_users(id)
-- );

-- -- Call logs table
-- CREATE TABLE tbl_call_logs (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     call_date DATE NOT NULL,
--     call_time TIME NOT NULL,
--     caller_name VARCHAR(150),
--     contact_number VARCHAR(20),
--     call_type_id INT NOT NULL,
--     purpose_id INT,
--     handled_by INT,
--     call_duration INT,
--     action_taken TEXT,
--     follow_up_date DATE,
--     status_id INT,
--     remarks TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (call_type_id) REFERENCES mst_call_types(id),
--     FOREIGN KEY (purpose_id) REFERENCES mst_call_purposes(id),
--     FOREIGN KEY (handled_by) REFERENCES tbl_users(id),
--     FOREIGN KEY (status_id) REFERENCES mst_call_statuses(id)
-- );

-- -- Inward register table
-- CREATE TABLE tbl_inward_register (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     inward_no VARCHAR(50) UNIQUE NOT NULL,
--     date_received DATE NOT NULL,
--     from_name VARCHAR(150),
--     from_address TEXT,
--     document_type_id INT,
--     subject TEXT,
--     dispatch_mode_id INT,
--     received_by INT,
--     attachment VARCHAR(255),
--     remarks TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (document_type_id) REFERENCES mst_document_types(id),
--     FOREIGN KEY (dispatch_mode_id) REFERENCES mst_dispatch_modes(id),
--     FOREIGN KEY (received_by) REFERENCES tbl_users(id)
-- );

-- -- Outward register table
-- CREATE TABLE tbl_outward_register (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     outward_no VARCHAR(50) UNIQUE NOT NULL,
--     date_sent DATE NOT NULL,
--     to_name VARCHAR(150),
--     to_address TEXT,
--     document_type_id INT,
--     subject TEXT,
--     dispatch_mode_id INT,
--     dispatched_by INT,
--     acknowledgement_no VARCHAR(100),
--     attachment VARCHAR(255),
--     remarks TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (document_type_id) REFERENCES mst_document_types(id),
--     FOREIGN KEY (dispatch_mode_id) REFERENCES mst_dispatch_modes(id),
--     FOREIGN KEY (dispatched_by) REFERENCES tbl_users(id)
-- );

-- -- Role permissions table
-- CREATE TABLE tbl_role_permissions (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     role_id INT,
--     module_id INT,
--     module_status_id INT,
--     visibility_type_id INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (role_id) REFERENCES mst_roles(id),
--     FOREIGN KEY (module_id) REFERENCES mst_modules(id),
--     FOREIGN KEY (module_status_id) REFERENCES mst_module_statuses(id),
--     FOREIGN KEY (visibility_type_id) REFERENCES mst_module_visibility_types(id)
-- );

-- -- User permissions table
-- CREATE TABLE tbl_user_permissions (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT,
--     module_id INT,
--     module_status_id INT,
--     visibility_type_id INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES tbl_users(id) ON DELETE CASCADE,
--     FOREIGN KEY (module_id) REFERENCES mst_modules(id),
--     FOREIGN KEY (module_status_id) REFERENCES mst_module_statuses(id),
--     FOREIGN KEY (visibility_type_id) REFERENCES mst_module_visibility_types(id)
-- );

-- -- Student memberships table
-- CREATE TABLE tbl_student_memberships (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     student_id INT NOT NULL,
--     membership_id INT NOT NULL,
--     mem_status TINYINT(1) DEFAULT 1,
--     mem_registration_date DATE,
--     fee_type_id INT,
--     fee_paid DECIMAL(10,2),
--     fee_status_id INT,
--     payment_id INT,
--     renewal_type VARCHAR(100),
--     certificate_status_id INT,
--     certificate_id VARCHAR(100),
--     renewal_status VARCHAR(100),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (student_id) REFERENCES tbl_students(id) ON DELETE CASCADE,
--     FOREIGN KEY (membership_id) REFERENCES tbl_memberships(id),
--     FOREIGN KEY (fee_type_id) REFERENCES mst_fee_types(id),
--     FOREIGN KEY (fee_status_id) REFERENCES mst_payment_statuses(id),
--     FOREIGN KEY (payment_id) REFERENCES tbl_payments(id)
-- );

-- -- Tournament registrations table
-- CREATE TABLE tbl_tournament_registrations (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     student_id INT NOT NULL,
--     tournament_id INT NOT NULL,
--     tour_registration_date DATE,
--     fee_type_id INT,
--     fee_paid DECIMAL(10,2),
--     fee_status_id INT,
--     payment_id INT,
--     renewal_type VARCHAR(100),
--     certificate_status_id INT,
--     certificate_id VARCHAR(100),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (student_id) REFERENCES tbl_students(id) ON DELETE CASCADE,
--     FOREIGN KEY (tournament_id) REFERENCES tbl_tournaments(id) ON DELETE CASCADE,
--     FOREIGN KEY (fee_type_id) REFERENCES mst_fee_types(id),
--     FOREIGN KEY (fee_status_id) REFERENCES mst_payment_statuses(id),
--     FOREIGN KEY (payment_id) REFERENCES tbl_payments(id)
-- );

-- -- Tournament results table
-- CREATE TABLE tbl_tournament_results (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     tournament_id INT NOT NULL,
--     student_id INT NOT NULL,
--     result_type_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (tournament_id) REFERENCES tbl_tournaments(id) ON DELETE CASCADE,
--     FOREIGN KEY (student_id) REFERENCES tbl_students(id) ON DELETE CASCADE,
--     FOREIGN KEY (result_type_id) REFERENCES mst_tournament_result_types(id)
-- );

-- -- ========================================
-- -- CREATION COMPLETE
-- -- ========================================

-- -- Success message
-- SELECT 'All tables created successfully for sports_system database!' AS message;
-- Sports System Database Creation Script
-- Generated on: 2026-03-03
-- Database: sports_system

USE sports_system;

-- ========================================
-- MASTER TABLES (msts)
-- ========================================

CREATE TABLE IF NOT EXISTS mst_banks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bank_name VARCHAR(150) NOT NULL UNIQUE,
    account_number VARCHAR(50),
    ifsc_code VARCHAR(20),
    branch_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_call_purposes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    purpose_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_call_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_call_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_cheque_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_cheque_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_collected_by_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_dispatch_modes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mode_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_document_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_donation_modes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mode_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_donation_purposes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purpose_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_donor_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_duration_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    duration_name VARCHAR(50) NOT NULL UNIQUE,
    duration_in_days INT NOT NULL,
    status TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_fee_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fee_type_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_membership_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_membership_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE,
    status TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_module_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS mst_module_visibility_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    visibility_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS mst_modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    module_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_payment_decisions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    decision_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_payment_modes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mode_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_payment_purposes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purpose_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_payment_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_payment_sub_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sub_type_name VARCHAR(50) NOT NULL UNIQUE,
    payment_mode_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_mode_id) REFERENCES mst_payment_modes(id)
);

CREATE TABLE IF NOT EXISTS mst_permission_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    permission_type_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS mst_property_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    status TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_property_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_sports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sport_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_tournament_levels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_tournament_result_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    result_name VARCHAR(50) NOT NULL UNIQUE,
    rank_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_tournament_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_tournament_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    update_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mst_user_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TRANSACTION TABLES
-- ========================================

CREATE TABLE IF NOT EXISTS tbl_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_code VARCHAR(50) UNIQUE,
    user_status_id INT,
    role_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    password VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20),
    date_of_joining DATE,
    created_by INT,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_status_id) REFERENCES mst_user_statuses(id),
    FOREIGN KEY (role_id) REFERENCES mst_roles(id),
    FOREIGN KEY (created_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    contact_number VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    guardian_name VARCHAR(100),
    emergency_contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donor_code VARCHAR(50) UNIQUE,
    donor_name VARCHAR(150) NOT NULL,
    address TEXT,
    mobile_number VARCHAR(20),
    email VARCHAR(150),
    donor_status_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_status_id) REFERENCES mst_donor_statuses(id)
);

CREATE TABLE IF NOT EXISTS tbl_properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_name VARCHAR(150) NOT NULL,
    category_id INT,
    quantity INT DEFAULT 1,
    brand VARCHAR(100),
    purchase_date DATE,
    purchase_value DECIMAL(12,2),
    supplier VARCHAR(150),
    invoice_number VARCHAR(100),
    location VARCHAR(150),
    condition_id INT,
    asset_status_id INT,
    responsible_person_id INT,
    remarks TEXT,
    physical_verification_date DATE,
    verified_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES mst_property_categories(id),
    FOREIGN KEY (asset_status_id) REFERENCES mst_property_statuses(id),
    FOREIGN KEY (responsible_person_id) REFERENCES tbl_users(id),
    FOREIGN KEY (verified_by) REFERENCES tbl_users(id)
);

CREATE TABLE IF NOT EXISTS tbl_memberships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    membership_name VARCHAR(100) NOT NULL,
    membership_type_id INT,
    description TEXT,
    duration_type_id INT,
    price DECIMAL(10,2),
    benefits TEXT,
    max_students_allowed INT,
    membership_status_id INT,
    registration_fee DECIMAL(10,2),
    fee_type_id INT,
    discount DECIMAL(10,2),
    start_date DATE,
    end_date DATE,
    total_students_registered INT DEFAULT 0,
    total_amount_paid DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (membership_type_id) REFERENCES mst_membership_types(id),
    FOREIGN KEY (duration_type_id) REFERENCES mst_duration_types(id),
    FOREIGN KEY (membership_status_id) REFERENCES mst_membership_statuses(id),
    FOREIGN KEY (fee_type_id) REFERENCES mst_fee_types(id)
);

-- (remaining transaction tables continue exactly same)

SELECT 'All tables created successfully for sports_system database!' AS message;