import { useState } from "react";
import { useFetchNewOrder } from "../hooks/useFetchNewOrder";
import OrderCard from "./OrderCard";
import OrderDetailsSheet from "./OrderDetailsSheet";
import OrderCardSkeleton from "./OrderCardSkeleton";
import EmptyOrganizerList from "../../organizerProfile/components/EmptyOrganizerList";
import PaginationButton from "../../../../ui/PaginationButton";

function CompletedOrderOrganizer() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [page, setPage] = useState(1);

  const handlePagination = (page: number) => {
    setPage(page);
  };

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const orderStatus = ["REJECTED", "CANCELED", "DONE"];
  const { data, isLoading } = useFetchNewOrder(orderStatus, "true", page);
  const orders = data?.data.data;
  const totalPage = data?.data.totalPage;
  const isShowSkeleton = isLoading || !data;
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-8">
        {/* List Section */}
        <div className="space-y-4">
          {isShowSkeleton ? (
            Array.from({ length: 5 }).map((_, i: number) => (
              <OrderCardSkeleton key={i} />
            ))
          ) : orders?.length === 0 ? (
            <EmptyOrganizerList dataName="order" />
          ) : (
            orders?.map((order: any, index: number) => (
              <OrderCard
                key={index}
                onOrderClick={handleOrderClick}
                order={order}
              />
            ))
          )}
        </div>
        {/* ORDER SHEETS */}
        <OrderDetailsSheet
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          order={selectedOrder}
        />
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

export default CompletedOrderOrganizer;
