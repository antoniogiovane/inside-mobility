// Set icone coerente (stile Lucide). <Icon name="car" />
const ICONS: Record<string, string> = {
  car: '<path d="M5 17H4a1 1 0 0 1-1-1v-3.2a2 2 0 0 1 .14-.74l1.45-3.6A2 2 0 0 1 6.5 7.2h11a2 2 0 0 1 1.85 1.26l1.45 3.6A2 2 0 0 1 21 12.8V16a1 1 0 0 1-1 1h-1"/><path d="M8 17h8"/><path d="M4 12.5h16"/><circle cx="7.3" cy="17" r="1.5"/><circle cx="16.7" cy="17" r="1.5"/>',
  card: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><path d="M2.5 9.5h19"/><path d="M6 14.5h4"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.1-.5-.5-2.1z"/>',
  sparkles: '<path d="M12 3l1.9 4.8L18.7 9.7l-4.8 1.9L12 16.4l-1.9-4.8L5.3 9.7l4.8-1.9z"/><path d="M18.6 14.6l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z"/>',
  clipboard: '<path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/><rect x="9" y="2.5" width="6" height="4" rx="1"/><path d="M8.5 13.5l2 2 4-4"/>',
  file: '<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 13h6M9 17h4"/>',
  truck: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H14a1 1 0 0 1 1 1v9.5H4.5A1.5 1.5 0 0 1 3 14z"/><path d="M15 8.5h3.4a1 1 0 0 1 .9.55L21 12.5V16h-6z"/><circle cx="7.5" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
  shield: '<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/>',
  shieldcheck: '<path d="M12 3l7 3v5c0 4.5-3 7.6-7 8.8C8 18.6 5 15.5 5 11V6z"/><path d="M9 11.5l2 2 4-4"/>',
  circlecheck: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.4 2.4 4.6-4.8"/>',
  zap: '<path d="M13 2L4.6 13.1a.5.5 0 0 0 .4.8H11l-1 8.1 8.4-11.2a.5.5 0 0 0-.4-.8H12z"/>',
  heart: '<path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  wa: '<path d="M4 20.5l1.3-3.9A8 8 0 1 1 8.5 19z"/><path d="M9 8.6c-.3.1-.6.6-.6 1.2 0 .7.5 1.7 1.5 2.7s2 1.5 2.7 1.5c.6 0 1.1-.3 1.2-.6"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/>',
  fb: '<path d="M14 8.5h2.4V5.6H14A3.4 3.4 0 0 0 10.6 9v2H8.2v3h2.4v6.4h3V14h2.3l.5-3h-2.8V9.2a.7.7 0 0 1 .7-.7z"/>',
};

export default function Icon({ name, className }: { name: string; className?: string }) {
  const inner = ICONS[name] || "";
  return (
    <svg viewBox="0 0 24 24" className={className} dangerouslySetInnerHTML={{ __html: inner }} />
  );
}
