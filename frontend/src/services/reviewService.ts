import api from "../api/axiosInstance";

// get all review data
export const handleGetReviewData = async (page: number) => {
  return await api.get("/review", {
    params: {
      page,
    },
  });
};
