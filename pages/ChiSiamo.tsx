import { Link } from "react-router-dom";
import Icon from "../components/Icon";

export default function ChiSiamo() {
  return (
    <>
      <section className="page-hero"><div className="orb o1"></div><div className="orb o2"></div><div className="wrap">
        <p className="crumb"><Link to="/">Home</Link> / Chi Siamo</p>
        <span className="eyebrow">La nostra storia</span>
        <h1 className="display" data-reveal>Il concierge<br /><span className="gold-text">dell'auto.</span></h1>
        <p className="lead mt-1" data-reveal data-reveal-delay="1">Inside Mobility nasce da un'idea semplice: comprare l'auto giusta non dovrebbe essere complicato, stressante o pieno di compromessi. Dovrebbe essere un'esperienza.</p>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="feature">
          <div data-reveal>
            <span className="eyebrow">Fondatore</span>
            <h2 className="h-sect mt-1">Fondata da<br />Alessio Alushaj.</h2>
            <p className="lead mt-1">Inside Mobility nasce dalla visione di <b>Alessio Alushaj</b>: mettere la persona — non il piazzale — al centro. Non vendiamo le auto che abbiamo: troviamo l'auto che desideri, con il focus sulla <b>soluzione più adatta a te</b>, mai sulla vendita.</p>
            <p className="muted mt-1">Un unico interlocutore, competente e trasparente, che ti ascolta, cerca, prepara e consegna. Con la nostra carrozzeria integrata, ti diamo qualcosa che una concessionaria non può: un'auto rimessa a nuovo e personalizzata, davvero tua.</p>
            <div className="hero-stats" style={{ marginTop: "2.4rem" }}>
              <div><div className="num brand-text"><span data-count="5">0</span></div><div className="lbl">Anni nel settore</div></div>
              <div><div className="num brand-text">0</div><div className="lbl">Compromessi</div></div>
              <div><div className="num brand-text">1</div><div className="lbl">Referente dedicato</div></div>
            </div>
          </div>
          <div className="feature-media portrait" data-reveal data-reveal-delay="1"><img src="/img/alessio.webp" alt="Alessio Alushaj, founder di Inside Mobility" loading="lazy" /><div className="badge-float"><img className="logo-mark" src="/img/mark.png" alt="Inside Mobility" /><div><b style={{ display: "block" }}>Alessio Alushaj</b><span className="muted" style={{ fontSize: ".85rem" }}>Founder, Inside Mobility</span></div></div></div>
        </div>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="feature rev">
          <div data-reveal>
            <span className="eyebrow">Una passione, non un lavoro</span>
            <h2 className="h-sect mt-1">Innamorato delle auto<br />fin da bambino.</h2>
            <p className="lead mt-1">Per Alessio le automobili non sono mai state un mestiere qualsiasi. Sono una <b>passione nata da bambino</b>: i modellini, i motori, l'odore di un abitacolo nuovo, il sogno di guidare quelle macchine viste solo sui poster.</p>
            <p className="muted mt-1">Quella passione è diventata professione. Da oltre <b>5 anni lavora nel settore automotive</b>, e in tutto questo tempo ha coltivato un modo di lavorare preciso: non spingere una vendita, ma <b>trovare la soluzione più adatta a chi ha davanti</b>. Ascoltare, capire, consigliare come farebbe con un amico.</p>
            <p className="muted mt-1">Inside Mobility è la naturale evoluzione di questo approccio: la stessa cura, la stessa attenzione ai dettagli e la stessa onestà, messe al servizio di chi cerca l'auto giusta.</p>
          </div>
          <div className="feature-media" data-reveal data-reveal-delay="1"><img src="/img/alessio-story.webp" alt="La passione di Alessio per le auto" loading="lazy" /></div>
        </div>
      </div></section>

      <section className="section band"><div className="wrap">
        <div className="section-head center" data-reveal><span className="eyebrow">Ciò in cui crediamo</span><h2 className="h-sect mt-1">I nostri valori.</h2></div>
        <div className="grid grid-3">
          <article className="card" data-reveal><div className="ic"><Icon name="circlecheck" /></div><h3>Trasparenza</h3><p>Prezzi reali, condizioni chiare, zero sorprese. Ti diciamo sempre come stanno le cose.</p></article>
          <article className="card" data-reveal data-reveal-delay="1"><div className="ic"><Icon name="heart" /></div><h3>Cura</h3><p>Trattiamo la tua auto come fosse la nostra. Ogni dettaglio conta, fino alla consegna.</p></article>
          <article className="card" data-reveal data-reveal-delay="2"><div className="ic"><Icon name="zap" /></div><h3>Semplicità</h3><p>Pensiamo noi a tutto il resto. A te resta solo la parte bella: scegliere e guidare.</p></article>
        </div>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="section-head center" data-reveal><span className="eyebrow">Il metodo</span><h2 className="h-sect mt-1">Un percorso, dall'idea alla guida.</h2></div>
        <div className="steps">
          <div className="step" data-reveal><div className="n">1</div><h4>Ascolto</h4><p>Capiamo davvero cosa cerchi, oltre la marca e il modello.</p></div>
          <div className="step" data-reveal data-reveal-delay="1"><div className="n">2</div><h4>Ricerca</h4><p>Attiviamo la nostra rete per trovare le migliori opzioni reali.</p></div>
          <div className="step" data-reveal data-reveal-delay="2"><div className="n">3</div><h4>Preparazione</h4><p>Ripristino, personalizzazione e pratiche, tutto gestito da noi.</p></div>
          <div className="step" data-reveal data-reveal-delay="3"><div className="n">4</div><h4>Consegna</h4><p>Ti mettiamo in auto, pronto a partire. Missione compiuta.</p></div>
        </div>
        <div className="cta-band mt-3" data-reveal>
          <h2 className="h-sect" style={{ maxWidth: "16ch", marginInline: "auto" }}>Facciamo strada insieme.</h2>
          <div className="hero-cta" style={{ justifyContent: "center", marginTop: "2rem" }}><Link to="/configuratore" className="btn btn-gold btn-lg">Configura la tua auto <span className="arrow">→</span></Link><Link to="/contatti" className="btn btn-ghost btn-lg">Contattaci</Link></div>
        </div>
      </div></section>
    </>
  );
}
