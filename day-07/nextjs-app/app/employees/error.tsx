"use client";

interface EmployeesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function EmployeesError({ error, reset }: EmployeesErrorProps) {
  return (
    <main className="page-shell">
      <section className="error-panel" role="alert">
        <p className="eyebrow">DIRECTORY UNAVAILABLE</p>
        <h1>We couldn’t load the employees.</h1>
        <p>{error.message || "Check that the Employee API is running and try again."}</p>
        <button className="button primary-button" type="button" onClick={reset}>Try again</button>
      </section>
    </main>
  );
}