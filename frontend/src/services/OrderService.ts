import { toast } from "sonner";
import api from "../api/axiosInstance";

// create order -> untuk dipanggil di payment
export const handleCreateOrder = async (data: any) => {
  const res = await api.post("/order", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

// // get all order
// export const getAllOrder = async (orderId: string) => {
//   const res = await api.get("/order", d, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return res;
// };

// // delete event
// export const handleDeleteEvent = async (eventId: string) => {
//   try {
//     await api.delete(`/events/${eventId}`);
//     toast.success("Event has been deleted");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const handleGetAllEvent = async (
//   search: string,
//   eventDate?: Date,
//   isFree?: string,
//   page?: number,
// ) => {
//   try {
//     const res = await api.get("/events/organizer/me", {
//       params: {
//         search,
//         eventDate,
//         isFree,
//         page,
//       },
//     });
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };
