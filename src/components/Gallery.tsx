"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { INSTAGRAM_URL } from "@/lib/site";
import vafli from "@/assets/vafli.jpg";
import koktel from "@/assets/koktel-dobrodoslice.jpg";
import kornet from "@/assets/makarone-kornet.jpg";
import sto from "@/assets/svedski-sto.jpg";

type Shot = { img: StaticImageData; alt: string; caption: string; h: string; align: string };

// Heights vary for rhythm; every frame keeps the photo's native 3:4 ratio.
const SHOTS: Shot[] = [
  { img: vafli, alt: "Vafli sa jagodama, borovnicama, nanom i čokoladnim prelivom", caption: "Vafli, bobice i nana", h: "lg:h-[64svh]", align: "lg:self-start" },
  { img: koktel, alt: "Koktel dobrodošlice u visokim čašama sa crvenim ružama", caption: "Koktel sa ružom", h: "lg:h-[52svh]", align: "lg:self-end" },
  { img: kornet, alt: "Makarone u drvenim kornetima sa jestivim cvećem", caption: "Makarone u kornetima", h: "lg:h-[72svh]", align: "lg:self-center" },
  { img: sto, alt: "Postavljen sto sa tartovima od lososa, čokoladnim korpicama i makaronama", caption: "Losos, tartovi i cveće", h: "lg:h-[58svh]", align: "lg:self-start" },
];

