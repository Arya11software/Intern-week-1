import Link from "next/link";
import { DashboardStats } from "@/components/DashboardStats";
import { EmployeeList } from "@/components/EmployeeList";
import { getEmployees } from "@/lib/api";

export const dynamic = "force-dynamic";

interface EmployeesPageProps {
  searchParams: Promise<{ created?: string; deleted?: string }>;
}

export default async function EmployeesPage({ searchParams }: EmployeesPageProps) {
  const status = await searchParams;
  const employees = await getEmployees();

  return (
    <main className="page-shell">
      <section className="page-intro">
        <div>
          <p className="eyebrow">PEOPLE OPERATIONS / DIRECTORY</p>
          <h1>Employee management</h1>
          <p className="intro-copy">Keep track of your team and manage employee records.</p>
        </div>
        <Link className="button primary-button" href="/employees/create"><span aria-hidden="true">+</span> Add employee</Link>
      </section>

      <DashboardStats employees={employees} />

      {status.created === "1" && <p className="success-message" role="status">Employee created successfully.</p>}
      {status.deleted === "1" && <p className="success-message" role="status">Employee deleted successfully.</p>}

      <section className="content-panel" aria-labelledby="directory-heading">
        <div className="panel-heading">
          <div><p className="eyebrow">TEAM OVERVIEW</p><h2 id="directory-heading">All employees <span className="count-badge">{employees.length}</span></h2></div>
          <span className="source-note"><span className="live-dot" /> Live from SQLite API</span>
        </div>
        <EmployeeList employees={employees} />
      </section>
      <footer className="page-footer">Employee Management System <span>·</span> Day 7 intern project</footer>
    </main>
  );
}