export default function OrderCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-28 h-28 bg-gray-100 rounded-xl shrink-0" />

        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <div className="h-5 w-24 bg-gray-100 rounded-full" />
            <div className="h-3 w-32 bg-gray-50 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-5 w-3/4 bg-gray-100 rounded" />
          </div>

          <div className="flex gap-4">
            <div className="h-3 w-20 bg-gray-50 rounded" />
            <div className="h-3 w-16 bg-gray-50 rounded" />
          </div>

          <div className="pt-2 flex justify-between items-end">
            <div className="space-y-2">
              <div className="h-2 w-16 bg-gray-50 rounded" />
              <div className="h-5 w-28 bg-gray-100 rounded" />
            </div>

            <div className="h-9 w-28 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
