export interface TicketHolder {
  attendeeName: string;
  attendeeEmail: string;
}

export interface OrderFormValues {
  attendees: TicketHolder[];
}
