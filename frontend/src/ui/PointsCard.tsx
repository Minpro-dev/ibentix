// import { Coins } from "lucide-react";
// import { motion } from "motion/react";

// interface PointsCardProps {
//   points: number;
//   equivalentValue: number;
// }

// export default function PointsCard({ points, equivalentValue }: PointsCardProps) {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.1 }}
//       className="bg-primary text-on-primary p-8 rounded-xl relative overflow-hidden flex flex-col justify-between shadow-ambient"
//     >
//       <div className="absolute -right-4 -top-4 opacity-10">
//         <Coins className="w-32 h-32" />
//       </div>
//       <div>
//         <span className="text-on-primary/70 text-xs font-bold uppercase tracking-widest">Total Points</span>
//         <h2 className="text-4xl font-bold headline-font mt-2 mb-1">
//           {points.toLocaleString("id-ID")} <span className="text-lg font-medium">pts</span>
//         </h2>
//         <p className="text-on-primary/70 text-xs">Equivalent to Rp {equivalentValue.toLocaleString("id-ID")}</p>
//       </div>
//       <button className="w-full bg-white text-primary font-bold py-3 rounded-lg shadow-primary-btn hover:bg-surface transition-all text-sm mt-8 uppercase tracking-wide">
//         Redeem Points
//       </button>
//     </motion.div>
//   );
// }

import { Coins } from "lucide-react";
import { motion } from "motion/react";

interface PointsCardProps {
  points: number;
  equivalentValue: number;
}

export default function PointsCard({ points, equivalentValue }: PointsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      /* Menggunakan gradasi biru-ungu (indigo) agar sesuai dengan gambar */
      className="bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-lg h-full"
    >
      {/* Icon dekorasi di latar belakang (dibuat agak transparan) */}
      <div className="absolute -right-6 -top-6 opacity-20 transform rotate-12">
        <Coins className="w-40 h-40" />
      </div>
      
      <div className="relative z-10">
        <span className="text-indigo-100 text-[10px] font-extrabold uppercase tracking-[0.2em]">
          Total Points
        </span>
        <h2 className="text-5xl font-bold mt-2 mb-1 tracking-tight">
          {points.toLocaleString("id-ID")}<span className="text-xl font-medium ml-1">pts</span>
        </h2>
        <p className="text-indigo-100/80 text-xs font-medium">
          Equivalent to Rp {equivalentValue.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="relative z-10 mt-8">
        <button className="w-full bg-white text-[#4F46E5] font-extrabold py-3.5 rounded-xl shadow-md hover:bg-indigo-50 transition-all text-xs uppercase tracking-[0.15em]">
          Redeem Points
        </button>
      </div>
    </motion.div>
  );
}