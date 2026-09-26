import Link from "next/link";
import { EmployeeForm } from "@/components/EmployeeForm";

export default function CreateEmployeePage() {
  return (
    <main className="page-shell form-page">
      <Link className="back-link" href="/employees">← Back to employees</Link>
      <section className="content-panel form-panel">
        <div className="panel-heading"><div><p className="eyebrow">PEOPLE OPERATIONS</p><h1>Add an employee</h1><p className="intro-copy">Enter the details for this employee record.</p></div></div>
        <EmployeeForm />
      </section>
    </main>
  );
}