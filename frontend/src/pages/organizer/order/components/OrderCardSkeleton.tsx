export default function OrderCardSkeleton() {
  return (
    <div className="bg-white border border-zinc-100 p-6 rounded-3xl animate-pulse">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Section 1: User & Event Info Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="flex gap-3 items-center">
            {/* Invoice Number Placeholder */}
            <div className="h-3 w-28 bg-zinc-100 rounded-full" />
            {/* Badge Placeholder */}
            <div className="h-6 w-20 bg-zinc-50 rounded-lg border border-zinc-100" />
          </div>

          <div className="space-y-3">
            {/* Event Title Placeholder */}
            <div className="flex items-center gap-3">
              <div className="h-6 w-2/3 bg-zinc-200 rounded-lg" />
              <div className="h-5 w-5 bg-zinc-100 rounded-md" />
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              {/* User Name Placeholder */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-100 rounded-full" />
                <div className="h-3 w-24 bg-zinc-100 rounded-full" />
              </div>
              {/* Date Placeholder */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-100 rounded-full" />
                <div className="h-3 w-20 bg-zinc-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Payment Detail & Proof Skeleton */}
        <div className="flex flex-col sm:flex-row items-start md:items-center gap-6 lg:px-8 lg:border-x lg:border-zinc-50">
          <div className="text-left lg:text-center min-w-30 space-y-2">
            {/* Ticket Quantity Placeholder */}
            <div className="h-2 w-16 bg-zinc-100 rounded-full mx-auto hidden lg:block" />
            <div className="h-2 w-16 bg-zinc-100 rounded-full lg:hidden" />

            {/* Total Amount Placeholder */}
            <div className="h-7 w-32 bg-indigo-50/50 rounded-xl" />
          </div>

          {/* View Proof Button Placeholder */}
          <div className="h-10 w-32 bg-zinc-50 rounded-xl border border-zinc-100" />
        </div>

        {/* Section 3: Actions Skeleton (Simulasi status WAITING_FOR_CONFIRMATION) */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-24 bg-zinc-100 rounded-2xl" />
          <div className="h-10 w-28 bg-zinc-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
