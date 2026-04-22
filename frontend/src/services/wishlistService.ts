import api from "../api/axiosInstance";

export const handleGetWishlist = async () => {
  const data = await api.get("/wishlist");

  return data;
};
