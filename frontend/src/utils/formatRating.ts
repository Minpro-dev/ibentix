export const formatRating = (
  rating: number | string,
  truncate: boolean = false,
): string => {
  const num = typeof rating === "string" ? parseFloat(rating) : rating;

  if (isNaN(num) || num === 0) return "0,0";

  if (truncate) {
    return (Math.floor(num * 10) / 10).toFixed(1).replace(".", ",");
  }

  return num.toFixed(1).replace(".", ",");
};
