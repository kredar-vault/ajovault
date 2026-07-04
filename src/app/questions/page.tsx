"use client";
import React, { useState } from "react";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";
import { Step2SavingsCircle, Step2Data } from "@/components/onboarding/Step2";
import { Step3FinancialRules, Step3Data } from "@/components/onboarding/Step3";
import { Step4InviteMembers } from "@/components/onboarding/Step4";
import { Step5Review } from "@/components/onboarding/Step5";
import { Step5Loading } from "@/components/onboarding/Step5Loading";
import { Step5Success } from "@/components/onboarding/Step5Sucess";

export default function OnboardingQuestionsPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const [onboardingPayload, setOnboardingPayload] = useState({
    circleDetails: null as Step2Data | null,
    financialRules: null as Step3Data | null,
  });

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));

  const handleStep2Complete = (data: Step2Data) => {
    setOnboardingPayload((prev) => ({ ...prev, circleDetails: data }));
    handleNextStep();
  };

  const handleStep3Complete = (data: Step3Data) => {
    setOnboardingPayload((prev) => ({ ...prev, financialRules: data }));
    handleNextStep();
  };

  // Fires the mock loading timer before showcasing the success frame
  const triggerCreationSequence = () => {
    handleNextStep(); // Transition to loader element (step 5)
    setTimeout(() => {
      setCurrentStep(6); // Automatically route forward to the dashboard complete state (step 6)
    }, 2500);
  };

  const targetGroupName = onboardingPayload.circleDetails?.groupName || "Weekend Warriors Fund";
  const parsedGroupSize = parseInt(onboardingPayload.circleDetails?.expectedMembers || "5", 10) || 5;
  const targetAmount = onboardingPayload.financialRules?.contributionAmount || 500;
  const targetFrequency = onboardingPayload.financialRules?.frequency || "monthly";

  return (
    <>
      {/* Container blocks for Early Initialization steps */}
      {currentStep < 2 && (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-brand-secondary px-4 py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent_30%)] z-0" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-[#19AEE8]/5 blur-[130px] z-0" />

          {currentStep === 0 && <WelcomeStep onNext={handleNextStep} />}
          {currentStep === 1 && (
            <Step2SavingsCircle onNext={handleStep2Complete} onBack={handlePrevStep} />
          )}
        </div>
      )}

      {/* Step 3: Cadence Configurations */}
      {currentStep === 2 && (
        <Step3FinancialRules 
          expectedMembers={parsedGroupSize}
          onNext={handleStep3Complete}
          onBack={handlePrevStep}
        />
      )}

      {/* Step 4: Shareable Group Invites */}
      {currentStep === 3 && (
        <Step4InviteMembers
          groupName={targetGroupName}
          expectedMembers={parsedGroupSize}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
      )}

      {/* Step 5: Review Summary Form Section */}
      {currentStep === 4 && (
        <Step5Review
          groupName={targetGroupName}
          contributionAmount={targetAmount}
          frequency={targetFrequency}
          expectedMembers={parsedGroupSize}
          onConfirm={triggerCreationSequence}
          onBack={handlePrevStep}
        />
      )}

      {/* Step 6: Processing Layout */}
      {currentStep === 5 && <Step5Loading />}

      {/* Step 7: Completed State Shell Component */}
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