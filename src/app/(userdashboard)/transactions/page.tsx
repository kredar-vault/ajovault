"use client";

import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Download, Loader2 } from "lucide-react";
import { useAccountTransactions } from "@/hooks/useAccount";
import type { Transaction } from "@/types";
import { MetricCard } from "@/components/userdashboard/transcations/badges";
import { TransactionRow } from "@/components/userdashboard/transcations/TranscationRow";
import { TransactionDetailsSidebar } from "@/components/userdashboard/transcations/TransactionDetails";

export default function TransactionsDashboard() {
  const { data: transactions, isLoading } = useAccountTransactions();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Set the first transaction as selected by default once loaded
  useEffect(() => {
    if (transactions && transactions.length > 0 && !selectedTx) {
      setSelectedTx(transactions[0]);
    }
  }, [transactions, selectedTx]);

  if (isLoading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] gap-2 bg-[#FAFAFA]">
        <Loader2 className="h-8 w-8 text-[#006C49] animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Loading ledger...</p>
      </main>
    );
  }

  const txList = transactions || [];

  // Calculate stats dynamically
  const incomingSum = txList
    .filter((tx) => tx.type === "Incoming" && tx.status === "Completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const outgoingSum = txList
    .filter((tx) => tx.type === "Outgoing" && tx.status === "Completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const pendingSum = txList
    .filter((tx) => tx.status === "Pending")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalCount = txList.length;

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] overflow-hidden font-sans">
      
      {/* Left Workspace Panel: Header, Cards Grid, Filter Actions, and Row Collections */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 md:p-8 space-y-6">
        
        {/* Document Context Header Line */}
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Transactions</h1>
          <p className="text-xs text-[#6B7280] font-medium mt-0.5">View every payment into and out of your wallet.</p>
        </div>

        {/* Metrics Grid Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Incoming" value={incomingSum} subtext="Total received" type="incoming" />
          <MetricCard label="Outgoing" value={outgoingSum} subtext="Total paid out" type="outgoing" />
          <MetricCard label="Pending" value={pendingSum} subtext="Awaiting release" type="pending" />
          <MetricCard label="Total Transactions" value={totalCount} subtext="Processed transfers" type="total" />
        </div>

        {/* Utility Search Filters Toolbar Layer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Search reference..." 
              className="w-full bg-white border border-gray-100 rounded-xl pl-9 pr-4 py-2 text-xs font-medium placeholder-[#9CA3AF] focus:outline-none focus:border-gray-200 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.01)] text-[#111827]"
            />
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-[#4B5563] hover:bg-gray-50 transition-colors">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-[#4B5563] hover:bg-gray-50 transition-colors">
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Active Structural List View Container */}
        {txList.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-100 rounded-2xl">
            <p className="text-xs font-bold text-[#111827]">No transactions yet</p>
            <p className="text-[10px] text-[#6B7280]">Funding and withdrawals will display here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {txList.map((tx) => (
              <TransactionRow 
                key={tx.id} 
                tx={tx} 
                isSelected={selectedTx?.id === tx.id} 
                onSelect={setSelectedTx} 
              />
            ))}
          </div>
        )}

        {/* Pagination Trigger Text Link */}
        <div className="text-center pt-4">
          <button className="text-xs font-bold text-[#006C49] hover:text-[#005237] transition-colors">
            Load More
          </button>
        </div>

      </div>

      {/* Right Drawer Workspace Layer: Controlled Context Sidebar Panel Component */}
      <TransactionDetailsSidebar 
        transaction={selectedTx} 
        onClose={() => setSelectedTx(null)} 
      />

    </div>
  );
}