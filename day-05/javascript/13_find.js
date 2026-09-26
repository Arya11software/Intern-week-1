const employees = [
  { name: "Rahul", department: "IT", salary: 40000 },
  { name: "Maya", department: "HR", salary: 45000 },
  { name: "Asha", department: "Finance", salary: 50000 },
];

const employee = employees.find((person) => person.name === "Maya");
console.log("find() returns the first matching employee:", employee);