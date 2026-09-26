const employee = { name: "Rahul", department: "IT", salary: 40000 };
const jsonText = JSON.stringify(employee, null, 2);
const parsedEmployee = JSON.parse(jsonText);

console.log("JSON string:");
console.log(jsonText);
console.log("Parsed employee name:", parsedEmployee.name);