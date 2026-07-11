"use client";
import { useForgotPassword } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface ForgotPasswordProps {
  onResetSubmitted?: (email: string) => void;
}

export function ForgotPassword({ onResetSubmitted }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("Password reset link sent to your email!");
          if (onResetSubmitted) {
            onResetSubmitted(email);
          }
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
        },
      }
    );
  };

  return (
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

      <div className="w-full max-w-[440px] rounded-[10px] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/80 space-y-6 relative z-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Forgot your password?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Enter your email address and we&apos;ll send you a secure password reset link.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              disabled={forgotPasswordMutation.isPending}
              className="w-full rounded-lg border-0 bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-gray-100/80 focus:ring-1 focus:ring-[#001E2C] disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#006C49]/90 active:scale-[0.995] disabled:opacity-60 disabled:pointer-events-none"
          >
            {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link →"}
          </button>
        </form>

        <Link
          href="/login"
          className="w-full block rounded-lg border border-gray-200 bg-white py-3.5 text-center text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50/80 active:scale-[0.995]"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}