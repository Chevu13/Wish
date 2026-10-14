import Image from "next/image";
import { ArrowUp } from "lucide-react";
import CtaCircle from "./CtaCircle";
import { INSTAGRAM_URL, INSTAGRAM_DM_URL, INSTAGRAM_HANDLE, NAV } from "@/lib/site";
import logo from "@/assets/wish-logo.jpg";

export default function Contact() {
  return (
    <footer id="kontakt" className="relative overflow-hidden bg-ink px-5 pt-24 md:px-10 md:pt-40">
      <p className="eyebrow mb-6 text-gold/70">(04) — Kontakt</p>

      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          <h2 data-split="lines" className="display text-[22vw] md:text-[13vw]">
            <em className="text-gold">Poželi.</em>
          </h2>
          <p data-split="lines" className="display mt-4 text-[8vw] leading-none text-cream/90 md:text-[3.6vw]">
            Mi ćemo vašu želju pretvoriti u zalogaj.
          </p>
          <p data-reveal="fade" className="mt-8 max-w-md leading-relaxed text-cream/70">
            Pišite nam na Instagramu — recite nam datum, prostor i broj gostiju, a mi ćemo osmisliti sto po vašoj meri.
          </p>

          <dl data-reveal="fade" className="mt-12 grid max-w-lg grid-cols-2 gap-8 border-t border-cream/15 pt-8 text-sm">
            <div>
              <dt className="eyebrow mb-2 text-cream/45">Upiti</dt>
              <dd>
                <a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="link-line text-cream">
                  Instagram poruka
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-2 text-cream/45">Lokacija</dt>
              <dd className="text-cream">Beograd, Srbija</dd>
            </div>
            <div className="col-span-2">
              <dt className="eyebrow mb-2 text-cream/45">Instagram</dt>
              <dd>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="link-line font-serif text-2xl italic text-gold md:text-3xl">
                  @{INSTAGRAM_HANDLE}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative flex flex-col items-center gap-10 md:col-span-5">
          {/* The real neon sign — same green as the page, so only the light remains */}
          <div data-flicker className="w-full max-w-[460px] [mask-image:radial-gradient(closest-side,#000_72%,transparent)]">
            <Image src={logo} alt="Svetleći Wish Catering znak" placeholder="blur" sizes="(min-width: 768px) 36vw, 90vw" className="h-auto w-full" />
          </div>
          <CtaCircle size="lg" label="Pošalji upit na Instagramu" />
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-5 border-t border-cream/10 py-6 text-xs text-cream/50 md:mt-24 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="link-line hover:text-cream">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <p>© 2026 Wish Catering · Beograd</p>
        <a href="#top" className="group flex items-center gap-2 hover:text-cream">
          Na vrh
          <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.25} />
        </a>
      </div>

    </footer>
  );
}
