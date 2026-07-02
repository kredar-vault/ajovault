// components/Button.tsx
import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ children, href, variant = 'primary', className = '' }: ButtonProps) {
  // Switched to a cleaner, responsive padding stack (px-5 py-2.5 on mobile, md:px-4 md:py-2 on desktop)
  const baseStyles = "px-5 py-2.5 md:px-4 md:py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 text-center inline-block whitespace-nowrap";
  
  const variants = {
    primary: "bg-[#006C49] text-white hover:bg-[#005439] shadow-sm",
    secondary: "bg-white text-gray-800 border border-gray-100 hover:bg-gray-50 shadow-sm"
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}