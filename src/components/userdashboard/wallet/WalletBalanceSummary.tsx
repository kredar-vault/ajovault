"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface WalletBalanceSummaryProps {
  summary: {
    availableBalance: number;
    totalContributed: number;
    nextPayout: number;
  };
  activeGroupDetails: {
    contributionAmount: number;
  };
  progress: {
    month: string;
  };
  payout: {
    recipientName: string;
  };
}

export function WalletBalanceSummary({
  summary,
  activeGroupDetails,
  progress,
  payout,
}: WalletBalanceSummaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 w-full">
      {/* Available Balance Card */}
      <div className="sm:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.01)] min-h-[180px]">
        <div>
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Available Balance</span>
          <h2 className="text-3xl font-bold text-[#111827] mt-2 tracking-tight">₦{summary.availableBalance.toLocaleString()}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-4">
          <div>
            <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Total Contributed</span>
            <p className="text-sm font-bold text-[#111827] mt-0.5">₦{summary.totalContributed.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Next Payout</span>
            <p className="text-sm font-bold text-[#006C49] mt-0.5">₦{summary.nextPayout.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* This Month Paid Status Card */}
      <div className="sm:col-span-5 bg-[#E6F7F0] rounded-3xl p-6 flex flex-col justify-between border border-[#006C49]/5 min-h-[180px]">
        <div className="flex">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white rounded-full text-[9px] font-bold text-[#006C49] uppercase tracking-wide shadow-sm">
            <CheckCircle2 className="h-3 w-3 fill-[#006C49] text-white" /> This Month Paid
          </span>
        </div>
        <div className="mt-3">
          <span className="text-[9px] font-bold text-[#006C49]/70 uppercase tracking-wider block">Amount</span>
          <h3 className="text-2xl font-bold text-[#006C49] mt-0.5 tracking-tight">₦{activeGroupDetails.contributionAmount.toLocaleString()}</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px] mt-4">
          <div>
            <span className="text-[#006C49]/60 font-bold uppercase text-[9px] block">Due</span>
            <span className="text-[#006C49] font-bold">{progress.month}</span>
          </div>
          <div>
            <span className="text-[#006C49]/60 font-bold uppercase text-[9px] block">Next Recipient</span>
            <span className="text-[#006C49] font-bold">{payout.recipientName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
