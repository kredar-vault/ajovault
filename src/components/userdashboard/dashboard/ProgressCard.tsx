import React from "react";
import { ContributionProgress } from "@/types";

export function ProgressCard({ progress }: { progress: ContributionProgress }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[220px]">
      <h2 className="text-xs font-bold text-[#111827] tracking-tight">Contribution Progress</h2>
      
      <div className="flex items-center justify-between gap-4 py-2">
        <div className="relative h-28 w-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-gray-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-[#921416]" strokeWidth="3.5" strokeDasharray="15, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-[#EAB308]" strokeWidth="3.5" strokeDasharray="10, 100" strokeDashoffset="-15" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-[#15803D]" strokeWidth="3.5" strokeDasharray="60, 100" strokeDashoffset="-25" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div className="absolute text-center">
            <span className="block text-base font-bold text-[#111827]">{progress.receivedCount}/{progress.totalCount}</span>
            <span className="block text-[9px] font-semibold text-[#9CA3AF] tracking-tight uppercase">contributed</span>
          </div>
        </div>

        <div className="border border-gray-100 rounded-lg p-3 w-full max-w-[130px] bg-white space-y-1.5 self-center">
          <span className="text-[10px] font-bold text-[#111827] block pb-0.5 border-b border-gray-50">{progress.month}</span>
          <div className="flex justify-between items-center text-[10px] font-medium text-[#4B5563]">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" /> Received</span>
            <span className="font-bold text-[#111827]">{progress.receivedCount}</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-medium text-[#4B5563]">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#EAB308]" /> Pending</span>
            <span className="font-bold text-[#111827]">{progress.pendingCount}</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-medium text-[#4B5563]">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#921416]" /> Missed</span>
            <span className="font-bold text-[#111827]">{progress.missedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}