export default function Gallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  // Touch sizes: progress line + counter follow the native swipe.
  const onSwipe = () => {
    const t = track.current!;
    if (window.innerWidth >= 1024) return;
    const max = t.scrollWidth - t.clientWidth;
    const p = max > 0 ? t.scrollLeft / max : 0;
    if (bar.current) bar.current.style.transform = `scaleX(${0.12 + p * 0.88})`;
    if (count.current) count.current.textContent = `0${Math.min(SHOTS.length, Math.round(p * (SHOTS.length - 1)) + 1)}`;
  };
  const step = (dir: number) => {
    const t = track.current!;
    const cards = Array.from(t.querySelectorAll<HTMLElement>("figure, a"));
    const pad = parseFloat(getComputedStyle(t).paddingLeft);
    const lefts = cards.map((c) => c.offsetLeft - pad);
    const now = lefts.findIndex((l) => l >= t.scrollLeft - 4);
    const i = Math.max(0, Math.min(lefts.length - 1, (now < 0 ? lefts.length - 1 : now) + dir));
    t.scrollTo({ left: lefts[i], behavior: "smooth" });
  };

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const s = section.current!;
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth;
      const setHeight = () => (s.style.height = `${distance() + window.innerHeight}px`);
      setHeight();

      const skew = gsap.quickTo(t.querySelectorAll("figure"), "skewX", { duration: 0.6, ease: "power3" });
      const st = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: s,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: setHeight,
          onUpdate: (self) => skew(gsap.utils.clamp(-4, 4, self.getVelocity() / -500)),
          onScrubComplete: () => skew(0),
        },
      });
      gsap.to(s.querySelector(".gallery-bg"), {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: true },
      });
      gsap.to(s.querySelector(".gallery-progress"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: true },
      });
      ScrollTrigger.refresh();

      return () => {
        st.scrollTrigger?.kill();
        s.style.height = "";
      };
    });
    // Touch layouts: one gentle nudge when the row arrives, to show it scrolls sideways.
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const nudge = { x: 0 };
      gsap
        .timeline({ scrollTrigger: { trigger: t, start: "top 75%", once: true } })
        .to(nudge, { x: 90, duration: 0.7, ease: "power2.inOut", onUpdate: () => t.scrollTo({ left: nudge.x }) }, 0.3)
        .to(nudge, { x: 0, duration: 0.9, ease: "power3.out", onUpdate: () => t.scrollTo({ left: nudge.x }) });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="galerija" className="relative bg-paper text-deep">
      <div className="relative overflow-hidden py-20 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:py-0">
        <p aria-hidden className="gallery-bg display pointer-events-none absolute bottom-[-4vw] left-0 hidden whitespace-nowrap text-[26vw] italic text-deep/[0.05] lg:block">
          <em>Galerija · Galerija · Galerija</em>
        </p>

        <div className="mb-10 px-5 lg:hidden">
          <p className="eyebrow text-moss">(03) — Galerija</p>
          <h2 data-split="lines" className="display mt-6 text-[15vw] md:text-[9vw]">
            Sto kao <em className="text-moss">umetnost</em>
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-deep/70">
            Nekoliko kadrova sa naših postavki. Svaki tanjir slažemo za oko — a tek onda za apetit.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-serif text-sm italic text-moss">
              <span ref={count}>01</span> <span className="text-deep/40">/ 0{SHOTS.length}</span>
            </span>
            <div className="h-px flex-1 bg-deep/15">
              <div ref={bar} className="h-full origin-left scale-x-[0.12] bg-moss transition-transform duration-300" />
            </div>
            <button type="button" onClick={() => step(-1)} aria-label="Prethodna fotografija" className="grid size-11 place-items-center rounded-full border border-deep/25 active:bg-deep active:text-cream">
              <ArrowLeft className="size-4" strokeWidth={1.25} />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Sledeća fotografija" className="grid size-11 place-items-center rounded-full bg-deep text-cream active:bg-moss">
              <ArrowRight className="size-4" strokeWidth={1.25} />
            </button>
          </div>
        </div>

        <div
          ref={track}
          onScroll={onSwipe}
          className="snap-row relative flex scroll-px-5 gap-5 overflow-x-auto px-5 lg:h-[82svh] lg:items-stretch lg:gap-[6vw] lg:motion-safe:w-max lg:motion-safe:overflow-visible lg:px-10"
        >
          <div className="hidden shrink-0 flex-col justify-between lg:flex lg:w-[34vw]">
            <p className="eyebrow text-moss">(03) — Galerija</p>
            <div>
              <h2 data-split="lines" className="display lg:text-[6.6vw]">
                Sto kao <em className="text-moss">umetnost</em>
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-deep/70">
                Nekoliko kadrova sa naših postavki. Svaki tanjir slažemo za oko — a tek onda za apetit.
              </p>
              <p className="eyebrow mt-10 text-deep/50">Skroluj →</p>
            </div>
          </div>

          {SHOTS.map((s, i) => (
            <figure key={s.caption} className={`group w-[76vw] shrink-0 snap-start md:w-[40vw] lg:w-auto ${s.align}`}>
              <div className={`relative overflow-hidden ${s.h} lg:aspect-[3/4]`}>
                <Image
                  src={s.img}
                  alt={s.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 76vw"
                  className="h-auto w-full transition-[filter] duration-700 group-hover:brightness-105 lg:size-full lg:object-cover"
                />
                <span className="pointer-events-none absolute inset-3 border border-cream/0 transition-colors duration-700 group-hover:border-cream/70" />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-xs text-deep/60">
                <span className="font-serif text-sm italic transition-colors group-hover:text-moss">Fig. 0{i + 2}</span>
                <span className="translate-y-0 transition-transform duration-500 lg:translate-y-1 lg:group-hover:translate-y-0">{s.caption}</span>
              </figcaption>
            </figure>
          ))}

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-[60vw] shrink-0 snap-center flex-col justify-center md:w-[34vw] lg:w-[30vw] lg:pr-[4vw]"
          >
            <span className="eyebrow text-moss">Još kadrova</span>
            <span className="display mt-4 text-[13vw] md:text-[7vw] lg:text-[4.4vw]">
              Na <em className="text-moss">Instagramu</em>
            </span>
            <span className="mt-8 grid size-16 place-items-center rounded-full border border-deep/30 transition-colors duration-500 group-hover:bg-deep group-hover:text-cream">
              <ArrowUpRight className="size-6 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} />
            </span>
          </a>
          <span className="w-px shrink-0 lg:hidden" aria-hidden />
        </div>

        <div className="absolute inset-x-10 bottom-8 hidden h-px bg-deep/15 lg:block">
          <div className="gallery-progress h-full origin-left scale-x-0 bg-moss" />
        </div>
      </div>
    </section>
  );
}
