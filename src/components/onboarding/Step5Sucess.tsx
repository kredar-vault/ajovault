"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Copy, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/shared/Button";
import Link from "next/link";

interface Step5SuccessProps {
  groupName: string;
  contributionAmount: number;
  frequency: string;
}

export function Step5Success({ groupName, contributionAmount, frequency }: Step5SuccessProps) {
  const [copied, setCopied] = useState(false);
  const inviteUrl = `https://ajovault.com/join/${groupName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-x8j2`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-brand-secondary">
      <header className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/icon.svg" alt="Ajo Vault" width={22} height={22} className="text-[#006C49]" />
          <span className="text-base font-bold tracking-tight text-main">Ajo Vault</span>
        </div>
      </header>

      <div className="flex items-center justify-center pt-16 px-4 pb-12">
        <div className="w-full max-w-[520px] bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 text-center space-y-8 shadow-[0_6px_30px_rgba(0,0,0,0.01)]">
          
          {/* Success Check Badge */}
          <div className="mx-auto h-10 w-10 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
            <Check className="h-5 w-5" />
          </div>

          {/* Core Celebratory Header */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#006C49]">
              Your savings circle is ready!
            </h1>
            <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-sm mx-auto">
              You've successfully created your new financial rotation. It's time to gather your circle and start growing together.
            </p>
          </div>

          {/* Grey Summary Block Container */}
          <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 text-left space-y-4">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Group Summary</span>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-50 rounded-lg p-3">
                <span className="text-[9px] font-bold text-muted uppercase block">Circle Name</span>
                <span className="text-xs font-bold text-main block truncate">{groupName || "Q3 Tech Gadget Fund"}</span>
              </div>
              <div className="bg-white border border-gray-50 rounded-lg p-3">
                <span className="text-[9px] font-bold text-muted uppercase block">Contribution</span>
                <span className="text-xs font-bold text-main block">₦{contributionAmount} <span className="text-muted font-normal">/ {frequency}</span></span>
              </div>
            </div>

            {/* Live Copy Link Frame */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-muted uppercase">Invite Link</label>
              <div className="relative flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden px-3 py-2">
                <input
                  type="text"
                  readOnly
                  value={inviteUrl}
                  className="w-full text-xs font-medium text-main bg-transparent border-0 outline-none pr-8 select-all"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-2.5 text-muted hover:text-[#006C49] transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Command Set */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <Button variant="secondary" className="px-5 py-2 flex items-center gap-1.5 font-bold">
              <UserPlus className="h-3.5 w-3.5" /> Invite Members
            </Button>
            <Link href="/dashboard">
            <Button variant="primary" className="px-5 py-2 flex items-center gap-1.5 font-bold">
              Go to Dashboard <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}