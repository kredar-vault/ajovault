// src/components/OTPModal.tsx
"use client";

import React, { useState, useRef } from "react";

interface OTPModalProps {
  isOpen: boolean;
  type: "login" | "forgot-password";
  isLoading?: boolean;
  onClose?: () => void;
  onVerify: (otpCode: string) => Promise<void>;
  onResend: () => Promise<void>;
}

export function OTPModal({ isOpen, type, isLoading, onClose, onVerify, onResend }: OTPModalProps) {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  if (!isOpen) return null;

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtpCode = otp.join("");
    if (fullOtpCode.length === 4) {
      await onVerify(fullOtpCode);
    }
  };

  const handleResendClick = async () => {
    setIsResending(true);
    try {
      await onResend();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md transform rounded-[10px] bg-white p-6 sm:p-10 transition-all border border-gray-100 space-y-6 shadow-2xl">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold text-gray-900">
            {type === "login" ? "Verify Your Identity" : "Reset Your Password"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-[280px] mx-auto">
            We sent a 4-digit code to your email account. Enter it below to proceed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                disabled={isLoading || isResending}
                ref={(el) => { inputRefs.current[index] = el!; }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-14 w-14 rounded-xl border border-gray-200 bg-gray-50/50 text-center text-xl font-bold text-gray-900 outline-none transition-all focus:border-[#001E2C] focus:bg-white focus:ring-1 focus:ring-[#001E2C] disabled:opacity-50"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || isResending}
            className="w-full rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#006C49]/90 active:scale-[0.995] disabled:opacity-50 flex justify-center items-center"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Didn&apos;t receive any code?{" "}
          <button 
            type="button" 
            disabled={isLoading || isResending}
            onClick={handleResendClick}
            className="font-semibold text-[#10B981] hover:underline focus:outline-none disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
}