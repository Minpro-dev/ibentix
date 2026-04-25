export default function EventCardSkeleton() {
  return (
    <div className="w-full max-w-70 mx-auto animate-pulse">
      {/* Image Container Skeleton */}
      <div className="relative mb-4 overflow-hidden rounded-[28px] bg-white p-1.5 border border-zinc-100/50 shadow-sm">
        {/* Main Image Area */}
        <div className="w-full aspect-3/4 bg-zinc-100 rounded-[20px]" />

        {/* Wishlist Button Skeleton */}
        <div className="absolute top-4 right-4 p-5 bg-white/50 rounded-full w-10 h-10" />

        {/* Category Badge Skeleton */}
        <div className="absolute top-4 left-4 bg-white/50 w-16 h-5 rounded-lg" />

        {/* Price Tag Skeleton */}
        <div className="absolute bottom-4 right-4 bg-white px-3.5 py-2 rounded-xl w-24 h-12 shadow-sm">
          <div className="h-2 w-10 bg-zinc-100 rounded mb-1.5" />
          <div className="h-4 w-16 bg-zinc-200 rounded" />
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="space-y-3 px-1">
        <div className="flex flex-col gap-2">
          {/* Date Skeleton */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-zinc-100 rounded-full" />
            <div className="h-3 w-24 bg-zinc-100 rounded" />
          </div>

          {/* Title Skeleton (2 Lines) */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-zinc-200 rounded" />
            <div className="h-4 w-2/3 bg-zinc-200 rounded" />
          </div>

          {/* Location Skeleton */}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-zinc-100 rounded-full" />
            <div className="h-3 w-20 bg-zinc-100 rounded" />
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="w-full mt-1 h-10 bg-zinc-100 rounded-xl" />
      </div>
    </div>
  );
}
