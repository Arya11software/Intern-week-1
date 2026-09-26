import type { Employee } from "@/types/employee";

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
  const departments = new Set(employees.map((employee) => employee.department)).size;
  const stats = [
    { label: "Total employees", value: String(employees.length), note: "Active records" },
    { label: "Average salary", value: formatSalary(averageSalary), note: "Across all employees" },
    { label: "Departments", value: String(departments), note: "Teams represented" },
  ];

  return (
    <section className="stats-grid" aria-label="Employee summary">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <span className="stat-label">{stat.label}</span>
          <strong>{stat.value}</strong>
          <span className="stat-note">{stat.note}</span>
        </article>
      ))}
    </section>
  );
}