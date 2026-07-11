"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { InviteShareChannels } from "./InviteShareChannels";

interface StepInviteMembersProps {
  groupId: string;
  groupName?: string;
  expectedMembers?: number;
  onNext: () => void;
  onBack: () => void;
}

export function StepInviteMembers({ 
  groupId,
  groupName = "Family Vacation Fund", 
  expectedMembers = 10, 
  onNext 
}: StepInviteMembersProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-brand-secondary">
      {/* Brand Header */}
      <header className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/icon.svg" alt="Ajo Vault" width={22} height={22} className="text-[#006C49]" />
          <span className="text-base font-bold tracking-tight text-main">Ajo Vault</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Main Split Layout Container */}
        <div className="bg-white rounded-[10px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.015)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT COLUMN: ACTION OPTIONS */}
          <div className="p-8 sm:p-12 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-main">
                  Invite people you trust
                </h1>
                <p className="text-sm text-muted leading-relaxed">
                  Ajo is built on trust. Invite family, friends, or colleagues to join your financial rotation.
                </p>
              </div>

              {/* Status Banner Confirmation Notice */}
              {statusMessage && (
                <div className="p-3 bg-[#006C49]/10 rounded-xl text-xs text-[#006C49] font-medium transition-all">
                  {statusMessage}
                </div>
              )}

              {/* Action Channels List */}
              <InviteShareChannels
                groupId={groupId}
                groupName={groupName}
                setStatusMessage={setStatusMessage}
              />
            </div>

            {/* Footer Form Action Navigation Controls */}
            <div className="flex items-center gap-4 pt-6 mt-auto">
              <Button
                type="button"
                variant="primary"
                onClick={onNext}
                className="px-6 py-2.5 font-bold"
              >
                Continue
              </Button>
              <button
                type="button"
                onClick={onNext}
                className="text-xs font-bold text-muted hover:text-main transition-colors px-2"
              >
                I'll invite them later
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: PREVIEW CARD STACK */}
          <div className="bg-[#E9ECF0] p-8 sm:p-12 flex items-center justify-center relative min-h-[380px] md:min-h-auto">
            <div className="w-full max-w-[270px] bg-white rounded-[10px] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-white/60 text-center relative space-y-5">
              
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-[#00A86B] text-white flex items-center justify-center shadow-md">
                <UserPlus className="h-5 w-5" />
              </div>

              <div className="pt-3 space-y-1">
                <h3 className="text-sm font-bold text-main">You're Invited!</h3>
                <p className="text-[11px] leading-relaxed text-muted">
                  Alex has invited you to join <span className="font-semibold text-main">"{groupName}"</span> on Ajo Vault.
                </p>
              </div>

              <div className="bg-brand-secondary rounded-xl p-3 grid grid-cols-2 gap-2 text-left border border-gray-100">
                <div>
                  <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Goal</span>
                  <span className="text-xs font-bold text-main">₦5,000</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Members</span>
                  <span className="text-xs font-bold text-main">4 / {expectedMembers}</span>
                </div>
              </div>

              <div className="w-full bg-[#006C49] text-white py-2 rounded-lg text-xs font-semibold text-center select-none shadow-sm">
                Join Group
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}