import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { ScrollProgress } from "@/components/scroll-progress";
import { site } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const title = `${site.legalName} — Physiotherapy & Rehab Gym in Thudiyalur, Coimbatore`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  keywords: [
    "physiotherapy Thudiyalur",
    "physiotherapist Coimbatore",
    "back pain treatment Coimbatore",
    "neck pain physiotherapy",
    "knee pain physiotherapy",
    "frozen shoulder treatment",
    "sports injury rehab Coimbatore",
    "stroke rehabilitation Coimbatore",
    "post surgery physiotherapy",
    "rehab gym Coimbatore",
  ],
  openGraph: {
    title,
    description: site.description,
    url: site.url,
    siteName: site.legalName,
    locale: "en_IN",
    type: "website",
  },
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
  colorScheme: "light dark",
};

const bootScript = `(function(){try{if(localStorage.getItem('ak-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: site.legalName,
  slogan: site.motto,
  description: site.description,
  url: site.url,
  telephone: site.phones.map((p) => p.href),
  medicalSpecialty: "PhysicalTherapy",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.lines[0],
    addressLocality: "Thudiyalur, Coimbatore",
    postalCode: "641034",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${bricolage.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-4 py-2 font-medium text-accent-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300]"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
        </Providers>
      </body>
    </html>
  );
}
