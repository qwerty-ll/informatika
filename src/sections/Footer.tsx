import { Mail, MessageCircle } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { BOOKING_LINK, CONTACTS, TUTOR_NAME } from '../data/content';

const CONTACT_LINKS = [
  { icon: MessageCircle, label: 'ВКонтакте', href: CONTACTS.vk },
  { icon: Mail, label: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
];

export default function Footer() {
  return (
    <footer id="contact" className="px-3 pb-8 pt-8 sm:px-5 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 rounded-[36px] bg-accent px-5 py-20 text-center shadow-lift sm:rounded-[48px] sm:px-8 sm:py-24 md:rounded-[60px] md:py-28">
        <FadeIn delay={0} y={40} className="flex flex-col items-center gap-4">
          <span className="font-mono text-sm text-accent-pale">{'// 04 — запись'}</span>
          <h2
            className="font-mono font-extrabold uppercase leading-none tracking-tighter text-canvas"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 140px)' }}
          >
            Начнём?
          </h2>
        </FadeIn>
        <p
          className="max-w-[560px] leading-relaxed text-accent-pale"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
        >
          Запишитесь на пробное занятие за 800&nbsp;₽: познакомимся, определим уровень и составим план.
        </p>
        <ContactButton href={BOOKING_LINK} label="Записаться на пробное" variant="light" />
        <ul className="mt-2 flex flex-wrap justify-center gap-3">
          {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-canvas/30 px-5 py-2.5 font-mono text-sm text-canvas transition-colors duration-200 hover:bg-canvas/10 sm:text-base"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {TUTOR_NAME} — репетитор по информатике
      </p>
    </footer>
  );
}
