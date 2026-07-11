// src/app/layout.tsx
import type { Metadata } from "next";
// import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers"; 
import { Toaster } from "react-hot-toast";
import "./globals.css";

// const plusJakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   variable: "--font-plus-jakarta",
//   display: "swap",
// });

const plusJakarta = {
  variable: "plus-jakarta-fallback",
};

export const metadata: Metadata = {
  title: {
    default: "Ajo Vault",
    template: "%s | Ajo Vault",
  },
  description: "Modern digital infrastructure for cooperative savings.",
  applicationName: "Ajo Vault",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-white text-slate-900 font-sans">
        <Providers>
          {children}
          
          {/* Global toast notifications config */}
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'font-sans text-sm',
              duration: 4000,
              style: {
                background: '#334155',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}