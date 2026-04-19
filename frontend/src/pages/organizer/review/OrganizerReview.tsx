import { RiStarFill } from "react-icons/ri";
import { useFetchReviewData } from "./hooks/useFetchReviewData";
import { formatRating } from "../../../utils/formatRating";
import type { RatingDistribution } from "./types/ratingDistributionType";

import { ReviewCard } from "./components/ReviewCard";
import ReviewSummary from "./components/ReviewSummary";
import { useState } from "react";
import PaginationButton from "../../../ui/PaginationButton";
import { SkeletonReviewSummary } from "./components/SekeletonReviewSummary";
import SkeletonReviewCard from "./components/SkeletonReviewCard";

const OrganizerReviews = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchReviewData(page);
  const reviewData = data?.data.data;
  const totalReviewPage = reviewData?.totalPage;

  console.log("review", reviewData);

  const handlePagination = (page: number) => setPage(page);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-12 bg-white">
      {/* 1. Header & Summary Section */}
      {isLoading ? (
        <SkeletonReviewSummary />
      ) : (
        <ReviewSummary
          averageRatings={reviewData?.averageRatings}
          totalData={reviewData?.totalData}
          ratingDistribution={reviewData?.ratingDistribution}
        />
      )}

      {/* 2. Review List Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-400">
            Latest Feedback
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Loop Review Card */}
          {isLoading
            ? Array.from({ length: 5 }).map((_, index: number) => (
                <SkeletonReviewCard key={index} />
              ))
            : reviewData?.reviews?.map((review: any, index: number) => (
                <ReviewCard
                  key={index}
                  firstName={review?.user?.firstName}
                  lastName={review?.user?.lastName}
                  isAnonymous={review?.isAnonymous}
                  title={review?.title}
                  description={review?.description}
                  rating={review?.rating}
                  eventName={review?.order?.event?.title}
                  createdAt={review?.createdAt}
                  ticketQuantity={review?.order?.ticketQuantity}
                  invoiceNumber={review?.order?.invoiceNumber}
                />
              ))}
        </div>
      </section>

      <div className="flex justify-center">
        {totalReviewPage > 1 && (
          <PaginationButton
            page={page}
            onClick={handlePagination}
            totalPage={totalReviewPage}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizerReviews;
