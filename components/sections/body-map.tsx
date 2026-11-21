"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, MousePointerClick } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { bodyZones, specialties, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const VB_W = 200;
const VB_H = 440;

/** "Where does it hurt?" — tap a point on the body to see how it's treated. */
export function BodyMap() {
  const [activeId, setActiveId] = useState<string>("back");
  const zone = bodyZones.find((z) => z.id === activeId) ?? bodyZones[0];
  const specialty = specialties.find((s) => s.id === zone.specialty);

  return (
    <section id="body-map" aria-labelledby="body-map-heading" className="relative overflow-hidden bg-surface-2/60 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade opacity-50" />
      <div className="wrap relative">
        <SectionHeading
          id="body-map-heading"
          eyebrow="Where does it hurt?"
          title="Point to the pain."
          accent="We'll show you the plan."
          intro="Tap an area of the body to see what we commonly treat there and how recovery usually works."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Figure */}
          <Reveal className="relative mx-auto w-full max-w-[22rem]">
            <div aria-hidden className="absolute inset-x-[10%] bottom-0 top-[10%] rounded-full bg-accent/15 blur-3xl" />
            <div className="relative" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
              <Figure />
              {/* Scan line sweeping head to toe */}
              <div aria-hidden className="pointer-events-none absolute inset-x-[8%] inset-y-0">
                <div className="scan absolute inset-x-0 h-16 -translate-y-full bg-gradient-to-b from-transparent to-accent/20">
                  <div className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-accent shadow-[0_0_14px_2px_var(--accent)]" />
                </div>
              </div>
              {bodyZones.map((z) => {
                const on = z.id === activeId;
                return (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setActiveId(z.id)}
                    onMouseEnter={() => setActiveId(z.id)}
                    aria-pressed={on}
                    aria-label={z.label}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                    style={{ left: `${(z.x / VB_W) * 100}%`, top: `${(z.y / VB_H) * 100}%` }}
                  >
                    <span className="relative grid h-6 w-6 place-items-center">
                      <span className={cn("absolute inset-0 rounded-full bg-accent/50", on ? "animate-ping" : "opacity-0")} />
                      <span
                        className={cn(
                          "relative h-4 w-4 rounded-full border-2 border-surface transition-all duration-300",
                          on ? "scale-125 bg-accent shadow-[0_0_0_6px_color-mix(in_oklab,var(--accent)_25%,transparent)]" : "bg-accent-2 group-hover:scale-110",
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-fg px-2.5 py-1 text-xs font-semibold text-bg transition-all duration-300",
                        z.x < VB_W / 2 ? "right-full mr-1" : "left-full ml-1",
                        on ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                      )}
                    >
                      {z.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-fg/50">
              <MousePointerClick className="h-4 w-4" aria-hidden /> Tap a point
            </p>
          </Reveal>

          {/* Detail */}
          <div>
            <div role="group" aria-label="Body areas" className="flex flex-wrap gap-2">
              {bodyZones.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => setActiveId(z.id)}
                  aria-pressed={z.id === activeId}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                    z.id === activeId ? "border-accent bg-accent text-accent-ink" : "border-fg/12 bg-surface text-fg/70 hover:border-accent/50 hover:text-accent",
                  )}
                >
                  {z.label}
                </button>
              ))}
            </div>

            <div className="relative mt-6 min-h-[22rem] overflow-hidden rounded-3xl border border-fg/10 bg-surface p-7 shadow-card sm:p-9" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {specialty && (
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{specialty.title}</p>
                  )}
                  <h3 className="display mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05]">{zone.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-fg/65">{zone.body}</p>

                  <p className="mt-7 text-sm font-semibold text-fg/50">How we help</p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
                    {zone.helps.map((h, k) => (
                      <motion.li
                        key={h}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + k * 0.07 }}
                        className="flex items-start gap-2 rounded-2xl bg-accent/8 px-3.5 py-3 text-sm font-medium"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        {h}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={whatsappLink(`Hi, I have ${zone.title.toLowerCase()} and would like to book an assessment.`)}>
                      <WhatsappIcon className="h-4 w-4" />
                      Book an assessment
                    </Button>
                    <Button href="#journey" variant="secondary">
                      How recovery works
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A calm, neutral human figure. Limbs are thick round-capped strokes. */
function Figure() {
  const limb = "color-mix(in oklab, var(--fg) 10%, var(--surface))";
  const edge = "color-mix(in oklab, var(--fg) 14%, transparent)";
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" aria-hidden>
      <g fill={limb} stroke={edge} strokeWidth="1">
        {/* Arms */}
        <path d="M60 96 L46 160 L38 232" fill="none" stroke={limb} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M140 96 L154 160 L162 232" fill="none" stroke={limb} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" />
        {/* Legs */}
        <path d="M84 240 L80 330 L79 410" fill="none" stroke={limb} strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M116 240 L120 330 L121 410" fill="none" stroke={limb} strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
        {/* Torso and pelvis */}
        <path d="M58 88 Q100 74 142 88 Q150 100 146 124 Q138 168 134 206 Q138 236 128 252 L72 252 Q62 236 66 206 Q62 168 54 124 Q50 100 58 88 Z" />
        {/* Neck and head */}
        <rect x="90" y="54" width="20" height="24" rx="8" />
        <ellipse cx="100" cy="34" rx="21" ry="25" />
      </g>
      {/* Spine */}
      <path
        d="M100 80 C96 120 104 160 100 206 L100 238"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeDasharray="2 7"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
