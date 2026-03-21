export function Counter({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </label>

      <div className="flex items-center justify-between border rounded-md px-3 py-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="text-lg px-2"
        >
          -
        </button>

        <span className="font-medium">{value}</span>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="text-lg px-2"
        >
          +
        </button>
      </div>
    </div>
  );
}
