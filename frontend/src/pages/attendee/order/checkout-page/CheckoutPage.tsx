import React, { useEffect } from 'react';
import { ProgressTracker } from './checkout/ProgressTracker';
import { ReviewEvent } from './checkout/ReviewEvent';
import { TicketDetails } from './checkout/TicketDetails';
import { Rewards } from './checkout/Rewards';
import { OrderSummary } from './checkout/OrderSummary';
import { useOrderStore } from './hooks/useOrderStore';
import { useQuery } from '@tanstack/react-query';
import { eventService } from './services/api';


const App: React.FC = () => {
  const { setEvent, fetchAutoCoupons } = useOrderStore();

  const { data: eventData, isLoading: isEventLoading } = useQuery({
    queryKey: ['event', 'evt-001'],
    queryFn: () => eventService.getEvent('evt-001'),
  });

  useEffect(() => {
    if (eventData) setEvent(eventData);
  }, [eventData, setEvent]);

  useEffect(() => {
    fetchAutoCoupons();
  }, [fetchAutoCoupons]);

  if (isEventLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold animate-pulse tracking-widest text-xs">INITIALIZING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-plus-jakarta">
      <main className="flex-grow pt-28 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* <ProgressTracker /> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <ReviewEvent />
            <TicketDetails />
            <Rewards />
          </div>
          <OrderSummary />
        </div>
      </main>
    </div>
  );
};

export default App;

// // import { useNavigate } from "react-router-dom";
// // import { Formik, Form, Field } from "formik";
// // import { useState } from "react";
// // import { toast } from "sonner";
// // import { useQuery } from "@tanstack/react-query";
// // import Button from "../../../../ui/Button";

// // import api from "../../../../api/axiosInstance";
// // import { createOrderSchema } from "./schema/createOrderSchema";
// // import { handleCreateOrder } from "../../../../services/OrderService";
// // import { inputClass, labelClass } from "../../../utils/InputStylingConstant";

// // function CheckoutPage({ eventId }: { eventId: string }) {
// //   const navigate = useNavigate();
// //   const [isLoading, setIsLoading] = useState(false);

// //   // 🔹 Ambil data event (untuk tahu jumlah tiket / slot dipilih)
// //   const { data } = useQuery({
// //     queryKey: ["event-detail", eventId],
// //     queryFn: async () => await api.get(`/events/${eventId}`),
// //   });

// //   const event = data?.data?.data;

// //   // 👉 contoh: ambil dari query param / state (misal user beli 4 tiket)
// //   const ticketCount = event?.selectedTicketQuantity || 1;

// //   return (
// //     <main className="max-w-4xl mx-auto py-10 px-6">
// //       <header className="mb-8">
// //         <h1 className="text-xl font-bold">Checkout</h1>
// //         <p className="text-sm text-zinc-500">
// //           Complete your ticket purchase
// //         </p>
// //       </header>

// //       <Formik
// //         enableReinitialize
// //         initialValues={{
// //           ticketHolders: Array.from({ length: ticketCount }).map(() => ({
// //             fullName: "",
// //             email: "",
// //           })),
// //         }}
// //         validationSchema={createOrderSchema}
// //         onSubmit={async (values, { resetForm }) => {
// //           try {
// //             setIsLoading(true);

// //             const payload = {
// //               eventId,
// //               tickets: values.ticketHolders,
// //             };

// //             const response: any = await handleCreateOrder(payload);

// //             setIsLoading(false);

// //             if (response.status === 201) {
// //               toast.success("Order created successfully");

// //               // 👉 redirect ke summary / payment page
// //               navigate(`/orders/${response.data.data.orderId}`);
// //             }
// //           } catch (error) {
// //             setIsLoading(false);
// //             console.log(error);
// //             toast.error("Failed to create order");
// //           }

// //           resetForm();
// //         }}
// //       >
// //         {({ values, errors, touched }) => (
// //           <Form className="space-y-8">

// //             {/* 🔹 LIST TICKET HOLDERS */}
// //             <section className="space-y-6">
// //               <h2 className="font-semibold text-zinc-800">
// //                 Ticket Holder Details
// //               </h2>

// //               {values.ticketHolders.map((_, i) => (
// //                 <div
// //                   key={i}
// //                   className="p-4 border rounded-xl space-y-3"
// //                 >
// //                   <p className="text-xs font-bold text-zinc-500">
// //                     Ticket #{i + 1}
// //                   </p>

