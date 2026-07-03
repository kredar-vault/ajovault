"use client"
import { ForgotPassword } from "@/components/auth/ForgotPassword";
import { OTPModal } from "@/components/auth/Otpmodal";
import { ResetPassword } from "@/components/auth/ResetPassword";
import { SuccessModal } from "@/components/auth/SucessModal";
import { useState } from "react";

export default function ForgotPasswordWorkflow() {
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">("email");

  return (
    <>
      {/* 1. Enter Email Page */}
      {step === "email" && (
        <ForgotPassword onResetSubmitted={() => setStep("otp")} />
      )}

      {/* 2. OTP Verification (Passes email step back to email page on close) */}
      <OTPModal 
      type="forgot-password"
        isOpen={step === "otp"} 
        onClose={() => setStep("email")} 
        onVerifySuccess={() => setStep("reset")} 
      />

      {/* 3. Choose New Password Page */}
      {step === "reset" && (
        <ResetPassword onPasswordResetComplete={() => setStep("success")} />
      )}

      {/* 4. Password Updated Success Confirmation */}
      <SuccessModal type="forgot-password" isOpen={step === "success"} />
    </>
  );
}