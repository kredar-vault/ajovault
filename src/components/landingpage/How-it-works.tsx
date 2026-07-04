import { Badge } from "../shared/Badge";
import { Container } from "../shared/Container";

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create Circle",
      description:
        "Set up your savings group, pick how much everyone contributes, and decide the payout order.",
      positionClass: "left-[5%] top-[55%] lg:top-[60%]",
    },
    {
      number: "2",
      title: "Invite Members",
      description:
        "Send a quick invite link to your trusted circle so they can join instantly.",
      positionClass: "left-[30%] top-[10%] lg:top-[5%]",
    },
    {
      number: "3",
      title: "Contribute Funds",
      description:
        "Members securely transfer their savings share directly from any banking app.",
      positionClass: "left-[55%] top-[55%] lg:top-[60%]",
    },
    {
      number: "4",
      title: "Automatic Payout",
      description:
        "When the cycle ends, the total lump sum goes directly to that month's recipient.",
      positionClass: "left-[80%] top-[10%] lg:top-[5%]",
    },
  ];

  return (
    <section className="w-full overflow-hidden bg-white py-16 md:py-20">
      <Container>
        <div className="mx-auto mb-14 max-w-2xl space-y-4 text-center md:mb-20">
          <Badge text="The Process" />

          <h2 className="pt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            How it works from start to finish
          </h2>

          <p className="text-base leading-relaxed text-gray-500">
            A simple, step-by-step user flow of how your group savings run
            automatically.
          </p>
        </div>

        <div className="relative mt-10 hidden h-[420px] w-full lg:max-w-5xl mx-auto lg:block xl:h-[500px]">
          <div className="absolute inset-0 z-0 flex items-center">
            <svg
              className="h-full w-full text-gray-300"
              viewBox="0 0 1200 400"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 150 C 100 280, 200 350, 300 250 C 400 120, 500 50, 600 180 C 700 310, 800 350, 900 250 C 1000 120, 1100 50, 1200 150"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          {steps.map((item, index) => (
            <div
              key={index}
              className={`absolute z-10 w-[22%] space-y-3 transition-all ${item.positionClass}`}
            >
              <div className="relative">
                <span className="pointer-events-none absolute -left-4 -top-10 select-none text-[80px] font-bold text-[#169E5C]/10 xl:-top-12 xl:text-[95px]">
                  {item.number}
                </span>

                <div className="relative z-10 space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-gray-900 xl:text-xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-500 xl:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative ml-4 block space-y-10 border-l-2 border-dashed border-gray-200 py-2 pl-8 lg:hidden">
          {steps.map((item) => (
            <div key={item.number} className="relative">
              <div className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-[#169E5C] bg-white" />

              <div className="space-y-2">
                <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#169E5C]">
                  STEP {item.number}
                </span>

                <h3 className="text-lg font-bold tracking-tight text-gray-900">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}