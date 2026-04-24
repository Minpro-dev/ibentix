// // import React from 'react';
// // import type { Ticket } from '../types/userType';
// // import { cn, formatCurrency } from '../lib/utils';
// // import { motion } from 'motion/react';

// // interface HistoryItemProps {
// //   ticket: Ticket;
// // }

// // export const HistoryItem: React.FC<HistoryItemProps> = ({ ticket }) => {
// //   const isRejected = ticket.status === 'REJECTED';

// //   return (
// //     <motion.div 
// //       initial={{ opacity: 0, x: -10 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       className="bg-surface border border-border rounded-[20px] p-5 flex items-center justify-between transition-all hover:bg-surface-container-low cursor-pointer group shadow-sm"
// //     >
// //       <div className="flex items-center gap-5">
// //         <div className={cn(
// //           "w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative border border-border",
// //           !isRejected && "grayscale opacity-60"
// //         )}>
// //           <img 
// //             src={ticket.imageUrl} 
// //             alt={ticket.title} 
// //             className="w-full h-full object-cover"
// //           />
// //         </div>
// //         <div>
// //           <h4 className="font-bold text-on-surface font-headline tracking-tight">{ticket.title}</h4>
// //           <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mt-0.5">
// //             {ticket.date} • {ticket.location}
// //           </p>
// //           <span className={cn(
// //             "inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest",
// //             isRejected ? "text-error bg-error/10" : "text-on-surface-variant bg-on-surface-variant/10"
// //           )}>
// //             {isRejected ? 'Rejected' : 'Expired'}
// //           </span>
// //         </div>
// //       </div>
// //       <div className="text-right">
// //         <span className="text-sm font-bold text-on-surface block font-headline">
// //           {formatCurrency(ticket.price)}
// //         </span>
// //         <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">
// //           {ticket.reason || ticket.note}
// //         </span>
// //       </div>
// //     </motion.div>
// //   );
// // };

// import React from 'react';
// import type { Ticket } from '../types/userType';
// import { cn, formatCurrency } from '../lib/utils';
// import { motion } from 'motion/react';

// interface HistoryItemProps {
//   ticket: Ticket;
// }

// export const HistoryItem: React.FC<HistoryItemProps> = ({ ticket }) => {
//   const isRejected = ticket.status === 'REJECTED';

//   return (
//     <motion.div 
//       initial={{ opacity: 0, x: -10 }}
//       animate={{ opacity: 1, x: 0 }}
//       // Menggunakan bg-white agar kontras dengan latar belakang aplikasi
//       className="bg-white border border-slate-100 rounded-[20px] p-5 flex items-center justify-between transition-all hover:bg-slate-50 cursor-pointer group shadow-sm mb-4"
//     >
//       <div className="flex items-center gap-5">
//         {/* Container Image dengan ring halus */}
//         <div className={cn(
//           "w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 relative border border-slate-100",
//           !isRejected && "grayscale-[0.5] opacity-80"
//         )}>
//           <img 
//             src={ticket.imageUrl} 
//             alt={ticket.title} 
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div>
//           {/* Judul dengan warna Slate gelap agar terbaca jelas */}
//           <h4 className="font-extrabold text-slate-800 text-sm tracking-tight leading-tight">
//             {ticket.title}
//           </h4>
          
//           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
//             {ticket.date} • {ticket.location}
//           </p>

//           {/* Badge Status yang lebih bersih */}
//           <span className={cn(
//             "inline-block mt-2 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border",
//             isRejected 
//               ? "text-rose-500 bg-rose-50 border-rose-100" 
//               : "text-slate-400 bg-slate-50 border-slate-200"
//           )}>
//             {isRejected ? 'Rejected' : 'Expired'}
//           </span>
//         </div>
//       </div>

//       <div className="text-right">
//         {/* Harga dengan warna biru aksen jika aktif, atau slate jika history */}
//         <span className="text-sm font-black text-slate-800 block">
//           {formatCurrency(ticket.price)}
//         </span>
//         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
//           {ticket.reason || ticket.note || "No details"}
//         </span>
//       </div>
//     </motion.div>
//   );
// };

import React from "react";
import type { Order } from "../pages/attendee/ticket/userType";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

export interface HistoryItemProps {
  order: Order;
}

const STATUS_STYLES: Record<string, string> = {
  REJECTED: "text-rose-500 bg-rose-50 border-rose-100",
  EXPIRED: "text-slate-400 bg-slate-50 border-slate-200",
  CANCELED: "text-orange-500 bg-orange-50 border-orange-100",
};

const STATUS_LABELS: Record<string, string> = {
  REJECTED: "Rejected",
  EXPIRED: "Expired",
  CANCELED: "Canceled",
};

export const HistoryItem: React.FC<HistoryItemProps> = ({ order }) => {
  const status = order.payment?.paymentStatus ?? "EXPIRED";
  const isRejected = status === "REJECTED";

  const eventName = order.event?.name ?? "Event";
  const eventDate = order.event?.startDate
    ? new Date(order.event.startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
  const location = order.event?.location ?? "—";
  const imageUrl = order.event?.imageUrl;
  const ticketCount = order.tickets?.length ?? 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white border border-slate-100 rounded-[20px] p-5 flex items-center justify-between transition-all hover:bg-slate-50 cursor-pointer group shadow-sm mb-4">
      <div className="flex items-center gap-5">
        {/* Event image or fallback */}
        <div
          className={cn(
            "w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 relative border border-slate-100 bg-slate-100",
            !isRejected && "grayscale-[0.5] opacity-80",
          )}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={eventName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 text-2xl font-black">
              {eventName.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-extrabold text-slate-800 text-sm tracking-tight leading-tight">
            {eventName}
          </h4>

          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            {eventDate} • {location}
          </p>

          <span
            className={cn(
              "inline-block mt-2 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border",
              STATUS_STYLES[status] ?? STATUS_STYLES.EXPIRED,
            )}>
            {STATUS_LABELS[status] ?? status}
          </span>
        </div>
      </div>

      <div className="text-right">
        <span className="text-sm font-black text-slate-800 block">
          {ticketCount} ticket{ticketCount > 1 ? "s" : ""}
        </span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
          {order.orderId.slice(0, 8).toUpperCase()}
        </span>
      </div>
    </motion.div>
  );
};
