// ─── Payment & Ticket Status ────────────────────────────────────────────────

export type PaymentStatus =
  | "WAITING_FOR_ADMIN_CONFIRMATION"
  | "DONE"
  | "CANCELED"
  | "EXPIRED"
  | "REJECTED";

// ─── Core Ticket (matches Prisma `tickets` table) ───────────────────────────

export interface Ticket {
  ticketId: string;
  ticketCode: string;
  orderId: string;
  userId: string;
  attendeeName: string;
  attendeeEmail: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  // Populated via Order → Payment join
  order?: Order;
}

// ─── Order (joined with Payment + Tickets) ──────────────────────────────────

export interface Order {
  orderId: string;
  userId: string;
  eventId: string;
  paymentId: string;
  pointsUsed: number | null;
  referralCouponId: string | null;
  eventCouponId: string | null;
  createdAt: string;
  updatedAt: string;

  payment?: Payment;
  tickets?: Ticket[];
  event?: Event;
}

// ─── Payment ────────────────────────────────────────────────────────────────

export interface Payment {
  paymentId: string;
  paymentStatus: PaymentStatus;
  paymentProof: string | null;
  paymentAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Event (minimal, for display on ticket card) ────────────────────────────

export interface Event {
  eventId: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl?: string;
}
