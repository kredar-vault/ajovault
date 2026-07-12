"use client";

import React, { useState } from "react";
import { X, Copy, Check, Loader2 } from "lucide-react";
import { useWithdraw, useLookupBank, useSetBankAccount } from "@/hooks/useWallet";
import { useMyGroups } from "@/hooks/useGroups";
import { useCreateContribution } from "@/hooks/useContributions";
import type { VirtualAccountDetails, Group, BankAccount } from "@/types";

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

// ── Nigerian banks for withdrawal setup ───────────────────────────────────────
const NIGERIAN_BANKS = [
  { name: "Access Bank", code: "044" },
  { name: "Ecobank", code: "050" },
  { name: "Fidelity Bank", code: "070" },
  { name: "First Bank", code: "011" },
  { name: "FCMB", code: "214" },
  { name: "GTBank", code: "058" },
  { name: "Keystone Bank", code: "082" },
  { name: "Kuda Bank", code: "090267" },
  { name: "Moniepoint", code: "090405" },
  { name: "Opay", code: "999992" },
  { name: "PalmPay", code: "999991" },
  { name: "Polaris Bank", code: "076" },
  { name: "Stanbic IBTC", code: "221" },
  { name: "Sterling Bank", code: "232" },
  { name: "UBA", code: "033" },
  { name: "Union Bank", code: "032" },
  { name: "Wema Bank", code: "035" },
  { name: "Zenith Bank", code: "057" },
];

