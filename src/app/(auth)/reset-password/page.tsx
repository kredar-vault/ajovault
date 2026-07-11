import { ResetPassword } from "@/components/auth/ResetPassword";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC]">
        <div className="text-sm font-semibold text-gray-500">Loading...</div>
      </div>
    }>
      <ResetPassword />
    </Suspense>
  );
}
