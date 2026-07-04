import React from "react";
import { ProgressStats } from "@/types";

export function CycleProgressCard({ stats }: { stats: ProgressStats }) {
  const percentage = (stats.currentMonth / stats.totalMonths) * 100;

  return (
    <div className="bg-white border border-gray-100 rounded-[10px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-6 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Cycle Progress</h2>
        <span className="text-[11px] font-bold text-[#4B5563]">Month {stats.currentMonth} of {stats.totalMonths}</span>
      </div>

      <div className="relative pt-4 pb-2 px-1">
        <div className="h-1.5 w-full bg-gray-100 rounded-full relative">
          <div 
            className="h-full bg-[#006C49] rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="absolute top-2.5 left-0 -translate-x-1/2 flex flex-col items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-[#15803D] border-2 border-white shadow-sm" />
          <span className="text-[9px] font-bold text-[#9CA3AF] mt-1">Start</span>
        </div>

        <div 
          className="absolute top-2.5 flex flex-col items-center -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        >
          <div className="h-3 w-3 rounded-full bg-[#004D34] border-2 border-white shadow-sm flex items-center justify-center">
            <div className="h-1 w-1 rounded-full bg-white" />
          </div>
          <span className="text-[9px] font-bold text-[#006C49] mt-1">Now</span>
        </div>

        <div className="absolute top-2.5 right-0 translate-x-1/2 flex flex-col items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-gray-300 border-2 border-white shadow-sm" />
          <span className="text-[9px] font-bold text-[#9CA3AF] mt-1">End</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-[#F8FAFC] p-3 rounded-xl border border-slate-50">
          <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wide">Collected</span>
          <p className="text-sm font-extrabold text-[#111827] mt-0.5">${stats.collected.toLocaleString()}</p>
        </div>
        <div className="bg-[#F8FAFC] p-3 rounded-xl border border-slate-50">
          <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wide">Pending</span>
          <p className="text-sm font-extrabold text-[#111827] mt-0.5">${stats.pending} </p>
        </div>
      </div>
    </div>
  );
}