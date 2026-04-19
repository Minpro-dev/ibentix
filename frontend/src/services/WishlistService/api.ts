import axios from 'axios';
import type { Event } from '../../types/wishlistType';

const api = axios.create({
  baseURL: (import.meta as any).env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    // In a real app, this would be an actual API call
    // const response = await api.get('/events');
    // return response.data;
    
    // Returning mock data for now to ensure UI works
    return [
      {
        id: '1',
        title: 'The Celestial Ball 2024',
        description: 'Elite gathering under the stars.',
        date: 'Saturday, 14 Dec • 19:00',
        location: 'The Ritz-Carlton, Jakarta',
        price: 2500000,
        currency: 'IDR',
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be4cce4e?auto=format&fit=crop&q=80&w=2070',
        badge: 'Limited Entry',
        category: 'Gala',
      },
      {
        id: '2',
        title: 'Midnight Jazz Sessions',
        description: 'Smooth jazz in an intimate setting.',
        date: 'Friday, 22 Nov • 22:00',
        location: 'Blue Note Lounge, Menteng',
        price: 850000,
        currency: 'IDR',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1932',
        badge: 'VIP Experience',
        category: 'Music',
      },
      {
        id: '3',
        title: 'Contemporary Art Private View',
        description: 'Exclusive first look at the new collection.',
        date: 'Wednesday, 04 Dec • 10:00',
        location: 'Art1 New Museum, Kemayoran',
        price: 350000,
        currency: 'IDR',
        image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=1888',
        category: 'Art',
      },
      {
        id: '4',
        title: 'Legacy Orchestral Gala',
        description: 'A night of classic symphonies.',
        date: 'Wednesday, 20 Mar • 19:00',
        location: 'Jakarta Concert Hall',
        price: 1200000,
        currency: 'IDR',
        image: 'https://images.unsplash.com/photo-1465847736664-2cf14746f89b?auto=format&fit=crop&q=80&w=2070',
        category: 'Classical',
        status: 'ended',
      },
    ];
  },
};

export default api;
