// Sistema de iconos propio (SVG trazo, estilo Feather). Nada de emojis en la UI.
import React from "react";

const P: Record<string, React.ReactNode> = {
  target: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>),
  money: (<><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 12h.01M18 12h.01" /></>),
  map: (<><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></>),
  chat: (<><path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z" /></>),
  star: (<><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.8L6.6 20l1-6.1L3.2 9.5l6.1-.9L12 3Z" /></>),
  flask: (<><path d="M9 3h6M10 3v6L4.5 19a1 1 0 0 0 .9 1.5h13.2a1 1 0 0 0 .9-1.5L14 9V3" /><path d="M7.5 15h9" /></>),
  chart: (<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>),
  shield: (<><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" /><path d="m9.5 12 2 2 3.5-4" /></>),
  store: (<><path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" /></>),
  users: (<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5M16 4.5a3.5 3.5 0 0 1 0 7M17.5 15c2 .7 3.5 2 4 5" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" /></>),
  check: (<><path d="m4.5 12.5 5 5 10-11" /></>),
  alert: (<><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17.5h.01" /></>),
  xcircle: (<><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></>),
  arrow: (<><path d="M4 12h16m-6-6 6 6-6 6" /></>),
  printer: (<><path d="M7 8V3h10v5M7 17H4v-7h16v7h-3M7 14h10v7H7z" /></>),
  calendar: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>),
  zap: (<><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></>),
  book: (<><path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h13" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  video: (<><rect x="2" y="6" width="13" height="12" rx="2" /><path d="m15 10 7-3v10l-7-3" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
  briefcase: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></>),
  trend: (<><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  eye: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>),
  heart: (<><path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z" /></>),
  bulb: (<><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.7 1 1.5 1 2.5h6c0-1 .2-1.8 1-2.5A6 6 0 0 0 12 3Z" /></>),
  tag: (<><path d="m3 12 9-9h9v9l-9 9-9-9Z" /><circle cx="16" cy="8" r="1.2" /></>),
  phone: (<><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></>),
  play: (<><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" /></>),
  layers: (<><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>),
  key: (<><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M17 4l3 3M14 7l3 3" /></>),
  download: (<><path d="M12 3v12m-5-5 5 5 5-5M4 21h16" /></>),
  send: (<><path d="m21 3-9 9M21 3l-7 18-2-9-9-2 18-7Z" /></>),
  clipboard: (<><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4a2 2 0 0 1 6 0M9 11h6M9 15h4" /></>),
  settings: (<><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2-1.2L14.2 3h-4l-.4 2.7a7 7 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2 1.2l.4 2.7h4l.4-2.7a7 7 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" /></>),
  lock: (<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>),
  gift: (<><rect x="3" y="8" width="18" height="4" /><path d="M5 12v9h14v-9M12 8v13M12 8S7 8 5 6a2 2 0 0 1 3-2c1 1 4 4 4 4Zm0 0s5 0 7-2a2 2 0 0 0-3-2c-1 1-4 4-4 4Z" /></>),
  share: (<><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></>),
};

export default function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className || "w-4 h-4 inline-block"} aria-hidden>
      {P[name] || P.target}
    </svg>
  );
}

// Limpieza de emojis heredados en textos dinámicos (las plantillas de
// WhatsApp que el usuario COPIA se dejan intactas).
export function sinEmojis(texto: string): string {
  return String(texto || "")
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u{200D}\u{2190}-\u{21FF}]/gu, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

