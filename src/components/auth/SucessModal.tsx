"use client";
import React from "react";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
}

export function SuccessModal({ isOpen }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#001E2C]/60 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-sm transform rounded-2xl bg-white p-6 sm:p-10 shadow-2xl transition-all border border-gray-100 text-center space-y-5">
        
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981]">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-gray-900">Password Reset</h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Your login details have been updated successfully. You can now use your new password.
          </p>
        </div>

        <Link href="/login" className="block w-full">
          <button
            type="button"
            className="w-full rounded-lg bg-[#001E2C] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#001E2C]/90 active:scale-[0.995]"
          >
            Proceed to Login
          </button>
        </Link>
      </div>
    </div>
  );
}