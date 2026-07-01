import { Link } from "react-router-dom";
import Icon from "../components/Icon";

const TL = [
  ["Giorno 0", "La tua richiesta", "Configuri l'auto o ci contatti. Raccogliamo esigenze, budget e formula preferita, e ti confermiamo che siamo già al lavoro."],
  ["Fase 1", "Ricerca & selezione", "Attiviamo la nostra rete e ti presentiamo le migliori opzioni reali, con foto, condizioni e prezzo chiaro. Scegli in totale serenità."],
  ["Fase 2", "Verifica & pratiche", "Controlliamo storia e condizioni del veicolo e avviamo tutte le pratiche: finanziamento/leasing, passaggio, assicurazione e garanzie."],
  ["Fase 3", "Preparazione in carrozzeria", "Ripristino estetico, eventuale personalizzazione e detailing completo. L'auto viene rifinita in ogni dettaglio prima di arrivare a te."],
  ["Fase 4", "Controllo qualità", "Check finale certificato: meccanica, estetica, documenti. Consegniamo solo quando è tutto perfetto."],
  ["Traguardo", "Consegna a domicilio", "Ti portiamo l'auto dove preferisci, pronta da guidare. Ti spieghiamo tutto e ti mettiamo in strada. Buon viaggio."],
];

export default function Consegne() {
  return (
    <>
      <section className="page-hero"><div className="orb o1"></div><div className="wrap">
        <p className="crumb"><Link to="/">Home</Link> / Consegne</p>
        <span className="eyebrow">Dall'idea alla guida</span>
        <h1 className="display" data-reveal>La consegna,<br /><span className="gold-text">un'esperienza.</span></h1>
        <p className="lead mt-1" data-reveal data-reveal-delay="1">Ogni consegna è il momento in cui un sogno diventa realtà. Ecco come ti accompagniamo, passo dopo passo, fino alle chiavi in mano.</p>
      </div></section>

      <section className="section"><div className="wrap" style={{ maxWidth: "820px" }}>
        <div className="timeline">
          {TL.map(([w, t, d]) => (
            <div className="tl-item" data-reveal key={t}><div className="dot"></div><div className="when">{w}</div><h4>{t}</h4><p>{d}</p></div>
          ))}
        </div>
      </div></section>

      <section className="section band"><div className="wrap">
        <div className="section-head center" data-reveal><span className="eyebrow">Le nostre certezze</span><h2 className="h-sect mt-1">Cosa garantiamo alla consegna.</h2></div>
        <div className="grid grid-3">
          <article className="card" data-reveal><div className="ic"><Icon name="shieldcheck" /></div><h3>Auto verificata</h3><p>Condizioni reali confermate e documentazione completa e in regola.</p></article>
          <article className="card" data-reveal data-reveal-delay="1"><div className="ic"><Icon name="wrench" /></div><h3>Estetica impeccabile</h3><p>Detailing e ripristino inclusi: la ricevi come dev'essere, perfetta.</p></article>
          <article className="card" data-reveal data-reveal-delay="2"><div className="ic"><Icon name="circlecheck" /></div><h3>Tutto pronto</h3><p>Immatricolazione, assicurazione e garanzie: sali e parti, nient'altro da fare.</p></article>
        </div>
        <div className="cta-band mt-3" data-reveal>
          <h2 className="h-sect" style={{ maxWidth: "18ch", marginInline: "auto" }}>Il prossimo a salire in auto potresti essere tu.</h2>
          <div className="hero-cta" style={{ justifyContent: "center", marginTop: "2rem" }}><Link to="/configuratore" className="btn btn-gold btn-lg">Inizia ora <span className="arrow">→</span></Link><Link to="/contatti" className="btn btn-ghost btn-lg">Parla con noi</Link></div>
        </div>
      </div></section>
    </>
  );
}
