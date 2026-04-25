// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Hourglass,
//   Timer,
//   ShoppingBag,
//   Calendar,
//   Ticket,
//   BadgePercent,
//   Coins,
//   Landmark,
//   ChevronDown,
//   Copy,
//   CloudUpload,
//   Plus,
//   ChevronRight,
//   Home,
//   CheckCircle2,
//   User,
// } from "lucide-react";
// import { motion } from "motion/react";
// import { TransactionStatus } from "../../../types/userType";
// import {
//   mockUser,
//   mockOrder,
//   submitPaymentProof,
//   applyVoucher,
// } from "../../../services/paymentService";

// export default function PaymentPage() {
//   const [status, setStatus] = useState<TransactionStatus>(
//     TransactionStatus.WAITING,
//   );
//   const [timeLeft, setTimeLeft] = useState(6728);
//   const [pointsUsed, setPointsUsed] = useState(false);
//   const [voucherCode, setVoucherCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);

//   const totalPrice =
//     mockOrder.ticket.price +
//     mockOrder.serviceFee -
//     discount -
//     (pointsUsed ? 20000 : 0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds: number) => {
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = seconds % 60;
//     return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   };

// //   const handleApplyVoucher = async () => {
// //     const res = await applyVoucher(voucherCode);
// //     setDiscount(res.discount);
// //   };

// //   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setUploadedFile(e.target.files[0]);
// //     }
// //   };

// //   const handleConfirmPayment = async () => {
// //     if (!uploadedFile) return;
// //     setIsUploading(true);
// //     const res = await submitPaymentProof(uploadedFile);
// //     if (res.success) {
// //       setStatus(res.status);
// //     }
// //     setIsUploading(false);
// //   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText("8832 0912 3341 00");
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-10">
//       {" "}
//       {/* Navbar Dihapus, Padding Top ditambah */}
//       <main className="max-w-6xl mx-auto px-6">
//         {/* Tombol Back Manual (Opsional karena Navbar hilang) */}
//         <div className="mb-8 flex items-center gap-3">
//           <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-[#004BB2] hover:scale-105 transition-transform">
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-7 space-y-8">
//             {/* Status Banner */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center justify-between"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#004BB2]">
//                   <Hourglass className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                     Transaction Status
//                   </p>
//                   <p className="text-lg font-bold text-gray-800">{status}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                   Time Remaining
//                 </p>
//                 <div className="flex items-center gap-2 text-red-500 font-bold">
//                   <Timer className="w-4 h-4" />
//                   <span className="text-xl tabular-nums">
//                     {formatTime(timeLeft)}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Order Summary */}
//             <section>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#004BB2]">
//                 <ShoppingBag className="w-5 h-5" />
//                 Order Summary
//               </h2>
//               <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
//                 <div className="flex gap-4">
//                   <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 group relative">
//                     <img
//                       alt="Event"
//                       className="w-full h-full object-cover"
//                       src={mockOrder.event.image}
//                     />
//                   </div>
//                   <div className="flex-grow">
//                     <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-1">
//                       {mockOrder.event.title}
//                     </h3>
//                     <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
//                       <Calendar className="w-3.5 h-3.5" />
//                       <span>{mockOrder.event.date}</span>
//                     </div>
//                     <div className="inline-flex bg-blue-50 px-3 py-1 rounded-full text-[10px] font-bold text-[#004BB2] uppercase tracking-wide">
//                       {mockOrder.ticket.type} • Seat {mockOrder.ticket.seat}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="pt-6 border-t border-gray-50 space-y-3">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Ticket Price (1x)</span>
//                     <span className="font-bold text-gray-900">
//                       Rp {mockOrder.ticket.price.toLocaleString("id-ID")}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Service Fee</span>
//                     <span className="font-bold text-gray-900">
//                       Rp {mockOrder.serviceFee.toLocaleString("id-ID")}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Offers & Rewards */}
//             <section className="space-y-4">
//               <h2 className="text-lg font-bold flex items-center gap-2 text-[#004BB2]">
//                 <BadgePercent className="w-5 h-5" />
//                 Offers & Rewards
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
//                   <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
//                     Voucher Code
//                   </label>
//                   <div className="flex gap-2">
//                     <input
//                       className="flex-grow bg-gray-50 border-none rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-100"
//                       placeholder="Enter code"
//                       type="text"
//                       value={voucherCode}
//                       onChange={(e) => setVoucherCode(e.target.value)}
//                     />
//                     <button
//                       onClick={handleApplyVoucher}
//                       className="bg-[#004BB2] text-white text-[10px] font-bold px-4 rounded-lg hover:opacity-90 transition-all uppercase"
//                     >
//                       Apply
//                     </button>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
//                   <div>
//                     <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                       Use Points
//                     </label>
//                     <p className="text-sm font-bold text-[#004BB2]">
//                       {mockUser.points.toLocaleString("id-ID")} pts available
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setPointsUsed(!pointsUsed)}
//                     className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${pointsUsed ? "bg-blue-600" : "bg-gray-200"}`}
//                   >
//                     <span
//                       className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${pointsUsed ? "translate-x-6" : "translate-x-1"}`}
//                     />
//                   </button>
//                 </div>
//               </div>
//             </section>

