// components/Badge.tsx
import { Zap } from 'lucide-react';

interface BadgeProps {
  text: string;
}

export function Badge({ text }: BadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-900/15 border border-gray-100 rounded-full text-[11px] font-bold tracking-wider uppercase text-gray-600">
      <span>{text}</span>
    </div>
  );
}