const employee = {
  name: "Rahul",
  department: "IT",
  salary: 40000,
};

console.log("Name:", employee.name);
console.log("Department:", employee["department"]);
employee.salary = 42000;
employee.location = "Pune";
console.log("Updated employee:", employee);