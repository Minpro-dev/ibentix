import { Filter } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pt-8">
      <div className="max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-gray-900 mb-4">
          Curated Selections
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 text-lg md:text-xl font-sans leading-relaxed">
          Your personal collection of upcoming experiences, gala evenings, and
          private viewings waiting to be finalized.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3">
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm">
          <Filter className="w-4 h-4" />
          Refine
        </button>
      </motion.div>
    </div>
  );
}
