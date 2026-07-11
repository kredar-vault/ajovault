import React, { useState } from "react";
import Link from "next/link";
import { UserPlus, Copy, Share2, Check } from "lucide-react";

export function GrowCircleCard({ inviteUrl }: { inviteUrl: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <div className="bg-[#005C42] text-white rounded-[10px] p-5 sm:p-6 flex flex-col justify-between h-full gap-4">
      <div className="space-y-2">
        <Link href="/members" className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
          <UserPlus className="h-4 w-4 text-white" />
        </Link>
        <h2 className="text-sm font-bold tracking-tight">Grow the Circle</h2>
        <p className="text-[11px] text-white/70 leading-normal max-w-[90%]">
          Invite trusted friends to join next month's rotation.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center bg-white/10 border border-white/5 rounded-xl p-1 w-full backdrop-blur-sm">
          <span className="text-[10px] font-medium text-white/80 px-2 truncate flex-1 select-all">
            {inviteUrl}
          </span>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1 bg-white text-[#005C42] px-2.5 py-1 rounded-lg text-[10px] font-bold hover:bg-white/90 transition-all shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            )}
          </button>
        </div>

        <button className="w-full py-2 bg-transparent hover:bg-white/5 border border-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5">
          <Share2 className="h-3.5 w-3.5" /> Share Link
        </button>
      </div>
    </div>
  );
}