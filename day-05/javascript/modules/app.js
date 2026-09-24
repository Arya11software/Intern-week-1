// ==========================================
// Main JavaScript Module
// ==========================================


// Import data and function
// from employee.js

import {
    employees,
    findEmployee
} from "./employee.js";


// Display all employees

console.log("All Employees:");

console.log(employees);


// Find a specific employee

const employee = findEmployee(102);

console.log("\nSelected Employee:");

console.log(employee);