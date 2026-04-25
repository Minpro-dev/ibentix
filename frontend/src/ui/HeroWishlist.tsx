import { motion } from "framer-motion";
import { RiSparkling2Line } from "react-icons/ri";

export function Hero() {
  return (
    <div
      className="flex flex-col gap-4 px-8 pb-16
     max-w-3xl">
      <div className="flex pb-5 items-center gap-2 text-indigo-600">
        <RiSparkling2Line className="text-xl animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
          Your Choices
        </span>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-800">
        Curated Selections
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="text-base md:text-lg text-zinc-500 leading-relaxed font-normal">
        Your personal collection of upcoming experiences, gala evenings, and
        private viewings waiting to be finalized.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="h-px w-12 bg-indigo-500/30 mt-2 origin-left"
      />
    </div>
  );
}
