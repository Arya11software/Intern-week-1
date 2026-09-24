# Employee Management Dashboard

A full-stack Employee Management Dashboard built using **HTML, CSS, JavaScript, Node.js, Express.js, and SQLite**.

This project was developed as part of **Intern Week 1 – Day 5** and extends the Employee Management System developed during Day 2.

## Features

- View all employees
- Search employees by name
- Filter employees by department
- Sort employees by:
  - Name
  - Salary (Low to High)
  - Salary (High to Low)
- View employee details
- Add new employees
- Edit existing employees
- Delete employees
- Persistent employee data using SQLite
- REST API for employee operations
- Responsive dashboard interface

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend

- Node.js
- Express.js
- better-sqlite3
- dotenv
- CORS

### Database

- SQLite

## Project Structure

```text
day-05/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── employees.db
│   └── .env
│
└── employee-dashboard/
    ├── index.html
    ├── app.js
    └── style.css

## Installation
1. Clone the repository
git clone <YOUR_REPOSITORY_URL>
2. Navigate to the backend
cd day-05/backend
3. Install dependencies
npm install
4. Start the backend
node server.js

## The backend will start at:

http://localhost:5000
Running the Frontend

Open a second terminal.

Navigate to the frontend directory:

cd day-05/employee-dashboard

Start the frontend server:

python -m http.server 5500

Open the dashboard:

http://localhost:5500

## Application Flow
User
  │
  ▼
Employee Dashboard
  │
  ├── Search
  ├── Filter
  ├── Sort
  ├── Add
  ├── Edit
  ├── Delete
  └── View Details
  │
  ▼
JavaScript Fetch API
  │
  ▼
Express.js REST API
  │
  ▼
SQLite Database
  │
  ▼
Employee Data
API Flow
Frontend
   │
   │ HTTP Request
   ▼
Express.js Server
   │
   ▼
SQLite Database
   │
   │ JSON Response
   ▼
Frontend Dashboard
Running the Project

Two terminals are required.

Terminal 1 – Backend
cd day-05/backend
node server.js
Terminal 2 – Frontend
cd day-05/employee-dashboard
python -m http.server 5500

Then open:

http://localhost:5500
Learning Outcomes

Through this assignment, the following concepts were practiced:

Building a web dashboard
JavaScript DOM manipulation
Working with REST APIs
HTTP GET, POST, PUT and DELETE requests
Connecting frontend and backend
Express.js server development
SQLite database operations
CRUD operations
JSON data handling
Search, filtering and sorting
Running frontend and backend services locally
Future Improvements

Possible future improvements include:

Employee authentication
Role-based access
Pagination
Advanced employee search
Form-based employee creation
Data validation
Salary statistics and charts
Responsive mobile layout
Deployment to a cloud platform
```
