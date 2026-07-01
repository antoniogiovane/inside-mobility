import { Link } from "react-router-dom";
import Icon from "../components/Icon";

const FORMULE = [
  ["01", "Acquisto diretto", "La via più semplice. Trovi l'auto, la paghi, è tua. Noi garantiamo prezzo corretto e condizioni verificate."],
  ["02", "Finanziamento", "Rate su misura del tuo budget, con i migliori partner. Ti mostriamo il costo reale, senza sorprese."],
  ["03", "Leasing", "La soluzione ideale per P.IVA e aziende, con vantaggi fiscali e flessibilità sul riscatto finale."],
  ["04", "Noleggio lungo termine", "Un canone, tutto incluso: assicurazione, manutenzione, bollo. Zero pensieri, massima libertà."],
  ["05", "Permuta", "Valutiamo la tua auto attuale e la integriamo nell'operazione per abbassare l'importo finale."],
  ["06", "Su misura", "Ogni caso è unico. Costruiamo la formula perfetta anche combinando più soluzioni tra loro."],
];
const CHECK = [
  ["Meccanica & motore", "Motore, cambio, frizione, trasmissione, perdite e rumorosità."],
  ["Carrozzeria & telaio", "Verniciatura, pannelli, corrosione, congruità telaio, ex-sinistri."],
  ["Freni, gomme & sospensioni", "Dischi, pastiglie, usura pneumatici, geometrie, ammortizzatori."],
  ["Elettronica & sicurezza", "Centraline, ADAS, airbag, sensori e diagnosi errori."],
  ["Interni & comfort", "Selleria, clima, infotainment, comandi e funzionalità."],
  ["Storia, documenti & prova su strada", "Km reali, tagliandi, provenienza, passaggi e test dinamico."],
];

