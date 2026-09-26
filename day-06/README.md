# Day 6 - TypeScript and React

## Overview

Today I practiced TypeScript basics and used React with TypeScript to make an employee dashboard. I also learned how components and types can make an application easier to organize and check.

## TypeScript

The numbered examples cover:

- Primitive types, arrays, and objects
- Interfaces and type aliases
- Union types, enums, and optional properties
- Functions and classes
- Generics
- Type narrowing and type guards

## React

The dashboard uses components, JSX, typed props, state, events, and forms. It displays lists, uses conditional rendering, and composes smaller components for the summary, employee table, form, and details. `useState` tracks the current screen and employee data. `useEffect` loads the starter data when the app starts. A custom hook keeps employee loading and add/edit/delete logic together.

## Practical Assignment

I made a React and TypeScript version of the Day 5 Employee Dashboard. It loads employee data from a local JSON file with Fetch and uses an `Employee` interface for the employee records throughout the app.

## Features

- Employee listing
- Search by name or email
- Filter by department
- Sort by name or salary in either direction
- Employee details
- Add, edit, and delete employees
- Employee count, average salary, and department statistics
- Required-field, email, and salary validation

## Technologies Used

- TypeScript
- React
- Vite
- HTML and CSS
- Fetch API and JSON
- Browser `localStorage`

## Project Structure

```text
day-06/
├── .gitignore
├── typescript/
│   ├── 01_primitive_types.ts
│   ├── 02_arrays_objects.ts
│   ├── 03_interfaces.ts
│   ├── 04_type_aliases.ts
│   ├── 05_union_types.ts
│   ├── 06_enums.ts
│   ├── 07_optional_properties.ts
│   ├── 08_functions.ts
│   ├── 09_classes.ts
│   ├── 10_generics.ts
│   ├── 11_type_narrowing.ts
│   ├── 12_type_guards.ts
│   └── tsconfig.json
├── react-app/
│   ├── public/data/employees.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── EmployeeDetails.tsx
│   │   │   ├── EmployeeForm.tsx
│   │   │   └── EmployeeTable.tsx
│   │   ├── hooks/useEmployees.ts
│   │   ├── services/employeeService.ts
│   │   ├── types/employee.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── README.md
```

The generated `node_modules/` and `dist/` folders are ignored and are not shown above.

## How to Run

In PowerShell, from the internship project root:

```powershell
cd day-06/react-app
npm install
npm run dev
```

Open the local URL printed by Vite. The app uses that local server to fetch `public/data/employees.json`.

To type-check the dashboard and the TypeScript exercises:

```powershell
npm run typecheck
```

With Node.js 24, run an exercise from the project root with its built-in TypeScript support:

```powershell
node --experimental-transform-types day-06/typescript/01_primitive_types.ts
node --experimental-transform-types day-06/typescript/06_enums.ts
```

The same command works for the other numbered files. Node executes the examples but does not type-check them; `npm run typecheck` checks the exercise files with TypeScript.

## What I Learned

Today I learned how TypeScript adds checks to JavaScript and how interfaces describe the shape of data. I practiced React by splitting the employee page into components, passing typed props, handling form events, and keeping the employee list in state. I also used `useEffect` to load JSON and `localStorage` to keep changes after a refresh.

## Challenges Faced

A browser cannot save changes back into a static JSON file. Also, the browser needs the Vite server to fetch that file instead of opening the page directly from disk.

## Solutions

The app fetches the starter records from its local JSON file when there are no saved records. Add, edit, and delete changes are kept in browser `localStorage`. The original JSON file stays unchanged.

## Future Improvements

- Connect the dashboard to a real backend API and database
- Add authentication
- Add pagination for larger employee lists
