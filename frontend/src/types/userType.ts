export interface UserStore {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE";
  address: string;
  countryId: string;
  role: "ATTENDEE" | "ORGANIZER";
  avatar: string | null;
  createdAt: string;
}

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
export type TicketStatus =
  | "DONE"
  | "PENDING_APPROVAL"
  | "PAYMENT_PENDING"
  | "REJECTED"
  | "EXPIRED"
  | "SUCCESS";

export interface Ticket {
  id: string;
  title: string;
  price: number;
  date: string;
  location: string;
  imageUrl: string;
  status: TicketStatus;
  seat?: string;
  points?: number;
  expiresIn?: string; // For PAYMENT_PENDING
  reason?: string; // For REJECTED
  note?: string; // For EXPIRED
  priority?: "Standard" | "Silver" | "Platinum";
  gate?: string;
}

export interface User {
  name: string;
  avatar: string;
}

export interface Event {
  id: string;
  title: string;
  category: "Music" | "Workshops" | "Seminars" | "Sports" | "Festivals";
  date: string;
  location: string;
  price: number;
  priceType: "Starting from" | "Fee" | "Admission" | "Early Bird";
  imageUrl: string;
}
export interface EventDetails {
  id: string;
  title: string;
  date: string;
  image: string;
  venue: string;
}

export interface TicketItem {
  type: string;
  seat: string;
  price: number;
}

export interface OrderSummary {
  event: EventDetails;
  ticket: TicketItem;
  serviceFee: number;
}

export interface UserProfile {
  name: string;
  role: string;
  points: number;
  avatar: string;
}

export enum TransactionStatus {
  WAITING_PAYMENT = "Waiting for Payment",
  WAITING_ADMIN = "Waiting for Admin to Approve",
  PENDING = "Verifying Payment",
  SUCCESS = "Payment Success",
  EXPIRED = "Expired",
  REJECTED = "Transaction Has Been Reject",
}
export interface EventSummary {
  id: string;
  title: string;
  date: string;
  price: number;
  currency: string;
  imageUrl: string;
}

export interface ReviewSubmission {
  eventId: string;
  rating: number;
  comment: string;
  photos: string[];
}
