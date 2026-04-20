function StatusBadge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div>
      <div className={`badge badge-soft badge-${color}`}>{children}</div>
    </div>
  );
}

export default StatusBadge;
