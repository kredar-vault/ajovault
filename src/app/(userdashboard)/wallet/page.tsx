import React from "react";
import { Plus, ArrowDown, ArrowUpRight, History, CheckCircle2, ShieldCheck } from "lucide-react";
import { ActionButton, ActivityRow, VirtualAccountCard } from "@/components/userdashboard/wallet/WalletUI";
import { walletSummaryMock, paidStatusMock, accountDetailsMock, recentActivitiesMock, nextPayoutMock } from "@/components/userdashboard/wallet/mockData";

export default function WalletDashboard() {
  const totalPayoutMembers = nextPayoutMock.paidMembers + nextPayoutMock.remainingMembers;
  const progressPercent = (nextPayoutMock.paidMembers / totalPayoutMembers) * 100;

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] p-6 md:p-8 space-y-6 font-sans">
      {/* Page Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Wallet</h1>
        <p className="text-xs text-[#6B7280] font-medium mt-0.5">Manage your contributions and virtual accounts seamlessly.</p>
      </div>

      {/* Main Structural Asymmetric Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Hand Block Column Side: Houses the Balance, Paid Status, and Quick Actions */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-5">
          
          {/* Top Row: Asymmetric horizontal distribution */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            {/* Available Balance Card (Spans more width) */}
            <div className="sm:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.01)] min-h-[180px]">
              <div>
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Available Balance</span>
                <h2 className="text-3xl font-bold text-[#111827] mt-2 tracking-tight">₦{walletSummaryMock.availableBalance.toLocaleString()}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-4">
                <div>
                  <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Total Contributed</span>
                  <p className="text-sm font-bold text-[#111827] mt-0.5">₦{walletSummaryMock.totalContributed.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Next Payout</span>
                  <p className="text-sm font-bold text-[#006C49] mt-0.5">₦{walletSummaryMock.nextPayout.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* This Month Paid Status Card (Narrower width) */}
            <div className="sm:col-span-5 bg-[#E6F7F0] rounded-3xl p-6 flex flex-col justify-between border border-[#006C49]/5 min-h-[180px]">
              <div className="flex">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white rounded-full text-[9px] font-bold text-[#006C49] uppercase tracking-wide shadow-sm">
                  <CheckCircle2 className="h-3 w-3 fill-[#006C49] text-white" /> This Month Paid
                </span>
              </div>
              <div className="mt-3">
                <span className="text-[9px] font-bold text-[#006C49]/70 uppercase tracking-wider block">Amount</span>
                <h3 className="text-2xl font-bold text-[#006C49] mt-0.5 tracking-tight">₦{paidStatusMock.amount.toLocaleString()}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] mt-4">
                <div>
                  <span className="text-[#006C49]/60 font-bold uppercase text-[9px] block">Due</span>
                  <span className="text-[#006C49] font-bold">{paidStatusMock.dueDate}</span>
                </div>
                <div>
                  <span className="text-[#006C49]/60 font-bold uppercase text-[9px] block">Next Recipient</span>
                  <span className="text-[#006C49] font-bold">{paidStatusMock.nextRecipient}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Matrix Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ActionButton label="Deposit" icon={<Plus className="h-4 w-4" />} />
            <ActionButton label="Withdraw" icon={<ArrowDown className="h-4 w-4" />} />
            <ActionButton label="Send Payout" icon={<ArrowUpRight className="h-4 w-4" />} />
            <ActionButton label="History" icon={<History className="h-4 w-4" />} />
          </div>

        </div>

        {/* Right Hand Long Column Side: Deep Dark Virtual Account stretches downwards to align */}
        <div className="lg:col-span-4 h-full">
          <VirtualAccountCard 
            bank={accountDetailsMock.bank} 
            accountNumber={accountDetailsMock.accountNumber} 
            accountName={accountDetailsMock.accountName} 
          />
        </div>

      </div>

      {/* Split Bottom Content Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Recent Activity Window Block */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111827]">Recent Activity</h3>
            <button className="text-xs font-bold text-[#006C49] hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivitiesMock.map((activity) => (
              <ActivityRow key={activity.id} {...activity} />
            ))}
          </div>
        </div>

        {/* Right Side Progress Tracking Stack Block */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Target Milestone Component Tracker */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-4">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Next Group Payout</span>
            
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                {nextPayoutMock.recipientInitials}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#111827] tracking-tight">{nextPayoutMock.recipientName}</h4>
                <p className="text-[10px] text-[#9CA3AF] font-medium">{nextPayoutMock.groupName}</p>
              </div>
            </div>

            <div className="flex items-end justify-between pt-2">
              <div>
                <h3 className="text-xl font-bold text-[#006C49]">₦{nextPayoutMock.targetAmount.toLocaleString()}</h3>
                <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider">Target Amount</span>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[#111827]">{nextPayoutMock.dueDate}</p>
                <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Date</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#006C49] h-full rounded-full" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider">
                <span className="text-[#006C49]">{nextPayoutMock.paidMembers} Paid</span>
                <span className="text-[#9CA3AF]">{nextPayoutMock.remainingMembers} Remaining</span>
              </div>
            </div>
          </div>

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