import React from 'react';
import { EventCard } from './EventCardWishlist';
import { useEventStore } from '../store/useEventWishlistStore';
import { Loader2, HeartOff } from 'lucide-react';
import { motion } from 'motion/react';

export function EventGrid() {
  const { events, isLoading, error } = useEventStore();
  const { wishlistIds } = useEventStore();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Curating your experiences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-8 rounded-2xl text-center max-w-md mx-auto my-20">
        <p className="text-red-700 font-semibold mb-2">Error loading events</p>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
        <div className="w-24 h-24 mb-8 rounded-full bg-gray-100 flex items-center justify-center">
          <HeartOff className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">A Quiet Collection</h2>
        <p className="text-gray-500 font-sans mb-8 leading-relaxed">
          You haven't saved any experiences yet. Browse our curated calendar to find your next unforgettable moment.
        </p>
        <button className="bg-brand-primary text-white px-8 py-3.5 rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-brand-primary/25 hover:bg-brand-secondary">
          Explore Events
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => {
        const isWishlisted = wishlistIds.includes(event.id);
        return <EventCard key={event.id} event={event} index={index} />;
      })}
    </div>
  );
}
