"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Wallet, UserCheck, HelpCircle, Zap, CalendarCheck } from "lucide-react";
import { Button } from "@/components/shared/Button";

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
    firstPayoutRecipient: "admin",
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, contributionAmount: val }));
  };

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
          <div className="lg:col-span-2 space-y-4">
            
            {/* Frequency Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.005)]">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#006C49]" />
                Frequency
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Weekly Card */}
                <div
                  onClick={() => setFormData((prev) => ({ ...prev, frequency: "weekly" }))}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.frequency === "weekly"
                      ? "border-[#006C49] bg-white"
                      : "border-gray-100 bg-[#F8FAFC]/60 hover:bg-[#F1F5F9]"
                  }`}
                >
                  <div className="h-8 w-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                   <CalendarCheck size={18} className="text-[#64748B]"/>
                  </div>
                  <p className="text-xs font-bold text-[#0F172A]">Weekly</p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Every 7 days</p>
                  {formData.frequency === "weekly" && (
                    <div className="absolute top-3 right-3 h-4 w-4 rounded-full bg-[#006C49] flex items-center justify-center text-white text-[9px]">
                      ✓
                    </div>
                  )}
                </div>

                {/* Bi-weekly Card */}
                <div
                  onClick={() => setFormData((prev) => ({ ...prev, frequency: "bi-weekly" }))}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.frequency === "bi-weekly"
                      ? "border-[#006C49] bg-white"
                      : "border-gray-100 bg-[#F8FAFC]/60 hover:bg-[#F1F5F9]"
                  }`}
                >
                  <div className="h-8 w-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                   <CalendarCheck size={18} className="text-[#64748B]"/>
                  </div>
                  <p className="text-xs font-bold text-[#0F172A]">Bi-weekly</p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Every 14 days</p>
                  {formData.frequency === "bi-weekly" && (
                    <div className="absolute top-3 right-3 h-4 w-4 rounded-full bg-[#006C49] flex items-center justify-center text-white text-[9px]">
                      ✓
                    </div>
                  )}
                </div>

                {/* Monthly Card */}
                <div
                  onClick={() => setFormData((prev) => ({ ...prev, frequency: "monthly" }))}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.frequency === "monthly"
                      ? "border-[#006C49] bg-white"
                      : "border-gray-100 bg-[#F8FAFC]/60 hover:bg-[#F1F5F9]"
                  }`}
                >
                  <div className="h-8 w-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                    <CalendarCheck size={18} className="text-[#64748B]"/>
                  </div>
                  <p className="text-xs font-bold text-[#0F172A]">Monthly</p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Once a month</p>
                  {formData.frequency === "monthly" && (
                    <div className="absolute top-3 right-3 h-4 w-4 rounded-full bg-[#006C49] flex items-center justify-center text-white text-[9px]">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contribution Amount Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.005)]">
              <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <Wallet className="h-4 w-4 text-[#006C49]" />
                Contribution Amount
              </h2>
              <div className="relative flex items-center rounded-xl bg-[#F1F5F9]/60 border border-transparent focus-within:bg-white focus-within:border-gray-200 focus-within:ring-1 focus-within:ring-[#001E2C] transition-all px-4 py-3.5">
                <span className="text-base font-medium text-[#0F172A] select-none mr-2">₦</span>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.contributionAmount || ""}
                  onChange={handleAmountChange}
                  className="w-full bg-transparent border-0 outline-none text-base font-semibold text-[#0F172A] p-0 m-0"
                />
                <span className="text-xs text-[#94A3B8] select-none ml-2 whitespace-nowrap">per member</span>
              </div>
            </div>

            {/* First Payout Recipient Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.005)]">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-[#006C49]" />
                  First Payout Recipient
                </h2>
                <p className="text-xs text-[#64748B]">
                  Who receives the collected funds first? You can randomize the rest later.
                </p>
              </div>
              <div className="relative flex items-center">
                <select
                  name="firstPayoutRecipient"
                  value={formData.firstPayoutRecipient}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstPayoutRecipient: e.target.value }))}
                  className="w-full appearance-none rounded-lg border-0 bg-[#F1F5F9]/70 py-3.5 px-4 text-sm text-[#0F172A] outline-none transition-all focus:bg-white focus:ring-1 focus:ring-[#001E2C] border border-transparent focus:border-gray-200"
                >
                  <option value="admin">Admin (You)</option>
                  <option value="random">Randomize First Slots</option>
                </select>
                <div className="pointer-events-none absolute right-4 text-[#94A3B8] text-[8px]">
                  ▼
                </div>
              </div>
            </div>

            {/* LOWER FORM NAVIGATION ACTION CONTROLS */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onBack}
                className="px-6 py-2.5 text-xs font-semibold bg-white text-[#475569] border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
              >
                &larr; Back
              </Button>
              <Button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold bg-[#006C49] text-white rounded-lg hover:bg-[#006C49]/90 transition-all flex items-center gap-2 shadow-sm"
              >
                Continue to Members &rarr;
              </Button>
            </div>
          </div>

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
                  {formData.firstPayoutRecipient === "admin" ? "Admin (You)" : "Randomized"}
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