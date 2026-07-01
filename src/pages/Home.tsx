import { useState } from "react";
import { Link } from "react-router-dom";
import CinemaIntro from "../components/intro/CinemaIntro";
import Icon from "../components/Icon";

// Loghi brand: nomi file ESATTI presenti in public/img/
const BRANDS: { name: string; file: string }[] = [
  { name: "Porsche", file: "Logo_della_Porsche.svg.webp" },
  { name: "Audi", file: "Audi_logo_detail.svg.webp" },
  { name: "Mercedes-Benz", file: "Mercedes-Benz_Logo_2010.svg" },
  { name: "BMW", file: "BMW.svg" },
  { name: "Maserati", file: "Logo_della_Maserati.svg.webp" },
  { name: "Ferrari", file: "Logo_della_Scuderia_Ferrari_(vecchio).svg.webp" },
  { name: "Lamborghini", file: "Logo_della_Lamborghini.svg.webp" },
  { name: "Alfa Romeo", file: "Alfa_Romeo_2015.svg.webp" },
  { name: "Volkswagen", file: "Volkswagen_logo_2019.svg.webp" },
  { name: "Renault", file: "Renault_2021_Text.svg" },
];

// Se un file non esiste, il logo viene semplicemente omesso (nessun errore).
function BrandLogo({ name, file }: { name: string; file: string }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <img className="brand-logo" src={`/img/${encodeURI(file)}`} alt={name}
      loading="lazy" onError={() => setHidden(true)} />
  );
}
const CHECK = [
  ["Meccanica & motore", "Motore, cambio, frizione, trasmissione, perdite e rumorosità."],
  ["Carrozzeria & telaio", "Verniciatura, pannelli, corrosione, congruità telaio, ex-sinistri."],
  ["Freni, gomme & sospensioni", "Dischi, pastiglie, usura pneumatici, geometrie, ammortizzatori."],
  ["Elettronica & sicurezza", "Centraline, ADAS, airbag, sensori e diagnosi errori."],
  ["Interni & comfort", "Selleria, clima, infotainment, comandi e funzionalità."],
  ["Storia & documenti", "Km reali, tagliandi, provenienza, passaggi e congruità."],
];

