import { Calendar, MapPin, Heart } from "lucide-react";
import { motion } from "motion/react";

import { cn, formatCurrency } from "../lib/utils";
import type { Event } from "../types/eventType";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  // const { wishlistIds } = useEventStore();
  // const isWishlisted = wishlistIds.includes(event.id);
  const isEnded = new Date(event.eventDate) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // transition={{ delay: index * 0.1 }}
      className={cn(
        "group rounded-2xl overflow-hidden border transition-all duration-300",
        isEnded
          ? "bg-gray-50 border-gray-200 grayscale-[0.8] opacity-80"
          : "bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-200/50",
      )}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            !isEnded && "group-hover:scale-110",
          )}
          referrerPolicy="no-referrer"
        />

        {isEnded ? (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-gray-900/80 backdrop-blur-md text-white rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
              Event has ended
            </span>
          </div>
        ) : (
          event.badge && (
            <div className="absolute top-4 left-4">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm",
                  event.badge.includes("Limited")
                    ? "bg-indigo-100 text-brand-primary"
                    : "bg-orange-100 text-orange-700",
                )}>
                {event.badge}
              </span>
            </div>
          )
        )}

        <div
          className={cn(
            "absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-lg",
            isEnded && "opacity-50",
          )}>
          <Heart
            className={cn(
              "w-5 h-5",
              isEnded ? "text-gray-400" : "fill-red-500 text-red-500",
            )}
          />
        </div>
      </div>

      <div className="p-6">
        <h3
          className={cn(
            "font-display text-xl font-bold leading-tight mb-3 transition-colors",
            isEnded
              ? "text-gray-500"
              : "text-gray-900 group-hover:text-brand-primary",
          )}>
          {event.title}
        </h3>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
              {event.id === "1"
                ? "Starting from"
                : event.id === "2"
                  ? "Admission"
                  : "Ticket"}
            </p>
            <p
              className={cn(
                "text-xl font-extrabold font-display",
                isEnded ? "text-gray-400" : "text-brand-primary",
              )}>
              {formatCurrency(event.price)}
            </p>
          </div>

          <button
            disabled={isEnded}
            className={cn(
              "px-6 py-2.5 rounded-xl font-bold text-sm transition-all",
              isEnded
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-brand-primary text-white active:scale-95 shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary",
            )}>
            {isEnded ? "Ended" : "Book Now"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
