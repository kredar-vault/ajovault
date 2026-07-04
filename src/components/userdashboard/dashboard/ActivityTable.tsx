import React from "react";
import { Search, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { ActivityRow } from "@/types";

export function ActivityTable({ data }: { data: ActivityRow[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <h2 className="text-sm font-bold text-[#111827] tracking-tight pr-2">Contribution Activity</h2>
          
          <div className="relative flex items-center bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 max-w-xs w-full">
            <Search className="h-3.5 w-3.5 text-[#9CA3AF] mr-1.5" />
            <input type="text" placeholder="Search by name" className="text-xs font-medium text-[#111827] bg-transparent border-0 outline-none w-full placeholder:text-[#9CA3AF]" />
          </div>

          <button className="flex items-center justify-between gap-2 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-[#4B5563] bg-white hover:bg-gray-50">
            Date <ChevronDown className="h-3 w-3 text-[#9CA3AF]" />
          </button>
          <button className="flex items-center justify-between gap-2 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-[#4B5563] bg-white hover:bg-gray-50">
            Status <ChevronDown className="h-3 w-3 text-[#9CA3AF]" />
          </button>
        </div>
        <button className="text-[#9CA3AF] hover:text-[#4B5563] p-1 ml-auto sm:ml-0"><MoreVertical className="h-4 w-4" /></button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-[#4B5563] bg-white">
              <th className="py-3 px-5 font-semibold">Member</th>
              <th className="py-3 px-5 font-semibold">Group</th>
              <th className="py-3 px-5 font-semibold">Due Date</th>
              <th className="py-3 px-5 font-semibold">Amount</th>
              <th className="py-3 px-5 font-semibold">Status</th>
              <th className="py-3 px-5 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-medium text-[#1E293B]">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-5 font-bold text-[#111827]">{row.member}</td>
                <td className="py-3.5 px-5 text-[#4B5563]">{row.group}</td>
                <td className="py-3.5 px-5 text-[#4B5563]">{row.dueDate}</td>
                <td className="py-3.5 px-5 text-[#111827] font-semibold">{row.amount}</td>
                <td className="py-3.5 px-5">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    row.status === "Received" ? "text-[#166534] bg-[#DCFCE7]" :
                    row.status === "Missed" ? "text-[#991B1B] bg-[#FEE2E2]" : "text-[#9A3412] bg-[#FFEDD5]"
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right">
                  <button className="text-[#9CA3AF] hover:text-[#4B5563]"><MoreVertical className="h-3.5 w-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#6B7280]">
        <span>0 of {data.length} row(s) selected.</span>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-medium">Rows per page</span>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-[#111827]">
              <span>10</span><ChevronDown className="h-3 w-3 text-[#9CA3AF] ml-2" />
            </div>
          </div>
          <span>Page 1 of 2</span>
          <div className="flex items-center gap-1">
            <button className="p-1 border border-gray-200 rounded bg-white hover:bg-gray-50 text-[#9CA3AF]"><ChevronsLeft className="h-3.5 w-3.5" /></button>
            <button className="p-1 border border-gray-200 rounded bg-white hover:bg-gray-50 text-[#9CA3AF]"><ChevronLeft className="h-3.5 w-3.5" /></button>
            <button className="p-1 border border-gray-200 rounded bg-white hover:bg-gray-50 text-[#4B5563]"><ChevronRight className="h-3.5 w-3.5" /></button>
            <button className="p-1 border border-gray-200 rounded bg-white hover:bg-gray-50 text-[#4B5563]"><ChevronsRight className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}