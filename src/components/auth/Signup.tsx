"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignupForm } from "./SignupForm";

export function SignUp() {
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
                  sizes="40px"
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

          <SignupForm />

        </div>
      </main>
    </div>
  );
}