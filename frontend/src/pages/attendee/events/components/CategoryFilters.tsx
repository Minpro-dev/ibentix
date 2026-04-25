import React from "react";
import { formatCategory } from "../../../../utils/formatCategory";
import type { EventCategory } from "../../../../types/eventType";

const categories: EventCategory[] = [
  "MUSIC",
  "NIGHTLIFE",
  "WORKSHOP",
  "CONFERENCE",
  "EXHIBITION",
  "SPORTS",
  "FESTIVAL",
  "COMMUNITY",
  "OTHER",
];

interface TagBarProps {
  selectedCategory: EventCategory | null;
  onSelect: (category: EventCategory | null) => void;
}

const CategoryFilter: React.FC<TagBarProps> = ({
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2">
        {/* Tombol ALL */}
        <button
          onClick={() => onSelect(null)}
          className={`relative pb-3 text-xs sm:text-sm cursor-pointer tracking-wider transition-all duration-300 whitespace-nowrap ${
            selectedCategory === null
              ? "text-indigo-600"
              : "text-slate-500 hover:text-slate-600"
          }`}>
          All
          {selectedCategory === null && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300" />
          )}
        </button>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`relative pb-3 text-xs sm:text-sm cursor-pointer tracking-wider transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-slate-600"
              }`}>
              {formatCategory(cat)}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
