import { useState, type FormEvent } from "react";
import type { Employee, EmployeeFormData } from "../types/employee";

interface EmployeeFormProps {
  employee: Employee | null;
  onSave: (formData: EmployeeFormData) => void;
  onCancel: () => void;
}

function getFormData(employee: Employee | null): EmployeeFormData {
  if (employee === null) {
    return { name: "", email: "", department: "", position: "", salary: "", location: "" };
  }

  return {
    name: employee.name,
    email: employee.email,
    department: employee.department,
    position: employee.position,
    salary: String(employee.salary),
    location: employee.location,
  };
}

function validateForm(data: EmployeeFormData): string | null {
  const requiredFields = [data.name, data.email, data.department, data.position, data.salary, data.location];
  if (requiredFields.some((value) => value.trim() === "")) {
    return "Please fill in every field.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Enter a valid email address.";
  }

  const salary = Number(data.salary);
  if (!Number.isFinite(salary) || salary <= 0) {
    return "Salary must be a number greater than zero.";
  }

  return null;
}

export function EmployeeForm({ employee, onSave, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(() => getFormData(employee));
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.currentTarget;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setValidationError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const error = validateForm(formData);
    if (error !== null) {
      setValidationError(error);
      return;
    }

    onSave({ ...formData, name: formData.name.trim(), email: formData.email.trim() });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onCancel();
    }}>
      <section className="form-dialog" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="dialog-heading">
          <div>
            <p className="eyebrow">People directory</p>
            <h2 id="form-title">{employee ? "Edit employee" : "Add employee"}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onCancel} aria-label="Close form">×</button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              Name
              <input name="name" value={formData.name} onChange={handleChange} autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" />
            </label>
            <label>
              Department
              <input name="department" value={formData.department} onChange={handleChange} />
            </label>
            <label>
              Position
              <input name="position" value={formData.position} onChange={handleChange} />
            </label>
            <label>
              Salary (INR)
              <input name="salary" type="number" min="0.01" step="any" value={formData.salary} onChange={handleChange} />
            </label>
            <label>
              Location
              <input name="location" value={formData.location} onChange={handleChange} />
            </label>
          </div>
          {validationError && <p className="form-error" role="alert">{validationError}</p>}
          <div className="form-actions">
            <button className="button secondary-button" type="button" onClick={onCancel}>Cancel</button>
            <button className="button primary-button" type="submit">{employee ? "Save changes" : "Add employee"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}