import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PromotionCard from "./PromotionCard";
import {
  handleDeleteCoupon,
  handleGetEventCoupon,
} from "../../../../services/eventCouponService";
import { useState } from "react";
import type { EventCouponResponse } from "../types/eventCouponType";
import SearchInput from "../../../../ui/SearchInput";
import { useDebounce } from "use-debounce";
import PaginationButton from "../../../../ui/PaginationButton";
import PromotionCardSkeleton from "./PromotionCardSkeleton";
import { toast } from "sonner";
import Swal from "sweetalert2";
import EmptyOrganizerList from "../../organizerProfile/components/EmptyOrganizerList";

function Promotions() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const handlePagination = (num: number) => {
    setPage(num);
  };
  const [searchValue] = useDebounce(search, 800);

  const { data, isLoading } = useQuery({
    queryKey: ["event-coupon", searchValue, page],
    queryFn: () => handleGetEventCoupon(searchValue, page),
  });

  const { mutate } = useMutation({
    mutationFn: (eventId: string) => handleDeleteCoupon(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event-coupon"] });
      toast.success("Deleted");
    },

    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      toast.error(errorMessage);
    },
  });

  const handleDelete = (eventCouponId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this promotion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, delete it!",

      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl px-5 py-2.5",
        cancelButton: "rounded-xl px-5 py-2.5",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(eventCouponId);
      }
    });
  };

  const isShowSkeleton = isLoading || !data;
  const eventCoupons = data?.data.data.coupons;
  const totalPage = data?.data.data.totalPage;
  return (
    <div>
      <div className="mb-8">
        <SearchInput
          placeholder="Search a coupon code or event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        {isShowSkeleton ? (
          Array.from({ length: 5 }).map((_, i) => (
            <PromotionCardSkeleton key={i} />
          ))
        ) : !eventCoupons.length ? (
          <EmptyOrganizerList dataName="promotions" />
        ) : (
          eventCoupons?.map((coupon: EventCouponResponse) => (
            <PromotionCard
              key={coupon.eventCouponId}
              eventCouponId={coupon.eventCouponId}
              couponCode={coupon.couponCode}
              eventName={coupon.event.title}
              validFrom={coupon.validFrom}
              validUntil={coupon.validUntil}
              discountAmount={coupon.discountAmount}
              onDeleteFn={handleDelete}
            />
          ))
        )}
      </div>
      <div className="pt-8 flex justify-center items-center">
        {totalPage > 1 && (
          <PaginationButton
            page={page}
            onClick={handlePagination}
            totalPage={totalPage}
          />
        )}
      </div>
    </div>
  );
}

export default Promotions;
