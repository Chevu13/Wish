import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { INSTAGRAM_URL, SITE_URL } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Wish Catering — Ketering u Beogradu",
  description:
    "Poželi želju, mi ćemo je pretvoriti u zalogaj. Wish Catering postavlja raskošne stolove za proslave, devojačke večeri i posebne trenutke u Beogradu.",
  keywords: ["ketering Beograd", "Wish Catering", "švedski sto", "slatki sto", "devojačko veče", "ketering za proslave"],
  openGraph: {
    title: "Wish Catering — Ketering u Beogradu",
    description: "Make a wish — we'll turn it into a dish.",
    locale: "sr_RS",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#022614",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Wish Catering",
  servesCuisine: "Ketering",
  slogan: "Make a wish — we'll turn it into a dish.",
  address: { "@type": "PostalAddress", addressLocality: "Beograd", addressCountry: "RS" },
  sameAs: [INSTAGRAM_URL],
  url: SITE_URL,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sr-Latn" suppressHydrationWarning className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="grain bg-ink text-cream">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
