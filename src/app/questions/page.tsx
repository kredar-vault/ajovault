"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";
import { Step2SavingsCircle, Step2Data } from "@/components/onboarding/Step2";
import { Step3FinancialRules, Step3Data } from "@/components/onboarding/Step3";
import { StepInviteMembers } from "@/components/onboarding/invite";
import { Step5Review } from "@/components/onboarding/Step5";
import { Step5Loading } from "@/components/onboarding/Step5Loading";
import { Step5Success } from "@/components/onboarding/Step5Sucess";
import { useGroupOnboarding } from "@/hooks/useGroupOnboarding";
import { useAccount } from "@/hooks/useAccount";

import { getToken } from "@/lib/http";

function getContactDetailsFromToken() {
  try {
    const token = getToken();
    if (!token) return { email: "", phone: "" };
    const base64Url = token.split('.')[1];
    if (!base64Url) return { email: "", phone: "" };
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    console.log("ONBOARDING JWT CLAIM DIAGNOSTICS:", payload);
    
    const email = payload.email || 
                  payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || 
                  "";
                  
    const phone = payload.phone || 
                  payload.phoneNumber || 
                  payload.phone_number ||
                  payload["http://schemas.xmlsoap.org/ws/2008/06/identity/claims/mobilephone"] || 
                  "";
                  
    return { email, phone };
  } catch (e) {
    console.error("Failed to decode token", e);
    return { email: "", phone: "" };
  }
}

export default function OnboardingQuestionsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState("");

  const { createGroup, error: apiError } = useGroupOnboarding();
  const { data: account } = useAccount();
  console.log("ONBOARDING RENDER - account:", account);

  const [onboardingPayload, setOnboardingPayload] = useState({
    circleDetails: null as Step2Data | null,
    financialRules: null as Step3Data | null,
  });

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
    runTransition("Loading circle details...", handleNextStep);
  };

  const handleStep2Complete = (data: Step2Data) => {
    setOnboardingPayload((prev) => ({
      ...prev,
      circleDetails: data,
    }));
    runTransition("Analyzing target parameters...", handleNextStep);
  };

  const handleStep3Complete = (data: Step3Data) => {
    setOnboardingPayload((prev) => ({
      ...prev,
      financialRules: data,
    }));
    runTransition("Formulating rotation cycles...", handleNextStep);
  };

  const triggerCreationSequence = async () => {
    // Show loading screen animation (Step 5)
    setCurrentStep(4);

    try {
      const tokenDetails = getContactDetailsFromToken();
      const finalPayload = {
        name: onboardingPayload.circleDetails?.groupName || "",
        purpose: onboardingPayload.circleDetails?.primaryPurpose || "Savings Circle Group",
        maxMembers: parsedGroupSize,
        frequency: targetFrequency,
        contributionAmount: targetAmount,
        firstPayoutRecipient: onboardingPayload.financialRules?.firstPayoutRecipient || "creator",
        contactEmail: tokenDetails.email || account?.email || "",
        contactPhone: tokenDetails.phone || account?.phoneNumber || "",
      };

      console.log("ONBOARDING DIAGNOSTICS - account object:", account);
      console.log("ONBOARDING DIAGNOSTICS - finalPayload being sent:", finalPayload);

      // Call POST /groups endpoint
      const response = await createGroup(finalPayload);

      // Save backend resource reference identifier
      setGroupId(response.groupId);

      // Shift forward to Invitation Layout (Step 6)
      setCurrentStep(5);
    } catch (err: any) {
      console.error("Group initialization error:", err);
      if (err?.response?.data) {
        console.error("Group creation validation details:", JSON.stringify(err.response.data, null, 2));
      }
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