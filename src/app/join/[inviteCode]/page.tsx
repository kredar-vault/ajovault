"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth";
import { setToken } from "@/lib/http";
import { useLogin, useVerifyLoginOtp, useSignup, useVerifyOtp } from "@/hooks/useAuth";
import { useJoinGroupByInvite } from "@/hooks/useGroups";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

type Tab = "login" | "signup";

export default function JoinPage() {
  const params = useParams();
  const router = useRouter();
  const inviteCode = params.inviteCode as string;
  const { user, isAuthenticated, refreshSession } = useSession();
  const queryClient = useQueryClient();
  const joinMutation = useJoinGroupByInvite();

  const [tab, setTab] = useState<Tab>("login");
  const [autoJoining, setAutoJoining] = useState(false);

  // --- Login state ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginOtp, setLoginOtp] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // --- Signup state ---
  const [signupData, setSignupData] = useState({ fullName: "", email: "", phoneNumber: "", password: "", confirmPassword: "" });
  const [signupOtp, setSignupOtp] = useState("");
  const [signupOtpStep, setSignupOtpStep] = useState(false);
  const [signupCountdown, setSignupCountdown] = useState(0);
  const [emailError, setEmailError] = useState("");

  const loginMutation = useLogin();
  const verifyLoginOtpMutation = useVerifyLoginOtp();
  const signupMutation = useSignup();
  const verifyOtpMutation = useVerifyOtp();

  const startCountdown = (setter: (v: number) => void) => {
    setter(60);
    const t = setInterval(() => setter((c) => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; }), 1000);
  };

  const joinAndRedirect = async () => {
    setAutoJoining(true);
    try {
      await joinMutation.mutateAsync(inviteCode);
      toast.success("You have joined the group!");
      router.push("/dashboard");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to join group.";
      if (msg.toLowerCase().includes("already")) {
        toast.success("You are already a member. Redirecting...");
        router.push("/dashboard");
      } else {
        toast.error(msg);
        setAutoJoining(false);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) joinAndRedirect();
  }, [isAuthenticated]);

  // --- Login flow ---
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email: loginEmail, password: loginPassword }, {
      onSuccess: () => { toast.success("Check your email for a code."); setIsOtpStep(true); startCountdown(setCountdown); },
      onError: (err: any) => toast.error(err?.response?.data?.message || "Invalid credentials."),
    });
  };

  const handleLoginOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyLoginOtpMutation.mutate({ email: loginEmail, otp: loginOtp }, {
      onSuccess: async (res) => {
        setToken(res.data.token);
        queryClient.clear();
        await refreshSession();
        await joinAndRedirect();
      },
      onError: (err: any) => toast.error(err?.response?.data?.message || "Invalid code."),
    });
  };

  // --- Signup flow ---
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) { toast.error("Passwords do not match."); return; }
    setEmailError("");
    signupMutation.mutate(signupData, {
      onSuccess: () => { toast.success("Check your email for a code."); setSignupOtpStep(true); startCountdown(setSignupCountdown); },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "";
        if (msg.toLowerCase().includes("already registered") || msg.toLowerCase().includes("already exist")) {
          setEmailError("An account with this email already exists.");
        } else {
          toast.error(msg || "Registration failed.");
        }
      },
    });
  };

  const handleSignupOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOtpMutation.mutate({ email: signupData.email, otp: signupOtp }, {
      onSuccess: async (res) => {
        setToken(res.data.token);
        queryClient.clear();
        await refreshSession();
        await joinAndRedirect();
      },
      onError: (err: any) => toast.error(err?.response?.data?.message || "Invalid code."),
    });
  };

  if (autoJoining || (isAuthenticated && user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001E2C]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-[#10B981] animate-spin mx-auto" />
          <p className="text-sm text-white/70 font-medium">Joining group...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#001E2C] px-4 py-12">
      <div className="w-full max-w-[420px] space-y-6">
        <div className="text-center space-y-1">
          <span className="text-2xl font-bold text-white tracking-tight">Ajo Vault</span>
          <p className="text-sm text-white/50">You have been invited to join a savings circle.</p>
          <p className="text-xs text-[#10B981] font-mono bg-white/5 px-3 py-1 rounded-full inline-block mt-1">
            {inviteCode}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 space-y-5 shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 pb-2.5 text-xs font-bold transition-all ${tab === "login" ? "border-b-2 border-[#006C49] text-[#006C49]" : "text-gray-400 hover:text-gray-600"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 pb-2.5 text-xs font-bold transition-all ${tab === "signup" ? "border-b-2 border-[#006C49] text-[#006C49]" : "text-gray-400 hover:text-gray-600"}`}
            >
              Create Account
            </button>
          </div>

          {/* LOGIN TAB */}
          {tab === "login" && !isOtpStep && (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Email</label>
                <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-1 focus:ring-[#001E2C]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Password</label>
                <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-1 focus:ring-[#001E2C]" />
              </div>
              <button type="submit" disabled={loginMutation.isPending}
                className="w-full py-3.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-60">
                {loginMutation.isPending ? "Sending code..." : "Continue"}
              </button>
            </form>
          )}

          {tab === "login" && isOtpStep && (
            <form className="space-y-4" onSubmit={handleLoginOtpSubmit}>
              <p className="text-xs text-gray-500">Enter the code sent to <span className="font-semibold text-gray-700">{loginEmail}</span></p>
              <input type="text" inputMode="numeric" maxLength={6} required value={loginOtp}
                onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, ""))} placeholder="123456" autoFocus
                className="w-full rounded-lg bg-[#F1F5F9]/60 py-4 px-4 text-center text-2xl font-mono tracking-[0.5em] text-gray-900 outline-none border-0 focus:ring-1 focus:ring-[#001E2C]" />
              <button type="submit" disabled={verifyLoginOtpMutation.isPending || loginOtp.length < 6}
                className="w-full py-3.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-60">
                {verifyLoginOtpMutation.isPending ? "Verifying..." : "Verify & Join"}
              </button>
              <div className="flex justify-between text-xs text-gray-500">
                <button type="button" onClick={() => { setIsOtpStep(false); setLoginOtp(""); }} className="underline">Back</button>
                {countdown > 0 ? <span>Resend in {countdown}s</span> : <button type="button" onClick={() => loginMutation.mutate({ email: loginEmail, password: loginPassword }, { onSuccess: () => startCountdown(setCountdown) })} className="text-[#10B981] underline font-semibold">Resend code</button>}
              </div>
            </form>
          )}

          {/* SIGNUP TAB */}
          {tab === "signup" && !signupOtpStep && (
            <form className="space-y-4" onSubmit={handleSignupSubmit}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Full Name</label>
                <input type="text" required value={signupData.fullName} onChange={(e) => setSignupData(p => ({ ...p, fullName: e.target.value }))} placeholder="John Doe"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-1 focus:ring-[#001E2C]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Email</label>
                <input type="email" required value={signupData.email}
                  onChange={(e) => { setEmailError(""); setSignupData(p => ({ ...p, email: e.target.value })); }} placeholder="you@example.com"
                  className={`w-full rounded-lg py-3 px-4 text-sm text-gray-900 outline-none border focus:ring-1 ${emailError ? "border-red-400 bg-red-50/40 focus:ring-red-400" : "border-0 bg-[#F1F5F9]/60 focus:ring-[#001E2C]"}`} />
                {emailError && <p className="text-xs text-red-500 font-medium">{emailError} <button type="button" onClick={() => setTab("login")} className="underline font-bold text-red-600">Sign in instead</button></p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Phone Number</label>
                <input type="tel" required value={signupData.phoneNumber} onChange={(e) => setSignupData(p => ({ ...p, phoneNumber: e.target.value }))} placeholder="+234 800 000 0000"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-1 focus:ring-[#001E2C]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Password</label>
                <input type="password" required value={signupData.password} onChange={(e) => setSignupData(p => ({ ...p, password: e.target.value }))} placeholder="••••••••"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-1 focus:ring-[#001E2C]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Confirm Password</label>
                <input type="password" required value={signupData.confirmPassword} onChange={(e) => setSignupData(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="••••••••"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-1 focus:ring-[#001E2C]" />
              </div>
              <button type="submit" disabled={signupMutation.isPending}
                className="w-full py-3.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-60">
                {signupMutation.isPending ? "Creating Account..." : "Create Account & Join"}
              </button>
            </form>
          )}

          {tab === "signup" && signupOtpStep && (
            <form className="space-y-4" onSubmit={handleSignupOtpSubmit}>
              <p className="text-xs text-gray-500">Enter the code sent to <span className="font-semibold text-gray-700">{signupData.email}</span></p>
              <input type="text" inputMode="numeric" maxLength={6} required value={signupOtp}
                onChange={(e) => setSignupOtp(e.target.value.replace(/\D/g, ""))} placeholder="123456" autoFocus
                className="w-full rounded-lg bg-[#F1F5F9]/60 py-4 px-4 text-center text-2xl font-mono tracking-[0.5em] text-gray-900 outline-none border-0 focus:ring-1 focus:ring-[#001E2C]" />
              <button type="submit" disabled={verifyOtpMutation.isPending || signupOtp.length < 6}
                className="w-full py-3.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-60">
                {verifyOtpMutation.isPending ? "Verifying..." : "Verify & Join"}
              </button>
              <div className="flex justify-between text-xs text-gray-500">
                <button type="button" onClick={() => { setSignupOtpStep(false); setSignupOtp(""); }} className="underline">Back</button>
                {signupCountdown > 0 ? <span>Resend in {signupCountdown}s</span> : <button type="button" onClick={() => signupMutation.mutate(signupData, { onSuccess: () => startCountdown(setSignupCountdown) })} className="text-[#10B981] underline font-semibold">Resend code</button>}
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-white/30">
          <Link href="/" className="hover:text-white/60 transition-colors">Back to AjoVault</Link>
        </p>
      </div>
    </div>
  );
}
