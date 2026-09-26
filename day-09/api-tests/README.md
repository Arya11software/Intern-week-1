# API Test Documentation

## Employee list

- Method: GET
- URL: http://127.0.0.1:8000/api/employees
- Purpose: View all employees
- Headers: none
- Query parameters: `search`, `department`, `sort`, `direction`, `page`, `per_page`
- Expected status: 200

Example:

```powershell
Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:8000/api/employees?search=alice&department=Engineering&sort=salary&direction=desc&page=1&per_page=10"
```

## Employee details

- Method: GET
- URL: http://127.0.0.1:8000/api/employees/1
- Purpose: View a single employee record
- Headers: none
- Expected status: 200

## Create employee

- Method: POST
- URL: http://127.0.0.1:8000/api/employees
- Purpose: Create a new employee record
- Headers:
  - `X-API-Key: day9-demo-key`
  - `Content-Type: application/json`
- Body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "department_id": 1,
  "position": "Software Engineer",
  "salary": 55000,
  "location": "Nagpur"
}
```

Expected status: 201

Example:

```powershell
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

## Update employee

- Method: PUT
- URL: http://127.0.0.1:8000/api/employees/1
- Purpose: Update an employee record
- Headers:
  - `X-API-Key: day9-demo-key`
  - `Content-Type: application/json`
- Expected status: 200

## Delete employee

- Method: DELETE
- URL: http://127.0.0.1:8000/api/employees/1
- Purpose: Delete an employee record
- Headers:
  - `X-API-Key: day9-demo-key`
- Expected status: 200 or 204

## Search employees

- Method: GET
- URL: http://127.0.0.1:8000/api/employees?search=alice
- Purpose: Search by name or email
- Expected status: 200

## Filter by department

- Method: GET
- URL: http://127.0.0.1:8000/api/employees?department=Engineering
- Purpose: Show employees in one department
- Expected status: 200

## Pagination

- Method: GET
- URL: http://127.0.0.1:8000/api/employees?page=1&per_page=10
- Purpose: Show paginated results
- Expected status: 200

## Unauthorized request

- Method: POST
- URL: http://127.0.0.1:8000/api/employees
- Purpose: Validate missing API key enforcement
- Expected status: 401

## Validation failure

- Method: POST
- URL: http://127.0.0.1:8000/api/employees
- Purpose: Invalid email or missing fields
- Expected status: 422
