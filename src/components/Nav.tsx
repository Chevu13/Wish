"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { NAV, INSTAGRAM_DM_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/site";

type LenisLike = { stop(): void; start(): void; scrollTo(t: string | number, o?: object): void };
const getLenis = () => (window as unknown as { lenis?: LenisLike }).lenis;

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-baseline gap-2 ${className}`}>
      <span className="display text-[1.9rem] italic leading-none tracking-tight">
        <em>Wish</em>
      </span>
      <span className="eyebrow text-[0.6rem] opacity-70">Catering</span>
    </span>
  );
}

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const inner = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      bar.current?.toggleAttribute("data-hidden", y > last && y > 200);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance after the preloader.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(inner.current, { yPercent: -100, opacity: 0, duration: 1.4, delay: 3.0 });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    const links = panel.current?.querySelectorAll(".menu-item");
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      if (links && matchMedia(MOTION_OK).matches) gsap.fromTo(links, { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 1, delay: 0.25 });
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    // wait one frame so lenis is running again before scrolling
    requestAnimationFrame(() => {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(href, { duration: 1.6 });
      else document.querySelector(href)?.scrollIntoView();
    });
  };

  return (
    <>
      <header
        ref={bar}
        className={`group/nav fixed inset-x-0 top-0 z-50 transition-[translate,background-color,backdrop-filter] duration-700 ease-[var(--ease-out-expo)] data-[hidden]:-translate-y-full ${
          scrolled && !open ? "bg-ink/75 backdrop-blur-md" : ""
        }`}
      >
        <nav ref={inner} className="flex items-center justify-between px-5 py-4 md:px-10 md:py-5" aria-label="Glavna navigacija">
          <a href="#top" onClick={(e) => (e.preventDefault(), go("#top"))} className="relative z-10 text-cream" aria-label="Wish Catering — početak">
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV.map((n, i) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={(e) => (e.preventDefault(), go(n.href))}
                  className="group flex items-baseline gap-1.5 text-[0.82rem] text-cream/80 transition-colors hover:text-cream"
                >
                  <span className="font-serif text-[0.65rem] italic text-gold/70">0{i + 1}</span>
                  <span className="link-line">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-4">
            <a
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden overflow-hidden rounded-full border border-gold/50 px-5 py-2.5 text-[0.8rem] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink md:inline-flex"
            >
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">Pošalji upit</span>
                <span className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0">Pošalji upit</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex size-11 flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <span className="sr-only">{open ? "Zatvori meni" : "Otvori meni"}</span>
              <span className={`h-px w-7 bg-cream transition-transform duration-500 ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`h-px w-7 bg-cream transition-transform duration-500 ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={panel}
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-8 pt-28 transition-[clip-path] duration-[900ms] ease-[var(--ease-out-expo)] lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {NAV.map((n, i) => (
            <li key={n.href} className="overflow-hidden border-b border-cream/10 py-2">
              <a href={n.href} onClick={(e) => (e.preventDefault(), go(n.href))} className="menu-item flex items-baseline gap-4">
                <span className="font-serif text-sm italic text-gold">0{i + 1}</span>
                <span className="display text-[13vw] text-cream">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between text-cream/60">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="eyebrow">
            @{INSTAGRAM_HANDLE}
          </a>
          <span className="eyebrow">Beograd</span>
        </div>
      </div>
    </>
  );
}
