// import React, { useState, useEffect } from 'react';
// import { useOrderStore } from '../hooks/useOrderStore';
// import { eventService } from '../services/api';
// import { motion } from 'motion/react';
// import { useQuery } from '@tanstack/react-query';
// import { cn } from '../../../../../lib/utils';

// export const Rewards: React.FC = () => {
//   const { 
//     appCoupon, setAppCoupon,
//     eventVoucher, setEventVoucher,
//     referralCode, setReferralCode,
//     pointsToUse, setPointsToUse,
//     availablePoints, setAvailablePoints, isPointsEnabled, togglePoints
//   } = useOrderStore();

//   const [loading, setLoading] = useState<string | null>(null);

//   // Fetch available points using useQuery
//   const { data: pointsData } = useQuery({
//     queryKey: ['userPoints'],
//     queryFn: () => eventService.getUserPoints(),
//     staleTime: 300000, // 5 minutes
//   });

//   useEffect(() => {
//     if (pointsData) {
//       setAvailablePoints(pointsData.balance);
//     }
//   }, [pointsData, setAvailablePoints]);

//   const handleApply = async (type: string, code: string) => {
//     if (!code) return;
//     setLoading(type);
//     try {
//       await eventService.applyCoupon(code);
//       alert(`${type.toUpperCase()} Applied Successfully!`);
//     } catch (err: any) {
//       alert(err.message || "Failed to apply");
//     } finally {
//       setLoading(null);
//     }
//   };

//   return (
//     <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
//       <div className="mb-8">
//         <h2 className="text-2xl font-black text-slate-900 tracking-tight font-plus-jakarta">Rewards & Coupons</h2>
//         <p className="text-sm text-slate-500 mt-1 font-medium">Apply vouchers or redeem points to save on your order.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        
//         {/* App Coupon */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
//               <span className="material-symbols-outlined text-amber-600 text-xl">confirmation_number</span>
//             </div>
//             <label className="block text-sm font-black text-slate-700 uppercase tracking-wider">App Coupon</label>
//           </div>
//           <div className="relative group">
//             <input 
//               className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 pr-24 focus:ring-0 focus:border-blue-600 focus:bg-white transition-all uppercase outline-none font-bold text-slate-900 placeholder:text-slate-300" 
//               placeholder="APP-DISCOUNT" 
//               type="text"
//               value={appCoupon}
//               onChange={(e) => setAppCoupon(e.target.value)}
//             />
//             <button 
//               onClick={() => handleApply('app', appCoupon)}
//               disabled={loading === 'app' || !appCoupon}
//               className="absolute right-2 top-2 bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
//             >
//               {loading === 'app' ? '...' : 'APPLY'}
//             </button>
//           </div>
//           <p className="text-[10px] text-slate-400 font-bold ml-1 italic">System-wide discount applicable to your total order.</p>
//         </div>

//         {/* Event Voucher */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
//               <span className="material-symbols-outlined text-blue-600 text-xl">local_activity</span>
//             </div>
//             <label className="block text-sm font-black text-slate-700 uppercase tracking-wider">Event Voucher</label>
//           </div>
//           <div className="relative group">
//             <input 
//               className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 pr-24 focus:ring-0 focus:border-blue-600 focus:bg-white transition-all uppercase outline-none font-bold text-slate-900 placeholder:text-slate-300" 
//               placeholder="EVENT-BOOST" 
//               type="text"
//               value={eventVoucher}
//               onChange={(e) => setEventVoucher(e.target.value)}
//             />
//             <button 
//               onClick={() => handleApply('event', eventVoucher)}
//               disabled={loading === 'event' || !eventVoucher}
//               className="absolute right-2 top-2 bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
//             >
//               {loading === 'event' ? '...' : 'APPLY'}
//             </button>
//           </div>
//           <p className="text-[10px] text-slate-400 font-bold ml-1 italic">Organizer-specific discount for this event.</p>
//         </div>

//         {/* Referral Coupon */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
//               <span className="material-symbols-outlined text-emerald-600 text-xl">group</span>
//             </div>
//             <label className="block text-sm font-black text-slate-700 uppercase tracking-wider">Referral Coupon</label>
//           </div>
//           <div className="relative group">
//             <input 
//               className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 pr-24 focus:ring-0 focus:border-blue-600 focus:bg-white transition-all uppercase outline-none font-bold text-slate-900 placeholder:text-slate-300" 
//               placeholder="REF-CODE" 
//               type="text"
//               value={referralCode}
//               onChange={(e) => setReferralCode(e.target.value)}
//             />
//             <button 
//               onClick={() => handleApply('referral', referralCode)}
//               disabled={loading === 'referral' || !referralCode}
//               className="absolute right-2 top-2 bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
//             >
//               {loading === 'referral' ? '...' : 'APPLY'}
//             </button>
//           </div>
//           <p className="text-[10px] text-slate-400 font-bold ml-1 italic">Earned through the referral system.</p>
//         </div>

//         {/* Use Points */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
//                 <span className="material-symbols-outlined text-indigo-600 text-xl">monetization_on</span>
//               </div>
//               <label className="block text-sm font-black text-slate-700 uppercase tracking-wider">Use Points</label>
//             </div>
//             <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-full">
//               <span className="text-[10px] font-black text-indigo-700 uppercase">Available: {availablePoints.toLocaleString()}</span>
//               <button 
//                 onClick={togglePoints}
//                 className={cn(
//                   "relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none",
//                   isPointsEnabled ? 'bg-indigo-600' : 'bg-slate-300'
//                 )}
//               >
//                 <motion.span 
//                   animate={{ x: isPointsEnabled ? 22 : 2 }}
//                   className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform" 
//                 />
//               </button>
//             </div>
//           </div>
//           <div className="relative group">
//             <input 
//               className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 pr-24 focus:ring-0 focus:border-indigo-600 focus:bg-white transition-all outline-none disabled:opacity-40 disabled:bg-slate-100 font-bold text-slate-900" 
//               placeholder="Enter points amount" 
//               type="number"
//               disabled={!isPointsEnabled}
//               value={pointsToUse || ''}
//               onChange={(e) => setPointsToUse(Math.min(availablePoints, Number(e.target.value)))}
//             />
//             <button 
//               disabled={!isPointsEnabled || !pointsToUse}
//               className="absolute right-2 top-2 bg-indigo-600 text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-0 disabled:pointer-events-none"
//             >
//               REDEEM
//             </button>
//           </div>
//           <p className="text-[10px] text-slate-400 font-bold ml-1 italic">Redeem points for direct price reduction.</p>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Field } from "formik";

export const Rewards = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">

      <h2 className="font-bold">Rewards</h2>

      {/* App Coupon */}
      <div>
        <label className="text-sm">App Coupon</label>
        <Field name="appCouponId" className="w-full border p-2 rounded" />
      </div>

      {/* Event Voucher */}
      <div>
        <label className="text-sm">Event Voucher</label>
        <Field name="eventCouponId" className="w-full border p-2 rounded" />
      </div>

      {/* Referral */}
      <div>
        <label className="text-sm">Referral Code</label>
        <Field name="referralCouponId" className="w-full border p-2 rounded" />
      </div>

      {/* Points */}
      <div className="flex items-center gap-2">
        <Field type="checkbox" name="isPointsUsed" />
        <label className="text-sm">Use Points</label>
      </div>

    </div>
  );
};