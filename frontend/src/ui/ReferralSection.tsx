// import { Copy, Share2, UserPlus } from "lucide-react";
// import type { Referral } from "../types/userType";
// // import { motion } from "motion/react";

// interface ReferralSectionProps {
//   referralCode: string;
//   referrals: Referral[];
// }

// export default function ReferralSection({ referralCode, referrals }: ReferralSectionProps) {
//   return (
//     <section>
//       <h3 className="text-xl font-bold headline-font mb-6 flex items-center gap-2">
//         <UserPlus className="w-5 h-5 text-primary" />
//         Referral Program
//       </h3>
//       <div className="bg-surface-container border border-outline p-6 rounded-xl space-y-6 shadow-ambient">
//         <div className="bg-surface-container-high p-6 rounded-xl border border-outline border-dashed">
//           <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-4">
//             Your Unique Referral Code
//           </label>
//           <div className="flex items-center justify-between bg-surface p-4 rounded-lg border border-outline">
//             <span className="text-xl font-bold headline-font tracking-widest text-primary">{referralCode}</span>
//             <button className="text-primary hover:scale-110 transition-transform">
//               <Copy className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//         <button className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-primary-btn hover:opacity-90 transition-opacity">
//           <Share2 className="w-5 h-5" />
//           Share Code
//         </button>

//         <div className="mt-8">
//           <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">
//             Recent Referral Signups
//           </h4>
//           <div className="space-y-3">
//             {referrals.map((ref) => (
//               <div key={ref.id} className="flex items-center justify-between p-3 bg-surface border border-outline rounded-lg">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
//                     <span className="text-[10px] font-bold text-primary">{ref.initials}</span>
//                   </div>
//                   <div>
//                     <p className="text-sm font-bold text-on-surface">{ref.name}</p>
//                     <p className="text-[11px] text-on-surface-variant">Joined {ref.joined}</p>
//                   </div>
//                 </div>
//                 <span className="text-tertiary font-bold text-sm">+{ref.points} pts</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Copy, Share2, UserPlus } from "lucide-react";
import type { Referral } from "../types/userType";

interface ReferralSectionProps {
  referralCode: string;
  referrals: Referral[];
}

export default function ReferralSection({ referralCode, referrals }: ReferralSectionProps) {
  return (
    <section>
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-[#4F46E5]" />
        Referral Program
      </h3>
      
      {/* Container utama dengan background putih agar kontras */}
      <div className="bg-white border border-slate-100 p-2 rounded-2xl space-y-6">
        
        {/* Box Referral Code dengan Border Dashed (seperti di gambar) */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 border-dashed">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] block mb-4">
            Your Unique Referral Code
          </label>
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xl font-bold tracking-[0.15em] text-[#4F46E5]">
              {referralCode}
            </span>
            <button className="text-slate-400 hover:text-[#4F46E5] transition-all hover:scale-110">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tombol Share dengan warna Indigo Solid */}
        <button className="w-full bg-[#4F46E5] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 hover:bg-[#4338CA] transition-all active:scale-[0.98]">
          <Share2 className="w-5 h-5" />
          Share Code
        </button>

        {/* Daftar Referral Terbaru */}
        <div className="mt-8 px-2 pb-4">
          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">
            Recent Referral Signups
          </h4>
          <div className="space-y-4">
            {referrals.map((ref) => (
              <div key={ref.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  {/* Inisial Avatar */}
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 transition-colors group-hover:bg-indigo-100">
                    <span className="text-[10px] font-black text-[#4F46E5]">
                      {ref.initials || ref.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{ref.name}</p>
                    <p className="text-[11px] text-slate-400">Joined {ref.joined}</p>
                  </div>
                </div>
                {/* Poin dengan warna hijau emerald agar terlihat positif */}
                <span className="text-emerald-500 font-bold text-sm">
                  +{ref.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}