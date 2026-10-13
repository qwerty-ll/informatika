import { useMemo, type ComponentType, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

type Tag = 'div' | 'nav' | 'p' | 'h1' | 'h2' | 'h3' | 'li' | 'span' | 'section' | 'ul';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as: tag = 'div',
  className,
  style,
  id,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const Component = useMemo(
    () => motion.create(tag) as unknown as ComponentType<HTMLMotionProps<'div'>>,
    [tag],
  );

  return (
    <Component
      id={id}
      className={className}
      style={style}
      initial={reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}
