export default function PromotionCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-zinc-100 rounded-2xl animate-pulse">
      <div className="flex gap-5 items-start">
        {/* Discount Badge Skeleton */}
        <div className="shrink-0 w-14 h-14 bg-zinc-100 rounded-xl" />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {/* Coupon Code Skeleton */}
            <div className="h-5 bg-zinc-200 rounded-md w-24" />
            {/* Tag Skeleton */}
            <div className="h-4 bg-zinc-100 rounded-full w-12" />
          </div>

          {/* Event Name Skeleton */}
          <div className="h-4 bg-zinc-100 rounded-md w-48" />

          {/* Date Skeleton */}
          <div className="flex items-center gap-1.5 pt-2">
            <div className="w-3 h-3 bg-zinc-100 rounded-full" />
            <div className="h-3 bg-zinc-100 rounded-md w-32" />
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-5">
        {/* Status Badge Skeleton */}
        <div className="h-6 bg-zinc-100 rounded-full w-20" />

        {/* Delete Icon Skeleton */}
        <div className="w-8 h-8 bg-zinc-100 rounded-lg" />
      </div>
    </div>
  );
}
