# Employee Management System — Day 7

## Objective

Build on the employee dashboard from Days 5 and 6. The Next.js app uses the App Router for its pages and talks to a separate Express REST API. The API stores employee records in SQLite so changes remain after a backend restart.

## Technologies

Frontend:

- Next.js App Router
- React
- TypeScript
- HTML and CSS

Backend:

- Node.js and npm
- Express
- SQLite through Node's built-in `node:sqlite` module
- CORS and dotenv

## Features

- Employee list with ID, name, department, and salary
- Search by name
- Department filter
- Sort by name or salary in either direction
- Employee details at `/employees/[id]`
- Create at `/employees/create`, edit, and delete with confirmation
- Dashboard total, average salary, and department statistics
- Frontend and backend validation
- Loading, not-found, and API error states
- REST API backed by persistent SQLite records

## Architecture

```text
Next.js pages and components
        ↓ HTTP / REST
Express routes
        ↓
Controllers
        ↓
Services
        ↓
SQLite model
        ↓
employees.db
```

The frontend API calls are centralized in `nextjs-app/lib/api.ts`. SQL statements are kept in the backend model, not in Next.js components or route files.

## Project Structure

```text
day-07/
├── README.md
├── nextjs-app/
│   ├── app/
│   │   ├── employees/
│   │   │   ├── [id]/
│   │   │   ├── create/
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/api.ts
│   ├── types/employee.ts
│   ├── .env.example
│   ├── package.json
│   └── README.md
└── node-api/
    ├── database/employees.db  (created on first backend start; ignored by Git)
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── app.js
    │   └── server.js
    ├── .env.example
    ├── package.json
    └── README.md
```

The `components/` and backend architecture folders contain the individual files for their responsibilities. Each app has its own `.gitignore`; generated dependencies, Next build output, the local SQLite database, and local environment files are not meant to be committed.

## Installation

Open two PowerShell terminals from the internship project root.

Start the backend:

```powershell
cd day-07/node-api
npm install
npm run dev
```

Start the frontend in the second terminal:

```powershell
cd day-07/nextjs-app
npm install
npm run dev
```

Open `http://localhost:3000/employees`. Start the backend before loading the frontend because pages request live API data.

## Environment Variables

The backend `.env.example` documents:

```text
PORT=5000
DATABASE_PATH=./database/employees.db
FRONTEND_URL=http://localhost:3000
```

The local ignored `node-api/.env` uses those same development values. Relative database paths are resolved from the `node-api` folder.

The frontend `.env.example` contains:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The local ignored `nextjs-app/.env.local` uses that URL. `NEXT_PUBLIC_` values are visible to browser code and must not contain secrets.

## Database and Seed Data

The backend creates the `employees` table at startup. If the table is empty, it inserts Rahul (IT, 400000), Priya (HR, 300000), Amit (Finance, 350000), and Neha (IT, 450000). Existing records are not reseeded. CRUD changes are saved to `node-api/database/employees.db`.

This project uses Node 24's built-in SQLite module so it does not need an extra native SQLite package. Node currently prints an experimental-feature warning for `node:sqlite`; the API still uses a real SQLite file and SQL queries.

## API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint         | Result                                                                  |
| ------ | ---------------- | ----------------------------------------------------------------------- |
| GET    | `/employees`     | Returns the employee array.                                             |
| GET    | `/employees/:id` | Returns one record, or 404 when it does not exist.                      |
| POST   | `/employees`     | Creates a record and returns 201. Body: `name`, `department`, `salary`. |
| PUT    | `/employees/:id` | Updates all fields, or returns 404 when it does not exist.              |
| DELETE | `/employees/:id` | Deletes a record or returns 404.                                        |
| GET    | `/health`        | Returns `{ "status": "ok" }`.                                           |

For POST and PUT, name and department must be non-empty strings. Salary must be a JSON number greater than or equal to zero. Invalid data and IDs return JSON 400 errors; missing records return JSON 404 errors. Unexpected errors are handled centrally and do not include stack traces in the response.

## Authentication Basics

`node-api/src/middleware/authBasics.js` is a small API-key middleware example. It is intentionally not attached to the CRUD routes, so the local assessment flow needs no secret or extra setup. It is not a login system or production authentication. Real user authentication would need secure identity, protected credential storage, and authorization checks.

## Testing

The API was tested over HTTP for all CRUD operations, missing records, invalid IDs, missing fields, non-numeric and negative salaries, invalid JSON, unknown routes, and CORS preflight. The database was checked after an API restart; the test row remained, no seed rows were duplicated, and the database was returned to the four sample employees.

The Next.js app passed TypeScript, ESLint, and production build checks. The pages and browser interactions were tested in headless Edge, including search, department filtering, name and salary sorting, details, required-field and negative-salary validation, create, edit, delete confirmation, success/error messages, and updated statistics. A 390px viewport had no page-level horizontal overflow. The create form was also checked while the API was stopped and showed an API connection error.

## Day 7 Learning Outcomes

- Next.js App Router, layouts, pages, and dynamic routes
- Server components for loading data and client components for interactive controls
- Loading and error boundaries
- Environment variables and a centralized API client
- REST requests and responses
- Express routing, controllers, services, and models
- Middleware for validation, CORS, and error handling
- Parameterized SQLite queries and persistent data
- Basic API-key authentication concepts
