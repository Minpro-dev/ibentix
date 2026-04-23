import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  RiTicket2Line,
  RiUser3Line,
  RiMailLine,
  RiCoupon2Line,
  RiCoinsLine,
  RiArrowLeftLine,
} from "react-icons/ri";

import type { Event } from "../../../types/eventType";
import {
  getAppCoupons,
  getEventCoupons,
  getUserPoints,
} from "../../../services/promoService";
import { handleGetEventById } from "../../../services/eventService";
import defaultThumbnail from "../../../assets/static/EventThumnailImage.jpg";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { orderAttendeeSchema } from "./schemas/OrderAttendeeSchme";
export default function OrderPageAttendee() {
  const { eventId } = useParams<{ eventId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const qty = parseInt(searchParams.get("qty") || "1");
  const [usePoints, setUsePoints] = useState(false);

  // 1. Fetch Data Event
  const { data: eventData, isLoading: eventLoading } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => handleGetEventById(eventId as string),
  });
  const event: Event = eventData?.data?.data;

  // 2. Fetch Promo Data (App Coupon, Event Coupon, Points)
  const { data: appCouponData } = useQuery({
    queryKey: ["appCoupons"],
    queryFn: getAppCoupons,
  });

  const { data: eventCouponData } = useQuery({
    queryKey: ["eventCoupons", eventId],
    queryFn: () => getEventCoupons(eventId!),
  });

  const { data: pointsData } = useQuery({
    queryKey: ["userPoints"],
    queryFn: getUserPoints,
  });

  const appCoupon = appCouponData?.data?.data?.[0] || null;
  const eventCoupon = eventCouponData?.data?.data?.[0] || null;
  const userPoints = pointsData?.data?.points || 0;

  const initialValues = {
    attendees: Array.from({ length: qty }, () => ({
      attendeeName: "",
      attendeeEmail: "",
    })),
  };

  const handleSubmit = (values: any) => {
    const payload = {
      eventId,
      usePoints,
      tickets: values.attendees,
    };

    console.log(payload);

    // navigate(`/payment/${eventId}`, { state: payload });
  };

  // Rate calculation
  const basePrice = event ? Number(event.price) * qty : 0;
  const discountApp = appCoupon
    ? basePrice * (appCoupon.discountAmount / 100)
    : 0;
  const discountEvent = eventCoupon
    ? basePrice * (eventCoupon.discountAmount / 100)
    : 0;

  const totalPoints = usePoints && userPoints ? Number(userPoints) : 0;

  const totalDiscount = discountApp + discountEvent;

  const finalPrice = Math.max(0, basePrice - totalDiscount - totalPoints);

  if (eventLoading)
    return (
      <div className="p-20 min-h-dvh text-center text-sm text-gray-400">
        Preparing your order...
      </div>
    );

  return (
    <div className="min-h-dvh bg-[#FCFCFC] text-gray-800 antialiased">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <RiArrowLeftLine size={20} />
        </button>
        <h1 className="text-xl font-medium tracking-tight">Checkout Details</h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Forms & Event Preview */}
          <div className="lg:col-span-7 space-y-8">
            {/* EVENT PREVIEW */}
            <section className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
              <img
                src={event?.thumbnailUrl || defaultThumbnail}
                className="w-24 h-24 object-cover rounded-xl"
                alt="Event"
              />
              <div className="flex flex-col justify-center">
                <h2 className="font-semibold text-gray-900">{event?.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {event?.locationName}, {event?.city}
                </p>
                <p className="text-xs font-medium text-indigo-600 mt-2">
                  {qty} Ticket(s)
                </p>
              </div>
            </section>

            {/* TICKET HOLDER FORMS */}
            <section className="space-y-6">
              <Formik
                initialValues={initialValues}
                validationSchema={orderAttendeeSchema}
                onSubmit={handleSubmit}>
                {({ values, errors, touched }) => (
                  <Form id="order-submit" className="lg:col-span-7 space-y-8">
                    <FieldArray name="attendees">
                      {() => (
                        <div className="space-y-6">
                          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            Ticket Holder Details
                          </h3>

                          {values.attendees.map((_, index) => (
                            <div
                              key={index}
                              className="p-8 border border-gray-100 rounded-3xl bg-white space-y-6 transition-all hover:border-indigo-100">
                              <div className="flex items-center gap-2 mb-3 text-indigo-600">
                                <RiTicket2Line size={18} />
                                <span className="text-xs uppercase">
                                  Ticket {index + 1}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* INPUT NAME */}
                                <div className="space-y-2">
                                  <div className="relative">
                                    <RiUser3Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Field
                                      name={`attendees.${index}.attendeeName`}
                                      placeholder="Full Name"
                                      className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${
                                        touched.attendees?.[index]
                                          ?.attendeeName &&
                                        errors.attendees?.[index]
                                          ? "border-red-300"
                                          : "border-transparent"
                                      } rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all`}
                                    />
                                  </div>
                                  <ErrorMessage
                                    name={`attendees.${index}.attendeeName`}
                                    component="p"
                                    className="text-[10px] text-red-500 font-medium ml-2"
                                  />
                                </div>

                                {/* INPUT EMAIL */}
                                <div className="space-y-2">
                                  <div className="relative">
                                    <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Field
                                      name={`attendees.${index}.attendeeEmail`}
                                      placeholder="Email Address"
                                      className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${
                                        touched.attendees?.[index]
                                          ?.attendeeEmail &&
                                        errors.attendees?.[index]
                                          ? "border-red-300"
                                          : "border-transparent"
                                      } rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all`}
                                    />
                                  </div>
                                  <ErrorMessage
                                    name={`attendees.${index}.attendeeEmail`}
                                    component="p"
                                    className="text-[10px] text-red-500 font-medium ml-2"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </FieldArray>
                  </Form>
                )}
              </Formik>
            </section>
          </div>

          {/* RIGHT: Order Summary */}
          <aside className="lg:col-span-5">
            <div className="sticky top-12 space-y-6">
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
                <h3 className="font-semibold text-lg">Order Summary</h3>

                {/* PROMO AUTO-APPLY SECTION */}
                <div className="space-y-3">
                  {appCoupon && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl text-green-700 text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <RiCoupon2Line />
                        <span>App Promo: {appCoupon.code} Applied</span>
                      </div>
                      <span>-{appCoupon.discountAmount}%</span>
                    </div>
                  )}
                  {eventCoupon && (
                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl text-indigo-700 text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <RiCoupon2Line />
                        <span>Event Promo: {eventCoupon.code} Applied</span>
                      </div>
                      <span>-{eventCoupon.discount}%</span>
                    </div>
                  )}
                </div>

                {/* POINTS TOGGLE */}
                {userPoints > 0 && (
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
                      onClick={() => setUsePoints(!usePoints)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${usePoints ? "bg-indigo-600" : "bg-gray-200"}`}>
                      <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${usePoints ? "left-6" : "left-1"}`}
                      />
                    </button>
                  </div>
                )}

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
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold text-sm hover:bg-black transition-all shadow-lg shadow-gray-200">
                  Proceed to Payment
                </button>
              </div>

              <p className="text-center text-[10px] text-gray-400">
                By clicking the button above, you agree to our Terms &
                Conditions.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
