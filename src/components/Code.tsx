import type { CSSProperties } from 'react';

// Лёгкая подсветка синтаксиса для коротких примеров (Python / JS / формулы Excel).
// Светлая палитра в духе GitHub; все цвета ≥ 4.5:1 на белом.
const COLORS = {
  keyword: '#CF222E',
  builtin: '#953800',
  function: '#8250DF',
  string: '#0A3069',
  number: '#0550AE',
  comment: '#6E7781',
  property: '#0550AE',
  decorator: '#8250DF',
  punct: '#556075',
  plain: '#1B2130',
} as const;

type TokenType = keyof typeof COLORS;

const KEYWORDS = new Set([
  'def', 'return', 'for', 'in', 'if', 'elif', 'else', 'while', 'not', 'and', 'or', 'import',
  'from', 'as', 'with', 'lambda', 'class', 'pass', 'break', 'continue', 'True', 'False', 'None',
  'const', 'let', 'var', 'function', 'new',
]);

const BUILTINS = new Set([
  'print', 'input', 'int', 'str', 'len', 'range', 'sum', 'max', 'min', 'sorted', 'bin', 'open',
  'map', 'list', 'dict', 'set', 'abs',
]);

const TOKEN_RE =
  /("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|((?:#|\/\/)[^\n]*)|(@[\p{L}_][\p{L}\p{N}_]*)|(\b\d+(?:\.\d+)?\b)|([\p{L}_][\p{L}\p{N}_]*)|([()[\]{}.,:;=+\-*/<>!%]+)/gu;

interface Token {
  text: string;
  type: TokenType;
}

function tokenize(code: string, lang: 'py' | 'js'): Token[] {
  const tokens: Token[] = [];
  let last = 0;

  for (const m of code.matchAll(TOKEN_RE)) {
    const index = m.index ?? 0;
    if (index > last) tokens.push({ text: code.slice(last, index), type: 'plain' });
    const [text, str, comment, decorator, num, ident] = m;
    let type: TokenType = 'punct';

    if (str) type = 'string';
    else if (comment) type = 'comment';
    else if (decorator) type = 'decorator';
    else if (num) type = 'number';
    else if (ident) {
      const rest = code.slice(index + text.length);
      if (KEYWORDS.has(text)) type = 'keyword';
      else if (BUILTINS.has(text)) type = 'builtin';
      else if (/^\s*\(/.test(rest)) type = 'function';
      else if (lang === 'js' && /^\s*:/.test(rest)) type = 'property';
      else type = 'plain';
    }

    tokens.push({ text, type });
    last = index + text.length;
  }

  if (last < code.length) tokens.push({ text: code.slice(last), type: 'plain' });
  return tokens;
}

interface CodeProps {
  code: string;
  lang?: 'py' | 'js';
  className?: string;
  style?: CSSProperties;
}

export default function Code({ code, lang = 'py', className, style }: CodeProps) {
  return (
    <pre className={`font-mono leading-relaxed ${className ?? ''}`} style={style}>
      {tokenize(code, lang).map((token, i) => (
        <span
          key={i}
          style={{
            color: COLORS[token.type],
            fontStyle: token.type === 'comment' ? 'italic' : undefined,
            fontWeight: token.type === 'keyword' ? 500 : undefined,
          }}
        >
          {token.text}
        </span>
      ))}
    </pre>
  );
}