// //                   <div>
// //                     <label className={labelClass}>Full Name</label>
// //                     <Field
// //                       name={`ticketHolders[${i}].fullName`}
// //                       type="text"
// //                       className={inputClass}
// //                       placeholder="John Doe"
// //                     />
// //                     {errors.ticketHolders?.[i]?.fullName &&
// //                       touched.ticketHolders?.[i]?.fullName && (
// //                         <p className="text-red-500 text-[10px] mt-1">
// //                           {errors.ticketHolders[i]?.fullName}
// //                         </p>
// //                       )}
// //                   </div>

// //                   <div>
// //                     <label className={labelClass}>Email</label>
// //                     <Field
// //                       name={`ticketHolders[${i}].email`}
// //                       type="email"
// //                       className={inputClass}
// //                       placeholder="email@example.com"
// //                     />
// //                     {errors.ticketHolders?.[i]?.email &&
// //                       touched.ticketHolders?.[i]?.email && (
// //                         <p className="text-red-500 text-[10px] mt-1">
// //                           {errors.ticketHolders[i]?.email}
// //                         </p>
// //                       )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </section>

// //             {/* 🔹 ORDER SUMMARY (READ ONLY DARI EVENT) */}
// //             <section className="p-6 border rounded-xl bg-zinc-50 space-y-3">
// //               <h2 className="font-semibold text-zinc-800">
// //                 Order Summary
// //               </h2>

// //               <div className="flex justify-between text-sm">
// //                 <span>Ticket Price</span>
// //                 <span>
// //                   Rp {event?.price?.toLocaleString("id-ID")}
// //                 </span>
// //               </div>

// //               <div className="flex justify-between text-sm">
// //                 <span>Quantity</span>
// //                 <span>{ticketCount}</span>
// //               </div>

// //               <div className="flex justify-between text-sm">
// //                 <span>Subtotal</span>
// //                 <span>
// //                   Rp {(event?.price * ticketCount)?.toLocaleString("id-ID")}
// //                 </span>
// //               </div>
// //             </section>

// //             {/* 🔹 SUBMIT */}
// //             <div>
// //               <Button
// //                 disabled={isLoading}
// //                 type="submit"
// //                 className="w-full py-4 font-bold"
// //               >
// //                 {isLoading ? "Processing..." : "Proceed to Payment"}
// //               </Button>
// //             </div>
// //           </Form>
// //         )}
// //       </Formik>
// //     </main>
// //   );
// // }

// // export default CheckoutPage;

// import { useNavigate, useParams } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";

// import api from "../../api/axiosInstance";

// // ================= VALIDATION =================
// const createOrderSchema = Yup.object().shape({
//   eventId: Yup.string().required(),
//   tickets: Yup.array()
//     .of(
//       Yup.object({
//         fullName: Yup.string().min(3).required(),
//         email: Yup.string().email().required(),
//       })
//     )
//     .min(1),
// });

// // ================= API =================
// const createOrder = async (payload: any) => {
//   return await api.post("/orders", payload);
// };

// // ================= COMPONENT =================
// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const { slug } = useParams();
//   const [isLoading, setIsLoading] = useState(false);

//   // 🔹 Fetch Event
//   const { data } = useQuery({
//     queryKey: ["event-detail", slug],
//     queryFn: async () => await api.get(`/events/${slug}`),
//   });

//   const event = data?.data?.data;

//   // 👉 contoh (HARUSNYA dari state/cart)
//   const ticketCount = event?.selectedTicketQuantity || 1;

//   if (!event) return <div>Loading...</div>;

//   return (
//     <main className="max-w-6xl mx-auto py-10 px-6">

//       <Formik
//         enableReinitialize
//         initialValues={{
//           eventId: event.eventId,
//           tickets: Array.from({ length: ticketCount }).map(() => ({
//             fullName: "",
//             email: "",
//           })),
//           appCouponId: "",
//           eventCouponId: "",
//           referralCouponId: "",
//           isPointsUsed: false,
//         }}
//         validationSchema={createOrderSchema}
//         onSubmit={async (values) => {
//           try {
//             setIsLoading(true);

//             const res: any = await createOrder(values);

//             setIsLoading(false);

