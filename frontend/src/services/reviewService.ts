import api from "../api/axiosInstance";

// get all review data
export const handleGetReviewData = async (page: number) => {
  return await api.get("/review", {
    params: {
      page,
    },
  });
};

// post review
export const postReview = async (payload: {
  orderId: string;
  eventId: string;
  rating: number;
  title: string;
  description: string;
  isAnonymous: boolean;
}) => {
  return await api.post("/review", payload);
};

// get current order review
