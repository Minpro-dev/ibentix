import {
  RiStarFill,
  RiTicket2Line,
  RiTimeLine,
  RiUser3Line,
} from "react-icons/ri";
import { formatDate } from "../../../../utils/dateFormatter";
import { capitalize } from "../../../../utils/capitalize";

interface ReviewCardProps {
  firstName: string;
  lastName: string;
  isAnonymous: boolean;
  title: string;
  description: string;
  rating: number;
  eventName: string;
  createdAt: string;
  ticketQuantity: number;
  invoiceNumber: string;
}

export function ReviewCard({
  firstName,
  lastName,
  isAnonymous,
  title,
  description,
  rating,
  eventName,
  createdAt,
  ticketQuantity,
  invoiceNumber,
}: ReviewCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-zinc-200 hover:border-indigo-200 transition-colors group">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* User & Rating */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
              <RiUser3Line size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-800">
                {isAnonymous
                  ? "Anonymous"
                  : `${capitalize(firstName)} ${capitalize(lastName)}`}
              </h4>
              <div className="flex text-indigo-500 gap-0.5 text-xs">
                {[...Array(5)].map((_, i) => (
                  <RiStarFill
                    key={i}
                    className={i < rating ? "text-indigo-500" : "text-zinc-200"}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-zinc-800 text-base leading-relaxed italic">
            {title}
          </p>
          <p className="text-zinc-600 text-sm leading-relaxed italic">
            {description}
          </p>
        </div>

        {/* Order Meta Data*/}
        <div className="w-full md:w-64 space-y-2 p-4 bg-zinc-50/50 rounded-xl border border-zinc-100/50">
          <div className="flex items-center gap-2 text-zinc-900 font-semibold text-[11px] capitalize tracking-tight">
            <RiTicket2Line className="text-indigo-500" />
            {eventName}
          </div>
          <div className="flex flex-col gap-1 text-[10px] text-zinc-400">
            <span className="flex items-center gap-1">
              <RiTimeLine /> {formatDate(createdAt)}
            </span>
            <span>Invoice: {invoiceNumber}</span>
            <span>
              Qty: {ticketQuantity} {ticketQuantity > 1 ? "Tickets" : "Ticket"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
