const employees = [
  { name: "Rahul", department: "IT", salary: 40000 },
  { name: "Maya", department: "HR", salary: 45000 },
  { name: "Asha", department: "Finance", salary: 50000 },
];

console.log("Any salary above 48000?", employees.some((employee) => employee.salary > 48000));
console.log("All salaries at least 40000?", employees.every((employee) => employee.salary >= 40000));