"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import bride from "@/assets/devojacko-vece.jpg";

const CHAPTERS = [
  { t: "Želja", d: "Sve počinje porukom. Recite nam kakvu proslavu zamišljate, koliko gostiju očekujete i šta volite." },
  { t: "Postavka", d: "Osmišljavamo meni i izgled stola — boje, cveće, posuđe i sitnice koje prate vašu priču." },
  { t: "Trenutak", d: "Gosti stižu pred sto koji ih čeka spreman, a vi ste slobodni da uživate u svom danu." },
];

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = root.current!;
    const triggers = gsap.utils.toArray<HTMLElement>(".chapter", el).map((c, i) =>
      ScrollTrigger.create({ trigger: c, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setStep(i) }),
    );
    const mm = gsap.matchMedia();
    mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
      gsap.fromTo(
        el.querySelector(".exp-frame"),
        { scale: 0.82 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: true } },
      );
    });
    return () => {
      triggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} id="dozivljaj" className="relative bg-ink px-5 py-24 md:px-10 md:py-40">
      <div className="mb-14 md:mb-24">
        <p className="eyebrow mb-6 text-gold/70">(04) — Doživljaj</p>
        <h2 data-split="lines" className="display text-[16vw] md:text-[10vw]">
          Veče koje <em className="text-gold">pamtite</em>
        </h2>
      </div>

      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6 lg:col-span-5">
          <div className="md:sticky md:top-[9svh]">
            <div className="exp-frame relative mx-auto origin-top md:h-[82svh] md:w-auto md:max-w-full md:aspect-[3/4]">
              <div data-reveal="img" className="size-full overflow-hidden">
                <Image
                  src={bride}
                  alt="Mlada sa velom i lentom jede grožđe ispred stola sa zalogajima na devojačkom veču"
                  placeholder="blur"
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="h-auto w-full md:size-full md:object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-0 right-0 flex translate-y-full items-baseline justify-between pt-3 text-xs text-cream/55">
                <span className="font-serif italic">Fig. 06 — Devojačko veče</span>
                <span className="font-serif text-base text-gold" aria-live="polite">
                  0{step + 1} <span className="text-cream/40">/ 0{CHAPTERS.length}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <ol className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          {CHAPTERS.map((c, i) => (
            <li key={c.t} className="chapter flex min-h-[48svh] flex-col justify-center border-t border-cream/10 py-12 md:min-h-[72svh]">
              <span
                className={`display text-[22vw] leading-none transition-colors duration-700 md:text-[9vw] ${
                  step === i ? "text-gold" : "text-cream/15"
                }`}
              >
                0{i + 1}
              </span>
              <h3 data-split="lines" className="display mt-4 text-5xl md:text-7xl">
                <em>{c.t}</em>
              </h3>
              <p data-reveal="fade" className="mt-6 max-w-sm leading-relaxed text-cream/70">
                {c.d}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <blockquote className="mx-auto mt-24 max-w-5xl text-center md:mt-40">
        <p data-split="lines" className="display text-[10vw] md:text-[5.4vw]">
          „Svaki sto je mala <em className="text-gold">proslava</em> pre same proslave.“
        </p>
      </blockquote>
    </section>
  );
}
