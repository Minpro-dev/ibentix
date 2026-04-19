import React from 'react';
import { Check } from 'lucide-react';

export const ProgressTracker: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center max-w-2xl mx-auto">
        
        {/* Step 1: TICKETS (Completed) */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#0369A1] text-white flex items-center justify-center shadow-sm">
            <Check size={18} strokeWidth={3} />
          </div>
          <span className="text-[10px] font-black text-[#0369A1] uppercase tracking-widest">Tickets</span>
        </div>
        
        {/* Connector Line 1 (Active/Full) */}
        <div className="w-20 md:w-32 h-[3px] bg-[#0369A1] mx-2 -mt-6"></div>

        {/* Step 2: DETAILS (Current Active) */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-black shadow-lg shadow-blue-200">
            2
          </div>
          <span className="text-[10px] font-black text-[#1D4ED8] uppercase tracking-widest underline underline-offset-4">Details</span>
        </div>

        {/* Connector Line 2 (Inactive/Empty) */}
        <div className="w-20 md:w-32 h-[3px] bg-slate-200 mx-2 -mt-6"></div>

        {/* Step 3: PAYMENT (Next Step) */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-black">
            3
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment</span>
        </div>
        
      </div>
    </div>
  );
};