const departments: string[] = ["IT", "HR", "Finance"];
const employee: { name: string; department: string } = {
  name: "Rahul Mehta",
  department: departments[0],
};

departments.push("Marketing");
console.log(`${employee.name} works in ${employee.department}.`);
console.log("Departments:", departments.join(", "));

export {};