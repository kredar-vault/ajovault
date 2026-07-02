"use client"

import { useState } from "react";

export function InfrastructureFlow() {
  const [activeStep, setActiveStep] = useState(0);

  const nodes = [
    {
      label: "Member",
      subLabel: "Starts a Transfer",
      desc: "A member sends their contribution from any Nigerian bank using their dedicated account number.",
      metric: "Payment Started",
    },
    {
      label: "Dedicated Account",
      subLabel: "Personal Account",
      desc: "Each member has their own dedicated virtual account, so every payment is linked to the right person automatically.",
      metric: "Unique Account",
    },
    {
      label: "Nomba",
      subLabel: "Payment Processing",
      desc: "Nomba securely receives and processes the bank transfer before notifying Kredar.",
      metric: "Payment Received",
    },
    {
      label: "Kredar",
      subLabel: "Automatic Verification",
      desc: "Kredar matches the payment to the correct member and reconciles everything behind the scenes.",
      metric: "Payment Verified",
    },
    {
      label: "Ajo Vault",
      subLabel: "Savings Circle Updated",
      desc: "The contribution is added to the savings circle and everyone's progress updates in real time.",
      metric: "Circle Updated",
    },
    {
      label: "Complete",
      subLabel: "Contribution Recorded",
      desc: "The member is marked as paid for the current contribution cycle. No manual confirmation needed.",
      metric: "Completed",
    },
  ];

  return (
    <section className="w-full bg-[#FCFBF7] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-100/50 md:p-10">
          <div className="flex items-center gap-3 overflow-x-auto border-b border-gray-100 pb-6 scrollbar-none">
            {nodes.map((node, index) => {
              const isActive = activeStep === index;

              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`group flex min-w-[220px] flex-1 items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#169E5C]/20 bg-[#169E5C]/5 shadow-sm"
                      : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-[#006C49] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-gray-400">
                      {node.subLabel}
                    </p>

                    <p
                      className={`mt-1 truncate text-sm font-semibold transition-colors ${
                        isActive ? "text-[#0F172A]" : "text-gray-700"
                      }`}
                    >
                      {node.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid min-h-[190px] grid-cols-1 items-center gap-8 pt-10 md:grid-cols-12">
            <div className="space-y-4 md:col-span-8">
              <span className="inline-flex rounded-full bg-[#169E5C]/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#169E5C]">
                Step {activeStep + 1} of {nodes.length}
              </span>

              <h3 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                {nodes[activeStep].label}
              </h3>

              <p className="max-w-xl text-[15px] leading-7 text-gray-600">
                {nodes[activeStep].desc}
              </p>
            </div>

            <div className="flex flex-col justify-center space-y-3 border-t border-gray-100 pt-6 md:col-span-4 md:items-end md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Current Status
              </span>

              <div className="rounded-xl bg-[#006C49] px-4 py-2 text-xs font-semibold uppercase text-white shadow-sm">
                {nodes[activeStep].metric}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}