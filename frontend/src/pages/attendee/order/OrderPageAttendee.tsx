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
import { confirmOrder, useOrderMutation } from "./hooks/useOrderMutation";
import { useFetchReferralCoupon } from "./hooks/useFetchRefferalCoupon";

export default function OrderPageAttendee() {
  const { mutate, isPending } = useOrderMutation();
  const { eventId } = useParams<{ eventId: string }>();
  const [searchParams] = useSearchParams();

  const qty = parseInt(searchParams.get("qty") || "1");
  const [usePoints, setUsePoints] = useState(false);
  const [useReferralCoupon, setUseReferralCoupon] = useState(false);

  // fetch event
  const { eventData, eventLoading } = useFetchEventById(eventId as string);
  const event: Event = eventData?.data?.data;

  // fetch (App Coupon, Event Coupon, Points)
  const { appCouponData, appCouponLoading } = useFetchAppCoupon();

  const { eventCouponData, eventCouponLoading } = useFetchEventCoupon(
    eventId as string,
  );

  const { referralCouponData, referralCouponLoading } =
    useFetchReferralCoupon();

  const { pointsData, pointsDataLoading } = useFetchUserPoints();

  const appCoupon = appCouponData?.data?.data?.[0] || null;
  const eventCoupon = eventCouponData?.data?.data || null;
  const referralCoupon = referralCouponData?.data?.data || null;
  const userPoints = pointsData?.data?.points || 0;

  const handleTogglePoints = () => {
    setUsePoints((usePoints) => !usePoints);
  };

  const handleReferralCoupon = () => {
    setUseReferralCoupon((ref) => !ref);
  };

  const handleSubmit = (values: OrderFormValues) => {
    const payload = {
      eventId: eventId as string,
      tickets: values.attendees,
      isPointsUsed: usePoints,
      eventCouponId: eventCoupon ? eventCoupon.eventCouponId : null,
      appCouponId: appCoupon ? appCoupon.appCouponId : null,
      referralCouponId: useReferralCoupon
        ? referralCoupon.referralCouponId
        : null,
    };

    console.log("payload --> ", payload);

    confirmOrder(() => {
      mutate(payload);
    });

    // navigate(`/payment/${eventId}`, { state: payload });
  };

  // 1. Harga Dasar (Total awal)
  const basePrice = event ? Number(event.price) * qty : 0;

  // 2. Diskon Pertama: Event Coupon (Misal 20%)
  const discountEvent = eventCoupon
    ? basePrice * (Number(eventCoupon.discountAmount) / 100)
    : 0;

  // Update harga setelah diskon pertama
  const priceAfterEvent = basePrice - discountEvent;

  // 3. Diskon Kedua: Referral Coupon (Misal 10%) dari harga sisa
  const discountReferral =
    useReferralCoupon && referralCoupon
      ? priceAfterEvent * (Number(referralCoupon.discountAmount) / 100)
      : 0;

  // Update harga setelah diskon kedua
  const priceAfterReferral = priceAfterEvent - discountReferral;

  // 4. Diskon Ketiga: App Coupon (Misal 5%) dari harga sisa terakhir
  const discountApp = appCoupon
    ? priceAfterReferral * (Number(appCoupon.discountAmount) / 100)
    : 0;

  // 5. Total potongan dari semua kupon (untuk display di UI)
  const totalCouponDiscount = discountEvent + discountReferral + discountApp;

  // 6. Potongan Nominal: Points (Paling akhir)
  const totalPointsUsed = usePoints && userPoints ? Number(userPoints) : 0;

  // 7. Harga Akhir (Final Price)
  // Pastikan tidak minus dengan Math.max
  const finalPrice = Math.max(
    0,
    basePrice - totalCouponDiscount - totalPointsUsed,
  );

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
            {appCouponLoading ||
            eventCouponLoading ||
            pointsDataLoading ||
            referralCouponLoading ? (
              <OrderPreviewSkeleton />
            ) : (
              <OrderPreview
                appCoupon={appCoupon}
                basePrice={basePrice}
                eventCoupon={eventCoupon}
                referralCoupon={referralCoupon}
                finalPrice={finalPrice}
                handleTogglePoints={handleTogglePoints}
                handleReferralCoupon={handleReferralCoupon}
                useReferralCoupon={useReferralCoupon}
                qty={qty}
                totalDiscount={totalCouponDiscount}
                totalPoints={totalPointsUsed}
                usePoints={usePoints}
                userPoints={userPoints}
                isPending={isPending}
              />
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
