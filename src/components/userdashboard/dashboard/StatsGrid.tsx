import React from "react";
import { DashboardStats } from "@/types";

interface StatsGridProps {
  stats?: DashboardStats;
  loading?: boolean;
}

export function StatsGrid({ stats, loading = false }: StatsGridProps) {
  const circleBalance = stats?.circleBalance ?? 0;
  const cards = [
    { label: "Total contribution", value: stats ? `₦${stats.totalContribution.toLocaleString()}` : "₦0", highlight: false },
    {
      label: "Circle pool balance",
      value: stats ? `₦${circleBalance.toLocaleString()}` : "₦0",
      highlight: circleBalance < 0,
    },
    { label: "Total members", value: stats?.totalMembers ?? 0, highlight: false },
    { label: "Pending contributions", value: stats?.pendingContributions ?? 0, highlight: false },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className={`rounded-xl p-5 space-y-2 ${card.highlight ? 'bg-red-50 border border-red-100' : 'bg-white'}`}>
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
              <p className={`text-2xl font-bold truncate ${card.highlight ? 'text-red-600' : 'text-[#111827]'}`}>
                {card.value}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}