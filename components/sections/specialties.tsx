"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { specialties, whatsappLink, type Specialty } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------- Animated icons ---------------- */

/** Vertebrae that ripple top to bottom. */
function SpineIcon({ className }: { className?: string }) {
  const verts = [
    { x: 9, y: 2, w: 6 },
    { x: 8.5, y: 7.2, w: 7 },
    { x: 9, y: 12.4, w: 6 },
    { x: 9.5, y: 17.6, w: 5 },
  ];
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {verts.map((v, k) => (
        <rect key={k} x={v.x} y={v.y} width={v.w} height="3.5" rx="1.2" className="vert" style={{ "--d": `${k * 0.18}s` } as React.CSSProperties} />
      ))}
      <path d="M6 4c-1.5 4-1.5 12 0 16M18 4c1.5 4 1.5 12 0 16" opacity=".45" />
    </svg>
  );
}

/** A bone rocking through a joint's range. */
function BoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <g className="rock" style={{ transformBox: "view-box", transformOrigin: "12px 12px" }}>
        <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
      </g>
    </svg>
  );
}

/** A heartbeat that keeps tracing. */
function PulseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12h4l3-8 4 16 3-8h6" opacity=".25" />
      <path d="M2 12h4l3-8 4 16 3-8h6" pathLength={1} className="ecg" style={{ "--t": "2.2s" } as React.CSSProperties} />
    </svg>
  );
}

const ICONS = { Spine: SpineIcon, Bone: BoneIcon, Activity: PulseIcon } as const;

/* ---------------- Corner line art, one per specialty ---------------- */

function CornerArt({ kind }: { kind: Specialty["icon"] }) {
  const common = "pointer-events-none absolute -bottom-14 -right-10 h-44 w-44 text-accent opacity-[0.14] transition-opacity duration-700 group-hover/spot:opacity-30";
  if (kind === "Spine") {
    return (
      <svg viewBox="0 0 160 160" className={common} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
        <path d="M80 6 C 40 40, 120 70, 80 100 S 60 150, 90 158" pathLength={1} className="flow" style={{ "--t": "7s" } as React.CSSProperties} />
        {[22, 46, 70, 94, 118, 142].map((y, k) => (
          <circle key={y} cx={80 + Math.round(Math.sin(k * 1.2) * 18)} cy={y} r="5" fill="currentColor" stroke="none" opacity=".6" />
        ))}
      </svg>
    );
  }
  if (kind === "Bone") {
    return (
      <svg viewBox="0 0 160 160" className={common} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
        <path d="M30 120 A 60 60 0 0 1 130 120" pathLength={1} className="flow" style={{ "--t": "5s" } as React.CSSProperties} />
        <circle cx="80" cy="120" r="9" fill="currentColor" stroke="none" />
        <g className="swing" style={{ transformOrigin: "80px 120px" }}>
          <line x1="80" y1="120" x2="80" y2="58" />
          <circle cx="80" cy="56" r="7" fill="currentColor" stroke="none" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 160" className={common} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M0 96 H40 L52 70 L66 128 L84 40 L98 112 L108 96 H160" pathLength={1} className="ecg" style={{ "--t": "3.4s" } as React.CSSProperties} />
    </svg>
  );
}

/* ---------------- Section ---------------- */

export function Specialties() {
  return (
    <section id="specialties" aria-labelledby="specialties-heading" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading
          id="specialties-heading"
          eyebrow="Key specialties"
          title="Care for the whole body,"
          accent="head to toe."
          intro="Three areas of focus, each with a clear path from the first assessment to getting back to what you love."
        />

        <div className="mt-16 grid gap-5 [perspective:1400px] lg:grid-cols-3">
          {specialties.map((s, k) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 60, rotateX: 14 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 1, delay: k * 0.14, ease: EASE }}
                className={cn("h-full origin-bottom", k === 1 && "lg:translate-y-8")}
              >
                <SpotlightCard className="h-full">
                  <span aria-hidden className="glow-ring rounded-3xl opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100" />
                  <CornerArt kind={s.icon} />

                  <article className="relative flex h-full flex-col p-7 sm:p-8">
                    <div className="flex items-start justify-between">
                      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent transition-all duration-500 ease-out-expo group-hover/spot:-rotate-6 group-hover/spot:scale-110 group-hover/spot:bg-accent group-hover/spot:text-accent-ink group-hover/spot:shadow-lift">
                        <span aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100">
                          <span className="ring absolute inset-0 rounded-2xl border-2 border-accent/50" />
                        </span>
                        <Icon className="relative h-7 w-7" />
                      </span>
                      <span aria-hidden className="num-fill display text-6xl">0{k + 1}</span>
                    </div>

                    <h3 className="display mt-8 text-3xl transition-colors duration-500 group-hover/spot:text-accent">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-fg/65">{s.summary}</p>

                    <motion.div
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + k * 0.14, ease: EASE }}
                      className="mt-7 h-px origin-left bg-gradient-to-r from-accent/60 via-fg/15 to-transparent"
                    />

                    <ul className="mt-5 grid gap-1">
                      {s.conditions.map((c, i) => (
                        <motion.li
                          key={c.name}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.45 + k * 0.14 + i * 0.08, ease: EASE }}
                          className="group/row -mx-3 flex gap-3 rounded-xl px-3 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-accent/[0.07]"
                        >
                          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-all duration-300 group-hover/row:w-4" />
                          <span>
                            <span className="font-semibold transition-colors group-hover/row:text-accent">{c.name}</span>
                            <span className="block text-sm text-fg/55">{c.note}</span>
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <a
                      href={whatsappLink(`Hi, I'd like to ask about ${s.title.toLowerCase()}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-semibold text-accent"
                    >
                      <span className="relative">
                        Ask about {s.title.toLowerCase()}
                        <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover/cta:scale-x-100" />
                      </span>
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-accent/30 transition-all duration-500 ease-out-expo group-hover/spot:rotate-45 group-hover/spot:border-accent group-hover/spot:bg-accent group-hover/spot:text-accent-ink">
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </a>
                  </article>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
