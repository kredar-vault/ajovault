"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../shared/Button";

interface WelcomeStepProps {
    onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
    return (
        <div className="relative z-10 flex w-full max-w-[850px] flex-col md:flex-row items-center justify-between rounded-xl bg-white p-6 md:p-12 border border-gray-100/70 gap-8 md:gap-12 animate-fade-in">

            {/* LEFT GRAPHIC PANEL: Dashed Orbit & Floating Badges */}
            <div className="relative flex items-center justify-center w-full md:w-1/2 max-w-[320px] aspect-square">
                {/* Outer Orbit */}
                <div className="absolute inset-0 rounded-full border border-dashed border-gray-200 animate-[spin_120s_linear_infinite]" />
                {/* Inner Orbit */}
                <div className="absolute inset-5 rounded-full border border-dashed border-gray-100 animate-[spin_80s_linear_infinite]" />

                <Image
                    src="/userflow1.png"
                    alt="Ajo Core"
                    width={400}
                    height={400}
                />

                {/* Floating Badge 1: Savings Piggy Bank (Swapped to icon.svg) */}
                <div className="absolute top-6 right-6 bg-white p-2.5 rounded-full shadow-md border border-gray-50 flex items-center justify-center">
                    <Image
                        src="/icon.svg"
                        alt="Savings Piggy"
                        width={16}
                        height={16}
                        className="text-[#006C49]"
                    />
                </div>

                {/* Floating Badge 2: Multi-user icon */}
                <div className="absolute bottom-6 left-6 bg-white p-2.5 rounded-full shadow-md border border-gray-50 text-sky-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z" />
                    </svg>
                </div>
            </div>

            {/* RIGHT PANEL: Messaging & Call-To-Actions */}
            <div className="w-full md:w-1/2 space-y-6">
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                        Welcome to Ajo Vault
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Let&apos;s create your first savings circle. It only takes a minute to start building wealth together with friends and family.
                    </p>
                </div>

                {/* Action button stack utilizing your custom Button component */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <div onClick={onNext} className="flex-1 sm:flex-initial">
                        <Button
                            href="#"
                            variant="primary"
                            className="w-full flex items-center justify-center gap-2 font-semibold py-4"
                        >
                            Start My Savings Circle <span>→</span>
                        </Button>
                    </div>

                    <Button
                        href="/learn-more"
                        variant="secondary"
                        className="font-semibold py-4"
                    >
                        Learn More
                    </Button>
                </div>
            </div>

        </div>
    );
}