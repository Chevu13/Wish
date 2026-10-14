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
      tl.fromTo(q(".loader-logo"), { opacity: 0, scale: 0.94, filter: "blur(14px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" })
        .to(counter, { v: 100, duration: 1.5, ease: "power2.inOut", onUpdate: () => (counterEl.textContent = String(Math.round(counter.v)).padStart(3, "0")) }, 0)
        .to(q(".loader-logo"), { opacity: 0, scale: 1.04, duration: 0.6, ease: "power2.in" }, 1.6)
        .to(q("[data-loader]"), { clipPath: "inset(0% 0% 100% 0%)", duration: 1.3, ease: "expo.inOut" }, 1.85)
        .set(q("[data-loader]"), { display: "none" })
        .fromTo(q(".hero-frame"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }, 2.0)
        .fromTo(q(".hero-frame img"), { scale: 1.35 }, { scale: 1, duration: 2.6, ease: "expo.out" }, 2.3)
        .from(split.chars, { yPercent: 115, duration: 1.6, stagger: 0.045 }, 2.45)
        .from(q(".hero-fade"), { opacity: 0, y: 24, duration: 1.4, stagger: 0.1 }, 2.9);

      const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q(".hero-line-a"), { xPercent: -14, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".hero-line-b"), { xPercent: 14, ease: "none", scrollTrigger: scrub });
      gsap.to(q(".hero-frame-wrap"), { yPercent: 16, scale: 0.94, ease: "none", scrollTrigger: scrub });

      return () => {
        split.revert();
        lenis?.start();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink px-5 pb-6 pt-24 md:px-10 md:pb-8 md:pt-28">
      {/* Preloader — the real neon sign sits on the exact same green, so it melts into the page */}
      <div data-loader aria-hidden className="fixed inset-0 z-[80] grid place-items-center bg-ink motion-reduce:hidden">
        <div className="loader-logo w-[min(70vw,380px)] opacity-0 [mask-image:radial-gradient(closest-side,#000_70%,transparent)]">
          <Image src={logo} alt="" preload sizes="380px" />
        </div>
        <span className="loader-count display absolute bottom-6 right-6 text-5xl text-gold/80 md:bottom-10 md:right-10 md:text-7xl">000</span>
        <span className="eyebrow absolute bottom-8 left-6 text-cream/50 md:bottom-12 md:left-10">Postavljamo sto…</span>
      </div>

      <div className="hero-fade flex items-start justify-between text-cream/60">
        <p className="eyebrow whitespace-nowrap">Ketering — Beograd</p>
        <p className="eyebrow hidden md:block">44°49′ N · 20°27′ E</p>
        <p className="eyebrow hidden sm:block">Proslave · Slatki stolovi</p>
      </div>

      <div className="relative my-8 grid flex-1 place-items-center md:my-4">
        <h1 className="display pointer-events-none absolute inset-0 z-10 flex flex-col justify-center text-[25vw] text-cream md:text-[17.5vw]">
          <span className="sr-only">Wish Catering — poželi želju, mi ćemo je pretvoriti u zalogaj.</span>
          <span aria-hidden className="hero-line hero-line-a -translate-y-[78%] self-start md:-translate-y-[42%] md:pl-[2vw]">
            Poželi
          </span>
          <span aria-hidden className="hero-line hero-line-b translate-y-[78%] self-end pr-[1vw] italic text-gold md:translate-y-[42%] md:pr-[2vw]">
            <em>želju.</em>
          </span>
        </h1>

        <div className="hero-frame-wrap relative">
          <div className="hero-frame relative aspect-[3/4] w-[64vw] overflow-hidden md:w-auto md:h-[min(64svh,44vw)]">
            <Image
              src={terasa}
              alt="Švedski sto pod suncobranom na mermernoj terasi u sumrak"
              preload
              placeholder="blur"
              sizes="(min-width: 768px) 34vw, 64vw"
              className="size-full object-cover"
            />
          </div>
          <p className="hero-fade eyebrow absolute left-full top-0 ml-4 hidden whitespace-nowrap text-cream/50 [writing-mode:vertical-rl] md:block">
            Fig. 00 — Terasa u zlatni sat
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p className="hero-fade max-w-sm text-[0.95rem] leading-relaxed text-cream/75">
          <span className="font-serif text-lg italic text-gold">Make a wish — we&apos;ll turn it into a dish.</span>
          <br />
          Beogradski ketering za proslave, devojačke večeri i sve trenutke koji zaslužuju lepo postavljen sto.
        </p>
        <div className="hero-fade flex items-end justify-between gap-6 md:justify-end md:gap-12">
          <a href="#o-nama" className="eyebrow flex items-center gap-3 text-cream/60 hover:text-gold">
            <span className="relative block h-10 w-px overflow-hidden bg-cream/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
            </span>
            Skroluj
          </a>
          <CtaCircle />
        </div>
      </div>
    </section>
  );
}
