// // // import React, { useState } from 'react';
// // // import { useOrderStore } from '../hooks/useOrderStore';
// // // import { eventService } from '../services/api';
// // // import { useQuery } from '@tanstack/react-query';
// // // import { cn } from '../../../../../lib/utils';

// // // export const OrderSummary: React.FC = () => {
// // //   const { event, ticketHolders, subtotal, discounts, total } = useOrderStore();
// // //   const [isProcessing, setIsProcessing] = useState(false);

// // //   const { data: quote, isLoading: isValidating } = useQuery({
// // //     queryKey: ['orderQuote', ticketHolders, event.id],
// // //     queryFn: () => eventService.validateOrder(ticketHolders, event.id),
// // //     enabled: ticketHolders.some(h => h.email.length > 5),
// // //   });

// // //   const subValue = subtotal();
// // //   const discValue = discounts();
// // //   const dynamicBenefit = quote?.dynamicBenefit || 0;
// // //   const totalValue = Math.max(0, total() - dynamicBenefit);

// // //   return (
// // //     <aside className="lg:col-span-4">
// // //       <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-28 border border-slate-200">
// // //         <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
// // //           <h2 className="text-xl font-black text-slate-900 tracking-tight">Order Summary</h2>
// // //           {isValidating && <span className="text-[10px] text-blue-600 animate-pulse font-bold">VERIFYING...</span>}
// // //         </div>
        
// // //         <div className="space-y-4">
// // //           {event.tickets.map((t, i) => (
// // //             <div key={i} className="flex justify-between text-sm">
// // //               <span className="text-slate-600 font-medium">{t.type} ({t.quantity}x)</span>
// // //               <span className="text-slate-900 font-bold text-base">Rp {t.price.toLocaleString('id-ID')}</span>
// // //             </div>
// // //           ))}
// // //           <div className="flex justify-between text-sm">
// // //             <span className="text-slate-600 font-medium">Service Fee</span>
// // //             <span className="text-slate-900 font-bold text-base">Rp 15.000</span>
// // //           </div>

// // //           <div className="pt-6 border-t border-slate-100 space-y-3">
// // //             <div className="flex justify-between text-sm">
// // //               <span className="text-slate-600 font-medium">Subtotal</span>
// // //               <span className="text-slate-900 font-bold">Rp {subValue.toLocaleString('id-ID')}</span>
// // //             </div>
// // //             <div className="flex justify-between text-sm text-emerald-600 font-bold">
// // //               <span>Discounts</span>
// // //               <span>- Rp {(discValue.appCoupon + discValue.eventVoucher + discValue.referralPoints + dynamicBenefit).toLocaleString('id-ID')}</span>
// // //             </div>
// // //           </div>

// // //           <div className="pt-6 border-t-2 border-slate-900">
// // //             <div className="flex justify-between items-center">
// // //               <span className="text-sm font-black text-slate-900 uppercase">Total</span>
// // //               <span className="text-3xl font-black text-blue-700">Rp {totalValue.toLocaleString('id-ID')}</span>
// // //             </div>
// // //           </div>

// // //           <button className="w-full mt-6 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95">
// // //             Proceed to Payment
// // //           </button>
          
// // //           <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
// // //             By clicking, you agree to our <span className="underline font-bold text-slate-600 cursor-pointer">Terms of Service</span>.
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </aside>
// // //   );
// // // };

// // import React from 'react';
// // import { useQuery } from '@tanstack/react-query';
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';
// // import { orderService } from '../../../../../../../backend/src/services/order.service';
// // import { eventService } from '../services/api';

// // export const OrderSummary: React.FC<{ eventId: string }> = ({ eventId }) => {

// //   // 🔹 Ambil order dari backend
// //   const { data: orderData, isLoading } = useQuery({
// //     queryKey: ['order', eventId],
// //     queryFn: () => orderService.getOrder(eventId),
// //     enabled: !!eventId
// //   });

// //   // 🔹 Formik setup (ticket holders sesuai jumlah tiket)
// //   const formik = useFormik({
// //     enableReinitialize: true,
// //     initialValues: {
// //       ticketHolders: orderData?.tickets.map(() => ({
// //         fullName: '',
// //         email: ''
// //       })) || []
// //     },
// //     validationSchema: Yup.object({
// //       ticketHolders: Yup.array().of(
// //         Yup.object({
// //           fullName: Yup.string().required('Nama wajib diisi'),
// //           email: Yup.string().email('Email tidak valid').required('Email wajib')
// //         })
// //       )
// //     }),
// //     onSubmit: async (values) => {
// //       console.log('Submit Order:', values);
// //       // kirim ke backend kalau perlu
// //     }
// //   });

// //   // 🔹 Validasi order (dynamic benefit)
// //   const { data: quote } = useQuery({
// //     queryKey: ['orderQuote', formik.values.ticketHolders, eventId],
// //     queryFn: () =>
// //       eventService.validateOrder(formik.values.ticketHolders, eventId),
// //     enabled: formik.values.ticketHolders.some(h => h.email.length > 5)
// //   });

// //   if (isLoading) return <div>Loading...</div>;

// //   const tickets = orderData?.tickets || [];

