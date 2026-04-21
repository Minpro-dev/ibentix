import api from "../api/axiosInstance";

export const handleGetDashboardStats = async (range: string) => {
  const { data } = await api.get("/organizer/statistics", {
    params: { range },
  });
  return data.data;
};
