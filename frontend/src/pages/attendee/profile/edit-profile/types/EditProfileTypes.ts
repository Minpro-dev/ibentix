export interface Coupon {
  id: number;
  code: string;
  description: string;
  expires: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  referralCode?: string;
  coupons?: Coupon[];
}

export interface EditProfileProps {
  isEditMode: boolean;
}
