export interface TicketHolder {
  attendeeName: string;
  attendeeEmail: string;
}

export interface createOrderPayloadType {
  eventId: string;
  isPointsUsed: boolean;
  eventCouponId: string | null;
  appCouponId: string | null;
  referralCouponId: string | null;
  tickets: TicketHolder[];
}