export default function Servizi() {
  return (
    <>
      <section className="page-hero"><div className="orb o1"></div><div className="wrap">
        <p className="crumb"><Link to="/">Home</Link> / Servizi</p>
        <span className="eyebrow">Cosa offriamo</span>
        <h1 className="display" data-reveal>Un servizio,<br /><span className="gold-text">nessun limite.</span></h1>
        <p className="lead mt-1" data-reveal data-reveal-delay="1">Dalla ricerca alla consegna, dalla formula economica alla personalizzazione in carrozzeria. Tutto sotto un unico tetto, tutto pensato per te.</p>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="section-head" data-reveal><span className="eyebrow">Come acquistare</span><h2 className="h-sect mt-1">Sei formule, una sola scelta giusta.</h2><p className="lead">Ti aiutiamo a capire quale conviene davvero, in base alla tua situazione e ai tuoi obiettivi.</p></div>
        <div className="grid grid-3">
          {FORMULE.map(([n, t, d], i) => (
            <article className="card" data-reveal data-reveal-delay={String(i % 3)} key={n}><span className="num-badge">{n}</span><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="feature">
          <div className="feature-media" data-reveal><img src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1400&auto=format&fit=crop" alt="Ricerca auto premium" loading="lazy" /><div className="badge-float"><img className="logo-mark" src="/img/mark.png" alt="Inside Mobility" /><div><b style={{ display: "block" }}>Ricerca dedicata</b><span className="muted" style={{ fontSize: ".85rem" }}>Nuova · Km 0 · Usata</span></div></div></div>
          <div data-reveal data-reveal-delay="1">
            <span className="eyebrow">La ricerca</span>
            <h2 className="h-sect mt-1">Cerchiamo l'auto giusta,<br />non quella disponibile.</h2>
            <p className="lead mt-1">Non abbiamo un piazzale da svuotare. Il nostro unico obiettivo è trovare <b>la vettura perfetta per te</b>, ovunque si trovi, alle condizioni migliori.</p>
            <ul className="checklist">
              <li><span className="tick"><Icon name="check" /></span><span><b>Nuova, km 0 o usata</b> — selezione su misura delle tue esigenze.</span></li>
              <li><span className="tick"><Icon name="check" /></span><span><b>Storia verificata</b> — controllo provenienza, tagliandi e reali condizioni.</span></li>
              <li><span className="tick"><Icon name="check" /></span><span><b>Prezzo trasparente</b> — ti diciamo quanto vale davvero.</span></li>
            </ul>
          </div>
        </div>
      </div></section>

      <section className="section band"><div className="wrap">
        <div className="feature rev">
          <div data-reveal>
            <span className="eyebrow">Autocarrozzeria integrata</span>
            <h2 className="h-sect mt-1">La rendiamo perfetta.<br />La rendiamo <span className="gold-text">tua.</span></h2>
            <p className="lead mt-1">Il valore aggiunto che nessuno ti offre: la nostra carrozzeria ripristina ogni dettaglio e personalizza l'auto come la immagini.</p>
            <ul className="checklist">
              <li><span className="tick"><Icon name="check" /></span><span><b>Ripristino estetico</b> — carrozzeria, cerchi, ottiche, interni.</span></li>
              <li><span className="tick"><Icon name="check" /></span><span><b>Wrapping & colore</b> — cambia look mantenendo il valore.</span></li>
              <li><span className="tick"><Icon name="check" /></span><span><b>Dettagli su misura</b> — finiture ed elementi esclusivi.</span></li>
            </ul>
            <Link to="/configuratore" className="btn btn-gold mt-2">Personalizza la tua auto <span className="arrow">→</span></Link>
          </div>
          <div className="feature-media" data-reveal data-reveal-delay="1"><img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1400&auto=format&fit=crop" alt="Carrozzeria e dettaglio" loading="lazy" /></div>
        </div>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="check-panel">
          <div data-reveal>
            <span className="eyebrow">La Checklist Inside Mobility</span>
            <h2 className="h-sect mt-1">Oltre 100 controlli<br />prima dell'ok all'acquisto.</h2>
            <p className="lead mt-1">Ogni vettura, prima di essere proposta e consegnata, passa attraverso la <b>Checklist Inside Mobility</b>: un protocollo rigorosissimo che va superato <b>al 100%</b>. Verifiche meccaniche, di carrozzeria, elettroniche, di sicurezza e documentali.</p>
            <p className="muted mt-1">Non è una formalità: è il nostro modo di trattare la tua futura auto con la stessa cura e passione con cui sceglieremmo la nostra. Se un controllo non passa, si interviene in carrozzeria o si scarta l'auto. Punto.</p>
            <div className="check-badge"><span className="score">100%</span> superata = via libera all'acquisto.</div>
          </div>
          <div className="check-list" data-reveal data-reveal-delay="1">
            {CHECK.map(([t, d]) => (<div className="check-row" key={t}><span className="ck"><Icon name="check" /></span><div><b>{t}</b><small>{d}</small></div></div>))}
          </div>
        </div>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="section-head center" data-reveal><span className="eyebrow">Chiavi in mano</span><h2 className="h-sect mt-1">Della burocrazia<br />ci pensiamo noi.</h2></div>
        <div className="grid grid-4">
          <article className="card" data-reveal><div className="ic"><Icon name="file" /></div><h3 style={{ fontSize: "1.12rem" }}>Passaggio di proprietà</h3><p>Gestito da noi, in sicurezza.</p></article>
          <article className="card" data-reveal data-reveal-delay="1"><div className="ic"><Icon name="shield" /></div><h3 style={{ fontSize: "1.12rem" }}>Assicurazione</h3><p>Le migliori coperture per te.</p></article>
          <article className="card" data-reveal data-reveal-delay="2"><div className="ic"><Icon name="shieldcheck" /></div><h3 style={{ fontSize: "1.12rem" }}>Garanzie</h3><p>Tutela reale, messa nero su bianco.</p></article>
          <article className="card" data-reveal data-reveal-delay="3"><div className="ic"><Icon name="truck" /></div><h3 style={{ fontSize: "1.12rem" }}>Consegna</h3><p>Dove vuoi, pronta da guidare.</p></article>
        </div>
        <div className="cta-band mt-3" data-reveal>
          <h2 className="h-sect" style={{ maxWidth: "18ch", marginInline: "auto" }}>Iniziamo dal tuo sogno.</h2>
          <p className="lead center mt-1" style={{ marginInline: "auto" }}>Configura la tua auto ideale: ci mettiamo subito al lavoro.</p>
          <div className="hero-cta" style={{ justifyContent: "center", marginTop: "2rem" }}><Link to="/configuratore" className="btn btn-gold btn-lg">Apri il configuratore <span className="arrow">→</span></Link><Link to="/contatti" className="btn btn-ghost btn-lg">Parla con noi</Link></div>
        </div>
      </div></section>
    </>
  );
}
