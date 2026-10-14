"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import bride from "@/assets/devojacko-vece.jpg";
import sto from "@/assets/svedski-sto.jpg";
import kornet from "@/assets/makarone-kornet.jpg";
import koktel from "@/assets/koktel-dobrodoslice.jpg";

type Service = { title: string; em: string; tag: string; desc: string; img: StaticImageData; alt: string };

const SERVICES: Service[] = [
  { title: "Devojačke", em: "večeri", tag: "Privatne proslave", desc: "Bela, zlatna i razigrana postavka za veče pre velikog dana.", img: bride, alt: "Mlada sa velom jede grožđe ispred stola sa zalogajima" },
  { title: "Švedski", em: "stolovi", tag: "Proslave i događaji", desc: "Raskošni stolovi sa slanim zalogajima, cvećem i zlatnim detaljima.", img: sto, alt: "Zlatni tanjir sa tartovima od lososa i mirođije među belim hortenzijama" },
  { title: "Slatki", em: "stolovi", tag: "Deserti", desc: "Makarone, tartovi i kornetići, okićeni jestivim cvećem.", img: kornet, alt: "Drveni stalak sa makaronama u kornetima i jestivim ljubičicama" },
  { title: "Koktel", em: "dobrodošlice", tag: "Piće", desc: "Prvi utisak u čaši — osvežavajući welcome drink za vaše goste.", img: koktel, alt: "Niz čaša sa narandžasto-crvenim koktelom i ružama" },
];

export default function Services() {
  const list = useRef<HTMLOListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Floating preview follows the cursor with a soft lag.
  useEffect(() => {
    const el = preview.current;
    const ul = list.current;
    if (!el || !ul || !matchMedia("(pointer: fine)").matches) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 0 : 0.9;
    const x = gsap.quickTo(el, "x", { duration: dur, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: dur, ease: "power3" });
    const rot = gsap.quickTo(el, "rotation", { duration: dur * 1.4, ease: "power3" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      if (!reduce) rot(gsap.utils.clamp(-5, 5, (e.clientX - lastX) * 0.3));
      lastX = e.clientX;
    };
    ul.addEventListener("pointermove", move);
    return () => ul.removeEventListener("pointermove", move);
  }, []);

  return (
    <section id="usluge" className="relative bg-ink px-5 py-24 md:px-10 md:py-40">
      <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-6 text-gold/70">(02) — Usluge</p>
          <h2 data-split="lines" className="display text-[17vw] md:text-[10vw]">
            Šta <em className="text-gold">postavljamo</em>
          </h2>
        </div>
        <p data-reveal="fade" className="max-w-xs text-sm leading-relaxed text-cream/65">
          Od intimnih okupljanja do velikih proslava — svaki sto osmišljavamo prema prilici, prostoru i vašoj želji.
        </p>
      </div>

      <ol ref={list} onPointerLeave={() => setActive(null)} className="border-t border-cream/15">
        {SERVICES.map((s, i) => (
          <li
            key={s.title + s.em}
            onPointerEnter={() => setActive(i)}
            className={`group relative border-b border-cream/15 transition-opacity duration-500 ${active !== null && active !== i ? "md:opacity-35" : ""}`}
          >
            <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-7 md:grid-cols-[5rem_1fr_18rem_2rem] md:py-10">
              <span className="font-serif text-sm italic text-gold md:order-none">0{i + 1}</span>
              <div className="relative row-span-3 w-[30vw] overflow-hidden md:hidden" data-reveal="img">
                <Image src={s.img} alt={s.alt} placeholder="blur" sizes="30vw" className="h-auto w-full" />
              </div>
              <h3 className="display text-[11vw] transition-transform duration-700 ease-[var(--ease-out-expo)] md:text-[6.4vw] md:group-hover:translate-x-6">
                {s.title} <em className="text-gold">{s.em}</em>
              </h3>
              <div className="text-sm text-cream/65">
                <p className="eyebrow mb-2 text-cream/40">{s.tag}</p>
                <p className="leading-relaxed">{s.desc}</p>
              </div>
              <ArrowUpRight
                className="hidden size-7 text-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45 md:block"
                strokeWidth={1}
                aria-hidden
              />
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop cursor preview — every photo sits in its native 3:4 frame */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
      >
        <div
          className={`relative -ml-[10vw] -mt-[13.33vw] aspect-[3/4] w-[20vw] overflow-hidden transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] ${
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {SERVICES.map((s, i) => (
            <Image
              key={i}
              src={s.img}
              alt=""
              sizes="20vw"
              className={`absolute inset-0 size-full object-cover transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] ${
                active === i ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(100%_0_0_0)]"
              }`}
              style={{ zIndex: active === i ? 2 : 1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
