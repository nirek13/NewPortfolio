import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * A small Markdown renderer for posts: headings, paragraphs, lists, quotes, rules,
 * and inline bold, italic, code and links. Builds React elements, never HTML
 * strings, so a post can't inject markup.
 */

const INLINE = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\))/g;

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of Array.from(text.matchAll(INLINE))) {
    const start = m.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const key = `${keyBase}-${i++}`;
    if (m[2]) out.push(<strong key={key}>{m[2]}</strong>);
    else if (m[3]) out.push(<em key={key}>{m[3]}</em>);
    else if (m[4]) out.push(<code key={key}>{m[4]}</code>);
    else if (m[5] && m[6]) {
      const [label, href] = [m[5], m[6]];
      // Pages navigate client-side; files (the RSS feed) and mail open plainly; other schemes stay text.
      if (href.startsWith('/') && !/\.\w+$/.test(href)) out.push(<Link key={key} href={href}>{label}</Link>);
      else if (href.startsWith('http'))
        out.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
      else if (href.startsWith('/') || href.startsWith('mailto:')) out.push(<a key={key} href={href}>{label}</a>);
      else out.push(label);
    }
    last = start + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** `skipTitle` drops a leading `# Heading`, for posts whose title the page already prints. */
export function Markdown({ source, skipTitle = false }: { source: string; skipTitle?: boolean }) {
  const lines = source.trim().split('\n').map((l) => l.trim());
  const blocks: ReactNode[] = [];
  let i = 0;

  if (skipTitle && lines[0]?.startsWith('# ')) i = 1;

  while (i < lines.length) {
    const line = lines[i];
    const key = `b${i}`;

    if (line === '') {
      i++;
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      // Posts carry one h1, the page title; headings inside a post start at h2.
      const level = Math.max(2, heading[1].length);
      const Tag = level === 2 ? 'h2' : 'h3';
      blocks.push(<Tag key={key}>{inline(heading[2], key)}</Tag>);
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line)) {
      blocks.push(<hr key={key} />);
      i++;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^[-*]\s+/, ''));
      blocks.push(
        <ul key={key}>
          {items.map((item, j) => (
            <li key={j}>{inline(item, `${key}-${j}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\d+\.\s+/, ''));
      blocks.push(
        <ol key={key}>
          {items.map((item, j) => (
            <li key={j}>{inline(item, `${key}-${j}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (line.startsWith('>')) {
      const quoted: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) quoted.push(lines[i++].replace(/^>\s?/, ''));
      blocks.push(<blockquote key={key}>{inline(quoted.join(' '), key)}</blockquote>);
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i] !== '' &&
      !/^(#{1,3}\s|[-*]\s|\d+\.\s|>|-{3,}$|\*{3,}$)/.test(lines[i])
    ) {
      para.push(lines[i++]);
    }
    blocks.push(<p key={key}>{inline(para.join(' '), key)}</p>);
  }

  return <div className="post-body">{blocks}</div>;
}
