interface BandgeStyleObj {
  [key: string]: string;
}

export const BADGE_STYLE: BandgeStyleObj = {
  WAITING_FOR_ADMIN_CONFIRMATION: "warning",
  DONE: "accent",
  REJECTED: "error",
  CANCELED: "error",
  EXPIRED: "error",
};
