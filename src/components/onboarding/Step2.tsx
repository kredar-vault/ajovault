"use client";

import React, { useState } from "react";
import { Users, Flag } from "lucide-react";

interface Step2Props {
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export interface Step2Data {
  groupName: string;
  primaryPurpose: string;
  expectedMembers: string;
}

export function Step2SavingsCircle({ onNext, onBack }: Step2Props) {
  // FIX: Provide an initial state object to satisfy the Step2Data interface
  const [formData, setFormData] = useState<Step2Data>({
    groupName: "",
    primaryPurpose: "",
    expectedMembers: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // TypeScript will now correctly recognize 'prev' as Step2Data
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="w-full max-w-[520px] space-y-6 relative z-10">
      
      {/* PROGRESS INDICATOR BLOCK */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
          <span>Step 2 of 5</span>
          <span>20%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#E2E8F0]">
          <div className="h-full w-[20%] rounded-full bg-[#10B981]" />
        </div>
      </div>

      {/* MAIN FORM CARD */}
      <main className="rounded-[10px] border border-gray-100 bg-white p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Tell us about your savings circle
          </h1>
          <p className="text-sm leading-relaxed text-[#64748B]">
            Every great journey starts with a destination. Let's name your group and set its primary goal.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Group Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#334155]">Group Name</label>
            <div className="relative flex items-center">
              <Users className="absolute left-4 h-4 w-4 text-[#94A3B8]" />
              <input
                type="text"
                name="groupName"
                required
                value={formData.groupName}
                onChange={handleInputChange}
                placeholder="e.g. Dream Vacation Fund"
                className="w-full rounded-lg border-0 bg-[#F1F5F9]/70 py-3.5 pl-11 pr-4 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:bg-[#F1F5F9] focus:ring-1 focus:ring-[#001E2C]"
              />
            </div>
          </div>

          {/* Primary Purpose */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#334155]">Primary Purpose</label>
            <div className="relative flex items-center">
              <Flag className="absolute left-4 h-4 w-4 text-[#94A3B8]" />
              <select
                name="primaryPurpose"
                required
                value={formData.primaryPurpose}
                onChange={handleInputChange}
                className="w-full appearance-none rounded-lg border-0 bg-[#F1F5F9]/70 py-3.5 pl-11 pr-10 text-sm text-[#0F172A] outline-none transition-all focus:bg-[#F1F5F9] focus:ring-1 focus:ring-[#001E2C]"
              >
                <option value="" disabled hidden>Select a goal...</option>
                <option value="vacation">Vacation & Travel</option>
                <option value="business">Business Investment</option>
                <option value="emergency">Emergency Reserve</option>
                <option value="property">Asset & Property Purchase</option>
              </select>
              <div className="pointer-events-none absolute right-4 flex flex-col text-[#94A3B8]">
                <span className="text-[8px] leading-none">▲</span>
                <span className="text-[8px] leading-none">▼</span>
              </div>
            </div>
          </div>

          {/* Expected Members */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#334155]">Expected Number of Members</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-sm font-medium text-[#94A3B8] select-none leading-none">e.g.</span>
              <input
                type="number"
                name="expectedMembers"
                required
                min="2"
                value={formData.expectedMembers}
                onChange={handleInputChange}
                placeholder="5"
                className="w-full rounded-lg border-0 bg-[#F1F5F9]/70 py-3.5 pl-12 pr-4 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:bg-[#F1F5F9] focus:ring-1 focus:ring-[#001E2C]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={onBack}
              className="rounded-md border border-gray-200 bg-white px-6 py-2 text-xs font-semibold text-[#475569] shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]"
            >
              &larr; Back
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#006C49] px-6 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#10B981]/90 active:scale-[0.98]"
            >
              Next Step &rarr;
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}