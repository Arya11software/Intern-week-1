interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-control">
      <span className="visually-hidden">Search employees</span>
      <span aria-hidden="true" className="search-icon">⌕</span>
      <input
        type="search"
        placeholder="Search by name"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    </label>
  );
}