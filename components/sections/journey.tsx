"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Four stages; the connecting line fills as the section scrolls past. */
export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // How many steps the filling line has reached; each lights up as it's passed.
  const [reached, setReached] = useState(0);
  useMotionValueEvent(fill, "change", (v) => {
    const n = journey.length;
    setReached(Math.min(n, Math.floor(v * (n - 1) + 1.02)));
  });

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading
          id="journey-heading"
          eyebrow="Your recovery journey"
          title="From first visit"
          accent="to full strength."
          intro="A clear path with four stages. You always know where you are and what comes next."
          center
        />

        <div ref={ref} className="relative mt-20">
          {/* Track: vertical on phones, horizontal from md up */}
          <div aria-hidden className="absolute left-[1.55rem] top-0 h-full w-[2px] bg-fg/10 md:hidden">
            <motion.div className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-2" style={{ scaleY: fill }} />
          </div>
          <div aria-hidden className="absolute left-0 top-[1.55rem] hidden h-[2px] w-full bg-fg/10 md:block">
            <motion.div className="h-full w-full origin-left bg-gradient-to-r from-accent to-accent-2" style={{ scaleX: fill }} />
          </div>

          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-6">
            {journey.map((s, k) => (
              <motion.li
                key={s.step}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -70px 0px" }}
                transition={{ duration: 0.85, delay: k * 0.12, ease: EASE }}
                className="relative pl-20 md:pl-0"
              >
                <span
                  className={cn(
                    "absolute left-0 top-0 grid h-[3.1rem] w-[3.1rem] place-items-center rounded-2xl border font-display text-lg font-bold transition-all duration-700 ease-out-expo md:relative",
                    k < reached
                      ? "scale-110 border-accent bg-accent text-accent-ink shadow-[0_10px_30px_-8px_var(--accent)]"
                      : "border-fg/10 bg-surface text-accent shadow-card",
                  )}
                >
                  {k < reached && (
                    <span aria-hidden className="ring absolute inset-0 rounded-2xl border-2 border-accent/60" style={{ "--d": `${k * 0.3}s` } as React.CSSProperties} />
                  )}
                  <span className="relative">{s.step}</span>
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg/45 md:mt-7">{s.pillar}</p>
                <h3 className={cn("display mt-2 text-3xl transition-colors duration-700", k < reached && "text-accent")}>{s.title}</h3>
                <p className="mt-3 leading-relaxed text-fg/65">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
