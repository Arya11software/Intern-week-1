import Link from "next/link";
import type { Employee } from "@/types/employee";

interface EmployeeCardProps {
  employee: Employee;
  onDelete: (employee: Employee) => void;
}

function formatSalary(salary: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(salary);
}

export function EmployeeCard({ employee, onDelete }: EmployeeCardProps) {
  return (
    <tr>
      <td className="id-cell">{String(employee.id).padStart(3, "0")}</td>
      <td>
        <Link className="employee-link" href={`/employees/${employee.id}`}>{employee.name}</Link>
      </td>
      <td><span className="department-badge">{employee.department}</span></td>
      <td>{formatSalary(employee.salary)}</td>
      <td className="actions-cell">
        <Link className="text-action" href={`/employees/${employee.id}`}>View</Link>
        <Link className="text-action" href={`/employees/${employee.id}?edit=1`}>Edit</Link>
        <button className="text-action danger-action" type="button" onClick={() => onDelete(employee)}>Delete</button>
      </td>
    </tr>
  );
}