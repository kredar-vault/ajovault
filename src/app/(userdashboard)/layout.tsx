"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Users, Wallet, CalendarDays, 
  Settings, Plus, ReceiptCent, FolderPlus 
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentCircleId, setCurrentCircleId] = useState("family-savings");
  const [activeTab, setActiveTab] = useState("Dashboard");

  const globalNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/members", icon: Users },
    { name: "Contributions", href: "/contributions", icon: ReceiptCent },
    { name: "Transactions", href: "/transactions", icon: ReceiptCent },
    { name: "Payout Schedule", href: "/payouts", icon: CalendarDays },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const userCircles = [
    { id: "family-savings", name: "Family Savings", type: "Personal" },
    { id: "office-ajo", name: "Office Ajo", type: "Workplace" },
    { id: "rent-circle", name: "Rent Circle", type: "Targeted" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans antialiased selection:bg-[#006C49]/10">
      
      <aside className="w-[210px] bg-[#004D34] text-white flex flex-col justify-between fixed inset-y-0 left-0 z-20 px-4 py-6 rounded-tr-[24px]">
        <div className="space-y-6">
          <div className="px-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">Ajo Vault</span>
            </div>
            <p className="text-[10px] text-white/50 font-medium mt-0.5">Financial Rotations</p>
          </div>

          <div className="space-y-1">
            {userCircles.map((circle) => {
              const isSelected = currentCircleId === circle.id;
              return (
                <button
                  key={circle.id}
                  onClick={() => setCurrentCircleId(circle.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all block ${
                    isSelected
                      ? "bg-white/15 text-white font-bold shadow-sm border-l-2 border-[#A3E635]"
                      : "text-white/70 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  <span className="block text-xs truncate">{circle.name}</span>
                  <span className={`block text-[9px] mt-0.5 uppercase tracking-tight ${isSelected ? "text-[#A3E635]" : "text-white/40"}`}>
                    {circle.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="px-0">
            <button className="w-full py-2 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 border border-white/5">
              <Plus className="h-3.5 w-3.5" /> Action
            </button>
          </div>
          <div className="pt-4 border-t border-white/10">
            <button className="w-full py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all">
              <FolderPlus className="h-3.5 w-3.5 text-[#A3E635]" /> New Circle
            </button>
          </div>
        </div>
      </aside>

      <aside className="w-[220px] border-r border-gray-100 bg-white flex flex-col justify-between fixed inset-y-0 left-[210px] z-10 px-3 py-6 pt-14">
        <div className="space-y-7">
          {/* <div className="px-2">
            <span className="text-[10px] font-bold tracking-wider text-[#6B7280] uppercase block">Navigation</span>
          </div> */}

          <nav className="space-y-0.5 mt-8">
            {globalNavItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#EEF2F6] text-[#1E293B]"
                      : "text-[#6B7280] hover:text-[#1E293B] hover:bg-[#F9FAFB]"
                  }`}
                >
                  <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#475569]" : "text-[#9CA3AF]"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex-1 pl-[430px]">
        {children}
      </div>

    </div>
  );
}