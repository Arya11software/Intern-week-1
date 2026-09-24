// ==========================================
// JavaScript Arrays and Objects
// ==========================================


// ==========================================
// PART 1: ARRAYS
// ==========================================

// An array stores multiple values
// in a single variable.

const departments = [
    "IT",
    "HR",
    "Finance",
    "Marketing"
];

console.log("Departments:", departments);


// Access an array element using its index
// Index starts from 0.

console.log("First department:", departments[0]);
console.log("Second department:", departments[1]);


// Find the number of elements
console.log("Number of departments:", departments.length);


// Add an element to the end
departments.push("Sales");

console.log("After adding Sales:", departments);


// Remove the last element
departments.pop();

console.log("After removing last element:", departments);


// ==========================================
// PART 2: OBJECTS
// ==========================================

// An object stores data using
// key-value pairs.

const employee = {
    id: 101,
    name: "Rahul",
    department: "IT",
    salary: 400000
};

console.log("\nEmployee:", employee);


// Access object properties
console.log("Employee ID:", employee.id);
console.log("Employee Name:", employee.name);
console.log("Department:", employee.department);
console.log("Salary:", employee.salary);


// Update an object property
employee.salary = 450000;

console.log("Updated Salary:", employee.salary);


// Add a new property
employee.experience = 2;

console.log("Experience:", employee.experience);


// Delete a property
delete employee.experience;

console.log("After deleting experience:", employee);


// ==========================================
// PART 3: ARRAY OF OBJECTS
// ==========================================

// This structure is very important for our
// Employee Dashboard.

const employees = [
    {
        id: 101,
        name: "Rahul",
        department: "IT",
        salary: 400000
    },

    {
        id: 102,
        name: "Priya",
        department: "HR",
        salary: 300000
    },

    {
        id: 103,
        name: "Amit",
        department: "Finance",
        salary: 350000
    }
];


// Display all employees
console.log("\nEmployees:");
console.log(employees);


// Access the first employee
console.log("\nFirst Employee:");
console.log(employees[0]);


// Access a specific property
console.log(
    "First Employee Name:",
    employees[0].name
);


// Access the second employee's department
console.log(
    "Second Employee Department:",
    employees[1].department
);