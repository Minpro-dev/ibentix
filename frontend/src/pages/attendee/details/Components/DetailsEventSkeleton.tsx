export function DetailsEventSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <header className="max-w-6xl mx-auto px-6 py-6">
        <div className="h-4 w-16 bg-gray-100 rounded" />
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="aspect-16/10 bg-gray-100 border border-gray-100" />

            <div className="mt-10 space-y-6">
              <div className="h-5 w-20 bg-gray-100" />

              <div className="space-y-3">
                <div className="h-12 w-3/4 bg-gray-100" />
                <div className="h-12 w-1/2 bg-gray-100" />
              </div>

              <div className="flex gap-8 pt-6 border-t border-gray-100">
                <div className="h-5 w-32 bg-gray-100" />
                <div className="h-5 w-24 bg-gray-100" />
              </div>
            </div>

            <div className="mt-16 pt-16 border-t border-gray-100 space-y-4">
              <div className="h-3 w-24 bg-gray-100 mb-8" />
              <div className="h-4 w-full bg-gray-50" />
              <div className="h-4 w-full bg-gray-50" />
              <div className="h-4 w-3/4 bg-gray-50" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-gray-100 p-10 space-y-12">
              <div className="h-3 w-24 bg-gray-100 mb-10" />

              <div className="space-y-2">
                <div className="h-10 w-40 bg-gray-100" />
                <div className="h-3 w-20 bg-gray-50" />
              </div>

              <div className="flex justify-between items-center py-6 border-b border-gray-50">
                <div className="h-4 w-16 bg-gray-100" />
                <div className="h-8 w-24 bg-gray-50 rounded-full" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-20 bg-gray-100" />
                <div className="h-8 w-32 bg-gray-100" />
              </div>

              <div className="h-16 w-full bg-gray-100" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
