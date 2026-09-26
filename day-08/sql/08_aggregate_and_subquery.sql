USE employee_management;

-- Aggregate functions
SELECT COUNT(*) AS total_employees,
       MIN(salary) AS minimum_salary,
       MAX(salary) AS maximum_salary,
       AVG(salary) AS average_salary,
       SUM(salary) AS total_salary
FROM employees;

-- Subquery: employees earning above average salary
SELECT name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
)
ORDER BY salary DESC;
