"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";
import { Container } from "./Container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FCFBF7]/80 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-1 text-[#169E5C] transition-opacity hover:opacity-80"
        >
          <Image
            src="/icon.svg"
            alt="Ajo Vault"
            width={22}
            height={22}
          />
          <span className="text-lg font-bold tracking-tight text-[#0F172A]">
            Ajo Vault
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-[#169E5C]"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-[#169E5C]"
          >
            How It Works
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-[#169E5C]"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition-all hover:border-[#169E5C]/20 hover:text-[#169E5C]"
          >
            Log In
          </Link>
          <Button
            href="/signup"
            className="rounded-xl px-5 py-2.5"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-[#169E5C] focus:outline-none md:hidden"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Toggle main menu</span>
          {isOpen ? (
            // Close icon
            <svg className="h-6 window-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger menu icon
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </Container>

      {/* Mobile Slide-out / Drop-down Menu */}
      {isOpen && (
        <div className="border-b border-gray-200 bg-[#FCFBF7] px-4 py-4 transition-all md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              onClick={closeMenu}
              className="rounded-lg py-2 text-base font-medium text-gray-600 transition-colors hover:text-[#169E5C]"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={closeMenu}
              className="rounded-lg py-2 text-base font-medium text-gray-600 transition-colors hover:text-[#169E5C]"
            >
              How It Works
            </Link>
            <Link
              href="#faq"
              onClick={closeMenu}
              className="rounded-lg py-2 text-base font-medium text-gray-600 transition-colors hover:text-[#169E5C]"
            >
              FAQ
            </Link>

            <hr className="my-2 border-gray-200/60" />

            {/* Mobile Action Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={closeMenu}
                className="block w-full rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-[#0F172A] transition-all"
              >
                Log In
              </Link>
              <Button
                href="/signup"
                onClick={closeMenu}
                className="w-full rounded-xl py-3 text-center text-sm"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}