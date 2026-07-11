"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Wallet, Calendar, Users, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/Button";

interface Step5ReviewProps {
  groupName: string;
  contributionAmount: number;
  frequency: string;
  expectedMembers: number;
  onConfirm: () => void;
  onBack: () => void;
}

export function Step5Review({
  groupName,
  contributionAmount,
  frequency,
  expectedMembers,
  onConfirm,
  onBack,
}: Step5ReviewProps) {
  const totalPayout = contributionAmount * expectedMembers;

  return (
    <div className="w-full min-h-screen bg-brand-secondary">
      <header className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/icon.svg" alt="Ajo Vault" width={22} height={22} className="text-[#006C49]" />
          <span className="text-base font-bold tracking-tight text-main">Ajo Vault</span>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          Back to Dashboard
        </Link>
      </header>

      <div className="max-w-[720px] mx-auto px-4 py-12 space-y-8 flex flex-col items-center">
        {/* Header Text Blocks */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-main">Everything looks good!</h1>
          <p className="text-sm text-muted">Review your saving circle details before finalizing.</p>
        </div>

        {/* Custom Progress Bar Segment */}
        <div className="w-full max-w-[420px] space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-muted uppercase tracking-wider">
            <span>Step 4 of 5</span>
            <span>Review</span>
          </div>
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-[#10B981] rounded-full" />
          </div>
        </div>

        {/* Information Grid Container */}
        <main className="w-full bg-white rounded-[10px] border border-gray-100 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-6">
          {/* Header Identity Row */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-main">{groupName || "Weekend Warriors Fund"}</h2>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide text-[#006C49] bg-[#ECFDF5]">
                Pending Creation
              </span>
            </div>
          </div>

          {/* Core Settings Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Wallet className="h-3 w-3" /> Contribution
              </span>
              <p className="text-xl font-bold text-main">₦{contributionAmount.toLocaleString()}</p>
              <p className="text-[11px] text-muted">per member / cycle</p>
            </div>

            <div className="border border-gray-100 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-3 w-3" /> Frequency
              </span>
              <p className="text-xl font-bold text-main capitalize">{frequency}</p>
              <p className="text-[11px] text-muted">Next: 1st of next month</p>
            </div>

            <div className="border border-gray-100 rounded-xl p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="h-3 w-3" /> Members
                </span>
                <span className="text-[10px] font-bold text-[#006C49]">{expectedMembers} Total</span>
              </div>
              <div className="flex items-center gap-1 pt-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-6 w-6 rounded-full bg-gray-200 border-2 border-white" />
                  <div className="inline-block h-6 w-6 rounded-full bg-gray-300 border-2 border-white" />
                  <div className="inline-block h-6 w-6 rounded-full bg-gray-400 border-2 border-white" />
                </div>
                <span className="text-[11px] text-muted font-medium ml-1">+{expectedMembers - 3 > 0 ? expectedMembers - 3 : 0}</span>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">👤 First Recipient</span>
              <p className="text-sm font-bold text-main">Admin (You)</p>
              <p className="text-[11px] text-muted font-semibold text-brand">Total Payout: ₦{totalPayout.toLocaleString()}</p>
            </div>
          </div>

          {/* Secure Callout Banner */}
          <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Your group's funds are secured. Members will receive an invitation link to securely connect their payment methods before the first cycle begins.
            </p>
          </div>
        </main>

        {/* Global Control Button Segment */}
        <div className="w-full flex items-center justify-between pt-2">
          <Button variant="secondary" onClick={onBack} className="px-6 py-2">
            &larr; Back
          </Button>
          <Button type="button" onClick={onConfirm} className="px-6 py-2 flex items-center gap-2">
            Create My Savings Circle <CheckCircle2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}