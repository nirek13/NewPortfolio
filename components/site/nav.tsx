import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
];

export function SiteNav({ active }: { active?: string }) {
  return (
    <header className="rise sticky top-3 z-40 pt-5 sm:top-4 sm:pt-8">
      <div className="glass flex items-center justify-between rounded-full py-2 pl-5 pr-2">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-ink transition-colors hover:text-accent"
        >
          Nirek Shetty
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={active === link.href || undefined}
              className="nav-pill"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
