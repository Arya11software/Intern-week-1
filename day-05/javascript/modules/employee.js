// ==========================================
// Employee Module
// ==========================================

// Employee data

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


// Function to find an employee

function findEmployee(id) {

    return employees.find(
        employee => employee.id === id
    );
}


// Export the data and function

export {
    employees,
    findEmployee
};