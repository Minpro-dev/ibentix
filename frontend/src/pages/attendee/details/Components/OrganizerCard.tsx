import { RiStarFill, RiVerifiedBadgeFill, RiUser3Fill } from "react-icons/ri";
import { formatRating } from "../../../../utils/formatRating";

interface OrganizerCardProps {
  name: string;
  image?: string | null;
  averageRating: number;
}

export default function OrganizerCard({
  name,
  image,
  averageRating,
}: OrganizerCardProps) {
  return (
    <div className="bg-white flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Organizer Image */}
        <div className="relative">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-14 h-14 rounded-2xl object-cover border border-gray-100"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
              <RiUser3Fill size={28} />
            </div>
          )}
          {/* Verified Badge Overlay */}
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
            <RiVerifiedBadgeFill className="text-indigo-500" size={18} />
          </div>
        </div>

        {/* Organizer Info */}
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 tracking-wider">
            Organized by
          </p>
          <h4 className="text-zinc-600 leading-tight">{name}</h4>
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex items-center  px-2 py-0.5 rounded-lg ">
              <RiStarFill className="text-indigo-400 mr-1" size={12} />
              <span className="text-[11px] text-indigo-700">
                {averageRating > 0 ? formatRating(averageRating) : "New"}
              </span>
            </div>
            <span className="text-[11px] text-gray-400">• Organizer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
