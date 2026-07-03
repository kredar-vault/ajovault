"use client";
import React, { useState, useRef } from "react";

interface OTPModalProps {
  isOpen: boolean;
  type: "signup" | "forgot-password";
  onClose?: () => void;
  onVerifySuccess?: () => void;
}

export function OTPModal({ isOpen, type, onClose, onVerifySuccess }: OTPModalProps) {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 sm:p-10 transition-all border border-gray-100 space-y-6">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold text-gray-900">
            {type === "signup" ? "Verify Your Account" : "Verify Your Identity"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-[280px] mx-auto">
            We sent a 4-digit code to your email account. Enter it below to proceed.
          </p>
        </div>

        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            if (onVerifySuccess) onVerifySuccess(); 
          }} 
          className="space-y-6"
        >
          <div className="flex justify-center gap-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => { inputRefs.current[index] = el!; }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-14 w-14 rounded-xl border border-gray-200 bg-gray-50/50 text-center text-xl font-bold text-gray-900 outline-none transition-all focus:border-[#001E2C] focus:bg-white focus:ring-1 focus:ring-[#001E2C]"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#006C49]/90 active:scale-[0.995]"
          >
            Verify Code
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Didn&apos;t receive any code?{" "}
          <button type="button" className="font-semibold text-[#10B981] hover:underline focus:outline-none">
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}