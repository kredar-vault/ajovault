import React from "react";
import { CycleInfo } from "@/types";

export function CycleOverviewCard({ cycle }: { cycle: CycleInfo }) {
  const rawName = cycle?.name || "savings circle";
  const status = cycle?.status || "ACTIVE";
  const type = cycle?.type || "Financial Rotation";
  const memberCount = cycle?.memberCount || 0;
  const contribution = cycle?.contribution || 0;
  const totalPool = cycle?.totalPool || 0;

  const capitalizedName = rawName
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="bg-white rounded-[10px] p-5 sm:p-6 flex flex-col justify-between h-full space-y-6">
      <div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight max-w-[80%] leading-tight truncate capitalize">
            {capitalizedName}
          </h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider bg-[#DCFCE7] text-[#166534] whitespace-nowrap uppercase">
            {status} CYCLE
          </span>
        </div>
        <p className="text-xs text-[#6B7280] font-medium mt-1">
          {type} • {memberCount} Members
        </p>
      </div>

      <div className="flex items-end gap-8 pt-2">
        <div>
          <span className="block text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Contribution</span>
          <div className="flex items-baseline gap-0.5 mt-1">
            <span className="text-2xl font-bold text-[#111827]">₦{contribution.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-[#9CA3AF]">/mo</span>
          </div>
        </div>
        <div>
          <span className="block text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">Total Pool</span>
          <p className="text-2xl font-bold text-[#006C49] mt-1">
            ₦{totalPool.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}