export  function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <p className="mt-0.5 font-sans text-sm text-foreground">{value}</p>
    </div>
  );
}

