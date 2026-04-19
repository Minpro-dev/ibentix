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
  locationName: string;
  organizerId: string;
  price: number;
  slug: string;
  startSellingDate: string;
  thumbnailUrl?: string;
  title: string;
  updatedAt: string;
  userId: string;
}
