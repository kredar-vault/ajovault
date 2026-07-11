"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { Step3Form } from "./Step3Form";

interface Step3Props {
  expectedMembers: number; // Passed from parent state to make calculation accurate
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

export interface Step3Data {
  frequency: "weekly" | "bi-weekly" | "monthly";
  contributionAmount: number;
  firstPayoutRecipient: string;
}

export function Step3FinancialRules({ expectedMembers = 10, onNext, onBack }: Step3Props) {
  const [formData, setFormData] = useState<Step3Data>({
    frequency: "weekly",
    contributionAmount: 500,
    firstPayoutRecipient: "creator",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const estimatedPayout = formData.contributionAmount * expectedMembers;

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      {/* Top Header Navigation Element */}
      <header className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/icon.svg"
            alt="Ajo Vault"
            width={22}
            height={22}
            className="text-[#006C49]"
          />
          <span className="text-base font-bold tracking-tight text-[#006C49]">
            Ajo Vault
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        {/* PROGRESS INDICATOR BLOCK */}
        <div className="max-w-[620px] space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            Step 3 of 5
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#E2E8F0]">
            <div className="h-full w-[60%] rounded-full bg-[#006C49]" />
          </div>
        </div>

        {/* SECTION TITLE */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Choose how your group will save.
          </h1>
          <p className="text-sm text-[#64748B]">
            Define the cadence and contribution amounts for your rotational pool.
          </p>
        </div>

        {/* SPLIT COLUMN INTERFACE LAYOUT */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT FORM ELEMENT BLOCK */}
          <Step3Form
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            onBack={onBack}
          />

          {/* RIGHT SIDEBAR COLUMN: LIVE SUMMARY */}
          <div className="bg-gradient-to-b from-white to-[#F8FAFC] border border-gray-100/70 rounded-[10px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] space-y-6 sticky top-6">
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[#006C49] uppercase">
              Live Summary
            </div>

            <div className="space-y-4 divide-y divide-gray-100 text-sm">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[#64748B]">Contribution</span>
                <div className="text-right">
                  <span className="font-bold text-[#0F172A]">₦{formData.contributionAmount.toLocaleString()}</span>
                  <span className="block text-[9px] uppercase font-bold tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded mt-0.5 text-center w-max ml-auto">
                    {formData.frequency}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 pb-1.5">
                <span className="text-[#64748B]">Group Size (Est.)</span>
                <span className="font-bold text-[#0F172A]">{expectedMembers} Members</span>
              </div>

              <div className="flex items-center justify-between pt-4 pb-1.5">
                <span className="text-[#64748B]">First Payout To</span>
                <span className="text-xs font-semibold text-[#006C49] bg-[#006C49]/5 px-2 py-0.5 rounded-full capitalize">
                  {formData.firstPayoutRecipient === "creator" ? "Admin (You)" : "Randomized"}
                </span>
              </div>

              {/* ESTIMATED TOTAL PAYOUT SUMMARY INSIGHT */}
              <div className="pt-6 space-y-1">
                <span className="text-xs text-[#64748B] block font-medium">Estimated Payout per cycle</span>
                <div className="text-3xl font-extrabold text-[#006C49] flex items-baseline tracking-tight">
                  <span className="text-xl font-bold mr-1">₦</span>
                  {estimatedPayout.toLocaleString()}
                </div>
                <div className="text-[10px] text-[#94A3B8] flex items-center gap-1 pt-1">
                  <HelpCircle className="h-3 w-3" />
                  Based on ₦{formData.contributionAmount.toLocaleString()} &times; {expectedMembers} members
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}