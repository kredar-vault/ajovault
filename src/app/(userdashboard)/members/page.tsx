"use client";

import React from "react";
import { SlidersHorizontal, Search, Loader2, Plus } from "lucide-react";
import { useCircle } from "../layout";
import { useGroupMembers, useGroupDetails } from "@/hooks/useGroups";
import { useDashboardData } from "@/hooks/useDashboard";
import { CycleOverviewCard } from "@/components/userdashboard/member/CycleOverview";
import { NextPayoutCard } from "@/components/userdashboard/member/NextPayout";
import { CycleProgressCard } from "@/components/userdashboard/member/CycleProgress";
import { GrowCircleCard } from "@/components/userdashboard/member/GrowCircle";
import { MemberCard } from "@/components/userdashboard/member/MemberCard";
import type { CycleInfo, NextPayout, ProgressStats, Member } from "@/types";
import Link from "next/link";

export default function MembersDashboard() {
  const { currentCircleId, isLoading: isCirclesLoading } = useCircle();

  const { data: members, isLoading: isMembersLoading } = useGroupMembers(currentCircleId || "");
  const { data: groupDetails, isLoading: isDetailsLoading } = useGroupDetails(currentCircleId || "");
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboardData(currentCircleId || "");

  const isLoading = isCirclesLoading || isMembersLoading || isDetailsLoading || isDashboardLoading;

  if (isLoading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="h-8 w-8 text-[#006C49] animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Please wait...</p>
      </main>
    );
  }

  if (!currentCircleId) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto flex flex-col items-center justify-center min-h-[500px] text-center space-y-6">
        <div className="max-w-md space-y-3">
          <h2 className="text-xl font-bold text-gray-900">No active savings circles</h2>
          <p className="text-sm text-gray-500">
            Create or join a savings circle to view and manage rotation members.
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

  const cycleInfo: CycleInfo = {
    name: groupDetails?.name || "Savings Circle",
    status: (groupDetails as any)?.status || "ACTIVE",
    type: groupDetails?.purpose || "Financial Rotation",
    memberCount: members?.length || 0,
    contribution: groupDetails?.contributionAmount || 0,
    totalPool: (members?.length || 0) * (groupDetails?.contributionAmount || 0)
  };

  const nextPayout: NextPayout = {
    recipientName: dashboardData?.payout?.recipientName || "None scheduled",
    daysRemaining: dashboardData?.payout?.daysRemaining || 0,
    dateString: dashboardData?.payout?.daysRemaining ? `in ${dashboardData.payout.daysRemaining} days` : "N/A"
  };

  const progressStats: ProgressStats = {
    currentMonth: dashboardData?.progress?.receivedCount || 0,
    totalMonths: dashboardData?.progress?.totalCount || 0,
    collected: dashboardData?.stats?.totalContribution || 0,
    pending: dashboardData?.stats?.pendingContributions || 0
  };

  const mappedMembers: Member[] = (members || []).map((m) => {
    const name = m.user?.fullName || "Group Member";
    return {
      id: m.id,
      name,
      joinedDate: new Date(m.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      status: m.role === "OWNER" || m.role === "ADMIN" ? "Paid" : "Pending",
      streakMonths: m.role === "OWNER" ? 12 : 1,
      isNextPayout: dashboardData?.payout?.recipientName === name
    };
  });

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
          <CycleOverviewCard cycle={cycleInfo} />
        </div>
        <div className="w-full min-w-0">
          <NextPayoutCard payout={nextPayout} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
        <div className="xl:col-span-2 w-full min-w-0">
          <CycleProgressCard stats={progressStats} />
        </div>
        <div className="w-full min-w-0">
          <GrowCircleCard inviteUrl={groupDetails?.inviteCode ? `ajovault.com/join/${groupDetails.inviteCode}` : "ajovault.com/join"} />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <h2 className="text-base font-bold text-[#111827] tracking-tight">
            All Members ({cycleInfo.memberCount})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {mappedMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

    </main>
  );
}