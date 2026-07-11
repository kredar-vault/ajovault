"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Coins, ArrowRight, Users, Calendar, Shield } from "lucide-react";

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-[#001E2C] text-white overflow-hidden relative selection:bg-[#006C49]/30">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#19AEE8]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="w-full bg-[#001E2C]/80 border-b border-white/5 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/icon.svg" alt="Ajo Vault" width={22} height={22} className="brightness-0 invert" />
          <span className="text-base font-bold tracking-tight text-white">Ajo Vault</span>
        </div>
        <Link
          href="/questions"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-lg text-xs font-semibold backdrop-blur-md transition-all group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to Onboarding
        </Link>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006C49]/20 border border-[#006C49]/40 text-xs font-semibold text-[#10B981] animate-fade-in">
          <Coins className="h-3 w-3" /> Rotational Savings Circles
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
          Collective Savings, <br />
          <span className="bg-gradient-to-r from-[#10B981] to-[#19AEE8] bg-clip-text text-transparent">
            Reimagined.
          </span>
        </h1>
        
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
          Ajo Vault modernizes the traditional rotating savings system (Ajo, Esusu, Pardna, Chit Fund). 
          Save systematically, build trust with family and friends, and reach your goals faster.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/questions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#006C49] hover:bg-[#005439] text-white text-sm font-bold rounded-lg transition-all shadow-lg active:scale-[0.99]"
          >
            Start My Savings Circle <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-lg transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* Grid of Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-[#006C49]/35 hover:bg-white/[0.07] transition-all duration-300">
          <div className="h-10 w-10 rounded-xl bg-[#006C49]/20 border border-[#006C49]/40 flex items-center justify-center text-[#10B981]">
            <Users className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Trust-Based Groups</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Create or join savings groups with people you trust. Each member contributes a fixed amount per cycle (weekly, bi-weekly, or monthly).
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-[#006C49]/35 hover:bg-white/[0.07] transition-all duration-300">
          <div className="h-10 w-10 rounded-xl bg-[#19AEE8]/20 border border-[#19AEE8]/40 flex items-center justify-center text-[#19AEE8]">
            <Calendar className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Fair Rotational Payouts</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Each cycle, the total pool contributed by all members is disbursed to one selected recipient. The cycle continues until everyone receives their payout.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-[#006C49]/35 hover:bg-white/[0.07] transition-all duration-300">
          <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Shield className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Security & Audit Trails</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Every deposit, rotation schedule, and disbursement is audited and tracked transparently, powered by Kredar's institutional-grade vaults.
          </p>
        </div>
      </section>

      {/* Details / How it works timeline */}
      <section className="bg-white/[0.02] border-y border-white/5 py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How a Savings Rotation Works</h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto">A quick timeline of a typical 5-member circle contributing ₦50,000 monthly.</p>
          </div>

          <div className="relative border-l border-white/10 pl-6 sm:pl-8 space-y-8 max-w-xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#10B981] border-4 border-[#001E2C]" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981]">Month 1: Initial Launch</span>
                <h3 className="text-sm sm:text-base font-bold text-white">All 5 members deposit ₦50,000</h3>
                <p className="text-xs text-gray-400">The total pool of ₦250,000 is collected and paid out to Recipient #1.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#19AEE8] border-4 border-[#001E2C]" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#19AEE8]">Month 2: Next Rotation</span>
                <h3 className="text-sm sm:text-base font-bold text-white">Everyone deposits another ₦50,000</h3>
                <p className="text-xs text-gray-400">Recipient #2 receives the lump sum payout of ₦250,000. Recipient #1 continues to contribute.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-purple-400 border-4 border-[#001E2C]" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Month 5: Completion</span>
                <h3 className="text-sm sm:text-base font-bold text-white">Cycle complete</h3>
                <p className="text-xs text-gray-400">By the end of Month 5, all 5 members have contributed ₦250,000 total and each has received their ₦250,000 payout.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Ajo Vault. Powered by Kredar. All rights reserved.
      </footer>
    </div>
  );
}
