'use client';

import { useEffect, useState } from "react";

const contacts = [
  { href: "mailto:shettynirek@gmail.com", label: "Email" },
  { href: "https://github.com/nirek13", label: "GitHub" },
  { href: "https://www.linkedin.com/in/nirekshetty/", label: "LinkedIn" },
  { href: "https://x.com/nirekshetty/", label: "Twitter" },
];

function TorontoTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Toronto",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const timer = setInterval(tick, 30_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="caption">Toronto&ensp;{time ?? "--:--"}</span>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line pb-16 pt-8 sm:mt-28">
      <div className="flex flex-wrap items-baseline justify-between gap-y-4">
        <div className="flex flex-wrap items-baseline gap-5 sm:gap-6">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={contact.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="text-[13px] font-medium text-ink-muted transition-colors hover:text-accent"
            >
              {contact.label}
            </a>
          ))}
        </div>
        <TorontoTime />
      </div>
      <p className="mt-10 text-[13px] text-ink-faint">
        Made with care in Toronto — © {new Date().getFullYear()} Nirek Shetty
      </p>
    </footer>
  );
}
