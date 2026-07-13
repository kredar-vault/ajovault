import React from "react";
import { User } from "lucide-react"; // Imported User icon for the recipient slot
import { PayoutSchedule } from "@/types";

interface PayoutCardProps {
  payout?: PayoutSchedule;
  loading?: boolean;
}

export function PayoutCard({ payout, loading = false }: PayoutCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 flex-1 flex flex-col justify-between min-h-[220px] gap-4">
      <h2 className="text-xs font-bold text-[#111827]">Next payout</h2>
      
      {loading ? (
        <div className="animate-pulse space-y-3 w-full">
          <div className="h-12 bg-gray-50 rounded-lg w-full" />
          <div className="h-16 bg-gray-50 rounded-lg w-full" />
        </div>
      ) : (
        <>
          <div className="bg-[#F8FAFC] border border-gray-50 rounded-lg px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                <User className="h-3.5 w-3.5 text-[#9CA3AF]" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#111827]">{payout?.recipientName ?? "None"}</span>
                <span className="block text-[10px] text-[#9CA3AF] font-medium">Recipient</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#006C49]">
              ₦{payout ? payout.amount.toLocaleString() : "0"}
            </span>
          </div>

          <div className="bg-[#F8FAFC] border border-gray-50 rounded-lg px-4 py-4 space-y-0.5">
            <p className="text-2xl font-bold text-[#111827]">{payout?.daysRemaining ?? 0} days</p>
            <p className="text-[10px] font-semibold text-[#9CA3AF]">Until disbursement</p>
          </div>
        </>
      )}
    </div>
  );
}