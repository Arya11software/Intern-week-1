USE employee_management;

-- Count employees in each department
SELECT d.name AS department, COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name
ORDER BY employee_count DESC;

-- Average salary by department
SELECT d.name AS department, ROUND(AVG(e.salary), 2) AS average_salary
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name;

-- Departments with more than 1 employee
SELECT d.name AS department, COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name
HAVING COUNT(e.id) > 1;
