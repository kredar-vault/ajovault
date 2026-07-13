import React from "react";
import { ProgressStats } from "@/types";

export function CycleProgressCard({ stats }: { stats: ProgressStats }) {
  const current = stats?.currentMonth || 0;
  const total = stats?.totalMonths || 0;
  const collected = stats?.collected || 0;
  const pending = stats?.pending || 0;

  const percentage = total > 0 ? Math.min(Math.max((current / total) * 100, 0), 100) : 0;

  return (
    <div className="bg-white border border-gray-100 rounded-[10px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col justify-between h-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Cycle Progress</h2>
        <span className="text-[11px] font-bold text-[#4B5563]">Month {current} of {total}</span>
      </div>

      <div className="w-full py-2">
        <div className="h-1.5 w-full bg-gray-100 rounded-full relative">
          <div 
            className="h-full bg-[#006C49] rounded-full transition-all duration-300 relative"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 0 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-3 w-3 rounded-full bg-[#004D34] border-2 border-white shadow-sm flex items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-white" />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2 px-0.5 text-[9px] font-bold text-[#9CA3AF]">
          <span>Start</span>
          <span className="text-[#006C49]">Now ({Math.round(percentage)}%)</span>
          <span>End</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F8FAFC] p-3 rounded-xl border border-slate-50">
          <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wide">Collected</span>
          <p className="text-sm font-extrabold text-[#111827] mt-0.5">${collected.toLocaleString()}</p>
        </div>
        <div className="bg-[#F8FAFC] p-3 rounded-xl border border-slate-50">
          <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wide">Pending</span>
          <p className="text-sm font-extrabold text-[#111827] mt-0.5">${pending.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}