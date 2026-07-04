import React from "react";
import { X, Download } from "lucide-react";
import { Transaction } from "@/types";
import { DetailRow, StatusBadge, TransactionIcon } from "./badges";


interface SidebarProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function TransactionDetailsSidebar({ transaction, onClose }: SidebarProps) {
  if (!transaction) return null;
  const isIncoming = transaction.type === 'Incoming';

  return (
    <aside className="w-[380px] border-l border-gray-100 bg-white flex flex-col justify-between h-full fixed md:relative top-0 right-0 z-40 shadow-xl md:shadow-none animate-in slide-in-from-right duration-200">
      
      {/* Header Container */}
      <div className="p-4 flex items-center justify-between border-b border-gray-50">
        <h2 className="text-sm font-bold text-[#111827]">Transaction Details</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Primary Attributes Content Display */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* Central Display Visual Target (Amount Card Window) */}
        <div className="bg-[#F8FAFC] rounded-[10px] p-6 flex flex-col items-center justify-center text-center border border-gray-50/50 space-y-3">
          <TransactionIcon type={transaction.type} />
          <div className="space-y-1">
            <p className="text-xl font-bold text-[#111827]">
              {isIncoming ? "+" : "-"}₦{transaction.amount.toLocaleString()}
            </p>
            <StatusBadge status={transaction.status} />
          </div>
        </div>

        {/* Informational Parameter Block Rows */}
        <div className="space-y-0.5">
          <DetailRow label="Reference" value={`REF-${transaction.reference}`} isBold />
          <DetailRow label="Timestamp" value={transaction.timestamp} />
          <DetailRow label="Sender" value={transaction.sender} />
          <DetailRow label="Bank" value={transaction.bank} />
          
          {/* Narration Presentation Box Block */}
          <div className="pt-4 space-y-1 text-xs">
            <span className="text-[#6B7280] font-medium block">Narration</span>
            <p className="text-[#111827] font-bold leading-relaxed tracking-tight">{transaction.narration}</p>
          </div>
        </div>
      </div>

      {/* Bottom Sticky CTA Button */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <button className="w-full bg-[#006C49] hover:bg-[#005237] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
          <Download className="h-3.5 w-3.5" />
          <span>Download Receipt</span>
        </button>
      </div>

    </aside>
  );
}