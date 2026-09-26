const employees = [
  { name: "Rahul", department: "IT", salary: 40000 },
  { name: "Maya", department: "HR", salary: 45000 },
  { name: "Asha", department: "IT", salary: 50000 },
];

const itEmployees = employees.filter((employee) => employee.department === "IT");
console.log("filter() selects IT employees:", itEmployees);