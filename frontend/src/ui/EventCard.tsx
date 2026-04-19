import React from 'react';
import type { EventCardProps } from '../types/userType';

const ActivityCard: React.FC<EventCardProps> = ({ title, location, price, originalPrice, rating, imageUrl, discount }) => {
  return (
    <div className="min-w-[220px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <div className="relative h-40">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm line-clamp-2 mb-1">{title}</h3>
        <p className="text-gray-500 text-xs mb-2 flex items-center">📍 {location}</p>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-400 text-xs">⭐ {rating}</span>
        </div>
        <div className="mt-auto">
          {originalPrice && (
            <p className="text-gray-400 line-through text-[10px]">IDR {originalPrice.toLocaleString()}</p>
          )}
          <p className="text-orange-500 font-bold">IDR {price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;