import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FolderPlus } from "lucide-react";
import { LogoutButton } from "@/components/userdashboard/LogoutButton";

interface GreenSidebarProps {
  isLoading: boolean;
  userCircles: Array<{ id: string; name: string; type: string }>;
  currentCircleId: string | null;
  setCurrentCircleId: (id: string | null) => void;
}

export function GreenSidebar({
  isLoading,
  userCircles,
  currentCircleId,
  setCurrentCircleId,
}: GreenSidebarProps) {
  return (
    <>
      <div className="space-y-6">
        <div className="px-1">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-2xl p-1">
              <Image src="/icon.svg" alt="logo" width={12} height={12} />
            </div>
            <span className="text-[12px] font-bold text-white tracking-tight">Ajo Vault</span>
          </div>
          <p className="text-[10px] text-white/40 font-medium mt-0.5">Financial Rotations</p>
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
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all block ${
                    isSelected
                      ? "bg-white/15 text-white font-bold shadow-sm"
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
          <Link href="/questions" className="w-full mt-1 py-2 bg-white/70 hover:bg-white/90 text-[#006C49] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all">
            <FolderPlus className="h-3.5 w-3.5 text-[#006C49]" /> New Circle
          </Link>
        </div>
      </div>
      <div className="pt-2">
        <LogoutButton variant="sidebar" />
      </div>
    </>
  );
}