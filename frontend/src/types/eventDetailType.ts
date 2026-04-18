export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  address: string;
  organizer: {
    name: string;
    avatar: string;
    eventsCreated: number;
    rating: number;
  };
  heroImage: string;
  mapImage: string;
  rating: number;
  reviewCount: number;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  isBestChoice?: boolean;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  comment: string;
  avatarColor?: string;
}