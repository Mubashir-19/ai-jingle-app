import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      aria-label="JingleBox Logo"
      {...props}
    >
      <path d="M10 35 A 5 5 0 0 1 10 25 L10 10 L 20 10 L 20 25 Q 20 35 10 35 Z M 10 10 Q 10 0 20 0 L 25 0 L 25 10 Z" fill="currentColor" />
      <text
        x="35"
        y="32"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="28"
        fontWeight="bold"
        fill="currentColor"
      >
        JingleBox
      </text>
    </svg>
  );
}
