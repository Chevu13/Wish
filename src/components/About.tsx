import Image from "next/image";
import casice from "@/assets/makarone-casice.jpg";

const PRINCIPLES = [
  { n: "01", t: "Estetika", d: "Sto koji gosti fotografišu pre nego što ga probaju." },
  { n: "02", t: "Ukus", d: "Slani zalogaji i deserti, pripremljeni za vaš dan." },
  { n: "03", t: "Detalj", d: "Cveće, zlato, natpisi i čašice sa našim potpisom." },
];

function Badge() {
  return (
    <svg viewBox="0 0 200 200" className="size-full animate-[spin_24s_linear_infinite] motion-reduce:animate-none" aria-hidden>
      <defs>
        <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <text className="fill-current font-sans text-[14.5px] uppercase tracking-[0.32em]">
        <textPath href="#badge-circle">Make a wish · we&apos;ll turn it into a dish ·</textPath>
      </text>
    </svg>
  );
}

export default function About() {
  return (
    <section id="o-nama" className="relative bg-cream px-5 py-24 text-deep md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <p className="eyebrow text-moss md:col-span-3">(01) — O nama</p>
        <p data-split="scrub" className="font-serif text-[7.4vw] font-light leading-[1.08] tracking-[-0.02em] md:col-span-9 md:text-[3.6vw]">
          Wish je beogradski ketering za sve koji žele da svaki zalogaj izgleda kao mali događaj. Svaki sto slažemo kao
          kompoziciju — <em className="text-moss">boje, ukuse, cveće i svetlo.</em>
        </p>
      </div>

      <div className="mt-20 grid gap-14 md:mt-36 md:grid-cols-12 md:gap-6">
        <figure className="relative md:col-span-5 md:col-start-1">
          <div data-reveal="img" className="overflow-hidden">
            <Image
              src={casice}
              alt="Makarone u providnim čašicama sa kremom i Wish Catering nalepnicama"
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -right-6 -top-14 size-28 text-moss md:-right-16 md:-top-16 md:size-36">
            <Badge />
          </div>
          <figcaption className="mt-4 flex justify-between text-xs text-deep/60">
            <span className="font-serif italic">Fig. 01</span>
            <span>Makarone u čašicama, sa našim potpisom</span>
          </figcaption>
        </figure>

        <div className="flex flex-col justify-end md:col-span-6 md:col-start-7">
          <h2 data-split="lines" className="display text-[13vw] text-deep md:text-[6.2vw]">
            Ime koje se <em className="text-moss">pamti.</em>
          </h2>
          <p data-reveal="fade" className="mt-8 max-w-md text-base leading-relaxed text-deep/75">
            Volimo stolove koji pričaju priču: zlatni tanjiri, beli cvetovi, jestive ljubičice i zalogaji poređani tako da
            pozivaju ruku. Vi nam kažete želju — mi brinemo o tome da izgleda i ima ukus baš onako kako ste je zamislili.
          </p>

          <ol className="mt-14 border-t border-deep/15">
            {PRINCIPLES.map((p) => (
              <li key={p.n} data-reveal="fade" className="grid grid-cols-[3rem_1fr] items-baseline gap-2 border-b border-deep/15 py-5 md:grid-cols-[4rem_10rem_1fr]">
                <span className="font-serif text-sm italic text-moss">{p.n}</span>
                <span className="display text-3xl">{p.t}</span>
                <span className="col-start-2 text-sm text-deep/65 md:col-start-auto">{p.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
