import { MapPin, Phone } from "lucide-react";
import { Wordmark } from "@/components/ui/logo-mark";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/brand-icons";
import { doctor, navLinks, site, specialties, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="island relative overflow-hidden pb-28 pt-20 sm:pb-12">
      <div className="wrap relative">
        <p aria-hidden className="display pointer-events-none select-none text-[clamp(3.4rem,13vw,11rem)] leading-[0.85] text-fg/[0.06]">
          {site.motto}
        </p>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg/60">
              {site.pillars.join(" · ")}. Physiotherapy, rehabilitation and an in-house rehab gym in {site.address.short}.
            </p>
            <a
              href={whatsappLink("Hi, I'd like to book a physiotherapy appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              <WhatsappIcon className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a
              href={doctor.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-fit items-center gap-2 text-sm font-semibold text-fg/75 transition-colors hover:text-accent"
            >
              <InstagramIcon className="h-4 w-4" /> @{doctor.instagram}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fg/40">Explore</p>
            <ul className="mt-4 grid gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-fg/75 transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fg/40">Specialties</p>
            <ul className="mt-4 grid gap-2.5">
              {specialties.map((s) => (
                <li key={s.id}>
                  <a href="#specialties" className="text-fg/75 transition-colors hover:text-accent">
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#gym" className="text-fg/75 transition-colors hover:text-accent">
                  Rehab gym
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fg/40">Visit</p>
            <address className="mt-4 flex gap-3 not-italic text-fg/75">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </address>
            <div className="mt-4 flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <div className="grid gap-1">
                {site.phones.map((p) => (
                  <a key={p.href} href={`tel:${p.href}`} className="font-semibold hover:text-accent">
                    {p.display}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-fg/10 pt-8 text-sm text-fg/45">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Information on this site is general and not a substitute for an in-person assessment.</p>
        </div>
      </div>
    </footer>
  );
}
