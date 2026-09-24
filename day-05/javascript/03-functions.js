// ==========================================
// JavaScript Functions
// ==========================================


// ------------------------------------------
// 1. Basic Function
// ------------------------------------------

function greetEmployee() {
    console.log("Welcome to the Employee System!");
}


// Call the function
greetEmployee();


// ------------------------------------------
// 2. Function with Parameters
// ------------------------------------------

function greet(name) {
    console.log("Hello", name);
}


// Pass a value to the function
greet("Rahul");
greet("Priya");


// ------------------------------------------
// 3. Function with Multiple Parameters
// ------------------------------------------

function calculateSalary(name, salary) {

    console.log(
        name + " earns " + salary + " per year."
    );
}


calculateSalary("Rahul", 400000);
calculateSalary("Priya", 300000);


// ------------------------------------------
// 4. Function Returning a Value
// ------------------------------------------

function add(a, b) {

    return a + b;
}


const result = add(10, 20);

console.log("Addition:", result);


// ------------------------------------------
// 5. Arrow Function
// ------------------------------------------

// Modern JavaScript allows functions
// to be written using arrow syntax.

const multiply = (a, b) => {

    return a * b;
};


console.log("Multiplication:", multiply(5, 4));


// ------------------------------------------
// 6. Short Arrow Function
// ------------------------------------------

// When the function contains only one
// return expression, it can be shortened.

const square = number => number * number;

console.log("Square:", square(6));