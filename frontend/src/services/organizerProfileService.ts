import api from "../api/axiosInstance";

// create profile
export const handleCreateOrganizerProfile = async (data: FormData) => {
  await api.post("/organizer-profile", data);
};

// get all profiles
export const handleGetOrganizerProfiles = async () => {
  return await api.get("/organizer-profile");
};

// delete profile
export const handleDeleteOrganizerProfile = async (id: string) => {
  await api.delete(`/organizer-profile/${id}`);
};
