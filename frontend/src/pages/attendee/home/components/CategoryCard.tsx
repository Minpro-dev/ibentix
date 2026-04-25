import { motion } from "framer-motion";
import { capitalize } from "../../../../utils/capitalize";

interface CategoryCardProps {
  label: string;
  icon: string;
  onClick: () => void;
}

export default function CategoryCard({
  label,
  icon,
  onClick,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer group min-w-17 md:min-w-22">
      {/* Icon Container */}
      <div className="w-12 h-12 md:w-15 md:h-15 bg-white border border-zinc-100 rounded-xl shadow-sm flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:shadow-indigo-100/50 transition-all duration-300">
        <span className="text-lg md:text-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
      </div>

      {/* Label */}
      <span className="text-[10px] font-base md:font-semibold md:text-xs text-zinc-500 group-hover:text-indigo-600 transition-colors text-center px-1">
        {capitalize(label)}
      </span>
    </motion.div>
  );
}
