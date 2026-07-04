import React from "react";

// Section Header Layout Helper
export function SettingSection({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div id={id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-6 scroll-mt-6">
      <div>
        <h3 className="text-sm font-bold text-[#111827] tracking-tight">{title}</h3>
        {subtitle && <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// Custom Premium Toggle Control Switch
export function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="max-w-[75%]">
        <label className="text-xs font-bold text-[#111827] block tracking-tight">{label}</label>
        <span className="text-[10px] text-[#9CA3AF] font-medium leading-normal mt-0.5 block">{description}</span>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 ${checked ? 'bg-[#006C49]' : 'bg-gray-200'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

// Custom Clean Form Input Fields
export function SettingInput({ label, value, readOnly, type = "text", placeholder }: { label: string; value?: string | number; readOnly?: boolean; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        disabled={readOnly}
        className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border transition-all ${
          readOnly 
            ? 'bg-slate-50 text-slate-500 border-gray-100 cursor-not-allowed font-semibold' 
            : 'bg-white text-[#111827] border-gray-200 focus:border-[#006C49] focus:ring-1 focus:ring-[#006C49] outline-none'
        }`}
      />
    </div>
  );
}

// Custom Dropdowns
export function SettingSelect({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <div className="space-y-1 w-full">
      <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">{label}</label>
      <select
        defaultValue={value}
        className="w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-[#111827] border border-gray-200 focus:border-[#006C49] focus:ring-1 focus:ring-[#006C49] outline-none appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}