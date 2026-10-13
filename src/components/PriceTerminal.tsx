import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { SERVICES, SERVICES_NOTE } from '../data/content';

// Тёмно-синий терминал (не чёрный); все цвета текста ≥ 4.5:1 на его фоне.
const T = {
  bg: '#1E2433',
  bar: '#262D3F',
  text: '#D6DEEB',
  dim: '#8F9BB3',
  green: '#7EE2A8',
  yellow: '#FFD166',
  blue: '#9FB0FF',
  rule: '#3A4359',
};

const COMMAND = 'python3 prices.py --all';
const TYPE_SPEED = 45; // мс на символ
const LINE_DELAY = 110; // мс между строками вывода

// строки вывода: шапка, услуги, итог
const OUTPUT_LINES = SERVICES.length + 4;

function Prompt() {
  return (
    <span className="select-none">
      <span style={{ color: T.green }}>student@informatika</span>
      <span style={{ color: T.dim }}>:</span>
      <span style={{ color: T.blue }}>~</span>
      <span style={{ color: T.dim }}>$ </span>
    </span>
  );
}

function Caret() {
  return (
    <span className="caret ml-0.5 inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em]" style={{ background: T.text }} />
  );
}

export default function PriceTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setTyped(COMMAND.length);
      setShown(OUTPUT_LINES);
      return;
    }
    const timers: number[] = [];
    const start = 400;
    for (let i = 1; i <= COMMAND.length; i += 1) {
      timers.push(window.setTimeout(() => setTyped(i), start + i * TYPE_SPEED));
    }
    const outputStart = start + COMMAND.length * TYPE_SPEED + 350;
    for (let i = 1; i <= OUTPUT_LINES; i += 1) {
      timers.push(window.setTimeout(() => setShown(i), outputStart + i * LINE_DELAY));
    }
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion]);

  const done = shown >= OUTPUT_LINES;
  const line = (n: number) => shown >= n;

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl text-left shadow-lift"
      style={{ background: T.bg }}
    >
      <div className="flex items-center gap-2 px-5 py-3.5" style={{ background: T.bar }}>
        <span className="h-3 w-3 rounded-full bg-[#FF8A80]" />
        <span className="h-3 w-3 rounded-full bg-[#FFD166]" />
        <span className="h-3 w-3 rounded-full bg-[#5DD39E]" />
        <span className="ml-3 font-mono text-xs" style={{ color: T.dim }}>
          prices.py — zsh
        </span>
      </div>

      {/* для скринридеров — обычный список, визуальный терминал скрыт от них */}
      <ul className="sr-only">
        {SERVICES.map((s) => (
          <li key={s.name}>
            {s.name} — {s.price}. {s.description}
          </li>
        ))}
        <li>{SERVICES_NOTE}</li>
      </ul>

      <div
        aria-hidden="true"
        className="min-h-[540px] p-5 font-mono leading-relaxed sm:min-h-[600px] sm:p-7"
        style={{ color: T.text, fontSize: 'clamp(0.78rem, 1.3vw, 0.98rem)' }}
      >
        <div>
          <Prompt />
          {COMMAND.slice(0, typed)}
          {typed < COMMAND.length ? <Caret /> : null}
        </div>

        {line(1) ? (
          <div className="mt-2" style={{ color: T.dim }}>
            Загружаю прайс-лист... <span style={{ color: T.green }}>готово ✓</span>
          </div>
        ) : null}

        {line(2) ? (
          <div className="mt-4 flex gap-3 border-b pb-2 text-xs uppercase tracking-widest sm:gap-4" style={{ color: T.dim, borderColor: T.rule }}>
            <span className="w-6 shrink-0">#</span>
            <span className="flex-1">услуга</span>
            <span>цена</span>
          </div>
        ) : null}

        <ul>
          {SERVICES.map((service, i) =>
            line(i + 3) ? (
              <li
                key={service.name}
                className="group -mx-2 flex gap-3 rounded-lg px-2 py-2 transition-colors duration-150 hover:bg-white/5 sm:gap-4"
              >
                <span className="w-6 shrink-0" style={{ color: T.dim }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="flex items-baseline gap-2">
                    <span style={{ color: i === 0 ? T.yellow : T.text }}>
                      {service.name}
                    </span>
                    <span
                      className="mb-[0.3em] hidden min-w-4 flex-1 border-b border-dotted sm:block"
                      style={{ borderColor: T.rule }}
                    />
                  </span>
                  <span className="text-[0.85em]" style={{ color: T.dim }}>
                    # {service.description}
                  </span>
                </span>
                <span className="shrink-0 whitespace-nowrap" style={{ color: i === 0 ? T.yellow : T.green }}>
                  {service.price}
                </span>
              </li>
            ) : null,
          )}
        </ul>

        {line(SERVICES.length + 3) ? (
          <div className="mt-3 border-t pt-3" style={{ color: T.green, borderColor: T.rule }}>
            ✓ {SERVICES_NOTE}
          </div>
        ) : null}

        {line(SERVICES.length + 4) ? (
          <div className="mt-4">
            <Prompt />
            <a
              href="#contact"
              className="underline decoration-dotted underline-offset-4 transition-colors duration-150 hover:text-white"
              style={{ color: T.blue }}
              tabIndex={-1}
            >
              записаться --пробное
            </a>
            {done ? <Caret /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
