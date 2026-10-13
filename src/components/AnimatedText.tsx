import { useRef, type CSSProperties } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  if (reduceMotion) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  const total = text.length;
  let cursor = 0;

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {text.split(' ').map((word, wordIndex, words) => {
        const chars = [...word].map((char) => {
          const start = cursor / total;
          const end = (cursor + 1) / total;
          cursor += 1;
          return (
            <Char
              key={cursor}
              char={char}
              progress={scrollYProgress}
              range={[start, end]}
            />
          );
        });
        cursor += 1; // пробел между словами

        return (
          <span key={wordIndex} aria-hidden="true">
            {/* слово не переносится по буквам */}
            <span className="inline-block whitespace-nowrap">{chars}</span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </p>
  );
}
