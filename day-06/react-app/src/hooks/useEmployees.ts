import { useEffect, useState } from "react";
import { loadEmployees } from "../services/employeeService";
import { isEmployee, type Employee, type EmployeeFormData } from "../types/employee";

const storageKey = "day-06-employees";

function readSavedEmployees(): Employee[] | null {
  const savedData = window.localStorage.getItem(storageKey);
  if (savedData === null) {
    return null;
  }

  const parsedData: unknown = JSON.parse(savedData);
  if (!Array.isArray(parsedData) || !parsedData.every(isEmployee)) {
    throw new Error("Saved employee data is invalid. Loading the starter list instead.");
  }

  return parsedData;
}

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function startLoading(): Promise<void> {
      let storageWarning: string | null = null;

      try {
        const savedEmployees = readSavedEmployees();
        if (savedEmployees !== null) {
          setEmployees(savedEmployees);
          setIsLoading(false);
          return;
        }
      } catch (storageError) {
        storageWarning = storageError instanceof Error
          ? storageError.message
          : "Browser storage could not be read.";
      }

      try {
        setEmployees(await loadEmployees());
        setError(storageWarning);
      } catch (loadError) {
        const message = loadError instanceof Error
          ? loadError.message
          : "Employee data could not be loaded.";
        setError(storageWarning ? `${storageWarning} ${message}` : message);
      } finally {
        setIsLoading(false);
      }
    }

    startLoading();
  }, []);

  function saveEmployees(nextEmployees: Employee[]): void {
    setEmployees(nextEmployees);
    setError(null);

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextEmployees));
    } catch {
      setError("Changes are visible now, but this browser could not save them for next time.");
    }
  }

  function addEmployee(formData: EmployeeFormData): void {
    const nextId = employees.reduce((largestId, employee) => Math.max(largestId, employee.id), 0) + 1;
    const newEmployee: Employee = {
      ...formData,
      id: nextId,
      salary: Number(formData.salary),
    };
    saveEmployees([...employees, newEmployee]);
  }

  function updateEmployee(id: number, formData: EmployeeFormData): boolean {
    if (!employees.some((employee) => employee.id === id)) {
      setError("This employee could not be found. Refresh the employee list and try again.");
      return false;
    }

    const updatedEmployees = employees.map((employee) => employee.id === id
      ? { ...formData, id, salary: Number(formData.salary) }
      : employee);
    saveEmployees(updatedEmployees);
    return true;
  }

  function deleteEmployee(id: number): boolean {
    if (!employees.some((employee) => employee.id === id)) {
      setError("This employee could not be found. Refresh the employee list and try again.");
      return false;
    }

    saveEmployees(employees.filter((employee) => employee.id !== id));
    return true;
  }

  return { employees, isLoading, error, setError, addEmployee, updateEmployee, deleteEmployee };
}