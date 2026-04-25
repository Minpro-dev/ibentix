export const formatChartData = (orders: any[], range: string) => {
  const map = new Map();

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    let label = "";

    if (range === "year")
      label = date?.toLocaleString("default", { month: "short" }); // Jan, Feb
    else if (range === "month")
      label = `Week ${Math.ceil(date.getDate() / 7)}`; // Week 1, 2
    else label = date.getHours() + ":00"; // 09:00, 10:00

    const current = map.get(label) || { label, revenue: 0, tickets: 0 };
    map.set(label, {
      ...current,
      revenue: current.revenue + Number(order.totalAmount),
      tickets: current.tickets + order.ticketQuantity,
    });
  });

  return Array.from(map.values());
};
