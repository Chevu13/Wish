"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, MOTION_OK } from "@/lib/gsap";

/**
 * Smooth scrolling + every declarative scroll animation on the page.
 * Sections opt in with data attributes, so they can stay server components:
 *   data-split="lines"   masked line reveal
 *   data-split="scrub"   words light up as you read
 *   data-reveal="img"    clip-path image reveal (ends uncropped)
 *   data-reveal="fade"   soft rise
 *   data-speed="0.2"     parallax drift
 */
export default function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const lenis = new Lenis({ lerp: 0.09, anchors: { offset: 0 } });
      (window as unknown as { lenis?: Lenis }).lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const splits: SplitText[] = [];

      gsap.utils.toArray<HTMLElement>('[data-split="lines"]').forEach((el) => {
        splits.push(
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.4,
                stagger: 0.08,
                // unmask after the reveal so descenders and carons are never clipped
                onComplete: () => self.revert(),
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          }),
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-split="scrub"]').forEach((el) => {
        splits.push(
          SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.16 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.1,
                  scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
                },
              ),
          }),
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="img"]').forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" });
        if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.2);
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0");
        gsap.fromTo(
          el,
          { yPercent: speed * 50 },
          {
            yPercent: speed * -50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-flicker]").forEach((el) => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 80%", once: true } })
          .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: "none" })
          .to(el, { opacity: 0.25, duration: 0.06, ease: "none" }, "+=0.1")
          .to(el, { opacity: 1, duration: 0.06, ease: "none" }, "+=0.08")
          .to(el, { opacity: 0.5, duration: 0.05, ease: "none" }, "+=0.25")
          .to(el, { opacity: 1, duration: 0.6, ease: "power2.out" });
      });

      return () => {
        splits.forEach((s) => s.revert());
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
