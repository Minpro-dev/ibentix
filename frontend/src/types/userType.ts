export type Role = "ATTENDEE" | "ORGANIZER";
export interface EventCardProps {
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  imageUrl: string;
  discount?: string;
}
export interface Profile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  points: number;
  equivalentValue: number;
  referralCode: string;
}

export interface Referral {
  id: number;
  name: string;
  initials: string;
  joined: string;
  points: number;
}

export interface Coupon {
  id: number;
  title: string;
  discount: string;
  type: string;
  description: string;
  expiry: string;
  color: "primary" | "tertiary";
}