//             {/* Payment Method */}
//             <section>
//               <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#004BB2]">
//                 <Landmark className="w-5 h-5" />
//                 Payment Method
//               </h2>
//               <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//                 <div className="p-5 bg-blue-50/30 flex items-center justify-between border-b border-gray-50">
//                   <div className="flex items-center gap-4">
//                     <div className="bg-white px-2 py-1 rounded border border-gray-200">
//                       <span className="font-black italic text-blue-900 text-[10px] uppercase">
//                         Bank
//                       </span>
//                     </div>
//                     <div>
//                       <p className="font-bold text-sm text-gray-800">
//                         Bank Transfer (Manual Verification)
//                       </p>
//                       <p className="text-[10px] text-gray-400 italic font-medium">
//                         BCA Digital Concierge Services
//                       </p>
//                     </div>
//                   </div>
//                   <ChevronDown className="w-5 h-5 text-[#004BB2]" />
//                 </div>
//                 <div className="p-8 space-y-6 text-center">
//                   <div className="bg-blue-50/20 p-6 rounded-xl border-2 border-dashed border-blue-100">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
//                       Virtual Account Number
//                     </p>
//                     <div className="flex items-center justify-center gap-4">
//                       <p className="text-2xl md:text-3xl font-bold tracking-widest text-[#004BB2]">
//                         8832 0912 3341 00
//                       </p>
//                       <button
//                         onClick={copyToClipboard}
//                         className="text-[#004BB2] hover:bg-blue-50 p-2 rounded-lg transition-colors"
//                       >
//                         <Copy className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-500 space-y-2 text-left px-4 font-medium">
//                     <p>
//                       01 Copy the account number and transfer the exact total
//                       amount below.
//                     </p>
//                     <p>
//                       02 Make sure to save your transfer receipt in JPG or PDF.
//                     </p>
//                     <p>
//                       03 Upload the receipt area on the right for verification.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* Right Column (Sticky) */}
//           <div className="lg:col-span-5">
//             <div className="sticky top-10 space-y-6">
//               {" "}
//               {/* Top disesuaikan karena Navbar hilang */}
//               <motion.div
//                 layout
//                 className="bg-[#004BB2] text-white rounded-2xl p-8 shadow-xl shadow-blue-100 relative overflow-hidden"
//               >
//                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
//                 <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-6">
//                   Total Payment
//                 </h2>
//                 <div className="flex items-baseline gap-2 mb-8">
//                   <span className="text-2xl font-medium opacity-60">Rp</span>
//                   <span className="text-5xl font-black tracking-tighter">
//                     {totalPrice.toLocaleString("id-ID")}
//                   </span>
//                 </div>
//                 <div className="pt-6 border-t border-white/10 flex justify-between text-xs opacity-90">
//                   <span>Subtotal</span>
//                   <span className="font-bold">
//                     Rp{" "}
//                     {(
//                       mockOrder.ticket.price + mockOrder.serviceFee
//                     ).toLocaleString("id-ID")}
//                   </span>
//                 </div>
//               </motion.div>
//               <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-100">
//                 <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#004BB2]">
//                   <CloudUpload className="w-5 h-5" />
//                   Upload Proof
//                 </h3>
//                 <label
//                   className={`group relative flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed rounded-xl transition-all cursor-pointer ${uploadedFile ? "border-green-400 bg-green-50" : "border-gray-100 hover:bg-blue-50"}`}
//                 >
//                   <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
//                     {uploadedFile ? (
//                       <CheckCircle2 className="w-8 h-8 text-green-500" />
//                     ) : (
//                       <Plus className="w-8 h-8 text-[#004BB2]" />
//                     )}
//                   </div>
//                   <p className="text-sm font-bold text-gray-800">
//                     {uploadedFile
//                       ? uploadedFile.name
//                       : "Click to select or drag proof"}
//                   </p>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold">
//                     JPG, PNG or PDF (Max 5MB)
//                   </p>
//                   <input
//                     className="hidden"
//                     type="file"
//                     onChange={handleFileUpload}
//                   />
//                 </label>

