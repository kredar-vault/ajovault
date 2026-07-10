"use client";
import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useResetPassword } from "@/hooks/useAuth";

interface ResetPasswordProps {
  onPasswordResetComplete?: () => void;
}

export function ResetPassword({ onPasswordResetComplete }: ResetPasswordProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const resetPasswordMutation = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!email) {
      toast.error("Missing email. Please restart the password reset flow.");
      return;
    }

    resetPasswordMutation.mutate(
      {
        email,
        newPassword: password,
        confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password updated successfully! Please sign in.");
          if (onPasswordResetComplete) {
            onPasswordResetComplete();
          } else {
            router.push("/login");
          }
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to reset password.");
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F8FAFC] px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)] z-0" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#19AEE8]/15 blur-[120px] z-0" />

      <div className="w-full max-w-[440px] rounded-[10px] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/80 space-y-6 relative z-10">

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Choose a strong secure password you haven&apos;t used before.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">New Password</label>
            <div className="relative flex items-center">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={resetPasswordMutation.isPending}
                className="w-full rounded-lg border-0 bg-[#F1F5F9]/60 py-3 pl-4 pr-12 text-sm text-gray-900 outline-none transition-all focus:bg-gray-100/80 focus:ring-1 focus:ring-[#001E2C] disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 text-xs font-bold text-gray-400 hover:text-gray-600 focus:outline-none select-none"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Confirm New Password</label>
            <div className="relative flex items-center">
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={resetPasswordMutation.isPending}
                className="w-full rounded-lg border-0 bg-[#F1F5F9]/60 py-3 pl-4 pr-12 text-sm text-gray-900 outline-none transition-all focus:bg-gray-100/80 focus:ring-1 focus:ring-[#001E2C] disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 text-xs font-bold text-gray-400 hover:text-gray-600 focus:outline-none select-none"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="w-full rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#006C49]/90 active:scale-[0.995] disabled:opacity-60 disabled:pointer-events-none"
          >
            {resetPasswordMutation.isPending ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}