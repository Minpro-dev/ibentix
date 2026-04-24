import { RiStarFill, RiUser3Line } from "react-icons/ri";

interface ReviewResultCardProps {
  rating: number;
  title: string;
  description: string;
  isAnonymous?: boolean;
}

export default function ReviewResultCard({
  rating,
  title,
  description,
}: ReviewResultCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
      <div className="space-y-4">
        {/* Header: User Info & Stars */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
              <RiUser3Line size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Your Review</p>
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <RiStarFill
                    key={i}
                    size={14}
                    className={i < rating ? "text-amber-400" : "text-gray-200"}
                  />
                ))}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Verified Review
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-gray-900 leading-tight">"{title}"</h4>
          <p className="text-sm text-gray-600 leading-relaxed italic">
            {description}
          </p>
        </div>

        <div className="pt-2">
          <p className="text-[10px] text-gray-400 font-medium italic">
            Thank you for sharing your experience! Your feedback helps the
            community.
          </p>
        </div>
      </div>
    </div>
  );
}
