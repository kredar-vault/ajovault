"use client";

import React from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { ContributionGroup } from "@/types";
import { ContributionTimelineGroup } from "@/components/userdashboard/contibutions/ContributionTimeline";

export default function ContributionsDashboard() {
  const contributionHistory: ContributionGroup[] = [
    {
      dateLabel: "Today, Oct 24",
      items: [
        {
          id: "tx-1",
          memberName: "Oluwaseun Adebayo",
          groupName: "Q4 Tech Setup Rotation",
          amount: 50000,
          reference: "9824X",
          status: "Received",
          time: "09:42 AM",
          avatarUrl: "" 
        },
        {
          id: "tx-2",
          memberName: "Chidi Ibekwe",
          memberInitials: "CI",
          groupName: "Family Emergency Fund",
          amount: 25000,
          reference: "7721Y",
          status: "Received",
          time: "08:15 AM"
        }
      ]
    },
    {
      dateLabel: "Yesterday, Oct 23",
      items: [
        {
          id: "tx-3",
          memberName: "Emmanuel Okafor",
          groupName: "Q4 Tech Setup Rotation",
          amount: 50000,
          reference: "1149B",
          status: "Received",
          time: "04:30 PM",
          avatarUrl: ""
        }
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB]">
      
      {/* Top Header Panel Block - Matching image_a0d124.png */}
      <div className="w-full bg-white border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Contributions</h1>
            <p className="text-xs font-medium text-[#6B7280] mt-1">
              Track all member payments and group funding activity.
            </p>
          </div>
          
          {/* Action Filters Alignment Layout */}
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

      {/* Main Bottom Timeline Context Container */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1100px] w-full mx-auto space-y-8 overflow-hidden">
        
        <div className="space-y-8 pt-2">
          {contributionHistory.map((group, idx) => (
            <ContributionTimelineGroup key={idx} group={group} />
          ))}
        </div>

        {/* Dynamic Footer Actions */}
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