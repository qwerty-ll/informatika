import FadeIn from '../components/FadeIn';
import PriceTerminal from '../components/PriceTerminal';

export default function ServicesSection() {
  return (
    <section id="services" className="px-3 sm:px-5 md:px-8">
      <div className="mx-auto max-w-[1400px] rounded-[36px] border border-line bg-surface px-4 py-20 shadow-soft sm:rounded-[48px] sm:px-8 sm:py-24 md:rounded-[60px] md:px-10 md:py-28">
        <FadeIn delay={0} y={40} className="mb-12 flex flex-col items-center gap-4 sm:mb-14 md:mb-16">
          <span className="font-mono text-sm text-muted">{'// 02 — услуги'}</span>
          <h2
            className="text-center font-mono font-extrabold uppercase leading-none tracking-tighter text-ink"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 140px)' }}
          >
            Цены
          </h2>
        </FadeIn>
        <PriceTerminal />
      </div>
    </section>
  );
}
