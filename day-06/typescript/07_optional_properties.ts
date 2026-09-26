interface Employee {
  name: string;
  location?: string;
}

function describeEmployee(employee: Employee): string {
  return employee.location
    ? `${employee.name} works in ${employee.location}.`
    : `${employee.name}'s location is not listed.`;
}

console.log(describeEmployee({ name: "Leena Iyer", location: "Chennai" }));
console.log(describeEmployee({ name: "Arjun Rao" }));

export {};