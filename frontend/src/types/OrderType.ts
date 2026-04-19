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

export interface PersonalDetails {
  fullName: string;
  email: string;
}

export interface OrderState {
  event: EventDetails;
  personalDetails: PersonalDetails;
  appCoupon: string;
  eventVoucher: string;
  referralCode: string;
  pointsToUse: number;
  isPointsEnabled: boolean;
  availablePoints: number;
  
  // Actions
  setPersonalDetails: (details: Partial<PersonalDetails>) => void;
  setAppCoupon: (code: string) => void;
  setEventVoucher: (code: string) => void;
  setReferralCode: (code: string) => void;
  setPointsToUse: (points: number) => void;
  togglePoints: () => void;
  
  // Computed values (handled in components usually, but can be helpers)
  subtotal: () => number;
  discounts: () => {
    appCoupon: number;
    eventVoucher: number;
    referralPoints: number;
  };
  total: () => number;
}