// ── Withdraw Modal ────────────────────────────────────────────────────────────
export function WithdrawModal({ onClose, balance = 0, bankAccount }: ModalProps & { balance: number; bankAccount?: BankAccount }) {
  const hasBank = bankAccount?.isSet && !!bankAccount.accountNumber;

  // Setup step state
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [resolvedName, setResolvedName] = useState<string | null>(null);
  const { mutateAsync: lookup, isPending: isLooking, error: lookupError } = useLookupBank();
  const { mutateAsync: saveBank, isPending: isSaving } = useSetBankAccount();

  // Withdraw step state
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const { mutateAsync: withdraw, isPending: isWithdrawing, error: withdrawError } = useWithdraw();

  // Which step: "setup" (no bank saved) | "amount" (bank saved, enter amount)
  const [step, setStep] = useState<"setup" | "amount">(hasBank ? "amount" : "setup");

  const handleLookup = async () => {
    if (!accountNumber || !bankCode) return;
    try {
      setResolvedName(null);
      const res = await lookup({ accountNumber, bankCode });
      setResolvedName(res.data?.accountName ?? null);
    } catch {
      setResolvedName(null);
    }
  };

  const handleSaveBank = async () => {
    if (!resolvedName) return;
    await saveBank({ accountNumber, bankCode, accountName: resolvedName });
    setStep("amount");
  };

  const handleWithdraw = async () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    try {
      await withdraw({ amount: num });
      setSuccess(true);
    } catch {
      // error rendered below
    }
  };

  if (success) {
    return (
      <Modal onClose={onClose} title="Withdrawal Sent">
        <div className="text-center space-y-3 py-4">
          <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
            <Check className="h-6 w-6 text-[#006C49]" />
          </div>
          <p className="text-sm font-bold text-[#111827]">₦{parseFloat(amount).toLocaleString()} sent to your bank</p>
          <p className="text-xs text-[#6B7280] font-medium">The transfer has been initiated and should arrive shortly.</p>
        </div>
        <button onClick={onClose} className="w-full bg-[#006C49] text-white text-sm font-bold rounded-2xl py-3 hover:bg-[#005a3d] transition-colors">
          Done
        </button>
      </Modal>
    );
  }

  // Step 1: Bank account setup (only shown when no bank is saved)
  if (step === "setup") {
    return (
      <Modal onClose={onClose} title="Add Bank Account">
        <p className="text-xs text-[#6B7280] font-medium">Enter your bank details to verify your account before withdrawing.</p>

        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Account Number</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={accountNumber}
              onChange={(e) => { setAccountNumber(e.target.value.replace(/\D/g, "")); setResolvedName(null); }}
              placeholder="0123456789"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#006C49]/30 focus:border-[#006C49]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Bank</label>
            <select
              value={bankCode}
              onChange={(e) => { setBankCode(e.target.value); setResolvedName(null); }}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#006C49]/30 focus:border-[#006C49] bg-white"
            >
              <option value="">Select your bank</option>
              {NIGERIAN_BANKS.map((b) => (
                <option key={b.code} value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>

          {lookupError && (
            <p className="text-xs text-red-500 font-medium">{(lookupError as Error).message}</p>
          )}

          {resolvedName && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Check className="h-4 w-4 text-[#006C49] shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Account Name</span>
                <span className="text-sm font-bold text-[#111827]">{resolvedName}</span>
              </div>
            </div>
          )}

          {!resolvedName ? (
            <button
              onClick={handleLookup}
              disabled={isLooking || accountNumber.length < 10 || !bankCode}
              className="w-full bg-[#006C49] text-white text-sm font-bold rounded-2xl py-3 hover:bg-[#005a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLooking && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLooking ? "Verifying..." : "Verify Account"}
            </button>
          ) : (
            <button
              onClick={handleSaveBank}
              disabled={isSaving}
              className="w-full bg-[#006C49] text-white text-sm font-bold rounded-2xl py-3 hover:bg-[#005a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save & Continue"}
            </button>
          )}
        </div>
      </Modal>
    );
  }

  // Step 2: Enter amount to withdraw
  const displayAccount = hasBank ? bankAccount : { accountNumber, accountName: resolvedName ?? "", bankCode };
  const bankName = NIGERIAN_BANKS.find((b) => b.code === (displayAccount?.bankCode ?? bankCode))?.name ?? displayAccount?.bankCode;

  return (
    <Modal onClose={onClose} title="Withdraw">
      <div className="space-y-4">
        <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-gray-100 text-center">
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Available Balance</span>
          <span className="text-xl font-bold text-[#111827]">₦{balance.toLocaleString()}</span>
        </div>

        {/* Destination account card */}
        <div className="bg-[#F0FDF4] border border-emerald-200 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Sending to</span>
          <p className="text-sm font-bold text-[#111827]">{displayAccount?.accountName}</p>
          <p className="text-xs text-[#6B7280] font-medium">{displayAccount?.accountNumber} · {bankName}</p>
          <button
            onClick={() => { setResolvedName(null); setStep("setup"); }}
            className="text-[10px] font-bold text-[#006C49] hover:underline mt-1 block"
          >
            Change account
          </button>
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

        {withdrawError && (
          <p className="text-xs text-red-500 font-medium">{(withdrawError as Error).message}</p>
        )}

        <button
          onClick={handleWithdraw}
          disabled={isWithdrawing || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
          className="w-full bg-[#006C49] text-white text-sm font-bold rounded-2xl py-3 hover:bg-[#005a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isWithdrawing && <Loader2 className="h-4 w-4 animate-spin" />}
          {isWithdrawing ? "Sending..." : "Withdraw"}
        </button>
      </div>
    </Modal>
  );
}

// ── Send Payout (Contribute) Modal ────────────────────────────────────────────
export function SendPayoutModal({ onClose, balance = 0 }: ModalProps & { balance: number }) {
  const { data: groups, isLoading } = useMyGroups();
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [success, setSuccess] = useState(false);
  const selectedGroup = groups?.find((g: Group) => g.id === selectedGroupId);
  const { mutateAsync, isPending, error } = useCreateContribution(selectedGroupId);
  const hasEnough = !selectedGroup || balance >= (selectedGroup.contributionAmount ?? 0);

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
      <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-gray-100 text-center">
        <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Wallet Balance</span>
        <span className="text-xl font-bold text-[#111827]">₦{balance.toLocaleString()}</span>
      </div>

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

        {!hasEnough && selectedGroup && (
          <p className="text-xs text-red-500 font-medium">
            Insufficient balance. Deposit ₦{((selectedGroup.contributionAmount ?? 0) - balance).toLocaleString()} more to your virtual account first.
          </p>
        )}

        {error && (
          <p className="text-xs text-red-500 font-medium">{(error as Error).message}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isPending || !selectedGroupId || !hasEnough}
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
