// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#006C49]">
      <Container>
        <div className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
          
          {/* Logo Brand Group */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <Image
              src="/icon.svg"
              alt="Ajo Vault"
              width={32}
              height={32}
              className="brightness-0 invert" // Ensures your icon turns crisp white against the green
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Ajo Vault
            </span>
          </Link>

          {/* Navigation Links with custom high-contrast text layout */}
          <nav className="flex flex-wrap items-center gap-8 text-sm font-medium tracking-normal">
            <Link
              href="#features"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              How It Works
            </Link>

            <Link
              href="#faq"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              FAQ
            </Link>
          </nav>
        </div>

        {/* Micro Copyright Boundary Area */}
        <div className="border-t border-white/10 py-6">
          <p className="text-xs font-mono tracking-wide text-white/50">
            &copy; {new Date().getFullYear()} Ajo Vault. Built with <span className="text-white/70">Kredar</span>. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}