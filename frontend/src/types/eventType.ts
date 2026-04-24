import type { OrganizerProfile } from "./organizerProfileType";

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

export interface EventDetailsType {
  eventId: string;
  organizerId: string;
  userId: string;
  title: string;
  slug: string;
  description: string;
  availableSlot: number;
  thumbnailUrl: string | null;
  locationName: string;
  address: string;
  city: string;
  category: EventCategory;
  eventDate: string;
  startSellingDate: string;
  endSellingDate: string;
  isFree: boolean;
  price: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  organizer: OrganizerProfile;
}
