import { cn } from '@/lib/utils';

export type TokenKind = 'keyword' | 'string' | 'number' | 'punct' | 'plain';

export type Token = {
  kind: TokenKind;
  text: string;
};

const TOKEN_PATTERN =
  /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)|([{}[\],:])/g;

const KIND_CLASS: Record<TokenKind, string> = {
  keyword: 'text-syntax-keyword',
  string: 'text-syntax-string',
  number: 'text-syntax-number',
  punct: 'text-text-muted',
  plain: 'text-syntax-fn',
};

export function tokenizeJsonLine(line: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const full = match[0] ?? '';
    const index = match.index ?? 0;

    if (index > lastIndex) {
      tokens.push({ kind: 'plain', text: line.slice(lastIndex, index) });
    }

    const quoted = match[1];
    const colon = match[2];
    const literal = match[3];
    const numeric = match[4];
    const punct = match[5];

    if (quoted !== undefined) {
      if (colon !== undefined) {
        tokens.push({ kind: 'keyword', text: quoted });
        tokens.push({ kind: 'punct', text: colon });
      } else {
        tokens.push({ kind: 'string', text: quoted });
      }
    } else if (literal !== undefined) {
      tokens.push({ kind: 'keyword', text: literal });
    } else if (numeric !== undefined) {
      tokens.push({ kind: 'number', text: numeric });
    } else if (punct !== undefined) {
      tokens.push({ kind: 'punct', text: punct });
    } else {
      tokens.push({ kind: 'plain', text: full });
    }

    lastIndex = index + full.length;
  }

  if (lastIndex < line.length) {
    tokens.push({ kind: 'plain', text: line.slice(lastIndex) });
  }

  return tokens;
}

type HighlightedLineProps = {
  line: string;
  className?: string;
};

export function HighlightedLine({ line, className }: HighlightedLineProps) {
  const tokens = tokenizeJsonLine(line);

  return (
    <span className={cn('whitespace-pre', className)}>
      {tokens.length === 0
        ? ' '
        : tokens.map((token, index) => (
            <span key={`${index}-${token.kind}`} className={KIND_CLASS[token.kind]}>
              {token.text}
            </span>
          ))}
    </span>
  );
}
