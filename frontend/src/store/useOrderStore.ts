import { create } from 'zustand';
import type { OrderState } from '../types/OrderType';

export const useOrderStore = create<OrderState>((set, get) => ({
  event: {
    id: 'evt-001',
    title: 'Midnight Resonance 2024',
    date: 'Dec 14, 2024',
    location: 'Jakarta International Stadium',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIiGXht1R6RCDasnR4DFJE3w0NRwHp_9vGHNkcJCbOne8f9xFhMqntZRRBXWfN0qeqsXyEwlpvo_o3ndWj-pjBRbB68W57GocrIKwn8PpogTZ8AhghLC_Vlzt04bO_eEATpVAjqnYy3JqnMbMDCS6UtE1tkksONoM_CDhONFJPlMGJK0qcmx5rSRn3_3Rha_hcGTWgS-_rr1TQvlOekLxccM1h_44FD0iZZDxCop16C84vOpuRgczvU2QBp6phsZnHigmAMU6YCFcI',
    tickets: [
      { type: 'VIP Backstage', quantity: 1, price: 2500000 },
      { type: 'General Admission', quantity: 1, price: 850000 }
    ]
  },
  personalDetails: {
    fullName: '',
    email: ''
  },
  appCoupon: '',
  eventVoucher: '',
  referralCode: '',
  pointsToUse: 0,
  isPointsEnabled: false,
  availablePoints: 2500,

  setPersonalDetails: (details) => set((state) => ({
    personalDetails: { ...state.personalDetails, ...details }
  })),
  setAppCoupon: (code) => set({ appCoupon: code }),
  setEventVoucher: (code) => set({ eventVoucher: code }),
  setReferralCode: (code) => set({ referralCode: code }),
  setPointsToUse: (points) => set({ pointsToUse: points }),
  togglePoints: () => set((state) => ({ isPointsEnabled: !state.isPointsEnabled })),

  subtotal: () => {
    const { event } = get();
    const ticketsTotal = event.tickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
    const serviceFee = 15000;
    return ticketsTotal + serviceFee;
  },

  discounts: () => {
    const { appCoupon, isPointsEnabled, pointsToUse } = get();
    return {
      appCoupon: appCoupon.toUpperCase() === 'APP-DISCOUNT' ? 10000 : 0,
      eventVoucher: 0, // Mock
      referralPoints: isPointsEnabled ? pointsToUse * 4 : 0 // Mock conversion: 1 point = Rp 4
    };
  },

  total: () => {
    const sub = get().subtotal();
    const { appCoupon, eventVoucher, referralPoints } = get().discounts();
    return Math.max(0, sub - appCoupon - eventVoucher - referralPoints);
  }
}));
