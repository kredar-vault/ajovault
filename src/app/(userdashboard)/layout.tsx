"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Users, CalendarDays, 
  Settings, Plus, ReceiptCent, FolderPlus,
  Menu, X
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentCircleId, setCurrentCircleId] = useState("family-savings");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const GreenSidebarContent = () => (
    <>
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
        <button className="w-full py-2 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 border border-white/5">
          <Plus className="h-3.5 w-3.5" /> Action
        </button>
        <div className="pt-4 border-t border-white/10">
          <button className="w-full py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all">
            <FolderPlus className="h-3.5 w-3.5 text-[#A3E635]" /> New Circle
          </button>
        </div>
      </div>
    </>
  );

  const WhiteNavigationContent = () => (
    <nav className="space-y-0.5">
      {globalNavItems.map((item) => {
        const isActive = activeTab === item.name;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => {
              setActiveTab(item.name);
              setIsMobileMenuOpen(false);
            }}
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
  );

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans antialiased selection:bg-[#006C49]/10 max-w-full overflow-x-hidden">
      
      {/* 1. Green Sidebar: ONLY visible on large screens (xl) */}
      <aside className="hidden xl:flex w-[210px] bg-[#004D34] text-white flex-col justify-between fixed inset-y-0 left-0 z-20 px-4 py-6 rounded-tr-[24px]">
        <GreenSidebarContent />
      </aside>

      {/* 2. White Sidebar: Visible on xl (pushed right) and visible on lg (snapped to left) */}
      <aside className="hidden lg:flex w-[220px] border-r border-gray-100 bg-white flex-col fixed inset-y-0 left-0 xl:left-[210px] z-10 px-3 py-6 pt-6 xl:pt-14">
        <div className="hidden xl:block h-6 mb-4" /> {/* Spacer for design alignment on xl desktop */}
        <WhiteNavigationContent />
      </aside>

      {/* 3. Top Navbar for screens smaller than lg */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#004D34] text-white flex items-center justify-between px-4 z-30 shadow-sm">
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight">Ajo Vault</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1.5 rounded-lg bg-white/10">
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* 4. Overlay & Combined Mobile Side Menu */}
      {isMobileMenuOpen && <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setIsMobileMenuOpen(false)} />}
      <div className={`lg:hidden fixed inset-y-0 left-0 flex z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="w-[180px] bg-[#004D34] text-white flex flex-col justify-between p-4 pt-16">
          <GreenSidebarContent />
        </div>
        <div className="w-[160px] bg-white border-r border-gray-100 p-3 pt-16 shadow-xl">
          <WhiteNavigationContent />
        </div>
      </div>

      {/* 5. Main Screen Area: dynamic padding based on sidebar visibility states */}
      <div className="flex-1 w-full min-w-0 pt-14 lg:pt-0 pl-0 lg:pl-[220px] xl:pl-[430px] transition-all duration-200">
        {children}
      </div>

    </div>
  );
}