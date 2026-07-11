"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";
import { clearToken } from "@/lib/http";
import toast from "react-hot-toast";

interface LogoutButtonProps {
  variant?: "sidebar" | "menu";
}

export function LogoutButton({ variant = "sidebar" }: LogoutButtonProps) {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearToken();
        router.push("/login");
      },
      onError: () => {
        // Clear locally even if the server call fails
        clearToken();
        toast.error("Logged out.");
        router.push("/login");
      },
    });
  };

  if (variant === "menu") {
    return (
      <button
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 transition-all w-full disabled:opacity-50"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
    >
      <LogOut className="h-3.5 w-3.5" />
      {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}
