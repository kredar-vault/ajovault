import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";
import { Container } from "./Container";


export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#FCFBF7]/80 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
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

        <div className="flex items-center gap-3">
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
      </Container>
    </header>
  );
}