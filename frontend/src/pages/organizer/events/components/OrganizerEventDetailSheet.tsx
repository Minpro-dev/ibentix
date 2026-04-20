import {
  RiMapPin2Line,
  RiCalendarLine,
  RiTicketLine,
  RiMoneyDollarCircleLine,
  RiGroupLine,
  RiCloseLine,
  RiExternalLinkLine,
} from "react-icons/ri";
import { useFetchTicketData } from "../hooks/useFetchTicketData";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { formatDate } from "../../../../utils/dateFormatter";
import type { TicketDetails } from "../types/attendeeTypes";
import PaginationButton from "../../../../ui/PaginationButton";
import { useState } from "react";
import defaultProfile from "../../../../assets/static/EventThumnailImage.jpg";

interface EventDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}

const OrganizerEventDetailSheet = ({
  isOpen,
  onClose,
  event,
  // ticketData,
}: EventDetailSheetProps) => {
  const [page, setPage] = useState(1);
  const handlePagination = (page: number) => {
    setPage(page);
  };

  const { data, isLoading } = useFetchTicketData(event, isOpen, page); //FIXME
  const totalData = data?.data.data.totalData;
  const ticketData = data?.data.data.attendees;
  const totalPage = data?.data.data.totalPage;

  console.log(data?.data.data);

  if (!event) return null;

  // Revenue
  const totalRevenue = (totalData || 0) * Number(event.price);

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-60 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* SLIDER PANEL  */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[75%] lg:w-[65%] bg-zinc-50 z-70 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* STICKY HEADER */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-zinc-100 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <RiCloseLine size={24} className="text-zinc-400" />
            </button>
            <div>
              <h2 className="text-xl font-black text-zinc-900 tracking-tight">
                Event Management
              </h2>
              <p className="text-zinc-500 text-xs font-medium">
                Viewing full details for your event
              </p>
            </div>
          </div>
          <a
            href={`/events/${event.slug}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-50 text-zinc-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-zinc-100">
            Live Page <RiExternalLinkLine />
          </a>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="h-[calc(100%-88px)] overflow-y-auto p-6 md:p-10 space-y-10">
          {/* STATS OVERVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-4xl border border-zinc-100 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <RiMoneyDollarCircleLine size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  Total Revenue
                </p>
                <p className="text-2xl font-black text-zinc-900">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-4xl border border-zinc-100 shadow-sm flex items-center gap-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <RiTicketLine size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  Tickets Sold
                </p>
                <p className="text-2xl font-black text-zinc-900">
                  {totalData || 0}{" "}
                  <span className="text-sm text-zinc-300 font-medium">
                    / {event.availableSlot}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* EVENT DETAILS & ATTENDEES */}
            <div className="xl:col-span-2 space-y-10">
              {/* Image & Description */}
              <section className="bg-white border border-zinc-100 rounded-4xl overflow-hidden shadow-sm">
                <div className="aspect-video w-full bg-zinc-100 border-b border-zinc-50">
                  <img
                    src={event.thumbnailUrl || defaultProfile}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        Venue
                      </h4>
                      <p className="text-sm font-bold text-zinc-800 flex items-center gap-2">
                        <RiMapPin2Line className="text-indigo-500" />{" "}
                        {event.locationName}
                      </p>
                      <p className="text-xs text-zinc-500 leading-relaxed pl-6">
                        {event.address}, {event.city}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        Event Date
                      </h4>
                      <p className="text-sm font-bold text-zinc-800 flex items-center gap-2">
                        <RiCalendarLine className="text-indigo-500" />{" "}
                        {formatDate(event.eventDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ATTENDEE LIST */}
              <section className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <RiGroupLine className="text-indigo-500" />
                    <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">
                      Attendee List
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
                    Total: {ticketData?.length || 0}
                  </span>
                </div>

                <div className="bg-white border border-zinc-100 rounded-4xl overflow-hidden shadow-sm">
                  {/* SCROLLABLE CONTAINER */}
                  <div className="max-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-zinc-50 backdrop-blur-sm border-b border-zinc-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                            User
                          </th>
                          <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                            Ticket Code
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        {!ticketData?.length ? (
                          <tr className="hover:bg-zinc-50/30 transition-colors group">
                            <td className="px-8 py-4 font-mono text-xs text-zinc-300 ">
                              No data
                            </td>
                            <td className="px-8 py-4 font-mono text-xs text-zinc-300 ">
                              No data
                            </td>
                          </tr>
                        ) : (
                          ticketData?.map(
                            (attendee: TicketDetails, index: number) => (
                              <tr
                                key={index}
                                className="hover:bg-zinc-50/30 transition-colors group">
                                <td className="px-8 py-4 flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center overflow-hidden shrink-0">
                                    <span className="text-indigo-600 text-[10px] font-black uppercase tracking-tighter">
                                      {attendee.attendeeName?.[0]}
                                    </span>
                                  </div>
                                  <span className="text-sm font-bold text-zinc-800 capitalize group-hover:text-indigo-600 transition-colors">
                                    {attendee.attendeeName}
                                  </span>
                                </td>
                                <td className="px-8 py-4 font-mono text-xs text-zinc-500 font-bold">
                                  {attendee.ticketCode}
                                </td>
                              </tr>
                            ),
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* pagination */}
                  {page < 3 && (
                    <div className="flex  bg-zinc-50  justify-center py-3">
                      <PaginationButton
                        totalPage={totalPage}
                        onClick={handlePagination}
                        page={page}
                      />
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* RIGHT: CATEGORY & PRICE */}
            <section className="space-y-8">
              <div className="p-8 bg-zinc-900 rounded-4xl text-white space-y-4">
                <div className="flex justify-center">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                    Additional Information
                  </p>
                </div>
                <button className="w-full py-4 bg-white text-zinc-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-100 transition-all">
                  Category : {event.category}
                </button>
                <button className="w-full py-4 bg-zinc-800 text-zinc-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:text-white transition-all">
                  Base ticket price:{" "}
                  {Number(event.price) === 0
                    ? "FREE"
                    : formatCurrency(Number(event.price))}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizerEventDetailSheet;