//                 <button
//                   disabled={!uploadedFile || isUploading}
//                   onClick={handleConfirmPayment}
//                   className={`w-full mt-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${!uploadedFile || isUploading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#004BB2] text-white shadow-lg shadow-blue-100 hover:opacity-90"}`}
//                 >
//                   {isUploading ? "Uploading..." : "Confirm Payment"}
//                   {!isUploading && <ChevronRight className="w-5 h-5" />}
//                 </button>
//                 <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed italic px-4 font-medium">
//                   By clicking confirm, you agree bahwa pembayaran akan
//                   diverifikasi manual dalam 15-30 menit.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ArrowLeft,
  Hourglass,
  Timer,
  ShoppingBag,
  Calendar,
  BadgePercent,
  Landmark,
  ChevronDown,
  Copy,
  CloudUpload,
  ChevronRight,
  CheckCircle2,
  Plus,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import axiosInstance from "../../../api/axiosInstance";

// ─── Types (inferred from order service response shape) ───────────────────────
interface OrderTicket {
  ticketId: string;
  type: string;
  seat?: string;
  price: number;
}

interface OrderEvent {
  eventId: string;
  title: string;
  date: string;
  image?: string;
  location?: string;
}

interface OrderDetails {
  orderId: string;
  status: string;           // WAITING_FOR_PAYMENT, WAITING_FOR_ADMIN_CONFIRMATION, DONE, REJECTED, EXPIRED
  totalPrice: number;
  serviceFee?: number;
  expiredAt?: string;       // ISO date for countdown
  createdAt: string;
  event: OrderEvent;
  tickets: OrderTicket[];
  paymentProof?: string;    // URL if already uploaded
  pointsUsed?: boolean;
  pointsDiscount?: number;
  couponDiscount?: number;
}

