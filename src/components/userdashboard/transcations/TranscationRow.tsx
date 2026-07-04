import React from "react";
import { Transaction } from "@/types";
import { StatusBadge, TransactionIcon } from "./badges";


interface TransactionRowProps {
  tx: Transaction;
  isSelected: boolean;
  onSelect: (tx: Transaction) => void;
}

export function TransactionRow({ tx, isSelected, onSelect }: TransactionRowProps) {
  const isIncoming = tx.type === 'Incoming';

  return (
    <div 
      onClick={() => onSelect(tx)}
      className={`flex items-center justify-between p-4 bg-white border rounded-[10px] cursor-pointer transition-all hover:shadow-sm ${
        isSelected ? 'border-[#006C49] bg-emerald-50/10' : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <TransactionIcon type={tx.type} />
        <div>
          <h4 className="text-xs font-bold text-[#111827] tracking-tight">{tx.title}</h4>
          <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">
            {tx.type} • {tx.date}
          </p>
        </div>
      </div>

      <div className="text-right flex items-center gap-4">
        <div>
          <p className={`text-xs font-bold ${isIncoming ? "text-[#006C49]" : "text-[#111827]"}`}>
            {isIncoming ? "+" : "-"}₦{tx.amount.toLocaleString()}
          </p>
          <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider block mt-0.5">
            REF-{tx.reference}
          </span>
        </div>
        <StatusBadge status={tx.status} />
      </div>
    </div>
  );
}