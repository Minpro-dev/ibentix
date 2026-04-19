import React from "react";
// import { useOrderStore } from "../../store/useOrderStore";
import { CalendarDays, MapPin } from "lucide-react";

export const ReviewEvent: React.FC = () => {
  // const event = useOrderStore((state) => state.event);
  // const totalTickets = event.tickets.reduce((sum, t) => sum + t.quantity, 0);

  return (
    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-[#0F172A] mb-8">
        Review Selected Event
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Event Image & Ticket Badge */}
        <div className="relative w-full md:w-56 h-36 flex-shrink-0">
          <img
            // alt={event.title}
            className="w-full h-full object-cover rounded-2xl shadow-sm"
            // src={event.imageUrl}
            referrerPolicy="no-referrer"
          />
          {/* Badge Biru di bawah gambar sesuai desain */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#0052CC] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
            {/* {totalTickets} Tickets */}
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-xl font-black text-[#0F172A] leading-tight mb-3">
            {/* {event.title} */}
          </h3>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-[#64748B]">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-[#0052CC]" />
              <span className="text-sm font-semibold">
                {/* {event.date} */}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#0052CC]" />
              <span className="text-sm font-semibold">
                {/* {event.location} */}
              </span>
            </div>
          </div>

          {/* Ticket Types Chips */}
          {/* <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-2">
            {event.tickets.map((ticket, idx) => (
              <span 
                key={idx} 
                className="bg-[#F1F5F9] text-[#475569] px-4 py-1.5 rounded-full text-xs font-bold border border-slate-100"
              >
                {ticket.quantity}x {ticket.type}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};
