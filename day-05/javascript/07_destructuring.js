const departments = ["IT", "HR", "Finance"];
const [firstDepartment, secondDepartment] = departments;

const employee = { name: "Rahul", department: "IT", salary: 40000 };
const { name, salary } = employee;

console.log("Array values:", firstDepartment, secondDepartment);
console.log("Object values:", name, salary);