import type { Event } from "../../../../types/eventType";

export interface EventCouponResponse {
  eventCouponId: string;
  couponCode: string;
  discountAmount: string;
  eventId: string;
  userId: string;
  validFrom: string; // ISO Date String
  validUntil: string; // ISO Date String
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  event: Event;
}
