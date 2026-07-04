"use client";

import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function Step5Loading() {
  return (
    <div className="w-full min-h-screen bg-brand-secondary">
      <header className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/icon.svg" alt="Ajo Vault" width={22} height={22} className="text-[#006C49]" />
          <span className="text-base font-bold tracking-tight text-main">Ajo Vault</span>
        </div>
      </header>

      <div className="flex items-center justify-center pt-24 px-4">
        <div className="w-full max-w-[520px] bg-white rounded-[10px] border border-gray-100 p-12 text-center space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.005)]">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-main">Creating Your Group</h1>
            <p className="text-xs text-muted">Please hold on while we set everything up.</p>
          </div>

          <div className="flex justify-center pt-4">
            <div className="h-12 w-12 rounded-full bg-[#ECFDF5] flex items-center justify-center relative animate-pulse">
              <Loader2 className="h-5 w-5 text-[#006C49] animate-spin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}