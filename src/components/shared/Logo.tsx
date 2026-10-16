import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export function Logo({ className = 'w-6 h-6', size = 24, ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Vertical Stem of 'P' */}
      <path
        d="M6 3.5v17"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />

      {/* Top Clockwise Sync Curve */}
      <path
        d="M6 4.75h6.5a4.75 4.75 0 0 1 4.75 4.75c0 1.25-.48 2.4-1.28 3.25"
        stroke="#2563eb"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      {/* Top Arrow Head */}
      <path
        d="M17.5 13.5l-2.2-.3.6-2.1"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom Counter-Clockwise Sync Curve completing the P loop */}
      <path
        d="M14.5 14.25H6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      {/* Bottom Arrow Head pointing back to stem */}
      <path
        d="M7.75 12.75L6 14.25l1.75 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
