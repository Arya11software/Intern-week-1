import Link from "next/link";

export default function EmployeeNotFound() {
  return (
    <main className="page-shell">
      <section className="error-panel">
        <p className="eyebrow">EMPLOYEE NOT FOUND</p>
        <h1>This employee record doesn’t exist.</h1>
        <p>The employee may have been removed or the ID may be incorrect.</p>
        <Link className="button primary-button" href="/employees">Back to employees</Link>
      </section>
    </main>
  );
}