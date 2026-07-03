"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        // Base layout wrapper: uses the deep #001E2C background globally so the layout shows through smoothly
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-[#001E2C]">

            {/* LEFT PANEL: Branding & Visual Mockups */}
            <section className="relative hidden w-1/2 flex-col justify-between p-12 text-white md:flex overflow-hidden">
                {/* Soft emerald radial ambient gradient */}
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


                {/* Main Marketing Dashboard Graphics */}
                <div className="relative z-10 mx-auto my-auto w-full max-w-xl space-y-8 py-12">

                    {/* Floating Card 1: Sarah Notification */}
                    {/* <div className="mr-auto w-fit transform rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-transform hover:scale-[1.02]">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10B981]/20 font-bold text-[#10B981] text-sm">
                                S
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs font-semibold text-gray-300">Sarah</p>
                                <p className="text-sm font-bold text-[#10B981]">Contributed ₦20,000</p>
                                <p className="text-[10px] text-gray-400">Just now &bull; Weekly Circle</p>
                            </div>
                        </div>
                    </div> */}

                    {/* Bold Core Value Statement */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-5xl leading-[1.15]">
                            Save Together.<br />Grow Together.
                        </h1>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Join thousands managing their savings circles effortlessly with dedicated virtual accounts and automatic tracking.
                        </p>
                    </div>

                    {/* Floating Card 2: David Notification */}
                    <div className="ml-auto w-fit transform rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-transform hover:scale-[1.02]">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#19AEE8]/20 font-bold text-[#19AEE8] text-sm">
                                D
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs font-semibold text-gray-300">David</p>
                                <p className="text-sm font-bold text-white">Joined the circle</p>
                                <p className="text-[10px] text-gray-400">Monthly Rotation</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Attribution Line */}
                <div className="relative z-10 text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Ajo Vault. Powered by Kredar.
                </div>
            </section>

            {/* RIGHT PANEL: Auth Interactive Sheet Container */}
            {/* md:rounded-t-[32px] creates the custom curved profile layout sheet seen in professional UI screens */}
            <main className="flex w-full flex-col justify-center bg-white px-6 py-12 md:w-1/2 lg:px-20 xl:px-32 rounded-t-[28px] md:rounded-t-none md:rounded-l-[32px] shadow-2xl md:shadow-none">
                <div className="mx-auto w-full max-w-md space-y-8">

                    {/* Header Typography Group */}
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="text-sm text-gray-500">
                            Sign in to continue managing your savings circle.
                        </p>
                    </div>

                    {/* Login Form Layout */}
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

                        {/* Input Element Field: Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
                            <div className="relative flex items-center">
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-3 px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#001E2C] focus:bg-white focus:ring-1 focus:ring-[#001E2C]"
                                />
                            </div>
                        </div>

                        {/* Input Element Field: Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-3 pl-4 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#001E2C] focus:bg-white focus:ring-1 focus:ring-[#001E2C]"
                                />

                                {/* Minimalist interactive view toggler */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-gray-600 focus:outline-none select-none"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Persistence & Safe Link Blocks */}
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

                        {/* Primary Action Button */}
                        
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#001E2C]/90 active:scale-[0.995]"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Content Split Divider Line */}
                    <div className="relative flex items-center py-1">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="mx-4 flex-shrink text-[10px] font-black uppercase tracking-widest text-gray-300">OR</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                    </div>

                    {/* Secondary Action Link Trigger */}
                  <Link  href="signup/">
                    <button
                        type="button"
                        className="w-full rounded-lg border border-gray-200 bg-white py-3.5 text-center text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50/80 active:scale-[0.995]"
                    >
                        Create an Account
                    </button>
                  </Link>

                </div>
            </main>
        </div>
    );
}