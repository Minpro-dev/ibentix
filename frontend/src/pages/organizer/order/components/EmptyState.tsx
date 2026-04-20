import { RiFileList3Line } from "react-icons/ri";

export default function EmptyState() {
  return (
    <div className="py-24 text-center bg-zinc-50/50 rounded-[40px] border border-dashed border-zinc-200">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
        <RiFileList3Line className="text-zinc-300 text-2xl" />
      </div>
      <h3 className="text-zinc-900 font-bold">No orders found</h3>
      <p className="text-zinc-400 text-sm mt-1">
        There are no transactions in this category yet.
      </p>
    </div>
  );
}
