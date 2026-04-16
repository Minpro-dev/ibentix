// import { ArrowRight, Lock, Shield } from "lucide-react";

// export default function SecuritySection() {
//   return (
//     <div className="mt-12 bg-surface-container border border-outline p-6 rounded-xl shadow-ambient">
//       <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6">
//         Account Security
//       </h3>
//       <div className="space-y-3">
//         <button className="w-full flex justify-between items-center bg-surface p-4 rounded-lg hover:bg-surface-container-high transition-colors group border border-outline">
//           <div className="flex items-center gap-3">
//             <Lock className="w-4 h-4 text-on-surface-variant" />
//             <span className="font-semibold text-on-surface text-sm">Change Password</span>
//           </div>
//           <ArrowRight className="w-4 h-4 text-outline group-hover:translate-x-1 transition-transform" />
//         </button>
//         <button className="w-full flex justify-between items-center bg-surface p-4 rounded-lg hover:bg-surface-container-high transition-colors group border border-outline">
//           <div className="flex items-center gap-3">
//             <Shield className="w-4 h-4 text-on-surface-variant" />
//             <span className="font-semibold text-on-surface text-sm">Privacy Settings</span>
//           </div>
//           <ArrowRight className="w-4 h-4 text-outline group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>
//     </div>
//   );
// }

import { ChevronRight, Lock, Shield } from "lucide-react";

export default function SecuritySection() {
  return (
    <div className="p-8">
      {/* Label section dengan font extrabold dan tracking lebar sesuai desain */}
      <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-6">
        Account Security
      </h3>

      <div className="space-y-4">
        {/* Tombol Change Password */}
        <button className="w-full flex justify-between items-center bg-white p-4 rounded-xl hover:bg-slate-50 transition-all group border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
              <Lock className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5]" />
            </div>
            <span className="font-bold text-slate-700 text-sm">Change Password</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#4F46E5] group-hover:translate-x-1 transition-all" />
        </button>

        {/* Tombol Privacy Settings */}
        <button className="w-full flex justify-between items-center bg-white p-4 rounded-xl hover:bg-slate-50 transition-all group border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
              <Shield className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5]" />
            </div>
            <span className="font-bold text-slate-700 text-sm">Privacy Settings</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#4F46E5] group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
}