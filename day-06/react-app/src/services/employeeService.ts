import { isEmployee, type Employee } from "../types/employee";

export async function loadEmployees(): Promise<Employee[]> {
  const response = await fetch("/data/employees.json");
  if (!response.ok) {
    throw new Error("Employee data could not be loaded. Please try again.");
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isEmployee)) {
    throw new Error("Employee data has an unexpected format.");
  }

  return data;
}