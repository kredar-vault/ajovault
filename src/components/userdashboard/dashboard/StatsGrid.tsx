import { DashboardStats } from "@/types";

export function StatsGrid({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: "Total contribution", value: `₦${stats.totalContribution.toLocaleString()}` },
    { label: "Total members", value: stats.totalMembers },
    { label: "Pending contributions", value: stats.pendingContributions },
    { label: "Upcoming payouts", value: stats.upcomingPayouts },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-2">
          <span className="text-[11px] font-medium text-[#6B7280] block">{card.label}</span>
          <p className="text-2xl font-bold text-[#111827] tracking-tight truncate">{card.value}</p>
        </div>
      ))}
    </div>
  );
}