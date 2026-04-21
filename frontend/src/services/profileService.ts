import api from "../api/axiosInstance";

export const handleGetProfile = async () => {
  const { data } = await api.get("/auth/details");
  return data.data;
};

export const handleEditProfile = async (values: FormData) => {
  const { data } = await api.patch("/auth/update-details", values, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
