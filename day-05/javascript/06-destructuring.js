// ==========================================
// JavaScript Destructuring
// ==========================================


// ==========================================
// 1. Object Destructuring
// ==========================================

const employee = {
    id: 101,
    name: "Rahul",
    department: "IT",
    salary: 400000
};


// Without destructuring:
// const name = employee.name;
// const salary = employee.salary;


// With destructuring:
const { name, department, salary } = employee;

console.log("Name:", name);
console.log("Department:", department);
console.log("Salary:", salary);


// ==========================================
// 2. Rename Variables
// ==========================================

// We can give the extracted value
// a different variable name.

const {
    name: employeeName,
    salary: employeeSalary
} = employee;

console.log("\nEmployee Name:", employeeName);
console.log("Employee Salary:", employeeSalary);


// ==========================================
// 3. Array Destructuring
// ==========================================

const departments = [
    "IT",
    "HR",
    "Finance"
];


// Extract values according to their position.

const [first, second, third] = departments;

console.log("\nFirst Department:", first);
console.log("Second Department:", second);
console.log("Third Department:", third);


// ==========================================
// 4. Skip Array Elements
// ==========================================

const [firstDepartment, , thirdDepartment] = departments;

console.log("\nFirst:", firstDepartment);
console.log("Third:", thirdDepartment);


// ==========================================
// 5. Destructuring Function Parameters
// ==========================================

function displayEmployee({ name, department, salary }) {

    console.log("\nEmployee Details:");
    console.log("Name:", name);
    console.log("Department:", department);
    console.log("Salary:", salary);
}


displayEmployee(employee);