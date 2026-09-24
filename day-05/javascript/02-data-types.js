// ==========================================
// JavaScript Data Types
// ==========================================

// 1. String
// Used to store text
const employeeName = "Rahul";


// 2. Number
// Used to store integers and decimal numbers
const salary = 400000;
const rating = 4.5;


// 3. Boolean
// Can only be true or false
const isActive = true;


// 4. Undefined
// A variable that has been declared
// but has not been assigned a value
let department;


// 5. Null
// Represents an intentionally empty value
const manager = null;


// 6. Object
// Stores data in key-value pairs
const employee = {
    id: 101,
    name: "Rahul",
    department: "IT",
    salary: 400000
};


// 7. Array
// Stores multiple values in a single variable
const skills = [
    "JavaScript",
    "Python",
    "Java"
];


// ==========================================
// Display values
// ==========================================

console.log("Employee Name:", employeeName);
console.log("Salary:", salary);
console.log("Rating:", rating);
console.log("Active:", isActive);
console.log("Department:", department);
console.log("Manager:", manager);

console.log("Employee:", employee);
console.log("Skills:", skills);


// ==========================================
// Check the data types
// ==========================================

console.log("\nData Types:");

console.log("employeeName:", typeof employeeName);
console.log("salary:", typeof salary);
console.log("isActive:", typeof isActive);
console.log("department:", typeof department);
console.log("manager:", typeof manager);
console.log("employee:", typeof employee);
console.log("skills:", typeof skills);
