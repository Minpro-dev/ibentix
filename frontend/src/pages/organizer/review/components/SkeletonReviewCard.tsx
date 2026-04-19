export default function SkeletonReviewCard() {
  return (
    <div className="p-6 rounded-2xl border border-zinc-100 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* User Info & Review Text */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200"></div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-200 rounded w-32"></div>
              <div className="h-3 bg-zinc-100 rounded w-20"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-zinc-100 rounded w-full"></div>
            <div className="h-4 bg-zinc-100 rounded w-5/6"></div>
            <div className="h-4 bg-zinc-100 rounded w-2/3"></div>
          </div>
        </div>

        {/* Transaction Panel Skeleton */}
        <div className="w-full md:w-64 p-4 bg-zinc-50 rounded-xl space-y-3">
          <div className="h-4 bg-zinc-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-zinc-100 rounded w-full"></div>
            <div className="h-3 bg-zinc-100 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
