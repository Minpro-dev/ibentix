export const OrganizerProfileCardSkeleton = () => {
  return (
    <div className="flex justify-between items-center py-3 px-5 border-b border-slate-200 animate-pulse">
      <div className="flex gap-4 items-center">
        {/* Avatar Skeleton */}
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-slate-200 ring-2 ring-slate-100 ring-offset-2" />
        </div>

        {/* Name Skeleton */}
        <div>
          <div className="h-4 bg-slate-200 rounded-md w-32" />
        </div>
      </div>

      {/* Action Icon Skeleton */}
      <div>
        <div className="w-6 h-6 bg-slate-200 rounded-md" />
      </div>
    </div>
  );
};
