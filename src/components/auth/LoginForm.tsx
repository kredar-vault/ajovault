"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "@/lib/auth";
import { useLogin } from "@/hooks/useAuth";
import { setToken } from "@/lib/http";

export function LoginForm() {
  const router = useRouter();
  const { refreshSession } = useSession();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all credentials.");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: async (response) => {
          setToken(response.data.token);
          toast.success("Signed in successfully!");
          await refreshSession();
          router.push("/dashboard");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Invalid credentials. Please try again.");
        }
      }
    );
  };

  return (
    <div className="space-y-8 w-full">
      <form className="space-y-5" onSubmit={handleLoginSubmit}>
        
        {/* Input Element Field: Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
          <div className="relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
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

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-lg bg-[#006C49] py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#001E2C]/90 active:scale-[0.995] disabled:opacity-60 disabled:pointer-events-none"
        >
          {loginMutation.isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Content Split Divider Line */}
      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t border-gray-100"></div>
        <span className="mx-4 flex-shrink text-[10px] font-bold uppercase tracking-widest text-gray-300">OR</span>
        <div className="flex-grow border-t border-gray-100"></div>
      </div>

      {/* Secondary Action Link Trigger */}
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
