USE employee_management;

-- WHERE and ORDER BY
SELECT *
FROM employees
WHERE salary > 70000
ORDER BY salary DESC;

-- ORDER BY name alphabetically
SELECT *
FROM employees
ORDER BY name ASC;

-- Employees in Bengaluru or Pune
SELECT *
FROM employees
WHERE location IN ('Bengaluru', 'Pune');
