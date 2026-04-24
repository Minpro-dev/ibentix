import { create } from 'zustand';
import type { OrderState } from '../types';
import { eventService } from '../services/api';

export const useOrderStore = create<OrderState>((set, get) => ({
  event: {
    id: '',
    title: '',
    date: '',
    location: '',
    imageUrl: '',
    tickets: []
  },
  ticketHolders: [],
  appCoupon: '',
  eventVoucher: '',
  referralCode: '',
  pointsToUse: 0,
  isPointsEnabled: false,
  availablePoints: 0,

  setAvailablePoints: (points) => set({ availablePoints: points }),
  setEvent: (event) => set({ event }),

  setTicketHolder: (index, details) => set((state) => {
    const newHolders = [...state.ticketHolders];
    newHolders[index] = { ...newHolders[index], ...details };
    return { ticketHolders: newHolders };
  }),

  syncTicketHolders: () => {
    const { event } = get();
    const totalQuantity = event.tickets.reduce((sum, t) => sum + t.quantity, 0);
    set((state) => {
      const currentCount = state.ticketHolders.length;
      if (currentCount === totalQuantity) return state;
      
      const newHolders = [...state.ticketHolders];
      if (currentCount < totalQuantity) {
        for (let i = currentCount; i < totalQuantity; i++) {
          newHolders.push({ fullName: '', email: '', isSaved: false });
        }
      } else {
        newHolders.length = totalQuantity;
      }
      return { ticketHolders: newHolders };
    });
  },

  setAppCoupon: (code) => set({ appCoupon: code }),
  setEventVoucher: (code) => set({ eventVoucher: code }),
  setReferralCode: (code) => set({ referralCode: code }),
  setPointsToUse: (points) => set({ pointsToUse: points }),
  togglePoints: () => set((state) => ({ isPointsEnabled: !state.isPointsEnabled })),

  fetchAutoCoupons: async () => {
    try {
      const coupons = await eventService.getAvailableCoupons();
      set({ 
        appCoupon: coupons.appCoupon,
        eventVoucher: coupons.eventVoucher
      });
    } catch (error) {
      console.error('Failed to fetch coupons', error);
    }
  },

  subtotal: () => {
    const { event } = get();
    const ticketsTotal = event.tickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
    const serviceFee = 15000;
    return ticketsTotal + serviceFee;
  },

  discounts: () => {
    const { appCoupon, eventVoucher, isPointsEnabled, pointsToUse } = get();
    return {
      appCoupon: appCoupon.toUpperCase() === 'APP-DISCOUNT' ? 10000 : 0,
      eventVoucher: eventVoucher.toUpperCase() === 'EVENT-BOOST' ? 25000 : 0,
      referralPoints: isPointsEnabled ? pointsToUse * 4 : 0
    };
  },

  total: () => {
    const sub = get().subtotal();
    const { appCoupon, eventVoucher, referralPoints } = get().discounts();
    return Math.max(0, sub - appCoupon - eventVoucher - referralPoints);
  }
}));
