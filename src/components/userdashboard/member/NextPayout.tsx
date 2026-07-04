import React from "react";
import { NextPayout } from "@/types";

export function NextPayoutCard({ payout }: { payout: NextPayout }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[10px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col items-center justify-center text-center h-full min-h-[180px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#006C49]/5 rounded-full filter blur-xl -mr-8 -mt-8 pointer-events-none" />
      
      <span className="text-[10px] font-bold text-[#9CA3AF] tracking-wide uppercase">Next Payout</span>
      <h3 className="text-base font-bold text-[#111827] mt-1">{payout.recipientName}</h3>
      
      <div className="my-4 relative">
        <div className="h-14 w-14 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
          {payout.avatarUrl ? (
            <img src={payout.avatarUrl} alt={payout.recipientName} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-slate-300 flex items-center justify-center font-bold text-xs text-slate-600" />
          )}
        </div>
      </div>

      <p className="text-xs font-bold text-[#006C49]">
        In {payout.daysRemaining} Days <span className="text-[#9CA3AF] font-semibold">({payout.dateString})</span>
      </p>
    </div>
  );
}