import React, { useState } from "react";
import { useOrderStore } from "../../store/useOrderStore";
import { eventService } from "../../services/CreateOrderService/api";
import { motion } from "framer-motion";
import { Ticket, Tag, Users, Coins } from "lucide-react";

export const Rewards: React.FC = () => {
  // const {
  //   appCoupon,
  //   setAppCoupon,
  //   eventVoucher,
  //   setEventVoucher,
  //   referralCode,
  //   setReferralCode,
  //   pointsToUse,
  //   setPointsToUse,
  //   availablePoints,
  //   isPointsEnabled,
  //   togglePoints,
  // } = useOrderStore();

  const [loading, setLoading] = useState<string | null>(null);

  const handleApply = async (type: string, code: string) => {
    if (!code) return;
    setLoading(type);
    try {
      await eventService.applyCoupon(code);
      alert(`${type.toUpperCase()} applied!`);
    } catch (err: any) {
      alert(err.message || "Failed to apply");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-[#0F172A] mb-8">
        Rewards & Coupons
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {/* App Coupon */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
            <Tag size={16} className="text-blue-600" />
            App Coupon
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              // value={appCoupon}
              // onChange={(e) => setAppCoupon(e.target.value.toUpperCase())}
              placeholder="APP-DISCOUNT"
              className="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3.5 pr-24 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
            />
            <button
              // onClick={() => handleApply("app", appCoupon)}
              // disabled={loading === "app" || !appCoupon}
              className="absolute right-2 px-4 py-1.5 bg-[#0052CC] text-white text-[10px] font-black uppercase rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading === "app" ? "..." : "Apply"}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 font-medium ml-1">
            System-wide discount applicable to your total order.
          </p>
        </div>

        {/* Event Voucher */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
            <Ticket size={16} className="text-blue-600" />
            Event Voucher
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              // value={eventVoucher}
              // onChange={(e) => setEventVoucher(e.target.value.toUpperCase())}
              placeholder="EVENT-VOUCHER"
              className="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3.5 pr-24 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
            />
            <button
              // onClick={() => handleApply("event", eventVoucher)}
              // disabled={loading === "event" || !eventVoucher}
              className="absolute right-2 px-4 py-1.5 bg-[#0052CC] text-white text-[10px] font-black uppercase rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading === "event" ? "..." : "Apply"}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 font-medium ml-1">
            Organizer-specific discount for this event.
          </p>
        </div>

        {/* Referral Coupon */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
            <Users size={16} className="text-blue-600" />
            Referral Coupon
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              // value={referralCode}
              // onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              placeholder="REF-CODE"
              className="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3.5 pr-24 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all uppercase"
            />
            <button
              // onClick={() => handleApply("ref", referralCode)}
              // disabled={loading === "ref" || !referralCode}
              className="absolute right-2 px-4 py-1.5 bg-[#0052CC] text-white text-[10px] font-black uppercase rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading === "ref" ? "..." : "Apply"}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 font-medium ml-1">
            Earned through the referral system.
          </p>
        </div>

        {/* Use Points */}
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-[#F8FAFC] p-4 rounded-xl border border-slate-100 transition-all">
            {/* Label dan Icon */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Coins size={18} className="text-[#0052CC]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0F172A]">
                  Use Points
                </label>
                <p className="text-[10px] text-slate-500 font-medium">
                  Redeem available points for discount
                </p>
              </div>
            </div>

            {/* Info Poin & Toggle Switch */}
            <div className="flex flex-col items-end gap-2">
              {/* <span className="text-[10px] font-black text-[#0052CC] bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {availablePoints.toLocaleString()} Pts
              </span> */}

              <button
                // onClick={togglePoints}
                type="button"
                // className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shadow-inner ${
                //   isPointsEnabled ? "bg-[#0052CC]" : "bg-slate-300"
                // }`}
              >
                <motion.span
                  // animate={{ x: isPointsEnabled ? 22 : 3 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="h-4 w-4 rounded-full bg-white shadow-md"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
