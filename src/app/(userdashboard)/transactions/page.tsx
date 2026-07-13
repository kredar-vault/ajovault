"use client";

import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Download, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useAllTransactions } from "@/hooks/useTransactions";
import type { Transaction } from "@/types";
import { MetricCard } from "@/components/userdashboard/transcations/badges";
import { TransactionRow } from "@/components/userdashboard/transcations/TranscationRow";
import { TransactionDetailsSidebar } from "@/components/userdashboard/transcations/TransactionDetails";

const PAGE_SIZE = 10;

export default function TransactionsDashboard() {
  const { data: rawTransactions, isLoading } = useAllTransactions();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const txList: Transaction[] = (rawTransactions || []).map((tx: any) => ({
    id: tx.id,
    title: tx.description || tx.title || "Transfer",
    type: (tx.direction === "In" || tx.type === "Incoming") ? "Incoming" : "Outgoing",
    status: (tx.status as Transaction["status"]) || "Completed",
    amount: tx.amount,
    date: tx.occurredAt ? new Date(tx.occurredAt).toLocaleDateString("en-NG", { dateStyle: "medium" }) : (tx.date || ""),
    timestamp: tx.occurredAt ? new Date(tx.occurredAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" }) : (tx.timestamp || ""),
    reference: tx.reference || "",
    sender: tx.groupName || tx.sender || "Personal",
    bank: tx.bank || "",
    narration: tx.description || tx.narration || "",
  }));

  const filteredTxList = txList.filter(
    (tx) =>
      !searchQuery ||
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sender.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filteredTxList.length / PAGE_SIZE));
  const pagedTxList = filteredTxList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    if (txList.length > 0 && !selectedTx) {
      setSelectedTx(txList[0]);
    }
  }, [rawTransactions]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

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

  if (isLoading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] gap-2 bg-[#FAFAFA]">
        <Loader2 className="h-8 w-8 text-[#006C49] animate-spin" />
        <p className="text-xs font-semibold text-gray-500">Please wait...</p>
      </main>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] overflow-hidden font-sans">

      <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 md:p-8 space-y-6">

        <div>
          <h1 className="text-xl font-bold text-[#111827]">Transactions</h1>
          <p className="text-xs text-[#6B7280] font-medium mt-0.5">View every payment into and out of your wallet.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Incoming" value={incomingSum} subtext="Total received" type="incoming" />
          <MetricCard label="Outgoing" value={outgoingSum} subtext="Total paid out" type="outgoing" />
          <MetricCard label="Pending" value={pendingSum} subtext="Awaiting release" type="pending" />
          <MetricCard label="Total Transactions" value={totalCount} subtext="Processed transfers" type="total" />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search title, reference, sender..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {txList.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-100 rounded-2xl">
            <p className="text-xs font-bold text-[#111827]">No transactions yet</p>
            <p className="text-[10px] text-[#6B7280]">Funding and withdrawals will display here.</p>
          </div>
        ) : filteredTxList.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-100 rounded-2xl">
            <p className="text-xs font-bold text-[#111827]">No results</p>
            <p className="text-[10px] text-[#6B7280]">Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pagedTxList.map((tx) => (
              <TransactionRow
                key={tx.id}
                tx={tx}
                isSelected={selectedTx?.id === tx.id}
                onSelect={setSelectedTx}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between py-3 px-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 text-xs font-bold text-[#4B5563] hover:text-[#006C49] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Previous
            </button>
            <span className="text-[10px] font-semibold text-[#9CA3AF] tabular-nums">
              Page {page} of {totalPages} · {filteredTxList.length} transactions
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 text-xs font-bold text-[#4B5563] hover:text-[#006C49] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

      </div>

      <TransactionDetailsSidebar
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
      />

    </div>
  );
}
