// ==========================================
// JavaScript Spread and Rest Operators
// ==========================================


// ==========================================
// 1. Spread Operator with Arrays
// ==========================================

const frontendSkills = [
    "HTML",
    "CSS",
    "JavaScript"
];

const backendSkills = [
    "Node.js",
    "Express.js"
];


// ... spreads the elements of an array
// into another array.

const allSkills = [
    ...frontendSkills,
    ...backendSkills
];

console.log("All Skills:");
console.log(allSkills);


// ==========================================
// 2. Copy an Array
// ==========================================

const originalDepartments = [
    "IT",
    "HR",
    "Finance"
];


// Create a separate copy
const copiedDepartments = [
    ...originalDepartments
];

console.log("\nCopied Departments:");
console.log(copiedDepartments);


// ==========================================
// 3. Add Items While Copying
// ==========================================

const updatedDepartments = [
    ...originalDepartments,
    "Marketing"
];

console.log("\nUpdated Departments:");
console.log(updatedDepartments);


// ==========================================
// 4. Spread Operator with Objects
// ==========================================

const employee = {
    id: 101,
    name: "Rahul",
    department: "IT",
    salary: 400000
};


// Create a copy of the object
const employeeCopy = {
    ...employee
};

console.log("\nEmployee Copy:");
console.log(employeeCopy);


// ==========================================
// 5. Update an Object
// ==========================================

const updatedEmployee = {
    ...employee,
    salary: 450000
};

console.log("\nUpdated Employee:");
console.log(updatedEmployee);


// ==========================================
// 6. Add a Property
// ==========================================

const employeeWithExperience = {
    ...employee,
    experience: 2
};

console.log("\nEmployee With Experience:");
console.log(employeeWithExperience);


// ==========================================
// 7. Rest Operator in Functions
// ==========================================

// The rest operator collects multiple
// arguments into an array.

function calculateTotal(...numbers) {

    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total;
}


console.log("\nTotal:");
console.log(calculateTotal(10, 20, 30));

console.log(
    "Another Total:",
    calculateTotal(100, 200, 300, 400)
);


// ==========================================
// 8. Rest Operator with Destructuring
// ==========================================

const [firstSkill, secondSkill, ...otherSkills] = allSkills;

console.log("\nFirst Skill:", firstSkill);
console.log("Second Skill:", secondSkill);
console.log("Other Skills:", otherSkills);