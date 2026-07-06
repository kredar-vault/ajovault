"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";
import { Step2SavingsCircle, Step2Data } from "@/components/onboarding/Step2";
import { Step3FinancialRules, Step3Data } from "@/components/onboarding/Step3";
import { StepInviteMembers } from "@/components/onboarding/invite";
import { Step5Review } from "@/components/onboarding/Step5";
import { Step5Loading } from "@/components/onboarding/Step5Loading";
import { Step5Success } from "@/components/onboarding/Step5Sucess";
import { useGroupOnboarding } from "@/hooks/useGroupOnboardig";


export default function OnboardingQuestionsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [groupId, setGroupId] = useState<string | null>(null);

  const { createGroup, error: apiError } = useGroupOnboarding();

  const [onboardingPayload, setOnboardingPayload] = useState({
    circleDetails: null as Step2Data | null,
    financialRules: null as Step3Data | null,
  });

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);

  const handlePrevStep = () =>
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));

  const handleStep2Complete = (data: Step2Data) => {
    setOnboardingPayload((prev) => ({
      ...prev,
      circleDetails: data,
    }));
    handleNextStep();
  };

  const handleStep3Complete = (data: Step3Data) => {
    setOnboardingPayload((prev) => ({
      ...prev,
      financialRules: data,
    }));
    handleNextStep();
  };

  const triggerCreationSequence = async () => {
    // Show loading screen animation (Step 5)
    setCurrentStep(4);

    try {
      const finalPayload = {
        groupName: onboardingPayload.circleDetails?.groupName || "",
        // Fixes the 'purpose does not exist on Step2Data' error by supplying an automatic placeholder
        purpose: onboardingPayload.circleDetails?.groupName || "Savings Circle Group",
        expectedMembers: parsedGroupSize,
        frequency: targetFrequency,
        contributionAmount: targetAmount,
        firstPayoutRecipient: onboardingPayload.financialRules?.firstPayoutRecipient || "creator",
      };

      // Call POST /groups endpoint
      const response = await createGroup(finalPayload);

      // Save backend resource reference identifier
      setGroupId(response.groupId);

      // Shift forward to Invitation Layout (Step 6)
      setCurrentStep(5);
    } catch (err) {
      console.error("Group initialization error:", err);
      // Fallback gracefully to review page so user can retry
      setCurrentStep(3);
    }
  };

  const finishInvites = () => {
    setCurrentStep(6);
  };

  const handleFinalRedirect = () => {
    if (groupId) {
      router.push(`/dashboard/${groupId}`);
    } else {
      router.push("/dashboard");
    }
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

          {currentStep === 0 && (
            <WelcomeStep onNext={handleNextStep} />
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