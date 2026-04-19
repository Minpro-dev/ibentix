// import React from 'react';
// import type { Ticket } from '../types/userType';
// import { cn, formatCurrency } from '../lib/utils';
// import { motion } from 'motion/react';

// interface TicketCardProps {
//   ticket: Ticket;
//   onPay: (id: string) => void;
// }

// export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onPay }) => {
//   const isDone = ticket.status === 'DONE';
//   const isPending = ticket.status === 'PAYMENT_PENDING';

//   return (
//     <motion.div 
//       layout
//       className="ticket-card w-full bg-surface rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-border flex flex-col relative overflow-visible"
//     >
//       <div className="p-8 border-b-2 border-dashed border-line relative">
//         <div className="event-label text-[11px] font-bold text-accent uppercase tracking-wider mb-2">
//           {isDone ? 'Confirmed Attendee' : 'Payment Required'}
//         </div>
//         <h3 className="text-2xl font-extrabold text-on-surface leading-tight mb-6 font-headline tracking-tight">
//           {ticket.title}
//         </h3>
        
//         <div className="grid grid-cols-2 gap-y-4 gap-x-6">
//           <div className="flex flex-col">
//             <span className="text-[10px] uppercase text-on-surface-variant font-bold mb-1">Date</span>
//             <span className="text-sm font-semibold text-on-surface">{ticket.date}</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-[10px] uppercase text-on-surface-variant font-bold mb-1">Price</span>
//             <span className="text-sm font-semibold text-on-surface">{formatCurrency(ticket.price)}</span>
//           </div>
//           <div className="flex flex-col col-span-2">
//             <span className="text-[10px] uppercase text-on-surface-variant font-bold mb-1">Venue</span>
//             <span className="text-sm font-semibold text-on-surface">{ticket.location}</span>
//           </div>
//         </div>

//         {/* Notches */}
//         <div className="ticket-notch -left-4" />
//         <div className="ticket-notch -right-4" />
//       </div>

//       <div className="p-8 flex justify-between items-end bg-surface rounded-b-[20px]">
//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col">
//             <span className="text-[10px] uppercase text-on-surface-variant font-bold mb-1">Section / Gate</span>
//             <span className="text-sm font-semibold text-on-surface">{ticket.gate || 'TBA'}</span>
//           </div>
//           {isDone && (
//             <div className="flex flex-col">
//               <span className="text-[10px] uppercase text-on-surface-variant font-bold mb-1">Seat</span>
//               <span className="text-sm font-semibold text-on-surface">{ticket.seat}</span>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-3">
//           {isDone ? (
//             <div className="w-20 h-20 bg-white p-1.5 rounded-lg border border-border shadow-sm flex items-center justify-center shrink-0">
//               <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-[1px]">
//                 {Array.from({ length: 36 }).map((_, i) => (
//                   <div 
//                     key={i} 
//                     className={cn(
//                       "w-full h-full",
//                       Math.random() > 0.4 ? 'bg-on-surface' : 'bg-transparent'
//                     )} 
//                   />
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <button 
//               onClick={() => onPay(ticket.id)}
//               className="action-btn px-6 py-3 rounded-xl bg-accent text-white flex items-center gap-2 text-sm font-bold shadow-lg shadow-accent/20 hover:brightness-110 transition-all active:scale-95"
//             >
//               <span>Pay Now</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

import React from 'react';
import type { Ticket } from '../types/userType';
import { cn, formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

interface TicketCardProps {
  ticket: Ticket;
  onPay: (id: string) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onPay }) => {
  const isDone = ticket.status === 'DONE';

  return (
    <motion.div 
      layout
      className="w-full bg-white rounded-[24px] shadow-sm border border-slate-100 flex flex-col relative"
    >
      {/* Bagian Atas Tiket */}
      <div className="p-8 pb-6 relative">
        <div className="text-[10px] font-black text-[#3B82F6] uppercase tracking-[0.2em] mb-2">
          {isDone ? 'Confirmed Attendee' : 'Payment Required'}
        </div>
        <h3 className="text-2xl font-black text-slate-800 leading-tight mb-6 tracking-tight">
          {ticket.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-y-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-wider">Date</span>
            <span className="text-sm font-bold text-slate-700">{ticket.date}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-wider">Price</span>
            <span className="text-sm font-bold text-slate-700">{formatCurrency(ticket.price)}</span>
          </div>
          <div className="flex flex-col col-span-2">
            <span className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-wider">Venue</span>
            <span className="text-sm font-bold text-slate-700">{ticket.location}</span>
          </div>
        </div>
      </div>

      {/* Garis Putus-putus & Notch (Lubang Tiket) */}
      <div className="relative flex items-center">
        {/* Notch Kiri */}
        <div className="absolute -left-3 w-6 h-6 bg-[#F8FAFC] border border-slate-100 rounded-full" />
        {/* Garis Putus-putus */}
        <div className="w-full border-t-2 border-dashed border-slate-100 mx-4" />
        {/* Notch Kanan */}
        <div className="absolute -right-3 w-6 h-6 bg-[#F8FAFC] border border-slate-100 rounded-full" />
      </div>

      {/* Bagian Bawah Tiket */}
      <div className="p-8 pt-6 flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-wider">Section / Gate</span>
            <span className="text-sm font-bold text-slate-700">{ticket.gate || 'TBA'}</span>
          </div>
          {isDone && (
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-wider">Seat</span>
              <span className="text-sm font-bold text-slate-700">{ticket.seat}</span>
            </div>
          )}
        </div>

        <div className="flex items-center">
          {isDone ? (
            /* Simulasi QR Code seperti di gambar */
            <div className="w-20 h-20 bg-white p-2 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-full h-full rounded-[1px]",
                      Math.random() > 0.4 ? 'bg-slate-800' : 'bg-transparent'
                    )} 
                  />
                ))}
              </div>
            </div>
          ) : (
            <button 
              onClick={() => onPay(ticket.id)}
              className="px-8 py-3 rounded-xl bg-[#3B82F6] text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-[#2563EB] transition-all active:scale-95"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};