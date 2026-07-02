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
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#FAFAF9] p-6">
          <div className="w-4/5 space-y-3 border border-gray-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="h-2 w-1/3 rounded-full bg-[#006C49]/20" />
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#006C49]">
                Saved
              </span>
            </div>
            <div className="h-1.5 w-3/4 rounded-full bg-gray-100" />
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
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#FAFAF9] p-6">
          <div className="flex h-20 w-4/5 items-end justify-between gap-2 border border-gray-100 bg-white p-4">
            <div className="h-[35%] w-3 rounded-t-sm bg-gray-100" />
            <div className="h-[75%] w-3 rounded-t-sm bg-[#006C49]" />
            <div className="h-[45%] w-3 rounded-t-sm bg-gray-100" />
          </div>
        </div>
      ),
    },
    {
      step: "03",
      title: "Fair Payouts",
      description:
        "The system automatically schedules rotations so the right person gets their total lump sum right on time on their payout date.",
      visual: (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#FAFAF9] p-6">
          <div className="w-4/5 space-y-2 border border-gray-100 bg-white p-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-1.5">
              <span className="text-[11px] font-medium text-gray-400">
                Your Turn
              </span>
              <span className="text-xs font-bold text-[#006C49]">
                Received
              </span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full w-full bg-[#006C49]" />
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "04",
      title: "Transparent History",
      description:
        "Look back at any past cycles or historic payments whenever you want. A clear ledger keeps everyone honest.",
      visual: (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#FAFAF9] p-6">
          <div className="w-11/12 space-y-2 border border-gray-100 bg-white p-3">
            <div className="flex justify-between border-b pb-1 font-mono text-[11px] text-gray-400">
              <span>Receipt #1024</span>
              <span className="text-[#006C49]">Clear</span>
            </div>

            <div className="h-1.5 w-2/3 rounded-full bg-gray-100" />
          </div>
        </div>
      ),
    },
    {
      step: "05",
      title: "Secure Infrastructure",
      description:
        "Built using modern security frameworks so your collective group money stays fully locked up and secure.",
      visual: (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#FAFAF9] p-6">
          <div className="flex w-4/5 items-center gap-3 border border-gray-100 bg-white p-4">
            <div className="w-full space-y-1.5 text-left">
              <p className="text-xs font-bold text-gray-800">
                Protected Vault
              </p>

              <div className="h-1.5 w-full rounded-full bg-emerald-100" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#FCFBF7] py-16 md:py-20">
      <Container className="flex flex-col items-center">
        <div className="mb-4">
          <Badge text="What to know" />
        </div>

        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            All you need to know about Ajo Vault
          </h2>

          <p className="text-base leading-relaxed text-gray-500">
            We simplify how traditional community saving pools work by making
            them safer, clearer, and completely automatic for everyone
            involved.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:gap-6 md:grid-cols-6">
          {steps.map((item, index) => {
            const isBottomRow = index >= 3;

            return (
              <div
                key={index}
                className={`rounded-lg border border-gray-100 bg-white/50 p-4 transition-colors duration-200 md:p-5 ${
                  isBottomRow ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                <div className="h-28 overflow-hidden rounded-lg bg-[#FAFAF9] sm:h-32 md:h-28 lg:h-32">
                  {item.visual}
                </div>

                <div className="space-y-2 px-1 pt-6">
                  <span className="font-mono text-xs font-bold tracking-wider text-[#006C49]/40">
                    {item.step}
                  </span>

                  <h3 className="pt-1 text-lg font-bold text-gray-900 sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-500 sm:text-[15px]">
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