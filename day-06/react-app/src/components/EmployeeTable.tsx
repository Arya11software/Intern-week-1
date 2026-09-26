import type { Employee } from "../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  onSelect: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

function formatSalary(salary: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(salary);
}

export function EmployeeTable({ employees, onSelect, onEdit, onDelete }: EmployeeTableProps) {
  if (employees.length === 0) {
    return <p className="empty-state">No employees match these search and filter settings.</p>;
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th scope="col">Employee</th>
            <th scope="col">Department</th>
            <th scope="col">Position</th>
            <th scope="col">Salary</th>
            <th scope="col">Location</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <button className="employee-name" type="button" onClick={() => onSelect(employee)}>
                  {employee.name}
                </button>
                <span className="employee-email">{employee.email}</span>
              </td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{formatSalary(employee.salary)}</td>
              <td>{employee.location}</td>
              <td>
                <div className="row-actions">
                  <button className="text-button" type="button" onClick={() => onEdit(employee)}>Edit</button>
                  <button className="text-button danger-text" type="button" onClick={() => onDelete(employee)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}