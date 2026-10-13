import { ArrowRight } from 'lucide-react';

interface ContactButtonProps {
  href?: string;
  label?: string;
  /** primary — шалфейная кнопка на светлом фоне, light — светлая кнопка на тёмном акцентном блоке */
  variant?: 'primary' | 'light';
}

const VARIANTS = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  light: 'bg-canvas text-ink hover:bg-white',
};

export default function ContactButton({
  href = '#contact',
  label = 'Записаться',
  variant = 'primary',
}: ContactButtonProps) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full px-7 py-3.5 font-mono text-sm font-medium shadow-soft transition-[background-color,box-shadow,transform] duration-200 hover:shadow-lift active:scale-[0.98] sm:px-8 sm:py-4 sm:text-base ${VARIANTS[variant]}`}
    >
      {label}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}