// ─── Data Fetching ────────────────────────────────────────────────────────────
function useOrderDetails(orderId: string) {
  return useQuery<OrderDetails>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/order/details/${orderId}`);
      // GET /api/order/details/:orderId → { status, message, data: orderDetails }
      return res.data?.data ?? res.data;
    },
    enabled: !!orderId,
    refetchInterval: 30_000, // poll every 30s to catch status changes
  });
}

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(expiredAt?: string) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!expiredAt) return;
    const calc = () => {
      const diff = Math.max(0, Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1000));
      setSecondsLeft(diff);
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [expiredAt]);

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  const formatted = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  return { secondsLeft, formatted, expired: secondsLeft === 0 };
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  WAITING_FOR_PAYMENT:              { label: "Waiting for Payment",      color: "text-amber-700",  bg: "bg-amber-50"  },
  WAITING_FOR_ADMIN_CONFIRMATION:   { label: "Awaiting Confirmation",    color: "text-blue-700",   bg: "bg-blue-50"   },
  DONE:                             { label: "Payment Confirmed",         color: "text-green-700",  bg: "bg-green-50"  },
  REJECTED:                         { label: "Payment Rejected",          color: "text-red-700",    bg: "bg-red-50"    },
  EXPIRED:                          { label: "Order Expired",             color: "text-gray-600",   bg: "bg-gray-100"  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: "text-gray-700", bg: "bg-gray-100" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cfg.color} ${cfg.bg}`}>
      {cfg.label}
    </span>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2
        ${type === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}
    >
      {type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading, isError, refetch } = useOrderDetails(orderId!);
  const { secondsLeft, formatted, expired } = useCountdown(order?.expiredAt);

  // Upload proof state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Copy state
  const [copied, setCopied] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ✅ PATCH /api/payment/upload-proof — multipart/form-data with orderId + payment file
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!uploadedFile || !orderId) throw new Error("Missing file or orderId");
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("payment", uploadedFile); // field name confirmed from multer: upload.single("payment")
      const res = await axiosInstance.patch("/payment/upload-proof", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      showToast("Payment proof uploaded! Awaiting admin confirmation.", "success");
      refetch(); // refresh order status
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Upload failed. Please try again.";
      showToast(msg, "error");
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("File must be smaller than 5MB", "error");
      return;
    }
    setUploadedFile(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setUploadPreview(null);
    }
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("8832 0912 3341 00");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-[#004BB2]">
          <div className="w-12 h-12 border-4 border-[#004BB2] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold tracking-wide">Loading order details…</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────────
  if (isError || !order) {
    return (
      <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <p className="text-gray-700 font-semibold">Failed to load order details.</p>
          <button
            onClick={() => refetch()}
            className="px-5 py-2 bg-[#004BB2] text-white rounded-xl text-sm font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const isWaitingPayment = order.status === "WAITING_FOR_PAYMENT";
  const isWaitingConfirmation = order.status === "WAITING_FOR_ADMIN_CONFIRMATION";
  const isDone = order.status === "DONE";
  const isRejected = order.status === "REJECTED";
  const canUpload = isWaitingPayment && !expired;

  // Compute price breakdown
  const ticketSubtotal = order.tickets.reduce((sum, t) => sum + t.price, 0);
  const serviceFee = order.serviceFee ?? 0;
  const couponDiscount = order.couponDiscount ?? 0;
  const pointsDiscount = order.pointsDiscount ?? 0;
  const total = order.totalPrice;

  return (
    <div className="min-h-screen bg-[#F0F4FF] pb-24 pt-10">
      <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} />}</AnimatePresence>

      <main className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-[#004BB2] hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
            <p className="text-xs text-gray-400 mt-0.5">Order #{order.orderId.slice(0, 8).toUpperCase()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Left Column ────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-6">

            {/* Status + Countdown Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center
                    ${isDone ? "bg-green-50 text-green-600" : isRejected ? "bg-red-50 text-red-500" : "bg-blue-50 text-[#004BB2]"}`}>
                    <Hourglass className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Transaction Status
                    </p>
                    <StatusBadge status={order.status} />
                  </div>
                </div>

                {/* Countdown — only show while waiting for payment */}
                {isWaitingPayment && (
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Time Remaining
                    </p>
                    <div className={`flex items-center gap-2 font-bold text-xl tabular-nums
                      ${expired ? "text-gray-400" : secondsLeft < 300 ? "text-red-500" : "text-[#004BB2]"}`}>
                      <Timer className="w-4 h-4" />
                      {expired ? "Expired" : formatted}
                    </div>
                  </div>
                )}
              </div>

              {/* Rejection notice */}
              {isRejected && (
                <div className="mt-4 p-3 bg-red-50 rounded-xl text-sm text-red-600 font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  Your payment was rejected. Please re-upload a valid proof of transfer.
                </div>
              )}

              {/* Confirmation waiting notice */}
              {isWaitingConfirmation && (
                <div className="mt-4 p-3 bg-blue-50 rounded-xl text-sm text-blue-700 font-medium flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  Proof uploaded! Admin verification typically takes 15–30 minutes.
                </div>
              )}
            </motion.div>

            {/* Order Summary */}
            <section>
              <h2 className="text-base font-bold mb-3 flex items-center gap-2 text-[#004BB2]">
                <ShoppingBag className="w-5 h-5" />
                Order Summary
              </h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
                {/* Event info */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    {order.event.image ? (
                      <img src={order.event.image} alt={order.event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Calendar className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-gray-900 leading-tight truncate">{order.event.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{new Date(order.event.date).toLocaleDateString("id-ID", {
                        weekday: "long", day: "numeric", month: "long", year: "numeric"
                      })}</span>
                    </div>
                    {order.event.location && (
                      <p className="text-xs text-gray-400 mt-0.5">{order.event.location}</p>
                    )}
                  </div>
                </div>

                {/* Tickets */}
                <div className="space-y-2 pt-4 border-t border-gray-50">
                  {order.tickets.map((ticket) => (
                    <div key={ticket.ticketId} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-semibold text-gray-800">{ticket.type}</span>
                        {ticket.seat && <span className="text-gray-400 ml-1.5">· Seat {ticket.seat}</span>}
                      </div>
                      <span className="font-bold text-gray-900">
                        Rp {ticket.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="space-y-2 pt-4 border-t border-gray-50 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">Rp {ticketSubtotal.toLocaleString("id-ID")}</span>
                  </div>
                  {serviceFee > 0 && (
                    <div className="flex justify-between text-gray-500">
                      <span>Service Fee</span>
                      <span className="font-semibold text-gray-800">Rp {serviceFee.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1"><BadgePercent className="w-3.5 h-3.5" /> Coupon</span>
                      <span className="font-semibold">− Rp {couponDiscount.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {pointsDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Points Used</span>
                      <span className="font-semibold">− Rp {pointsDiscount.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-base font-bold mb-3 flex items-center gap-2 text-[#004BB2]">
                <Landmark className="w-5 h-5" />
                Payment Method
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-blue-50/40 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-white px-2 py-1 rounded border border-gray-200">
                      <span className="font-black italic text-blue-900 text-[10px] uppercase">Bank</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">Bank Transfer · Manual Verification</p>
                      <p className="text-[10px] text-gray-400 italic">BCA Digital Concierge Services</p>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#004BB2]" />
                </div>

                <div className="p-6 space-y-5 text-center">
                  <div className="bg-[#F0F4FF] p-5 rounded-xl border-2 border-dashed border-blue-200">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Virtual Account Number
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-2xl md:text-3xl font-black tracking-widest text-[#004BB2]">
                        8832 0912 3341 00
                      </p>
                      <button
                        onClick={handleCopyAccountNumber}
                        className="p-2 rounded-lg hover:bg-blue-100 transition-colors text-[#004BB2]"
                        title="Copy account number"
                      >
                        {copied
                          ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                          : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    {copied && <p className="text-xs text-green-600 font-semibold mt-1">Copied!</p>}
                  </div>

                  <ol className="text-xs text-gray-500 space-y-1.5 text-left px-2 font-medium list-none">
                    <li className="flex gap-2"><span className="text-[#004BB2] font-bold">01</span> Copy the account number and transfer the exact total amount.</li>
                    <li className="flex gap-2"><span className="text-[#004BB2] font-bold">02</span> Save your transfer receipt as JPG or PDF.</li>
                    <li className="flex gap-2"><span className="text-[#004BB2] font-bold">03</span> Upload the receipt on the right panel for verification.</li>
                  </ol>
                </div>
              </div>
            </section>
          </div>

          {/* ── Right Column (Sticky) ───────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 space-y-5">

              {/* Total Payment Card */}
              <motion.div
                layout
                className="bg-[#004BB2] text-white rounded-2xl p-8 shadow-xl shadow-blue-200 relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-5">Total Payment</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-xl font-medium opacity-60">Rp</span>
                  <span className="text-5xl font-black tracking-tighter">
                    {total.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="pt-5 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between opacity-80">
                    <span>Subtotal</span>
                    <span className="font-bold">Rp {ticketSubtotal.toLocaleString("id-ID")}</span>
                  </div>
                  {serviceFee > 0 && (
                    <div className="flex justify-between opacity-80">
                      <span>Service Fee</span>
                      <span className="font-bold">Rp {serviceFee.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {(couponDiscount > 0 || pointsDiscount > 0) && (
                    <div className="flex justify-between text-green-300">
                      <span>Discounts</span>
                      <span className="font-bold">− Rp {(couponDiscount + pointsDiscount).toLocaleString("id-ID")}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Upload Proof Card */}
              <div className={`bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed
                ${canUpload || isRejected ? "border-blue-200" : "border-gray-100"}`}>
                <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-[#004BB2]">
                  <CloudUpload className="w-5 h-5" />
                  Upload Proof
                </h3>

                {/* Already confirmed */}
                {isDone && (
                  <div className="flex flex-col items-center gap-3 py-8 text-center">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="font-bold text-gray-800">Payment Confirmed</p>
                    <p className="text-sm text-gray-400">Your tickets have been issued. Check your email.</p>
                  </div>
                )}

                {/* Waiting confirmation (proof already uploaded) */}
                {isWaitingConfirmation && (
                  <div className="flex flex-col items-center gap-3 py-8 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                      <Hourglass className="w-8 h-8 text-[#004BB2]" />
                    </div>
                    <p className="font-bold text-gray-800">Proof Submitted</p>
                    <p className="text-sm text-gray-400">Verification takes 15–30 minutes.</p>
                    {order.paymentProof && (
                      <a
                        href={order.paymentProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#004BB2] underline font-semibold"
                      >
                        View uploaded proof
                      </a>
                    )}
                  </div>
                )}

                {/* Upload area — available when WAITING_FOR_PAYMENT or REJECTED */}
                {(canUpload || isRejected) && (
                  <>
                    <label
                      className={`group relative flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed rounded-xl transition-all cursor-pointer
                        ${uploadedFile
                          ? "border-green-400 bg-green-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/30"}`}
                    >
                      {/* Image preview */}
                      {uploadPreview ? (
                        <img src={uploadPreview} alt="Preview" className="max-h-32 rounded-lg mb-3 object-contain" />
                      ) : (
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                          {uploadedFile
                            ? <CheckCircle2 className="w-8 h-8 text-green-500" />
                            : <Plus className="w-8 h-8 text-[#004BB2]" />}
                        </div>
                      )}
                      <p className="text-sm font-bold text-gray-700 text-center">
                        {uploadedFile ? uploadedFile.name : "Click to select or drag proof"}
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold">
                        JPG, PNG or PDF · Max 5MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>

                    {uploadedFile && (
                      <button
                        onClick={() => { setUploadedFile(null); setUploadPreview(null); }}
                        className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
                      >
                        Remove file
                      </button>
                    )}

                    <button
                      disabled={!uploadedFile || uploadMutation.isPending}
                      onClick={() => uploadMutation.mutate()}
                      className={`w-full mt-4 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm
                        ${!uploadedFile || uploadMutation.isPending
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[#004BB2] text-white shadow-lg shadow-blue-100 hover:opacity-90"}`}
                    >
                      {uploadMutation.isPending
                        ? <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Uploading…
                          </>
                        : <>Confirm Payment <ChevronRight className="w-4 h-4" /></>}
                    </button>

                    <p className="text-[10px] text-center text-gray-400 mt-3 leading-relaxed italic px-2">
                      By clicking confirm, you agree that payment will be manually verified within 15–30 minutes.
                    </p>
                  </>
                )}

                {/* Expired state */}
                {expired && isWaitingPayment && (
                  <div className="flex flex-col items-center gap-3 py-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Timer className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-bold text-gray-700">Order Expired</p>
                    <p className="text-sm text-gray-400">The payment window has closed.</p>
                    <button
                      onClick={() => navigate(-1)}
                      className="mt-2 px-5 py-2 bg-[#004BB2] text-white rounded-xl text-sm font-bold"
                    >
                      Back to Events
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

