import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "../shared/Badge";
import { Button } from "../shared/Button";
import { Container } from "../shared/Container";

export default function Hero() {
    return (
        <div className="relative flex  flex-col overflow-x-hidden bg-[#FCFBF7] font-sans text-[#0C241B] antialiased">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#efece6_1px,transparent_1px),linear-gradient(to_bottom,#efece6_1px,transparent_1px)] bg-[size:2.7rem_2.7rem] opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

            <main className="relative z-10 flex flex-1 items-center justify-center pt-16 pb-24">
                <Container>
                    <div className="relative mx-auto flex max-w-4xl flex-col items-center space-y-8 text-center">
                        <Badge text="Modern Digital Group Savings" />

                        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-6xl">
                            The smarter way to{" "}
                            <span className="relative inline-block">
                                manage
                                <span className="absolute bottom-1 left-0 -z-10 h-[6px] w-full rounded-full bg-[#D4F442]" />
                            </span>{" "}
                            group savings
                        </h1>

                        <p className="max-w-2xl text-base font-normal leading-relaxed text-gray-600 sm:text-lg">
                            Create trusted savings circles, invite members, and automatically
                            track every contribution with dedicated virtual accounts powered
                            by Kredar.
                        </p>

                        <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
                            <Button
                                href="/signup"
                                variant="primary"
                                className="w-full rounded-xl px-8 py-3.5 text-base sm:w-auto"
                            >
                                Start for Free
                            </Button>

                            <Button
                                href="/demo"
                                variant="secondary"
                                className="w-full rounded-xl px-8 py-3.5 text-base sm:w-auto"
                            >
                                Book a Demo
                            </Button>
                        </div>

                        <div className="absolute -left-20 top-0 hidden items-center gap-2 animate-bounce [animation-duration:5s] xl:flex">
                            <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-purple-200 shadow-xl">
                                <Image
                                    src="/user1.jpg"
                                    alt="Member"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <ArrowUpRight className="h-6 w-6 translate-y-3 rotate-180 self-end text-[#169E5C]" />
                        </div>

                        <div className="absolute -left-12 bottom-12 hidden items-center gap-2 animate-bounce [animation-duration:6s] xl:flex">
                            <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-blue-200 shadow-xl">
                                <Image
                                    src="/user2.jpg"
                                    alt="Member"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <ArrowUpRight className="h-6 w-6 -translate-y-3 rotate-90 self-start text-[#169E5C]" />
                        </div>

                        <div className="absolute -right-20 top-4 hidden flex-row-reverse items-center gap-2 animate-bounce [animation-duration:5.5s] xl:flex">
                            <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-orange-200 shadow-xl">
                                <Image
                                    src="/user3.jpg"
                                    alt="Member"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <ArrowUpRight className="h-6 w-6 -rotate-90 translate-y-3 self-end text-[#169E5C]" />
                        </div>

                        <div className="absolute -right-12 bottom-8 hidden flex-row-reverse items-center gap-2 animate-bounce [animation-duration:4.5s] xl:flex">
                            <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-green-200 shadow-xl">
                                <Image
                                    src="/user4.jpg"
                                    alt="Member"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <ArrowUpRight className="h-6 w-6 -translate-y-3 self-start text-[#169E5C]" />
                        </div>
                    </div>
                </Container>
            </main>

            <footer className="mt-auto w-full border-y border-gray-200/40 bg-transparent py-6">
                <Container>
                    <div className="overflow-hidden">
                        <div className="flex w-max items-center gap-10 md:w-full md:justify-center animate-[scroll_18s_linear_infinite] md:animate-none">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-[#169E5C]" />
                                <span className="text-sm font-semibold tracking-tight text-gray-700">
                                    Powered by Kredar
                                </span>
                            </div>

                            <div className="h-5 w-px bg-gray-200" />

                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-[#169E5C]" />
                                <span className="text-sm font-semibold tracking-tight text-gray-700">
                                    Built on Nomba
                                </span>
                            </div>

                            <div className="h-5 w-px bg-gray-200" />

                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-[#169E5C]" />
                                <span className="text-sm font-semibold tracking-tight text-gray-700">
                                    Dedicated Virtual Accounts
                                </span>
                            </div>

                            <div className="h-5 w-px bg-gray-200" />

                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-[#169E5C]" />
                                <span className="text-sm font-semibold tracking-tight text-gray-700">
                                    Instant Reconciliation
                                </span>
                            </div>

                            <div className="h-5 w-px bg-gray-200" />

                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-[#169E5C]" />
                                <span className="text-sm font-semibold tracking-tight text-gray-700">
                                    Secure Payments
                                </span>
                            </div>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>
    );
}