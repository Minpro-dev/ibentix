export default function EventSelectorSkeleton() {
  return (
    <div className="border-b border-slate-100 last:border-0 animate-pulse">
      <div className="flex justify-between items-center py-4 px-6">
        <div className="flex gap-4 items-center">
          <div className="space-y-3">
            <div className="h-4 bg-zinc-200 rounded-md w-48" />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 bg-zinc-100 rounded-md w-20" />
                <div className="h-3 bg-zinc-50 rounded-md w-4" />
                <div className="h-3 bg-zinc-100 rounded-md w-20" />
              </div>

              <div className="h-3 bg-indigo-50/50 rounded-md w-16" />
            </div>
          </div>
        </div>

        <div className="w-6 h-6 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}
