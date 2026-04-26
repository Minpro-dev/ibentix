import nodemailer from "nodemailer";
import { EMAIL_USER, GOOGLE_APP_PASSWORD } from "./dotenv.config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: GOOGLE_APP_PASSWORD,
  },
});
