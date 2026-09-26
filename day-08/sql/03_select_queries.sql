USE employee_management;

-- Show all employees with department name
SELECT e.id, e.name, d.name AS department, e.position, e.salary, e.location
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
ORDER BY e.id;

-- Show all departments
SELECT * FROM departments;

-- Show only employees from Engineering
SELECT * FROM employees WHERE department_id = 1;
