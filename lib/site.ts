// ====== CONTATTI INSIDE MOBILITY (modifica qui se cambiano) ======
export const IM = {
  wa: "393921327353",          // WhatsApp (formato wa.me, senza + né spazi)
  phone: "+39 392 132 7353",
  tel: "+393921327353",
  email: "info@insidemobility.it",
  piva: "00000000000",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/servizi", label: "Servizi" },
  { to: "/chi-siamo", label: "Chi Siamo" },
  { to: "/consegne", label: "Consegne" },
  { to: "/contatti", label: "Contatti" },
];

export function waLink(number: string, text: string) {
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
}
export function mailLink(to: string, subject: string, body: string) {
  return "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}
