import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import { ContributionItem } from "@/types";

export function ContributionCard({ item }: { item: ContributionItem }) {
  const statusStyles = {
    Received: "text-[#166534] bg-[#DCFCE7]",
    Pending: "text-[#9A3412] bg-[#FFEDD5]",
    Failed: "text-[#991B1B] bg-[#FEE2E2]",
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[10px] p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01)] hover:shadow-md/5 transition-all space-y-4">
      
      {/* Upper Segment: Avatar, Names, Currency Balance, Status Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center shrink-0 border border-gray-50">
            {item.avatarUrl ? (
              <img src={item.avatarUrl} alt={item.memberName} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-slate-600 tracking-tight">
                {item.memberInitials || item.memberName.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-[#111827] truncate tracking-tight">{item.memberName}</h3>
            <p className="text-[11px] text-[#6B7280] font-medium truncate mt-0.5">{item.groupName}</p>
          </div>
        </div>

        {/* Amount & Reference Section */}
        <div className="text-left sm:text-right flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2 sm:gap-0.5 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-dashed border-gray-100 sm:border-t-0">
          <p className="text-sm font-bold text-[#006C49]">
            ₦{item.amount.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
              REF-{item.reference}
            </span>
            <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${statusStyles[item.status]}`}>
              {item.status}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Segment: Time Stamp & Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-[11px] font-semibold text-[#6B7280]">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-[#9CA3AF]" />
          <span>{item.time}</span>
        </div>
        <button className="flex items-center gap-1 text-[#4B5563] hover:text-[#006C49] transition-colors group">
          <span>View Receipt</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}