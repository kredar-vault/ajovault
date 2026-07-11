"use client";

import React from "react";
import { Calendar, Wallet, UserCheck, CalendarCheck } from "lucide-react";
import { Button } from "@/components/shared/Button";
import type { Step3Data } from "./Step3";

interface Step3FormProps {
  formData: Step3Data;
  setFormData: React.Dispatch<React.SetStateAction<Step3Data>>;
  handleSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function Step3Form({ formData, setFormData, handleSubmit, onBack }: Step3FormProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, contributionAmount: val }));
  };

  return (
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
  );
}
