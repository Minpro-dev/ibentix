import { ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import { useEventStore } from '../store/useEventStore';
import { cn } from '../lib/utils';


const ticketTypes = [
  {
    id: 'reg',
    name: 'Regular Admission',
    description: 'General access to all stages',
    price: 'IDR 250k',
  },
  {
    id: 'vip',
    name: 'VIP Experience',
    description: 'Fast lane & VIP lounge access',
    price: 'IDR 750k',
    isBestChoice: true,
  }
];

export function Sidebar() {
  const { selectedTicketId, setSelectedTicket, isBooking, setBooking } = useEventStore();

  const handleBooking = () => {
    setBooking(true);
    // Simulate API call
    setTimeout(() => {
      setBooking(false);
      // In a real app, logic for success would go here
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100">
        <h3 className="text-2xl font-bold tracking-tight mb-8">Secure Your Ticket</h3>
        
        <div className="space-y-4 mb-8">
          {ticketTypes.map((ticket) => (
            <div 
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket.id)}
              className={cn(
                "relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300",
                selectedTicketId === ticket.id 
                  ? "border-indigo-600 bg-indigo-50/50 shadow-sm" 
                  : "border-gray-50 hover:border-gray-200"
              )}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className={cn(
                      "font-bold",
                      selectedTicketId === ticket.id ? "text-indigo-900" : "text-gray-900"
                    )}>
                      {ticket.name}
                    </p>
                    {ticket.isBestChoice && (
                      <span className="bg-amber-100 text-amber-700 text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase">
                        Best Choice
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">{ticket.description}</p>
                </div>
                <p className="font-black text-indigo-600 text-lg">{ticket.price}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleBooking}
          disabled={isBooking}
          className={cn(
            "w-full bg-indigo-600 text-white py-4 md:py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 active:scale-[0.98]",
            isBooking && "opacity-70 cursor-not-allowed"
          )}
        >
          {isBooking ? 'Processing...' : 'Buy Now'}
          {!isBooking && <ArrowRight className="w-5 h-5" />}
        </button>

        <div className="mt-8 pt-8 border-t border-gray-50">
          <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <p>Secure checkout by <span className="text-gray-900">ConciergePayments</span></p>
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
            <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Organizer</p>
            <p className="font-bold text-gray-900 text-lg">Ethereal Productions</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-lg">PRO</span>
            </div>
          </div>
          <button className="p-3 text-indigo-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-indigo-100 shadow-sm">
            <Mail className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-black text-gray-900">142</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Events Hosted</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-gray-900">4.9</span>
              <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Avg. Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
