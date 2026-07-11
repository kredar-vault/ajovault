import { VerifyOtp } from "@/components/auth/VerifyOtp";
import { Suspense } from "react";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen w-full items-center justify-center bg-[#001E2C] text-white">
        <div className="text-sm font-semibold text-gray-400">Loading verification...</div>
      </div>
    }>
      <VerifyOtp />
    </Suspense>
  );
}
