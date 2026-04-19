import { useState } from "react";
import {
  RiCalendarLine,
  RiMapPinLine,
  RiArrowRightLine,
  RiHeartLine,
  RiHeartFill,
} from "react-icons/ri";
import type { Event } from "../types/eventType";
import { formatCurrency } from "../lib/utils";
import { formatDate } from "../utils/dateFormatter";
import eventThumbnailImage from "./../assets/static/EventThumnailImage.jpg";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="group w-full max-w-70 mx-auto">
      {/* Image Container - Padding dikurangi agar lebih compact */}
      <div className="relative mb-4 overflow-hidden rounded-[28px] shadow-sm bg-white p-1.5 border border-zinc-100/50">
        <img
          src={event.thumbnailUrl || eventThumbnailImage}
          alt={event.slug}
          className="w-full aspect-3/4 object-cover rounded-[20px] transition-transform duration-700 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-white/40 transition-all hover:scale-110 active:scale-95">
          {isWishlisted ? (
            <RiHeartFill className="text-red-500 text-xl animate-in zoom-in-50" />
          ) : (
            <RiHeartLine className="text-zinc-400 text-xl" />
          )}
        </button>

        {/* Category Badge  */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[8px] font-extrabold uppercase tracking-widest text-indigo-700 border border-indigo-100/20">
          {event.category}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 bg-white px-3.5 py-2 rounded-xl shadow-lg border border-zinc-50">
          <span className="block text-[7px] uppercase font-black text-zinc-400 tracking-wider">
            Ticket Price
          </span>
          <span className="text-sm font-black text-indigo-700 tracking-tighter">
            {formatCurrency(Number(event.price))}
          </span>
        </div>
      </div>

      {/* Content Section  */}
      <div className="space-y-2 px-1">
        <div className="flex flex-col gap-1">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium">
            <RiCalendarLine className="text-indigo-400/70" size={12} />
            <span className="text-[9px] uppercase tracking-tighter font-semibold">
              {formatDate(event.eventDate)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-zinc-800 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-10">
            {event.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-zinc-400 font-medium">
            <RiMapPinLine className="text-indigo-400/70" size={12} />
            <span className="text-[10px] uppercase tracking-tighter font-semibold line-clamp-1">
              {event.city}
            </span>
          </div>
        </div>

        {/* Action Button  */}
        <button
          onClick={() => navigate(`/events/${event.slug}`)}
          className="w-full mt-1 py-2.5 bg-zinc-50 text-indigo-700 border border-zinc-100 text-[10px] font-bold uppercase tracking-widest rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
          Details
          <RiArrowRightLine className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
