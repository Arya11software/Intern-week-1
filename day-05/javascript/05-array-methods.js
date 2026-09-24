// ==========================================
// JavaScript Array Methods
// ==========================================

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
        department: "IT",
        salary: 250000
    },
    {
        id: 104,
        name: "Neha",
        department: "Finance",
        salary: 450000
    },
    {
        id: 105,
        name: "Rohan",
        department: "IT",
        salary: 350000
    }
];


// ==========================================
// 1. forEach()
// ==========================================

// forEach() runs a function for every element.

console.log("All Employees:");

employees.forEach(employee => {
    console.log(employee.name);
});


// ==========================================
// 2. map()
// ==========================================

// map() creates a NEW array by transforming
// every element.

const employeeNames = employees.map(
    employee => employee.name
);

console.log("\nEmployee Names:");
console.log(employeeNames);


// ==========================================
// 3. filter()
// ==========================================

// filter() creates a new array containing
// only elements that satisfy a condition.

const itEmployees = employees.filter(
    employee => employee.department === "IT"
);

console.log("\nIT Employees:");
console.log(itEmployees);


// Filter employees with salary above 300000

const highSalaryEmployees = employees.filter(
    employee => employee.salary > 300000
);

console.log("\nEmployees with salary above 300000:");
console.log(highSalaryEmployees);


// ==========================================
// 4. find()
// ==========================================

// find() returns the FIRST element
// matching a condition.

const employee = employees.find(
    employee => employee.id === 103
);

console.log("\nEmployee with ID 103:");
console.log(employee);


// ==========================================
// 5. some()
// ==========================================

// some() checks whether AT LEAST ONE
// element satisfies a condition.

const hasHighSalary = employees.some(
    employee => employee.salary > 500000
);

console.log("\nAny employee earning above 500000?");
console.log(hasHighSalary);


// ==========================================
// 6. every()
// ==========================================

// every() checks whether ALL elements
// satisfy a condition.

const everyoneHasSalary = employees.every(
    employee => employee.salary > 200000
);

console.log("\nDoes every employee earn above 200000?");
console.log(everyoneHasSalary);


// ==========================================
// 7. reduce()
// ==========================================

// reduce() combines all elements into
// a single value.

const totalSalary = employees.reduce(
    (total, employee) => total + employee.salary,
    0
);

console.log("\nTotal Salary:");
console.log(totalSalary);


// Calculate average salary

const averageSalary =
    totalSalary / employees.length;

console.log("\nAverage Salary:");
console.log(averageSalary);


// ==========================================
// 8. sort()
// ==========================================

// sort() can be used to sort employee data.

// Create a copy first so the original array
// is not modified.

const sortedBySalary = [...employees].sort(
    (a, b) => b.salary - a.salary
);

console.log("\nEmployees sorted by salary:");
console.log(sortedBySalary);


// Sort alphabetically by name

const sortedByName = [...employees].sort(
    (a, b) => a.name.localeCompare(b.name)
);

console.log("\nEmployees sorted by name:");
console.log(sortedByName);