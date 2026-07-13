"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { useMyGroups } from "@/hooks/useGroups";
import { NotificationBell } from "@/components/userdashboard/NotificationBell";
import { Menu, X } from "lucide-react";
import { useSession } from "@/lib/auth";
import { GreenSidebar } from "@/components/userdashboard/Greensidebar";
import { WhiteNavigation } from "@/components/userdashboard/Sidebar";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

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
  const { user } = useSession();
  const [currentCircleId, setCurrentCircleId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const userCircles = myGroups?.map((circle) => ({
    id: circle.id,
    name: circle.name,
    type: circle.purpose || "Savings Circle",
  })) || [];

  useEffect(() => {
    if (userCircles.length > 0 && !currentCircleId) {
      setCurrentCircleId(userCircles[0].id);
    }
  }, [myGroups, currentCircleId, userCircles]);

  const displayName = user?.fullName?.trim() || "Guest";

  return (
    <CircleContext.Provider value={{ currentCircleId, setCurrentCircleId, userCircles, isLoading }}>
      <div className="flex min-h-screen bg-[#F9FAF7] antialiased selection:bg-[#006C49]/10 max-w-full overflow-x-hidden">

        <div className="hidden lg:flex fixed inset-y-0 left-0 z-30">
          <aside className="w-[150px] bg-[#004D34] text-white flex flex-col justify-between px-3 py-6 rounded-tr-[24px]">
            <GreenSidebar 
              isLoading={isLoading} 
              userCircles={userCircles} 
              currentCircleId={currentCircleId} 
              setCurrentCircleId={setCurrentCircleId} 
            />
          </aside>
          <aside className="w-[200px] bg-white flex flex-col px-3 py-6">
            <WhiteNavigation pathname={pathname} setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </aside>
        </div>

        <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#004D34] text-white flex items-center justify-between px-4 z-40">
          <span className="text-sm font-bold tracking-tight">Ajo Vault</span>
          <div className="flex items-center gap-2.5">
            <NotificationBell />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
        )}
        <div className={`lg:hidden fixed inset-y-0 left-0 flex z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="w-[150px] bg-[#004D34] text-white flex flex-col justify-between p-3 pt-16">
            <GreenSidebar 
              isLoading={isLoading} 
              userCircles={userCircles} 
              currentCircleId={currentCircleId} 
              setCurrentCircleId={setCurrentCircleId} 
            />
          </div>
          <div className="w-[160px] bg-white p-3 pt-16 shadow-xl">
            <WhiteNavigation pathname={pathname} setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
        </div>

        <div className="flex-1 w-full min-w-0 pt-14 lg:pt-0 pl-0 lg:pl-[350px] transition-all duration-200">

          <header className="hidden lg:flex items-center justify-between px-6 py-3 bg-white sticky top-0 z-20">
            <span className="text-xs font-semibold p-2 rounded-lg bg-[#111827] text-white  truncate pr-4 capitalize">
              {userCircles.find((c) => c.id === currentCircleId)?.name || "Dashboard"}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <NotificationBell />
              <div className="flex items-center gap-2 pl-3">
                <div className="h-7 w-7 lowercase rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xs select-none">
                  {getInitials(displayName)}
                </div>
                <span className="text-xs font-semibold text-[#1E293B] hidden sm:inline">
                  {displayName}
                </span>
              </div>
            </div>
          </header>

          <main className="max-w-6xl mx-auto p-6">
            {children}
          </main>
        </div>

      </div>
    </CircleContext.Provider>
  );
}