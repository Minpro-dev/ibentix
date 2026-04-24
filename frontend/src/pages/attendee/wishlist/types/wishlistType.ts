import type { Event } from "../../../../types/eventType";

export interface WishlistType {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  event: Event;
}
