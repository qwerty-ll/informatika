import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import CodeWindow from '../components/CodeWindow';
import { LESSON_STEPS, type LessonStep } from '../data/content';

const STEP_TINTS = ['bg-tint-green', 'bg-tint-violet', 'bg-tint-blue'];
const PANEL_H = 'clamp(200px, 26vw, 380px)';

interface CardProps {
  step: LessonStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}

function LessonCard({ step, index, total, progress, reduceMotion }: CardProps) {
  const isLast = index === total - 1;
  const targetScale = 1 - (total - 1 - index) * 0.03;
  // карточка начинает уменьшаться, когда следующая доезжает до неё
  const scale = useTransform(
    progress,
    isLast ? [0, 1] : [(index + 1) / total, 1],
    [1, isLast || reduceMotion ? 1 : targetScale],
  );

  return (
    <div
      className="sticky h-[85vh] [--card-top:5rem] md:[--card-top:7rem]"
      style={{ top: `calc(var(--card-top) + ${index * 28}px)` }}
    >
      <motion.article
        style={{ scale, transformOrigin: 'top center' }}
        className="rounded-[32px] border border-line bg-surface p-4 shadow-lift sm:rounded-[40px] sm:p-6 md:rounded-[48px] md:p-8"
      >
        <div className="mb-4 flex items-center gap-4 sm:mb-6 sm:gap-6 md:mb-8 md:gap-8">
          <span className="font-mono font-medium leading-none text-accent" style={{ fontSize: 'clamp(2.5rem, 7vw, 96px)' }}>
            {step.number}
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-muted" style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)' }}>
              {'// '}
              {step.category}
            </span>
            <h3 className="font-semibold leading-tight text-ink" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 2.2rem)' }}>
              {step.name}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[45fr_55fr]">
          <div
            className={`flex flex-col justify-between gap-6 rounded-3xl p-6 sm:p-8 md:p-10 ${STEP_TINTS[index % STEP_TINTS.length]}`}
            style={{ minHeight: PANEL_H }}
          >
            <p className="leading-relaxed text-ink" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.3rem)' }}>
              {step.text}
            </p>
            <ul className="flex flex-wrap gap-2">
              {step.points.map((point) => (
                <li key={point} className="rounded-full bg-surface/80 px-4 py-1.5 font-mono text-xs text-ink sm:text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="hidden md:block">
            <CodeWindow
              code={step.code}
              filename={`step_${step.number}.py`}
              className="h-full"
              flat
              codeClassName="overflow-hidden"
              codeStyle={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)' }}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function LessonsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <section id="lessons" className="relative px-5 pb-16 pt-24 sm:px-8 sm:pt-28 md:px-10 md:pt-32">
      <FadeIn delay={0} y={40} className="mb-14 flex flex-col items-center gap-4 sm:mb-16 md:mb-20">
        <span className="font-mono text-sm text-muted">{'// 03 — как проходят занятия'}</span>
        <h2
          className="text-center font-mono font-extrabold uppercase leading-none tracking-tighter text-ink"
          style={{ fontSize: 'clamp(2.75rem, 10vw, 140px)' }}
        >
          Занятия
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-6xl">
        {LESSON_STEPS.map((step, index) => (
          <LessonCard
            key={step.number}
            step={step}
            index={index}
            total={LESSON_STEPS.length}
            progress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  );
}
