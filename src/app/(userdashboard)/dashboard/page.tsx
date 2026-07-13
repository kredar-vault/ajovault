"use client";

import { ActivityTable } from "@/components/userdashboard/dashboard/ActivityTable";
import { PayoutCard } from "@/components/userdashboard/dashboard/PayoutCard";
import { ProgressCard } from "@/components/userdashboard/dashboard/ProgressCard";
import { StatsGrid } from "@/components/userdashboard/dashboard/StatsGrid";
import { useDashboardData } from "@/hooks/useDashboard";
import { CircleDvaCard } from "@/components/userdashboard/dashboard/CircleDvaCard";
import { Plus, SlidersHorizontal, Loader2 } from "lucide-react";
import { useCircle } from "../layout";
import { useGroupDetails } from "@/hooks/useGroups";
import Link from "next/link";
import { Button } from "@/components/shared/Button";

export default function DashboardPage() {
  const { currentCircleId, isLoading: isCirclesLoading } = useCircle();
  const { data: dashboardData, isLoading: isDashboardLoading, error } = useDashboardData(currentCircleId || "");
  const { data: groupDetails } = useGroupDetails(currentCircleId || "");

  if (isCirclesLoading || (currentCircleId && isDashboardLoading)) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="h-8 w-8 text-[#006C49] animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Please wait...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto">
        <div className="p-4 bg-red-50 text-xs font-semibold text-red-700 rounded-xl">
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
        <Button>
          <Link href="/questions" className="flex items-center gap-1.5 text-xs font-bold">
            <Plus className="h-4 w-4" /> Create first circle
          </Link>
        </Button>
      </main>
    );
  }

  const stats = dashboardData?.stats || { totalContribution: 0, totalMembers: 0, pendingContributions: 0, upcomingPayouts: 0 };
  const progress = dashboardData?.progress || { month: "N/A", receivedCount: 0, pendingCount: 0, missedCount: 0, totalCount: 0 };
  const payout = dashboardData?.payout || { recipientName: "None", amount: 0, daysRemaining: 0 };
  const activity = dashboardData?.activity || [];

  return (
    <main className="p-4 sm:p-6 lg:p-8 max-w-full xl:max-w-[1200px] w-full mx-auto space-y-6 overflow-hidden">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Dashboard</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">Overview of your contributions.</p>
        </div>

        <div className="flex items-center w-full sm:w-auto justify-end">
          <Button className="bg-[#006C49] hover:bg-[#005439] text-white">
            <Link href="/questions" className="flex items-center gap-1 text-xs font-semibold">
              <Plus className="h-3.5 w-3.5" /> Quick action
            </Link>
          </Button>
        </div>
      </div>

      <StatsGrid stats={stats} loading={isDashboardLoading} />

      <CircleDvaCard
        circleName={groupDetails?.name}
        accountNumber={groupDetails?.dvaAccountNumber}
        accountName={groupDetails?.dvaAccountName}
        bankName={groupDetails?.dvaBankName}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-5 w-full min-w-0">
          <ProgressCard progress={progress} loading={isDashboardLoading} />
        </div>
        <div className="lg:col-span-7 w-full min-w-0">
          <PayoutCard payout={payout} loading={isDashboardLoading} />
        </div>
      </div>

      <div className="w-full min-w-0 overflow-hidden">
        <ActivityTable data={activity} loading={isDashboardLoading} />
      </div>
    </main>
  );
}