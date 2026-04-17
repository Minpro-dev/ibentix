export const paymentRejectedTemplate = (orderId: string) => {
  return {
    subject: `Payment Rejected - Order #${orderId}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px 20px;">
        <div style="background-color: #ffffff; border-radius: 24px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-top: 6px solid #ef4444;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background-color: #4f46e5; width: 40px; height: 40px; border-radius: 10px; display: inline-block; line-height: 40px; color: white; font-weight: bold; font-size: 20px;">I</div>
            <h1 style="color: #4f46e5; margin: 10px 0 0 0; font-size: 24px; font-weight: 800;">Ibentix</h1>
          </div>

          <h2 style="color: #1e293b; font-size: 20px; text-align: center; margin-bottom: 8px;">Payment Unsuccessful</h2>
          <p style="color: #64748b; text-align: center; margin-bottom: 30px; font-size: 15px; line-height: 1.5;">
            Dear Sir/Madam, we're sorry to inform you that your payment for order <strong>#${orderId}</strong> was rejected by our system.
          </p>

          <div style="background-color: #fff1f2; border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 30px;">
            <p style="margin: 0; font-size: 14px; color: #9f1239; font-weight: 500;">
              Please check your payment details, create a new order, & upload a valid proof of transaction to secure your spot.
            </p>
          </div>


          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px;">
              Order ID: #${orderId}
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 5px;">
              If you have any questions, feel free to contact our support team.
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
