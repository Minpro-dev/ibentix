// import { Edit2, ShieldCheck } from "lucide-react";
// import type { Profile } from "../types/userType";
// import { motion } from "motion/react";

// interface ProfileHeroProps {
//   profile: Profile;
// }

// export default function ProfileHero({ profile }: ProfileHeroProps) {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-surface-container p-8 rounded-xl shadow-ambient relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start border border-outline"
//     >
//       <div className="relative">
//         <div className="w-32 h-32 rounded-full bg-surface-container overflow-hidden ring-4 ring-surface-container-high">
//           <img
//             className="w-full h-full object-cover"
//             src={profile.avatar}
//             alt={profile.name}
//             referrerPolicy="no-referrer"
//           />
//         </div>
//         <button className="absolute bottom-0 right-0 bg-primary text-on-primary p-2.5 rounded-full shadow-primary-btn hover:scale-105 transition-transform">
//           <Edit2 className="w-4 h-4" />
//         </button>
//       </div>
//       <div className="flex-1 text-center md:text-left">
//         <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-3">
//           <ShieldCheck className="w-4 h-4 fill-current" />
//           <span className="text-xs font-bold uppercase tracking-wider">{profile.role}</span>
//         </div>
//         <h1 className="text-3xl font-bold headline-font text-on-surface mb-1">{profile.name}</h1>
//         <p className="text-on-surface-variant mb-6 text-sm">{profile.email}</p>
//         <button className="bg-surface-container-high text-on-surface font-semibold px-6 py-2.5 rounded-lg hover:bg-outline transition-colors border border-outline">
//           Edit Profile Details
//         </button>
//       </div>
//     </motion.div>
//   );
// }

import { Edit2, ShieldCheck } from "lucide-react";
import type { Profile } from "../types/userType";
import { motion } from "motion/react";

interface ProfileHeroProps {
  profile: Profile;
}

export default function ProfileHero({ profile }: ProfileHeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // bg-white agar kontras dengan background body yang biru muda
      className="bg-white p-8 rounded-2xl shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start border border-slate-100"
    >
      <div className="relative">
        {/* Ring warna biru muda/slate */}
        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-slate-50 shadow-inner">
          <img
            className="w-full h-full object-cover"
            src={profile.avatar}
            alt={profile.name}
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Tombol pensil kecil warna biru/ungu sesuai gambar */}
        <button className="absolute bottom-1 right-1 bg-[#4F46E5] text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform border-2 border-white">
          <Edit2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 text-center md:text-left">
        {/* Lencana Role: Background biru transparan, teks biru/ungu */}
        <div className="inline-flex items-center gap-1.5 bg-[#EEF2FF] text-[#4F46E5] px-3 py-1 rounded-full mb-3 border border-[#E0E7FF]">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            {profile.role}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
          {profile.name}
        </h1>
        <p className="text-slate-500 mb-6 text-sm">
          {profile.email}
        </p>

        {/* Tombol Edit: Background abu sangat muda */}
        <button className="bg-slate-50 text-slate-700 font-bold px-6 py-2.5 rounded-xl hover:bg-slate-100 transition-all border border-slate-200 text-sm">
          Edit Profile Details
        </button>
      </div>
    </motion.div>
  );
}