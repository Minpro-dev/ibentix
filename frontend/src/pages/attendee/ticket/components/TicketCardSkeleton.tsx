export default function TicketCardSkeleton() {
  return (
    <div className="relative flex w-full bg-white filter drop-shadow-sm mb-4 min-h-[160px] animate-pulse">
      <div className="flex-2 p-5 border-y border-l border-gray-100 rounded-l-3xl">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="h-3 w-20 bg-gray-100 rounded-full mb-3" />

            <div className="h-6 w-3/4 bg-gray-100 rounded-lg mb-4" />

            <div className="flex gap-4">
              <div className="h-3 w-24 bg-gray-50 rounded" />
              <div className="h-3 w-20 bg-gray-50 rounded" />
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-100 mt-4 space-y-2">
            <div className="h-2 w-16 bg-gray-50 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
          </div>
        </div>
      </div>

      <div className="relative w-6 flex flex-col justify-center items-center bg-white border-y border-gray-100">
        <div className="absolute -top-3 w-6 h-6 bg-gray-50 rounded-full border-b border-gray-100" />
        <div className="h-full border-r border-dashed border-gray-200 my-4" />
        <div className="absolute -bottom-3 w-6 h-6 bg-gray-50 rounded-full border-t border-gray-100" />
      </div>

      <div className="flex-1 p-5 border-y border-r border-gray-100 rounded-r-3xl flex flex-col items-center justify-center bg-gray-50/30">
        <div className="w-12 h-12 bg-gray-200 rounded-xl mb-3" />

        <div className="h-2 w-10 bg-gray-100 rounded mb-1" />

        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
