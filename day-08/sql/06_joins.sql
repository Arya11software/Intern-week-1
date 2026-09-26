USE employee_management;

-- INNER JOIN example
SELECT e.name, e.position, d.name AS department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
ORDER BY e.name;

-- LEFT JOIN example to show all departments and employee counts
SELECT d.name AS department_name, e.name AS employee_name
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
ORDER BY d.name, e.name;
