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