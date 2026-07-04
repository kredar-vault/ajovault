import React from "react";
import { Flame, MoreVertical } from "lucide-react";
import { Member } from "@/types";

export function MemberCard({ member }: { member: Member }) {
  const statusStyles = {
    Paid: "text-[#166534] bg-[#DCFCE7]",
    Pending: "text-[#9A3412] bg-[#FFEDD5]",
    Missed: "text-[#991B1B] bg-[#FEE2E2]"
  };

  const ringStyles = {
    Paid: "border-[#15803D]",
    Pending: "border-[#EAB308]",
    Missed: "border-[#DC2626]"
  };

  return (
    <div className={`bg-white border rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.01)] overflow-hidden relative flex flex-col justify-between p-4 ${
      member.isNextPayout ? "border-[#006C49] ring-1 ring-[#006C49]/30" : "border-gray-100"
    }`}>
      {member.isNextPayout && (
        <div className="absolute top-0 inset-x-0 bg-[#006C49] text-white text-[9px] font-extrabold tracking-wider uppercase text-center py-0.5">
          Next Payout
        </div>
      )}

      <div className={`flex flex-col items-center justify-center text-center w-full ${member.isNextPayout ? "pt-3" : ""}`}>
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center shadow-inner">
            {member.avatarUrl ? (
              <img src={member.avatarUrl} alt={member.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-500" />
            )}
          </div>
          <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
            member.status === "Paid" ? "bg-[#15803D]" : member.status === "Pending" ? "bg-[#EAB308]" : "bg-[#DC2626]"
          }`} />
        </div>

        <h4 className="text-xs font-bold text-[#111827] mt-3 tracking-tight">{member.name}</h4>
        <p className="text-[10px] text-[#9CA3AF] font-medium mt-0.5">Joined {member.joinedDate}</p>
      </div>

      <div className="mt-4 space-y-2 w-full">
        <div className="bg-[#F8FAFC] border border-gray-50 rounded-xl px-3 py-1.5 flex items-center justify-between text-[11px] font-medium text-[#4B5563]">
          <span>This Month</span>
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${statusStyles[member.status]}`}>
            {member.status}
          </span>
        </div>

        {member.status === "Missed" ? (
          <button className="w-full py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-[#374151] rounded-xl text-[11px] font-bold transition-all shadow-sm">
            Send Reminder
          </button>
        ) : (
          member.streakMonths && member.streakMonths > 0 ? (
            <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-[#006C49] bg-[#006C49]/5 py-1.5 rounded-xl border border-[#006C49]/10">
              <Flame className="h-3.5 w-3.5 fill-current" />
              <span>{member.streakMonths} Month Streak!</span>
            </div>
          ) : (
            <div className="text-center text-[10px] font-bold text-[#9CA3AF] py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
              No Streak
            </div>
          )
        )}
      </div>
    </div>
  );
}