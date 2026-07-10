"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export function SignUp() {
    const router = useRouter();
    const { mutateAsync: executeSignup, isPending: isSignupLoading } = useSignup();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
    }

    try {
        await executeSignup({
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });

        toast.success("Check your email for a verification code.");
        router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (error: any) {
        toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
    }
};

    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-[#001E2C]">

            {/* LEFT PANEL: Branding, Value Prop & Testimonial */}
            <section className="relative hidden w-1/2 flex-col justify-between p-12 text-white md:flex overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_50%)]" />
                <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#19AEE8]/45 blur-[120px]" />

                <Link href="/" className="flex items-center gap-2 relative z-10 w-fit">
                    <Image
                        src="/icon.svg"
                        alt="Ajo Vault"
                        width={22}
                        height={22}
                        className="brightness-0 invert"
                    />
                    <span className="text-lg font-bold tracking-tight text-white">
                        Ajo Vault
                    </span>
                </Link>

                <div className="relative z-10 max-w-md space-y-8 my-auto">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-5xl leading-[1.15]">
                            Save Together.<br />Grow Together.
                        </h1>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Join thousands managing their savings circles effortlessly with dedicated virtual accounts and automatic tracking.
                        </p>
                    </div>

                    {/* Testimonial Card */}
                    <div className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-600">
                                <Image
                                    src="/sarah.jpg"
                                    alt="Sarah Jenkins"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white">Sarah Jenkins</h4>
                                <p className="text-xs text-gray-400">Tech Founders Circle</p>
                            </div>
                        </div>
                        <p className="text-xs italic leading-relaxed text-gray-300">
                            &ldquo;Ajo Vault transformed how our team manages communal savings. It&rsquo;s seamless, accountable, and beautifully designed.&rdquo;
                        </p>
                    </div>
                </div>

                {/* Footer Attribution Line */}
                <div className="relative z-10 text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Ajo Vault. Powered by Kredar.
                </div>
            </section>

            {/* RIGHT PANEL: Canvas with Top Curved Card Layout */}
            <main className="flex w-full flex-col justify-center bg-white px-4 py-12 md:w-1/2 sm:px-12 lg:px-20 xl:px-28 rounded-t-[32px] md:rounded-t-none md:rounded-l-[32px] shadow-2xl md:shadow-none">

                {/* Card Box */}
                <div className="mx-auto w-full max-w-[460px] rounded-[10px] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/80 space-y-6">

                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                            Create Your Account
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 max-w-[280px] mx-auto">
                            Start your first digital savings circle in less than a minute.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSignUpSubmit}>

                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full rounded-lg border-0 bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-gray-100/80 focus:ring-1 focus:ring-[#001E2C]"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full rounded-lg border-0 bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-gray-100/80 focus:ring-1 focus:ring-[#001E2C]"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                required
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                className="w-full rounded-lg border-0 bg-[#F1F5F9]/60 py-3 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-gray-100/80 focus:ring-1 focus:ring-[#001E2C]"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                    className="w-full rounded-lg border-0 bg-[#F1F5F9]/60 py-3 pl-4 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-gray-100/80 focus:ring-1 focus:ring-[#001E2C]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-xs font-bold text-gray-400 hover:text-gray-600 focus:outline-none select-none"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700">Confirm Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                    className="w-full rounded-lg border-0 bg-[#F1F5F9]/60 py-3 pl-4 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-gray-100/80 focus:ring-1 focus:ring-[#001E2C]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 text-xs font-bold text-gray-400 hover:text-gray-600 focus:outline-none select-none"
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Agreement Policy Terms */}
                        <div className="flex items-start gap-2 cursor-pointer text-gray-600 select-none pt-1">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#10B981] focus:ring-[#10B981] accent-[#10B981]"
                            />
                            <label htmlFor="terms" className="text-xs text-gray-500 leading-tight">
                                I agree to the <Link href="/terms" className="font-semibold text-[#10B981] hover:underline">Terms</Link> and <Link href="/privacy" className="font-semibold text-[#10B981] hover:underline">Privacy Policy</Link>.
                            </label>
                        </div>

                        {/* Create Account Action */}
                        <button
                            type="submit"
                            disabled={isSignupLoading}
                            className="w-full rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#10B981]/90 active:scale-[0.995] disabled:opacity-50"
                        >
                            {isSignupLoading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Bottom Redirect */}
                    <div className="text-center text-xs text-gray-500 pt-2">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-[#10B981] hover:underline">
                            Sign In
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}