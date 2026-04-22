import api from "../api/axiosInstance";

// get all wishlist data
export const handleGetWishlist = async () => {
  const data = await api.get("/wishlist");

  return data;
};

// handle toggle wishlist
export const handleToggleWishlist = async (eventId: string) => {
  try {
    const res = await api.post(`/wishlist/${eventId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
