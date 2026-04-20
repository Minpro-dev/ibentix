import { useState } from "react";
import { useFetchNewOrder } from "../hooks/useFetchNewOrder";
import EmptyState from "./EmptyState";
import OrderCard from "./OrderCard";
import OrderDetailsSheet from "./OrderDetailsSheet";

function CompletedOrderOrganizer() {
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const orderStatus = ["REJECTED", "CANCELED", "DONE"];
  const { data, isLoading } = useFetchNewOrder(orderStatus);
  const orders = data?.data.data;
  console.log(data?.data.data);
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-8">
        {/* List Section */}
        <div className="space-y-4">
          {orders?.length === 0 ? (
            <EmptyState /> //FIXME
          ) : (
            orders?.map((order: any, index: number) => (
              <OrderCard
                key={index}
                onOrderClick={handleOrderClick}
                order={order}
                onViewProof={(url) => setSelectedProof(url)}
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
    </div>
  );
}

export default CompletedOrderOrganizer;
