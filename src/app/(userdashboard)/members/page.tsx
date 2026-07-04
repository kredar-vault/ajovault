"use client";

import React from "react";
import { SlidersHorizontal, Search } from "lucide-react";

import { CycleInfo, NextPayout, ProgressStats, Member } from "@/types";
import { CycleOverviewCard } from "@/components/userdashboard/member/CycleOverview";
import { NextPayoutCard } from "@/components/userdashboard/member/NextPayout";
import { CycleProgressCard } from "@/components/userdashboard/member/CycleProgress";
import { GrowCircleCard } from "@/components/userdashboard/member/GrowCircle";
import { MemberCard } from "@/components/userdashboard/member/MemberCard";

export default function MembersDashboard() {
  const sampleCycle: CycleInfo = {
    name: "Design Leaders Circle",
    status: "ACTIVE",
    type: "Monthly Rotation",
    memberCount: 12,
    contribution: 500,
    totalPool: 6000
  };

  const samplePayout: NextPayout = {
    recipientName: "Sarah Jenkins",
    daysRemaining: 12,
    dateString: "Nov 1st"
  };

  const sampleProgress: ProgressStats = {
    currentMonth: 4,
    totalMonths: 12,
    collected: 2000,
    pending: 4000
  };

  const sampleMembers: Member[] = [
    { id: "1", name: "David Chen", joinedDate: "Jan 2024", status: "Paid", streakMonths: 4 },
    { id: "2", name: "Elena Rodriguez", joinedDate: "Mar 2024", status: "Pending" },
    { id: "3", name: "Sarah Jenkins", joinedDate: "Jan 2024", status: "Paid", isNextPayout: true, streakMonths: 12 },
    { id: "4", name: "Marcus Johnson", joinedDate: "Jun 2024", status: "Missed" }
  ];

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-full xl:max-w-[1200px] w-full mx-auto space-y-6 overflow-hidden">
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Members</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">Manage rotation members and streaks.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 flex-1 lg:w-60">
            <Search className="h-3.5 w-3.5 text-[#9CA3AF] mr-1.5 shrink-0" />
            <input type="text" placeholder="Search members" className="text-xs font-medium bg-transparent border-0 outline-none w-full placeholder:text-[#9CA3AF]" />
          </div>
          <button className="flex items-center justify-center p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-sm transition-all shrink-0">
            <SlidersHorizontal className="h-4 w-4 text-[#6B7280]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
        <div className="xl:col-span-2 w-full min-w-0">
          <CycleOverviewCard cycle={sampleCycle} />
        </div>
        <div className="w-full min-w-0">
          <NextPayoutCard payout={samplePayout} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
        <div className="xl:col-span-2 w-full min-w-0">
          <CycleProgressCard stats={sampleProgress} />
        </div>
        <div className="w-full min-w-0">
          <GrowCircleCard inviteUrl="ajovault.com/join/dlc-2024" />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <h2 className="text-base font-bold text-[#111827] tracking-tight">
            All Members ({sampleCycle.memberCount})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {sampleMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

    </main>
  );
}