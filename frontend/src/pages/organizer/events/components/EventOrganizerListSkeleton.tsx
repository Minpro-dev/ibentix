function EventOrganizerListSkeleton() {
  return (
    <div className="w-full">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 animate-pulse">
        <div className="flex flex-col items-center lg:flex-row gap-6">
          {/* Thumbnail Skeleton Area */}
          <div className="w-full lg:w-58 h-42 shrink-0 bg-slate-200 rounded-xl" />

          {/* Content Info Skeleton */}
          <div className="flex-1 min-w-0 w-full">
            <div className="block md:flex gap-10 justify-between items-start md:pb-10 pb-0">
              <div className="w-full md:w-[80%]">
                {/* Title Skeleton */}
                <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-3" />
                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              </div>

              {/* Price Skeleton */}
              <div className="w-full md:w-32 md:py-0 py-5">
                <div className="h-3 bg-slate-100 rounded w-12 mb-2" />
                <div className="h-5 bg-slate-200 rounded w-24" />
              </div>
            </div>

            {/* Metadata Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-200 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <div className="h-2 bg-slate-100 rounded w-10" />
                    <div className="h-3 bg-slate-200 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex lg:flex-col justify-end items-center gap-2 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
            <div className="h-9 bg-slate-200 rounded-md w-full lg:w-32" />
            <div className="h-9 bg-slate-200 rounded-md w-full lg:w-32" />
            <div className="hidden lg:block h-6 bg-slate-100 rounded-md w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventOrganizerListSkeleton;
