import { ShieldCheck, Mail, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "../store/useOrderStore";

interface SidebarProps {
  eventId: string;
}
export function Sidebar({ eventId }: SidebarProps) {
  const navigate = useNavigate();
  const setTicketQuantity = useOrderStore((state) => state.setTicketQuantity);
  const ticketQuantity = useOrderStore((state) => state.ticketQuantity);
  const setEventId = useOrderStore((state) => state.setEventId);

  const handleSeletEvent = (eventId: string) => {
    setEventId(eventId);
    navigate("/order");
  };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100">
        <h3 className="text-2xl font-bold tracking-tight mb-8">
          Secure Your Ticket
        </h3>

        <div className="space-y-6 mb-8">
          <div className="p-6 rounded-2xl border-2 border-indigo-600 bg-indigo-50/50 shadow-sm transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-1">
                <p className="font-bold text-indigo-900">Regular Admission</p>
                <p className="text-xs text-gray-400 font-medium">
                  General access to all stages
                </p>
              </div>
              <p className="font-black text-indigo-600 text-lg">IDR 250k</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-indigo-100/50">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Quantity
              </span>
              <div className="flex items-center gap-4 bg-white p-1 rounded-xl border border-indigo-100">
                <button
                  onClick={() => setTicketQuantity(ticketQuantity - 1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-indigo-600 disabled:opacity-30"
                  disabled={ticketQuantity <= 1}>
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-black text-gray-900 w-6 text-center">
                  {ticketQuantity}
                </span>
                <button
                  onClick={() => setTicketQuantity(ticketQuantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-indigo-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center px-2">
            <span className="font-black text-xs text-gray-400 uppercase tracking-widest">
              Total Price
            </span>
            <span className="font-black text-2xl text-gray-900 tracking-tighter">
              120.000
            </span>
          </div>
        </div>

        <button
          onClick={() => handleSeletEvent(eventId)}
          // disabled={isBooking}
          className="w-full bg-indigo-600 text-white py-4 md:py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 active:scale-[0.98]">
          Buy Now
        </button>

        <div className="mt-8 pt-8 border-t border-gray-50">
          <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <p>
              Secure checkout by{" "}
              <span className="text-gray-900">ConciergePayments</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-[32px] p-6 border border-gray-100 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://picsum.photos/seed/organizer/100/100"
              alt="Organizer"
              className="w-16 h-16 rounded-2xl object-cover shadow-sm border-2 border-white"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">
              Organizer
            </p>
            <p className="font-bold text-gray-900 text-lg">
              Ethereal Productions
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-lg">
                PRO
              </span>
            </div>
          </div>
          <button className="p-3 text-indigo-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-indigo-100 shadow-sm">
            <Mail className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-black text-gray-900">142</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
              Events Hosted
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-gray-900">4.9</span>
              <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
              Avg. Rating
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
