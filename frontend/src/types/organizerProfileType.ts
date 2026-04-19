export interface OrganizerProfile {
  organizerId: string;
  userId: string;
  name: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
