import React from "react";
import { Copy, Share2, ShieldCheck, ArrowDown, ArrowUp, Plus, Loader2, RefreshCw } from "lucide-react";
import { useProvisionDva } from "@/hooks/useWallet";

// 1. Quick Action Button Component
interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function ActionButton({ label, icon, onClick }: ActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 transition-all hover:shadow-sm"
    >
      <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
        {icon}
      </div>
      <span className="text-[11px] font-bold text-[#111827]">{label}</span>
    </button>
  );
}

// 2. Activity Row Component
interface ActivityRowProps {
  title: string;
  timestamp: string;
  source: string;
  amount: number;
  type: 'credit' | 'debit';
  status: string;
}

export function ActivityRow({ title, timestamp, source, amount, type, status }: ActivityRowProps) {
  const isCredit = type === 'credit';
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
          isCredit ? 'bg-[#DCFCE7] text-[#006C49]' : 'bg-slate-100 text-slate-600'
        }`}>
          {isCredit ? <Plus className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#111827] tracking-tight">{title}</h4>
          <p className="text-[10px] text-[#9CA3AF] font-medium mt-0.5">
            {timestamp} • {source}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-xs font-bold ${isCredit ? 'text-[#006C49]' : 'text-[#111827]'}`}>
          {isCredit ? "+" : "-"}₦{amount.toLocaleString()}
        </p>
        <span className="text-[9px] font-bold text-[#166534] block mt-0.5">{status}</span>
      </div>
    </div>
  );
}

// 3. Virtual Account Premium Panel Card
export function VirtualAccountCard({ bank, accountNumber, accountName }: { bank: string; accountNumber: string; accountName: string }) {
  const { mutate: provision, isPending } = useProvisionDva();
  const isReady = accountNumber && accountNumber !== "—";

  return (
    <div className="bg-[#111827] rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden h-full shadow-sm">
      <div className="absolute right-4 top-4 text-white/10">
        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L1 7v2h22V7L12 2zm0 18H3v-8h3v8zm5 0h-3v-8h3v8zm5 0h-3v-8h3v8zM2 22h20v2H2v-2z"/>
        </svg>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Virtual Account</span>
          <h3 className="text-xs font-bold tracking-tight mt-0.5">Dedicated Banking</h3>
        </div>

        {!isReady ? (
          <div className="space-y-3 py-2">
            <p className="text-xs text-gray-400 font-medium">Your virtual account is not set up yet.</p>
            <button
              onClick={() => provision()}
              disabled={isPending}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
            >
              {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              {isPending ? "Setting up..." : "Set Up Virtual Account"}
            </button>
          </div>
        ) : (
          <>
            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Bank</span>
              <p className="text-xs font-bold tracking-tight mt-0.5">{bank}</p>
            </div>

            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Account Number</span>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-lg font-bold tracking-widest">{accountNumber}</p>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Account Name</span>
              <p className="text-xs font-bold tracking-tight mt-0.5 uppercase">{accountName}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-6 text-[10px] text-gray-400">
        {isReady && (
          <button className="flex items-center gap-1 hover:text-white transition-colors font-bold">
            <Share2 className="h-3 w-3" /> Share Details
          </button>
        )}
        <span className="text-[9px] opacity-60 ml-auto">Powered by Kredar</span>
      </div>
    </div>
  );
}