import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";

const SLIDE_DATA = [
  {
    id: 1,
    title: "Discover Local Vibrant Events",
    desc: "From music festivals to tech workshops, find experiences that matter to you.",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070",
    tag: "Trending Now",
  },
  {
    id: 2,
    title: "Connect with the Community",
    desc: "Experience the most anticipated meetups in your city.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070",
    tag: "Meetups",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === SLIDE_DATA.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-100 md:h-120 overflow-hidden bg-zinc-900 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full">
          {/* Background Image */}
          <img
            src={SLIDE_DATA[index].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />

          {/* Indigo/Black Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-indigo/40 to-indigo-500/30 z-10" />

          {/* Content Wrapper */}
          <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-20 max-w-4xl">
            <motion.span
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block w-fit px-4 py-1.5  text-white text-sm rounded-full mb-6">
              {SLIDE_DATA[index].tag}
            </motion.span>

            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-7xl font-semibold text-white leading-[1.1] mb-6">
              {SLIDE_DATA[index].title}
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-300 text-sm md:text-md max-w-lg leading-relaxed mb-10">
              {SLIDE_DATA[index].desc}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
