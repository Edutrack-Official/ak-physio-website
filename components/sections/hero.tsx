"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowRight, Dumbbell, HandHeart, MapPin, Move, Phone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Eyebrow } from "@/components/ui/section-heading";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/brand-icons";
import { doctor, site, whatsappLink } from "@/lib/site";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const PILLARS = [
  { word: "Pain Relief", icon: HandHeart, line: "Calm the pain so you can move again." },
  { word: "Mobility", icon: Move, line: "Get back the range you lost." },
  { word: "Strength", icon: Dumbbell, line: "Rebuild the muscle that protects you." },
  { word: "Performance", icon: Zap, line: "Return to sport, work and life, stronger." },
] as const;

const PHASE_MS = 3000;
/** Round trig output so server and browser render identical attribute strings. */
const r = (n: number) => Math.round(n * 100) / 100;
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function Hero() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollY } = useScroll();
  const dialY = useTransform(scrollY, [0, 700], [0, -70]);

  useEffect(() => {
    if (reduced || paused) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % PILLARS.length), PHASE_MS);
    return () => window.clearTimeout(t);
  }, [i, reduced, paused]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden pb-14 pt-32 sm:pt-40 lg:pb-20">
      {/* Atmosphere */}
      <div aria-hidden className="enter-fade absolute inset-0 bg-grid mask-fade opacity-60" />
      <div aria-hidden className="drift absolute -right-48 -top-48 h-[40rem] w-[40rem] rounded-full bg-accent-2/20 blur-[130px]" />
      <div
        aria-hidden
        className="drift absolute -left-40 top-1/2 h-[26rem] w-[26rem] rounded-full bg-energy/25 blur-[120px] dark:bg-energy/10"
        style={{ "--t": "24s", "--d": "-9s" } as React.CSSProperties}
      />

      <div className="wrap relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <div className="enter" style={d(0.05)}>
              <Eyebrow>Physiotherapy · Rehabilitation · Rehab Gym</Eyebrow>
            </div>

            <h1 id="hero-heading" className="mt-6">
              <span className="display block text-[clamp(3.6rem,13vw,7.4rem)] leading-[0.88]">
                <span className="word-mask">
                  <span className="word" style={d(0.1)}>Movement</span>
                </span>
                <br />
                <span className="word-mask">
                  <span className="word" style={d(0.2)}>is</span>
                </span>{" "}
                <span className="word-mask">
                  <span className="word shine" style={d(0.3)}>Medicine.</span>
                </span>
              </span>
            </h1>

            <div className="enter mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-medium sm:text-xl" style={d(0.5)}>
              <span className="text-fg/60">Built around</span>
              <span className="relative inline-flex h-[2.4rem] min-w-[11ch] items-center overflow-hidden rounded-full bg-accent/10 px-4 text-accent">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={PILLARS[i].word}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display font-semibold"
                    aria-live="polite"
                  >
                    {PILLARS[i].word}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            <p className="enter mt-6 max-w-xl text-base leading-relaxed text-fg/65 sm:text-lg" style={d(0.6)}>
              {site.description}
            </p>

            <div className="enter mt-9 flex flex-wrap items-center gap-3" style={d(0.7)}>
              <Magnetic>
                <Button href="#visit" onClick={(e) => go(e, "visit")}>
                  Book an appointment
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  href={whatsappLink("Hi, I'd like to book a physiotherapy appointment.")}
                  variant="secondary"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  WhatsApp us
                </Button>
              </Magnetic>
            </div>

            <div className="enter mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg/60" style={d(0.8)}>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" aria-hidden />
                {site.address.short}
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" aria-hidden />
                {site.phones.map((p, k) => (
                  <span key={p.href}>
                    <a href={`tel:${p.href}`} className="font-medium text-fg/80 hover:text-accent">
                      {p.display}
                    </a>
                    {k === 0 && <span className="mx-1.5 text-fg/30">/</span>}
                  </span>
                ))}
              </span>
            </div>
          </div>

          <div className="enter" style={d(0.4)}>
            <motion.div style={{ y: reduced ? 0 : dialY }}>
              <RecoveryDial active={i} onPick={(k) => { setI(k); setPaused(true); }} onLeave={() => setPaused(false)} />
              <DoctorCard className="mx-auto mt-6 flex w-fit sm:hidden" />
            </motion.div>
          </div>
        </div>

        {/* The four pillars as a strip */}
        <ol className="enter mt-20 grid grid-cols-2 border-y border-fg/10 lg:grid-cols-4" style={d(0.9)}>
          {PILLARS.map((p, k) => {
            const Icon = p.icon;
            const on = k === i;
            return (
              <li
                key={p.word}
                className={cn(
                  "relative border-fg/10 px-1 py-6 sm:px-6 lg:py-8 [&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r lg:first:pl-0",
                  k < 2 && "max-lg:border-b",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -top-px h-[2px] origin-left bg-accent transition-transform duration-700 ease-out-expo",
                    on ? "scale-x-100" : "scale-x-0",
                  )}
                />
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-xl transition-colors duration-500",
                      on ? "bg-accent text-accent-ink" : "bg-fg/5 text-fg/60",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-fg/40">0{k + 1}</span>
                </div>
                <p className={cn("display mt-4 text-2xl transition-colors duration-500 sm:text-3xl", on && "text-accent")}>{p.word}</p>
                <p className="mt-1.5 text-sm leading-snug text-fg/55">{p.line}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/**
 * Four arcs, one per stage of recovery, framing Dr. Arunkumar's portrait. The arc for the
 * current stage glows; earlier stages stay lit, as progress.
 */
function RecoveryDial({ active, onPick, onLeave }: { active: number; onPick: (k: number) => void; onLeave: () => void }) {
  const R = 150;
  const C = 2 * Math.PI * R;
  const GAP = 14;
  const seg = C / 4 - GAP;
  const Icon = PILLARS[active].icon;

  return (
    <div className="group/dial relative mx-auto aspect-square w-full max-w-[34rem]" onMouseLeave={onLeave}>
      {/* Soft halo */}
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-accent/15 blur-3xl" />

      <svg viewBox="0 0 400 400" className="relative h-full w-full" role="img" aria-label={`Recovery stage: ${PILLARS[active].word}`}>
        {/* Outer ticks */}
        <g className="spin-slow origin-center" style={{ transformBox: "view-box", transformOrigin: "200px 200px", "--t": "90s" } as React.CSSProperties}>
          {Array.from({ length: 72 }).map((_, k) => {
            const a = (k / 72) * Math.PI * 2;
            const r1 = 186;
            const r2 = k % 6 === 0 ? 176 : 181;
            return (
              <line
                key={k}
                x1={r(200 + Math.cos(a) * r1)}
                y1={r(200 + Math.sin(a) * r1)}
                x2={r(200 + Math.cos(a) * r2)}
                y2={r(200 + Math.sin(a) * r2)}
                stroke="currentColor"
                className="text-fg/20"
                strokeWidth={k % 6 === 0 ? 1.6 : 1}
              />
            );
          })}
        </g>

        {/* Arc track + segments */}
        <g transform="rotate(-90 200 200)">
          {PILLARS.map((p, k) => {
            const offset = -(k * (C / 4)) - GAP / 2;
            const lit = k <= active;
            return (
              <g key={p.word}>
                <circle cx="200" cy="200" r={R} fill="none" stroke="currentColor" className="text-fg/8" strokeWidth="16" strokeDasharray={`${seg} ${C - seg}`} strokeDashoffset={offset} strokeLinecap="round" />
                <circle
                  cx="200"
                  cy="200"
                  r={R}
                  fill="none"
                  stroke={k === active ? "var(--accent)" : "var(--accent-2)"}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${seg} ${C - seg}`}
                  strokeDashoffset={offset}
                  style={{
                    opacity: lit ? (k === active ? 1 : 0.45) : 0,
                    transition: "opacity 0.6s ease",
                    filter: k === active ? "drop-shadow(0 0 10px color-mix(in oklab, var(--accent) 60%, transparent))" : undefined,
                  }}
                />
              </g>
            );
          })}
        </g>

      </svg>

      {/* Portrait, framed by the ring */}
      <div className="absolute inset-[16%] overflow-hidden rounded-full border-[6px] border-surface bg-surface-2 shadow-lift">
        <img
          src={doctor.photo}
          alt={doctor.photoAlt}
          width={900}
          height={900}
          fetchPriority="high"
          className="h-full w-full object-cover object-[50%_30%] transition-transform duration-[1.2s] ease-out-expo group-hover/dial:scale-105"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b1a18]/85 via-[#0b1a18]/30 to-transparent" />

        {/* Current stage, over the photo */}
        <div className="absolute inset-x-0 bottom-[11%] flex justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 rounded-full bg-white/15 py-1.5 pl-1.5 pr-4 text-white backdrop-blur-md"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-ink">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">0{active + 1}</span>
              <span className="font-display text-sm font-semibold sm:text-base">{PILLARS[active].word}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Stage buttons placed on the ring */}
      {PILLARS.map((p, k) => {
        const a = ((k + 0.5) / 4) * Math.PI * 2 - Math.PI / 2;
        const x = r(50 + Math.cos(a) * 46);
        const y = r(50 + Math.sin(a) * 46);
        return (
          <button
            key={p.word}
            type="button"
            onMouseEnter={() => onPick(k)}
            onFocus={() => onPick(k)}
            onClick={() => onPick(k)}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold shadow-card backdrop-blur-md transition-all duration-500 sm:text-sm",
              k === active ? "border-accent bg-accent text-accent-ink" : "border-fg/10 bg-surface/90 text-fg/70 hover:text-accent",
            )}
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-pressed={k === active}
          >
            {p.word}
          </button>
        );
      })}

      {/* Floating chips */}
      <div className="float absolute left-1/2 top-[-3%] hidden -translate-x-1/2 whitespace-nowrap rounded-2xl border border-fg/10 bg-surface/90 px-4 py-3 shadow-card backdrop-blur-md sm:block" style={{ "--t": "7s" } as React.CSSProperties}>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Activity className="h-4 w-4 text-accent" aria-hidden /> One-to-one care
        </p>
      </div>
      <DoctorCard className="float absolute bottom-[-5%] left-1/2 hidden -translate-x-1/2 sm:flex" />
    </div>
  );
}

/** Name card for the lead physiotherapist, with a link to his Instagram. */
function DoctorCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "items-center gap-3 whitespace-nowrap rounded-2xl border border-fg/10 bg-surface/95 py-2.5 pl-4 pr-2.5 shadow-lift backdrop-blur-md",
        className,
      )}
      style={{ "--t": "8s", "--d": "-3s" } as React.CSSProperties}
    >
      <div className="leading-tight">
        <p className="display text-lg">{doctor.name}</p>
        <p className="text-xs font-medium text-fg/55">{doctor.role} · {site.name}</p>
      </div>
      <a
        href={doctor.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${doctor.name} on Instagram (@${doctor.instagram})`}
        className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-ink transition-transform duration-300 hover:-translate-y-0.5"
      >
        <InstagramIcon className="h-5 w-5" />
      </a>
    </div>
  );
}
