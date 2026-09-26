interface Employee {
  id: number;
  name: string;
  department: string;
}

const employee: Employee = {
  id: 1,
  name: "Asha Nair",
  department: "HR",
};

console.log(`${employee.name} works in ${employee.department}.`);

export {};