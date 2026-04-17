import { Ticket } from "../../generated/prisma/client";

export const paymentDoneTemplate = (tickets: Ticket[]) => {
  // Generate HTML untuk setiap tiket dalam array
  const ticketsHtml = tickets
    .map(
      (ticket) => `
    <div style="
      border: 2px dashed #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 15px;
      background-color: #ffffff;
      position: relative;
    ">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div style="flex: 1;">
          <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Attendee Name</p>
          <p style="margin: 4px 0 12px 0; font-size: 16px; color: #1e293b; font-weight: bold;">${ticket.attendeeName.toUpperCase()}</p>
          
          <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Ticket Code</p>
          <p style="margin: 4px 0 0 0; font-size: 18px; color: #4f46e5; font-weight: 800; font-family: 'Courier New', Courier, monospace;">${ticket.ticketCode}</p>
        </div>
        <div style="text-align: right;">
           <div style="background: #f0fdf4; color: #16a34a; padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: bold; display: inline-block;">
            VALID TICKET
           </div>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  return {
    subject: "Payment Accepted - Your Ibentix E-Tickets are Here!",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px 20px;">
        <div style="background-color: #ffffff; border-radius: 24px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background-color: #4f46e5; width: 40px; height: 40px; border-radius: 10px; display: inline-block; line-height: 40px; color: white; font-weight: bold; font-size: 20px;">I</div>
            <h1 style="color: #4f46e5; margin: 10px 0 0 0; font-size: 24px; font-weight: 800;">Ibentix</h1>
          </div>

          <h2 style="color: #1e293b; font-size: 20px; text-align: center; margin-bottom: 8px;">Payment Successful!</h2>
          <p style="color: #64748b; text-align: center; margin-bottom: 30px; font-size: 15px; line-height: 1.5;">
            Your payment has been confirmed. Below are your official e-tickets for the event. Please show the ticket code at the entrance.
          </p>

          <div style="margin-bottom: 30px;">
            ${ticketsHtml}
          </div>

          <div style="border-top: 1px solid #e2e8f0; pt: 20px; text-align: center;">
            <p style="color: #94a3b8; font-size: 13px; margin-top: 20px;">
              Order ID: <span style="color: #475569;">#${tickets[0]?.orderId || "N/A"}</span>
            </p>
            <p style="color: #94a3b8; font-size: 12px;">
              If you have any issues, contact our support at support@ibentix.com
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #cbd5e1; font-size: 11px;">
          &copy; 2026 Ibentix Event Management. All rights reserved.
        </div>
      </div>
    `,
  };
};
