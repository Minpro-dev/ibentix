import { useMyOrdersQuery } from "./hooks/useMyOrderQuery";
import OrderCard from "./components/OrderCard";
import type { OrderListItem } from "./types/myOrderType";
import { useState } from "react";
import PaginationButton from "../../../ui/PaginationButton";
import OrderCardSkeleton from "./components/OrderCardSkeleton";
import EmptyOrganizerList from "../../organizer/organizerProfile/components/EmptyOrganizerList";

export default function MyOrdersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyOrdersQuery(page);

  const orders = data?.data;
  const totalPage = data?.totalPage;

  const handlePagination = (num: number) => {
    setPage(num);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 min-h-dvh">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500">
          Manage your event tickets and transactions.
        </p>
      </header>

      <div className="space-y-4">
        {isLoading || !data ? (
          Array.from({ length: 10 }).map((_, index: number) => (
            <OrderCardSkeleton key={index} />
          ))
        ) : !orders?.length ? (
          <EmptyOrganizerList dataName="order" />
        ) : (
          orders?.map((order: OrderListItem) => (
            <OrderCard key={order.orderId} order={order} />
          ))
        )}
      </div>

      {orders && totalPage! > 1 && (
        <div className="flex justify-center py-8">
          <PaginationButton
            onClick={handlePagination}
            page={page}
            totalPage={totalPage!}
          />
        </div>
      )}
    </div>
  );
}
