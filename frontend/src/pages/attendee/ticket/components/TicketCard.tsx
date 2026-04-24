import {
  RiQrCodeLine,
  RiMapPin2Line,
  RiCalendarEventLine,
} from "react-icons/ri";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { capitalize } from "../../../../utils/capitalize";

interface TicketCardProps {
  eventTitle: string;
  location: string;
  date: string;
  attendeeName: string;
  ticketCode: string;
}

export default function TicketCard({
  eventTitle,
  location,
  date,
  attendeeName,
  ticketCode,
}: TicketCardProps) {
  return (
    <div className="relative flex w-full bg-white filter drop-shadow-sm mb-4 min-h-[160px]">
      <div className="flex-2 p-5 border-y border-l border-gray-100 rounded-l-3xl relative overflow-hidden">
        <div className="flex flex-col h-full justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
              Entry Ticket
            </span>
            <h3 className="font-bold text-gray-900 text-lg leading-tight mt-1 line-clamp-1">
              {eventTitle}
            </h3>

            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <RiCalendarEventLine className="text-indigo-500" />
                {format(new Date(date), "dd MMM yyyy", { locale: id })}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <RiMapPin2Line className="text-indigo-500" />
                {location}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-100 mt-4">
            <p className="text-[10px] text-gray-400">Attendee</p>
            <p className="font-semibold text-gray-800 text-sm">
              {capitalize(attendeeName)}
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-6 flex flex-col justify-center items-center bg-white border-y border-gray-100">
        <div className="absolute -top-3 w-6 h-6 bg-gray-50 rounded-full border-b border-gray-100" />
        <div className="h-full border-r border-dashed border-gray-200 my-4" />
        <div className="absolute -bottom-3 w-6 h-6 bg-gray-50 rounded-full border-t border-gray-100" />
      </div>

      <div className="flex-1 p-5 border-y border-r border-gray-100 rounded-r-3xl flex flex-col items-center justify-center bg-gray-50/50">
        <RiQrCodeLine size={48} className="text-gray-800 mb-2" />
        <p className="text-[9px] font-mono text-gray-400 uppercase tracking-tighter">
          Code
        </p>
        <p className="text-[10px] font-bold text-gray-800 font-mono">
          {ticketCode.split("-").pop()}
        </p>
      </div>
    </div>
  );
}
