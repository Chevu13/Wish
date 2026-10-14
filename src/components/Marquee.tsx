const WORDS = ["Devojačke večeri", "Švedski sto", "Slatki stolovi", "Koktel dobrodošlice", "Finger food", "Proslave"];

export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <li key={w} className="flex items-center">
          <span className="display px-6 text-[11vw] italic text-cream md:px-10 md:text-[6.5vw]">
            <em>{w}</em>
          </span>
          <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-gold md:size-9" aria-hidden>
            <path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-cream/10 bg-ink py-6 md:py-8">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
