import { transporter } from "../config/nodemailer.config";
import { otpEmailTemplate } from "../utils/otpEmailTemplate";

export const emailService = {
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
};
