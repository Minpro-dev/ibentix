import type { Event } from "../../../../types/eventType";

export type PaymentStatus =
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_ADMIN_CONFIRMATION"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

export interface TicketDetail {
  ticketId: string;
  ticketCode: string;
  attendeeName: string;
  attendeeEmail: string;
}

export interface PaymentDetail {
  paymentId: string;
  paymentProof: string | null;
  paymentStatus:
    | "WAITING_FOR_PAYMENT"
    | "WAITING_FOR_ADMIN_CONFIRMATION"
    | "DONE"
    | "REJECTED"
    | "EXPIRED"
    | "CANCELED";
  updatedAt: string;
}

export interface OrderListItem {
  orderId: string;
  invoiceNumber: string;
  ticketQuantity: number;
  totalAmount: string;
  createdAt: string;
  expiresAt: string;
  tickets: TicketDetail[];
  payment: PaymentDetail;
  event: Event;
}

export interface OrderListResponse {
  data: OrderListItem[];
  totalPage: number;
}