//             toast.success("Order created!");

//             navigate(`/orders/${res.data.data.orderId}`);
//           } catch (err) {
//             setIsLoading(false);
//             toast.error("Failed to create order");
//             console.log(err);
//           }
//         }}
//       >
//         {({ values, errors, touched }) => {

//           const qty = values.tickets.length;
//           const subtotal = event.price * qty;

//           return (
//             <Form className="space-y-8">

//               {/* ================= PROGRESS ================= */}
//               <div className="flex justify-between">
//                 {["Details", "Rewards", "Review", "Payment"].map((s, i) => (
//                   <div key={i} className="flex-1 text-center">
//                     <div className="w-8 h-8 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
//                       {i + 1}
//                     </div>
//                     <p className="text-xs mt-1">{s}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* ================= EVENT ================= */}
//               <div className="bg-white p-6 rounded-xl shadow flex gap-4">
//                 <img
//                   src={event.thumbnail}
//                   className="w-24 h-24 rounded-lg object-cover"
//                 />
//                 <div>
//                   <h2 className="font-bold text-lg">{event.title}</h2>
//                   <p className="text-sm text-zinc-500">{event.locationName}</p>
//                   <p className="text-sm text-zinc-500">
//                     {new Date(event.eventDate).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid lg:grid-cols-3 gap-8">

//                 {/* ================= LEFT ================= */}
//                 <div className="lg:col-span-2 space-y-8">

//                   {/* ===== Ticket Details ===== */}
//                   <div className="bg-white p-6 rounded-xl shadow space-y-6">
//                     <h2 className="font-bold">Ticket Details</h2>

//                     {values.tickets.map((_, i) => (
//                       <div key={i} className="border p-4 rounded-xl space-y-3">

//                         <div>
//                           <label className="text-xs font-semibold">Full Name</label>
//                           <Field
//                             name={`tickets[${i}].fullName`}
//                             className="w-full border p-2 rounded"
//                           />
//                           {errors.tickets?.[i]?.fullName &&
//                             touched.tickets?.[i]?.fullName && (
//                               <p className="text-red-500 text-xs">
//                                 {errors.tickets[i].fullName}
//                               </p>
//                             )}
//                         </div>

//                         <div>
//                           <label className="text-xs font-semibold">Email</label>
//                           <Field
//                             name={`tickets[${i}].email`}
//                             className="w-full border p-2 rounded"
//                           />
//                           {errors.tickets?.[i]?.email &&
//                             touched.tickets?.[i]?.email && (
//                               <p className="text-red-500 text-xs">
//                                 {errors.tickets[i].email}
//                               </p>
//                             )}
//                         </div>

//                       </div>
//                     ))}
//                   </div>

//                   {/* ===== Rewards ===== */}
//                   <div className="bg-white p-6 rounded-xl shadow space-y-4">
//                     <h2 className="font-bold">Rewards</h2>

//                     <Field name="appCouponId" placeholder="App Coupon" className="w-full border p-2 rounded" />
//                     <Field name="eventCouponId" placeholder="Event Voucher" className="w-full border p-2 rounded" />
//                     <Field name="referralCouponId" placeholder="Referral Code" className="w-full border p-2 rounded" />

//                     <label className="flex items-center gap-2 text-sm">
//                       <Field type="checkbox" name="isPointsUsed" />
//                       Use Points
//                     </label>
//                   </div>

//                 </div>

//                 {/* ================= RIGHT ================= */}
//                 <aside className="bg-white p-6 rounded-xl shadow space-y-4">

//                   <h2 className="font-bold">Order Summary</h2>

//                   <div className="flex justify-between text-sm">
//                     <span>Price</span>
//                     <span>Rp {event.price.toLocaleString("id-ID")}</span>
//                   </div>

//                   <div className="flex justify-between text-sm">
//                     <span>Qty</span>
//                     <span>{qty}</span>
//                   </div>

//                   <div className="flex justify-between font-bold">
//                     <span>Subtotal</span>
//                     <span>Rp {subtotal.toLocaleString("id-ID")}</span>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
//                   >
//                     {isLoading ? "Processing..." : "Proceed to Payment"}
//                   </button>

//                 </aside>

//               </div>

//             </Form>
//           );
//         }}
//       </Formik>
//     </main>
//   );
// }