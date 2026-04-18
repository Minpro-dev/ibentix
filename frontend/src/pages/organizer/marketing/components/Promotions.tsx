import { useQuery } from "@tanstack/react-query";
import PromotionCard from "./PromotionCard";
import { handleGetEventCoupon } from "../../../../services/eventCouponService";
import { useState } from "react";
import type { EventCouponResponse } from "../types/eventCouponType";
import SearchInput from "../../../../ui/SearchInput";
import { useDebounce } from "use-debounce";
import PaginationButton from "../../../../ui/PaginationButton";

function Promotions() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [searchValue] = useDebounce(search, 800);

  const { data, isLoading } = useQuery({
    queryKey: ["event-coupon", searchValue, page],
    queryFn: () => handleGetEventCoupon(searchValue, page),
  });

  const handlePagination = (num: number) => {
    setPage(num);
  };

  console.log(data?.data.data);
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
        {eventCoupons?.map((coupon: EventCouponResponse) => (
          <PromotionCard
            couponCode={coupon.couponCode}
            eventName={coupon.event.title}
            validFrom={coupon.validFrom}
            validUntil={coupon.validUntil}
            discountAmount={coupon.discountAmount}
          />
        ))}
      </div>
      <div className="pt-8 flex justify-center items-center">
        <PaginationButton
          page={page}
          onClick={handlePagination}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
}

export default Promotions;
