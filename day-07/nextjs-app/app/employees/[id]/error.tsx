"use client";

import Link from "next/link";

interface EmployeeErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function EmployeeError({ error, reset }: EmployeeErrorProps) {
  return (
    <main className="page-shell">
      <section className="error-panel" role="alert">
        <p className="eyebrow">EMPLOYEE DETAILS</p>
        <h1>Unable to load this employee.</h1>
        <p>{error.message || "Check that the Employee API is running and try again."}</p>
        <div className="form-actions"><Link className="button secondary-button" href="/employees">Back to employees</Link><button className="button primary-button" type="button" onClick={reset}>Try again</button></div>
      </section>
    </main>
  );
}