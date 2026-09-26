const employees = [
  { name: "Rahul", department: "IT", salary: 40000 },
  { name: "Maya", department: "HR", salary: 45000 },
  { name: "Asha", department: "Finance", salary: 50000 },
];

const employeeNames = employees.map((employee) => employee.name);
console.log("map() transforms employees into names:", employeeNames);