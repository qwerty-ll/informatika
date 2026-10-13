import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { HERO_CHIPS, HERO_PORTRAIT, HERO_TAGLINE, NAV_LINKS, TUTOR_NAME } from '../data/content';

const CHIP_POSITIONS = [
  'left-[-18%] top-[22%] -rotate-6 bg-tint-violet',
  'right-[-14%] top-[48%] rotate-3 bg-tint-blue',
  'left-[-10%] top-[62%] rotate-2 bg-tint-green',
  'right-[-20%] top-[14%] -rotate-3 bg-tint-cyan',
];

export default function HeroSection() {
  return (
    <section id="top" className="relative flex h-screen min-h-[640px] flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-20 flex items-center justify-between gap-6 px-5 pt-5 sm:px-8 md:px-10 md:pt-7"
      >
        <a href="#top" className="flex items-center gap-2 font-medium text-ink">
          <span className="font-mono text-accent">{'{ }'}</span>
          {TUTOR_NAME}
        </a>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative block py-1 font-mono text-sm text-muted transition-colors duration-100 hover:text-accent focus-visible:text-accent"
                >
                  {link.label}
                  {/* линия выезжает слева при наведении и уезжает вправо, когда курсор уходит */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-right scale-x-0 rounded-full bg-accent transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 motion-reduce:transition-none"
                  />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs font-medium text-ink shadow-soft transition-colors duration-200 hover:border-accent hover:text-accent sm:text-sm"
          >
            Записаться
          </a>
        </div>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="mt-8 w-full whitespace-nowrap pb-[0.08em] text-center text-[13vw] font-mono font-extrabold uppercase leading-none tracking-tighter text-ink sm:mt-6 md:mt-4">
            Информатика
            <span className="caret text-accent" aria-hidden="true">
              _
            </span>
          </h1>
        </FadeIn>
      </div>

      {/* Портрет: позиция — на внешнем элементе, FadeIn — внутри, чтобы transform'ы не конфликтовали */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[260px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[340px] sm:translate-y-0 md:w-[420px] lg:w-[480px]">
        <FadeIn delay={0.5} y={30} duration={0.9}>
          <div
            aria-hidden="true"
            className="absolute bottom-[6%] left-1/2 aspect-square w-[92%] -translate-x-1/2 rounded-full bg-accent-soft"
          />
        </FadeIn>
        <FadeIn delay={0.6} y={30}>
          <img
            src={HERO_PORTRAIT}
            alt={`${TUTOR_NAME} — репетитор по информатике`}
            width={892}
            height={944}
            draggable={false}
            className="relative block h-auto w-full select-none"
            style={{
              maskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 84%, transparent 100%)',
            }}
          />
        </FadeIn>
        {HERO_CHIPS.map((chip, i) => (
          <FadeIn
            key={chip}
            delay={0.9 + i * 0.12}
            y={12}
            className={`absolute hidden whitespace-nowrap rounded-full border border-line px-4 py-2 font-mono text-sm font-medium text-ink shadow-soft lg:block ${CHIP_POSITIONS[i % CHIP_POSITIONS.length]}`}
          >
            {chip}
          </FadeIn>
        ))}
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-6 px-5 pb-6 sm:px-8 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[180px] leading-snug text-muted sm:max-w-[260px] md:max-w-[300px]"
            style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.15rem)' }}
          >
            {HERO_TAGLINE}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
