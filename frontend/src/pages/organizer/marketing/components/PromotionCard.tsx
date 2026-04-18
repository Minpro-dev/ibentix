import { RiCalendarLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

interface CouponProps {
  couponCode: string;
  eventName: string;
  validFrom: string;
  validUntil: string;
  discountAmount: string;
}

export default function PromotionCard({
  couponCode,
  eventName,
  validFrom,
  validUntil,
  discountAmount,
}: CouponProps) {
  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-zinc-100 rounded-2xl hover:border-indigo-100 hover:shadow-sm transition-all duration-300">
      <div className="flex gap-5 items-start">
        {/* Discount Badge */}
        <div className="shrink-0 w-14 h-14 bg-indigo-50 rounded-xl flex flex-col items-center justify-center text-indigo-600">
          <span className="text-lg font-bold">{Number(discountAmount)}%</span>
          <span className="text-[10px] font-medium uppercase tracking-wider">
            OFF
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-zinc-900 tracking-tight">
              {couponCode}
            </h3>
            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[10px] rounded-full font-medium">
              COUPON
            </span>
          </div>
          <p className="text-sm text-zinc-500">{eventName}</p>

          <div className="flex items-center gap-4 pt-2 text-[12px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <RiCalendarLine />
              <span>
                {new Date(validFrom).toLocaleDateString()} —{" "}
                {new Date(validUntil).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-5">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Active
        </div>

        <div>
          <MdDelete className="text-3xl text-red-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
