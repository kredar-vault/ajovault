import React from "react";
import { 
  Search, 
  ChevronDown, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Inbox // Added for the empty state icon
} from "lucide-react";
import { ActivityRow } from "@/types";

interface ActivityTableProps {
  data: ActivityRow[];
  loading?: boolean;
}

export function ActivityTable({ data, loading = false }: ActivityTableProps) {
  const isEmpty = !loading && data.length === 0;

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden w-full">
      
      {/* Top Header Filters Section */}
      <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <h2 className="text-sm font-bold text-[#111827] tracking-tight whitespace-nowrap">Contribution Activity</h2>
          
          <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full">
            <div className="relative flex items-center bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 w-full sm:w-64">
              <Search className="h-3.5 w-3.5 text-[#9CA3AF] mr-1.5 shrink-0" />
              <input 
                type="text" 
                placeholder="Search by name" 
                disabled={loading || isEmpty}
                className="text-xs font-medium text-[#111827] bg-transparent border-0 outline-none w-full placeholder:text-[#9CA3AF] disabled:opacity-50" 
              />
            </div>

            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
              <button disabled={loading || isEmpty} className="flex items-center justify-between gap-2 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-[#4B5563] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white">
                Date <ChevronDown className="h-3 w-3 text-[#9CA3AF]" />
              </button>
              <button disabled={loading || isEmpty} className="flex items-center justify-between gap-2 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-[#4B5563] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white">
                Status <ChevronDown className="h-3 w-3 text-[#9CA3AF]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Shell Wrap Container */}
      <div className="w-full overflow-x-auto block clear-both">
        <table className="w-full text-left border-collapse min-w-[700px]">
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
            {/* Loading State */}
            {loading && (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={`loading-${index}`} className="animate-pulse">
                  <td className="py-4 px-5"><div className="h-3.5 bg-gray-100 rounded w-28" /></td>
                  <td className="py-4 px-5"><div className="h-3.5 bg-gray-100 rounded w-20" /></td>
                  <td className="py-4 px-5"><div className="h-3.5 bg-gray-100 rounded w-24" /></td>
                  <td className="py-4 px-5"><div className="h-3.5 bg-gray-100 rounded w-16" /></td>
                  <td className="py-4 px-5"><div className="h-5 bg-gray-100 rounded w-16" /></td>
                  <td className="py-4 px-5 text-right"><div className="h-3.5 bg-gray-100 rounded w-4 ml-auto" /></td>
                </tr>
              ))
            )}

            {/* Active Data Rows */}
            {!loading && data.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-5 font-bold text-[#111827] whitespace-nowrap">{row.member}</td>
                <td className="py-3.5 px-5 text-[#4B5563] whitespace-nowrap">{row.group}</td>
                <td className="py-3.5 px-5 text-[#4B5563] whitespace-nowrap">{row.dueDate}</td>
                <td className="py-3.5 px-5 text-[#111827] font-semibold whitespace-nowrap">{row.amount}</td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    row.status === "Received" ? "text-[#166534] bg-[#DCFCE7]" :
                    row.status === "Missed" ? "text-[#991B1B] bg-[#FEE2E2]" : "text-[#9A3412] bg-[#FFEDD5]"
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                  <button className="text-[#9CA3AF] hover:text-[#4B5563]"><MoreVertical className="h-3.5 w-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State View */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-12 px-4 w-full bg-white">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gray-50 border border-gray-100 mb-3">
              <Inbox className="h-5 w-5 text-[#9CA3AF]" />
            </div>
            <h3 className="text-xs font-bold text-[#111827] mb-1">No activities found</h3>
            <p className="text-[11px] font-medium text-[#6B7280] text-center max-w-[280px]">
              There is no contribution history available right now. New updates will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Footer Section */}
      <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#6B7280]">
        <span>{loading ? "..." : 0} of {data.length} row(s) selected.</span>
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="font-medium text-xs">Rows per page</span>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-[#111827]">
              <span>10</span><ChevronDown className="h-3 w-3 text-[#9CA3AF] ml-2" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="whitespace-nowrap">Page {loading || isEmpty ? "0 of 0" : "1 of 2"}</span>
            <div className="flex items-center gap-1">
              <button disabled={loading || isEmpty} className="p-1 border border-gray-200 rounded bg-white text-[#9CA3AF] disabled:opacity-50"><ChevronsLeft className="h-3.5 w-3.5" /></button>
              <button disabled={loading || isEmpty} className="p-1 border border-gray-200 rounded bg-white text-[#9CA3AF] disabled:opacity-50"><ChevronLeft className="h-3.5 w-3.5" /></button>
              <button disabled={loading || isEmpty} className="p-1 border border-gray-200 rounded bg-white text-[#4B5563] disabled:opacity-50"><ChevronRight className="h-3.5 w-3.5" /></button>
              <button disabled={loading || isEmpty} className="p-1 border border-gray-200 rounded bg-white text-[#4B5563] disabled:opacity-50"><ChevronsRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}