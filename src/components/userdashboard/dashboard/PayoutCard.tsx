import React from "react";
import { PayoutSchedule } from "@/types";

export function PayoutCard({ payout }: { payout: PayoutSchedule }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex-1 flex flex-col justify-between min-h-[220px]">
      <h2 className="text-xs font-bold text-[#111827] tracking-tight">Next Payout</h2>
      
      <div className="bg-[#F8FAFC] border border-gray-50 rounded-lg px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-slate-300 border border-white" />
          <div>
            <span className="block text-xs font-bold text-[#111827]">{payout.recipientName}</span>
            <span className="block text-[10px] text-[#9CA3AF] font-medium">Recipient</span>
          </div>
        </div>
        <span className="text-xs font-bold text-[#006C49]">₦{payout.amount.toLocaleString()}</span>
      </div>

      <div className="bg-[#F8FAFC] border border-gray-50 rounded-lg px-4 py-4 space-y-0.5">
        <p className="text-2xl font-bold text-[#111827]">{payout.daysRemaining} Days</p>
        <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Until disbursement</p>
      </div>
    </div>
  );
}