USE smart_facility_management;

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'inspector', 'employee') NOT NULL DEFAULT 'employee',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE departments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE facilities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    location VARCHAR(255) NOT NULL,
    facility_type VARCHAR(80) NOT NULL,
    status ENUM('Good', 'Needs Attention', 'Critical') NOT NULL DEFAULT 'Good',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX facilities_status_index (status),
    INDEX facilities_type_index (facility_type)
) ENGINE=InnoDB;

CREATE TABLE employees (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    department_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    name VARCHAR(120) NOT NULL,
    salary DECIMAL(12, 2) UNSIGNED NOT NULL,
    designation VARCHAR(120) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX employees_department_id_index (department_id),
    INDEX employees_salary_index (salary),
    CONSTRAINT employees_department_id_foreign FOREIGN KEY (department_id)
        REFERENCES departments (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT employees_user_id_foreign FOREIGN KEY (user_id)
        REFERENCES users (id) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE inspections (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    facility_id BIGINT UNSIGNED NOT NULL,
    inspector_id BIGINT UNSIGNED NOT NULL,
    inspection_date DATE NOT NULL,
    cleanliness_score TINYINT UNSIGNED NOT NULL,
    odor_score TINYINT UNSIGNED NOT NULL,
    waste_level TINYINT UNSIGNED NOT NULL,
    water_availability BOOLEAN NOT NULL,
    remarks TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX inspections_facility_id_index (facility_id),
    INDEX inspections_inspection_date_index (inspection_date),
    CONSTRAINT inspections_cleanliness_score_check CHECK (cleanliness_score BETWEEN 0 AND 100),
    CONSTRAINT inspections_odor_score_check CHECK (odor_score BETWEEN 0 AND 100),
    CONSTRAINT inspections_waste_level_check CHECK (waste_level BETWEEN 0 AND 100),
    CONSTRAINT inspections_facility_id_foreign FOREIGN KEY (facility_id)
        REFERENCES facilities (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT inspections_inspector_id_foreign FOREIGN KEY (inspector_id)
        REFERENCES users (id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE complaints (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    facility_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Open', 'In Progress', 'Resolved') NOT NULL DEFAULT 'Open',
    priority ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL DEFAULT 'Medium',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX complaints_facility_id_index (facility_id),
    INDEX complaints_status_index (status),
    CONSTRAINT complaints_facility_id_foreign FOREIGN KEY (facility_id)
        REFERENCES facilities (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT complaints_user_id_foreign FOREIGN KEY (user_id)
        REFERENCES users (id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;