import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { IM, waLink, mailLink } from "../lib/site";

// Immagine "auto coperta" (telo di seta blu con logo). File caricato: public/img/AUTO IM.webp
const COVERED = "/img/AUTO%20IM.webp";
const BRANDS = ["Mercedes-Benz", "BMW", "Audi", "Porsche", "Volkswagen", "Land Rover", "Tesla", "Alfa Romeo", "Fiat"];
const COLORS = [
  ["Nero", "#0c0c0f", "rgba(120,130,150,.35)"], ["Bianco", "#f2f4f7", "rgba(200,210,230,.4)"],
  ["Grigio", "#6b7180", "rgba(140,150,170,.4)"], ["Argento", "#c4c9d2", "rgba(190,200,215,.4)"],
  ["Blu", "#1f6ff2", "rgba(31,111,242,.5)"], ["Rosso", "#d5001c", "rgba(213,0,28,.45)"],
  ["Verde", "#1f6b4c", "rgba(31,150,110,.4)"], ["Beige", "#c9b79a", "rgba(201,183,154,.4)"],
];

function CarShot({ className }: { marca?: string; modello?: string; className?: string }) {
  return <img className={className} src={COVERED} alt="La tua auto, in arrivo" style={{ borderRadius: 14, width: "100%" }} />;
}

const empty = { marca: "", modello: "", cond: "", form: "", alim: "", cambio: "", budget: "", annokm: "", colore: "", colorHex: "", colorGlow: "", perso: "", note: "", nome: "", tel: "", email: "", citta: "" };
type Data = typeof empty;
const TITLES: Record<number, string> = { 1: "Marca & modello", 2: "Condizione & formula", 3: "Dettagli", 4: "Contatti" };

