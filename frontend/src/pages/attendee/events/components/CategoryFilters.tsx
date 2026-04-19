import React from "react";
import { formatCategory } from "../../../../utils/formatCategory";

const categories = [
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
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<TagBarProps> = ({
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="w-full border-b border-slate-100">
      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2">
        {/* Tombol ALL */}
        <button
          onClick={() => onSelect("")}
          className={`relative pb-3 text-sm cursor-pointer tracking-widest transition-all duration-300 whitespace-nowrap ${
            selectedCategory === ""
              ? "text-indigo-600"
              : "text-slate-400 hover:text-slate-600"
          }`}>
          All
          {selectedCategory === "" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300" />
          )}
        </button>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`relative pb-3 text-sm cursor-pointer tracking-widest transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? "text-indigo-600"
                  : "text-slate-400 hover:text-slate-600"
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
