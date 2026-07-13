"use client";

import React from "react";
import { ShieldCheck, MessageSquare, Loader2, Plus } from "lucide-react";
import { useCircle } from "../layout";
import { useCurrentPayout, useGroupPayouts, useDisbursePayout } from "@/hooks/usePayouts";
import { useGroupSettings } from "@/hooks/useGroups";
import { useSession } from "@/lib/auth";
import { MemberAvatar, SummaryCard } from "@/components/userdashboard/payout/PayoutUi";
import { RotationRow } from "@/components/userdashboard/payout/RotationRow";
import Link from "next/link";

export default function PayoutSchedule() {
  const { currentCircleId, isLoading: isCirclesLoading } = useCircle();
  const { user } = useSession();

  const { data: currentPayout, isLoading: isCurrentLoading } = useCurrentPayout(currentCircleId || "");
  const { data: rotationList, isLoading: isRotationLoading } = useGroupPayouts(currentCircleId || "");
  const { data: groupSettings } = useGroupSettings(currentCircleId || "");
  const disburseMutation = useDisbursePayout(currentCircleId || "");

  const isAdmin = !!user && !!groupSettings && user.userId === groupSettings.createdByUserId;

  const handleDisburse = (payoutId: string) => {
    if (!confirm("Disburse this payout now? The funds will be sent to the recipient immediately.")) return;
    disburseMutation.mutate(payoutId, {
      onSuccess: () => alert("Payout disbursed successfully!"),
      onError: (err) => alert(`Failed to disburse: ${err.message}`),
    });
  };

  const isLoading = isCirclesLoading || isCurrentLoading || isRotationLoading;

  if (isLoading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="h-8 w-8 text-[#006C49] animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Please wait...</p>
      </main>
    );
  }

  if (!currentCircleId) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto flex flex-col items-center justify-center min-h-[500px] text-center space-y-6">
        <div className="max-w-md space-y-3">
          <h2 className="text-xl font-bold text-gray-900">No active savings circles</h2>
          <p className="text-sm text-gray-500">
            Create or join a savings circle to view the payout release schedule.
          </p>
        </div>
        <Link 
          href="/questions" 
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" /> Create First Circle
        </Link>
      </main>
    );
  }

  const summary = currentPayout || {
    currentCycle: "N/A",
    currentRecipientName: "None",
    nextRecipientName: "None",
    totalMembers: 0,
    payoutsDone: 0
  };

  const rotations = rotationList || [];
  const progressPercent = summary.totalMembers > 0 ? (summary.payoutsDone / summary.totalMembers) * 100 : 0;

  return (
    <div className="w-full min-h-screen p-6 md:p-8 space-y-6 font-sans selection:bg-emerald-100">
      
      {/* Title Segment */}
      <div>
        <h1 className="text-xl font-bold text-[#111827]">Payout Schedule</h1>
        <p className="text-xs text-[#6B7280] font-medium mt-0.5">See the complete payout order for your savings circle.</p>
      </div>

      {/* Grid Summary Matrix Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Current Cycle">
          <span className="text-lg font-bold text-[#111827]">{summary.currentCycle}</span>
        </SummaryCard>
        
        <SummaryCard title="Current Recipient">
          <MemberAvatar name={summary.currentRecipientName} size="sm" />
          <span className="text-xs font-bold text-[#111827]">{summary.currentRecipientName}</span>
        </SummaryCard>

        <SummaryCard title="Next Recipient">
          <MemberAvatar name={summary.nextRecipientName} size="sm" />
          <span className="text-xs font-bold text-[#111827]">{summary.nextRecipientName}</span>
        </SummaryCard>

        <SummaryCard title="Total Members">
          <span className="text-lg font-bold text-[#111827]">{summary.totalMembers}</span>
          <span className="text-[11px] text-[#6B7280] font-medium pt-1">({summary.payoutsDone} Payouts done)</span>
        </SummaryCard>
      </div>

      {/* Progress Metric Bar Segment */}
      <div className="bg-white border border-gray-100 rounded-[10px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-2">
        <div className="flex justify-between text-[11px] font-bold tracking-tight">
          <span className="text-[#111827]">Payout Progress</span>
          <span className="text-[#6B7280] font-medium">{summary.payoutsDone} of {summary.totalMembers} completed</span>
        </div>
        <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
          <div className="bg-[#006C49] h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Split Main Content Area View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Rotation Order Stack Pipeline Layout */}
        <div className="lg:col-span-2 space-y-1">
          <h2 className="text-sm font-bold text-[#111827] pb-3">Rotation Order</h2>
          {rotations.length === 0 ? (
            <p className="text-xs font-medium text-gray-500 pl-1 py-4">No rotation order defined yet.</p>
          ) : (
            <div className="pl-1">
              {rotations.map((member, index) => (
                <RotationRow
                  key={member.id}
                  member={member}
                  isLast={index === rotations.length - 1}
                  isAdmin={isAdmin}
                  onDisburse={handleDisburse}
                  isDisbursing={disburseMutation.isPending}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Info Guidelines Information Block Panels */}
        <div className="space-y-4">
          
          {/* Rules Card Box Panel */}
          <div className="bg-white border border-gray-100 rounded-[10px] p-5 space-y-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
              <ShieldCheck className="h-4 w-4 text-[#111827]" />
              <h3>Rules</h3>
            </div>
            <p className="text-[11px] leading-relaxed font-medium text-[#6B7280]">
              Members receive payouts based on the agreed rotation order. Once every active member contributes, the scheduled payout is automatically released.
            </p>
          </div>

          {/* Contact Admin Drawer Activation Card Box Panel */}
          <div className="bg-white border border-gray-100 rounded-[10px] p-5 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                <MessageSquare className="h-4 w-4 text-[#111827]" />
                <h3>Contact Admin</h3>
              </div>
              <p className="text-[11px] leading-relaxed font-medium text-[#6B7280]">
                Need to change the order? Contact the circle administrator before the next contribution cycle begins.
              </p>
            </div>
            <button className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-[#111827] font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shadow-sm">
              Message Admin
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}