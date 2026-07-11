"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";
import { Step2SavingsCircle, Step2Data } from "@/components/onboarding/Step2";
import { Step3FinancialRules, Step3Data } from "@/components/onboarding/Step3";
import { StepInviteMembers } from "@/components/onboarding/invite";
import { Step5Review } from "@/components/onboarding/Step5";
import { Step5Loading } from "@/components/onboarding/Step5Loading";
import { Step5Success } from "@/components/onboarding/Step5Sucess";
import { useGroupOnboarding } from "@/hooks/useGroupOnboarding";

export default function OnboardingQuestionsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("");

  const { createGroup, error: apiError } = useGroupOnboarding();

  const [onboardingPayload, setOnboardingPayload] = useState({
    circleDetails: null as Step2Data | null,
    financialRules: null as Step3Data | null,
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ajovault_onboarding_progress");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (typeof parsed.currentStep === "number") {
            setCurrentStep(parsed.currentStep);
          }
          if (parsed.groupId) {
            setGroupId(parsed.groupId);
          }
          if (parsed.onboardingPayload) {
            setOnboardingPayload(parsed.onboardingPayload);
          }
        } catch (e) {
          console.error("Failed to restore onboarding progress", e);
        }
      }
    }
  }, []);

  // Save progress to localStorage whenever state changes (except success step)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentStep === 6) {
        localStorage.removeItem("ajovault_onboarding_progress");
      } else {
        const progress = {
          currentStep,
          groupId,
          onboardingPayload,
        };
        localStorage.setItem("ajovault_onboarding_progress", JSON.stringify(progress));
      }
    }
  }, [currentStep, groupId, onboardingPayload]);

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);

  const handlePrevStep = () =>
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));

  const runTransition = (message: string, nextAction: () => void) => {
    setTransitionMessage(message);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      nextAction();
    }, 2000);
  };

  const handleWelcomeComplete = () => {
    runTransition("Please wait ...", handleNextStep);
  };

  const handleStep2Complete = (data: Step2Data) => {
    setOnboardingPayload((prev) => ({
      ...prev,
      circleDetails: data,
    }));
    runTransition("Please wait ...", handleNextStep);
  };

  const handleStep3Complete = (data: Step3Data) => {
    setOnboardingPayload((prev) => ({
      ...prev,
      financialRules: data,
    }));
    runTransition("Please wait ...", handleNextStep);
  };

  const triggerCreationSequence = async () => {
    // Show loading screen animation (Step 5)
    setCurrentStep(4);

    try {
      const finalPayload = {
        name: onboardingPayload.circleDetails?.groupName || "",
        primaryPurpose: onboardingPayload.circleDetails?.groupName || "Savings Circle Group",
        contributionAmount: targetAmount,
        frequency: targetFrequency,
        maxMembers: parsedGroupSize,
      };

      // Call POST /groups endpoint
      const response = await createGroup(finalPayload);

      // Save backend resource reference identifier
      setGroupId(response.id);

      // Shift forward to Invitation Layout (Step 6)
      setCurrentStep(5);
    } catch (err) {
      console.error("Group initialization error:", err);
      // Fallback gracefully to review page so user can retry
      setCurrentStep(3);
    }
  };

  const finishInvites = () => {
    runTransition("Finalizing setups...", () => {
      setCurrentStep(6);
    });
  };

  const targetGroupName =
    onboardingPayload.circleDetails?.groupName || "Weekend Warriors Fund";

  const parsedGroupSize =
    parseInt(
      onboardingPayload.circleDetails?.expectedMembers || "5",
      10
    ) || 5;

  const targetAmount =
    onboardingPayload.financialRules?.contributionAmount || 500;

  const targetFrequency =
    onboardingPayload.financialRules?.frequency || "monthly";

  if (isTransitioning) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#001E2C] text-white">
        <Loader2 className="h-10 w-10 text-[#006C49] animate-spin" />
        <p className="mt-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">{transitionMessage}</p>
      </div>
    );
  }

  return (
    <>
      {/* Toast alert system handling system notifications */}
      {apiError && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-red-50 border border-red-200 p-4 shadow-md text-xs text-red-600 font-medium">
          {apiError}
        </div>
      )}

      {(currentStep === 0 || currentStep === 1) && (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-brand-secondary px-4 py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent_30%)]" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-[#19AEE8]/5 blur-[130px]" />

          {/* Floating Back to Dashboard Button */}
          <div className="absolute top-6 left-6 z-20">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-black rounded-lg text-xs font-semibold backdrop-blur-md transition-all shadow-sm group"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to Dashboard
            </Link>
          </div>

          {currentStep === 0 && (
            <WelcomeStep onNext={handleWelcomeComplete} />
          )}

          {currentStep === 1 && (
            <Step2SavingsCircle
              onNext={handleStep2Complete}
              onBack={handlePrevStep}
            />
          )}
        </div>
      )}

      {currentStep === 2 && (
        <Step3FinancialRules
          expectedMembers={parsedGroupSize}
          onNext={handleStep3Complete}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 3 && (
        <Step5Review
          groupName={targetGroupName}
          contributionAmount={targetAmount}
          frequency={targetFrequency}
          expectedMembers={parsedGroupSize}
          onConfirm={triggerCreationSequence}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 4 && <Step5Loading />}

      {currentStep === 5 && (
        <StepInviteMembers
          groupId={groupId || ""}
          groupName={targetGroupName}
          expectedMembers={parsedGroupSize}
          onNext={finishInvites}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 6 && (
        <Step5Success
          groupName={targetGroupName}
          contributionAmount={targetAmount}
          frequency={targetFrequency}
        />
      )}
    </>
  );
}