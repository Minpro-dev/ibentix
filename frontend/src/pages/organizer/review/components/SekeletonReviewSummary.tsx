export function SkeletonReviewSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-b border-zinc-100 pb-12 animate-pulse">
      {/* Title & Desc Skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-zinc-200 rounded-lg w-3/4"></div>
        <div className="h-4 bg-zinc-100 rounded-md w-1/2"></div>
      </div>

      {/* Average Rating Circle Skeleton */}
      <div className="flex flex-col items-center justify-center space-y-4 border-x border-zinc-100">
        <div className="h-16 bg-zinc-200 rounded-2xl w-20"></div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-5 w-5 bg-zinc-100 rounded-full"></div>
          ))}
        </div>
        <div className="h-3 bg-zinc-100 rounded-md w-24"></div>
      </div>

      {/* Rating Bars Skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-3 w-2 bg-zinc-100 rounded"></div>
            <div className="flex-1 h-1.5 bg-zinc-100 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
