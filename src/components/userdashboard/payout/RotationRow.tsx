import React from "react";
import { Clock, Banknote, Loader2 } from "lucide-react";
import { RotationMember } from "@/types";
import { TimelineDot, MemberAvatar, PayoutStatusBadge } from "./PayoutUi";

export function RotationRow({
  member,
  isLast,
  isAdmin,
  onDisburse,
  isDisbursing,
}: {
  member: RotationMember;
  isLast: boolean;
  isAdmin?: boolean;
  onDisburse?: (payoutId: string) => void;
  isDisbursing?: boolean;
}) {
  const isCurrent = member.status === 'CURRENT';
  const isPaid = member.status === 'PAID';

  return (
    <div className="relative flex items-stretch gap-4 group">
      <div className="flex flex-col items-center shrink-0 w-5">
        <TimelineDot status={member.status} />
        {!isLast && (
          <div className="w-[1.5px] flex-1 bg-gray-100 my-1 transition-colors group-hover:bg-gray-200" />
        )}
      </div>

      {/* Main Structural Row Flex Box Wrapper */}
      <div className="flex-1 pb-4">
        <div 
          className={`w-full flex items-center justify-between p-4 border rounded-[10px] transition-all ${
            isCurrent 
              ? 'bg-white border-[#006C49]/50 shadow-sm shadow-emerald-50 ring-[0.5px] ring-[#006C49]' 
              : isPaid
                ? 'bg-gray-100 border-gray-100/50 hover:bg-gray-100/90'
                : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          
          <div className="flex items-center gap-3">
            <MemberAvatar name={member.name} avatarUrl={member.avatarUrl} initials={member.initials} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-[#111827] tracking-tight">{member.name}</h4>
                {isCurrent && <PayoutStatusBadge status="CURRENT" />}
              </div>
              <p className="text-[11px] text-[#6B7280] font-medium mt-0.5 flex items-center gap-1.5">
                <span>Position {member.position}</span>
                {member.dateInfo && (
                  <>
                    <span className="text-gray-300">•</span>
                    {isCurrent ? (
                      <span className="text-[#006C49] font-semibold flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {member.dateInfo}
                      </span>
                    ) : (
                      <span>{member.dateInfo}</span>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="text-right space-y-2">
            <p className={`text-sm tracking-tight ${isCurrent ? 'font-bold text-base text-[#111827]' : 'font-bold text-xs text-[#111827]'}`}>
              ₦{member.amount.toLocaleString()}
            </p>
            {member.status !== 'CURRENT' && <PayoutStatusBadge status={member.status} />}
            {isCurrent && isAdmin && onDisburse && (
              <button
                onClick={() => onDisburse(member.id)}
                disabled={isDisbursing}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#006C49] hover:bg-[#005439] text-white text-[10px] font-bold rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDisbursing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Banknote className="h-3 w-3" />}
                Disburse
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}