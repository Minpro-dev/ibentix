import { useState } from "react";
import { useFetchDashboardStats } from "./hooks/useFetchDashboardStats";
import {
  RiFlagLine,
  RiMoneyDollarCircleLine,
  RiTicketLine,
} from "react-icons/ri";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { formatCurrency } from "../../../utils/formatCurrency";

function DashboardPage() {
  const [range, setRange] = useState("year");
  const { stats, isLoading } = useFetchDashboardStats(range);

  if (isLoading)
    return <div className="p-10 text-zinc-400">Loading Analytics...</div>;

  const COLORS = ["#4f46e5", "#818cf8", "#c7d2fe", "#e0e7ff"];

  const coloredCategoryData = stats?.categoryStats.map(
    (item: any, index: number) => ({
      ...item,
      fill: COLORS[index % COLORS.length], // Recharts akan otomatis membaca properti 'fill' ini
    }),
  );

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
      {/* HEADER & FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900 tracking-normal pb-2">
            Analytics
          </h1>
          <p className="text-zinc-500 text-sm">
            Monitor your event performance and revenue.
          </p>
        </div>

        <div className="flex bg-zinc-100 p-1 rounded-2xl">
          {["day", "month", "year"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-6 py-2 cursor-pointer rounded-xl text-[10px] font-semibold tracking-widest transition-all ${
                range === r
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard
          label="Total Revenue"
          value={formatCurrency(stats?.summary.totalRevenue)}
          icon={<RiMoneyDollarCircleLine />}
          color="indigo"
        />
        <StatCard
          label="Tickets Sold"
          value={stats?.summary.totalTickets}
          icon={<RiTicketLine />}
          color="zinc"
        />
        <StatCard
          label="Active Events"
          value={stats?.summary.totalEvents}
          icon={<RiFlagLine />}
          color="zinc"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN CHART - LINE/AREA CHART */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-zinc-900 s tracking-widest">
              Revenue Growth
            </h3>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f4f4f5"
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#a1a1aa" }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECONDARY CHART - CATEGORY PIE */}
        <div className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm space-y-8 flex flex-col justify-center">
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest text-center">
            Category Distribution
          </h3>
          <div className="h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={coloredCategoryData} // Gunakan data yang sudah diberi warna
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="_count.eventId"
                  nameKey="category"
                  stroke="none"
                  // Properti cornerRadius bisa ditaruh di sini (beberapa versi Recharts mendukungnya di Pie)
                  cornerRadius={10}></Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats?.categoryStats.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

const StatCard = ({ label, value, icon, color }: any) => (
  <div className="bg-white p-8 rounded-4xl border border-zinc-100 shadow-sm space-y-4">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
        color === "indigo"
          ? "bg-indigo-50 text-indigo-600"
          : "bg-zinc-50 text-zinc-400"
      }`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
        {label}
      </p>
      <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
        {value}
      </h2>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 p-4 rounded-2xl shadow-xl border border-zinc-800">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">
          {payload[0].payload.label}
        </p>
        <p className="text-white font-bold text-sm">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default DashboardPage;
