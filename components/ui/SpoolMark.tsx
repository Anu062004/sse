/** Line drawing of a spool valve: a rod with four lands and an end cap. */
export function SpoolMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 90"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="10" y="39" width="172" height="12" rx="3" />
      <rect x="30" y="29" width="16" height="32" rx="2.5" />
      <rect x="62" y="29" width="16" height="32" rx="2.5" />
      <rect x="98" y="29" width="16" height="32" rx="2.5" />
      <rect x="134" y="29" width="16" height="32" rx="2.5" />
      <path d="M182 39h6a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-6" />
    </svg>
  );
}
