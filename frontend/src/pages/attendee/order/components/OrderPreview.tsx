import { RiCoinsLine, RiCoupon2Line } from "react-icons/ri";
import type { appCouponType } from "../types/appCouponType";
import type { eventCouponType } from "../types/eventCouponType";
import type { referralCouponType } from "../types/referralCoupnType";

interface OrderPreviewProps {
  appCoupon: appCouponType;
  eventCoupon: eventCouponType;
  userPoints: number;
  handleTogglePoints: () => void;
  handleReferralCoupon: () => void;
  basePrice: number;
  totalDiscount: number;
  usePoints: boolean;
  useReferralCoupon: boolean;
  qty: number;
  totalPoints: number;
  finalPrice: number;
  referralCoupon: referralCouponType;
  isPending: boolean;
}

function OrderPreview({
  appCoupon,
  eventCoupon,
  userPoints,
  handleTogglePoints,
  basePrice,
  totalDiscount,
  usePoints,
  useReferralCoupon,
  qty,
  totalPoints,
  finalPrice,
  referralCoupon,
  handleReferralCoupon,
  isPending,
}: OrderPreviewProps) {
  return (
    <div className="sticky top-12 space-y-6">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
        <h3 className="font-semibold text-lg">Order Summary</h3>

        {/* PROMO AUTO-APPLY SECTION */}
        <div className="space-y-3">
          {appCoupon && basePrice ? (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl text-green-700 text-xs font-medium">
              <div className="flex items-center gap-2">
                <RiCoupon2Line />
                <span>App Promo: {appCoupon.couponCode} Applied</span>
              </div>
              <span>-{appCoupon.discountAmount}%</span>
            </div>
          ) : null}

          {eventCoupon && basePrice ? (
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl text-indigo-700 text-xs font-medium">
              <div className="flex items-center gap-2">
                <RiCoupon2Line />
                <span>Event Promo: {eventCoupon.couponCode} Applied</span>
              </div>
              <span>-{eventCoupon.discountAmount}%</span>
            </div>
          ) : null}

          {useReferralCoupon && referralCoupon && basePrice ? (
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl text-purple-700 text-xs font-medium">
              <div className="flex items-center gap-2">
                <RiCoupon2Line />
                <span>Referral Promo: {referralCoupon.couponCode} Applied</span>
              </div>
              <span>-{referralCoupon.discountAmount}%</span>
            </div>
          ) : null}
        </div>

        {/* POINTS TOGGLE */}
        {userPoints > 0 && basePrice ? (
          <div className="flex items-center justify-between p-4 border border-dashed border-gray-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <RiCoinsLine className="text-amber-500" size={20} />
              <div>
                <p className="text-sm font-medium">Use My Points</p>
                <p className="text-[10px] text-gray-400">
                  Available: {userPoints} pts
                </p>
              </div>
            </div>
            <button
              onClick={handleTogglePoints}
              className={`w-10 h-5 rounded-full cursor-pointer transition-colors relative ${usePoints ? "bg-indigo-600" : "bg-gray-200"}`}>
              <div
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${usePoints ? "left-6" : "left-1"}`}
              />
            </button>
          </div>
        ) : null}

        {/* referralCoupon */}
        {referralCoupon && basePrice ? (
          <div className="flex items-center justify-between p-4 border border-dashed border-gray-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <RiCoupon2Line />
              <div>
                <p className="text-sm font-medium">Use My referral coupon</p>
                <p className="text-[10px] text-gray-400">
                  Discount Ammount: {referralCoupon.discountAmount}%
                </p>
              </div>
            </div>
            <button
              onClick={handleReferralCoupon}
              className={`w-10 h-5 rounded-full cursor-pointer transition-colors relative ${useReferralCoupon ? "bg-indigo-600" : "bg-gray-200"}`}>
              <div
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${useReferralCoupon ? "left-6" : "left-1"}`}
              />
            </button>
          </div>
        ) : null}

        {/* CALCULATION */}
        <div className="space-y-4 pt-4 border-t border-gray-50 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Price ({qty}x)</span>
            <span>Rp {basePrice.toLocaleString()}</span>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Total Promo Discount</span>
              <span>-Rp {totalDiscount.toLocaleString()}</span>
            </div>
          )}

          {usePoints && (
            <div className="flex justify-between text-green-600">
              <span>Total points used</span>
              <span>-Rp {totalPoints}</span>
            </div>
          )}
          <div className="flex justify-between pt-4 border-t border-gray-100 font-bold text-lg text-gray-900">
            <span>Total Payment</span>
            <span>Rp {finalPrice.toLocaleString()}</span>
          </div>
        </div>

        <button
          form="order-submit"
          type="submit"
          disabled={isPending}
          className="w-full py-4 cursor-pointer bg-gray-900 text-white rounded-2xl font-semibold text-sm hover:bg-black transition-all shadow-lg shadow-gray-200">
          {isPending ? "Hold on..." : "Proceed to Payment"}
        </button>
      </div>

      <p className="text-center text-[10px] text-gray-400">
        By clicking the button above, you agree to our Terms & Conditions.
      </p>
    </div>
  );
}

export default OrderPreview;
