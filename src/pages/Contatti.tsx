import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { IM, waLink, mailLink } from "../lib/site";

export default function Contatti() {
  const [f, setF] = useState({ nome: "", tel: "", email: "", auto: "", msg: "" });
  const on = (k: string) => (e: any) => setF((s) => ({ ...s, [k]: e.target.value }));

  const body =
    "Ciao Inside Mobility!\n\n" +
    "Nome: " + (f.nome || "—") + "\n" +
    "Telefono: " + (f.tel || "—") + "\n" +
    "Email: " + (f.email || "—") + "\n" +
    "Auto che sogno: " + (f.auto || "—") + "\n" +
    (f.msg ? "Messaggio: " + f.msg + "\n" : "");
  const subj = "Richiesta consulenza — Inside Mobility";

  return (
    <>
      <section className="page-hero"><div className="orb o1"></div><div className="wrap">
        <p className="crumb"><Link to="/">Home</Link> / Contatti</p>
        <span className="eyebrow">Parliamone</span>
        <h1 className="display" data-reveal>Iniziamo<br /><span className="gold-text">a cercarla.</span></h1>
        <p className="lead mt-1" data-reveal data-reveal-delay="1">Raccontaci cosa cerchi. La prima consulenza è gratuita e senza impegno.</p>
      </div></section>

      <section className="section" style={{ paddingTop: "3rem" }}><div className="wrap">
        <div className="feature">
          <div data-reveal>
            <div className="card" style={{ padding: "2.2rem" }}>
              <h2 style={{ fontSize: "1.6rem", marginBottom: ".3rem" }}>Richiedi la tua consulenza</h2>
              <p className="muted" style={{ marginBottom: "1.6rem" }}>Compila e invia con un tap su WhatsApp o email.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="field"><label>Nome</label><input className="input" value={f.nome} onChange={on("nome")} placeholder="Il tuo nome" /></div>
                <div className="field"><label>Telefono</label><input className="input" value={f.tel} onChange={on("tel")} placeholder="+39 ..." inputMode="tel" /></div>
              </div>
              <div className="field"><label>Email</label><input className="input" type="email" value={f.email} onChange={on("email")} placeholder="latua@email.it" /></div>
              <div className="field"><label>Auto che sogni</label><input className="input" value={f.auto} onChange={on("auto")} placeholder="Es. Audi Q5, oppure descrivi le tue esigenze" /></div>
              <div className="field"><label>Messaggio</label><textarea className="input" value={f.msg} onChange={on("msg")} placeholder="Budget, formula preferita, tempistiche..." /></div>
              <div className="result-actions" style={{ margin: 0, padding: 0, gap: ".9rem" }}>
                <div className="row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".9rem" }}>
                  <a className="btn btn-wa" href={waLink(IM.wa, body)} target="_blank" rel="noopener" style={{ background: "#25d366", color: "#04321a" }}><Icon name="wa" /> WhatsApp</a>
                  <a className="btn btn-gold" href={mailLink(IM.email, subj, body)}><Icon name="mail" /> Email</a>
                </div>
              </div>
            </div>
          </div>

          <div data-reveal data-reveal-delay="1">
            <span className="eyebrow">Contatti diretti</span>
            <h2 className="h-sect mt-1" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>Siamo qui per te.</h2>
            <p className="lead mt-1">Preferisci scriverci subito? Usa uno dei canali qui sotto.</p>
            <div className="grid" style={{ gap: "1rem", marginTop: "1.8rem" }}>
              <a className="card" href={"https://wa.me/" + IM.wa} target="_blank" rel="noopener" style={{ padding: "1.4rem 1.6rem", display: "flex", gap: "1rem", alignItems: "center" }}><span className="ic" style={{ margin: 0 }}><Icon name="wa" /></span><div><b style={{ display: "block" }}>WhatsApp</b><span className="muted">{IM.phone}</span></div></a>
              <a className="card" href={"mailto:" + IM.email} style={{ padding: "1.4rem 1.6rem", display: "flex", gap: "1rem", alignItems: "center" }}><span className="ic" style={{ margin: 0 }}><Icon name="mail" /></span><div><b style={{ display: "block" }}>Email</b><span className="muted">{IM.email}</span></div></a>
              <a className="card" href={"tel:" + IM.tel} style={{ padding: "1.4rem 1.6rem", display: "flex", gap: "1rem", alignItems: "center" }}><span className="ic" style={{ margin: 0 }}><Icon name="phone" /></span><div><b style={{ display: "block" }}>Telefono</b><span className="muted">{IM.phone}</span></div></a>
            </div>
            <div className="pill mt-2"><span className="dot-live"></span> Rispondiamo di norma entro poche ore</div>
          </div>
        </div>
      </div></section>
    </>
  );
}
