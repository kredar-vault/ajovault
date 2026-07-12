"use client";

import React, { useState } from "react";
import { Copy, Check, Building2 } from "lucide-react";

interface CircleDvaCardProps {
  circleName?: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
}

export function CircleDvaCard({ circleName, accountNumber, accountName, bankName }: CircleDvaCardProps) {
  const [copied, setCopied] = useState(false);

  if (!accountNumber) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-[#006C49] to-[#004d34] rounded-2xl p-5 text-white shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-emerald-300" />
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Circle Deposit Account</span>
          </div>
          <p className="text-xs font-bold text-white/80 mt-1">{circleName}</p>
        </div>
        <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider">Powered by Kredar</span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider block mb-1">Bank</span>
          <p className="text-xs font-bold">{bankName || "—"}</p>
        </div>

        <div>
          <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider block mb-1">Account Number</span>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold tracking-widest">{accountNumber}</p>
            <button
              onClick={handleCopy}
              className="text-white/60 hover:text-white transition-colors"
              title="Copy account number"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div>
          <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider block mb-1">Account Name</span>
          <p className="text-xs font-bold uppercase">{accountName || "—"}</p>
        </div>
      </div>

      <p className="text-[10px] text-white/50 font-medium mt-4 border-t border-white/10 pt-3">
        Send your contributions to this account. All deposits are automatically tracked.
      </p>
    </div>
  );
}
