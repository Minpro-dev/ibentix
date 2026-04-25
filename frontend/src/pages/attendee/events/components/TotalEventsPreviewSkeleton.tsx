function TotalEventsPreviewSkeleton() {
  return (
    <div>
      <div className="flex flex-col animate-pulse">
        {/* Label Skeleton (Selected category) */}
        <div className="h-2.5 w-16 bg-slate-100 rounded mb-2" />

        {/* Count Skeleton (Total Events) */}
        <div className="flex items-end gap-1">
          <div className="h-4 w-10 bg-slate-200 rounded" />
          <div className="h-2.5 w-8 bg-slate-100 rounded mb-0.5" />
        </div>
      </div>
    </div>
  );
}

export default TotalEventsPreviewSkeleton;
