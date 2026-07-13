import React from "react";
import { NextPayout } from "@/types";

export function NextPayoutCard({ payout }: { payout: NextPayout }) {
  const recipientName = payout?.recipientName || "None scheduled";
  const daysRemaining = payout?.daysRemaining || 0;
  const dateString = payout?.dateString || "N/A";

  const initials = recipientName
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-[10px] p-5 sm:p-6 flex flex-col items-center justify-between text-center h-full min-h-[180px] relative overflow-hidden space-y-4">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#006C49]/5 rounded-full filter blur-xl -mr-8 -mt-8 pointer-events-none" />
      
      <div className="w-full">
        <span className="text-[10px] font-bold text-[#9CA3AF] tracking-wide uppercase block">Next Payout</span>
        <h3 className="text-base font-bold text-[#111827] mt-1 truncate max-w-full px-2">{recipientName}</h3>
      </div>
      
      <div className="relative my-1">
        <div className="h-12 w-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-500 shadow-sm">
          {initials || "—"}
        </div>
      </div>

      <div className="w-full">
        <p className="text-xs font-bold text-[#006C49]">
          In {daysRemaining} Days <span className="text-[#9CA3AF] font-semibold">({dateString})</span>
        </p>
      </div>
    </div>
  );
}