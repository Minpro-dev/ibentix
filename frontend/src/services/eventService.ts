import { toast } from "sonner";
import api from "../api/axiosInstance";

// create event
export const handleCreateEvent = async (data: FormData) => {
  const res = await api.post("/events", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

// delete event
export const handleDeleteEvent = async (eventId: string) => {
  try {
    await api.delete(`/events/${eventId}`);
    toast.success("Event has been deleted");
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAllEvent = async (
  search: string,
  eventDate?: Date,
  isFree?: string,
  page?: number,
) => {
  try {
    const res = await api.get("/events/organizer/me", {
      params: {
        search,
        eventDate,
        isFree,
        page,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
