import { cn } from "@/lib/utils";

/**
 * The AK mark: a rounded tile holding a figure mid-stride whose spine is a
 * single flowing line — movement as medicine.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden>
      <rect width="40" height="40" rx="12" fill="var(--accent)" />
      <circle cx="23.5" cy="9.5" r="3.2" fill="var(--accent-ink)" />
      <path
        d="M22 15c-2.6 3.4-3 7.3-1.4 10.6M20.6 25.6 15 32.5M20.6 25.6l6.2 3.2 1.2 4.7M21.4 18.2l-6.6 2.4M21.6 18.6l5.8 3.6 3.6-2.6"
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="leading-none">
        <span className="display block text-[1.35rem] tracking-tight">
          AK <span className="text-accent">Physio</span>
        </span>
        <span className="mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-fg/55">
          &amp; Rehab Clinic
        </span>
      </span>
    </span>
  );
}
