// import React, { useState, useEffect } from 'react';
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

// } from 'lucide-react';
// import { motion} from 'motion/react';
// import { TransactionStatus } from '../../types/userType';
// import { mockUser, mockOrder, submitPaymentProof, applyVoucher } from '../../services/paymentService';

// export default function PaymentPage() {
//   const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.WAITING);
//   const [timeLeft, setTimeLeft] = useState(6728);
//   const [pointsUsed, setPointsUsed] = useState(false);
//   const [voucherCode, setVoucherCode] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);

//   const totalPrice = mockOrder.ticket.price + mockOrder.serviceFee - discount - (pointsUsed ? 20000 : 0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds: number) => {
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = seconds % 60;
//     return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//   };

//   const handleApplyVoucher = async () => {
//     const res = await applyVoucher(voucherCode);
//     setDiscount(res.discount);
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setUploadedFile(e.target.files[0]);
//     }
//   };

//   const handleConfirmPayment = async () => {
//     if (!uploadedFile) return;
//     setIsUploading(true);
//     const res = await submitPaymentProof(uploadedFile);
//     if (res.success) {
//       setStatus(res.status);
//     }
//     setIsUploading(false);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText('8832 0912 3341 00');
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-10"> {/* Navbar Dihapus, Padding Top ditambah */}

//       <main className="max-w-6xl mx-auto px-6">
//         {/* Tombol Back Manual (Opsional karena Navbar hilang) */}
//         <div className="mb-8 flex items-center gap-3">
//              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-[#004BB2] hover:scale-105 transition-transform">
//                 <ArrowLeft className="w-5 h-5" />
//              </button>
//              <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
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
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction Status</p>
//                   <p className="text-lg font-bold text-gray-800">{status}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time Remaining</p>
//                 <div className="flex items-center gap-2 text-red-500 font-bold">
//                   <Timer className="w-4 h-4" />
//                   <span className="text-xl tabular-nums">{formatTime(timeLeft)}</span>
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
//                     <img alt="Event" className="w-full h-full object-cover" src={mockOrder.event.image} />
//                   </div>
//                   <div className="flex-grow">
//                     <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-1">{mockOrder.event.title}</h3>
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
//                     <span className="font-bold text-gray-900">Rp {mockOrder.ticket.price.toLocaleString('id-ID')}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Service Fee</span>
//                     <span className="font-bold text-gray-900">Rp {mockOrder.serviceFee.toLocaleString('id-ID')}</span>
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
//                   <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Voucher Code</label>
//                   <div className="flex gap-2">
//                     <input
//                       className="flex-grow bg-gray-50 border-none rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-100"
//                       placeholder="Enter code"
//                       type="text"
//                       value={voucherCode}
//                       onChange={(e) => setVoucherCode(e.target.value)}
//                     />
//                     <button onClick={handleApplyVoucher} className="bg-[#004BB2] text-white text-[10px] font-bold px-4 rounded-lg hover:opacity-90 transition-all uppercase">Apply</button>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
//                   <div>
//                     <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Use Points</label>
//                     <p className="text-sm font-bold text-[#004BB2]">{mockUser.points.toLocaleString('id-ID')} pts available</p>
//                   </div>
//                   <button onClick={() => setPointsUsed(!pointsUsed)} className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${pointsUsed ? 'bg-blue-600' : 'bg-gray-200'}`}>
//                     <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${pointsUsed ? 'translate-x-6' : 'translate-x-1'}`} />
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
//                       <span className="font-black italic text-blue-900 text-[10px] uppercase">Bank</span>
//                     </div>
//                     <div>
//                       <p className="font-bold text-sm text-gray-800">Bank Transfer (Manual Verification)</p>
//                       <p className="text-[10px] text-gray-400 italic font-medium">BCA Digital Concierge Services</p>
//                     </div>
//                   </div>
//                   <ChevronDown className="w-5 h-5 text-[#004BB2]" />
//                 </div>
//                 <div className="p-8 space-y-6 text-center">
//                   <div className="bg-blue-50/20 p-6 rounded-xl border-2 border-dashed border-blue-100">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Virtual Account Number</p>
//                     <div className="flex items-center justify-center gap-4">
//                       <p className="text-2xl md:text-3xl font-bold tracking-widest text-[#004BB2]">8832 0912 3341 00</p>
//                       <button onClick={copyToClipboard} className="text-[#004BB2] hover:bg-blue-50 p-2 rounded-lg transition-colors"><Copy className="w-5 h-5" /></button>
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-500 space-y-2 text-left px-4 font-medium">
//                     <p>01 Copy the account number and transfer the exact total amount below.</p>
//                     <p>02 Make sure to save your transfer receipt in JPG or PDF.</p>
//                     <p>03 Upload the receipt area on the right for verification.</p>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* Right Column (Sticky) */}
//           <div className="lg:col-span-5">
//             <div className="sticky top-10 space-y-6"> {/* Top disesuaikan karena Navbar hilang */}
//               <motion.div layout className="bg-[#004BB2] text-white rounded-2xl p-8 shadow-xl shadow-blue-100 relative overflow-hidden">
//                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
//                 <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-6">Total Payment</h2>
//                 <div className="flex items-baseline gap-2 mb-8">
//                   <span className="text-2xl font-medium opacity-60">Rp</span>
//                   <span className="text-5xl font-black tracking-tighter">
//                     {totalPrice.toLocaleString('id-ID')}
//                   </span>
//                 </div>
//                 <div className="pt-6 border-t border-white/10 flex justify-between text-xs opacity-90">
//                   <span>Subtotal</span>
//                   <span className="font-bold">Rp {(mockOrder.ticket.price + mockOrder.serviceFee).toLocaleString('id-ID')}</span>
//                 </div>
//               </motion.div>

//               <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-blue-100">
//                 <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#004BB2]">
//                   <CloudUpload className="w-5 h-5" />
//                   Upload Proof
//                 </h3>
//                 <label className={`group relative flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed rounded-xl transition-all cursor-pointer ${uploadedFile ? 'border-green-400 bg-green-50' : 'border-gray-100 hover:bg-blue-50'}`}>
//                   <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
//                     {uploadedFile ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <Plus className="w-8 h-8 text-[#004BB2]" />}
//                   </div>
//                   <p className="text-sm font-bold text-gray-800">{uploadedFile ? uploadedFile.name : 'Click to select or drag proof'}</p>
//                   <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-bold">JPG, PNG or PDF (Max 5MB)</p>
//                   <input className="hidden" type="file" onChange={handleFileUpload} />
//                 </label>

//                 <button
//                   disabled={!uploadedFile || isUploading}
//                   onClick={handleConfirmPayment}
//                   className={`w-full mt-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${(!uploadedFile || isUploading) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#004BB2] text-white shadow-lg shadow-blue-100 hover:opacity-90'}`}
//                 >
//                   {isUploading ? 'Uploading...' : 'Confirm Payment'}
//                   {!isUploading && <ChevronRight className="w-5 h-5" />}
//                 </button>
//                 <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed italic px-4 font-medium">
//                   By clicking confirm, you agree bahwa pembayaran akan diverifikasi manual dalam 15-30 menit.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
