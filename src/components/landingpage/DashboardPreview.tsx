// components/DashboardPreview.tsx
import Image from "next/image";
import { Badge } from "../shared/Badge";
import { Container } from "../shared/Container";

export function DashboardPreview() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <Container>
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:mb-16 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            <Badge text="Dashboard Preview" />

            <h2 className="text-3xl font-light leading-[1.15] tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              <span className="mr-2">See your savings</span>
              <span className="font-bold">circle in action</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <p className="max-w-lg text-base leading-relaxed text-gray-500">
              Track contributions, monitor payouts, and stay connected with your
              savings circle all from{" "}
              <span className="font-semibold text-gray-900">
                one beautiful dashboard
              </span>
              .
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full overflow-hidden rounded-xl border border-gray-100 bg-[#FCFBF7]">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[1.7/1]">
            <Image
              src="/pre.png"
              alt="Savings Circle Live Dashboard View"
              fill
              priority
              className="object-contain object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}