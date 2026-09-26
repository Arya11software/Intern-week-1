# Day 8 Employee Management API

This Laravel application is the practical backend for the Day 8 employee-management assignment. It uses MariaDB as the database engine, Eloquent models for employees and departments, and a REST-style API for CRUD operations.

## Features

- Department and employee relationship using Eloquent
- Employee CRUD endpoints with validation
- Search and department filters on the employee list
- API key protection for write operations
- Database seeders for sample employee records

## API endpoints

- `GET /api/employees`
- `GET /api/employees/{employee}`
- `POST /api/employees` with header `X-API-Key: day8-demo-key`
- `PUT /api/employees/{employee}` with header `X-API-Key: day8-demo-key`
- `DELETE /api/employees/{employee}` with header `X-API-Key: day8-demo-key`

## Local setup

1. Copy the example environment file:
   `cp .env.example .env`
2. Update the MariaDB credentials for your local machine.
3. Create the database:
   `CREATE DATABASE employee_management;`
4. Run migrations and seed data:
   `php artisan migrate --seed`
5. Start the app:
   `php artisan serve`

## Example request

```bash
curl -H "X-API-Key: day8-demo-key" \
  -H "Content-Type: application/json" \
  -d '{
    "department_id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "position": "Accountant",
    "salary": 75000,
    "location": "Kampala"
  }' \
  http://localhost:8000/api/employees
```

## Notes

The project lives inside the Day 8 folder as `day-08/laravel-api` and is intentionally separate from the earlier training days.
