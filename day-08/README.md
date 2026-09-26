# Day 8 - SQL and Laravel Employee Management API

## Objective

This project was designed to complete the Day 8 internship task by building a real employee management system using SQL, MariaDB, and Laravel. The goal was to create a working database schema, seed employee data, build a REST API, validate requests, apply middleware for API-key protection, and test the application against a real database.

## What I Learned

- SQL for creating tables, inserting records, filtering, grouping, joining, updating, deleting, and aggregating data
- How to design a one-to-many relationship between departments and employees
- How to use Laravel migrations, seeders, models, controllers, and routes
- How Eloquent ORM maps database records to PHP objects
- How to validate request data and secure write routes with middleware
- How to verify application behavior with Laravel tests and live HTTP requests

## 1. SQL

The SQL learning section in the `sql/` folder covers the core database operations used in this project.

- `CREATE DATABASE` and `USE` statements
- `CREATE TABLE` for departments and employees
- `INSERT` for sample department and employee data
- `SELECT` queries with chosen columns
- `WHERE`, `AND`, `OR`, and `LIKE` filtering
- `GROUP BY`, `COUNT`, `AVG`, `SUM`, `MIN`, and `MAX`
- `HAVING` for filtering grouped results
- `JOIN` queries, including inner and left joins
- `UPDATE` and `DELETE` operations
- Aggregate functions and subqueries

## 2. Database Design

The design uses a one-to-many relationship:

```text
departments
    |
    | 1
    | many
    v
employees
```

The `departments` table stores department names, while the `employees` table stores an employee record with a `department_id` foreign key linked to `departments.id`.

## 3. Laravel

The Laravel project is located in `day-08/laravel-api` and contains the standard structure required for a real Laravel app, including:

- `app/Models` for model definitions
- `app/Http/Controllers` for API logic
- `app/Http/Middleware` for API-key enforcement
- `database/migrations` for schema setup
- `database/seeders` for sample data
- `routes/api.php` for REST endpoints
- `tests/Feature` for API tests

## 4. Employee API

The API exposes the following routes:

| Method | Endpoint                    | Purpose           |
| ------ | --------------------------- | ----------------- |
| GET    | `/api/employees`            | List employees    |
| GET    | `/api/employees/{employee}` | Show one employee |
| POST   | `/api/employees`            | Create employee   |
| PUT    | `/api/employees/{employee}` | Update employee   |
| DELETE | `/api/employees/{employee}` | Delete employee   |

The list endpoint supports search and department filtering using query parameters such as `search=Alice` and `department=Engineering`.

## 5. Validation

Employee data is validated before records are saved.

Required rules include:

- `name` required string
- `email` required valid email and unique per employee
- `department_id` required and must exist in `departments`
- `position` required string
- `salary` required numeric and non-negative
- `location` required string

## 6. Authentication / API Key

Write operations are protected with the demo API key header:

```http
X-API-Key: day8-demo-key
```

This is enforced in `ApiKeyMiddleware` for `POST`, `PUT`, and `DELETE` routes.

## 7. Database Configuration

The project is configured for XAMPP MariaDB and uses the database name `employee_management`.

Environment settings:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=employee_management
DB_USERNAME=root
DB_PASSWORD=
```

## 8. How to Run

From the project root:

```powershell
cd day-08\laravel-api
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Then open:

```text
http://127.0.0.1:8000/api/employees
```

## 9. Testing

The project was verified with real commands. The passing test command was:

```powershell
cd day-08\laravel-api
php artisan test
```

Actual result:

- 5 tests passed
- 8 assertions
- exit code 0

## 10. Problems Faced

The main problems encountered were:

- Missing real Laravel structure inside the Day 8 folder at the start
- Wrong project path confusion during setup
- MariaDB server not running initially
- Laravel app not yet connected to the employee_management database
- Missing API routes and employee model/controller integration before the app was customized

Each issue was solved by checking the actual filesystem state, starting the MariaDB service, creating the proper Laravel app in the correct project folder, and rerunning the exact failing commands until they passed.

## 11. Final Status

Completed and verified.

The Day 8 project was built as a real Laravel application with a live MariaDB database, working CRUD API, middleware protection, migrations, seeders, queries, and feature tests. The environment and application were validated with real commands and outputs.
