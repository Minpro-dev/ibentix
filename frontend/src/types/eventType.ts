export type EventCategory =
  | "MUSIC"
  | "NIGHTLIFE"
  | "WORKSHOP"
  | "CONFERENCE"
  | "EXHIBITION"
  | "SPORTS"
  | "FESTIVAL"
  | "COMMUNITY"
  | "OTHER";

export interface Event {
  address: string;
  availableSlot: number;
  city: string;
  createdAt: string;
  deletedAt?: string;
  description: string;
  endSellingDate: string;
  eventDate: string;
  eventId: string;
  isFree: boolean;
  category: EventCategory;
  locationName: string;
  organizerId: string;
  price: string;
  slug: string;
  startSellingDate: string;
  thumbnailUrl: string | null;
  title: string;
  updatedAt: string;
  userId: string;
}
