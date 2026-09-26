USE smart_facility_management;

-- 1. Employees and their departments.
SELECT d.name AS department, e.name AS employee, e.designation, e.salary
FROM departments AS d
JOIN employees AS e ON e.department_id = d.id
ORDER BY d.name, e.name;

-- 2. Overall and per-department average salary.
SELECT AVG(salary) AS average_salary FROM employees;

SELECT d.name AS department, AVG(e.salary) AS average_salary
FROM departments AS d
JOIN employees AS e ON e.department_id = d.id
GROUP BY d.id, d.name
ORDER BY d.name;

-- 3. Highest paid employee: ordered result and equivalent maximum subquery.
SELECT id, name, designation, salary
FROM employees
ORDER BY salary DESC, id ASC
LIMIT 1;

SELECT id, name, designation, salary
FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees)
ORDER BY id;

-- 4. Facilities with at least one poor hygiene indicator.
-- Here a high odor_score means a stronger odor, and high waste_level means more waste.
SELECT f.id, f.name, i.inspection_date, i.cleanliness_score, i.odor_score, i.waste_level
FROM facilities AS f
JOIN inspections AS i ON i.facility_id = f.id
WHERE i.cleanliness_score < 50 OR i.odor_score >= 60 OR i.waste_level >= 70
ORDER BY i.inspection_date DESC;

-- 5. Complaint counts per facility and per status.
SELECT f.name AS facility, COUNT(c.id) AS complaint_count
FROM facilities AS f
LEFT JOIN complaints AS c ON c.facility_id = f.id
GROUP BY f.id, f.name
ORDER BY complaint_count DESC, f.name;

SELECT status, COUNT(*) AS complaint_count
FROM complaints
GROUP BY status
ORDER BY status;

-- 6. Full inspection history, including facility and inspector names.
SELECT f.name AS facility, i.inspection_date, u.name AS inspector,
       i.cleanliness_score, i.odor_score, i.waste_level, i.remarks
FROM inspections AS i
JOIN facilities AS f ON f.id = i.facility_id
JOIN users AS u ON u.id = i.inspector_id
ORDER BY i.inspection_date DESC, f.name;

-- 7. Departments whose average salary exceeds the chosen threshold.
SELECT d.name AS department, AVG(e.salary) AS average_salary
FROM departments AS d
JOIN employees AS e ON e.department_id = d.id
GROUP BY d.id, d.name
HAVING AVG(e.salary) > 55000.00
ORDER BY average_salary DESC;

-- 8. Employees earning more than the company-wide average.
SELECT id, name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;

-- 9. Search indexes are created in 02-create-tables.sql:
-- employees.department_id supports department joins and employee lookups.
-- employees.salary supports salary ordering/range filters and salary reports.
-- inspections.facility_id supports facility history joins and lookups.
-- inspections.inspection_date supports date ranges and newest-first history.
-- complaints.facility_id supports facility complaint counts and lookups.
-- complaints.status supports status filters and grouped status reporting.
-- The facilities status/type indexes support their API filters.
-- Verify indexes (run separately in MySQL): SHOW INDEX FROM employees; and likewise
-- for inspections, complaints, and facilities.

-- 10. Atomic operation: record a complaint and flag its facility in one unit.
START TRANSACTION;
INSERT INTO complaints (facility_id, user_id, title, description, status, priority)
VALUES (1, 3, 'Transaction example', 'Demonstration maintenance request.', 'Open', 'Low');
UPDATE facilities SET status = 'Needs Attention' WHERE id = 1;
-- Commit only after both statements have succeeded and affected rows are checked.
COMMIT;

-- Rollback demonstration: this temporary row is deliberately not persisted.
START TRANSACTION;
INSERT INTO complaints (facility_id, user_id, title, description, status, priority)
VALUES (2, 3, 'Rollback example', 'This row is removed by the next statement.', 'Open', 'Low');
ROLLBACK;
-- If any statement in the operation fails, issue ROLLBACK instead of COMMIT.