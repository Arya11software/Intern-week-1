export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  location: string;
}

export type EmployeeFormData = Omit<Employee, "id" | "salary"> & {
  salary: string;
};

export function isEmployee(value: unknown): value is Employee {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const employee = value as Record<string, unknown>;
  return typeof employee.id === "number"
    && typeof employee.name === "string"
    && typeof employee.email === "string"
    && typeof employee.department === "string"
    && typeof employee.position === "string"
    && typeof employee.salary === "number"
    && typeof employee.location === "string";
}