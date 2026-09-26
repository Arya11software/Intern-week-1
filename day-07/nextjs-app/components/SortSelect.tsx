export type SortOption = "name-asc" | "name-desc" | "salary-asc" | "salary-desc";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="select-control">
      <span className="visually-hidden">Sort employees</span>
      <select value={value} onChange={(event) => onChange(event.currentTarget.value as SortOption)}>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
        <option value="salary-asc">Salary: low to high</option>
        <option value="salary-desc">Salary: high to low</option>
      </select>
    </label>
  );
}