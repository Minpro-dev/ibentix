import {
  RiCloseLine,
  RiUser3Line,
  RiCalendarEventLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiImageLine,
} from "react-icons/ri";
import StatusBadge from "./StatusBadge";
import Swal from "sweetalert2";
import { useUpdatePaymentStatus } from "../hooks/useUpdatePaymentStatus";
import Button from "../../../../ui/Button";
import { capitalize } from "../../../../utils/capitalize";
import { BADGE_STYLE } from "../../../../static/badgeStatusStyle";

interface OrderDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function OrderDetailsSheet({
  isOpen,
  onClose,
  order,
}: OrderDetailsSheetProps) {
  const { mutateAsync, isPending } = useUpdatePaymentStatus();
  if (!order) return null;

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(amount));
  };

  const handleDelete = (orderId: string, paymentStatus: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot revert the status",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, save it!",

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
        onClose();
      }
    });
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-60 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* SLIDE-OVER PANEL (3/4 Page or Half) */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[70%] lg:w-[60%] bg-zinc-50 z-70 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-zinc-100 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <RiCloseLine size={24} className="text-zinc-400" />
            </button>
            <div>
              <h2 className="text-xl font-black text-zinc-900 tracking-tight">
                Order Details
              </h2>
              <p className="text-zinc-500 text-xs font-medium">
                {order.invoiceNumber}
              </p>
            </div>
          </div>
          {/* <div className="px-4 py-1.5 bg-amber-50 border border-amber-100 rounded-full"> */}
          <StatusBadge color={BADGE_STYLE[order.payment.paymentStatus]}>
            {order.payment.paymentStatus.replace(/_/g, " ")}
          </StatusBadge>
          {/* </div> */}
        </div>

        {/* CONTENT AREA (Scrollable) */}
        <div className="h-[calc(100%-88px)] overflow-y-auto p-6 md:p-8 space-y-8">
          {/* 1. EVENT & SUMMARY */}
          <section className="bg-white p-8 rounded-4xl border border-zinc-100 shadow-sm space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">
                Transaction For
              </p>
              <h3 className="text-2xl font-bold text-zinc-900">
                {order.event.title}
              </h3>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <RiCalendarEventLine />
                {new Date(order.event.eventDate).toLocaleDateString("id-ID", {
                  dateStyle: "medium",
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-50">
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  Quantity
                </p>
                <p className="text-base font-bold text-zinc-800">
                  {order.ticketQuantity} Tickets
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  Total Paid
                </p>
                <p className="text-xl font-black text-indigo-600 tracking-tight">
                  {formatCurrency(order.totalAmount)}
                </p>
              </div>
            </div>
          </section>

          {/* 2. ATTENDEE LIST */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 ml-2">
              <RiUser3Line className="text-indigo-500" />
              <h4 className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">
                Attendee Details
              </h4>
            </div>
            <div className="bg-white border border-zinc-100 rounded-[28px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-zinc-50/50 border-b border-zinc-50">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase">
                        Code
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {order.tickets.map((ticket: any) => (
                      <tr key={ticket.ticketId}>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-zinc-800">
                            {capitalize(ticket.attendeeName)}
                          </p>
                          <p className="text-[11px] text-zinc-400">
                            {capitalize(ticket.attendeeEmail)}
                          </p>
                        </td>
                        <td className="px-6 py-4 font-mono text-[11px] text-zinc-500 font-bold uppercase">
                          {ticket.ticketCode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 3. PAYMENT PROOF */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 ml-2">
              <RiImageLine className="text-indigo-500" />
              <h4 className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">
                Payment Proof
              </h4>
            </div>
            <div className="aspect-video bg-white rounded-4xl border border-zinc-100 p-4 flex items-center justify-center overflow-hidden">
              {order.payment.paymentProof ? (
                <img
                  src={order.payment.paymentProof}
                  alt="Proof"
                  className="w-full h-full object-contain rounded-2xl"
                />
              ) : (
                <div className="text-center space-y-2">
                  <RiImageLine size={40} className="mx-auto text-zinc-200" />
                  <p className="text-xs text-zinc-400 italic">
                    No proof uploaded
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* BOTTOM ACTIONS (STICKY) */}
          {order.payment.paymentStatus === "WAITING_FOR_ADMIN_CONFIRMATION" && (
            <div className="sticky bottom-0 left-0 w-full p-6 bg-linear-to-t from-zinc-50 via-zinc-50 to-transparent flex gap-3">
              <Button
                variant={"danger"}
                disabled={isPending}
                onClick={() => handleDelete(order.orderId, "REJECTED")}>
                {!isPending && <RiCloseCircleLine size={18} />}
                {isPending ? "Hold on..." : "Reject"}
              </Button>
              <Button
                disabled={isPending}
                onClick={() => handleDelete(order.orderId, "DONE")}>
                {!isPending && <RiCheckboxCircleLine size={18} />}
                {isPending ? "Hold on..." : "Confirm"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
