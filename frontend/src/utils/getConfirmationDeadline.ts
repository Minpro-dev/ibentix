export const getConfirmationDeadline = (updatedAt: string | Date) => {
  const uploadDate = new Date(updatedAt);
  // Deadline: 3 hari (3 * 24 * 60 * 60 * 1000 ms)
  const deadline = new Date(uploadDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  const now = new Date();

  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) return "EXPIRED";

  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${remainingHours}h left`;
  if (remainingHours > 0) return `${remainingHours}h ${minutes}m left`;
  return `${minutes}m left`;
};
