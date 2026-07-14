"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LoginForm } from "./LoginForm";

export function Login() {
  return (
    // Base layout wrapper: uses the deep #001E2C background globally so the layout shows through smoothly
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-[#001E2C]">
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

        {/* Main Marketing Dashboard Graphics */}
        <div className="relative z-10 mx-auto my-auto w-full max-w-xl space-y-8 py-12">
          
          {/* Bold Core Value Statement */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight lg:text-5xl leading-[1.15]">
              Save Together.<br />Grow Together.
            </h1>
            <p className="text-sm leading-relaxed text-gray-400">
              Join thousands managing their savings circles effortlessly with dedicated virtual accounts and automatic tracking.
            </p>
          </div>

          <div className="ml-auto w-fit transform rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-transform hover:scale-[1.02]">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#19AEE8]/20 font-bold text-[#19AEE8] text-sm">
                M
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-gray-300">Mairo</p>
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

          <LoginForm />
          
        </div>
      </main>
    </div>
  );
}