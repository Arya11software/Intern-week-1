USE employee_management;

INSERT INTO departments (name) VALUES
    ('Engineering'),
    ('HR'),
    ('Finance'),
    ('Marketing'),
    ('Sales');

INSERT INTO employees (name, email, department_id, position, salary, location) VALUES
    ('Rahul Sharma', 'rahul.sharma@example.com', 1, 'Software Engineer', 85000.00, 'Bengaluru'),
    ('Priya Nair', 'priya.nair@example.com', 2, 'HR Manager', 65000.00, 'Delhi'),
    ('Amit Verma', 'amit.verma@example.com', 3, 'Financial Analyst', 72000.00, 'Mumbai'),
    ('Neha Patel', 'neha.patel@example.com', 1, 'Frontend Developer', 78000.00, 'Pune'),
    ('Karan Singh', 'karan.singh@example.com', 5, 'Sales Executive', 60000.00, 'Hyderabad'),
    ('Meena Iyer', 'meena.iyer@example.com', 4, 'Marketing Specialist', 68000.00, 'Chennai'),
    ('Vikram Das', 'vikram.das@example.com', 1, 'Backend Developer', 90000.00, 'Kolkata'),
    ('Sara Khan', 'sara.khan@example.com', 2, 'Recruitment Specialist', 56000.00, 'Lucknow');
