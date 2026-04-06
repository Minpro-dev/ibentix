export const resetPasswordEmailTemplate = (
  resetUrl: string,
  fullName: string,
) => {
  return {
    subject: "Reset Your Password - ibentix",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #4f46e5; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: -0.5px;">ibentix</h1>
        </div>
        
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1e293b; margin-top: 0; font-size: 20px;">Hi, ${fullName}!</h2>
          <p style="line-height: 1.6; font-size: 16px;">We received a request to reset the password for your <strong>ibentix</strong> account. Click the button below to proceed:</p>

          <div style="text-align: center; margin: 35px 0;">
            <a href="${resetUrl}" style="
              background-color: #4f46e5;
              color: #ffffff;
              padding: 14px 28px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              display: inline-block;
              font-size: 16px;
            ">Reset Password</a>
          </div>

          <p style="line-height: 1.6; font-size: 14px; color: #475569;">
            This link will expire in <strong>15 minutes</strong> for security reasons.
          </p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          
          <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
            If the button above doesn't work, copy and paste the following URL into your browser: <br />
            <span style="color: #4f46e5; word-break: break-all;">${resetUrl}</span>
          </p>
        </div>

        <div style="text-align: center; padding: 20px; font-size: 12px; color: #94a3b8;">
          <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          <p>&copy; ${new Date().getFullYear()} ibentix. All rights reserved.</p>
        </div>
      </div>
    `,
  };
};
