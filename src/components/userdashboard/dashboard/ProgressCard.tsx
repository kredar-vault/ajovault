import React from "react";
import { ContributionProgress } from "@/types";

interface ProgressCardProps {
  progress?: ContributionProgress;
  loading?: boolean;
}

export function ProgressCard({ progress, loading = false }: ProgressCardProps) {
  // Fallbacks if data is missing or zero
  const total = progress?.totalCount ?? 0;
  const received = progress?.receivedCount ?? 0;
  const pending = progress?.pendingCount ?? 0;
  const missed = progress?.missedCount ?? 0;

  // Calculate percentages relative to a total circumference of 100
  const receivedPct = total > 0 ? (received / total) * 100 : 0;
  const pendingPct = total > 0 ? (pending / total) * 100 : 0;
  const missedPct = total > 0 ? (missed / total) * 100 : 0;

  // Offsets for stacking segments cleanly
  const receivedOffset = 0;
  const pendingOffset = -receivedPct;
  const missedOffset = -(receivedPct + pendingPct);

  return (
    <div className="bg-white rounded-xl p-5 flex flex-col justify-between h-full min-h-[220px] gap-4">
      <h2 className="text-xs font-bold text-[#111827]">Contribution progress</h2>
      
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 py-2">
        {loading ? (
          <div className="animate-pulse flex items-center justify-center h-28 w-28 rounded-full bg-gray-50" />
        ) : (
          <div className="relative h-28 w-28 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Empty background track */}
              <path className="text-gray-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              
              {/* Received segment */}
              {receivedPct > 0 && (
                <path className="text-[#15803D]" strokeWidth="3.5" strokeDasharray={`${receivedPct}, 100`} strokeDashoffset={receivedOffset} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              )}
              
              {/* Pending segment */}
              {pendingPct > 0 && (
                <path className="text-[#EAB308]" strokeWidth="3.5" strokeDasharray={`${pendingPct}, 100`} strokeDashoffset={pendingOffset} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              )}
              
              {/* Missed segment */}
              {missedPct > 0 && (
                <path className="text-[#921416]" strokeWidth="3.5" strokeDasharray={`${missedPct}, 100`} strokeDashoffset={missedOffset} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              )}
            </svg>
            <div className="absolute text-center">
              <span className="block text-base font-bold text-[#111827]">{received}/{total}</span>
              <span className="block text-[10px] font-medium text-[#9CA3AF]">Contributed</span>
            </div>
          </div>
        )}

        <div className="border border-gray-100 rounded-lg p-3 w-full sm:max-w-[140px] bg-white space-y-1.5">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-3 bg-gray-100 rounded w-12 mb-1" />
              <div className="h-2.5 bg-gray-100 rounded w-full" />
              <div className="h-2.5 bg-gray-100 rounded w-full" />
              <div className="h-2.5 bg-gray-100 rounded w-full" />
            </div>
          ) : (
            <>
              <span className="text-[10px] font-bold text-[#111827] block pb-0.5 border-b border-gray-50">{progress?.month ?? "Current"}</span>
              <div className="flex justify-between items-center text-[10px] font-medium text-[#4B5563] gap-4">
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#15803D] shrink-0" /> Received</span>
                <span className="font-bold text-[#111827]">{received}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-medium text-[#4B5563] gap-4">
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#EAB308] shrink-0" /> Pending</span>
                <span className="font-bold text-[#111827]">{pending}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-medium text-[#4B5563] gap-4">
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#921416] shrink-0" /> Missed</span>
                <span className="font-bold text-[#111827]">{missed}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}