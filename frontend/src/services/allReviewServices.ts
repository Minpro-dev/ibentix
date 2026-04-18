
import type { Review } from '../types/reviewType';
import axios from 'axios';

// Mock data for initial state
export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    title: 'Jakarta Electronic Music Festival 2024',
    venue: 'Jakarta',
    rating: 5,
    date: 'Oct 12, 2023',
    comment: 'Absolutely phenomenal experience. The sound quality was world-class and the VIP concierge service made entering the venue seamless. A must-visit for any electronic music fan in SE Asia.',
    image: 'https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800',
    price: 1250000,
    status: 'Published',
  },
  {
    id: '2',
    title: 'Artisanal Dining Series',
    venue: 'Ubud',
    rating: 4,
    date: 'Nov 04, 2023',
    comment: 'The 7-course tasting menu was a journey of flavors. Every dish told a story. The sommelier was particularly knowledgeable.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
    status: 'Published',
  },
  {
    id: '3',
    title: 'Wellness Retreat Bali',
    venue: 'Sanur',
    rating: 5,
    date: 'Aug 22, 2023',
    comment: 'Pure bliss. From the morning yoga sessions to the locally sourced organic meals, this retreat redefined luxury wellness for me.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    status: 'Published',
  },
  {
    id: '4',
    title: 'Modern Art Exhibition: "Flow"',
    venue: 'National Gallery',
    rating: 3,
    date: 'May 15, 2023',
    comment: 'The curation was interesting, but the crowd management could have been better. Too many people in the smaller galleries made it hard to appreciate the digital installations.',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800',
    status: 'Published',
  },
];

export const reviewService = {
  getReviews: async () => {
    // Replace with real API call: return (await api.get('/reviews')).data;
    return MOCK_REVIEWS;
  },
  deleteReview: async (id: string) => {
    // await api.delete(`/reviews/${id}`);
    return id;
  },
  updateReview: async (id: string, data: Partial<Review>) => {
    // return (await api.put(`/reviews/${id}`, data)).data;
    return { id, ...data };
  }
};