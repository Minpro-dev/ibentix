import { FRONTEND_URL } from "../config/dotenv.config";

export const otpEmailTemplate = (otp: string, fullName: string) => {
  const baseUrl = FRONTEND_URL || "http://localhost:5173";
  const verifyLink = `${baseUrl}/verify-email`;

  return {
    subject: "verify your email - ibentix",
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #4f46e5; text-transform: lowercase;">hello, ${fullName}!</h2>
        <p>thank you for signing up at <strong>ibentix</strong>. use the code below to verify your email address:</p>

        <div style="
          background: #f9fafb;
          padding: 30px;
          text-align: center;
          border-radius: 16px;
          margin: 25px 0;
          border: 1px solid #f3f4f6;
        ">
          <h1 style="
            letter-spacing: 10px;
            color: #1f2937;
            font-size: 40px;
            margin: 0;
          ">${otp}</h1>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">or click the button below to go directly to the verification page:</p>
          <a href="${verifyLink}" style="
            background-color: #4f46e5;
            color: white;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: bold;
            font-size: 14px;
            display: inline-block;
            text-transform: lowercase;
          ">verify email address</a>
        </div>

        <p style="font-size: 13px; color: #9ca3af;">
          this otp will expire in <strong style="color: #374151;">5 minutes</strong>. 
          if you didn't request this, please ignore this email.
        </p>
        
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin-top: 40px;">
        <p style="font-size: 11px; color: #9ca3af; text-align: center; text-transform: lowercase;">
          sent by ibentix — making events easier.
        </p>
      </div>
    `,
  };
};
