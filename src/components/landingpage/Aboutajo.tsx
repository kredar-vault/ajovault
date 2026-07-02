import { Badge } from "../shared/Badge";
import { Container } from "../shared/Container";

export function Aboutajo() {
  const steps = [
    {
      step: "01",
      title: "Automatic Tracking",
      description:
        "Say goodbye to paperwork. Every contribution is instantly recorded so everyone stays updated without manually checking tabs.",
      visual: (
        <div className="w-full max-w-[180px] space-y-2.5 rounded-xl border border-gray-100 bg-white p-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-gray-400">Contribution</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#006C49]">
              Success
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-gray-400">₦</span>
            <span className="text-lg font-bold tracking-tight text-gray-900">50,000</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-gray-50">
            <div className="h-full w-full bg-[#006C49]" />
          </div>
        </div>
      ),
    },
    {
      step: "02",
      title: "Real-Time Status",
      description:
        "Check your group progress, see who is next in line for the money, and monitor group balances 24/7.",
      visual: (
        <div className="flex h-20 w-full max-w-[180px] items-end justify-between gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex flex-1 flex-col items-center gap-1.5">
            <div className="h-8 w-full rounded-md bg-gray-50" />
            <div className="h-1 w-full rounded-full bg-gray-200/60" />
          </div>
          <div className="flex flex-1 flex-col items-center gap-1.5">
            <div className="h-14 w-full rounded-md bg-gradient-to-t from-[#006C49] to-[#008f61]" />
            <div className="h-1 w-full rounded-full bg-[#006C49]" />
          </div>
          <div className="flex flex-1 flex-col items-center gap-1.5">
            <div className="h-10 w-full rounded-md bg-gray-50" />
            <div className="h-1 w-full rounded-full bg-gray-200/60" />
          </div>
        </div>
      ),
    },
    {
      step: "03",
      title: "Dedicated Virtual Account",
      description:
        "Each saving circle gets a unique dedicated bank account number. Make direct bank transfers to fund your contributions instantly.",
      visual: (
        <div className="w-full max-w-[180px] space-y-2 rounded-xl border border-gray-100 bg-white p-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Wema Bank</span>
          <div className="flex flex-col">
            <span className="text-[15px] font-mono font-bold tracking-dense text-gray-950">9023 4810 59</span>
            <span className="text-[10px] text-gray-500">Ajo Vault - Circle #4</span>
          </div>
        </div>
      ),
    },
    {
      step: "04",
      title: "Fair Payouts",
      description:
        "The system automatically schedules rotations so the right person gets their total lump sum right on time on their payout date.",
      visual: (
        <div className="w-full max-w-[180px] space-y-3 rounded-xl border border-gray-100 bg-white p-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-gray-50 pb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Next Payout</span>
            <span className="text-xs font-bold text-[#006C49]">Round 3</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#006C49] text-[10px] font-bold text-white">
              KO
            </div>
            <div className="space-y-1">
              <div className="h-2 w-16 rounded-full bg-gray-900" />
              <div className="h-1.5 w-10 rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "05",
      title: "Transparent History",
      description:
        "Look back at any past cycles or historic payments whenever you want. A clear ledger keeps everyone honest.",
      visual: (
        <div className="w-full max-w-[180px] space-y-2.5 rounded-xl border border-gray-100 bg-white p-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between border-b border-gray-50 pb-2 font-mono text-[10px] text-gray-400">
            <span>Txn #AJO-9082</span>
            <span className="font-semibold text-[#006C49]">Verified</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-2 w-16 rounded-full bg-gray-800" />
              <div className="h-1.5 w-10 rounded-full bg-gray-300" />
            </div>
            <span className="text-[11px] font-bold text-gray-900">+₦250k</span>
          </div>
        </div>
      ),
    },
    {
      step: "06",
      title: "Secure Infrastructure",
      description:
        "Built using modern security frameworks so your collective group money stays fully locked up and secure.",
      visual: (
        <div className="flex w-full max-w-[180px] items-center justify-between rounded-xl border border-gray-100 bg-white p-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold text-gray-800">Ajo Vault Lock</p>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#006C49]" />
              <span className="text-[9px] font-medium text-[#006C49]">AES-256</span>
            </div>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
            <svg className="h-4 w-4 text-[#006C49]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#FCFBF7] py-20 lg:py-24">
      <Container className="max-w-6xl">
        {/* Header Section */}
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-4 inline-flex">
            <Badge text="What to know" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            All you need to know about Ajo Vault
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            We simplify how traditional community saving pools work by making
            them safer, clearer, and completely automatic for everyone involved.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((item, index) => {
            return (
              <div
                key={index}
                className="group flex flex-col justify-between overflow-hidden rounded-[10px] bg-white p-5  transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Visual Canvas */}
                <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-[#FAFAF9] p-4 transition-colors group-hover:bg-[#f4f4f2]">
                  {item.visual}
                </div>

                {/* Text Content */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#006C49]/50">
                      {item.step}
                    </span>
                    <div className="h-[1px] w-4 bg-[#006C49]/20" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}