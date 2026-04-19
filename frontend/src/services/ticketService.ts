import type { Ticket } from '../types/userType';

// Real-world dynamic images for better aesthetics
const IMAGES = {
  JAZZ: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000&auto=format&fit=crop',
  ART: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop',
  TECH: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1000&auto=format&fit=crop',
  PASTA: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000&auto=format&fit=crop'
};

export const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Sunset Jazz & Dine',
    price: 1250000,
    date: 'Saturday, 24 Oct 2023',
    location: 'Sky Lounge, Jakarta',
    imageUrl: IMAGES.JAZZ,
    status: 'DONE',
    seat: 'V-12',
    points: 250,
    gate: 'A-01',
    priority: 'Platinum'
  },
  {
    id: '2',
    title: 'Beyond Canvas: AI Art',
    price: 450000,
    date: 'Tomorrow, 14:00 PM',
    location: 'Digital Hub, BSD City',
    imageUrl: IMAGES.ART,
    status: 'PAYMENT_PENDING',
    expiresIn: '01:24:05',
    priority: 'Silver'
  },
  {
    id: '3',
    title: 'Cloud Architecture Expo',
    price: 200000,
    date: '12 Sep 2023',
    location: 'Hall 7 ICE BSD',
    imageUrl: IMAGES.TECH,
    status: 'REJECTED',
    reason: 'System Error'
  },
  {
    id: '4',
    title: 'Authentic Pasta Workshop',
    price: 750000,
    date: '30 Aug 2023',
    location: 'Kitchenette Studio',
    imageUrl: IMAGES.PASTA,
    status: 'EXPIRED',
    note: 'Unpaid'
  }
];

export const MOCK_USER = {
  name: 'Ranny',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop'
};

export async function fetchTickets(): Promise<Ticket[]> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_TICKETS), 800);
  });
}

export async function payTicket(id: string): Promise<boolean> {
  console.log(`Processing payment for ticket ${id}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1500);
  });
}
