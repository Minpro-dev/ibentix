import { Ticket } from "../../generated/prisma/client";
import { transporter } from "../config/nodemailer.config";
import { paymentDoneTemplate } from "../utils/emailConfirmationTemplate";
import { otpEmailTemplate } from "../utils/otpEmailTemplate";
import { paymentRejectedTemplate } from "../utils/paymentRejectedTemplate";
import { resetPasswordEmailTemplate } from "../utils/resetPasswordEmailTemplate";

export const emailService = {
  // ---------- SEND OTP
  sendOtp: async (otp: string, email: string, fullName: string) => {
    try {
      const template = otpEmailTemplate(otp, fullName);
      const info = await transporter.sendMail({
        from: `Ibentix<${process.env.EMAIL_USER}>`,
        to: email,
        subject: template.subject,
        html: template.html,
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error while sending mail:", error);
    }
  },

  // --------- SEND RESET PASSWORD
  sendResetPassword: async (
    email: string,
    resetUrl: string,
    fullName: string,
  ) => {
    try {
      const template = resetPasswordEmailTemplate(resetUrl, fullName);
      const info = await transporter.sendMail({
        from: `Ibentix<${process.env.EMAIL_USER}>`,
        to: email,
        subject: template.subject,
        html: template.html,
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error while sending mail:", error);
    }
  },

  //---------- PAYMENT DONE NOTIF
  sendPaymentDoneConfirmation: async (email: string, eTicket: Ticket[]) => {
    try {
      const template = paymentDoneTemplate(eTicket);
      const info = await transporter.sendMail({
        from: `Ibentix<${process.env.EMAIL_USER}>`,
        to: email,
        subject: template.subject,
        html: template.html,
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error while sending mail:", error);
    }
  },

  //---------- PAYMENT DONE NOTIF
  sendPaymentRejectedConfirmation: async (orderId: string, email: string) => {
    try {
      const template = paymentRejectedTemplate(orderId);
      const info = await transporter.sendMail({
        from: `Ibentix<${process.env.EMAIL_USER}>`,
        to: email,
        subject: template.subject,
        html: template.html,
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error while sending mail:", error);
    }
  },
};
