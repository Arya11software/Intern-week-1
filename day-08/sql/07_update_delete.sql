USE employee_management;

-- Update an employee's salary and location
UPDATE employees
SET salary = 95000.00, location = 'Bengaluru'
WHERE name = 'Vikram Das';

-- Delete a test employee
DELETE FROM employees
WHERE email = 'sara.khan@example.com';

SELECT * FROM employees ORDER BY id;
