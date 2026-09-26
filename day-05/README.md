# Day 5 - JavaScript

## Overview

Day 5 covers modern JavaScript, asynchronous programming, and working with JSON and web APIs. The practical assignment is a small employee dashboard built with browser features and no framework.

## What I Learned

- `let`, `const`, common data types, scope, and hoisting
- Function declarations, arrow functions, callbacks, and closures
- Arrays, objects, destructuring, spread, rest, and template literals
- Array methods: `map()`, `filter()`, `reduce()`, `find()`, `some()`, `every()`, and `sort()`
- Promises, `async`/`await`, and the event loop
- ES modules and error handling with `try`, `catch`, and `finally`
- JSON parsing and stringifying
- HTTP and REST ideas, including GET, POST, PUT, and DELETE requests with Fetch

## Practical Assignment

The Employee Dashboard loads its starting records from `employee-dashboard/data/employees.json`. It uses Fetch to read that file, then keeps changes in browser `localStorage`. A static JSON file cannot be written by a browser, so adding, editing, or deleting employees does not change the original file.

## Features

- Employee listing with name, email, department, position, salary, and location
- Search by employee name or email
- Filter by department
- Sort by name or salary in either direction
- Employee details in a dialog
- Add, edit, and delete employees
- Statistics for employee count, average salary, and department count
- Form validation and useful load/storage error messages

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- JSON
- `localStorage`

## Project Structure

```text
day-05/
├── javascript/
│   ├── 01_variables.js
│   ├── 02_data_types.js
│   ├── 03_functions.js
│   ├── 04_arrow_functions.js
│   ├── 05_arrays.js
│   ├── 06_objects.js
│   ├── 07_destructuring.js
│   ├── 08_spread_rest.js
│   ├── 09_template_literals.js
│   ├── 10_map.js
│   ├── 11_filter.js
│   ├── 12_reduce.js
│   ├── 13_find.js
│   ├── 14_some_every.js
│   ├── 15_sort.js
│   ├── 16_scope.js
│   ├── 17_closures.js
│   ├── 18_hoisting.js
│   ├── 19_callbacks.js
│   ├── 20_promises.js
│   ├── 21_async_await.js
│   ├── 22_event_loop.js
│   ├── 23_modules/
│   │   ├── math.js
│   │   └── 23_modules.js
│   ├── 24_error_handling.js
│   ├── 25_json.js
│   ├── 26_fetch_get.js
│   ├── 27_fetch_post.js
│   ├── 28_fetch_put.js
│   ├── 29_fetch_delete.js
│   └── package.json
├── employee-dashboard/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── data/
│       └── employees.json
└── README.md
```

## How to Run JavaScript Exercises

Run an exercise from the repository root with Node.js. For example:

```powershell
node day-05/javascript/01_variables.js
node day-05/javascript/23_modules/23_modules.js
```

The Fetch REST examples need a real employee REST API. They do not send a request unless `EMPLOYEE_API_URL` is set. For example, after starting an API that supports those routes:

```powershell
$env:EMPLOYEE_API_URL = "http://localhost:3000/employees"
node day-05/javascript/26_fetch_get.js
```

The POST, PUT, and DELETE examples use the same configured base URL. The dashboard's static JSON file is not an API and does not support those write methods.

## How to Run Employee Dashboard

Open PowerShell at the repository root and start Python's simple local web server:

```powershell
python -m http.server 5500
```

Then open:

```text
http://localhost:5500/day-05/employee-dashboard/
```

Use the local server because browser Fetch does not normally load the JSON file from a `file://` page. Dashboard changes are saved in the current browser's `localStorage`; they do not modify `employees.json` and are not shared between browsers.

## Challenges Faced

The dashboard needs HTTP to fetch its starter JSON, and a browser cannot write changes back to a static JSON file. The REST exercise files also need an API that implements the requested routes; no external or paid API is included.

## Solutions

I used Python's built-in local web server to serve the dashboard. It loads the JSON once and stores later changes in `localStorage`. The REST lessons make configurable Fetch requests and explain when an API URL has not been provided.

## Future Improvements

- Connect the dashboard to a backend REST API and database
- Add authentication
- Add pagination for larger employee lists
- Improve form validation and accessibility
