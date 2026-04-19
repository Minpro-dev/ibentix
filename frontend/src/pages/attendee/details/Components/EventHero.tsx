import { Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { formatDate } from "../../../../utils/dateFormatter";

interface HeroProps {
  title: string;
  eventDate: string;
  eventLocation: string;
  thumbnailUrl: string | undefined;
  city: string;
  price: string;
}

export function Hero({
  title,
  eventDate,
  eventLocation,
  thumbnailUrl,
  city,
  price,
}: HeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[400px] md:h-[600px] rounded-[32px] overflow-hidden group shadow-2xl">
      <img
        src={thumbnailUrl}
        alt="Midnight Resonance 2024"
        className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}>
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-[10px] md:text-xs font-bold tracking-widest mb-4 uppercase">
            {Number(price) ? "Paid Event" : "Free Event"}
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[0.9]">
            {title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-medium text-sm md:text-base">
                {formatDate(eventDate)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-medium text-sm md:text-base">
                {eventLocation}, {city}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
