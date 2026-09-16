# Day 1 — Programming Fundamentals & Employee Management System

## Project Overview

Day 1 focuses on programming fundamentals, problem solving, basic data structures and Git/GitHub workflow.

As the practical assignment, an **Employee Management CLI** was developed to manage employee records through a command-line interface.

## Problem Statement

Build a command-line Employee Management System that allows users to manage employee information and perform basic operations such as searching, filtering, sorting and calculating salary statistics.

## Features

### Programming Exercises

The `exercises/` folder contains solutions for the Day 1 programming challenges:

- Reverse a string
- Check palindrome
- Find largest number
- Find second-largest number
- Remove duplicates
- Find missing number
- Find duplicate number
- Character frequency
- Find first non-repeating character
- Merge sorted arrays
- Find common elements
- Implement stack
- Implement queue
- Find maximum subarray sum
- Implement sorting without built-in sort

### Employee Management System

The CLI application supports:

- Add Employee
- Update Employee
- Delete Employee
- Search Employee
- List Employees
- Find Highest Salary
- Calculate Average Salary
- Filter Employees by Department

## Technology Stack

- **Language:** Python
- **Interface:** Command Line Interface (CLI)
- **Data Structures:** Lists, dictionaries
- **Version Control:** Git
- **Repository:** GitHub

## Project Structure

```text
day-01/
├── exercises/
│   ├── 01-reverse-string.py
│   ├── 02-palindrome.py
│   ├── 03-largest-number.py
│   ├── 04-second-largest.py
│   ├── 05-remove-duplicates.py
│   ├── 06-missing-number.py
│   ├── 07-duplicate-number.py
│   ├── 08-character-frequency.py
│   ├── 09-first-non-repeating.py
│   ├── 10-merge-sorted-arrays.py
│   ├── 11-common-elements.py
│   ├── 12-stack.py
│   ├── 13-queue.py
│   ├── 14-max-subarray-sum.py
│   └── 15-sorting.py
│
├── employee-management/
│   └── employee_management.py
│
└── README.md
```

## How to Run

### Programming Exercises

Navigate to the required exercise and run:

```bash
python filename.py
```

Example:

```bash
python 01-reverse-string.py
```

### Employee Management System

Navigate to the Employee Management folder:

```bash
cd employee-management
```

Run:

```bash
python employee_management.py
```

The application displays a menu through which the user can select the required operation.

## Example Menu

```text
==================================
     EMPLOYEE MANAGEMENT SYSTEM
==================================

1. Add Employee
2. Update Employee
3. Delete Employee
4. Search Employee
5. List Employees
6. Highest Salary
7. Average Salary
8. Filter by Department
9. Exit
```

## Concepts Learned

During Day 1, the following concepts were practiced:

- Variables and constants
- Data types
- Operators
- Conditional statements
- Loops
- Functions
- Lists and strings
- Dictionaries
- Scope
- Exception handling
- Basic Object-Oriented Programming
- Arrays and basic data structures
- Searching and sorting
- Recursion
- Time and space complexity
- Git repositories
- Git commits
- Git branches
- Git push and pull

## Challenges Faced

### 1. Input Handling

Some programs required user input through the terminal. Understanding when the program was waiting for input was important while testing the exercises.

### 2. Git Repository Setup

The Git repository initially needed to be configured in the correct project directory so that only the internship project files were tracked.

### 3. Implementing Algorithms

Some problems required implementing logic manually instead of relying on built-in functions, particularly searching, sorting and finding maximum/second-largest values.

## Solutions

- Tested each program individually with different inputs.
- Used conditional logic and loops to implement the required algorithms.
- Used Git status and staging commands to verify which files were being tracked.
- Organized Day 1 work into separate exercise and project directories.

## Testing

The programming exercises and Employee Management System were executed through the terminal and tested using different inputs and employee records.

## Future Improvements

- Add persistent storage using JSON or CSV.
- Add stronger input validation.
- Improve the CLI interface.
- Add automated unit tests.
- Add a graphical or web-based interface.

## Conclusion

Day 1 provided practical experience with Python programming fundamentals, problem solving, data structures, basic algorithms and Git/GitHub. The Employee Management System combined these concepts into a functional command-line application.
