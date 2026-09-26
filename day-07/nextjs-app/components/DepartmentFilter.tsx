interface DepartmentFilterProps {
  departments: string[];
  value: string;
  onChange: (value: string) => void;
}

export function DepartmentFilter({ departments, value, onChange }: DepartmentFilterProps) {
  return (
    <label className="select-control">
      <span className="visually-hidden">Filter by department</span>
      <select value={value} onChange={(event) => onChange(event.currentTarget.value)}>
        <option value="all">All departments</option>
        {departments.map((department) => <option key={department} value={department}>{department}</option>)}
      </select>
    </label>
  );
}