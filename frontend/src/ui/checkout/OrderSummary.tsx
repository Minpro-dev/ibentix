import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { useOrderStore } from "../../store/useOrderStore";
import { eventService } from "../../services/CreateOrderService/api";
import { handleCreateOrder } from "../../services/OrderService";

export const OrderSummary: React.FC = () => {
  const navigate = useNavigate(); // 2. Inisialisasi navigate
  const { event, subtotal, discounts, total } = useOrderStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const subValue = subtotal();
  const discValue = discounts();
  const totalValue = total();

  // const handleProceed = async () => {
  //   setIsProcessing(true);
  //   try {
  //     // Pastikan payload dikirim sesuai kebutuhan API Anda
  //     const res = await eventService.processPayment({
  //       // Misalnya mengirim data dari store:
  //       // eventId: event.id,
  //       // tickets: event.tickets,
  //       // total: totalValue 
  //     });

  //     if (res.success) {
  //       // 3. Navigasi ke halaman payment dengan ID transaksi
  //       // Asumsi respons API memberikan 'orderId' atau 'transactionId'
  //       const orderId = res.orderId || res.transactionId;
  //       navigate(`/payment/${orderId}`); 
  //     }
  //   } catch (err) {
  //     alert("Payment failed. Please try again.");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
      <h2 className="text-xl font-bold text-[#0F172A] mb-8">Order Summary</h2>

      <div className="space-y-5">
        {/* Tiket List */}
        <div className="space-y-4">
          {event.tickets.map((t, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">
                {t.type} ({t.quantity}x)
              </span>
              <span className="text-[#0F172A] font-bold">
                Rp {t.price.toLocaleString("id-ID")}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Service Fee</span>
            <span className="text-[#0F172A] font-bold">
              Rp {(15000).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Divider halus */}
        <div className="h-px bg-slate-100 w-full my-6"></div>

        {/* Subtotal & Discounts */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Subtotal</span>
            <span className="text-[#0F172A] font-bold">
              Rp {subValue.toLocaleString("id-ID")}
            </span>
          </div>
          
          {discValue.appCoupon > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-medium text-[11px]">App Coupon</span>
              <span className="text-emerald-600 font-bold">
                -Rp {discValue.appCoupon.toLocaleString("id-ID")}
              </span>
            </div>
          )}

          {discValue.eventVoucher > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-medium text-[11px]">Event Voucher</span>
              <span className="text-emerald-600 font-bold">
                -Rp {discValue.eventVoucher.toLocaleString("id-ID")}
              </span>
            </div>
          )}

          {discValue.referralPoints > 0 && (
            <div className="flex justify-between items-center text-sm pb-4">
              <span className="text-slate-400 font-medium text-[11px]">Referral Points</span>
              <span className="text-emerald-600 font-bold">
                -Rp {discValue.referralPoints.toLocaleString("id-ID")}
              </span>
            </div>
          )}
        </div>

        {/* Total Area */}
        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs font-black text-[#0F172A] uppercase tracking-widest">
            Total
          </span>
          <span className="text-2xl font-black text-[#0052CC]">
            Rp {totalValue.toLocaleString("id-ID")}
          </span>
        </div>

        {/* Main Action Button */}
        <div className="pt-6">
          <button
            onClick={() => handleCreateOrder()}
            disabled={isProcessing}
            className="w-full py-4 bg-[#0052CC] text-white rounded-xl font-bold text-base shadow-lg shadow-blue-100 hover:bg-[#0747A6] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : "Proceed to Payment"}
          </button>
          
          <div className="mt-4 px-2">
            <p className="text-[10px] text-center text-slate-400 leading-relaxed font-medium">
              By clicking the button above, you agree to our{" "}
              <a className="underline hover:text-blue-600" href="#">Terms of Service</a> dan <a className="underline hover:text-blue-600" href="#">Refund Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};