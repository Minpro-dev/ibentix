import { RiSparkling2Line, RiCompass3Line } from "react-icons/ri";
import TotalEventsPreviewSkeleton from "./TotalEventsPreviewSkeleton";

export default function BrowseHeader({
  totalEvents,
  isLoading,
}: {
  totalEvents: number;
  isLoading: boolean;
}) {
  return (
    <section className="mb-10 pb-4 border-b border-zinc-100/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Left Side: Title & Description */}
        <div className="space-y-3">
          <div className="flex pb-5 items-center gap-2 text-indigo-600">
            <RiSparkling2Line className="text-xl animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Discover Experiences
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none">
            Browse <span className="text-indigo-600">Events.</span>
          </h1>

          <p className="text-slate-500 text-sm md:text-base max-w-md leading-relaxed">
            Curated experiences in Indonesia's most vibrant cities. Find your
            next favorite memory.
          </p>
        </div>

        {/* Right Side: Badge Count */}
        <div className="flex items-center gap-4 bg-white border border-zinc-100 p-2 pl-4 rounded-2xl shadow-sm self-start md:self-auto">
          {isLoading ? (
            <TotalEventsPreviewSkeleton />
          ) : (
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 leading-none mb-1">
                Selected category
              </span>
              <span className="text-sm font-black text-slate-900">
                {totalEvents?.toLocaleString()}{" "}
                <span className="text-[10px] ml-0.5">
                  {totalEvents > 1 ? "Events" : "Event"}
                </span>
              </span>
            </div>
          )}
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-100 shadow-lg">
            <RiCompass3Line size={20} />
          </div>
        </div>
      </div>
    </section>
  );
}
