"use client";

import React, { useState } from "react";
import { Plus, ArrowDown, ArrowUpRight, History, ShieldCheck, Loader2 } from "lucide-react";
import { ActionButton, ActivityRow, VirtualAccountCard } from "@/components/userdashboard/wallet/WalletUI";
import { WalletBalanceSummary } from "@/components/userdashboard/wallet/WalletBalanceSummary";
import { DepositModal, WithdrawModal, SendPayoutModal } from "@/components/userdashboard/wallet/WalletModals";
import { useWalletSummary, useVirtualAccount } from "@/hooks/useWallet";
import { useCircle } from "../layout";
import { useDashboardData } from "@/hooks/useDashboard";
import { useGroupDetails } from "@/hooks/useGroups";
import { useAccountTransactions } from "@/hooks/useAccount";
import type { ActivityItem } from "@/types";

type ModalType = "deposit" | "withdraw" | "payout" | null;

export default function WalletDashboard() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { currentCircleId, isLoading: isCirclesLoading } = useCircle();

  const { data: walletSummary, isLoading: isWalletLoading } = useWalletSummary();
  const { data: virtualAccount, isLoading: isAccountLoading } = useVirtualAccount();
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboardData(currentCircleId || "");
  const { data: groupDetails, isLoading: isDetailsLoading } = useGroupDetails(currentCircleId || "");
  const { data: transactions, isLoading: isTxLoading } = useAccountTransactions();

  const isLoading = isWalletLoading || isAccountLoading || isCirclesLoading || isDashboardLoading || isDetailsLoading || isTxLoading;

  if (isLoading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="h-8 w-8 text-[#006C49] animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Loading wallet ledger...</p>
      </main>
    );
  }

  // Fallback defaults
  const summary = walletSummary || { availableBalance: 0, totalContributed: 0, nextPayout: 0 };
  const bankAccount = {
    bank: virtualAccount?.bank || "—",
    accountNumber: virtualAccount?.accountNumber || "—",
    accountName: virtualAccount?.accountName || "—",
  };

  const activeGroupDetails = groupDetails || { name: "Active Group", contributionAmount: 0 };
  const payout = dashboardData?.payout || { recipientName: "No recipient", amount: 0, daysRemaining: 0 };
  const progress = dashboardData?.progress || { month: "N/A", receivedCount: 0, pendingCount: 0, missedCount: 0, totalCount: 0 };

  const totalPayoutMembers = progress.receivedCount + progress.pendingCount;
  const progressPercent = totalPayoutMembers > 0 ? (progress.receivedCount / totalPayoutMembers) * 100 : 0;

  // Map first 4 transactions to recent activities
  const recentActivities: ActivityItem[] = (transactions || []).slice(0, 4).map((tx) => ({
    id: tx.id,
    title: tx.title || tx.narration || "Transfer",
    timestamp: tx.date || "Just now",
    source: tx.sender || "System",
    amount: tx.amount,
    type: tx.type === "Incoming" ? "credit" : "debit",
    status: tx.status
  }));

  const initials = payout.recipientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] p-6 md:p-8 space-y-6 font-sans">
      {activeModal === "deposit" && <DepositModal virtualAccount={virtualAccount} onClose={() => setActiveModal(null)} />}
      {activeModal === "withdraw" && <WithdrawModal balance={summary.availableBalance} onClose={() => setActiveModal(null)} />}
      {activeModal === "payout" && <SendPayoutModal onClose={() => setActiveModal(null)} />}
      
      {/* Page Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Wallet</h1>
        <p className="text-xs text-[#6B7280] font-medium mt-0.5">Manage your contributions and virtual accounts seamlessly.</p>
      </div>

      {/* Main Structural Asymmetric Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Hand Block Column Side: Houses the Balance, Paid Status, and Quick Actions */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-5">
          
          <WalletBalanceSummary
            summary={summary}
            activeGroupDetails={activeGroupDetails}
            progress={progress}
            payout={payout}
          />

          {/* Quick Action Matrix Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ActionButton label="Deposit" icon={<Plus className="h-4 w-4" />} onClick={() => setActiveModal("deposit")} />
            <ActionButton label="Withdraw" icon={<ArrowDown className="h-4 w-4" />} onClick={() => setActiveModal("withdraw")} />
            <ActionButton label="Send Payout" icon={<ArrowUpRight className="h-4 w-4" />} onClick={() => setActiveModal("payout")} />
            <ActionButton label="History" icon={<History className="h-4 w-4" />} onClick={() => document.querySelector("#recent-activity")?.scrollIntoView({ behavior: "smooth" })} />
          </div>

        </div>

        {/* Right Hand Long Column Side */}
        <div className="lg:col-span-4 h-full">
          <VirtualAccountCard 
            bank={bankAccount.bank} 
            accountNumber={bankAccount.accountNumber} 
            accountName={bankAccount.accountName} 
          />
        </div>

      </div>

      {/* Split Bottom Content Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Recent Activity Window Block */}
        <div id="recent-activity" className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111827]">Recent Activity</h3>
            <button className="text-xs font-bold text-[#006C49] hover:underline">View All</button>
          </div>
          {recentActivities.length === 0 ? (
            <p className="text-xs text-gray-500 font-medium py-4 text-center">No recent wallet activity.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentActivities.map((activity) => (
                <ActivityRow key={activity.id} {...activity} />
              ))}
            </div>
          )}
        </div>

        {/* Right Side Progress Tracking Stack Block */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Target Milestone Component Tracker */}
          {currentCircleId && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-4">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Next Group Payout</span>
              
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                  {initials || "N"}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827] tracking-tight">{payout.recipientName}</h4>
                  <p className="text-[10px] text-[#9CA3AF] font-medium">{activeGroupDetails.name}</p>
                </div>
              </div>

              <div className="flex items-end justify-between pt-2">
                <div>
                  <h3 className="text-xl font-bold text-[#006C49]">₦{payout.amount.toLocaleString()}</h3>
                  <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider">Target Amount</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#111827]">{payout.daysRemaining ? `in ${payout.daysRemaining} days` : "N/A"}</p>
                  <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Date</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006C49] h-full rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider">
                  <span className="text-[#006C49]">{progress.receivedCount} Paid</span>
                  <span className="text-[#9CA3AF]">{progress.pendingCount} Remaining</span>
                </div>
              </div>
            </div>
          )}

          {/* Infrastructure Security Seal Component */}
          <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex items-start gap-3">
            <div className="h-7 w-7 rounded-full bg-emerald-50 text-[#006C49] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#111827] tracking-tight">Bank-grade Security</h4>
              <p className="text-[10px] leading-relaxed text-[#6B7280] font-medium">Your funds are protected and powered by Kredar.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}