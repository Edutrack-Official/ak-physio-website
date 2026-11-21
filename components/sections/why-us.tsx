import { CheckCircle2, HeartPulse } from "lucide-react";
import { Eyebrow } from "@/components/ui/section-heading";
import { Reveal, Words } from "@/components/ui/reveal";
import { promises, site } from "@/lib/site";

export function WhyUs() {
  return (
    <section aria-labelledby="why-heading" className="relative pb-24 sm:pb-32">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-accent px-6 py-16 text-accent-ink sm:px-12 sm:py-20 lg:px-16">
          <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-energy/30 blur-[100px] dark:bg-accent-2/30" />
          <svg aria-hidden viewBox="0 0 600 120" className="absolute bottom-0 left-0 h-20 w-full opacity-15" preserveAspectRatio="none">
            <path
              d="M0 70 H210 L232 30 L256 104 L284 14 L306 92 L322 70 H600"
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="ecg"
              style={{ "--t": "5s" } as React.CSSProperties}
            />
          </svg>

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <Eyebrow className="text-accent-ink [&_span_span]:bg-accent-ink">Why patients choose us</Eyebrow>
              </Reveal>
              <h2 id="why-heading" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] [&_.text-accent]:text-energy dark:[&_.text-accent]:text-accent-ink dark:[&_.text-accent]:underline dark:[&_.text-accent]:decoration-4 dark:[&_.text-accent]:underline-offset-8">
                <Words text={`${site.motto.split(" ").slice(0, 2).join(" ")}`} accent={site.motto.split(" ").slice(2).join(" ") + "."} />
              </h2>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed opacity-80">
                  We believe the right movement, at the right time, in the right amount, is what heals. Every plan
                  is built around that, and around you.
                </p>
              </Reveal>
            </div>

            <div className="relative grid gap-3 sm:grid-cols-2">
              <SpinBadge />
              {promises.map((p, k) => (
                <Reveal key={p.title} delay={0.08 * k}>
                  <div className="h-full rounded-2xl bg-accent-ink/10 p-5 backdrop-blur-sm transition-colors duration-500 hover:bg-accent-ink/15">
                    <CheckCircle2 className="h-6 w-6" aria-hidden />
                    <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed opacity-75">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A round sticker: "Movement is Medicine" text turning slowly around a pulse icon. */
function SpinBadge() {
  const text = `${site.motto} • Pain Relief • `;
  return (
    <div
      aria-hidden
      className="absolute -right-6 -top-[4.5rem] z-10 hidden h-28 w-28 rounded-full lg:block bg-accent-ink text-accent shadow-[0_18px_40px_-12px_rgb(0_0_0/0.35)]"
    >
      <svg viewBox="0 0 120 120" className="spin-slow h-full w-full" style={{ "--t": "20s" } as React.CSSProperties}>
        <defs>
          <path id="why-badge-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <text className="fill-current text-[10px] font-bold uppercase">
          <textPath href="#why-badge-circle" textLength="274" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[31%] grid place-items-center rounded-full bg-accent text-accent-ink">
        <HeartPulse className="h-5 w-5" />
      </span>
    </div>
  );
}
