"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteEmployee } from "@/lib/api";
import type { Employee } from "@/types/employee";
import { DepartmentFilter } from "./DepartmentFilter";
import { EmployeeCard } from "./EmployeeCard";
import { SearchBar } from "./SearchBar";
import { SortSelect, type SortOption } from "./SortSelect";

interface EmployeeListProps {
  employees: Employee[];
}

export function EmployeeList({ employees: initialEmployees }: EmployeeListProps) {
  const router = useRouter();
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const departments = [...new Set(employees.map((employee) => employee.department))].sort();
  const searchText = search.trim().toLowerCase();
  const visibleEmployees = employees
    .filter((employee) => employee.name.toLowerCase().includes(searchText))
    .filter((employee) => department === "all" || employee.department === department)
    .sort((first, second) => {
      const direction = sort.endsWith("desc") ? -1 : 1;
      return sort.startsWith("name")
        ? first.name.localeCompare(second.name) * direction
        : (first.salary - second.salary) * direction;
    });

  async function handleDelete(employee: Employee): Promise<void> {
    if (!window.confirm(`Are you sure you want to delete ${employee.name}?`)) return;

    setError(null);
    setSuccessMessage(null);
    try {
      await deleteEmployee(employee.id);
      setEmployees((currentEmployees) => currentEmployees.filter((item) => item.id !== employee.id));
      setSuccessMessage(`${employee.name} was deleted.`);
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Employee could not be deleted.");
    }
  }

  return (
    <>
      <div className="directory-toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <DepartmentFilter departments={departments} value={department} onChange={setDepartment} />
        <SortSelect value={sort} onChange={setSort} />
      </div>
      {successMessage && <p className="success-message" role="status">{successMessage}</p>}
      {error && <p className="inline-error" role="alert">{error}</p>}
      {visibleEmployees.length === 0 ? (
        <div className="empty-state"><span aria-hidden="true">⌕</span><h3>No employees found</h3><p>Try another name or department.</p></div>
      ) : (
        <div className="table-scroll">
          <table className="employee-table">
            <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Salary</th><th>Actions</th></tr></thead>
            <tbody>
              {visibleEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="table-footer">Showing {visibleEmployees.length} of {employees.length} employees</div>
    </>
  );
}