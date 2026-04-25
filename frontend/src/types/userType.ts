export type Role = "ORGANIZER" | "ATTENDEE";

export interface UserStore {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE";
  address: string;
  countryId: string;
  isVerified: boolean;
  role: Role;
  avatar: string | null;
  createdAt: string;
}
