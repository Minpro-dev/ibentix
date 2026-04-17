import { useState } from "react";
import EventOrganizerList from "./components/EventOrganizerList";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axiosInstance";
import type { Event } from "../../../types/eventType";
import { useDebounce } from "use-debounce";
import EventOrganizerListSkeleton from "./components/EventOrganizerListSkeleton";

function EventsOrganizer() {
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [isFree, setIsFree] = useState("");
  const [page, setPage] = useState(1);

  const [searchValue] = useDebounce(search, 800);

  const { data, isLoading } = useQuery({
    queryKey: ["event", searchValue, date, isFree, page],
    queryFn: async () => {
      return await api.get("/events/organizer/me", {
        params: {
          search: searchValue,
          eventDate: date,
          isFree,
          page,
        },
      });
    },
  });

  const eventData = data?.data.data;
  console.log(eventData);

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const handleFreeToggle = () => {
    setIsFree((isFree) => {
      if (isFree === "") {
        setPage(1);
        return "true";
      } else {
        return "";
      }
    });
  };

  return (
    <div>
      <div className="pb-8">
        <div className="flex gap-5 items-center">
          <div className="w-[50%]">
            <input
              placeholder="Search title, description, location..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 px-5 text-zinc-600 border placeholder:tracking-wider placeholder:text-sm border-slate-300 rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-300"
            />
          </div>

          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-slate-200 px-5 py-2 rounded-full text-zinc-600 font-light text-sm"
            />
          </div>

          <div>
            <button
              onClick={handleFreeToggle}
              className={`border ${isFree ? "border-indigo-500 text-zinc-100 bg-indigo-500" : "border-slate-200 text-zinc-600 bg-zinc-100"} py-2 px-4 rounded-full text-xs cursor-pointer`}>
              Free
            </button>
          </div>
        </div>
      </div>
      {/* EVENT lISTS */}
      {isLoading ? (
        <div className="flex flex-col gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventOrganizerListSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {eventData?.events?.map((event: Event, index: number) => {
            return <EventOrganizerList key={index} event={event} />;
          })}
        </div>
      )}

      {/* PAGINATION BUTTON */}
      <div className="pt-8 flex justify-center items-center">
        <div className="flex gap-4">
          {Array.from({ length: eventData?.totalPage }, (_, i) => (
            <button
              onClick={() => handlePagination(i + 1)}
              className={`btn ${page !== i + 1 ? "text-zinc-100 bg-indigo-500 border-indigo-500" : "text-white border-indigo-600 bg-indigo-600"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsOrganizer;
