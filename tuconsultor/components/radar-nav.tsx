"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/chequeo", label: "Chequeo" },
  { href: "/diagnostico", label: "Diagnóstico" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/informe", label: "Informe" },
  { href: "/recursos", label: "Guías" },
  { href: "/metas", label: "Metas" },
];

export default function RadarNav() {
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Menú de TuConsultor"
      className="sticky top-16 z-40 mx-auto flex w-full justify-center rounded-2xl border border-white/80 bg-[#f8faf6]/90 p-1.5 shadow-[0_3px_14px_rgba(43,67,49,0.09)] backdrop-blur-md"
    >
      <div className="flex w-full items-center justify-start gap-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none] sm:justify-center">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className={`rounded-full shrink-0 px-3 py-2 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:text-xs ${
              isActive(href)
                ? "bg-white text-brand-900 shadow-hairline"
                : "text-ink-500 hover:bg-white/80 hover:text-ink-900"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
