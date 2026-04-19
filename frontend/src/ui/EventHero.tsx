import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[400px] md:h-[600px] rounded-[32px] overflow-hidden group shadow-2xl"
    >
      <img 
        src="https://picsum.photos/seed/techno/1920/1080" 
        alt="Midnight Resonance 2024"
        className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-[10px] md:text-xs font-bold tracking-widest mb-4 uppercase">
            Premium Event
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[0.9]">
            Midnight Resonance 2024
          </h1>
          
          <div className="flex flex-wrap gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-medium text-sm md:text-base">Oct 24, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-medium text-sm md:text-base">JIEXPO Kemayoran, Jakarta</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
