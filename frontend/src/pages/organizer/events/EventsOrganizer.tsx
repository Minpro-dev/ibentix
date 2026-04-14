import { useState } from "react";
import EventOrganizerList from "./components/EventOrganizerList";

function EventsOrganizer() {
  const [date, setDate] = useState("");
  console.log(date);
  return (
    <div>
      <div className="pb-8">
        <div className="flex gap-5 items-center">
          <div className="w-[50%]">
            <input
              placeholder="Search title, description, location..."
              type="text"
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
            <button className="border border-slate-200 py-2 px-4 text-zinc-600 bg-zinc-100 rounded-full text-xs cursor-pointer">
              Free
            </button>
          </div>
        </div>
      </div>
      <EventOrganizerList />
    </div>
  );
}

export default EventsOrganizer;
