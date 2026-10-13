import FadeIn from '../components/FadeIn';
import { SERVICES, SERVICES_NOTE } from '../data/content';

export default function ServicesSection() {
  return (
    <section id="services" className="px-3 sm:px-5 md:px-8">
      <div className="mx-auto max-w-[1400px] rounded-[36px] border border-line bg-surface px-5 py-20 shadow-soft sm:rounded-[48px] sm:px-8 sm:py-24 md:rounded-[60px] md:px-10 md:py-28">
        <FadeIn delay={0} y={40} className="flex flex-col items-center gap-4">
          <span className="font-mono text-sm text-muted">{'// 02 — услуги'}</span>
          <h2
            className="text-center font-mono font-extrabold uppercase leading-none tracking-tighter text-ink"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 140px)' }}
          >
            Цены
          </h2>
          <p className="mt-2 text-center font-mono text-sm text-muted">{SERVICES_NOTE}</p>
        </FadeIn>

        <ul className="mx-auto mt-14 flex max-w-4xl flex-col gap-2 sm:mt-16 md:mt-20">
          {SERVICES.map((service, i) => {
            const featured = i === 0;
            return (
              <FadeIn
                as="li"
                key={service.name}
                delay={i * 0.05}
                className={`grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 rounded-3xl px-4 py-5 transition-colors duration-200 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-x-8 sm:px-6 sm:py-6 ${
                  featured ? 'bg-accent-soft' : 'hover:bg-canvas'
                }`}
              >
                <span className="pt-0.5 font-mono text-sm text-muted sm:pt-0 sm:text-base">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 font-medium leading-tight text-ink"
                    style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.45rem)' }}
                  >
                    {service.name}
                    {featured ? (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-xs font-normal text-white">
                        начните с этого
                      </span>
                    ) : null}
                  </h3>
                  <p className="max-w-xl leading-relaxed text-muted" style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1rem)' }}>
                    {service.description}
                  </p>
                </div>
                <span
                  className={`col-start-2 w-fit whitespace-nowrap rounded-full px-4 py-1.5 font-mono font-medium sm:col-start-3 ${
                    featured ? 'bg-accent text-white' : 'bg-sand text-ink'
                  }`}
                  style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
                >
                  {service.price}
                </span>
              </FadeIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
