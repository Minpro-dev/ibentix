import { RiStarFill } from "react-icons/ri";
import type { RatingDistribution } from "../types/ratingDistributionType";
import { formatRating } from "../../../../utils/formatRating";

interface ReviewSummaryProps {
  totalData: number;
  averageRatings: number;
  ratingDistribution: RatingDistribution[];
}

function ReviewSummary({
  totalData,
  averageRatings,
  ratingDistribution,
}: ReviewSummaryProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center border-b border-zinc-200 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium text-zinc-900 tracking-tight">
          Reviews
        </h1>
        <p className="text-zinc-400 text-sm">
          Feedback from attendees about organized events.
        </p>
      </div>

      {/* Average Rating Circle */}
      <div className="flex flex-col items-center justify-center space-y-2 border-x border-zinc-200">
        <span className="text-6xl font-light text-zinc-900">
          {formatRating(averageRatings)}
        </span>
        <div className="flex text-indigo-500 gap-0.5 text-xl">
          {[...Array(5)].map((_, i) => (
            <RiStarFill
              key={i}
              className={
                i < Math.round(averageRatings)
                  ? "text-indigo-500"
                  : "text-zinc-200"
              }
            />
          ))}
        </div>
        <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-widest">
          {totalData} Total Reviews
        </p>
      </div>

      {/* Rating Bars (Minimalist Style) */}
      <div className="space-y-2">
        {ratingDistribution?.map((item: RatingDistribution) => (
          <div
            key={item.rating}
            className="flex items-center gap-4 text-xs font-medium">
            <span className="w-2 text-zinc-400">{item.rating}</span>
            <div className="flex-1 h-1.5 bg-zinc-50 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{
                  width: `${(item?._count?.rating / totalData) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReviewSummary;
