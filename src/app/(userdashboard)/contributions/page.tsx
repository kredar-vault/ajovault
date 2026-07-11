"use client";

import React from "react";
import { Search, SlidersHorizontal, ChevronDown, Loader2, Plus } from "lucide-react";
import { useCircle } from "../layout";
import { useGroupContributions } from "@/hooks/useContributions";
import { ContributionTimelineGroup } from "@/components/userdashboard/contibutions/ContributionTimeline";
import type { ContributionGroup } from "@/types";
import Link from "next/link";

export default function ContributionsDashboard() {
  const { currentCircleId, isLoading: isCirclesLoading } = useCircle();
  const { data: contributionsList, isLoading: isContributionsLoading } = useGroupContributions(currentCircleId || "");

  const isLoading = isCirclesLoading || isContributionsLoading;

  if (isLoading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] gap-2 bg-[#F9FAFB]">
        <Loader2 className="h-8 w-8 text-[#006C49] animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Loading contributions history...</p>
      </main>
    );
  }

  if (!currentCircleId) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto flex flex-col items-center justify-center min-h-[500px] text-center space-y-6 bg-[#F9FAFB]">
        <div className="max-w-md space-y-3">
          <h2 className="text-xl font-bold text-gray-900">No active savings circles</h2>
          <p className="text-sm text-gray-500">
            Create or join a savings circle to view contribution cycles.
          </p>
        </div>
        <Link 
          href="/questions" 
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" /> Create First Circle
        </Link>
      </main>
    );
  }

  // Format and group raw ContributionItem[] items by date
  const grouped = (contributionsList || []).reduce<Record<string, any[]>>((acc, item) => {
    const date = new Date(item.time);
    const dateLabel = isNaN(date.getTime()) 
      ? item.time 
      : date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
    
    if (!acc[dateLabel]) {
      acc[dateLabel] = [];
    }

    acc[dateLabel].push(item);
    return acc;
  }, {});

  const contributionHistory: ContributionGroup[] = Object.entries(grouped).map(([dateLabel, items]) => ({
    dateLabel,
    items,
  }));

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB]">
      
      <div className="w-full bg-white border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Contributions</h1>
            <p className="text-xs font-medium text-[#6B7280] mt-1">
              Track all member payments and group funding activity.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex items-center bg-[#F1F5F9] rounded-xl px-3 py-2 w-full md:w-72 border border-transparent focus-within:bg-white focus-within:border-gray-200 transition-all">
              <Search className="h-4 w-4 text-[#9CA3AF] mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search by name or ref..." 
                className="text-xs font-semibold bg-transparent border-0 outline-none w-full placeholder:text-[#9CA3AF] text-[#111827]" 
              />
            </div>
            <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-sm text-xs font-bold text-[#374151] transition-all shrink-0 h-[38px]">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#4B5563]" /> 
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <main className="p-4 sm:p-6 lg:p-8 max-w-[1100px] w-full mx-auto space-y-8 overflow-hidden">
        
        {contributionHistory.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-sm font-bold text-[#111827]">No contributions recorded</p>
            <p className="text-xs text-[#6B7280]">Real payments will appear here once contribution deadlines hit.</p>
          </div>
        ) : (
          <div className="space-y-8 pt-2">
            {contributionHistory.map((group, idx) => (
              <ContributionTimelineGroup key={idx} group={group} />
            ))}
          </div>
        )}

        <div className="flex justify-center pt-6">
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-[#1E293B] transition-all shadow-sm">
            <ChevronDown className="h-4 w-4 text-[#6B7280]" />
            <span>Load Previous Contributions</span>
          </button>
        </div>

      </main>
    </div>
  );
}