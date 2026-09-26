import type { Employee } from "../types/employee";

interface DashboardStatsProps {
  employees: Employee[];
}

function formatSalary(salary: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(salary);
}

export function DashboardStats({ employees }: DashboardStatsProps) {
  const totalSalary = employees.reduce((total, employee) => total + employee.salary, 0);
  const averageSalary = employees.length === 0 ? 0 : totalSalary / employees.length;
  const departmentCount = new Set(employees.map((employee) => employee.department)).size;

  return (
    <section className="stats-grid" aria-label="Employee summary">
      <article className="stat-card">
        <span className="stat-label">Total employees</span>
        <strong>{employees.length}</strong>
        <span className="stat-note">People in the directory</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Average salary</span>
        <strong>{formatSalary(averageSalary)}</strong>
        <span className="stat-note">Across current employees</span>
      </article>
      <article className="stat-card">
        <span className="stat-label">Departments</span>
        <strong>{departmentCount}</strong>
        <span className="stat-note">Represented in the directory</span>
      </article>
    </section>
  );
}