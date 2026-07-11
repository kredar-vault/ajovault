"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtp, useResendOtp } from "@/hooks/useAuth";
import { setToken } from "@/lib/http";
import { useSession } from "@/lib/auth";
import toast from "react-hot-toast";

export function VerifyOtp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { refreshSession } = useSession();

    const email = searchParams.get("email") ?? "";
    const [otp, setOtp] = useState("");
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const verifyMutation = useVerifyOtp();
    const resendMutation = useResendOtp();

    useEffect(() => {
        if (countdown <= 0) {
            setCanResend(true);
            return;
        }
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length < 6) {
            toast.error("Please enter the 6-digit code.");
            return;
        }

        verifyMutation.mutate(
            { email, otp },
            {
                onSuccess: async (response) => {
                    setToken(response.data.token);
                    toast.success("Email verified! Welcome to AjoVault.");
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
        resendMutation.mutate(
            { email },
            {
                onSuccess: () => {
                    toast.success("A new code has been sent to your email.");
                    setCountdown(60);
                    setCanResend(false);
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Could not resend code.");
                },
            }
        );
    };

    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-[#001E2C]">
            <section className="relative hidden w-1/2 flex-col justify-between p-12 text-white md:flex overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_50%)]" />
                <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#19AEE8]/45 blur-[120px]" />

                <Link href="/" className="flex items-center gap-2 relative z-10 w-fit">
                    <Image src="/icon.svg" alt="Ajo Vault" width={22} height={22} className="brightness-0 invert" />
                    <span className="text-lg font-bold tracking-tight text-white">Ajo Vault</span>
                </Link>

                <div className="relative z-10 max-w-md space-y-6 my-auto">
                    <h1 className="text-3xl font-bold tracking-tight lg:text-5xl leading-[1.15]">
                        One step<br />away.
                    </h1>
                    <p className="text-sm leading-relaxed text-gray-400">
                        We sent a 6-digit code to your email. Enter it to verify your account and start saving together.
                    </p>
                </div>

                <div className="relative z-10 text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Ajo Vault. Powered by Kredar.
                </div>
            </section>

            <main className="flex w-full flex-col justify-center bg-white px-4 py-12 md:w-1/2 sm:px-12 lg:px-20 xl:px-28 rounded-t-[32px] md:rounded-t-none md:rounded-l-[32px] shadow-2xl md:shadow-none">
                <div className="mx-auto w-full max-w-[420px] rounded-[10px] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/80 space-y-6">

                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                            Verify Your Email
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Enter the 6-digit code sent to<br />
                            <span className="font-semibold text-gray-700">{email}</span>
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700">Verification Code</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                placeholder="123456"
                                required
                                className="w-full rounded-lg border-0 bg-[#F1F5F9]/60 py-4 px-4 text-center text-2xl font-mono tracking-[0.5em] text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:bg-gray-100/80 focus:ring-1 focus:ring-[#001E2C]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={verifyMutation.isPending || otp.length < 6}
                            className="w-full rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#10B981]/90 active:scale-[0.995] disabled:opacity-50"
                        >
                            {verifyMutation.isPending ? "Verifying..." : "Verify Email"}
                        </button>
                    </form>

                    <div className="text-center text-xs text-gray-500">
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resendMutation.isPending}
                                className="font-semibold text-[#10B981] hover:underline disabled:opacity-50"
                            >
                                {resendMutation.isPending ? "Sending..." : "Resend code"}
                            </button>
                        ) : (
                            <span>Resend code in <span className="font-semibold text-gray-700">{countdown}s</span></span>
                        )}
                    </div>

                    <div className="text-center text-xs text-gray-500 pt-1">
                        Wrong email?{" "}
                        <Link href="/signup" className="font-semibold text-[#10B981] hover:underline">
                            Back to sign up
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
