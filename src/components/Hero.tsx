"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, MOTION_OK } from "@/lib/gsap";
import CtaCircle from "./CtaCircle";
import terasa from "@/assets/terasa-zalazak.jpg";
import logo from "@/assets/wish-logo.jpg";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } }).lenis;
      lenis?.stop();

      const split = SplitText.create(q(".hero-line"), { type: "chars", mask: "chars" });
      const counter = { v: 0 };
      const counterEl = q(".loader-count")[0];

      const tl = gsap.timeline({ onComplete: () => lenis?.start() });
      // drop the masks once letters are in, so descenders (j) and carons (ž) are never clipped
      const unmask = () => split.revert();
      tl.fromTo(q(".loader-logo"), { opacity: 0, scale: 0.94, filter: "blur(14px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" })
        .to(counter, { v: 100, duration: 1.5, ease: "power2.inOut", onUpdate: () => (counterEl.textContent = String(Math.round(counter.v)).padStart(3, "0")) }, 0)
        .to(q(".loader-logo"), { opacity: 0, scale: 1.04, duration: 0.6, ease: "power2.in" }, 1.6)
        .to(q("[data-loader]"), { clipPath: "inset(0% 0% 100% 0%)", duration: 1.3, ease: "expo.inOut" }, 1.85)
        .set(q("[data-loader]"), { display: "none" })
        .fromTo(q(".hero-frame"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }, 2.0)
        .fromTo(q(".hero-frame img"), { scale: 1.35 }, { scale: 1, duration: 2.6, ease: "expo.out" }, 2.3)
        .from(split.chars, { yPercent: 115, duration: 1.6, stagger: 0.045, onComplete: unmask }, 2.45)
        .from(q(".hero-fade"), { opacity: 0, y: 24, duration: 1.4, stagger: 0.1 }, 2.9)
        .from(q(".hero-bg"), { opacity: 0, duration: 2.4, ease: "power2.out" }, 1.9);

      const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q("h1"), { yPercent: -30, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".hero-frame-wrap"), { yPercent: 12, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".hero-bg"), { yPercent: 25, ease: "none", scrollTrigger: scrub });

      return () => {
        split.revert();
        lenis?.start();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink px-5 pb-6 pt-28 md:px-10 md:pb-8 md:pt-32">
      {/* Preloader — the real neon sign sits on the exact same green, so it melts into the page */}
      <div data-loader aria-hidden className="fixed inset-0 z-[80] grid place-items-center bg-ink motion-reduce:hidden">
        <div className="loader-logo w-[min(70vw,380px)] opacity-0 [mask-image:radial-gradient(closest-side,#000_70%,transparent)]">
          <Image src={logo} alt="" preload sizes="380px" />
        </div>
        <span className="loader-count display absolute bottom-6 right-6 text-5xl text-gold/80 md:bottom-10 md:right-10 md:text-7xl">000</span>
        <span className="eyebrow absolute bottom-8 left-6 text-cream/50 md:bottom-12 md:left-10">Postavljamo sto…</span>
      </div>

      {/* Atmosphere: the same sunset, blurred into light — the sharp photo below stays uncropped */}
      <div aria-hidden className="hero-bg pointer-events-none absolute inset-0 -z-0">
        <Image src={terasa} alt="" fill sizes="40vw" quality={75} className="scale-125 object-cover opacity-80 blur-3xl saturate-150" />
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
