"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export function SignupForm() {
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
    <div className="space-y-6 w-full">
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
  );
}
