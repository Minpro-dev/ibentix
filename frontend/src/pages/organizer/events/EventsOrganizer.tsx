import { useState } from "react";
import EventOrganizerList from "./components/EventOrganizerCard";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axiosInstance";
import type { Event } from "../../../types/eventType";
import { useDebounce } from "use-debounce";
import EventOrganizerListSkeleton from "./components/EventOrganizerListSkeleton";
import SearchInput from "../../../ui/SearchInput";
import PaginationButton from "../../../ui/PaginationButton";

function EventsOrganizer() {
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [isFree, setIsFree] = useState("");
  const [page, setPage] = useState(1);
  const [searchValue] = useDebounce(search, 800);

  const { data, isLoading } = useQuery({
    queryKey: ["events", searchValue, date, isFree, page],
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
  console.log("eventData -->", eventData);

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
          <SearchInput
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search title, description, location..."
          />

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
        {eventData?.totalPage > 1 && (
          <PaginationButton
            page={page}
            onClick={handlePagination}
            totalPage={eventData?.totalPage}
          />
        )}
      </div>
    </div>
  );
}

export default EventsOrganizer;
