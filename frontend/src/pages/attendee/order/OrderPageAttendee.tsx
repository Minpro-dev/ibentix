import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { Event } from "../../../types/eventType";

import OrderEventPreview from "./components/OrderEventPreview";
import AttendeeForm from "./components/AttendeeForm";
import type { OrderFormValues } from "./types/orderAttendeeType";
import OrderHeader from "./components/OrderHeader";
import OrderPreview from "./components/OrderPreview";
import { useFetchEventById } from "./hooks/useFetchEventById";
import { useFetchAppCoupon } from "./hooks/useFetchAppCoupon";
import { useFetchEventCoupon } from "./hooks/useFetchEventCoupon";
import { useFetchUserPoints } from "./hooks/useFetchUserPoints";
import { OrderPreviewSkeleton } from "./components/OrderPreviewSkeleton";
import { OrderEventPreviewSkeleton } from "./components/OrderEventPreviewSkeleton";

export default function OrderPageAttendee() {
  const { eventId } = useParams<{ eventId: string }>();
  const [searchParams] = useSearchParams();

  const qty = parseInt(searchParams.get("qty") || "1");
  const [usePoints, setUsePoints] = useState(false);

  // fetch event
  const { eventData, eventLoading } = useFetchEventById(eventId as string);
  const event: Event = eventData?.data?.data;

  // fetch (App Coupon, Event Coupon, Points)
  const { appCouponData, appCouponLoading } = useFetchAppCoupon();

  const { eventCouponData, eventCouponLoading } = useFetchEventCoupon(
    eventId as string,
  );

  const { pointsData, pointsDataLoading } = useFetchUserPoints();

  const appCoupon = appCouponData?.data?.data?.[0] || null;
  const eventCoupon = eventCouponData?.data?.data || null;
  const userPoints = pointsData?.data?.points || 0;

  console.log("eventCoupone", eventCoupon);

  const handleTogglePoints = () => {
    setUsePoints((usePoints) => !usePoints);
  };

  const handleSubmit = (values: OrderFormValues) => {
    const payload = {
      eventId,
      usePoints,
      tickets: values.attendees,
    };

    console.log("payload --> ", payload);

    // navigate(`/payment/${eventId}`, { state: payload });
  };

  // Rate calculation
  const basePrice = event ? Number(event.price) * qty : 0;

  // calculate eventCoupon
  const discountEvent = eventCoupon
    ? basePrice * (Number(eventCoupon.discountAmount) / 100)
    : 0;

  // after event coupon
  const priceAfterEventDiscount = basePrice - discountEvent;

  // app coupon calculation
  const discountApp = appCoupon
    ? priceAfterEventDiscount * (Number(appCoupon.discountAmount) / 100)
    : 0;

  // total couupon
  const totalCouponDiscount = discountEvent + discountApp;

  // points
  const totalPoints = usePoints && userPoints ? Number(userPoints) : 0;

  // final price
  const finalPrice = Math.max(0, basePrice - totalCouponDiscount - totalPoints);

  return (
    <div className="min-h-dvh bg-[#FCFCFC] text-gray-800 antialiased">
      <OrderHeader />

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* event preview */}
          <div className="lg:col-span-7 space-y-8">
            {eventLoading ? (
              <OrderEventPreviewSkeleton />
            ) : (
              <OrderEventPreview
                city={event.city}
                locationName={event.locationName}
                qty={qty}
                thumbnailUrl={event.thumbnailUrl}
                title={event.title}
              />
            )}

            {/* holder forms*/}
            <AttendeeForm handleSubmit={handleSubmit} qty={qty} />
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-5">
            {appCouponLoading || eventCouponLoading || pointsDataLoading ? (
              <OrderPreviewSkeleton />
            ) : (
              <OrderPreview
                appCoupon={appCoupon}
                basePrice={basePrice}
                eventCoupon={eventCoupon}
                finalPrice={finalPrice}
                handleTogglePoints={handleTogglePoints}
                qty={qty}
                totalDiscount={totalCouponDiscount}
                totalPoints={totalPoints}
                usePoints={usePoints}
                userPoints={userPoints}
              />
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
