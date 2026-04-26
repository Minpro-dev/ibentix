import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiTimeLine,
  RiUserLine,
  RiErrorWarningLine,
} from "react-icons/ri";
import { formatDate } from "../../../../utils/dateFormatter";
import StatusBadge from "./StatusBadge";
import { formatCurrency } from "../../../../lib/utils";
import { useUpdatePaymentStatus } from "../hooks/useUpdatePaymentStatus";
import { ExternalLink } from "lucide-react";
import Swal from "sweetalert2";
import Button from "../../../../ui/Button";
import { BADGE_STYLE, BADGE_TEXT } from "../../../../static/badgeStatusStyle";
import { getConfirmationDeadline } from "../../../../utils/getConfirmationDeadline";

export default function OrderCard({
  order,
  onOrderClick,
}: {
  order: any;
  onOrderClick: (order: any) => void;
}) {
  const { mutateAsync, isPending } = useUpdatePaymentStatus();

  // logic countdown
  const isWaitingConfirmation =
    order?.payment?.paymentStatus === "WAITING_FOR_ADMIN_CONFIRMATION";

  const timeLeft = isWaitingConfirmation
    ? getConfirmationDeadline(order.payment.updatedAt)
    : null;

  const isVirtuallyExpired = timeLeft === "EXPIRED";

  const handleAction = (orderId: string, paymentStatus: string) => {
    // Cegah aksi jika sudah expired secara virtual
    if (isVirtuallyExpired) {
      Swal.fire({
        icon: "error",
        title: "Order Expired",
        text: "This order is past the confirmation deadline and will be cancelled by the system.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You cannot revert the status",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, save it!",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl px-5 py-2.5",
        cancelButton: "rounded-xl px-5 py-2.5",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync({
          orderId,
          paymentStatus,
        });
      }
    });
  };

  return (
    <div className="bg-white border border-zinc-100 p-6 rounded-3xl hover:border-indigo-100 transition-all duration-300">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* User & Event Info */}
        <div className="flex-1 space-y-4">
          <div className="block lg:flex gap-3 items-center">
            <div className="text-zinc-500 text-xs pb-2 font-mono">
              {order?.invoiceNumber}
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge color={BADGE_STYLE[order.payment.paymentStatus]}>
                {BADGE_TEXT[order.payment.paymentStatus]}
              </StatusBadge>

              {/* COUNTDOWN BADGE */}
              {isWaitingConfirmation && (
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${
                    isVirtuallyExpired
                      ? "bg-red-50 text-red-600 border-red-100"
                      : "bg-amber-50 text-amber-600 border-amber-100"
                  }`}>
                  {isVirtuallyExpired ? (
                    <RiErrorWarningLine />
                  ) : (
                    <RiTimeLine className="animate-pulse" />
                  )}
                  {isVirtuallyExpired ? "EXPIRED" : timeLeft}
                </div>
              )}
            </div>
          </div>
          <div>
            <div
              onClick={() => onOrderClick(order)}
              className="flex cursor-pointer gap-3 items-center hover:text-indigo-700 text-lg font-bold text-zinc-900">
              <h3>{order?.event?.title} </h3>
              <span>
                <ExternalLink size={20} />
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium">
                <RiUserLine className="text-indigo-400" />
                {order?.user?.firstName} {order?.user?.lastName}
              </span>
              <span className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium">
                <RiTimeLine className="text-indigo-400" />
                {formatDate(order?.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Detail & Proof */}
        <div className="flex flex-col sm:flex-row items-start md:items-center gap-6 lg:px-8 lg:border-x lg:border-zinc-50">
          <div className="text-left lg:text-center min-w-30">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">
              {order?.ticketQuantity} Tickets
            </p>
            <p className="text-xl font-medium text-indigo-700 tracking-tighter">
              {formatCurrency(order?.totalAmount)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isWaitingConfirmation && !isVirtuallyExpired && (
            <>
              <Button
                variant={"danger"}
                disabled={isPending}
                onClick={() => handleAction(order.orderId, "REJECTED")}>
                {!isPending && <RiCloseCircleLine size={18} />}
                {isPending ? "Hold on..." : "Reject"}
              </Button>
              <Button
                disabled={isPending}
                onClick={() => handleAction(order.orderId, "DONE")}>
                {!isPending && <RiCheckboxCircleLine size={18} />}
                {isPending ? "Hold on..." : "Confirm"}
              </Button>
            </>
          )}

          {isWaitingConfirmation && isVirtuallyExpired && (
            <div className="text-[10px] font-black text-red-500 uppercase px-4 py-2 bg-red-50 border border-red-100 rounded-xl">
              Processing Auto-Cancel
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
