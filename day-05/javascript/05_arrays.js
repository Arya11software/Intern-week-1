const departments = ["IT", "HR", "Finance"];
console.log("First department:", departments[0]);

departments.push("Marketing");
console.log("After adding Marketing:", departments);

const removedDepartment = departments.pop();
console.log("Removed:", removedDepartment);
console.log("Departments now:", departments);