"use client"
import React, { useState } from "react";
import { ShieldCheck, Info, UserCheck, AlertTriangle, Link2, RefreshCw } from "lucide-react";
import { SettingSection, ToggleRow, SettingInput, SettingSelect } from "@/components/userdashboard/settings/SettingsUI";

export default function CircleSettings() {
  // Navigation Menu Array
  const sections = [
    { id: "general", name: "General" },
    { id: "payout", name: "Payout Rules" },
    { id: "permissions", name: "Member Permissions" },
    { id: "payments", name: "Payment Settings" },
    { id: "invitations", name: "Invitations" },
    { id: "notifications", name: "Notifications" },
    { id: "info", name: "Circle Information" },
    { id: "danger", name: "Danger Zone" },
  ];

  // Active state indicator tracking window view scroll
  const [activeSection, setActiveSection] = useState("general");

  // State maps for configurable parameters toggles
  const [payoutRules, setPayoutRules] = useState({ autoPayout: true, manualApproval: false, allowSkip: false });
  const [notifications, setNotifications] = useState({ reminder: true, payout: true, alert: true, joined: true, summary: false });

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] p-6 md:p-8 space-y-6 font-sans">
      
      {/* Page Title Custom Layout Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Circle Settings</h1>
        <p className="text-xs text-[#6B7280] font-medium mt-0.5">Manage how Family Savings operates.</p>
      </div>

      {/* Two Column Section Layout Navigation System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky Left Navigation Panel Toolbar Column */}
        <div className="lg:col-span-3 sticky top-6 space-y-1 bg-white border border-gray-100 p-3 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] hidden lg:block">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleScrollTo(sec.id)}
              className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeSection === sec.id
                  ? 'bg-[#E6F7F0] text-[#006C49]'
                  : 'text-[#6B7280] hover:bg-slate-50 hover:text-[#111827]'
              }`}
            >
              {sec.name}
            </button>
          ))}
        </div>

        {/* Form Entry Field Stream Content Panels Column */}
        <div className="lg:col-span-9 space-y-6 max-w-3xl pb-24">
          
          {/* 1. General Configuration Segment Block */}
          <SettingSection id="general" title="General" subtitle="Basic information about the circle.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SettingInput label="Circle Name" value="Family Savings" />
              <SettingSelect label="Circle Type" value="Family" options={["Family", "Friends", "Workplace", "Other"]} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Description</label>
              <textarea 
                className="w-full px-4 py-2.5 rounded-xl text-xs font-medium border border-gray-200 focus:border-[#006C49] focus:ring-1 focus:ring-[#006C49] outline-none min-h-[80px]"
                defaultValue="Monthly contribution group for family project pooling investments."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SettingInput label="Contribution Amount (₦)" type="number" value={20000} />
              <SettingSelect label="Contribution Frequency" value="Monthly" options={["Weekly", "Monthly"]} />
              <SettingInput label="Maximum Members" type="number" value={20} />
            </div>
          </SettingSection>

          {/* 2. Payout Engine Mechanism Configuration Block */}
          <SettingSection id="payout" title="Payout Rules" subtitle="How the circle pays members.">
            <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Current Rotation Order</label>
              <p className="text-xs font-bold text-[#111827]">John Doe → Sarah Johnson → You → Michael Smith</p>
              <button className="text-[11px] font-bold text-[#006C49] flex items-center gap-1 mt-2 w-max hover:underline">
                <RefreshCw className="h-3 w-3" /> Edit Payout Order
              </button>
            </div>
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
                  value="https://ajovault.com/invite/family-savings-5829" 
                  className="w-full px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-gray-100 text-slate-500 outline-none select-all"
                />
                <button className="px-4 py-2.5 bg-[#111827] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-black transition-colors shrink-0">
                  <Link2 className="h-3.5 w-3.5" /> Copy Link
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <button className="px-3 py-2 border border-gray-200 text-[#111827] text-[11px] font-bold rounded-xl hover:bg-slate-50 transition-colors">
                Generate New Invite
              </button>
              <button className="px-3 py-2 border border-red-200 text-red-600 text-[11px] font-bold rounded-xl hover:bg-red-50/50 transition-colors">
                Expire Invite Link
              </button>
            </div>
            <div className="border-t border-gray-100 pt-4 mt-2">
              <h4 className="text-[11px] font-bold text-[#111827] uppercase tracking-wide block mb-2">Pending Invitations (1)</h4>
              <div className="flex items-center justify-between py-2 bg-slate-50 rounded-xl px-4 text-xs font-medium text-slate-600">
                <span>uncle.sam@example.com</span>
                <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">Sent 2 days ago</span>
              </div>
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
                <p className="text-xs font-bold text-[#111827] mt-0.5">March 12, 2026</p>
              </div>
              <div>
                <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Owner</span>
                <p className="text-xs font-bold text-[#111827] mt-0.5 flex items-center gap-1">
                  John Doe <UserCheck className="h-3 w-3 text-[#006C49]" />
                </p>
              </div>
              <div>
                <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Active Members</span>
                <p className="text-xs font-bold text-[#111827] mt-0.5">18 Members</p>
              </div>
              <div>
                <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Status</span>
                <span className="inline-block text-[10px] font-bold text-[#006C49] bg-[#DCFCE7] px-2 py-0.5 rounded-full mt-1">
                  Active
                </span>
              </div>
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
                  <p className="text-[10px] text-red-700/70 font-medium mt-0.5">Exit group immediately. Safe exit rules check logic depends on cycle balances.</p>
                </div>
                <button className="px-3 py-1.5 bg-white border border-red-200 text-red-600 font-bold text-xs rounded-xl hover:bg-red-50 transition-all">
                  Leave
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-xs font-bold text-red-900 tracking-tight">Transfer Ownership</h4>
                  <p className="text-[10px] text-red-700/70 font-medium mt-0.5">Appoint another workspace identity as group supreme controller.</p>
                </div>
                <button className="px-3 py-1.5 bg-white border border-red-200 text-red-600 font-bold text-xs rounded-xl hover:bg-red-50 transition-all">
                  Transfer
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-xs font-bold text-red-900 tracking-tight">Archive Circle</h4>
                  <p className="text-[10px] text-red-700/70 font-medium mt-0.5">Freeze all contribution modules and store state variables read-only.</p>
                </div>
                <button className="px-3 py-1.5 bg-white border border-red-200 text-red-600 font-bold text-xs rounded-xl hover:bg-red-50 transition-all">
                  Archive
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="text-xs font-bold text-red-900 tracking-tight">Delete Circle</h4>
                  <p className="text-[10px] text-red-700/70 font-medium mt-0.5">Completely wipe database records. Possible only if zero historical outstanding liabilities exist.</p>
                </div>
                <button className="px-3 py-1.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-all shadow-sm">
                  Delete Circle
                </button>
              </div>
            </div>
          </div>

          {/* Form Save Action Persistent Bar Spacer */}
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#6B7280] hover:bg-slate-50 transition-colors">
              Cancel Updates
            </button>
            <button className="px-5 py-2.5 bg-[#006C49] text-white text-xs font-bold rounded-xl hover:bg-[#005237] transition-colors shadow-sm">
              Save Dynamic Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}