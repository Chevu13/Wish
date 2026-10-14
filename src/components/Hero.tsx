"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, MOTION_OK } from "@/lib/gsap";
import CtaCircle from "./CtaCircle";
import terasa from "@/assets/terasa-zalazak.jpg";
import glow from "@/assets/terasa-glow.jpg";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      // Hero is on screen immediately: a short entrance, scrolling never blocked.
      const split = SplitText.create(q(".hero-line"), { type: "chars", mask: "chars" });
      gsap.set(q(".hero-line"), { opacity: 1 });
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(q(".hero-frame img"), { scale: 1.12 }, { scale: 1, duration: 1.8 }, 0)
        .from(split.chars, { yPercent: 115, duration: 1.1, stagger: 0.03, onComplete: () => split.revert() }, 0.05)
        .to(q(".hero-fade"), { opacity: 1, y: 0, duration: 1, stagger: 0.06 }, 0.35);

      const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q("h1"), { yPercent: -30, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".hero-frame-wrap"), { yPercent: 12, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".hero-bg"), { yPercent: 25, ease: "none", scrollTrigger: scrub });

      return () => split.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink px-5 pb-6 pt-28 md:px-10 md:pb-8 md:pt-32">
      {/* Atmosphere: the same sunset, blurred into light — the sharp photo below stays uncropped */}
      <div aria-hidden className="hero-bg pointer-events-none absolute inset-0 -z-0">
        <Image src={glow} alt="" fill unoptimized className="scale-110 object-cover opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_30%,transparent_5%,color-mix(in_oklab,var(--color-ink)_70%,transparent)_45%,var(--color-ink)_85%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col md:grid md:grid-cols-12 md:items-center md:gap-6">
        <div className="contents md:col-span-7 md:block md:pr-4">
          <p className="hero-fade eyebrow order-1 mb-5 flex items-center gap-3 text-gold/80 md:mb-10">
            <span className="h-px w-10 bg-gold/60" /> Ketering · Beograd
          </p>
          <h1 className="display relative z-20 order-2 text-[21vw] text-cream [text-shadow:0_4px_30px_rgba(2,38,20,0.55)] md:text-[10.5vw] md:[text-shadow:none]">
            <span className="sr-only">Wish Catering — poželi želju, mi ćemo je pretvoriti u zalogaj.</span>
            <span aria-hidden className="hero-line block">Poželi</span>
            <span aria-hidden className="hero-line block pl-[12vw] text-gold md:pl-[7vw]">
              <em className="[font-variation-settings:'SOFT'_50,'WONK'_0]">želju.</em>
            </span>
          </h1>
          <p className="hero-fade order-4 mt-7 max-w-md font-serif text-[1.35rem] font-light italic leading-snug text-cream/90 md:mt-10 md:text-[1.7vw]">
            Mi ćemo je pretvoriti u zalogaj.
          </p>
          <div className="hero-fade order-5 mt-6 flex items-center gap-6 md:mt-12 md:gap-8">
            <CtaCircle />
            <p className="max-w-[16rem] text-sm leading-relaxed text-cream/65">
              Ketering za proslave, devojačke večeri i sve trenutke koji zaslužuju lepo postavljen sto.
            </p>
          </div>
        </div>

        <figure className="hero-frame-wrap relative z-10 order-3 -mt-[5vw] ml-auto w-[70vw] md:order-none md:col-span-5 md:mt-0 md:w-full md:max-w-[min(100%,calc(68svh*0.75))]">
          <div className="hero-frame relative aspect-[3/4] overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]">
            <Image
              src={terasa}
              alt="Švedski sto pod suncobranom na mermernoj terasi u sumrak"
              preload
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 78vw"
              className="size-full object-cover"
            />
          </div>
          <figcaption className="hero-fade mt-3 flex justify-between text-xs text-cream/55">
            <span className="font-serif italic">Terasa u zlatni sat</span>
            <span>Fig. 00</span>
          </figcaption>
        </figure>
      </div>

      <div className="hero-fade relative z-10 mt-8 flex items-center justify-between border-t border-cream/15 pt-5 text-cream/55">
        <a href="#o-nama" className="eyebrow flex items-center gap-3 hover:text-gold">
          <span className="relative block h-6 w-px overflow-hidden bg-cream/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
          </span>
          Skroluj
        </a>
        <p className="eyebrow hidden md:block">Proslave · Švedski stolovi · Slatki stolovi</p>
        <p className="eyebrow">Make a wish</p>
      </div>
    </section>
  );
}
