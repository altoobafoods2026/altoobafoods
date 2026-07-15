import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useReviewStore = create(
  persist(
    (set) => ({
      reviews: [],
      addReview: (review) => 
        set((state) => ({
          reviews: [...state.reviews, { ...review, id: `user-${Date.now()}`, date: new Date().toISOString() }]
        })),
    }),
    {
      name: 'altooba-reviews', // unique name for localStorage key
    }
  )
);
