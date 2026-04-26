// database & app environment
export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE_URL = process.env.DATABASE_URL;
export const DIRECT_URL = process.env.DIRECT_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;

// auth
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// nodemailer
export const EMAIL_USER = process.env.EMAIL_USER;
export const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;
console.log("cloudinaryName", CLOUDINARY_CLOUD_NAME);
