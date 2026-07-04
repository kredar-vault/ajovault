import React from "react";
import { CycleInfo } from "@/types";

export function CycleOverviewCard({ cycle }: { cycle: CycleInfo }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[10px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col justify-between h-full gap-6">
      <div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight max-w-[80%] leading-tight">
            {cycle.name}
          </h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider bg-[#DCFCE7] text-[#166534] whitespace-nowrap">
            {cycle.status} CYCLE
          </span>
        </div>
        <p className="text-xs text-[#6B7280] font-medium mt-1">
          {cycle.type} • {cycle.memberCount} Members
        </p>
      </div>

      <div className="flex items-end gap-8 pt-2">
        <div>
          <span className="block text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Contribution</span>
          <div className="flex items-baseline gap-0.5 mt-1">
            <span className="text-2xl font-bold text-[#111827]">${cycle.contribution.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-[#9CA3AF]">/mo</span>
          </div>
        </div>
        <div>
          <span className="block text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Total Pool</span>
          <p className="text-2xl font-bold text-[#006C49] mt-1">
            ${cycle.totalPool.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}