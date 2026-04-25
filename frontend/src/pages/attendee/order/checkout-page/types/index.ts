export interface Ticket {
  type: string;
  quantity: number;
  price: number;
}

export interface EventDetails {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  tickets: Ticket[];
}

export interface TicketHolder {
  fullName: string;
  email: string;
  isSaved?: boolean;
}

export interface OrderState {
  event: EventDetails;
  ticketHolders: TicketHolder[];
  appCoupon: string;
  eventVoucher: string;
  referralCode: string;
  pointsToUse: number;
  isPointsEnabled: boolean;
  availablePoints: number;
  
  // Actions
  setAvailablePoints: (points: number) => void;
  setEvent: (event: EventDetails) => void;
  setTicketHolder: (index: number, details: Partial<TicketHolder>) => void;
  syncTicketHolders: () => void;
  setAppCoupon: (code: string) => void;
  setEventVoucher: (code: string) => void;
  setReferralCode: (code: string) => void;
  setPointsToUse: (points: number) => void;
  togglePoints: () => void;
  fetchAutoCoupons: () => Promise<void>;
  
  // Computed values
  subtotal: () => number;
  discounts: () => {
    appCoupon: number;
    eventVoucher: number;
    referralPoints: number;
  };
  total: () => number;
}
