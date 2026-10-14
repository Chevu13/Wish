import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";
import { INSTAGRAM_DM_URL } from "@/lib/site";

/** Round gold call-to-action that floods with gold on hover. */
export default function CtaCircle({ label = "Pošalji upit", size = "md" }: { label?: string; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "size-40 md:size-52" : "size-28 md:size-36";
  return (
    <Magnetic>
      <a
        href={INSTAGRAM_DM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative grid ${dim} place-items-center overflow-hidden rounded-full border border-gold/60 text-gold transition-colors duration-500 hover:text-ink`}
      >
        <span className="absolute inset-0 translate-y-full rounded-full bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0" />
        <span className="relative flex flex-col items-center gap-1 text-center">
          <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} />
          <span className="eyebrow max-w-[7rem] leading-relaxed">{label}</span>
        </span>
      </a>
    </Magnetic>
  );
}
