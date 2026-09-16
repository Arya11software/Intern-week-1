# Day 2 — Python Fundamentals & Data Management

## Project Overview

Day 2 focuses on Python programming fundamentals, data structures, functions, modules, exception handling, file handling and Object-Oriented Programming.

The practical work includes a **Python Employee Management System** and a **CSV Analysis application**.

## Problem Statement

Develop Python applications that demonstrate core Python concepts and build a management system capable of adding, updating, deleting, searching, filtering and sorting employee records, along with generating statistics. Employee data is stored using JSON, with exception handling implemented for common errors.

## Features

### Python Exercises

The `python-exercises/` folder contains exercises covering:

- Python variables and data types
- Lists, tuples, sets and dictionaries
- Conditions and loops
- Functions
- Lambda functions
- List comprehensions
- Modules
- Exception handling
- File handling
- Classes and objects
- Inheritance
- Encapsulation
- Virtual environment and package management

### Employee Management System

The management system supports:

- Add Employee
- Update Employee
- Delete Employee
- Search Employee
- List Employees
- Filter by Department
- Sort Employees
- Salary Statistics
- JSON data storage
- Exception handling

### CSV Analysis

The CSV analysis application supports:

- Total record count
- Missing value detection
- Duplicate record detection
- Average salary
- Minimum salary
- Maximum salary
- Department-wise statistics

## Technology Stack

- **Language:** Python
- **Data Storage:** JSON and CSV
- **Libraries:** Python standard libraries (`json`, `csv`, `os`)
- **Package Management:** pip
- **Virtual Environment:** Python `venv`
- **Version Control:** Git and GitHub

## Project Structure

```text
day-02/
├── python-exercises/
│   ├── 01-python-basics.py
│   ├── 02-data-structures.py
│   ├── 03-conditions-loops.py
│   ├── 04-functions.py
│   ├── 05-lambda-comprehension.py
│   ├── 06-modules.py
│   ├── 07-exception-handling.py
│   ├── 08-file-handling.py
│   ├── 09-classes-objects.py
│   ├── 10-inheritance.py
│   └── 11-encapsulation.py
│
├── management-system/
│   ├── management_system.py
│   └── employees.json
│
├── csv-analysis/
│   ├── employees.csv
│   └── analyze_csv.py
│
└── README.md
```

## Installation

Make sure Python is installed.

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install required packages if needed:

```bash
pip install requests
```

## How to Run

### Python Exercises

Navigate to the required exercise and run:

```bash
python filename.py
```

Example:

```bash
python 01-python-basics.py
```

### Employee Management System

From the project root:

```bash
python .\day-02\management-system\management_system.py
```

The application provides a menu for managing employee records.

### CSV Analysis

Navigate to the CSV analysis directory:

```powershell
cd .\day-02\csv-analysis
```

Run:

```powershell
python analyze_csv.py
```

## Data Storage

The Employee Management System stores employee records in:

```text
employees.json
```

The CSV Analysis application reads employee records from:

```text
employees.csv
```

JSON was selected for the management system because it provides a simple structured format for storing employee records.

## Exception Handling

Exception handling was implemented to handle errors such as:

- Invalid salary input
- Invalid JSON data
- Missing files
- File-related errors
- Other unexpected runtime errors

Example:

```python
try:
    salary = float(input("Enter salary: "))
except ValueError:
    print("Error: Salary must be a valid number.")
```

## Concepts Learned

During Day 2, the following Python concepts were practiced:

- Python syntax
- Variables and data types
- Lists
- Tuples
- Sets
- Dictionaries
- Conditions
- Loops
- Functions
- Lambda expressions
- List comprehensions
- Modules and packages
- Exception handling
- File handling
- Classes and objects
- Inheritance
- Encapsulation
- Virtual environments
- pip package management
- JSON and CSV data handling

## Challenges Faced

### 1. File Handling

Reading and writing data to external files required understanding Python's file handling operations.

### 2. Exception Handling

Different types of errors had to be handled appropriately instead of allowing the program to terminate unexpectedly.

### 3. JSON Data Storage

Employee records needed to be converted between Python data structures and JSON format.

### 4. Data Analysis

The CSV analysis required identifying missing values and duplicate records and calculating salary and department statistics.

## Solutions

- Used `try-except` blocks for error handling.
- Used Python's `json` module for employee data storage.
- Used Python's built-in `csv` module to read CSV data.
- Used lists and dictionaries to organize and process employee records.
- Tested applications with valid and invalid inputs.

## Testing

The applications were tested using different employee records and input values.

The Employee Management System was tested for:

- Adding employees
- Updating employees
- Deleting employees
- Searching employees
- Filtering by department
- Sorting employees
- Calculating statistics
- Saving and loading JSON data
- Invalid salary input

The CSV Analysis application was tested for:

- Record counting
- Missing values
- Duplicate records
- Salary statistics
- Department-wise statistics

## Future Improvements

- Add a graphical user interface.
- Add automated unit tests.
- Improve input validation.
- Add advanced search and filtering.
- Add more statistical analysis.
- Support larger datasets.
- Add database storage such as SQLite or PostgreSQL.

## Conclusion

Day 2 provided hands-on experience with Python fundamentals, data structures, functions, modules, exception handling, file handling and Object-Oriented Programming. The Employee Management System and CSV Analysis application applied these concepts to practical data-management and analysis tasks.
