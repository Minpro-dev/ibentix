export function OrderPreviewSkeleton() {
  return (
    <div className="sticky top-12 space-y-6 animate-pulse">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
        {/* TITLE SKELETON */}
        <div className="h-6 w-32 bg-gray-100 rounded-md" />

        {/* PROMO SECTION SKELETON */}
        <div className="space-y-3">
          <div className="h-11 w-full bg-gray-50 rounded-xl" />
          <div className="h-11 w-full bg-gray-50 rounded-xl" />
        </div>

        {/* POINTS TOGGLE SKELETON */}
        <div className="flex items-center justify-between p-4 border border-dashed border-gray-200 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-100 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-100 rounded" />
              <div className="h-3 w-16 bg-gray-50 rounded" />
            </div>
          </div>
          <div className="w-10 h-5 bg-gray-100 rounded-full" />
        </div>

        {/* CALCULATION SKELETON */}
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-50 rounded" />
            <div className="h-4 w-24 bg-gray-50 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-32 bg-gray-50 rounded" />
            <div className="h-4 w-16 bg-gray-50 rounded" />
          </div>

          {/* TOTAL PAYMENT SKELETON */}
          <div className="flex justify-between pt-4 border-t border-gray-100">
            <div className="h-6 w-28 bg-gray-100 rounded" />
            <div className="h-6 w-32 bg-gray-100 rounded" />
          </div>
        </div>

        {/* BUTTON SKELETON */}
        <div className="w-full h-14 bg-gray-200 rounded-2xl" />
      </div>

      {/* FOOTER TEXT SKELETON */}
      <div className="flex flex-col items-center space-y-2">
        <div className="h-2 w-48 bg-gray-50 rounded" />
        <div className="h-2 w-32 bg-gray-50 rounded" />
      </div>
    </div>
  );
}
