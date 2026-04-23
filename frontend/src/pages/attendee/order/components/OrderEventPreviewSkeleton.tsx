export function OrderEventPreviewSkeleton() {
  return (
    <section className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm animate-pulse">
      <div className="w-24 h-24 bg-gray-100 rounded-xl shrink-0" />

      <div className="flex flex-col justify-center flex-1 space-y-3">
        <div className="h-5 w-3/4 bg-gray-100 rounded" />

        <div className="h-4 w-1/2 bg-gray-50 rounded" />

        <div className="h-3 w-16 bg-indigo-50/50 rounded mt-2" />
      </div>
    </section>
  );
}
