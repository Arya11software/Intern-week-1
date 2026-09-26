type EmployeeId = number | string;

function describeEmployee(id: EmployeeId): string {
  return `Employee ID: ${id}`;
}

console.log(describeEmployee(12));
console.log(describeEmployee("EMP-13"));

export {};