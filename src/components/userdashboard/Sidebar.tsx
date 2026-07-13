import React from "react";
import Link from "next/link";
import {
  LayoutDashboard, Users, CalendarDays,
  Settings, ReceiptCent, WalletCards
} from "lucide-react";

interface WhiteNavigationProps {
  pathname: string;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function WhiteNavigation({ pathname, setIsMobileMenuOpen }: WhiteNavigationProps) {
  const globalNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/members", icon: Users },
    { name: "Contributions", href: "/contributions", icon: ReceiptCent },
    { name: "Transactions", href: "/transactions", icon: ReceiptCent },
    { name: "Payout Schedule", href: "/payouts", icon: CalendarDays },
    { name: "Wallet & Account", href: "/wallet", icon: WalletCards },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="space-y-0.5 flex flex-col h-full pt-20">
      <div className="flex-1 space-y-0.5">
        {globalNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#EEF2F6] text-[#1E293B]"
                  : "text-gray-400 hover:text-[#1E293B] hover:bg-[#F9FAFB]"
              }`}
            >
              <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#1E293B]" : "text-gray-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}