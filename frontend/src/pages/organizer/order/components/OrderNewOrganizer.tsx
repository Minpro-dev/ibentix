import { useState } from "react";
import { useFetchNewOrder } from "../hooks/useFetchNewOrder";
import { RiCloseLine } from "react-icons/ri";
import OrderCard from "./OrderCard";
import EmptyState from "./EmptyState";
import OrderDetailsSheet from "./OrderDetailsSheet";

function OrderNewOrganizer() {
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const orderStatus = ["WAITING_FOR_ADMIN_CONFIRMATION"];
  const { data, isLoading } = useFetchNewOrder(orderStatus);
  const orders = data?.data.data;
  console.log(data?.data.data);
  return (
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
      <OrderDetailsSheet
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        order={selectedOrder}
      />

      {/* Modal View Proof */}
      {selectedProof && (
        <div
          className="fixed inset-0 bg-zinc-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-6"
          onClick={() => setSelectedProof(null)}>
          <button className="absolute top-10 right-10 text-white hover:text-indigo-400 transition-all">
            <RiCloseLine size={32} />
          </button>
          <img
            src={selectedProof}
            alt="Payment Proof"
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border-4 border-white/5"
          />
        </div>
      )}
    </div>
  );
}

export default OrderNewOrganizer;
