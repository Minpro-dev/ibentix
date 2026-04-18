export interface Event {
  address: string;
  availableSlot: number;
  city: string;
  createdAt: Date;
  deletedAt?: Date;
  description: string;
  endSellingDate: Date;
  eventDate: Date;
  eventId: string;
  isFree: boolean;
  locationName: string;
  organizerId: string;
  price: number;
  slug: string;
  startSellingDate: Date;
  thumbnailUrl?: string;
  title: string;
  updatedAt: Date;
  userId: string;
}
