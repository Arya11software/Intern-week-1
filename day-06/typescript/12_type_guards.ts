interface Employee {
  name: string;
  department: string;
}

function isEmployee(value: unknown): value is Employee {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "name" in value && typeof value.name === "string"
    && "department" in value && typeof value.department === "string";
}

function describeValue(value: unknown): string {
  return isEmployee(value)
    ? `${value.name} works in ${value.department}.`
    : "This value is not an employee.";
}

console.log(describeValue({ name: "Dev Malhotra", department: "Marketing" }));
console.log(describeValue({ name: "Not an employee" }));

export {};