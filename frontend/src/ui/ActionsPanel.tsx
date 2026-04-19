// import { FileText, Share2 } from 'lucide-react';
// import { cn } from '../lib/utils';

// export function ActionsPanel() {
//   const actions = [
//     { label: 'Download PDF Receipt', icon: <FileText className="w-5 h-5" />, primary: true },
//     { label: 'Transfer Ticket', icon: <Share2 className="w-5 h-5" /> },
//   ];

//   return (
//     <section className="flex flex-col gap-4">
//       <h3 className="text-lg font-bold text-on-surface mb-2 font-headline uppercase tracking-tight">Ticket Actions</h3>
//       <div className="flex flex-col gap-3">
//         {actions.map((action, i) => (
//           <button
//             key={i}
//             className={cn(
//               "p-4 rounded-xl border border-border flex items-center gap-4 text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
//               action.primary 
//                 ? "bg-accent text-white border-accent shadow-lg shadow-accent/10" 
//                 : "bg-surface text-on-surface hover:bg-surface-container-low"
//             )}
//           >
//             <span className={action.primary ? "text-white" : "text-accent"}>
//               {action.icon}
//             </span>
//             <span>{action.label}</span>
//           </button>
//         ))}
//       </div>

//       <div className="mt-8 p-6 border-t border-border flex flex-col gap-3">
//         <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Important Information</h4>
//         <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
//           Please present this QR code at the registration desk for check-in. This ticket is non-transferable without approval. Photo ID may be required upon entry.
//         </p>
//       </div>
//     </section>
//   );
// }
import { FileText, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function ActionsPanel() {
  const actions = [
    { label: 'Download PDF Receipt', icon: <FileText className="w-4 h-4" />, primary: true },
    { label: 'Transfer Ticket', icon: <Share2 className="w-4 h-4" />, primary: false },
  ];

  return (
    /* Card Container: Putih, Rounded, Border Halus */
    <section className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
      <h3 className="text-sm font-extrabold text-slate-800 mb-6 uppercase tracking-widest">
        Ticket Actions
      </h3>

      <div className="flex flex-col gap-3">
        {actions.map((action, i) => (
          <button
            key={i}
            className={cn(
              "p-3.5 rounded-xl border flex items-center gap-3 text-xs font-bold transition-all duration-200 active:scale-[0.98]",
              action.primary 
                ? "bg-[#3B82F6] text-white border-[#3B82F6] shadow-md shadow-blue-100 hover:bg-[#2563EB]" 
                : "bg-white text-[#3B82F6] border-slate-200 hover:bg-slate-50"
            )}
          >
            {/* Icon dengan warna yang menyesuaikan tombol */}
            <span className={action.primary ? "text-white" : "text-[#3B82F6]"}>
              {action.icon}
            </span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Informasi Penting */}
      <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col gap-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Important Information
        </h4>
        <p className="text-[11px] text-slate-500 leading-relaxed font-medium text-center px-2">
          Please present this QR code at the registration desk for check-in. 
          This ticket is non-transferable without approval. 
          Photo ID may be required upon entry.
        </p>
      </div>
    </section>
  );
}
