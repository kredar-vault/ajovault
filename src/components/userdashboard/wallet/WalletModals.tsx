"use client";

import React, { useState } from "react";
import { X, Copy, Check, Loader2 } from "lucide-react";
import { useWithdraw } from "@/hooks/useWallet";
import { useMyGroups } from "@/hooks/useGroups";
import { useCreateContribution } from "@/hooks/useContributions";
import type { VirtualAccountDetails, Group } from "@/types";

interface ModalProps {
  onClose: () => void;
}

// ── Shared backdrop + card shell ──────────────────────────────────────────────
function Modal({ onClose, title, children }: ModalProps & { title: string; children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#111827]">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Deposit Modal ─────────────────────────────────────────────────────────────
export function DepositModal({ onClose, virtualAccount }: ModalProps & { virtualAccount?: VirtualAccountDetails }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(virtualAccount?.accountNumber ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal onClose={onClose} title="Deposit">
      <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
        Transfer money to your dedicated virtual account below. Your balance will update automatically.
      </p>

      <div className="bg-[#F8FAFC] rounded-2xl p-4 space-y-3 border border-gray-100">
        <Row label="Bank" value={virtualAccount?.bank ?? "—"} />
        <Row label="Account Name" value={virtualAccount?.accountName ?? "—"} />
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Account Number</span>
            <span className="text-sm font-bold text-[#111827] tracking-widest">{virtualAccount?.accountNumber ?? "—"}</span>
          </div>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 text-xs font-bold text-[#006C49] border border-[#006C49]/30 rounded-xl px-3 py-1.5 hover:bg-[#006C49]/5 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <p className="text-[10px] text-[#9CA3AF] font-medium text-center">Powered by Kredar · Nombank MFB</p>
    </Modal>
  );
}

// ── Withdraw Modal ────────────────────────────────────────────────────────────
export function WithdrawModal({ onClose, balance }: ModalProps & { balance: number }) {
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const { mutateAsync, isPending, error } = useWithdraw();

  const handleSubmit = async () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    try {
      await mutateAsync({ amount: num });
      setSuccess(true);
    } catch {
      // error rendered below
    }
  };

  if (success) {
    return (
      <Modal onClose={onClose} title="Withdrawal Initiated">
        <div className="text-center space-y-3 py-4">
          <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
            <Check className="h-6 w-6 text-[#006C49]" />
          </div>
          <p className="text-sm font-bold text-[#111827]">₦{parseFloat(amount).toLocaleString()} withdrawal initiated</p>
          <p className="text-xs text-[#6B7280] font-medium">Your funds will be processed shortly.</p>
        </div>
        <button onClick={onClose} className="w-full bg-[#006C49] text-white text-sm font-bold rounded-2xl py-3 hover:bg-[#005a3d] transition-colors">
          Done
        </button>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} title="Withdraw">
      <div className="space-y-4">
        <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-gray-100 text-center">
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Available Balance</span>
          <span className="text-xl font-bold text-[#111827]">₦{balance.toLocaleString()}</span>
        </div>

        <div>
          <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Amount (₦)</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#006C49]/30 focus:border-[#006C49]"
          />
        </div>

        <p className="text-[10px] text-[#6B7280] font-medium">Funds will be sent to your registered bank account.</p>

        {error && (
          <p className="text-xs text-red-500 font-medium">{(error as Error).message}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isPending || !amount || parseFloat(amount) <= 0}
          className="w-full bg-[#006C49] text-white text-sm font-bold rounded-2xl py-3 hover:bg-[#005a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isPending ? "Processing..." : "Withdraw"}
        </button>
      </div>
    </Modal>
  );
}

// ── Send Payout (Contribute) Modal ────────────────────────────────────────────
export function SendPayoutModal({ onClose }: ModalProps) {
  const { data: groups, isLoading } = useMyGroups();
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [success, setSuccess] = useState(false);
  const selectedGroup = groups?.find((g: Group) => g.id === selectedGroupId);
  const { mutateAsync, isPending, error } = useCreateContribution(selectedGroupId);

  const handleSubmit = async () => {
    if (!selectedGroupId) return;
    try {
      await mutateAsync({});
      setSuccess(true);
    } catch {
      // error rendered below
    }
  };

  if (success) {
    return (
      <Modal onClose={onClose} title="Contribution Sent">
        <div className="text-center space-y-3 py-4">
          <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
            <Check className="h-6 w-6 text-[#006C49]" />
          </div>
          <p className="text-sm font-bold text-[#111827]">
            ₦{selectedGroup?.contributionAmount?.toLocaleString()} sent to {selectedGroup?.name}
          </p>
          <p className="text-xs text-[#6B7280] font-medium">Your contribution has been recorded.</p>
        </div>
        <button onClick={onClose} className="w-full bg-[#006C49] text-white text-sm font-bold rounded-2xl py-3 hover:bg-[#005a3d] transition-colors">
          Done
        </button>
      </Modal>
    );
  }

  const activeGroups = groups?.filter((g: Group) => g.status === "Active") ?? [];

  return (
    <Modal onClose={onClose} title="Send to Savings">
      <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
        Select a savings circle to contribute to. The contribution amount is set by the group.
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Savings Circle</label>
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading circles...
            </div>
          ) : (
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#006C49]/30 focus:border-[#006C49] bg-white"
            >
              <option value="">Select a circle</option>
              {activeGroups.map((g: Group) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          )}
        </div>

        {selectedGroup && (
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 space-y-2">
            <Row label="Contribution Amount" value={`₦${selectedGroup.contributionAmount?.toLocaleString()}`} />
            <Row label="Frequency" value={selectedGroup.frequency ?? "—"} />
          </div>
        )}

        {error && (
          <p className="text-xs text-red-500 font-medium">{(error as Error).message}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isPending || !selectedGroupId}
          className="w-full bg-[#006C49] text-white text-sm font-bold rounded-2xl py-3 hover:bg-[#005a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isPending ? "Sending..." : "Send Contribution"}
        </button>
      </div>
    </Modal>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">{label}</span>
      <span className="text-sm font-semibold text-[#111827]">{value}</span>
    </div>
  );
}
