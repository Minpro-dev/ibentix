export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  currency: string;
  image: string;
  badge?: string;
  category: string;
  isWishlisted?: boolean;
  status?: 'active' | 'ended';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}