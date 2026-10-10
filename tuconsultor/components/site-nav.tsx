"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/diagnostico", label: "Diagnóstico" },
  { href: "/chequeo", label: "Chequeo" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/informe", label: "Informe" },
  { href: "/recursos", label: "Guías" },
];

export default function SiteNav() {
  const path = usePathname();
  const activo = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-sand-200/70 bg-cream/85 shadow-[0_4px_18px_rgba(38,52,39,0.035)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="tuConsultor, ir al inicio">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-800 text-xs font-bold text-white transition-transform duration-300 ease-smooth group-hover:scale-105">
            tC
          </span>
          <span className="leading-none">
            <span className="block text-sm tracking-tight text-ink-900">
              <span className="font-normal">Tu</span>
              <span className="font-ultra">Consultor</span>
            </span>
            <span className="mt-0.5 hidden text-2xs text-ink-400 lg:block">
              Auditor Estratégico 360° Inteligente · Soluciones Digitales
            </span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="flex items-center gap-7">
          <span className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={activo(l.href) ? "page" : undefined}
                className={`nav-link ${activo(l.href) ? "nav-link-active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </span>
          {/* En /metas este botón apuntaría a la página en la que ya estás:
              un botón sin función. Solo se muestra fuera de ahí. */}
          {path !== "/metas" && (
            <Link href="/metas" className="btn-primary btn-sm" title="Empieza eligiendo tus metas">
              Empezar por tu meta
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

