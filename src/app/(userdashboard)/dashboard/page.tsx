"use client";

import { ActivityTable } from "@/components/userdashboard/dashboard/ActivityTable";
import { mockActivity, mockPayout, mockProgress, mockStats } from "@/components/userdashboard/dashboard/mockData";
import { PayoutCard } from "@/components/userdashboard/dashboard/PayoutCard";
import { ProgressCard } from "@/components/userdashboard/dashboard/ProgressCard";
import { StatsGrid } from "@/components/userdashboard/dashboard/StatsGrid";
import { Plus, SlidersHorizontal } from "lucide-react";


export default function DashboardPage() {
  return (
    <main className="p-8 max-w-[1200px] w-full mx-auto space-y-6">
      {/* HEADER SECTION ROW */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Dashboard</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">Overview of your contributions.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-xs font-semibold text-[#374151] transition-all shadow-sm">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#6B7280]" /> Filter
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-xs font-semibold transition-all shadow-sm">
            <Plus className="h-3.5 w-3.5" /> Quick Action
          </button>
        </div>
      </div>

      {/* METRIC OVERVIEW GRID */}
      <StatsGrid stats={mockStats} />

      {/* VISUAL REPORT ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <ProgressCard progress={mockProgress} />
        </div>
        <div className="lg:col-span-7">
          <PayoutCard payout={mockPayout} />
        </div>
      </div>

      {/* CONTRIBUTION HISTORY BLOCK */}
      <ActivityTable data={mockActivity} />
    </main>
  );
}