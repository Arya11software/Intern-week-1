const employees = [
  { name: "Rahul", department: "IT", salary: 40000 },
  { name: "Maya", department: "HR", salary: 45000 },
  { name: "Asha", department: "Finance", salary: 50000 },
];

const bySalary = [...employees].sort((first, second) => first.salary - second.salary);
const byName = [...employees].sort((first, second) => first.name.localeCompare(second.name));
console.log("Lowest to highest salary:", bySalary);
console.log("Name A to Z:", byName);