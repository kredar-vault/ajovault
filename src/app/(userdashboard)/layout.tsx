"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth";
import { useMyGroups } from "@/hooks/useGroups";
import { NotificationBell } from "@/components/userdashboard/NotificationBell";
import {
  LayoutDashboard, Users, CalendarDays,
  Settings, Plus, ReceiptCent, FolderPlus,
  Menu, X,
  WalletCards, Loader2, LogOut
} from "lucide-react";

interface CircleContextType {
  currentCircleId: string | null;
  setCurrentCircleId: (id: string | null) => void;
  userCircles: Array<{ id: string; name: string; type: string }>;
  isLoading: boolean;
}

const CircleContext = createContext<CircleContextType | undefined>(undefined);

export function useCircle() {
  const context = useContext(CircleContext);
  if (!context) {
    throw new Error("useCircle must be used within a CircleProvider");
  }
  return context;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: myGroups, isLoading } = useMyGroups();
  const { logout, isLoggingOut } = useSession();
  const [currentCircleId, setCurrentCircleId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);

  const globalNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/members", icon: Users },
    { name: "Contributions", href: "/contributions", icon: ReceiptCent },
    { name: "Transactions", href: "/transactions", icon: ReceiptCent },
    { name: "Payout Schedule", href: "/payouts", icon: CalendarDays },
    { name: "Wallet & Account", href: "/wallet", icon: WalletCards },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const userCircles = myGroups?.map((circle) => ({
    id: circle.id,
    name: circle.name,
    type: circle.purpose || "Savings Circle",
  })) || [];

  // Set the first circle as active by default once loaded
  useEffect(() => {
    if (userCircles.length > 0 && !currentCircleId) {
      setCurrentCircleId(userCircles[0].id);
    }
  }, [myGroups, currentCircleId, userCircles]);

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
          {isLoading ? (
            <p className="text-[11px] text-white/40 px-3 py-2 font-medium">Please wait...</p>
          ) : userCircles.length === 0 ? (
            <p className="text-[11px] text-white/40 px-3 py-2 font-medium">No savings circles</p>
          ) : (
            userCircles.map((circle) => {
              const isSelected = currentCircleId === circle.id;
              return (
                <button
                  key={circle.id}
                  onClick={() => setCurrentCircleId(circle.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all block ${isSelected
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
            })
          )}
        </div>
      </div>
      <div className="space-y-4">
        <Link href="/questions" className="w-full py-2 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 border border-white/5">
          <Plus className="h-3.5 w-3.5" /> Action
        </Link>
        <div className="pt-4 border-t border-white/10 space-y-2">
          <Link href="/questions" className="w-full py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all">
            <FolderPlus className="h-3.5 w-3.5 text-[#A3E635]" /> New Circle
          </Link>
          <button
            onClick={() => setIsConfirmingLogout(true)}
            className="w-full py-2 bg-red-950/30 hover:bg-red-900/40 text-red-200 hover:text-white border border-red-500/20 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5 text-red-400" /> Logout
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
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${isActive
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
    <CircleContext.Provider value={{ currentCircleId, setCurrentCircleId, userCircles, isLoading }}>
      {isConfirmingLogout && (
        <div className="fixed inset-0 bg-[#001E2C]/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-xl border border-gray-100 p-6 shadow-2xl space-y-5 text-left animate-scale-up">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#1E293B] tracking-tight">Confirm Sign Out</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Are you sure you want to end your current session? You will need to enter your email and password to access your vaults again.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsConfirmingLogout(false)}
                className="flex-1 py-2.5 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-[#374151] rounded-lg text-xs font-semibold transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsConfirmingLogout(false);
                  logout();
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer text-center"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoggingOut && (
        <div className="fixed inset-0 bg-[#001E2C]/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white">
          <Loader2 className="h-10 w-10 text-red-500 animate-spin" />
          <p className="mt-4 text-xs font-semibold text-gray-400 uppercase tracking-widest animate-pulse">Logging out, please wait...</p>
        </div>
      )}

      <div className="flex min-h-screen bg-[#FAFAFA] font-sans antialiased selection:bg-[#006C49]/10 max-w-full overflow-x-hidden">

        {/* 1. Green Sidebar: Visible on desktop screens (lg) */}
        <aside className="hidden lg:flex w-[210px] bg-[#004D34] text-white flex-col justify-between fixed inset-y-0 left-0 z-20 px-4 py-6 rounded-tr-[24px]">
          <GreenSidebarContent />
        </aside>

        {/* 2. White Sidebar: Visible on lg (pushed right) */}
        <aside className="hidden lg:flex w-[220px] border-r border-gray-100 bg-white flex-col fixed inset-y-0 left-[210px] z-10 px-3 py-6 pt-14">
          <div className="hidden lg:block h-6 mb-4" /> {/* Spacer for design alignment on desktop */}
          <WhiteNavigationContent />
        </aside>

        {/* 3. Top Navbar for screens smaller than lg */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#004D34] text-white flex items-center justify-between px-4 z-30 shadow-sm">
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">Ajo Vault</span>
          </div>
          <div className="flex items-center gap-2.5">
            <NotificationBell />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1.5 rounded-lg bg-white/10">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
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
        <div className="flex-1 w-full min-w-0 pt-14 lg:pt-0 pl-0 lg:pl-[430px] transition-all duration-200">

          {/* Desktop Top Header Bar */}
          <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Circle:</span>
              <span className="text-xs font-bold text-[#006C49] bg-emerald-50 px-2.5 py-1 rounded-full">
                {userCircles.find((c) => c.id === currentCircleId)?.name || "No active circle"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <NotificationBell />
            </div>
          </header>

          {children}
        </div>

      </div>
    </CircleContext.Provider>
  );
}