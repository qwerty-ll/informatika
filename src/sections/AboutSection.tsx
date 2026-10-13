import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import CodeWindow from '../components/CodeWindow';
import ContactButton from '../components/ContactButton';
import { ABOUT_FACTS, ABOUT_TEXT } from '../data/content';

const FACTS_CODE = [
  'const tutor = {',
  ...ABOUT_FACTS.map(([key, value]) => `  ${key}: "${value}",`),
  '};',
].join('\n');

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-24 sm:px-8 md:px-10"
    >
      <div className="flex w-full flex-col items-center gap-12 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40} className="flex flex-col items-center gap-4">
          <span className="font-mono text-sm text-muted">{'// 01 — знакомство'}</span>
          <h2
            className="text-center font-mono font-extrabold uppercase leading-none tracking-tighter text-ink"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 140px)' }}
          >
            Обо мне
          </h2>
        </FadeIn>
        <AnimatedText
          text={ABOUT_TEXT}
          className="max-w-[680px] text-center font-normal leading-relaxed text-ink"
          style={{ fontSize: 'clamp(1.05rem, 2vw, 1.4rem)' }}
        />
        <FadeIn delay={0.1} y={30} className="w-full max-w-[640px]">
          <CodeWindow
            code={FACTS_CODE}
            filename="about.js"
            lang="js"
            codeClassName="whitespace-pre-wrap"
            codeStyle={{ fontSize: 'clamp(0.8rem, 1.4vw, 1rem)' }}
          />
        </FadeIn>
        <ContactButton />
      </div>
    </section>
  );
}
