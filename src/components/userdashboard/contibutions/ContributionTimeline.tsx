import React from "react";
import { ContributionGroup } from "@/types";
import { ContributionCard } from "./ContributionCard";

export function ContributionTimelineGroup({ group }: { group: ContributionGroup }) {
  return (
    <div className="relative pl-6 sm:pl-8 space-y-3">
      {/* Left Vertical Spine Line */}
      <div className="absolute top-3 bottom-0 left-[7px] w-[2px] bg-slate-100" />

      {/* Timeline Circle Indicator Node */}
      <div className="absolute top-2 left-0 h-4 w-4 rounded-full bg-slate-100 border-4 border-slate-300 flex items-center justify-center shadow-sm" />

      <h2 className="text-[10px] font-bold text-[#4B5563] uppercase tracking-widest pt-0.5">
        {group.dateLabel}
      </h2>

      <div className="space-y-3 w-full">
        {group.items.map((item) => (
          <ContributionCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}