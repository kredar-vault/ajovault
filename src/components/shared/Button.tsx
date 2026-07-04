// components/Button.tsx
import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string; // Made optional to support regular form buttons
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  type = 'button', 
  onClick,
  className = '' 
}: ButtonProps) {
  
  const baseStyles = "px-5 py-2.5 md:px-4 md:py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 text-center whitespace-nowrap select-none cursor-pointer";
  
  const variants = {
    primary: "bg-[#006C49] text-white hover:bg-[#005439] shadow-sm",
    secondary: "bg-white text-gray-800 border border-gray-100 hover:bg-gray-50 shadow-sm"
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  // If href is provided, render it as a Next.js Link anchor element
  if (href) {
    return (
      <Link href={href} className={combinedStyles} >
        {children}
      </Link>
    );
  }

  // Otherwise, render a native HTML button element with type and onClick support
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={combinedStyles}
    >
      {children}
    </button>
  );
}