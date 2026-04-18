import api from "../api/axiosInstance";

export const handleCreateOrganizerProfile = async (data: FormData) => {
  await api.post("/organizer-profile", data);
};

export const handleGetOrganizerProfiles = async () => {
  return await api.get("/organizer-profile");
};
