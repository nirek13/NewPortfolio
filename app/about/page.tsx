'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import { useNavigationBounce } from "../../lib/useNavigationBounce";

function Logo({ src, alt, size = 18, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span className="inline-flex items-center align-middle relative -top-[1px]">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        quality={100}
        priority={false}
        className={`h-[18px] w-[18px] object-contain align-middle ${className}`}
      />
    </span>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="relative -top-[1px] leading-none align-middle">{children}</span>
);

const FallbackLogo = ({ alt }: { alt: string }) => (
  <Logo src="/YClogo.png" alt={alt} />
);

export default function About() {
  const { shouldBounce } = useNavigationBounce('about');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Nirek Shetty</h1>
            <div className="flex items-center gap-2 font-extralight">
              <a href="/" className={`hover-underline-nudge ${shouldBounce('home') ? 'nav-bounce' : ''}`}>Home</a>
              <span className="text-neutral-400">|</span>
              <a href="/photography" className={`hover-underline-nudge ${shouldBounce('photography') ? 'nav-bounce-delayed' : ''}`}>Photos</a>
            </div>
          </div>
          <div>↳ Born and raised in <span className="inline-flex items-center align-middle gap-1"><Logo src="/ontario flag.png" alt="Ontario" /><Label>Toronto</Label></span>, but spend a lot of time in <span className="inline-flex items-center align-middle gap-1"><Logo src="/ontario flag.png" alt="Ontario" /><Label>Waterloo</Label></span>.</div>
          <div className="ml-4">↳ Fun fact: I was born on Friday the 13th.</div>
          <div>↳ Started coding around age 7 and have been to well over 30 hackathons.</div>
          <div>↳ Won a silver at IOAI Canada and got nominated for NASA Space Apps out of like 93k people.</div>
          <div className="ml-4">↳ Did pretty well on the Canadian Computing Competition (71/75) and came 3rd in the national math contest.</div>
          <div className="ml-4">↳ Got Waterloo distinctions on Pascal, Gauss, and a few other contests.</div>
          <div>↳ Got an award in provincial legislation and am getting flown out to Ottawa free of charge for a week to the House of Commons.</div>
        </div>

        <div className="my-3 border-t border-neutral-200" />

        {/* Contact */}
        <div className="text-sm sm:text-[0.95rem] leading-tight">
          <div className="pt-4" />
          <footer className="pb-16 sm:pb-24">
            <div>◆ Contact:</div>
            <div className="mt-2 flex items-center gap-3 text-neutral-700">
              <a className="inline-flex items-center gap-1" href="mailto:shettynirek@gmail.com"><Mail size={14} /><span className="hover-underline-nudge">Email</span></a>
              <a className="inline-flex items-center gap-1" href="https://github.com/nirek13" target="_blank" rel="noreferrer"><Github size={14} /><span className="hover-underline-nudge">GitHub</span></a>
              <a className="inline-flex items-center gap-1" href="https://x.com/nirekshetty/" target="_blank" rel="noreferrer"><Logo src="/X.png" alt="X" /><span className="hover-underline-nudge">Twitter</span></a>
              <a className="inline-flex items-center gap-1" href="https://www.linkedin.com/in/NirekShetty/" target="_blank" rel="noreferrer"><Logo src="/linkedin.webp" alt="LinkedIn" /><span className="hover-underline-nudge">LinkedIn</span></a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
