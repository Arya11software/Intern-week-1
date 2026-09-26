interface LoadingProps {
  label?: string;
}

export function Loading({ label = "Loading employees..." }: LoadingProps) {
  return (
    <div className="loading-state" role="status">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}