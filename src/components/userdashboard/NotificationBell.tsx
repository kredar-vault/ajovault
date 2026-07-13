"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Loader2, CheckCircle2, DollarSign, UserPlus, Info, Check } from "lucide-react";
import { useNotifications, useMarkNotificationsRead } from "@/hooks/useNotifications";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { data: notifications, isLoading } = useNotifications();
  const markReadMutation = useMarkNotificationsRead();

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    markReadMutation.mutate({ all: true });
  };

  const handleNotificationClick = (id: string, isRead: boolean) => {
    if (!isRead) {
      markReadMutation.mutate({ notificationIds: [id] });
    }
  };

  const getIcon = (type?: string) => {
    switch (type) {
      case "transaction":
        return <DollarSign className="h-4 w-4 text-emerald-600" />;
      case "contribution":
        return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
      case "payout":
        return <UserPlus className="h-4 w-4 text-purple-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getIconBg = (type?: string) => {
    switch (type) {
      case "transaction":
        return "bg-emerald-50";
      case "contribution":
        return "bg-blue-50";
      case "payout":
        return "bg-purple-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 border border-white/10 lg:border-gray-100 hover:bg-white/10 lg:hover:bg-gray-50 text-white lg:text-gray-600 transition-colors focus:outline-none rounded-full"
      >
        <Bell className="h-4.5 w-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-2 ring-[#004D34] lg:ring-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover overlay dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-gray-50 animate-in fade-in slide-in-from-top-3 duration-200">
          
          {/* Header Area */}
          <div className="px-4.5 py-3.5 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-xs font-bold text-[#111827]">Notifications</h3>
              <p className="text-[10px] font-medium text-gray-500 mt-0.5">
                {unreadCount > 0 ? `${unreadCount} unread updates` : "All caught up"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                disabled={markReadMutation.isPending}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#006C49] hover:text-[#005237] disabled:opacity-50 transition-colors"
              >
                <Check className="h-3 w-3" /> Mark all read
              </button>
            )}
          </div>

          {/* List Scrollable Wrapper */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-50/60">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Loader2 className="h-6 w-6 text-[#006C49] animate-spin" />
                <span className="text-[10px] text-gray-400 font-semibold">Syncing alerts...</span>
              </div>
            ) : !notifications || notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-2">
                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827]">No notifications yet</h4>
                  <p className="text-[10px] text-gray-500 font-medium mt-0.5 leading-relaxed">
                    We'll let you know when transaction payouts, deposits, or group deadlines occur.
                  </p>
                </div>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id, notification.isRead)}
                  className={`p-4 flex gap-3 cursor-pointer transition-colors relative ${
                    notification.isRead ? "bg-white hover:bg-slate-50/50" : "bg-emerald-50/15 hover:bg-emerald-50/25"
                  }`}
                >
                  {/* Left Icon Category */}
                  <div className={`h-8.5 w-8.5 rounded-xl ${getIconBg(notification.type)} flex items-center justify-center shrink-0`}>
                    {getIcon(notification.type)}
                  </div>
                  
                  {/* Message body */}
                  <div className="flex-1 min-w-0 space-y-0.5 pr-2">
                    <p className={`text-[11px] leading-tight text-[#111827] ${notification.isRead ? "font-semibold" : "font-bold"}`}>
                      {notification.title}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                      {new Date(notification.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Red dot indicator for unread item */}
                  {!notification.isRead && (
                    <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#006C49] shadow-sm shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      )}
    </div>
  );
}
