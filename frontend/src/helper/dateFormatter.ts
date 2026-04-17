export const formatDate = (
  dateString: string | Date,
  locale: string = "en-GB",
): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Jika tanggal tidak valid, kembalikan string kosong atau handle error
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
