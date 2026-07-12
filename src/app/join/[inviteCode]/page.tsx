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
import { Loader2, CheckCircle2, Users, ArrowRight, ChevronLeft } from "lucide-react";

type Step = "landing" | "email" | "password" | "create-account" | "otp" | "success";

export default function JoinPage() {
  const params = useParams();
  const router = useRouter();
  const inviteCode = params.inviteCode as string;
  const { user, isAuthenticated, refreshSession } = useSession();
  const queryClient = useQueryClient();
  const joinMutation = useJoinGroupByInvite();

  const [step, setStep] = useState<Step>("landing");
  const [joinedGroupName, setJoinedGroupName] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [otpFlow, setOtpFlow] = useState<"login" | "signup">("login");

  // Shared email (carried across steps)
  const [email, setEmail] = useState("");

  // Login state
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  // Signup extra fields
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const loginMutation = useLogin();
  const verifyLoginOtpMutation = useVerifyLoginOtp();
  const signupMutation = useSignup();
  const verifyOtpMutation = useVerifyOtp();

  const startCountdown = () => {
    setCountdown(60);
    const t = setInterval(() => setCountdown((c) => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; }), 1000);
  };

  const joinAndShowSuccess = async () => {
    try {
      const res = await joinMutation.mutateAsync(inviteCode);
      const name = (res as any)?.data?.name || inviteCode;
      setJoinedGroupName(name);
      setStep("success");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "";
      if (msg.toLowerCase().includes("already")) {
        toast.success("You are already a member!");
        router.push("/dashboard");
      } else {
        toast.error(msg || "Failed to join. Please try again.");
      }
    }
  };

  // If already logged in, auto-join
  useEffect(() => {
    if (isAuthenticated && user && step === "landing") {
      joinAndShowSuccess();
    }
  }, [isAuthenticated]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // Take them to password step (they can switch to "new here" from there)
    setStep("password");
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password }, {
      onSuccess: () => {
        setOtpFlow("login");
        toast.success("Check your email for a verification code.");
        setStep("otp");
        startCountdown();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Invalid email or password.");
      },
    });
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match."); return; }
    setEmailError("");
    signupMutation.mutate({ fullName, email, phoneNumber, password: newPassword, confirmPassword }, {
      onSuccess: () => {
        setOtpFlow("signup");
        toast.success("Account created! Check your email for a verification code.");
        setStep("otp");
        startCountdown();
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "";
        if (msg.toLowerCase().includes("already registered") || msg.toLowerCase().includes("already exist")) {
          setEmailError("An account with this email exists.");
          setStep("password"); // push them back to sign in
        } else {
          toast.error(msg || "Registration failed.");
        }
      },
    });
  };

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpFlow === "login") {
      verifyLoginOtpMutation.mutate({ email, otp }, {
        onSuccess: async (res) => {
          setToken(res.data.token);
          queryClient.clear();
          await refreshSession();
          await joinAndShowSuccess();
        },
        onError: (err: any) => toast.error(err?.response?.data?.message || "Invalid code. Try again."),
      });
    } else {
      verifyOtpMutation.mutate({ email, otp }, {
        onSuccess: async (res) => {
          setToken(res.data.token);
          queryClient.clear();
          await refreshSession();
          await joinAndShowSuccess();
        },
        onError: (err: any) => toast.error(err?.response?.data?.message || "Invalid code. Try again."),
      });
    }
  };

  const resendOtp = () => {
    if (otpFlow === "login") {
      loginMutation.mutate({ email, password }, { onSuccess: () => startCountdown() });
    } else {
      signupMutation.mutate({ fullName, email, phoneNumber, password: newPassword, confirmPassword }, { onSuccess: () => startCountdown() });
    }
  };

  // ── Screens ────────────────────────────────────────────────────────────────

  // Loading (auto-join for authenticated user)
  if (joinMutation.isPending || (isAuthenticated && user && step === "landing")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001E2C]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-[#10B981] animate-spin mx-auto" />
          <p className="text-sm text-white/60 font-medium">Joining group...</p>
        </div>
      </div>
    );
  }

  // ── SUCCESS ────────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001E2C] px-4">
        <div className="text-center space-y-6 max-w-sm w-full">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-[#10B981]/20 flex items-center justify-center ring-4 ring-[#10B981]/30 ring-offset-4 ring-offset-[#001E2C]">
              <CheckCircle2 className="h-10 w-10 text-[#10B981]" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">You&apos;re in!</h1>
            <p className="text-sm text-white/50">You have successfully joined</p>
            <div className="inline-block bg-white/10 border border-white/10 rounded-xl px-5 py-2.5 mt-1">
              <span className="text-base font-bold text-[#10B981]">{joinedGroupName}</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-2.5">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">What happens next</p>
            <div className="flex items-start gap-2.5 text-xs text-white/60 leading-relaxed">
              <Users className="h-3.5 w-3.5 text-[#10B981] mt-0.5 shrink-0" />
              <span>Your group admin will see you in the members list. You&apos;ll be notified when your rotation starts.</span>
            </div>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-3.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#006C49]/30"
          >
            Go to Dashboard <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── LANDING ────────────────────────────────────────────────────────────────
  if (step === "landing") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001E2C] px-4 py-12">
        <div className="w-full max-w-[400px] space-y-8 text-center">
          <div>
            <span className="text-2xl font-bold text-white">Ajo Vault</span>
            <p className="text-xs text-white/30 mt-0.5">Financial Rotations</p>
          </div>

          <div className="space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/20 flex items-center justify-center mx-auto">
              <Users className="h-7 w-7 text-[#10B981]" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">You&apos;ve been invited</h1>
              <p className="text-sm text-white/50 leading-relaxed">
                Someone added you to a savings circle. Join to start contributing and earning payouts with your group.
              </p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-lg px-4 py-2.5 inline-flex items-center gap-2 mx-auto">
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Circle</span>
              <span className="text-xs text-white/70 font-mono">{inviteCode}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setStep("email")}
              className="w-full py-4 bg-[#006C49] hover:bg-[#005439] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#006C49]/20"
            >
              Accept Invitation
            </button>
            <Link href="/login" className="block text-xs text-white/30 hover:text-white/50 transition-colors pt-1">
              Already a member? Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── EMAIL STEP ─────────────────────────────────────────────────────────────
  if (step === "email") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001E2C] px-4 py-12">
        <div className="w-full max-w-[400px] space-y-6">
          <button onClick={() => setStep("landing")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">What&apos;s your email?</h2>
            <p className="text-sm text-white/40 mt-1">We&apos;ll check if you already have an account.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <form className="space-y-4" onSubmit={handleEmailContinue}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Email Address</label>
                <input
                  type="email" required autoFocus value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3.5 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-2 focus:ring-[#006C49]"
                />
              </div>
              <button type="submit"
                className="w-full py-3.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── PASSWORD (SIGN IN) STEP ────────────────────────────────────────────────
  if (step === "password") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001E2C] px-4 py-12">
        <div className="w-full max-w-[400px] space-y-6">
          <button onClick={() => setStep("email")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">Welcome back</h2>
            <p className="text-sm text-white/40 mt-1">Enter your password to join the circle.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            {/* Email (read-only, carried over) */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-100">
              <span className="text-sm text-gray-700 flex-1 truncate">{email}</span>
              <button type="button" onClick={() => setStep("email")} className="text-[10px] text-[#006C49] font-bold uppercase tracking-wide shrink-0">Change</button>
            </div>
            {emailError && (
              <p className="text-xs text-red-500 font-medium">{emailError}</p>
            )}
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Password</label>
                <input type="password" required autoFocus value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3.5 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-2 focus:ring-[#006C49]" />
              </div>
              <button type="submit" disabled={loginMutation.isPending}
                className="w-full py-3.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-sm font-bold transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {loginMutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending code...</> : <>Sign In &amp; Join <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-100" />
              <span className="mx-3 text-[10px] text-gray-300 font-bold uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-gray-100" />
            </div>
            <button type="button" onClick={() => setStep("create-account")}
              className="w-full py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition-all">
              New to AjoVault? Create account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── CREATE ACCOUNT STEP ────────────────────────────────────────────────────
  if (step === "create-account") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001E2C] px-4 py-12">
        <div className="w-full max-w-[400px] space-y-6">
          <button onClick={() => setStep("password")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">Create your account</h2>
            <p className="text-sm text-white/40 mt-1">A few details and you&apos;re in.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            {/* Email read-only */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-100 mb-4">
              <span className="text-sm text-gray-700 flex-1 truncate">{email}</span>
              <button type="button" onClick={() => setStep("email")} className="text-[10px] text-[#006C49] font-bold uppercase tracking-wide shrink-0">Change</button>
            </div>
            <form className="space-y-4" onSubmit={handleCreateAccount}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Full Name</label>
                <input type="text" required autoFocus value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-2 focus:ring-[#006C49]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Phone Number</label>
                <input type="tel" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+234 800 000 0000"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-2 focus:ring-[#006C49]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Password</label>
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-2 focus:ring-[#006C49]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Confirm Password</label>
                <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                  className="w-full rounded-lg bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none border-0 focus:ring-2 focus:ring-[#006C49]" />
              </div>
              <button type="submit" disabled={signupMutation.isPending}
                className="w-full py-3.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-sm font-bold transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {signupMutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating Account...</> : <>Create Account &amp; Join <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── OTP STEP ───────────────────────────────────────────────────────────────
  if (step === "otp") {
    const isVerifying = verifyLoginOtpMutation.isPending || verifyOtpMutation.isPending;
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001E2C] px-4 py-12">
        <div className="w-full max-w-[400px] space-y-6">
          <button onClick={() => setStep(otpFlow === "login" ? "password" : "create-account")} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">Check your email</h2>
            <p className="text-sm text-white/40 mt-1">
              We sent a 6-digit code to <span className="text-white/70 font-semibold">{email}</span>
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <form className="space-y-4" onSubmit={handleOtp}>
              <input type="text" inputMode="numeric" maxLength={6} required autoFocus value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="123456"
                className="w-full rounded-lg bg-[#F1F5F9]/60 py-4 px-4 text-center text-2xl font-mono tracking-[0.5em] text-gray-900 outline-none border-0 focus:ring-2 focus:ring-[#006C49] placeholder:text-gray-300" />
              <button type="submit" disabled={isVerifying || otp.length < 6}
                className="w-full py-3.5 bg-[#006C49] hover:bg-[#005439] text-white rounded-lg text-sm font-bold transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {isVerifying ? <><Loader2 className="h-4 w-4 animate-spin" /> Verifying...</> : <>Verify &amp; Join Circle <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
            <div className="text-center mt-4 text-xs text-gray-400">
              {countdown > 0
                ? <span>Resend code in <span className="font-bold text-gray-600">{countdown}s</span></span>
                : <button type="button" onClick={resendOtp} className="text-[#006C49] font-bold hover:underline">Resend code</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
