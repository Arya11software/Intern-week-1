import type { Employee } from "../types/employee";

interface EmployeeDetailsProps {
  employee: Employee;
  onClose: () => void;
}

export function EmployeeDetails({ employee, onClose }: EmployeeDetailsProps) {
  return (
    <section className="details-panel" aria-labelledby="details-title">
      <div className="details-heading">
        <div>
          <p className="eyebrow">Employee details</p>
          <h2 id="details-title">{employee.name}</h2>
        </div>
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close employee details">
          ×
        </button>
      </div>
      <dl className="details-list">
        <div><dt>Email</dt><dd>{employee.email}</dd></div>
        <div><dt>Department</dt><dd>{employee.department}</dd></div>
        <div><dt>Position</dt><dd>{employee.position}</dd></div>
        <div><dt>Salary</dt><dd>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(employee.salary)}</dd></div>
        <div><dt>Location</dt><dd>{employee.location}</dd></div>
        <div><dt>Employee ID</dt><dd>{employee.id}</dd></div>
      </dl>
    </section>
  );
}