import { useState } from "react";
import TicketCard from "./components/TicketCard";
import { useMyTicketsQuery } from "./hooks/useMyTicketsQuery";
import PaginationButton from "../../../ui/PaginationButton";
import TicketCardSkeleton from "./components/TicketCardSkeleton";

export default function MyTicketsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyTicketsQuery(page);
  const totalPage = data?.totalPage;
  const orders = data?.data;

  const allTickets =
    orders?.flatMap((order) =>
      order.tickets.map((t) => ({
        ...t,
        event: order.event,
        orderId: order.orderId,
      })),
    ) || [];

  const handlePagination = (num: number) => {
    setPage(num);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl pb-3 font-bold text-gray-900 uppercase tracking-tight">
          Your Pass
        </h1>
        <p className="text-sm text-gray-500">
          Show these tickets at the entrance
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <TicketCardSkeleton key={i} />
          ))}
        </div>
      ) : allTickets.length > 0 ? (
        <div className="space-y-2">
          {allTickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketId}
              eventTitle={ticket.event.title}
              location={ticket.event.city}
              date={ticket.event.eventDate}
              attendeeName={ticket.attendeeName}
              ticketCode={ticket.ticketCode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm font-medium">
            No active tickets found.
          </p>
        </div>
      )}

      {page > 1 && (
        <div className="flex justify-center py-8">
          <PaginationButton
            page={page}
            onClick={handlePagination}
            totalPage={totalPage!}
          />
        </div>
      )}
    </div>
  );
}
