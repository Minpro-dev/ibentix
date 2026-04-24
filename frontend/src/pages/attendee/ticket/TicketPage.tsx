import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TicketCard } from "../../../ui/TicketCard";
import { HistoryItem } from "../../../ui/HistoryItem";
import { ActionsPanel } from "../../../ui/ActionsPanel";
import type { Order } from "./userType";
import { fetchOrders, uploadPaymentProof } from "./ticketService";
import { cn } from "../../../lib/utils";
import { Loader2, Ticket as TicketIcon, AlertCircle } from "lucide-react";

type Tab = "ACTIVE" | "HISTORY" | "WAITLIST";

export default function TicketPage() {
  const [activeTab, setActiveTab] = useState<Tab>("ACTIVE");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingOrderId, setUploadingOrderId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingOrderIdRef = useRef<string | null>(null);

  // ─── Load orders on mount ─────────────────────────────────────────────────
  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load your tickets. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // ─── Handle pay: open file picker for payment proof upload ───────────────
  const handlePay = (orderId: string) => {
    pendingOrderIdRef.current = orderId;
    fileInputRef.current?.click();
  };

  // ─── File selected: upload proof ──────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const orderId = pendingOrderIdRef.current;

    if (!file || !orderId) return;

    // Reset file input so the same file can be re-selected if needed
    e.target.value = "";

    try {
      setUploadingOrderId(orderId);
      const updatedOrder = await uploadPaymentProof(orderId, file);

      // Replace the order in local state with the updated one from backend
      setOrders((prev) =>
        prev.map((o) => (o.orderId === updatedOrder.orderId ? updatedOrder : o)),
      );
    } catch (err) {
      console.error("Failed to upload payment proof:", err);
      setError("Payment proof upload failed. Please try again.");
    } finally {
      setUploadingOrderId(null);
      pendingOrderIdRef.current = null;
    }
  };

  // ─── Derived lists ────────────────────────────────────────────────────────
  const activeOrders = orders.filter((o) =>
    ["DONE", "WAITING_FOR_ADMIN_CONFIRMATION"].includes(
      o.payment?.paymentStatus ?? "",
    ),
  );

  const historyOrders = orders.filter((o) =>
    ["REJECTED", "EXPIRED", "CANCELED"].includes(
      o.payment?.paymentStatus ?? "",
    ),
  );

  // ─── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-on-surface-variant font-medium animate-pulse tracking-tight">
          Accessing TicketStream...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 transition-colors duration-500 font-sans">
      {/* Hidden file input for payment proof */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          <div className="flex flex-col gap-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-extrabold text-on-surface tracking-tighter leading-tight font-headline uppercase mb-1">
                My Tickets
              </h2>
              <p className="text-on-surface-variant font-medium tracking-tight">
                Manage your active invitations and history.
              </p>
            </motion.div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 text-sm font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                  <button
                    onClick={() => setError(null)}
                    className="ml-auto text-red-400 hover:text-red-600 transition-colors">
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tab Navigation */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {[
                { id: "ACTIVE", label: `Active (${activeOrders.length})` },
                { id: "HISTORY", label: `History (${historyOrders.length})` },
                { id: "WAITLIST", label: "Waitlist" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={cn(
                    "px-8 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 active:scale-95 uppercase tracking-widest",
                    activeTab === tab.id
                      ? "bg-accent text-white shadow-xl shadow-accent/10"
                      : "bg-surface border border-border text-on-surface-variant hover:bg-surface-container-low",
                  )}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              {activeTab === "ACTIVE" && (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12">
                  {activeOrders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {activeOrders.map((order) => (
                        <TicketCard
                          key={order.orderId}
                          // Pass the order; update TicketCard to accept Order instead of Ticket
                          order={order}
                          isUploading={uploadingOrderId === order.orderId}
                          onPay={() => handlePay(order.orderId)}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState message="No active tickets found." />
                  )}
                </motion.div>
              )}

              {activeTab === "HISTORY" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6">
                  <h3 className="text-lg font-bold text-on-surface mb-6 uppercase tracking-tight font-headline">
                    Recent Activity
                  </h3>
                  {historyOrders.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {historyOrders.map((order) => (
                        <HistoryItem key={order.orderId} order={order} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState message="Your history is empty." />
                  )}
                </motion.div>
              )}

              {activeTab === "WAITLIST" && (
                <motion.div
                  key="waitlist"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}>
                  <EmptyState message="Waitlist is currently empty." />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 bg-surface border border-border rounded-[24px] p-8 shadow-sm">
              <ActionsPanel />
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Actions Panel */}
      <div className="lg:hidden px-6 pb-12">
        <div className="bg-surface border border-border rounded-[24px] p-8 shadow-sm">
          <ActionsPanel />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-surface border border-dashed border-border rounded-[24px]">
      <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
        <TicketIcon className="w-8 h-8 text-on-surface-variant opacity-30" />
      </div>
      <p className="text-sm text-on-surface-variant font-bold uppercase tracking-widest">
        {message}
      </p>
    </div>
  );
}
