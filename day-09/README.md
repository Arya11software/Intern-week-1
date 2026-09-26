# Day 9 — Employee Management REST API

## 1. Objective

This project demonstrates a complete backend API workflow for an employee management system. It covers REST API design, validation, database interaction, authentication with an API key, CRUD operations, error handling, automated testing, and API documentation.

## 2. Technologies

- PHP
- Laravel 12
- MariaDB/MySQL
- Eloquent ORM
- PHPUnit
- PowerShell-friendly commands

## 3. Project Architecture

The project is split into:

- `day-09/laravel-api` — Laravel backend application
- `day-09/api-tests` — example API requests and responses
- `day-09/README.md` — overview and setup guide

## 4. Features

- Employee creation
- Employee listing
- Employee details
- Employee update
- Employee deletion
- Search by name/email
- Department filtering
- Sorting by column
- Pagination
- Validation errors with HTTP 422
- API key protection for mutating routes
- Consistent JSON responses
- Error handling for missing records and server issues

## 5. Database Structure

Database: `employee_management_day9`

### departments

- id
- name
- description
- created_at
- updated_at

### employees

- id
- department_id
- name
- email
- position
- salary
- location
- created_at
- updated_at

Relationship:

- One department has many employees
- Many employees belong to one department

## 6. API Endpoints

Base URL: `/api`

### Employees

- GET `/api/employees`
- GET `/api/employees/{id}`
- POST `/api/employees`
- PUT `/api/employees/{id}`
- DELETE `/api/employees/{id}`

### Departments

- GET `/api/departments`
- GET `/api/departments/{id}`

### Example query parameters

- `search=alice`
- `department=Engineering`
- `sort=salary&direction=desc`
- `page=1&per_page=10`

## 7. Authentication

Mutating endpoints require the following header:

```http
X-API-Key: day9-demo-key
```

The key is stored in `.env` as:

```env
DAY9_API_KEY=day9-demo-key
```

## 8. Validation

The API validates employee inputs such as:

- name
- email
- department_id
- position
- salary
- location

Invalid data returns HTTP 422 with structured errors.

## 9. Error Handling

- 401 for unauthorized mutations
- 404 if an employee or department does not exist
- 422 for validation problems
- 500 for unexpected server errors

## 10. Testing

Automated tests cover:

- GET employees
- GET single employee
- POST employee
- PUT employee
- DELETE employee
- Search
- Department filtering
- Pagination
- Validation errors
- Unauthorized requests
- Not found routes

## 11. How to Install

Open PowerShell and run:

```powershell
cd C:\Users\HP\Desktop\Intern-week-1\day-09\laravel-api
composer install
Copy-Item .env.example .env
php artisan key:generate
```

## 12. How to Configure .env

Update the database and API key values in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=employee_management_day9
DB_USERNAME=root
DB_PASSWORD=
DAY9_API_KEY=day9-demo-key
```

## 13. How to Create the Database

```powershell
& "C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS employee_management_day9;"
```

## 14. How to Run Migrations

```powershell
cd C:\Users\HP\Desktop\Intern-week-1\day-09\laravel-api
php artisan migrate
```

## 15. How to Seed Data

```powershell
php artisan db:seed
```

## 16. How to Start Laravel

```powershell
php artisan serve --host=127.0.0.1 --port=8000
```

## 17. How to Run Tests

```powershell
php artisan test
```

## 18. How to Manually Test the API

Use PowerShell `Invoke-RestMethod` examples:

```powershell
Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:8000/api/employees"

Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:8000/api/employees/1"

Invoke-RestMethod `
  -Method Post `
  -Uri "http://127.0.0.1:8000/api/employees" `
  -Headers @{ "X-API-Key" = "day9-demo-key" } `
  -ContentType "application/json" `
  -Body '{
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "department_id": 1,
    "position": "Software Engineer",
    "salary": 55000,
    "location": "Nagpur"
  }'
```

## 19. Example API Requests

This project includes sample API requests in the `api-tests` folder.

## 20. Expected Results

- 200 for successful GET requests
- 201 for successful POST requests
- 200 or 204 for DELETE requests
- 401 for invalid or missing API keys
- 404 for missing resources
- 422 for invalid input

## 21. Security Considerations

- Keep the API key in `.env` only
- Do not expose stack traces
- Protect write routes with middleware
- Validate all request input

## 22. Learning Outcomes

This project shows how to:

- build a full Laravel API
- connect to a database
- validate user input
- secure API routes
- test request flows
- write clear project documentation
