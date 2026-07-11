"use client";
import { ForgotPassword } from "@/components/auth/ForgotPassword";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function ForgotPasswordWorkflow() {
  const [step, setStep] = useState<"email" | "sent">("email");
  const [email, setEmail] = useState("");

  return (
    <>
      {/* 1. Enter Email Page */}
      {step === "email" && (
        <ForgotPassword onResetSubmitted={(submittedEmail) => {
          setEmail(submittedEmail);
          setStep("sent");
        }} />
      )}

      {/* 2. Check Email Notification Screen */}
      {step === "sent" && (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F8FAFC] px-4 py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)] z-0" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#19AEE8]/15 blur-[120px] z-0" />

          <div className="flex items-center gap-2 mb-8 relative z-10">
            <Image
              src="/icon.svg"
              alt="Ajo Vault"
              width={22}
              height={22}
              className="text-[#006C49]"
            />
            <span className="text-lg font-bold tracking-tight text-[#001E2C]">
              Ajo Vault
            </span>
          </div>

          <div className="w-full max-w-[440px] rounded-[10px] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/80 space-y-6 relative z-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981]">
              <Mail className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Check your email
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                We sent a secure password reset link to <strong className="text-gray-900">{email}</strong>. Please check your inbox and click the link to reset your password.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#006C49]/90 active:scale-[0.995]"
              >
                Proceed to Login <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="text-xs text-gray-500">
              Didn&apos;t receive the email?{" "}
              <button
                type="button"
                onClick={() => setStep("email")}
                className="font-semibold text-[#10B981] hover:underline focus:outline-none"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}