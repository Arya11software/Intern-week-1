import { useState } from "react";
import { DashboardStats } from "./components/DashboardStats";
import { EmployeeDetails } from "./components/EmployeeDetails";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeTable } from "./components/EmployeeTable";
import { useEmployees } from "./hooks/useEmployees";
import type { Employee, EmployeeFormData } from "./types/employee";

type SortOption = "name-asc" | "name-desc" | "salary-asc" | "salary-desc";

export default function App() {
  const { employees, isLoading, error, setError, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [searchText, setSearchText] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);

  const departments = [...new Set(employees.map((employee) => employee.department))].sort();
  const search = searchText.trim().toLowerCase();
  const visibleEmployees = employees
    .filter((employee) => employee.name.toLowerCase().includes(search)
      || employee.email.toLowerCase().includes(search))
    .filter((employee) => departmentFilter === "all" || employee.department === departmentFilter)
    .sort((first, second) => {
      const direction = sortOption.endsWith("desc") ? -1 : 1;
      return sortOption.startsWith("name")
        ? first.name.localeCompare(second.name) * direction
        : (first.salary - second.salary) * direction;
    });
  const selectedEmployee = employees.find((employee) => employee.id === selectedEmployeeId) ?? null;

  function handleSave(formData: EmployeeFormData): void {
    if (editingEmployee !== null) {
      if (!updateEmployee(editingEmployee.id, formData)) return;
      setEditingEmployee(null);
      return;
    }

    addEmployee(formData);
    setIsAddingEmployee(false);
  }

  function handleDelete(employee: Employee): void {
    if (!window.confirm(`Delete ${employee.name} from the employee list?`)) return;
    if (deleteEmployee(employee.id) && selectedEmployeeId === employee.id) {
      setSelectedEmployeeId(null);
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">P</div>
        <div className="header-copy">
          <p className="eyebrow">INTERN TRAINING · DAY 06</p>
          <h1>People Directory</h1>
          <p className="header-subtitle">A clear view of the people behind the work.</p>
        </div>
        <button className="button primary-button add-button" type="button" onClick={() => setIsAddingEmployee(true)}>
          <span aria-hidden="true">+</span> Add employee
        </button>
      </header>

      {error && <p className="status-message" role="alert">{error}</p>}
      <DashboardStats employees={employees} />

      <section className="directory-section" aria-labelledby="directory-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TEAM OVERVIEW</p>
            <h2 id="directory-title">Employees <span>{visibleEmployees.length}</span></h2>
          </div>
          <div className="filters" aria-label="Search, filter, and sort employees">
            <label className="search-control">
              <span className="visually-hidden">Search name or email</span>
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input value={searchText} onChange={(event) => setSearchText(event.currentTarget.value)} placeholder="Search people" />
            </label>
            <label className="select-control">
              <span className="visually-hidden">Filter by department</span>
              <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.currentTarget.value)}>
                <option value="all">All departments</option>
                {departments.map((department) => <option key={department} value={department}>{department}</option>)}
              </select>
            </label>
            <label className="select-control">
              <span className="visually-hidden">Sort employees</span>
              <select value={sortOption} onChange={(event) => setSortOption(event.currentTarget.value as SortOption)}>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="salary-asc">Salary: low to high</option>
                <option value="salary-desc">Salary: high to low</option>
              </select>
            </label>
          </div>
        </div>

        {isLoading ? (
          <p className="empty-state" role="status">Loading employee data…</p>
        ) : error && employees.length === 0 ? (
          <div className="load-error">
            <p>Employee records could not be displayed.</p>
            <button className="text-button" type="button" onClick={() => window.location.reload()}>Try again</button>
          </div>
        ) : (
          <EmployeeTable
            employees={visibleEmployees}
            onSelect={(employee) => setSelectedEmployeeId(employee.id)}
            onEdit={(employee) => { setEditingEmployee(employee); setIsAddingEmployee(false); }}
            onDelete={handleDelete}
          />
        )}
      </section>

      {selectedEmployee && <EmployeeDetails employee={selectedEmployee} onClose={() => setSelectedEmployeeId(null)} />}
      {(isAddingEmployee || editingEmployee) && (
        <EmployeeForm
          key={editingEmployee?.id ?? "new"}
          employee={editingEmployee}
          onSave={handleSave}
          onCancel={() => { setIsAddingEmployee(false); setEditingEmployee(null); setError(null); }}
        />
      )}
      <footer className="page-footer">Day 6 learning project <span>·</span> React + TypeScript</footer>
    </main>
  );
}