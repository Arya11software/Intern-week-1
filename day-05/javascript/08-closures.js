// ==========================================
// JavaScript Closures
// ==========================================

// A closure happens when an inner function
// remembers variables from its outer function
// even after the outer function has finished.


// ==========================================
// 1. Basic Closure
// ==========================================

function createEmployee() {

    const employeeName = "Rahul";

    function displayEmployee() {
        console.log("Employee:", employeeName);
    }

    return displayEmployee;
}


// createEmployee() returns the inner function
const employeeFunction = createEmployee();


// The inner function still remembers
// employeeName.
employeeFunction();


// ==========================================
// 2. Closure with a Counter
// ==========================================

function createCounter() {

    let count = 0;

    return function () {

        count++;

        console.log("Count:", count);
    };
}


// Create a counter
const counter = createCounter();

counter();
counter();
counter();


// ==========================================
// 3. Separate Closures
// ==========================================

const counterOne = createCounter();
const counterTwo = createCounter();


// Each counter has its own private count
counterOne();
counterOne();

counterTwo();


// ==========================================
// 4. Employee Salary Example
// ==========================================

function createSalaryManager(initialSalary) {

    let salary = initialSalary;

    return {

        getSalary: function () {
            return salary;
        },

        increaseSalary: function (amount) {
            salary += amount;
        }
    };
}


// Create a salary manager
const salaryManager = createSalaryManager(400000);

console.log("\nInitial Salary:");
console.log(salaryManager.getSalary());


// Increase salary
salaryManager.increaseSalary(50000);

console.log("Updated Salary:");
console.log(salaryManager.getSalary());