"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import bride from "@/assets/devojacko-vece.jpg";
import sto from "@/assets/svedski-sto.jpg";
import kornet from "@/assets/makarone-kornet.jpg";
import koktel from "@/assets/koktel-dobrodoslice.jpg";

type Service = { title: string; em: string; tag: string; desc: string; img: StaticImageData; alt: string };

const SERVICES: Service[] = [
  { title: "Devojačke", em: "večeri", tag: "Privatne proslave", desc: "Bela, zlatna i razigrana postavka za veče pre velikog dana — zalogaji, voće i detalji koji traže fotografiju.", img: bride, alt: "Mlada sa velom jede grožđe ispred stola sa zalogajima" },
  { title: "Švedski", em: "stolovi", tag: "Proslave i događaji", desc: "Raskošni stolovi sa slanim zalogajima, cvećem i zlatnim detaljima, složeni tako da pozivaju ruku.", img: sto, alt: "Zlatni tanjir sa tartovima od lososa i mirođije među belim hortenzijama" },
  { title: "Slatki", em: "stolovi", tag: "Deserti", desc: "Makarone, tartovi i kornetići, okićeni jestivim cvećem — slatki kraj koji se pamti.", img: kornet, alt: "Drveni stalak sa makaronama u kornetima i jestivim ljubičicama" },
  { title: "Koktel", em: "dobrodošlice", tag: "Piće", desc: "Prvi utisak u čaši — osvežavajući welcome drink sa ružom za vaše goste.", img: koktel, alt: "Niz čaša sa narandžasto-crvenim koktelom i ružama" },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = root.current!;
    const triggers = gsap.utils.toArray<HTMLElement>(".service", el).map((c, i) =>
      ScrollTrigger.create({ trigger: c, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setStep(i) }),
    );
    const mm = gsap.matchMedia();
    mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
      gsap.fromTo(
        el.querySelector(".svc-frame"),
        { scale: 0.82 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top top", scrub: true } },
      );
    });
    return () => {
      triggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} id="usluge" className="relative bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-6 text-gold/70">(02) — Usluge</p>
          <h2 data-split="lines" className="display text-[15vw] md:text-[8vw]">
            Šta <em className="text-gold">postavljamo</em>
          </h2>
        </div>
        <p data-reveal="fade" className="max-w-xs text-sm leading-relaxed text-cream/65">
          Od intimnih okupljanja do velikih proslava — svaki sto osmišljavamo prema prilici, prostoru i vašoj želji.
        </p>
      </div>

      <div className="grid md:grid-cols-12 md:gap-6">
        {/* Desktop: one sticky frame, the photo changes with the service you are reading */}
        <div className="hidden md:col-span-6 md:block lg:col-span-5">
          <div className="sticky top-[9svh]">
            <div className="svc-frame relative mx-auto aspect-[3/4] h-[82svh] max-w-full origin-top">
              <div data-reveal="img" className="relative size-full overflow-hidden">
                {SERVICES.map((s, i) => (
                  <Image
                    key={s.title + s.em}
                    src={s.img}
                    alt={s.alt}
                    placeholder="blur"
                    sizes="45vw"
                    className={`absolute inset-0 size-full object-cover transition-[clip-path,scale] duration-[1200ms] ease-[var(--ease-out-expo)] ${
                      i <= step ? "scale-100 [clip-path:inset(0_0_0_0)]" : "scale-110 [clip-path:inset(100%_0_0_0)]"
                    }`}
                    style={{ zIndex: i }}
                  />
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-baseline justify-between pt-3 text-xs text-cream/55">
                <span className="font-serif italic">
                  {SERVICES[step].title} {SERVICES[step].em}
                </span>
                <span className="font-serif text-base text-gold" aria-live="polite">
                  0{step + 1} <span className="text-cream/40">/ 0{SERVICES.length}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <ol className="md:col-span-6 md:col-start-7">
          {SERVICES.map((s, i) => (
            <li key={s.title + s.em} className="service flex flex-col justify-center border-t border-cream/10 py-12 md:min-h-[72svh]">
              <div data-reveal="img" className="mb-8 overflow-hidden md:hidden">
                <Image src={s.img} alt={s.alt} placeholder="blur" sizes="90vw" className="h-auto w-full" />
              </div>
              <span
                className={`display text-[18vw] leading-none transition-colors duration-700 md:text-[8vw] ${
                  step === i ? "text-gold" : "text-cream/15"
                }`}
              >
                0{i + 1}
              </span>
              <p className="eyebrow mt-6 text-cream/45">{s.tag}</p>
              <h3 data-split="lines" className="display mt-3 text-[13vw] md:text-6xl lg:text-7xl">
                {s.title} <em className="text-gold">{s.em}</em>
              </h3>
              <p data-reveal="fade" className="mt-6 max-w-sm leading-relaxed text-cream/70">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
