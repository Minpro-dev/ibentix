import { useParams } from "react-router-dom";
import { useCountdown } from "./hooks/useCountDown";
import { getOrderDetails } from "../../../services/orderService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RiTimeLine } from "react-icons/ri";
import defaultThumbnail from "../../../assets/static/EventThumnailImage.jpg";
import ReviewForm from "./components/ReviewForm";
import { updatePaymentStatus } from "../../../services/paymentService";
import PaymentUploadModal from "./components/PaymentUploadModal";
import { useState } from "react";

export default function OrderDetailsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { orderId } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderDetails(orderId!),
  });

  const { mutate: expireOrder } = useMutation({
    mutationFn: () => updatePaymentStatus(orderId as string, "EXPIRED"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "details", orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders", "history"],
      });
    },
  });

  const handleClose = () => {
    setIsOpen((open) => !open);
  };

  const timeLeft = useCountdown(order?.createdAt || "", () => {
    if (order?.payment?.paymentStatus === "WAITING_FOR_PAYMENT") {
      expireOrder();
    }
  });

  console.log("timeLeft", timeLeft);

  // Review can be add after the eventDate (1 day)
  const isEligibleForReview = () => {
    if (!order || order?.payment.paymentStatus !== "DONE") return false;
    const eventDate = new Date(order.event.eventDate).getTime();
    const oneDayAfter = eventDate + 24 * 60 * 60 * 1000;
    return new Date().getTime() >= oneDayAfter;
  };

  //   if (isLoading) return <OrderDetailsSkeleton />;

  return (
    <div className="max-w-2xl min-h-dvh mx-auto py-10 px-4 space-y-6">
      {/* STATUS & COUNTDOWN BANNER */}
      {order?.payment?.paymentStatus === "WAITING_FOR_PAYMENT" && (
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-amber-600 font-bold">
              Complete Payment In
            </p>
            <p className="text-xl font-mono font-bold text-amber-700">
              {timeLeft}
            </p>
          </div>
          <RiTimeLine className="text-amber-400" size={32} />
        </div>
      )}

      {/*  EVENT OVERVIEW CARD */}
      <section className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex gap-5">
        <img
          src={order?.event.thumbnailUrl || defaultThumbnail}
          className="w-20 h-20 rounded-2xl object-cover"
        />
        <div>
          <h2 className="font-bold text-gray-900">{order?.event.title}</h2>
          <p className="text-xs text-gray-500">
            {order?.event.locationName}, {order?.event.city}
          </p>
          <p className="text-[11px] font-bold text-indigo-600 mt-2">
            Invoice: {order?.invoiceNumber}
          </p>
        </div>
      </section>

      {/*  TICKET HOLDERS */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Ticket Holders
        </h3>
        {order?.tickets.map((t: any) => (
          <div
            key={t.ticketId}
            className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-sm text-zinc-700">{t.attendeeName}</p>
              <p className="text-[10px] text-gray-400">{t.attendeeEmail}</p>
            </div>
          </div>
        ))}
      </section>

      {/*  ACTION AREA (Review or Upload) */}
      <div className="pt-6 border-t border-gray-100">
        {order?.payment.paymentStatus === "WAITING_FOR_PAYMENT" ? (
          <button
            onClick={handleClose}
            className="w-full py-4 cursor-pointer bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-indigo-100 shadow-lg transition-all active:scale-[0.98]">
            Upload Payment Proof
          </button>
        ) : isEligibleForReview() ? (
          <ReviewForm orderId={order?.orderId} eventId={order?.eventId} />
        ) : (
          <div className="text-center p-6 bg-gray-50 rounded-2xl text-xs text-gray-400">
            {order?.payment.paymentStatus === "DONE"
              ? "Review will be available 1 day after event."
              : "No further action required."}
          </div>
        )}
      </div>

      <PaymentUploadModal
        isOpen={isOpen}
        onClose={handleClose}
        orderId={orderId as string}
      />
    </div>
  );
}
