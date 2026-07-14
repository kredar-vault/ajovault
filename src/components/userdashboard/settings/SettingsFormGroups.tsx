"use client";

import React, { useState } from "react";
import { ShieldCheck, Link2, RefreshCw, AlertTriangle, Loader2 } from "lucide-react";
import { SettingSection, ToggleRow, SettingInput, SettingSelect } from "./SettingsUI";
import { useDeleteGroup, useLeaveGroup } from "@/hooks/useGroups";
import { useGroupPayouts, useCurrentPayout } from "@/hooks/usePayouts";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SettingsFormGroupsProps {
  name: string;
  setName: (v: string) => void;
  purpose: string;
  setPurpose: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  amount: number;
  setAmount: (v: number) => void;
  frequency: string;
  setFrequency: (v: string) => void;
  maxMembers: number;
  setMaxMembers: (v: number) => void;
  payoutRules: { autoPayout: boolean; manualApproval: boolean; allowSkip: boolean };
  setPayoutRules: (v: any) => void;
  notifications: { reminder: boolean; payout: boolean; alert: boolean; joined: boolean; summary: boolean };
  setNotifications: (v: any) => void;
  groupSettings: any;
  groupId: string;
}

export function SettingsFormGroups({
  name,
  setName,
  purpose,
  setPurpose,
  description,
  setDescription,
  amount,
  setAmount,
  frequency,
  setFrequency,
  maxMembers,
  setMaxMembers,
  payoutRules,
  setPayoutRules,
  notifications,
  setNotifications,
  groupSettings,
  groupId,
}: SettingsFormGroupsProps) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const deleteGroup = useDeleteGroup(groupId);
  const leaveGroup = useLeaveGroup(groupId);
  const { data: rotationList } = useGroupPayouts(groupId);
  const { data: payoutSummary } = useCurrentPayout(groupId);

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    try {
      await deleteGroup.mutateAsync();
      router.push("/dashboard");
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to delete circle.";
      toast.error(msg);
      setConfirmDelete(false);
    }
  };

  const handleLeave = async () => {
    if (!confirmLeave) { setConfirmLeave(true); return; }
    try {
      await leaveGroup.mutateAsync();
      router.push("/dashboard");
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to leave circle.";
      toast.error(msg);
      setConfirmLeave(false);
    }
  };
  return (
    <>
      {/* 1. General Configuration Segment Block */}
      <SettingSection id="general" title="General" subtitle="Basic information about the circle.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SettingInput label="Circle Name" value={name} onChange={(e) => setName(e.target.value)} />
          <SettingSelect 
            label="Circle Purpose" 
            value={purpose} 
            onChange={(e) => setPurpose(e.target.value)} 
            options={["Family", "Friends", "Workplace", "Rent", "Targeted", "Business"]} 
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Description</label>
          <textarea 
            className="w-full px-4 py-2.5 rounded-xl text-xs font-medium border border-gray-200 focus:border-[#006C49] focus:ring-1 focus:ring-[#006C49] outline-none min-h-[80px] text-[#111827]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Monthly contribution group for savings rotations..."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SettingInput label="Contribution Amount (₦)" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          <SettingSelect 
            label="Contribution Frequency" 
            value={frequency} 
            onChange={(e) => setFrequency(e.target.value)} 
            options={["weekly", "bi-weekly", "monthly"]} 
          />
          <SettingInput label="Maximum Members" type="number" value={maxMembers} onChange={(e) => setMaxMembers(Number(e.target.value))} />
        </div>
      </SettingSection>

      {/* 2. Payout Engine Mechanism Configuration Block */}
      <SettingSection id="payout" title="Payout Rules" subtitle="How the circle pays members.">
        <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-2">
          <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Current Rotation Order</label>
          {rotationList && rotationList.length > 0 ? (
            <p className="text-xs font-bold text-[#111827]">
              {rotationList.map(m => m.name).join(" → ")}
            </p>
          ) : (
            <p className="text-xs text-[#6B7280]">No rotation set yet.</p>
          )}
          <button className="text-[11px] font-bold text-[#006C49] flex items-center gap-1 mt-2 w-max hover:underline" onClick={(e) => e.preventDefault()}>
            <RefreshCw className="h-3 w-3" /> Edit Payout Order
          </button>
        </div>
        {payoutSummary && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Current Cycle</span>
              <p className="font-bold text-[#111827] mt-0.5">{payoutSummary.currentCycle}</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Receiving Next</span>
              <p className="font-bold text-[#111827] mt-0.5">{payoutSummary.currentRecipientName}</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">After That</span>
              <p className="font-bold text-[#111827] mt-0.5">{payoutSummary.nextRecipientName}</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Payouts Done</span>
              <p className="font-bold text-[#111827] mt-0.5">{payoutSummary.payoutsDone} / {payoutSummary.totalMembers}</p>
            </div>
          </div>
        )}
        {rotationList && (() => {
          const current = rotationList.find(m => m.status === "CURRENT");
          return current?.dateInfo ? (
            <p className="text-xs font-semibold text-[#006C49] bg-emerald-50 px-3 py-2 rounded-lg">
              Next payout: {current.dateInfo}
            </p>
          ) : null;
        })()}
        <div className="divide-y divide-gray-50 pt-2">
          <ToggleRow 
            label="Automatic Payout" 
            description="Disburse pool liquidity automatically once timeline intervals hit execution window triggers." 
            checked={payoutRules.autoPayout} 
            onChange={(v) => setPayoutRules({...payoutRules, autoPayout: v})} 
          />
          <ToggleRow 
            label="Manual Approval Before Payout" 
            description="Require administrative authorization validation before completing distribution cycles." 
            checked={payoutRules.manualApproval} 
            onChange={(v) => setPayoutRules({...payoutRules, manualApproval: v})} 
          />
          <ToggleRow 
            label="Allow Skip Turn" 
            description="Permit active members to request position swaps inside rotational queues dynamically." 
            checked={payoutRules.allowSkip} 
            onChange={(v) => setPayoutRules({...payoutRules, allowSkip: v})} 
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <SettingSelect label="Grace Period for Late Payments" value="2 Days" options={["None", "1 Day", "2 Days", "3 Days", "5 Days"]} />
        </div>
      </SettingSection>

      {/* 3. Member Matrix Clearance Permissions Block */}
      <SettingSection id="permissions" title="Member Permissions" subtitle="Who can do what.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SettingSelect label="Who can invite members" value="Admin Only" options={["Everyone", "Admin Only"]} />
          <SettingSelect label="Who can remove members" value="Admin Only" options={["Everyone", "Admin Only"]} />
          <SettingSelect label="Who can edit payout order" value="Admin Only" options={["Everyone", "Admin Only"]} />
          <SettingSelect label="Who can approve requests" value="Admin Only" options={["Everyone", "Admin Only"]} />
          <div className="sm:col-span-2">
            <SettingSelect label="Who can view financial reports" value="Everyone" options={["Everyone", "Admin Only"]} />
          </div>
        </div>
      </SettingSection>

      {/* 4. Ledger Flow Payment Framework Modules */}
      <SettingSection id="payments" title="Payment Settings" subtitle="How money flows. This section is mostly informational since Ajo Vault handles the payments.">
        <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 flex items-start gap-3">
          <div className="h-7 w-7 rounded-full bg-emerald-50 text-[#006C49] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-[#111827] tracking-tight">System Core Engine Active</h4>
            <p className="text-[10px] leading-relaxed text-[#6B7280] font-medium">
              Ledger routing infrastructure settlements are handled by Ajo Vault built on Kredar frameworks.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <SettingInput label="Payment Provider" value="Nomba Banking Core" readOnly />
          <SettingInput label="Dedicated Virtual Accounts" value="Enabled (Individual Target Routing)" readOnly />
          <SettingInput label="Auto Contribution Matching" value="Active (Dynamic Reconciliation)" readOnly />
          <SettingInput label="Default Currency" value="Nigerian Naira (₦)" readOnly />
        </div>
      </SettingSection>

      {/* 5. Onboarding Pipeline Link Control Block */}
      <SettingSection id="invitations" title="Invitations" subtitle="Managing new members.">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Invite Link</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              readOnly 
              value={groupSettings?.inviteCode ? `https://ajovault.com/invite/${groupSettings.inviteCode}` : "https://ajovault.com/invite"} 
              className="w-full px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-gray-100 text-slate-500 outline-none select-all"
            />
            <button 
              type="button"
              onClick={() => {
                if (groupSettings?.inviteCode) {
                  navigator.clipboard.writeText(`https://ajovault.com/invite/${groupSettings.inviteCode}`);
                  toast.success("Invite link copied!");
                }
              }}
              className="px-4 py-2.5 bg-[#111827] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-black transition-colors shrink-0"
            >
              <Link2 className="h-3.5 w-3.5" /> Copy Link
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <button type="button" className="px-3 py-2 border border-gray-200 text-[#111827] text-[11px] font-bold rounded-xl hover:bg-slate-50 transition-colors">
            Generate New Invite
          </button>
          <button type="button" className="px-3 py-2 border border-red-200 text-red-600 text-[11px] font-bold rounded-xl hover:bg-red-50/50 transition-colors">
            Expire Invite Link
          </button>
        </div>
      </SettingSection>

      {/* 6. Notification Dispatch Triggers Configuration Module */}
      <SettingSection id="notifications" title="Notifications" subtitle="Circle-specific notifications.">
        <div className="divide-y divide-gray-50">
          <ToggleRow 
            label="Contribution Reminder" 
            description="Ping members regarding impending payment target drop dates prior to structural system cycles." 
            checked={notifications.reminder} 
            onChange={(v) => setNotifications({...notifications, reminder: v})} 
          />
          <ToggleRow 
            label="Payout Reminder" 
            description="Alert scheduled beneficiaries regarding impending fund releases." 
            checked={notifications.payout} 
            onChange={(v) => setNotifications({...notifications, payout: v})} 
          />
          <ToggleRow 
            label="Missed Contribution Alert" 
            description="Escalate notifications directly when transaction pipelines breach grace period frameworks." 
            checked={notifications.alert} 
            onChange={(v) => setNotifications({...notifications, alert: v})} 
          />
          <ToggleRow 
            label="New Member Joined" 
            description="Send updates when keys open space for newly verified pool subscribers." 
            checked={notifications.joined} 
            onChange={(v) => setNotifications({...notifications, joined: v})} 
          />
          <ToggleRow 
            label="Weekly Summary" 
            description="Deliver aggregated group liquidity reports every Sunday." 
            checked={notifications.summary} 
            onChange={(v) => setNotifications({...notifications, summary: v})} 
          />
        </div>
      </SettingSection>

      {/* 7. Read Only Architecture Ledger Attributes Block */}
      <SettingSection id="info" title="Circle Information" subtitle="Read-only metadata parameters.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-gray-100">
          <div>
            <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Circle Created</span>
            <p className="text-xs font-bold text-[#111827] mt-0.5">
              {groupSettings?.createdAt ? new Date(groupSettings.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
            </p>
          </div>
          {groupSettings?.startDate && (
            <div>
              <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Rotation Started</span>
              <p className="text-xs font-bold text-[#006C49] mt-0.5">
                {new Date(groupSettings.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          )}
          <div>
            <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Status</span>
            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${groupSettings?.status === "Active" ? "text-[#006C49] bg-[#DCFCE7]" : "text-gray-500 bg-gray-100"}`}>
              {groupSettings?.status ?? "—"}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Members</span>
            <p className="text-xs font-bold text-[#111827] mt-0.5">
              {groupSettings?.currentMembers ?? "—"} / {groupSettings?.maxMembers ?? "—"}
            </p>
          </div>
          <div>
            <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Contribution</span>
            <p className="text-xs font-bold text-[#111827] mt-0.5">
              {groupSettings?.contributionAmount ? `₦${groupSettings.contributionAmount.toLocaleString()}` : "—"}
            </p>
          </div>
          {groupSettings?.dvaAccountNumber && (
            <div className="col-span-2">
              <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Circle DVA</span>
              <p className="text-xs font-bold text-[#111827] mt-0.5">{groupSettings.dvaAccountNumber} · {groupSettings.dvaBankName}</p>
              <p className="text-[10px] text-gray-400">{groupSettings.dvaAccountName}</p>
            </div>
          )}
        </div>
      </SettingSection>

      {/* 8. Destructive Risk Vectors Zone Block */}
      <div id="danger" className="bg-red-50/40 border border-red-100 rounded-3xl p-6 space-y-6 scroll-mt-6">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-red-900 tracking-tight">Danger Zone</h3>
            <p className="text-[11px] text-red-700 font-medium mt-0.5">Irreversible destructive actions regarding this ledger pool instance.</p>
          </div>
        </div>
        
        <div className="divide-y divide-red-100/60 pt-2">
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="text-xs font-bold text-red-900 tracking-tight">Leave Circle</h4>
              <p className="text-[10px] text-red-700/70 font-medium mt-0.5">
                {confirmLeave ? "Click again to confirm — you will lose access immediately." : "Exit this circle. You will need an invite to rejoin."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLeave}
              disabled={leaveGroup.isPending}
              className={`px-3 py-1.5 font-bold text-xs rounded-xl transition-all disabled:opacity-50 flex items-center gap-1.5 ${confirmLeave ? "bg-red-600 text-white hover:bg-red-700 animate-pulse" : "bg-white border border-red-200 text-red-600 hover:bg-red-50"}`}
            >
              {leaveGroup.isPending && <Loader2 className="h-3 w-3 animate-spin" />}
              {confirmLeave ? "Confirm Leave" : "Leave"}
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="text-xs font-bold text-red-900 tracking-tight">Transfer Ownership</h4>
              <p className="text-[10px] text-red-700/70 font-medium mt-0.5">Appoint another workspace identity as group supreme controller.</p>
            </div>
            <button
              type="button"
              onClick={() => toast("Transfer ownership is coming soon.", { icon: "🔒" })}
              className="px-3 py-1.5 bg-white border border-red-200 text-red-600 font-bold text-xs rounded-xl hover:bg-red-50 transition-all"
            >
              Transfer
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="text-xs font-bold text-red-900 tracking-tight">Archive Circle</h4>
              <p className="text-[10px] text-red-700/70 font-medium mt-0.5">Freeze all contribution modules and store state variables read-only.</p>
            </div>
            <button
              type="button"
              onClick={() => toast("Archive circle is coming soon.", { icon: "📦" })}
              className="px-3 py-1.5 bg-white border border-red-200 text-red-600 font-bold text-xs rounded-xl hover:bg-red-50 transition-all"
            >
              Archive
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="text-xs font-bold text-red-900 tracking-tight">Delete Circle</h4>
              <p className="text-[10px] text-red-700/70 font-medium mt-0.5">
                {confirmDelete ? "Click again to confirm — this cannot be undone." : "Completely wipe database records. Possible only if zero historical outstanding liabilities exist."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteGroup.isPending}
              className={`px-3 py-1.5 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50 ${confirmDelete ? "bg-red-800 text-white hover:bg-red-900 animate-pulse" : "bg-red-600 text-white hover:bg-red-700"}`}
            >
              {deleteGroup.isPending && <Loader2 className="h-3 w-3 animate-spin" />}
              {confirmDelete ? "Confirm Delete" : "Delete Circle"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
