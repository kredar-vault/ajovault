import React from "react";
import { CrownIcon, User,  } from "lucide-react";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    joinedDate: string;
    status: string;
    streakMonths?: number;
    isNextPayout?: boolean;
    role?: string;
  };
  currentUserId: string;
}

export function MemberCard({ member, currentUserId }: MemberCardProps) {
  if (!member) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-4 animate-pulse">
        <div className="h-12 w-12 rounded-full bg-gray-100 mx-auto" />
        <div className="h-3 bg-gray-100 rounded w-20 mx-auto mt-3" />
      </div>
    );
  }

  const displayName = (member.name || "Member").trim();
  const isMe = member.id === currentUserId;
  const currentStatus = member.status || "Pending";
  const showNextPayoutMarker = member.isNextPayout === true;

  const statusStyles: Record<string, string> = {
    Paid: "text-[#166534] bg-[#DCFCE7]",
    Pending: "text-[#9A3412] bg-[#FFEDD5]",
    Missed: "text-[#991B1B] bg-[#FEE2E2]"
  };

  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={`bg-white border rounded-xl overflow-hidden relative flex flex-col justify-between p-4 ${
      showNextPayoutMarker ? "border-[#006C49] ring-1 ring-[#006C49]/30" : "border-gray-100"
    }`}>
      {showNextPayoutMarker && (
        <div className="absolute top-0 inset-x-0 bg-[#006C49] text-white text-[9px] font-bold text-center py-0.5">
          Next payout
        </div>
      )}

      <div className={`flex flex-col items-center justify-center text-center w-full ${showNextPayoutMarker ? "pt-3" : ""}`}>
        <div className="relative">
          <div className={`h-12 w-12 rounded-full overflow-hidden flex items-center justify-center ${
            isMe ? "bg-[#006C49]/10 border border-[#006C49]/20" : "bg-gray-100 border border-gray-200"
          }`}>
            {isMe ? (
              <User className="h-5 w-5 text-[#006C49]" />
            ) : (
              <span className="text-xs font-bold text-gray-500">{initials || <User className="h-4 w-4" />}</span>
            )}
          </div>
          
          <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
            currentStatus === "Paid" ? "bg-[#15803D]" : currentStatus === "Missed" ? "bg-[#DC2626]" : "bg-[#EAB308]"
          }`} />
        </div>

        <div className="flex items-center gap-1 mt-3">
          <h4 className="text-xs font-bold text-[#111827] truncate max-w-[140px]">
            {displayName} {isMe && <span className="text-[#006C49] font-medium">(You)</span>}
          </h4>
          {(member.role === "Admin" || member.role === "ADMIN" || member.role === "OWNER") && (
            <CrownIcon className="h-3 w-3 text-[#006C49]" />
          )}
        </div>
        
        <p className="text-[10px] text-[#9CA3AF] font-medium mt-0.5">
          Joined {member.joinedDate || "N/A"}
        </p>
      </div>

      <div className="mt-4 space-y-2 w-full">
        <div className="bg-[#F8FAFC] border border-gray-50 rounded-xl px-3 py-1.5 flex items-center justify-between text-[11px] font-medium text-[#4B5563]">
          <span>This month</span>
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${statusStyles[currentStatus] || "text-gray-500 bg-gray-100"}`}>
            {currentStatus}
          </span>
        </div>

        {currentStatus === "Missed" && (
          <button className="w-full py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-[#374151] rounded-xl text-[11px] font-bold transition-all">
            Send reminder
          </button>
        )}
      </div>
    </div>
  );
}