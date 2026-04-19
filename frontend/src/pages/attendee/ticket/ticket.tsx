import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TicketCard } from "../../../ui/TicketCard";
import { HistoryItem } from "../../../ui/HistoryItem";
import { ActionsPanel } from "../../../ui/ActionsPanel";
import type { Ticket } from "../../../types/userType";
import { fetchTickets, payTicket } from "../../../services/ticketService";
import { cn } from "../../../lib/utils";
import { Loader2, Ticket as TicketIcon } from "lucide-react";

type Tab = "ACTIVE" | "HISTORY" | "WAITLIST";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("ACTIVE");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchTickets();
        setTickets(data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handlePay = async (id: string) => {
    const success = await payTicket(id);
    if (success) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status: "DONE",
                seat: "V-01",
                gate: "B-01",
                priority: "Silver",
              }
            : t,
        ),
      );
    }
  };

  const activeTickets = tickets.filter(
    (t) => t.status === "DONE" || t.status === "PAYMENT_PENDING",
  );
  const historyTickets = tickets.filter(
    (t) => t.status === "REJECTED" || t.status === "EXPIRED",
  );

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
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          <div className="flex flex-col gap-10">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-extrabold text-on-surface tracking-tighter leading-tight font-headline uppercase mb-1">
                My Tickets
              </h2>
              <p className="text-on-surface-variant font-medium tracking-tight">
                Manage your active invitations and history.
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {[
                { id: "ACTIVE", label: `Active (${activeTickets.length})` },
                { id: "HISTORY", label: "History" },
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
                  )}
                >
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
                  className="space-y-12"
                >
                  {activeTickets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {activeTickets.map((ticket) => (
                        <TicketCard
                          key={ticket.id}
                          ticket={ticket}
                          onPay={handlePay}
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
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-on-surface mb-6 uppercase tracking-tight font-headline">
                    Recent Activity
                  </h3>
                  {historyTickets.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {historyTickets.map((ticket) => (
                        <HistoryItem key={ticket.id} ticket={ticket} />
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
                  animate={{ opacity: 1 }}
                >
                  <EmptyState message="Waitlist is currently empty." />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel (Actions) - Fixed on larger screens */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 bg-surface border border-border rounded-[24px] p-8 shadow-sm">
              <ActionsPanel />
            </div>
          </aside>
        </div>
      </main>

      {/* For mobile action panel visibility, usually a bottom drawer or included in tabs. 
          Here we show it below the content on mobile if tab is ACTIVE */}
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
