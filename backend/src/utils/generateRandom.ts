import { randomBytes } from "crypto";

export const generateOtp = (): string => {
  // generate 6 digits of random numbers
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateCouponCode = (): string => {
  return `REF-${randomBytes(5).toString("hex").toUpperCase()}`;
};

export const generateInvoiceNumber = (): string => {
  return `TRX-${randomBytes(8).toString("hex").toUpperCase()}`;
};

export const generateTicketCode = (): string => {
  return `E-IBENTIX-${randomBytes(5).toString("hex").toUpperCase()}`;
};

export const generateReferralCouponCode = (): string => {
  return `RC-${randomBytes(5).toString("hex").toUpperCase()}`;
};
