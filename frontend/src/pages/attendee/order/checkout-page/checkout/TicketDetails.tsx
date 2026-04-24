// import React, { useEffect } from 'react';
// import { useOrderStore } from '../hooks/useOrderStore';
// import { useQuery } from '@tanstack/react-query';
// import { eventService } from '../services/api';
// import { cn } from '../../../../../lib/utils';

// export const TicketDetails: React.FC = () => {
//   const { ticketHolders, setTicketHolder, syncTicketHolders } = useOrderStore();

//   // useQuery to fetch saved profiles from backend
//   const { data: savedHolders, isLoading: isFetchingSaved } = useQuery({
//     queryKey: ['savedHolders'],
//     queryFn: () => eventService.getSavedHolders(),
//     staleTime: 60000, // 1 minute
//   });

//   useEffect(() => {
//     syncTicketHolders();
//   }, [syncTicketHolders]);

//   const handleQuickFill = (suggestion: { fullName: string, email: string }) => {
//     const emptyIndex = ticketHolders.findIndex(h => !h.fullName && !h.email);
//     const targetIndex = emptyIndex !== -1 ? emptyIndex : 0;
//     setTicketHolder(targetIndex, { ...suggestion, isSaved: true });
//   };

//   return (
//     <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
//         <div>
//           <h2 className="text-2xl font-black text-slate-900 tracking-tight font-plus-jakarta">Ticket Details</h2>
//           <p className="text-sm text-slate-500 mt-1 font-medium">Please enter the details for each attendee.</p>
//         </div>
        
//         {/* Quick Fill Suggestions UI */}
//         <div className="flex flex-col items-start md:items-end gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
//           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1.5">
//             {isFetchingSaved ? (
//               <span className="flex items-center gap-1 animate-pulse text-blue-600">
//                 <span className="material-symbols-outlined text-xs">sync</span>
//                 Loading Profiles
//               </span>
//             ) : (
//               <span className="flex items-center gap-1">
//                 <span className="material-symbols-outlined text-xs">person_add</span>
//                 Quick Fill From Saved
//               </span>
//             )}
//           </span>
//           <div className="flex flex-wrap gap-2">
//             {savedHolders?.map((profile, i) => (
//               <button 
//                 key={i}
//                 onClick={() => handleQuickFill(profile)}
//                 className="bg-white hover:bg-blue-600 text-slate-700 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-slate-200 hover:border-blue-600 shadow-sm active:scale-95"
//               >
//                 {profile.fullName.split(' ')[0]}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <div className="space-y-12">
//         {ticketHolders.map((holder, index) => (
//           <div key={index} className="group space-y-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-lg group-hover:bg-blue-600 transition-colors">
//                   {index + 1}
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-black text-slate-900 font-plus-jakarta">Attendee {index + 1}</h3>
//                   <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Standard Admission</span>
//                 </div>
//               </div>
              
//               <button 
//                 onClick={() => setTicketHolder(index, { isSaved: !holder.isSaved })}
//                 className={cn(
//                   "flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all border-2",
//                   holder.isSaved 
//                     ? "bg-blue-600 text-white border-blue-600 shadow-md" 
//                     : "bg-white text-slate-600 border-slate-100 hover:border-blue-200 hover:bg-blue-50"
//                 )}
//               >
//                 <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: holder.isSaved ? "'FILL' 1" : "'FILL' 0" }}>
//                   {holder.isSaved ? 'bookmark_check' : 'bookmark_add'}
//                 </span>
//                 {holder.isSaved ? 'Details Saved' : 'Save Info'}
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-2xl bg-slate-50/50 border border-slate-100 transition-all group-hover:border-blue-100 group-hover:bg-white group-hover:shadow-md">
//               <div className="space-y-2.5">
//                 <label className="block text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
//                 <input 
//                   className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 font-bold placeholder:text-slate-300 focus:border-blue-600 focus:ring-0 transition-all outline-none" 
//                   placeholder="e.g. Ranny Rahmania" 
//                   type="text"
//                   value={holder.fullName}
//                   onChange={(e) => setTicketHolder(index, { fullName: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2.5">
//                 <label className="block text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
//                 <input 
//                   className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 font-bold placeholder:text-slate-300 focus:border-blue-600 focus:ring-0 transition-all outline-none" 
//                   placeholder="example@email.com" 
//                   type="email"
//                   value={holder.email}
//                   onChange={(e) => setTicketHolder(index, { email: e.target.value })}
//                 />
//               </div>
//             </div>
//             {index < ticketHolders.length - 1 && (
//               <div className="pt-4 flex justify-center">
//                 <div className="h-px w-full bg-slate-100" />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

import { TextInput } from "./TextInput";

export const TicketDetails = ({ values }: any) => {
  return (
    <div className="space-y-6">

      <h2 className="font-bold">Ticket Details</h2>

      {values.tickets.map((_: any, i: number) => (
        <div key={i} className="p-4 border rounded-xl space-y-3">

          <TextInput
            name={`tickets[${i}].fullName`}
            label={`Full Name (Ticket ${i + 1})`}
          />

          <TextInput
            name={`tickets[${i}].email`}
            label="Email"
            type="email"
          />

        </div>
      ))}

    </div>
  );
};