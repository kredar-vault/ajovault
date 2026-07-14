"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { useCircle } from "../layout";
import { useGroupSettings, useUpdateGroupSettings } from "@/hooks/useGroups";
import { SettingsFormGroups } from "@/components/userdashboard/settings/SettingsFormGroups";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CircleSettings() {
  const { currentCircleId, isLoading: isCirclesLoading } = useCircle();
  const { data: groupSettings, isLoading: isSettingsLoading } = useGroupSettings(currentCircleId || "");
  const updateSettingsMutation = useUpdateGroupSettings(currentCircleId || "");

  // Form State
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState("monthly");
  const [maxMembers, setMaxMembers] = useState(20);

  // Layout navigation lists
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

  const [activeSection, setActiveSection] = useState("general");
  const [payoutRules, setPayoutRules] = useState({ autoPayout: true, manualApproval: false, allowSkip: false });
  const [notifications, setNotifications] = useState({ reminder: true, payout: true, alert: true, joined: true, summary: false });

  // Sync state when DB settings load
  useEffect(() => {
    if (groupSettings) {
      setName(groupSettings.groupName || groupSettings.name || "");
      setPurpose(groupSettings.purpose || "");
      setDescription(groupSettings.description || "");
      setAmount(groupSettings.contributionAmount || 0);
      setFrequency(groupSettings.frequency || "monthly");
      setMaxMembers(groupSettings.maxMembers || 20);
    }
  }, [groupSettings]);

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSaveChanges = () => {
    if (!currentCircleId) return;
    updateSettingsMutation.mutate({
      groupName: name,
      purpose,
      contributionAmount: amount,
      frequency: frequency as any,
    }, {
      onSuccess: () => {
        toast.success("Settings saved.");
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || err?.message || "Failed to save settings.";
        toast.error(msg);
      }
    });
  };

  const isLoading = isCirclesLoading || isSettingsLoading;

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
            Create or join a savings circle to view and manage settings.
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

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] p-6 md:p-8 space-y-6 font-sans">
      
      {/* Page Title Custom Layout Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Circle Settings</h1>
        <p className="text-xs text-[#6B7280] font-medium mt-0.5">Manage how circle operates.</p>
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
          
          <SettingsFormGroups
            name={name}
            setName={setName}
            purpose={purpose}
            setPurpose={setPurpose}
            description={description}
            setDescription={setDescription}
            amount={amount}
            setAmount={setAmount}
            frequency={frequency}
            setFrequency={setFrequency}
            maxMembers={maxMembers}
            setMaxMembers={setMaxMembers}
            payoutRules={payoutRules}
            setPayoutRules={setPayoutRules}
            notifications={notifications}
            setNotifications={setNotifications}
            groupSettings={groupSettings}
            groupId={currentCircleId || ""}
          />

          {/* Form Save Action Persistent Bar Spacer */}
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#6B7280] hover:bg-slate-50 transition-colors">
              Cancel Updates
            </button>
            <button 
              onClick={handleSaveChanges}
              disabled={updateSettingsMutation.isPending}
              className="px-5 py-2.5 bg-[#006C49] text-white text-xs font-bold rounded-xl hover:bg-[#005237] transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateSettingsMutation.isPending && <Loader2 className="h-3 w-3 animate-spin" />}
              <span>Save Dynamic Changes</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}