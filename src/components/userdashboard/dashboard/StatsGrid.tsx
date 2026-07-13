import React from "react";
import { DashboardStats } from "@/types";

interface StatsGridProps {
  stats?: DashboardStats;
  loading?: boolean;
}

export function StatsGrid({ stats, loading = false }: StatsGridProps) {
  const cards = [
    { label: "Total contribution", value: stats ? `₦${stats.totalContribution.toLocaleString()}` : "₦0" },
    { label: "Total members", value: stats?.totalMembers ?? 0 },
    { label: "Pending contributions", value: stats?.pendingContributions ?? 0 },
    { label: "Upcoming payouts", value: stats?.upcomingPayouts ?? 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white rounded-xl p-5 space-y-2">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-3.5 bg-gray-100 rounded w-24" />
              <div className="h-7 bg-gray-100 rounded w-2/3" />
            </div>
          ) : (
            <>
              <span className="text-xs font-medium text-[#6B7280] block">
                {card.label}
              </span>
              <p className="text-2xl font-bold text-[#111827] truncate">
                {card.value}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}