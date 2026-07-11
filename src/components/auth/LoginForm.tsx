"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "@/lib/auth";
import { useLogin, useVerifyLoginOtp, useResendLoginOtp } from "@/hooks/useAuth";
import { setToken } from "@/lib/http";

export function LoginForm() {
  const router = useRouter();
  const { refreshSession } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const loginMutation = useLogin();
  const verifyOtpMutation = useVerifyLoginOtp();
  const resendOtpMutation = useResendLoginOtp();

  const startCountdown = () => {
    setCountdown(60);
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(t); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Check your email for a verification code.");
          setIsOtpStep(true);
          startCountdown();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Invalid credentials. Please try again.");
        },
      }
    );
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: async (response) => {
          setToken(response.data.token);
          toast.success("Signed in successfully!");
          await refreshSession();
          router.push("/dashboard");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Invalid or expired code.");
        },
      }
    );
  };

  const handleResend = () => {
    resendOtpMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("A new code has been sent.");
          startCountdown();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Could not resend code.");
        },
      }
    );
  };

  if (isOtpStep) {
    return (
      <div className="space-y-8 w-full">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900">Enter verification code</h3>
          <p className="text-sm text-gray-500">
            We sent a 6-digit code to <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleOtpSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Verification Code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              required
              autoFocus
              className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-4 px-4 text-center text-2xl font-mono tracking-[0.5em] text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:border-[#001E2C] focus:bg-white focus:ring-1 focus:ring-[#001E2C]"
            />
          </div>

          <button
            type="submit"
            disabled={verifyOtpMutation.isPending || otp.length < 6}
            className="w-full rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#001E2C]/90 active:scale-[0.995] disabled:opacity-60 disabled:pointer-events-none"
          >
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify & Sign In"}
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <button
            type="button"
            onClick={() => { setIsOtpStep(false); setOtp(""); }}
            className="font-semibold text-gray-400 hover:text-gray-600 underline"
          >
            Back
          </button>
          {countdown > 0 ? (
            <span>Resend in <span className="font-semibold text-gray-700">{countdown}s</span></span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendOtpMutation.isPending}
              className="font-semibold text-[#10B981] hover:underline disabled:opacity-50"
            >
              {resendOtpMutation.isPending ? "Sending..." : "Resend code"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      <form className="space-y-5" onSubmit={handleLoginSubmit}>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-3 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#001E2C] focus:bg-white focus:ring-1 focus:ring-[#001E2C]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-3 pl-4 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#001E2C] focus:bg-white focus:ring-1 focus:ring-[#001E2C]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-gray-600 focus:outline-none select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-gray-600 select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#10B981] focus:ring-[#10B981] accent-[#10B981]"
            />
            <span className="text-sm text-gray-500">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-sm font-semibold text-[#10B981] hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#001E2C]/90 active:scale-[0.995] disabled:opacity-60 disabled:pointer-events-none"
        >
          {loginMutation.isPending ? "Sending code..." : "Sign In"}
        </button>
      </form>

      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t border-gray-100"></div>
        <span className="mx-4 flex-shrink text-[10px] font-bold uppercase tracking-widest text-gray-300">OR</span>
        <div className="flex-grow border-t border-gray-100"></div>
      </div>

      <Link href="/signup">
        <button
          type="button"
          className="w-full rounded-lg border border-gray-200 bg-white py-3.5 text-center text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50/80 active:scale-[0.995]"
        >
          Create an Account
        </button>
      </Link>
    </div>
  );
}
