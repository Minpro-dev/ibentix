export const inputClass = (error?: boolean) =>
  `w-full px-4 py-2 border rounded-xl text-sm transition outline-none
   ${error ? "border-red-500 focus:ring-red-500" : "border-zinc-300 focus:ring-indigo-500"}
   focus:ring-2`;

export const labelClass =
  "block text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wide";

export const errorTextClass =
  "text-red-500 text-[10px] mt-1";

export const sectionClass =
  "space-y-6 p-6 border rounded-2xl bg-white";

export const cardClass =
  "bg-white rounded-2xl shadow-xl p-8 border border-zinc-200";