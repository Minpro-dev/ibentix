// import React from 'react';
// import { useOrderStore } from '../hooks/useOrderStore';

// export const ReviewEvent: React.FC = () => {
//   const event = useOrderStore((state) => state.event);
//   const totalTickets = event.tickets.reduce((sum, t) => sum + t.quantity, 0);

//   return (
//     <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 overflow-hidden">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h2 className="text-2xl font-black text-slate-900 tracking-tight font-plus-jakarta">Review Selected Event</h2>
//           <p className="text-sm text-slate-500 mt-1 font-medium">Double check your event selection before proceeding.</p>
//         </div>
//         <div className="hidden md:block">
//           <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100">
//             {totalTickets} {totalTickets > 1 ? 'Tickets' : 'Ticket'} Secured
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8 items-stretch">
//         {/* Event Image with Badge */}
//         <div className="relative w-full md:w-56 h-40 flex-shrink-0 group">
//           <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10 rounded-xl" />
//           <img 
//             alt={event.title} 
//             className="w-full h-full object-cover rounded-xl shadow-md" 
//             src={event.imageUrl}
//             referrerPolicy="no-referrer"
//           />
//           <div className="absolute -top-3 -left-3 bg-slate-900 text-white w-12 h-12 flex items-center justify-center rounded-xl font-black shadow-xl z-20 rotate-[-5deg]">
//             {totalTickets}x
//           </div>
//         </div>

//         {/* Event Content */}
//         <div className="flex flex-col justify-center flex-grow py-2">
//           <h3 className="text-2xl font-black text-slate-900 leading-tight font-plus-jakarta mb-4">
//             {event.title}
//           </h3>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="flex items-center gap-3 group">
//               <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all text-slate-400 group-hover:text-blue-600">
//                 <span className="material-symbols-outlined text-xl">calendar_today</span>
//               </div>
//               <div>
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Date & Time</p>
//                 <p className="text-sm font-bold text-slate-700">{event.date}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 group">
//               <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all text-slate-400 group-hover:text-blue-600">
//                 <span className="material-symbols-outlined text-xl">location_on</span>
//               </div>
//               <div>
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Location</p>
//                 <p className="text-sm font-bold text-slate-700 line-clamp-1">{event.location}</p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
//             {event.tickets.map((ticket, idx) => (
//               <div key={idx} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-lg">
//                 <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
//                 <span className="text-[11px] font-black uppercase tracking-wider">
//                   {ticket.quantity}x {ticket.type}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export const ReviewEvent = ({ event }: any) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex gap-4">

      <img
        src={event.thumbnail}
        alt={event.title}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div>
        <h2 className="font-bold text-lg">{event.title}</h2>
        <p className="text-sm text-zinc-500">{event.locationName}</p>
        <p className="text-sm text-zinc-500">
          {new Date(event.eventDate).toLocaleString()}
        </p>
      </div>

    </div>
  );
};