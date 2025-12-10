// The yellow curly squiggle under "TO"
export const YellowSquiggle = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 20 C 30 5, 50 35, 70 20 C 80 12, 110 40, 90 50 C 70 60, 40 40, 60 30"
      stroke="#FFD24D"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

