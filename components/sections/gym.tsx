"use client";

import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, ShieldCheck, Trophy } from "lucide-react";
import { Eyebrow } from "@/components/ui/section-heading";
import { Reveal, Words } from "@/components/ui/reveal";
import { gymFeatures } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS = { Dumbbell, HeartPulse, ShieldCheck, Trophy } as const;

/** Stages of progressive loading, from protecting an injury to performing. */
const LADDER = [
  { label: "Protect", h: 22 },
  { label: "Mobilise", h: 38 },
  { label: "Load", h: 56 },
  { label: "Build", h: 76 },
  { label: "Perform", h: 100 },
] as const;

export function Gym() {
  return (
    <section id="gym" aria-labelledby="gym-heading" className="island relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade opacity-40" />
      <div aria-hidden className="drift absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-accent/12 blur-[140px]" />

      <div className="wrap relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <Eyebrow>Integrated rehab gym</Eyebrow>
          </Reveal>
          <h2 id="gym-heading" className="display mt-5 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.98]">
            <Words text="Rehab doesn't end on the" accent="treatment table." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg/65">
              Most clinics stop when the pain does. We keep going. A gym inside the clinic means your
              physiotherapist takes you from the first gentle movements to real strength, in one place, on one plan.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {gymFeatures.map((f, k) => {
              const Icon = ICONS[f.icon];
              return (
                <Reveal key={f.title} delay={0.08 * k}>
                  <div className="group h-full rounded-2xl border border-fg/10 bg-fg/[0.03] p-5 transition-colors duration-500 hover:border-accent/40 hover:bg-accent/[0.06]">
                    <Icon className="h-6 w-6 text-accent transition-transform duration-500 group-hover:scale-110" aria-hidden />
                    <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg/60">{f.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Progressive-loading ladder */}
        <Reveal delay={0.15}>
          <figure className="relative rounded-[2rem] border border-fg/10 bg-fg/[0.03] p-6 sm:p-10">
            <div className="flex items-center justify-between">
              <figcaption className="text-sm font-semibold uppercase tracking-[0.2em] text-fg/50">Progressive loading</figcaption>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink">Table → Gym floor</span>
            </div>

            <div className="mt-10 flex h-72 items-end gap-3 sm:gap-4" aria-hidden>
              {LADDER.map((s, k) => (
                <div key={s.label} className="flex h-full flex-1 flex-col justify-end">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                    transition={{ duration: 1.1, delay: 0.15 + k * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className={cn("relative origin-bottom overflow-hidden rounded-xl", k === LADDER.length - 1 && "breathe")}
                    style={{
                      height: `${s.h}%`,
                      background:
                        k === LADDER.length - 1
                          ? "linear-gradient(180deg, var(--accent), color-mix(in oklab, var(--accent) 55%, transparent))"
                          : `linear-gradient(180deg, color-mix(in oklab, var(--accent-2) ${35 + k * 12}%, transparent), color-mix(in oklab, var(--accent-2) 8%, transparent))`,
                    }}
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-white/40" />
                    <span
                      aria-hidden
                      className="bar-shimmer absolute inset-0 bg-gradient-to-t from-transparent via-white/25 to-transparent"
                      style={{ "--d": `${k * 0.25}s` } as React.CSSProperties}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
            <ol className="mt-4 flex gap-3 sm:gap-4">
              {LADDER.map((s, k) => (
                <li key={s.label} className="flex-1 text-center">
                  <span className="block text-[0.65rem] font-semibold tabular-nums text-fg/40">0{k + 1}</span>
                  <span className="mt-0.5 block text-xs font-semibold sm:text-sm">{s.label}</span>
                </li>
              ))}
            </ol>

            <p className="mt-8 border-t border-fg/10 pt-6 text-sm leading-relaxed text-fg/60">
              Each stage is unlocked when your body is ready for it, not on a fixed timeline. That's
              how you get strong without setbacks.
            </p>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
