"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createEmployee, updateEmployee } from "@/lib/api";
import type { Employee, EmployeeFormData } from "@/types/employee";

interface EmployeeFormProps {
  employee?: Employee;
}

function validate(data: EmployeeFormData): string | null {
  if (!data.name.trim()) return "Name is required.";
  if (!data.department.trim()) return "Department is required.";
  if (data.salary.trim() === "") return "Salary is required.";
  const salary = Number(data.salary);
  if (!Number.isFinite(salary)) return "Salary must be a number.";
  if (salary < 0) return "Salary cannot be negative.";
  return null;
}

export function EmployeeForm({ employee }: EmployeeFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<EmployeeFormData>(() => ({
    name: employee?.name ?? "",
    department: employee?.department ?? "",
    salary: employee ? String(employee.salary) : "",
  }));
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.currentTarget;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const validationError = validate(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      if (employee) {
        await updateEmployee(employee.id, formData);
        router.push(`/employees/${employee.id}`);
      } else {
        await createEmployee(formData);
        router.push("/employees?created=1");
      }
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Employee could not be saved.");
      setIsSaving(false);
    }
  }

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      <label>
        Name
        <input name="name" value={formData.name} onChange={handleChange} autoComplete="name" />
      </label>
      <label>
        Department
        <input name="department" value={formData.department} onChange={handleChange} />
      </label>
      <label>
        Salary (INR)
        <input name="salary" type="number" min="0" step="any" value={formData.salary} onChange={handleChange} />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-actions">
        <button className="button secondary-button" type="button" onClick={() => router.back()}>Cancel</button>
        <button className="button primary-button" type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : employee ? "Save changes" : "Create employee"}
        </button>
      </div>
    </form>
  );
}