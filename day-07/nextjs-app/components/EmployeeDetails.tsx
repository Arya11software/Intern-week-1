"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteEmployee } from "@/lib/api";
import type { Employee } from "@/types/employee";
import { EmployeeForm } from "./EmployeeForm";

interface EmployeeDetailsProps {
  employee: Employee;
  startEditing?: boolean;
}

function formatSalary(salary: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(salary);
}

export function EmployeeDetails({ employee, startEditing = false }: EmployeeDetailsProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(startEditing);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(): Promise<void> {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    setError(null);
    try {
      await deleteEmployee(employee.id);
      router.push("/employees?deleted=1");
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Employee could not be deleted.");
    }
  }

  if (isEditing) {
    return (
      <section className="content-panel detail-panel">
        <div className="panel-heading"><div><p className="eyebrow">EMPLOYEE RECORD</p><h1>Edit employee</h1></div></div>
        <EmployeeForm employee={employee} />
      </section>
    );
  }

  return (
    <section className="content-panel detail-panel">
      <div className="detail-topline">
        <Link className="back-link" href="/employees">← Back to employees</Link>
        <span className="record-id">EMPLOYEE / {String(employee.id).padStart(3, "0")}</span>
      </div>
      <div className="detail-identity">
        <span className="avatar-large" aria-hidden="true">{employee.name.slice(0, 1).toUpperCase()}</span>
        <div><p className="eyebrow">EMPLOYEE DETAILS</p><h1>{employee.name}</h1><span className="department-badge">{employee.department}</span></div>
      </div>
      <dl className="detail-facts">
        <div><dt>Employee ID</dt><dd>{employee.id}</dd></div>
        <div><dt>Department</dt><dd>{employee.department}</dd></div>
        <div><dt>Annual salary</dt><dd>{formatSalary(employee.salary)}</dd></div>
      </dl>
      {error && <p className="inline-error" role="alert">{error}</p>}
      <div className="detail-actions">
        <button className="button secondary-button" type="button" onClick={() => setIsEditing(true)}>Edit employee</button>
        <button className="button danger-button" type="button" onClick={handleDelete}>Delete employee</button>
      </div>
    </section>
  );
}