import {
  Calendar,
  Edit3,
  ExternalLink,
  MapPin,
  Trash2,
  Users,
} from "lucide-react";
import Button from "../../../../ui/Button";
import type { Event } from "../../../../types/eventType";
import { formatDate } from "../../../../utils/dateFormatter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosInstance";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useState } from "react";
import EditEventSheet from "./EditEventSheet";
import OrganizerEventDetailSheet from "./OrganizerEventDetailSheet";

function EventOrganizerList({ event }: { event: Event }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEditClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEditOpen(true);
  };

  const handleDetailsClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (eventId: string) =>
      await api.delete(`/events/${eventId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted succefully");
    },

    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      toast.error(errorMessage);
    },
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Event!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, delete it!",

      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl px-5 py-2.5",
        cancelButton: "rounded-xl px-5 py-2.5",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };

  return (
    <div>
      <div className="group bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-all duration-200">
        <div className="flex flex-col items-center lg:flex-row gap-6">
          {/* 1. Thumbnail Area */}
          <div className="relative w-full lg:w-58 h-42 shrink-0">
            <img
              src={
                event.thumbnailUrl ||
                "https://media.nbclosangeles.com/2025/04/GettyImages-2210019547.jpg?quality=85&strip=all&resize=1200%2C675"
              }
              alt="demo"
              className="w-full h-full object-cover rounded-xl border border-slate-100"
            />
            <div className="absolute top-2 left-2">
              {Number(event.price) === 0 ? (
                <span
                  className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-indigo-100 text-indigo-700"
                `}>
                  Free
                </span>
              ) : null}
            </div>
          </div>

          {/* 2. Content Info */}
          <div className="flex-1 min-w-0">
            <div className="block md:flex gap-10 justify-between items-start md:pb-10 pb-0">
              <div
                onClick={() => handleDetailsClick(event)}
                className="w-[80%] cursor-pointer ">
                <h3 className="text-lg font-semibold text-zinc-900 truncate hover:text-indigo-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-zinc-500 line-clamp-2 mt-1 hover:text-indigo-600 transition-colors">
                  {event.description}
                </p>
              </div>
              <div className="w-full md:py-0 py-5">
                <p className="text-xs text-zinc-400 font-medium pb-2">Price</p>
                <p className="text-md font-semibold text-zinc-900">
                  Rp. {Number(event.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2 text-zinc-600">
                <Calendar size={16} className="text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">
                    Date
                  </span>
                  <span className="text-xs font-semibold">
                    {formatDate(event.eventDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-600">
                <MapPin size={16} className="text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">
                    Location
                  </span>
                  <span className="text-xs font-semibold truncate">
                    {event.city}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-600">
                <Users size={16} className="text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">
                    Slot available
                  </span>
                  <span className="text-xs font-semibold">
                    {event.availableSlot} Seats
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Action Buttons */}
          <div className="flex lg:flex-col justify-end items-center gap-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
            <Button
              onClick={() => handleEditClick(event)}
              variant="secondary"
              size="sm"
              className="w-full lg:w-32 cursor-pointer">
              <Edit3 size={14} />
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="w-full lg:w-32 border-red-200 text-red-600 bg-white hover:bg-red-50 cursor-pointer"
              onClick={() => handleDelete(event.eventId)}>
              <Trash2 size={14} />
              Delete
            </Button>
            <button className="p-2 cursor-pointer text-zinc-400 hover:text-indigo-600 transition-colors">
              <ExternalLink size={18} />
            </button>

            <EditEventSheet
              isOpen={isEditOpen}
              onClose={() => setIsEditOpen(false)}
              eventData={selectedEvent!}
            />

            <OrganizerEventDetailSheet
              isOpen={isDetailsOpen}
              onClose={() => setIsDetailsOpen(false)}
              event={selectedEvent!}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventOrganizerList;