// //   // 🔹 Perhitungan
// //   const subtotal = tickets.reduce((sum, t) => sum + t.price, 0) + 15000;
// //   const discount = quote?.dynamicBenefit || 0;
// //   const total = Math.max(0, subtotal - discount);

// //   return (
// //     <form onSubmit={formik.handleSubmit}>
// //       <aside className="lg:col-span-4">
// //         <div className="bg-white rounded-2xl shadow-xl p-8">

// //           <h2 className="text-xl font-bold mb-6">Order Summary</h2>

// //           {/* 🔹 LIST TIKET (REAL COUNT) */}
// //           <div className="space-y-4">
// //             {tickets.map((t, i) => (
// //               <div key={i} className="border-b pb-4">
                
// //                 {/* Info tiket */}
// //                 <div className="flex justify-between text-sm mb-2">
// //                   <span>{t.type} Ticket #{i + 1}</span>
// //                   <span>Rp {t.price.toLocaleString('id-ID')}</span>
// //                 </div>

// //                 {/* Form input */}
// //                 <input
// //                   type="text"
// //                   name={`ticketHolders[${i}].fullName`}
// //                   placeholder="Nama Lengkap"
// //                   onChange={formik.handleChange}
// //                   value={formik.values.ticketHolders[i]?.fullName || ''}
// //                   className="w-full border p-2 rounded mb-1"
// //                 />
// //                 {formik.errors.ticketHolders?.[i]?.fullName && (
// //                   <div className="text-red-500 text-xs">
// //                     {formik.errors.ticketHolders[i].fullName}
// //                   </div>
// //                 )}

// //                 <input
// //                   type="email"
// //                   name={`ticketHolders[${i}].email`}
// //                   placeholder="Email"
// //                   onChange={formik.handleChange}
// //                   value={formik.values.ticketHolders[i]?.email || ''}
// //                   className="w-full border p-2 rounded"
// //                 />
// //                 {formik.errors.ticketHolders?.[i]?.email && (
// //                   <div className="text-red-500 text-xs">
// //                     {formik.errors.ticketHolders[i].email}
// //                   </div>
// //                 )}

// //               </div>
// //             ))}
// //           </div>

// //           {/* 🔹 SERVICE FEE */}
// //           <div className="flex justify-between mt-4 text-sm">
// //             <span>Service Fee</span>
// //             <span>Rp 15.000</span>
// //           </div>

// //           {/* 🔹 SUBTOTAL */}
// //           <div className="flex justify-between mt-2 text-sm">
// //             <span>Subtotal</span>
// //             <span>Rp {subtotal.toLocaleString('id-ID')}</span>
// //           </div>

// //           {/* 🔹 DISCOUNT */}
// //           <div className="flex justify-between text-green-600 font-bold mt-2">
// //             <span>Discount</span>
// //             <span>- Rp {discount.toLocaleString('id-ID')}</span>
// //           </div>

// //           {/* 🔹 TOTAL */}
// //           <div className="flex justify-between mt-6 text-lg font-bold">
// //             <span>Total</span>
// //             <span>Rp {total.toLocaleString('id-ID')}</span>
// //           </div>

// //           {/* 🔹 SUBMIT */}
// //           <button
// //             type="submit"
// //             className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg"
// //           >
// //             Proceed to Payment
// //           </button>

// //         </div>
// //       </aside>
// //     </form>
// //   );
// // };

// import { AxiosInstance } from "axios";

// export const orderService = {
//   createOrder: async (payload: any) => {
//     const { data } = await axiosInstance.post('/orders', payload);
//     return data;
//   }
// };

// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';



// export const CheckoutForm = ({ eventId, ticketCount }: any) => {

//   const formik = useFormik({
//     initialValues: {
//       ticketHolders: Array.from({ length: ticketCount }).map(() => ({
//         fullName: '',
//         email: ''
//       }))
//     },
//     validationSchema: Yup.object({
//       ticketHolders: Yup.array().of(
//         Yup.object({
//           fullName: Yup.string().required(),
//           email: Yup.string().email().required()
//         })
//       )
//     }),
//     onSubmit: async (values) => {
//       const res = await orderService.createOrder({
//         eventId,
//         tickets: values.ticketHolders,
//       });

//       console.log("ORDER RESULT:", res);
//     }
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       {formik.values.ticketHolders.map((_, i) => (
//         <div key={i}>
//           <input
//             name={`ticketHolders[${i}].fullName`}
//             onChange={formik.handleChange}
//             placeholder="Nama"
//           />
//           <input
//             name={`ticketHolders[${i}].email`}
//             onChange={formik.handleChange}
//             placeholder="Email"
//           />
//         </div>
//       ))}

//       <button type="submit">Checkout</button>
//     </form>
//   );
// };

export const OrderSummary = ({ event, values }: any) => {
  const qty = values.tickets.length;
  const subtotal = event.price * qty;

  return (
    <aside className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="font-bold">Order Summary</h2>

      <div className="flex justify-between text-sm">
        <span>Price</span>
        <span>Rp {event.price.toLocaleString("id-ID")}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Quantity</span>
        <span>{qty}</span>
      </div>

      <div className="flex justify-between font-bold">
        <span>Subtotal</span>
        <span>Rp {subtotal.toLocaleString("id-ID")}</span>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
        Proceed to Payment
      </button>
    </aside>
  );
};