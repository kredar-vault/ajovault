import React from "react";
import { ShieldCheck, MessageSquare } from "lucide-react";
import { RotationMember, PayoutSummary } from "@/types";
import { MemberAvatar, SummaryCard } from "@/components/userdashboard/payout/PayoutUi";
import { RotationRow } from "@/components/userdashboard/payout/RotationRow";

const mockSummary: PayoutSummary = {
  currentCycle: "July",
  currentRecipient: { name: "Sarah Johnson" },
  nextRecipient: { name: "Michael James" },
  totalMembers: 20,
  payoutsDone: 8
};

const mockRotationList: RotationMember[] = [
  { id: "m1", name: "Sarah Johnson", position: 8, amount: 400000, status: 'PAID' },
  { id: "m2", name: "Michael James", position: 9, amount: 400000, status: 'CURRENT', dateInfo: "Receiving in 4 days" },
  { id: "m3", name: "Grace", initials: "G", position: 10, amount: 400000, status: 'WAITING', dateInfo: "August" },
  { id: "m4", name: "David", initials: "D", position: 11, amount: 400000, status: 'WAITING', dateInfo: "September" }
];

export default function PayoutSchedule() {
  const progressPercent = (mockSummary.payoutsDone / mockSummary.totalMembers) * 100;

  return (
    <div className="w-full min-h-screen  p-6 md:p-8 space-y-6 font-sans selection:bg-emerald-100">
      
      {/* Title Segment */}
      <div>
        <h1 className="text-xl font-bold text-[#111827]">Payout Schedule</h1>
        <p className="text-xs text-[#6B7280] font-medium mt-0.5">See the complete payout order for your savings circle.</p>
      </div>

      {/* Grid Summary Matrix Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Current Cycle">
          <span className="text-lg font-bold text-[#111827]">{mockSummary.currentCycle}</span>
        </SummaryCard>
        
        <SummaryCard title="Current Recipient">
          <MemberAvatar name={mockSummary.currentRecipient.name} size="sm" />
          <span className="text-xs font-bold text-[#111827]">{mockSummary.currentRecipient.name}</span>
        </SummaryCard>

        <SummaryCard title="Next Recipient">
          <MemberAvatar name={mockSummary.nextRecipient.name} size="sm" />
          <span className="text-xs font-bold text-[#111827]">{mockSummary.nextRecipient.name}</span>
        </SummaryCard>

        <SummaryCard title="Total Members">
          <span className="text-lg font-bold text-[#111827]">{mockSummary.totalMembers}</span>
          <span className="text-[11px] text-[#6B7280] font-medium pt-1">({mockSummary.payoutsDone} Payouts done)</span>
        </SummaryCard>
      </div>

      {/* Progress Metric Bar Segment */}
      <div className="bg-white border border-gray-100 rounded-[10px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-2">
        <div className="flex justify-between text-[11px] font-bold tracking-tight">
          <span className="text-[#111827]">Payout Progress</span>
          <span className="text-[#6B7280] font-medium">{mockSummary.payoutsDone} of {mockSummary.totalMembers} completed</span>
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
          <div className="pl-1">
            {mockRotationList.map((member, index) => (
              <RotationRow 
                key={member.id} 
                member={member} 
                isLast={index === mockRotationList.length - 1} 
              />
            ))}
          </div>
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