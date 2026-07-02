import { Button } from "../shared/Button";
import { Container } from "../shared/Container";

export function FinalCTA() {
  const leftAvatars = [
    { id: 1, top: "15%", left: "6%", size: "w-11 h-11", bg: "bg-amber-100 text-amber-700", initials: "AA" },
    { id: 2, top: "8%", left: "18%", size: "w-12 h-12", bg: "bg-blue-100 text-blue-700", initials: "TO" },
    { id: 3, top: "42%", left: "10%", size: "w-12 h-12", bg: "bg-rose-100 text-rose-700", initials: "CN" },
    { id: 4, top: "72%", left: "6%", size: "w-10 h-10", bg: "bg-purple-100 text-purple-700", initials: "JM" },
    { id: 5, top: "65%", left: "24%", size: "w-12 h-12", bg: "bg-emerald-100 text-emerald-700", initials: "EB" },
  ];

  const rightAvatars = [
    { id: 6, top: "10%", right: "16%", size: "w-11 h-11", bg: "bg-indigo-100 text-indigo-700", initials: "SO" },
    { id: 7, top: "20%", right: "5%", size: "w-10 h-10", bg: "bg-cyan-100 text-cyan-700", initials: "FE" },
    { id: 8, top: "42%", right: "11%", size: "w-12 h-12", bg: "bg-orange-100 text-orange-700", initials: "KA" },
    { id: 9, top: "70%", right: "26%", size: "w-10 h-10", bg: "bg-teal-100 text-teal-700", initials: "UI" },
    { id: 10, top: "62%", right: "14%", size: "w-12 h-12", bg: "bg-pink-100 text-pink-700", initials: "YF" },
  ];

  return (
    <section className="w-full bg-[#0B462C] py-16 md:py-20">
      <Container>
        <div className="relative flex min-h-[340px] md:min-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-[10px] border border-gray-100 bg-white px-6 py-16 md:px-12 md:py-20 text-center">

          {leftAvatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`absolute hidden lg:flex ${avatar.size} items-center justify-center rounded-full border border-white font-mono text-xs font-bold select-none`}
              style={{ top: avatar.top, left: avatar.left }}
            >
              <div
                className={`flex h-full w-full items-center justify-center rounded-full ${avatar.bg}`}
              >
                {avatar.initials}
              </div>
            </div>
          ))}

          {rightAvatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`absolute hidden lg:flex ${avatar.size} items-center justify-center rounded-full border border-white font-mono text-xs font-bold select-none`}
              style={{ top: avatar.top, right: avatar.right }}
            >
              <div
                className={`flex h-full w-full items-center justify-center rounded-full ${avatar.bg}`}
              >
                {avatar.initials}
              </div>
            </div>
          ))}

          <div className="relative z-10 mx-auto max-w-2xl space-y-5">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Ready to Start Your Savings Circle?
            </h2>

            <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
              Bring your trusted community savings group online. Enjoy
              transparent tracking, dedicated virtual accounts, and automated
              payouts effortlessly.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
              <Button
                href="/signup"
                variant="primary"
                className="w-full sm:w-auto rounded-xl px-8 py-3.5 text-base"
              >
                Create Your Circle
              </Button>

              <button className="w-full rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 sm:w-auto">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}