export default function Home() {
  return (
    <>
      <CinemaIntro />

      <section className="intro-hero">
        <div className="wrap" data-reveal>
          <span className="pill"><span className="dot-live"></span> Servizio attivo in tutta Italia</span>
          <h1 className="ih-title">Dall'idea alla guida.</h1>
          <p className="lead">Non siamo una concessionaria. Siamo il servizio che trova <b>l'auto perfetta</b> per te — nuova, km 0 o usata, in acquisto, finanziamento, leasing o noleggio.</p>
          <div className="hero-cta">
            <Link to="/configuratore" className="btn btn-gold btn-lg">Configura la tua auto <span className="arrow">→</span></Link>
            <Link to="/servizi" className="btn btn-ghost btn-lg">Scopri come funziona</Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...BRANDS, ...BRANDS].map((b, i) => <BrandLogo key={i} name={b.name} file={b.file} />)}
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Cosa facciamo</span>
            <h2 className="h-sect">Un unico interlocutore<br />per ogni tua esigenza.</h2>
            <p className="lead">Qualunque sia la formula, ci occupiamo di tutto noi. Tu scegli il sogno, noi lo rendiamo reale.</p>
          </div>
          <div className="grid grid-3">
            <article className="card" data-reveal><div className="ic"><Icon name="car" /></div><h3>Nuova, km 0 o usata</h3><p>Cerchiamo tra migliaia di veicoli la vettura giusta per te, con la storia e le condizioni che desideri. Selezione trasparente e verificata.</p></article>
            <article className="card" data-reveal data-reveal-delay="1"><div className="ic"><Icon name="card" /></div><h3>Acquisto, leasing, noleggio</h3><p>Acquisto diretto, finanziamento su misura, leasing o noleggio a lungo termine: costruiamo la formula più adatta al tuo budget e alla tua vita.</p></article>
            <article className="card" data-reveal data-reveal-delay="2"><div className="ic"><Icon name="wrench" /></div><h3>Carrozzeria integrata</h3><p>Ripristiniamo ogni difetto e personalizziamo l'auto — wrapping, dettagli, interni — per renderla davvero unica. Ti consegniamo un'auto impeccabile.</p></article>
            <article className="card" data-reveal><div className="ic"><Icon name="sparkles" /></div><h3>Consulenza premium</h3><p>Un consulente dedicato ti guida in ogni scelta: motorizzazione, allestimento, garanzie e costi reali. Zero sorprese, massima chiarezza.</p></article>
            <article className="card" data-reveal data-reveal-delay="1"><div className="ic"><Icon name="clipboard" /></div><h3>Pratiche chiavi in mano</h3><p>Passaggi di proprietà, immatricolazione, assicurazione e garanzie: gestiamo tutta la burocrazia al posto tuo, dall'inizio alla fine.</p></article>
            <article className="card" data-reveal data-reveal-delay="2"><div className="ic"><Icon name="truck" /></div><h3>Consegna a domicilio</h3><p>Ti portiamo l'auto dove vuoi tu, pronta da guidare. L'ultimo passo di un percorso pensato per essere semplice, elegante ed emozionante.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="feature">
            <div data-reveal>
              <span className="eyebrow">Il nostro plus</span>
              <h2 className="h-sect mt-1">Non ti troviamo solo<br />un'auto. La rendiamo <span className="gold-text">tua.</span></h2>
              <p className="lead mt-1">Grazie all'autocarrozzeria integrata, ogni vettura che passa da noi viene ispezionata, ripristinata e — se lo desideri — personalizzata nei minimi dettagli.</p>
              <ul className="checklist">
                <li><span className="tick"><Icon name="check" /></span><span><b>Ripristino totale</b> — carrozzeria, cerchi, interni e dettagli come nuovi.</span></li>
                <li><span className="tick"><Icon name="check" /></span><span><b>Personalizzazione</b> — wrapping, colori, finiture ed elementi su misura.</span></li>
                <li><span className="tick"><Icon name="check" /></span><span><b>Controllo qualità</b> — consegna solo dopo un check completo certificato.</span></li>
              </ul>
              <Link to="/servizi" className="btn btn-ghost mt-2">Tutti i servizi <span className="arrow">→</span></Link>
            </div>
            <div className="feature-media" data-reveal data-reveal-delay="1">
              <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop" alt="Dettaglio auto sportiva" loading="lazy" />
              <div className="badge-float"><img className="logo-mark" src="/img/mark.png" alt="Inside Mobility" /><div><b style={{ display: "block" }}>Detailing & personalizzazione</b><span className="muted" style={{ fontSize: ".85rem" }}>Ogni auto, un pezzo unico.</span></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="check-panel">
            <div data-reveal>
              <span className="eyebrow">La Checklist Inside Mobility</span>
              <h2 className="h-sect mt-1">Oltre 100 controlli.<br />Zero eccezioni.</h2>
              <p className="lead mt-1">Prima che un'auto possa arrivare a te, deve superare <b>interamente</b> la nostra checklist: un elenco maniacale di verifiche meccaniche, di carrozzeria, elettroniche e documentali.</p>
              <p className="muted mt-1">Se anche un solo controllo non è perfetto, o lo sistemiamo nella nostra carrozzeria, o quell'auto non passa. Nessun compromesso sulla tua sicurezza e sul tuo investimento.</p>
              <div className="check-badge"><span className="score">100%</span> superata, o non te la consegniamo.</div>
            </div>
            <div className="check-list" data-reveal data-reveal-delay="1">
              {CHECK.map(([t, d]) => (
                <div className="check-row" key={t}><span className="ck"><Icon name="check" /></span><div><b>{t}</b><small>{d}</small></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head center" data-reveal><span className="eyebrow">Come funziona</span><h2 className="h-sect mt-1">Dall'idea alla guida,<br />in 4 passi.</h2></div>
          <div className="steps">
            <div className="step" data-reveal><div className="n">1</div><h4>Raccontaci il sogno</h4><p>Ci dici che auto immagini, budget e come vuoi averla. Anche solo un'idea vaga: al resto pensiamo noi.</p></div>
            <div className="step" data-reveal data-reveal-delay="1"><div className="n">2</div><h4>Cerchiamo per te</h4><p>Attiviamo la nostra rete e selezioniamo le migliori opzioni reali, con la formula più conveniente.</p></div>
            <div className="step" data-reveal data-reveal-delay="2"><div className="n">3</div><h4>Prepariamo l'auto</h4><p>Ripristino, personalizzazione e controllo qualità in carrozzeria. Più tutte le pratiche gestite da noi.</p></div>
            <div className="step" data-reveal data-reveal-delay="3"><div className="n">4</div><h4>Sali e guida</h4><p>Ti consegniamo l'auto pronta, dove vuoi tu. Non ti resta che accendere il motore e partire.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="stat-grid">
            <div className="stat" data-reveal><div className="big"><span data-count="6">0</span></div><div className="lbl">Formule su misura</div></div>
            <div className="stat" data-reveal data-reveal-delay="1"><div className="big"><span data-count="100">0</span>%</div><div className="lbl">Pratiche gestite da noi</div></div>
            <div className="stat" data-reveal data-reveal-delay="2"><div className="big"><span data-count="1">0</span></div><div className="lbl">Consulente dedicato</div></div>
            <div className="stat" data-reveal data-reveal-delay="3"><div className="big">∞</div><div className="lbl">Modelli configurabili</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta-band" data-reveal>
            <span className="eyebrow center" style={{ justifyContent: "center" }}>Pronto a partire?</span>
            <h2 className="h-sect mt-1" style={{ maxWidth: "16ch", marginInline: "auto" }}>Configura ora la tua auto ideale.</h2>
            <p className="lead center mt-1" style={{ marginInline: "auto" }}>Inserisci marca, modello e le tue richieste. Ti mostriamo subito la vettura e ci attiviamo per trovartela.</p>
            <div className="hero-cta" style={{ justifyContent: "center", marginTop: "2rem" }}>
              <Link to="/configuratore" className="btn btn-gold btn-lg">Apri il configuratore <span className="arrow">→</span></Link>
              <Link to="/contatti" className="btn btn-ghost btn-lg">Parla con noi</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