export default function Configuratore() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [d, setD] = useState<Data>({ ...empty });
  const [err, setErr] = useState<Record<number, boolean>>({});
  const set = (k: keyof Data, v: string) => setD((s) => ({ ...s, [k]: v }));

  const carLabel = (d.marca + " " + d.modello).trim();
  const bodyMsg = () => {
    const L = (l: string, v: string) => (v ? l + ": " + v + "\n" : "");
    return "🚗 NUOVA RICHIESTA — INSIDE MOBILITY\n———————————————\n" +
      "Auto desiderata: " + d.marca + " " + d.modello + "\n" +
      L("Condizione", d.cond) + L("Formula", d.form) + L("Alimentazione", d.alim) + L("Cambio", d.cambio) +
      L("Budget", d.budget) + L("Anno/Km", d.annokm) + L("Colore", d.colore) + L("Personalizzazione carrozzeria", d.perso) +
      L("Note", d.note) + "———————————————\n" +
      L("Nome", d.nome) + L("Telefono", d.tel) + L("Email", d.email) + L("Città", d.citta);
  };

  function validate(n: number) {
    let ok = true;
    if (n === 1) ok = !!(d.marca.trim() && d.modello.trim());
    else if (n === 2) ok = !!(d.cond && d.form);
    else if (n === 4) ok = !!(d.nome.trim() && ((d.email.trim() && /.+@.+\..+/.test(d.email)) || d.tel.trim().length >= 6));
    setErr((e) => ({ ...e, [n]: !ok }));
    return ok;
  }
  function next() { if (!validate(step)) return; if (step < 4) setStep(step + 1); else finish(); }
  function finish() { setDone(true); window.scrollTo({ top: 120, behavior: "smooth" }); }

  const enc = encodeURIComponent(bodyMsg());
  const subj = "Richiesta auto: " + carLabel + " — Inside Mobility";
  const clientPhone = (() => { let p = d.tel.replace(/[^\d]/g, ""); if (p.length >= 8 && p[0] === "3" && p.length <= 11) p = "39" + p; return p; })();

  const opt = (sel: boolean, onClick: () => void, b: string, s: string) => (
    <div className={"opt" + (sel ? " sel" : "")} onClick={onClick}><span className="radio"></span><div><b>{b}</b><small>{s}</small></div></div>
  );

  return (
    <>
      <section className="page-hero"><div className="orb o1"></div><div className="wrap">
        <p className="crumb"><Link to="/">Home</Link> / Configuratore</p>
        <span className="eyebrow">Costruisci il tuo sogno</span>
        <h1 className="display" data-reveal>Il configuratore.</h1>
        <p className="lead mt-1" data-reveal data-reveal-delay="1">Marca, modello e le tue richieste. Alla fine ti mostriamo la vettura e ci attiviamo subito per trovarla.</p>
      </div></section>

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="wrap cfg-wrap">
          <div className="cfg-shell">
            {!done && (
              <div>
                <div className="cfg-preview" style={{ ["--glow-col" as any]: d.colorGlow || undefined }}>
                  <div className="cfg-preview-inner">
                    <span className="pv-label">In arrivo · la sveliamo insieme a te</span>
                    <div className="pv-name">{carLabel || "La tua auto"}</div>
                    <div className="pv-stage"><CarShot marca={d.marca} modello={d.modello} className="covered" /></div>
                    {d.colore && <div className="pv-swatch" style={{ display: "inline-flex" }}><i style={{ background: d.colorHex }}></i> <span>Colore preferito: {d.colore}</span></div>}
                  </div>
                </div>

                <div className="cfg-top">
                  <div className="cfg-progress"><i style={{ width: (step / 4 * 100) + "%" }}></i></div>
                  <div className="cfg-meta"><span className="stp">Passo {step} di 4</span><span>{TITLES[step]}</span></div>
                </div>

                <div className="cfg-body">
                  {/* STEP 1 */}
                  <div className={"cfg-step" + (step === 1 ? " active" : "")}>
                    <h2>Quale auto sogni?</h2>
                    <p className="sub">Scegli una marca popolare o scrivine una qualsiasi, poi indica il modello.</p>
                    <div className="field"><label>Marca</label>
                      <div className="chips">
                        {BRANDS.map((b) => <span key={b} className={"chip" + (d.marca.trim().toLowerCase() === b.toLowerCase() ? " sel" : "")} onClick={() => set("marca", b)}>{b === "Mercedes-Benz" ? "Mercedes" : b}</span>)}
                      </div>
                    </div>
                    <div className="cfg-grid2">
                      <div className="field"><label>Marca desiderata</label><input className="input" value={d.marca} onChange={(e) => set("marca", e.target.value)} placeholder="Es. Mercedes-Benz" /></div>
                      <div className="field"><label>Modello</label><input className="input" value={d.modello} onChange={(e) => set("modello", e.target.value)} placeholder="Es. Classe A / 911 / Q5" /></div>
                    </div>
                    <div className={"err" + (err[1] ? " show" : "")}>Inserisci almeno la marca e il modello per continuare.</div>
                  </div>

                  {/* STEP 2 */}
                  <div className={"cfg-step" + (step === 2 ? " active" : "")}>
                    <h2>Come la vuoi?</h2>
                    <p className="sub">Condizione del veicolo e formula economica.</p>
                    <div className="field"><label>Condizione</label>
                      <div className="opt-grid">
                        {opt(d.cond === "Nuova", () => set("cond", "Nuova"), "Nuova", "Zero km, appena immatricolata")}
                        {opt(d.cond === "Km 0", () => set("cond", "Km 0"), "Km 0", "Nuova ma già immatricolata, prezzo migliore")}
                        {opt(d.cond === "Usata", () => set("cond", "Usata"), "Usata", "Selezionata e verificata da noi")}
                        {opt(d.cond === "Indifferente", () => set("cond", "Indifferente"), "Indifferente", "Consigliami tu la scelta migliore")}
                      </div>
                    </div>
                    <div className="field"><label>Formula</label>
                      <div className="opt-grid">
                        {opt(d.form === "Acquisto", () => set("form", "Acquisto"), "Acquisto", "Pagamento diretto")}
                        {opt(d.form === "Finanziamento", () => set("form", "Finanziamento"), "Finanziamento", "Rate su misura")}
                        {opt(d.form === "Leasing", () => set("form", "Leasing"), "Leasing", "Ideale per P.IVA e aziende")}
                        {opt(d.form === "Noleggio lungo termine", () => set("form", "Noleggio lungo termine"), "Noleggio", "Tutto incluso, lungo termine")}
                      </div>
                    </div>
                    <div className={"err" + (err[2] ? " show" : "")}>Seleziona condizione e formula.</div>
                  </div>

                  {/* STEP 3 */}
                  <div className={"cfg-step" + (step === 3 ? " active" : "")}>
                    <h2>I dettagli.</h2>
                    <p className="sub">Aiutaci a centrare l'auto perfetta. Compila solo ciò che ti interessa.</p>
                    <div className="cfg-grid2">
                      <div className="field"><label>Alimentazione</label>
                        <select className="input" value={d.alim} onChange={(e) => set("alim", e.target.value)}><option value="">Indifferente</option><option>Benzina</option><option>Diesel</option><option>Ibrida</option><option>Plug-in Hybrid</option><option>Elettrica</option><option>GPL / Metano</option></select>
                      </div>
                      <div className="field"><label>Cambio</label>
                        <select className="input" value={d.cambio} onChange={(e) => set("cambio", e.target.value)}><option value="">Indifferente</option><option>Automatico</option><option>Manuale</option></select>
                      </div>
                      <div className="field"><label>Budget indicativo</label>
                        <select className="input" value={d.budget} onChange={(e) => set("budget", e.target.value)}><option value="">Da definire insieme</option><option>Fino a 15.000€</option><option>15.000 – 30.000€</option><option>30.000 – 50.000€</option><option>50.000 – 80.000€</option><option>80.000€ +</option></select>
                      </div>
                      <div className="field"><label>Anno / Km max (facoltativo)</label><input className="input" value={d.annokm} onChange={(e) => set("annokm", e.target.value)} placeholder="Es. dal 2021, max 60.000 km" /></div>
                    </div>
                    <div className="field">
                      <label>Colore preferito <span className="muted" style={{ fontWeight: 400 }}>— aggiorna l'anteprima</span></label>
                      <div className="color-grid">
                        {COLORS.map(([name, hex, glow]) => (
                          <div key={name} className={"color-chip" + (d.colore === name ? " sel" : "")} onClick={() => setD((s) => ({ ...s, colore: name, colorHex: hex, colorGlow: glow }))}>
                            <span className="sw" style={{ background: hex }}></span><span>{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="field"><label>Personalizzazione in carrozzeria</label>
                      <div className="opt-grid">
                        {opt(d.perso === "Sì, mi interessa", () => set("perso", "Sì, mi interessa"), "Sì, mi interessa", "Ripristino, wrapping o dettagli su misura")}
                        {opt(d.perso === "No, standard", () => set("perso", "No, standard"), "No, va bene standard", "La voglio pronta così com'è")}
                      </div>
                    </div>
                    <div className="field"><label>Note o richieste particolari</label><textarea className="input" value={d.note} onChange={(e) => set("note", e.target.value)} placeholder="Es. tetto panoramico, cerchi da 20', pochi km, consegna entro l'estate..." /></div>
                  </div>

                  {/* STEP 4 */}
                  <div className={"cfg-step" + (step === 4 ? " active" : "")}>
                    <h2>Come ti contattiamo?</h2>
                    <p className="sub">Ricevi il riepilogo e la nostra proposta. I tuoi dati restano riservati.</p>
                    <div className="cfg-grid2">
                      <div className="field"><label>Nome e cognome</label><input className="input" value={d.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Il tuo nome" /></div>
                      <div className="field"><label>Telefono / WhatsApp</label><input className="input" value={d.tel} onChange={(e) => set("tel", e.target.value)} placeholder="+39 ..." inputMode="tel" /></div>
                    </div>
                    <div className="field"><label>Email</label><input className="input" type="email" value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="latua@email.it" /></div>
                    <div className="field"><label>Città (per la consegna)</label><input className="input" value={d.citta} onChange={(e) => set("citta", e.target.value)} placeholder="Es. Milano" /></div>
                    <div className={"err" + (err[4] ? " show" : "")}>Inserisci nome e un contatto valido (email o telefono).</div>
                  </div>
                </div>

                <div className="cfg-nav">
                  <button className="btn btn-ghost" style={{ visibility: step === 1 ? "hidden" : "visible" }} onClick={() => setStep(Math.max(1, step - 1))}>← Indietro</button>
                  <button className="btn btn-gold" onClick={next}>{step === 4 ? "Trova la mia auto" : "Continua"} <span className="arrow">→</span></button>
                </div>
              </div>
            )}

            {done && (
              <div className="cfg-result active">
                <div className="result-hero">
                  <span className="result-live"><span className="dot-live"></span> Richiesta ricevuta</span>
                  <h2>Siamo già attivi per trovare la tua<span className="gold-text car-name"> {carLabel}.</span></h2>
                  <div className="result-photo" style={{ ["--glow-col" as any]: d.colorGlow || undefined }}>
                    <CarShot marca={d.marca} modello={d.modello} className="covered" />
                  </div>
                </div>

                <div className="summary">
                  {[["Auto", carLabel], ["Condizione", d.cond], ["Formula", d.form], ["Alimentazione", d.alim || "Indifferente"], ["Cambio", d.cambio || "Indifferente"], ["Budget", d.budget || "Da definire"], ["Anno/Km", d.annokm || "—"], ["Colore", d.colore || "—"], ["Personalizzazione", d.perso || "—"], ["Note", d.note || "—"], ["Contatto", d.nome + (d.tel ? " · " + d.tel : "") + (d.email ? " · " + d.email : "")]].map(([k, v]) => (
                    <div className="summary-row" key={k as string}><span>{k}</span><span>{(v as string) || "—"}</span></div>
                  ))}
                </div>

                <div className="result-actions">
                  <p className="result-note" style={{ marginTop: 0, marginBottom: ".3rem", color: "var(--gold-2)" }}>Invia la tua richiesta a Inside Mobility</p>
                  <div className="row">
                    <a className="btn btn-wa" target="_blank" rel="noopener" href={waLink(IM.wa, bodyMsg())}><Icon name="wa" /> Scrivici su WhatsApp</a>
                    <a className="btn btn-gold" href={mailLink(IM.email, subj, bodyMsg())}><Icon name="mail" /> Invia via email</a>
                  </div>
                  <p className="result-note" style={{ marginTop: "1.2rem", marginBottom: ".3rem", color: "var(--gold-2)" }}>Ricevi tu una copia del riepilogo</p>
                  <div className="row">
                    {clientPhone.length >= 8 ? <a className="btn btn-ghost" target="_blank" rel="noopener" href={waLink(clientPhone, bodyMsg())}>Copia su WhatsApp</a> : <span />}
                    {d.email && /.+@.+\..+/.test(d.email) ? <a className="btn btn-ghost" href={mailLink(d.email, subj, bodyMsg())}>Copia via email</a> : <span />}
                  </div>
                  <p className="result-note">Ti risponderemo il prima possibile con le migliori opzioni reali per la tua <b>{carLabel}</b>. Grazie per aver scelto Inside Mobility.</p>
                  <div className="row" style={{ marginTop: ".6rem" }}>
                    <button className="btn btn-ghost" onClick={() => { setDone(false); setStep(4); }}>← Modifica richiesta</button>
                    <Link className="btn btn-ghost" to="/">Torna alla home</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
