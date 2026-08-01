export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-xl font-semibold tracking-tight text-ink">
      {children}
    </h2>
  );
}
