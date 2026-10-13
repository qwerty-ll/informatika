import type { CSSProperties } from 'react';
import Code from './Code';

interface CodeWindowProps {
  code: string;
  filename: string;
  lang?: 'py' | 'js';
  className?: string;
  codeClassName?: string;
  codeStyle?: CSSProperties;
  /** flat — без тени, для окна внутри другой карточки */
  flat?: boolean;
}

// Окно редактора: матовая карточка с «кнопками» и именем файла
export default function CodeWindow({
  code,
  filename,
  lang,
  className = '',
  codeClassName,
  codeStyle,
  flat = false,
}: CodeWindowProps) {
  return (
    <div className={`rounded-3xl border border-line p-5 text-left sm:p-7 ${
        flat ? 'bg-surface' : 'bg-surface shadow-soft'
      } ${className}`}>
      <div className="mb-5 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#FF8A80]" />
        <span className="h-3 w-3 rounded-full bg-[#FFD166]" />
        <span className="h-3 w-3 rounded-full bg-[#5DD39E]" />
        <span className="ml-3 font-mono text-xs text-muted">{filename}</span>
      </div>
      <Code code={code} lang={lang} className={codeClassName} style={codeStyle} />
    </div>
  );
}
