import { RiMapPin2Line, RiTicket2Line } from "react-icons/ri";
import defaultThumbnail from "../../../../assets/static/EventThumnailImage.jpg";
import { useNavigate } from "react-router-dom";
import type { OrderListItem } from "../types/myOrderType";
import { useCountdown } from "../hooks/useCountDown";
import { updatePaymentStatus } from "../../../../services/paymentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const statusConfig = {
  WAITING_FOR_PAYMENT: {
    label: "Waiting Payment",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  WAITING_FOR_ADMIN_CONFIRMATION: {
    label: "Verifying",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  DONE: { label: "Paid", color: "bg-green-50 text-green-600 border-green-100" },
  REJECTED: {
    label: "Rejected",
    color: "bg-red-50 text-red-600 border-red-100",
  },
  EXPIRED: {
    label: "Expired",
    color: "bg-gray-100 text-gray-500 border-gray-200",
  },
  CANCELED: {
    label: "Canceled",
    color: "bg-gray-100 text-gray-500 border-gray-200",
  },
};

export default function OrderCard({ order }: { order: OrderListItem }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const status = statusConfig[order.payment.paymentStatus];

  const { mutate: expireOrder } = useMutation({
    mutationFn: () => updatePaymentStatus(order.orderId as string, "EXPIRED"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", "details", order.orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders", "history"],
      });
    },
  });

  const timeLeft = useCountdown(order?.createdAt || "", () => {
    if (order?.payment?.paymentStatus === "WAITING_FOR_PAYMENT") {
      expireOrder();
    }
  });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 transition-all hover:shadow-sm hover:border-indigo-100">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Thumbnail */}
        <img
          src={order.event.thumbnailUrl || defaultThumbnail}
          className="w-full md:w-28 h-28 object-cover rounded-xl"
          alt="event"
        />

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <div>
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full border ${status.color}`}>
                  {status.label}
                </span>
              </div>
              {timeLeft && timeLeft !== "EXPIRED" && (
                <div className="px-2.5 py-1 flex items-center justify-center text-[10px] text-amber-500 border border-amber-200 bg-amber-50 rounded-full">
                  <span>{timeLeft}</span>
                </div>
              )}
            </div>
            <span className="text-[10px] text-gray-400">
              {order.invoiceNumber}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 leading-tight">
            {order.event.title}
          </h3>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
            <div className="flex items-center gap-1">
              <RiMapPin2Line /> {order.event.city}
            </div>
            <div className="flex items-center gap-1">
              <RiTicket2Line /> {order.ticketQuantity} Tickets
            </div>
          </div>

          <div className="pt-2 flex justify-between items-end">
            <div>
              <p className="text-[10px] text-gray-400">Total Amount</p>
              <p className="font-bold text-gray-900">
                Rp {Number(order.totalAmount).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => navigate(`/my-orders/${order.orderId}`)}
              className={`px-5 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                order.payment.paymentStatus === "WAITING_FOR_PAYMENT"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}>
              {order.payment.paymentStatus === "WAITING_FOR_PAYMENT"
                ? "Pay Now"
                : "Check Details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
