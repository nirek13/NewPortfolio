export const SOCIALS = [
  { href: 'https://x.com/nirekshetty/', label: 'X' },
  { href: 'https://github.com/nirek13', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/nirekshetty/', label: 'LinkedIn' },
] as const;

/** Plain text links; the email lives next to these as a copy-to-clipboard button. */
export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      {SOCIALS.map(({ href, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-link">
          {label}
        </a>
      ))}
    </div>
  );
}
