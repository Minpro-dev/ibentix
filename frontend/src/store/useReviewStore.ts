import { create } from 'zustand';
import type { Review, User } from '../types/reviewType';
import { reviewService } from '../services/allReviewServices';


interface ReviewState {
  reviews: Review[];
  user: User;
  isLoading: boolean;
  error: string | null;
  fetchReviews: () => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  user: {
    name: 'Alex Rivers',
    role: 'Premium Member',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    impact: {
      helpfulVotes: 142,
      avgRating: 4.8,
      reviewPoints: '1.2k',
      topPercentage: 5,
    },
  },
  isLoading: false,
  error: null,

  fetchReviews: async () => {
    set({ isLoading: true });
    try {
      const reviews = await reviewService.getReviews();
      set({ reviews, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  deleteReview: async (id: string) => {
    try {
      await reviewService.deleteReview(id);
      set((state) => ({
        reviews: state.reviews.filter((r) => r.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
