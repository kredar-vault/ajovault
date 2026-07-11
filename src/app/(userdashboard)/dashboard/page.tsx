"use client";

import { ActivityTable } from "@/components/userdashboard/dashboard/ActivityTable";
import { PayoutCard } from "@/components/userdashboard/dashboard/PayoutCard";
import { ProgressCard } from "@/components/userdashboard/dashboard/ProgressCard";
import { StatsGrid } from "@/components/userdashboard/dashboard/StatsGrid";
import { Plus, SlidersHorizontal, Loader2 } from "lucide-react";
import { useCircle } from "../layout";
import { useDashboardData } from "@/hooks/useDashboard";
import Link from "next/link";

export default function DashboardPage() {
  const { currentCircleId, isLoading: isCirclesLoading } = useCircle();
  const { data: dashboardData, isLoading: isDashboardLoading, error } = useDashboardData(currentCircleId || "");

  if (isCirclesLoading || (currentCircleId && isDashboardLoading)) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="h-8 w-8 text-[#006C49] animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Loading circle analytics...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto">
        <div className="p-4 bg-red-50 border border-red-200 text-xs font-semibold text-red-700 rounded-xl">
          Failed to load analytics: {error.message || "An unexpected error occurred."}
        </div>
      </main>
    );
  }

  if (!currentCircleId) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto flex flex-col items-center justify-center min-h-[500px] text-center space-y-6">
        <div className="max-w-md space-y-3">
          <h2 className="text-xl font-bold text-gray-900">No active savings circles</h2>
          <p className="text-sm text-gray-500">
            Create a new savings circle or accept an invitation to join one to start tracking your collective rotations.
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

  const stats = dashboardData?.stats || { totalContribution: 0, totalMembers: 0, pendingContributions: 0, upcomingPayouts: 0 };
  const progress = dashboardData?.progress || { month: "N/A", receivedCount: 0, pendingCount: 0, missedCount: 0, totalCount: 0 };
  const payout = dashboardData?.payout || { recipientName: "None", amount: 0, daysRemaining: 0 };
  const activity = dashboardData?.activity || [];

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-full xl:max-w-[1200px] w-full mx-auto space-y-6 overflow-hidden">
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Dashboard</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">Overview of your contributions.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full lg:w-auto">
          <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-semibold text-[#374151] transition-all shadow-sm">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#6B7280]" /> Filter
          </button>
          <Link href="/questions" className="flex items-center justify-center gap-1 px-3 py-2 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-xs font-semibold transition-all shadow-sm">
            <Plus className="h-3.5 w-3.5" /> Quick Action
          </Link>
        </div>
      </div>

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-5 w-full min-w-0">
          <ProgressCard progress={progress} />
        </div>
        <div className="lg:col-span-7 w-full min-w-0">
          <PayoutCard payout={payout} />
        </div>
      </div>

      <div className="w-full min-w-0 overflow-hidden">
        <ActivityTable data={activity} />
      </div>
    </main>
  );
}