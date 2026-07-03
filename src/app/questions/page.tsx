"use client";
import React, { useState } from "react";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";

export default function OnboardingQuestionsPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F8FAFC] px-4 py-12 relative overflow-hidden">
      {/* Background radial effects explicitly matching image_e95ff1.png */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent_30%)] z-0" />
      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-[#19AEE8]/5 blur-[130px] z-0" />

      {/* Render Steps */}
      {currentStep === 0 && (
        <WelcomeStep onNext={handleNextStep} />
      )}

      {currentStep > 0 && (
        <div className="relative z-10 text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Step {currentStep} Component Goes Here</h2>
          <button 
            onClick={handleNextStep}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs"
          >
            Next Mock Step
          </button>
        </div>
      )}
    </div>
  );
}