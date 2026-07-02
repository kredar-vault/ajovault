"use client";

import { useState } from "react";
import { Badge } from "../shared/Badge";
import { Container } from "../shared/Container";

export function FAQSection() {
  const faqs = [
    {
      question: "What is Ajo?",
      answer:
        "Ajo is a traditional group savings system where members contribute a fixed amount on a regular schedule, and one member receives the total payout each cycle. Ajo Vault brings this trusted system online with automatic payment tracking and dedicated virtual accounts.",
    },
    {
      question: "How do payouts work?",
      answer:
        "Each savings circle follows a predetermined payout schedule agreed upon by its members. Once contributions for a cycle are completed, the scheduled recipient receives that cycle's payout.",
    },
    {
      question: "What happens if someone misses a contribution?",
      answer:
        "Members can easily see contribution statuses in real time. If someone misses a scheduled payment, the platform flags it immediately so the group can take action based on the rules agreed upon for that savings circle.",
    },
    {
      question: "Can I join multiple circles?",
      answer:
        "Yes. You can create or join multiple savings circles at the same time, making it easy to save separately for different goals such as rent, business, travel, or family projects.",
    },
    {
      question: "Is my money secure?",
      answer:
        "Security is one of our top priorities. Every member receives a dedicated virtual account, payments are securely processed through our infrastructure, and all contribution records are automatically tracked for complete transparency.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#FCFBF7] py-16 md:py-20">
      <Container>
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center space-y-4 text-center md:mb-16">
          <Badge text="Questions" />

          <h2 className="pt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="text-base leading-relaxed text-gray-500">
            Have questions about rotations, security, or accounts? Here is
            everything you need to know.
          </p>
        </div>

        <div className="mx-auto max-w-xl space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b border-gray-100 py-4 last:border-none"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between py-2 text-left"
                >
                  <span
                    className={`pr-6 text-base font-bold tracking-tight transition-colors duration-200 sm:text-lg ${
                      isOpen
                        ? "text-gray-900"
                        : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span className="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-lg font-light text-gray-500 transition-colors group-hover:border-[#169E5C] group-hover:text-[#169E5C]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] pt-2 pb-4 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}