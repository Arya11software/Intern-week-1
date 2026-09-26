const employees = [
  { name: "Rahul", department: "IT", salary: 40000 },
  { name: "Maya", department: "HR", salary: 45000 },
  { name: "Asha", department: "IT", salary: 50000 },
];

const totalSalary = employees.reduce((total, employee) => total + employee.salary, 0);
const averageSalary = totalSalary / employees.length;
console.log("Total salary:", totalSalary);
console.log("Average salary:", averageSalary);