import { notFound } from "next/navigation";
import { EmployeeDetails } from "@/components/EmployeeDetails";
import { ApiError, getEmployee } from "@/lib/api";

export const dynamic = "force-dynamic";

interface EmployeePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}

export default async function EmployeePage({ params, searchParams }: EmployeePageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const employeeId = Number(id);
  if (!Number.isInteger(employeeId) || employeeId <= 0) notFound();

  try {
    const employee = await getEmployee(employeeId);
    return (
      <main className="page-shell detail-page">
        <EmployeeDetails key={`${employee.id}-${query.edit === "1"}`} employee={employee} startEditing={query.edit === "1"} />
      </main>
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}