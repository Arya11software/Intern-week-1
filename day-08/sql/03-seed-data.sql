USE smart_facility_management;

INSERT INTO users (id, name, email, password, role) VALUES
    (1, 'Asha Kulkarni', 'asha.admin@example.test', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'admin'),
    (2, 'Rahul Deshmukh', 'rahul.inspector@example.test', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'inspector'),
    (3, 'Meera Joshi', 'meera.employee@example.test', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'employee');

INSERT INTO departments (id, name, description) VALUES
    (1, 'Operations', 'Facility operations and service delivery.'),
    (2, 'Environmental Health', 'Sanitation, hygiene, and public health inspections.'),
    (3, 'Maintenance', 'Building systems, repairs, and preventive maintenance.');

INSERT INTO facilities (id, name, location, facility_type, status) VALUES
    (1, 'Central City Hospital', 'Nagpur', 'Hospital', 'Needs Attention'),
    (2, 'Sitabuldi Public School', 'Nagpur', 'School', 'Good'),
    (3, 'Mahal Community Centre', 'Nagpur', 'Community Center', 'Critical'),
    (4, 'Dharampeth Public Toilet', 'Nagpur', 'Public Toilet', 'Needs Attention'),
    (5, 'Civil Lines Municipal Office', 'Nagpur', 'Office', 'Good');

INSERT INTO employees (id, department_id, user_id, name, salary, designation) VALUES
    (1, 1, 3, 'Meera Joshi', 54000.00, 'Facilities Coordinator'),
    (2, 1, NULL, 'Arjun Patil', 62000.00, 'Operations Supervisor'),
    (3, 2, 2, 'Rahul Deshmukh', 58000.00, 'Environmental Inspector'),
    (4, 2, NULL, 'Nisha Wankhede', 51000.00, 'Hygiene Officer'),
    (5, 3, NULL, 'Vikram Rao', 67000.00, 'Maintenance Engineer'),
    (6, 3, NULL, 'Farah Khan', 49000.00, 'Maintenance Technician');

INSERT INTO inspections
    (id, facility_id, inspector_id, inspection_date, cleanliness_score, odor_score, waste_level, water_availability, remarks)
VALUES
    (1, 1, 2, '2026-09-02', 72, 28, 35, TRUE, 'Ward corridors clean; one handwashing station needs repair.'),
    (2, 2, 2, '2026-09-03', 91, 12, 18, TRUE, 'Classrooms and washrooms are well maintained.'),
    (3, 3, 2, '2026-09-05', 38, 76, 84, FALSE, 'Overflowing bins and no water in the east washroom.'),
    (4, 4, 2, '2026-09-07', 54, 62, 71, TRUE, 'Cleaning is overdue; waste collection required.'),
    (5, 1, 2, '2026-09-12', 78, 24, 30, TRUE, 'Previous maintenance issue has been partly resolved.'),
    (6, 5, 2, '2026-09-14', 88, 16, 20, TRUE, 'Reception and shared facilities are in good condition.'),
    (7, 3, 2, '2026-09-18', 42, 70, 79, FALSE, 'Follow-up required for water supply and waste removal.'),
    (8, 4, 2, '2026-09-20', 61, 48, 59, TRUE, 'Cleaning improved; continue daily checks.');

INSERT INTO complaints (id, facility_id, user_id, title, description, status, priority) VALUES
    (1, 1, 3, 'Broken handwashing tap', 'The tap beside the outpatient waiting area is leaking.', 'In Progress', 'High'),
    (2, 3, 3, 'Waste bins overflowing', 'The bins near the east entrance have not been collected.', 'Open', 'Critical'),
    (3, 4, 3, 'Strong odor in washroom', 'An unpleasant odor is present in the accessible washroom.', 'Open', 'High'),
    (4, 2, 3, 'Soap dispenser empty', 'The dispenser in the ground-floor washroom needs refilling.', 'Resolved', 'Low'),
    (5, 5, 3, 'Loose corridor light fitting', 'A light fitting in the second-floor corridor is loose.', 'In Progress', 'Medium');