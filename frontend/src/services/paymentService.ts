import type  { OrderSummary, UserProfile } from '../types/userType';
import { TransactionStatus } from '../types/userType';

// Simulated delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockUser: UserProfile = {
  name: 'Alex Rivera',
  role: 'Premium Member',
  points: 20000,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBALugAROHf8F0D_jSsCfV8U90YBksj31s_IKiIAxYU-A-0tgsL0gjNwAFt5akYPF-clx8GAVsTtC3RDKZNmDCoO0NbTklcXNdzbZrJp96a9BbjDCbkJ0Yb1bRvqEQ9vt5alSVc6YoRPRV-FL4BTGWJQIxFwxLDOH8FIinPMRPVWhoEoHwHtgeynf6_cPs3cmQsCEGPP64Y4xJsxP1BwgQdL9j-vCsbVEMYLZcT1vhcEmh4trJj6PEM0V7Sibxx484sX67Z-mtIqd30'
};

export const mockOrder: OrderSummary = {
  event: {
    id: '1',
    title: 'Stellar Symphony: Grand Opera Night',
    date: '24 Oct 2024, 19:00',
    venue: 'Grand Theatre Hall',
    image: 'https://images.unsplash.com/photo-1514525253361-bee243870eb2?q=80&w=1000&auto=format&fit=crop'
  },
  ticket: {
    type: 'VIP Section',
    seat: 'A-12',
    price: 1500000
  },
  serviceFee: 25000
};

export async function submitPaymentProof(file: File): Promise<{ success: boolean; status: TransactionStatus }> {
  console.log('Uploading proof:', file.name);
  await delay(2000); // Simulate upload and backend process
  return { success: true, status: TransactionStatus.PENDING };
}

export async function applyVoucher(code: string): Promise<{ discount: number }> {
  console.log('Applying voucher:', code);
  await delay(1000);
  if (code.toUpperCase() === 'WELCOME10') {
    return { discount: 50000 };
  }
  return { discount: 0 };
}
