// import { ChevronRight, Clock, Ticket } from "lucide-react";
// import type { Coupon } from "../types/userType";
// import { cn } from "../lib/utils";


// interface CouponsSectionProps {
//   coupons: Coupon[];
// }

// export default function CouponsSection({ coupons }: CouponsSectionProps) {
//   return (
//     <section>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-xl font-bold headline-font flex items-center gap-2">
//           <Ticket className="w-5 h-5 text-primary" />
//           Available Coupons
//         </h3>
//         <button className="text-sm font-bold text-primary hover:underline">View All</button>
//       </div>
//       <div className="space-y-4">
//         {coupons.map((coupon) => (
//           <div
//             key={coupon.id}
//             className="bg-surface-container rounded-xl flex overflow-hidden shadow-ambient relative group border border-outline"
//           >
//             <div
//               className={cn(
//                 "w-24 flex flex-col items-center justify-center text-on-primary p-4 relative",
//                 coupon.color === "tertiary" ? "bg-tertiary" : "bg-primary"
//               )}
//             >
//               <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface border-r border-outline rounded-full" />
//               <span className="text-2xl font-black headline-font">{coupon.discount}</span>
//               <span className="text-[10px] font-bold uppercase tracking-tighter">{coupon.type}</span>
//             </div>
//             <div className="flex-1 p-5 flex flex-col justify-center">
//               <h4 className="font-bold text-on-surface mb-1 text-sm">{coupon.title}</h4>
//               <p className="text-[11px] text-on-surface-variant mb-3">{coupon.description}</p>
//               <div className="flex items-center gap-1.5 text-[10px] font-bold text-error uppercase tracking-wider">
//                 <Clock className="w-3.5 h-3.5" />
//                 Expires in {coupon.expiry}
//               </div>
//             </div>
//             <div className="p-5 flex items-center">
//               <button className="bg-surface-container-high text-on-surface-variant p-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all border border-outline">
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { ChevronRight, Clock, Ticket } from "lucide-react";
import type { Coupon } from "../types/userType";
import { cn } from "../lib/utils";


interface CouponsSectionProps {
  coupons: Coupon[];
}

export default function CouponsSection({ coupons }: CouponsSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          {/* Icon warna biru/indigo sesuai gambar */}
          <Ticket className="w-5 h-5 text-[#4F46E5]" />
          Available Coupons
        </h3>
        <button className="text-sm font-bold text-[#4F46E5] hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {coupons.map((coupon, index) => (
          <div
            key={coupon.id}
            // Background putih agar kontras di atas body biru muda
            className="bg-white rounded-2xl flex overflow-hidden shadow-sm relative group border border-slate-100"
          >
            {/* Bagian Warna Samping (Ticket Stub) */}
            <div
              className={cn(
                "w-24 flex flex-col items-center justify-center text-white p-4 relative",
                // Kupon pertama Hijau (20%), sisanya Biru/Indigo (50k) sesuai gambar
                index === 0 ? "bg-emerald-500" : "bg-[#4F46E5]"
              )}
            >
              {/* Efek lubang tiket (setengah lingkaran) di kiri */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F8FAFC] border-r border-slate-100 rounded-full" />
              
              <span className="text-2xl font-black">
                {/* Logika untuk menampilkan format diskon */}
                {typeof coupon.discountAmount === 'number' && coupon.discountAmount <= 100 
                  ? `${coupon.discountAmount}%` 
                  : `${(coupon.discountAmount / 1000)}k`}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                {typeof coupon.discountAmount === 'number' && coupon.discountAmount <= 100 ? 'OFF' : 'IDR'}
              </span>
            </div>

            {/* Bagian Detail Konten */}
            <div className="flex-1 p-5 flex flex-col justify-center">
              <h4 className="font-bold text-slate-800 mb-1 text-sm">{coupon.title}</h4>
              <p className="text-[11px] text-slate-500 mb-3">{coupon.description}</p>
              
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                {/* Menggunakan property expiresAt atau expiry sesuai type Anda */}
                Expires in 3 Months
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="p-5 flex items-center">
              <button className="bg-slate-50 text-slate-400 p-2 rounded-xl hover:bg-[#4F46E5] hover:text-white transition-all border border-slate-100">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}