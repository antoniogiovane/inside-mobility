import { Link } from "react-router-dom";
import Icon from "../components/Icon";

export default function ChiSiamo() {
  return (
    <>
      <section className="page-hero"><div className="orb o1"></div><div className="orb o2"></div><div className="wrap">
        <p className="crumb"><Link to="/">Home</Link> / Chi Siamo</p>
        <span className="eyebrow">La nostra storia</span>
        <h1 className="display" data-reveal>Il concierge<br /><span className="gold-text">dell'auto.</span></h1>
        <p className="lead mt-1" data-reveal data-reveal-delay="1">Inside Mobility nasce da un'idea semplice: comprare l'auto giusta non dovrebbe essere complicato, stressante o pieno di compromessi. Dovrebbe essere un'esperienza. Dietro questa idea ci sono due persone e una stessa ossessione: <b>te</b>.</p>
      </div></section>

      {/* ===== I FONDATORI — la coppia ===== */}
      <section className="section"><div className="wrap">
        <div className="feature">
          <div data-reveal>
            <span className="eyebrow">I fondatori</span>
            <h2 className="h-sect mt-1">Due strade,<br /><span className="gold-text">un solo obiettivo.</span></h2>
            <p className="lead mt-1">Inside Mobility è guidata da <b>Alessio Alushaj</b> e <b>Alex Martella</b>: due percorsi diversi, uniti dagli stessi valori imprenditoriali, dalla stessa passione per i motori e dalla stessa, ostinata cura del cliente.</p>
            <p className="muted mt-1">Alessio porta la <b>visione del concierge</b>: mettere la persona — non il piazzale — al centro di ogni scelta. Alex porta <b>vent'anni di mani nel motore e nella carrozzeria</b>, la competenza tecnica di chi un'auto la sa davvero rimettere a nuovo. Insieme, offrono qualcosa che una concessionaria non può: un unico interlocutore che ti ascolta, cerca, prepara e consegna.</p>
            <div className="hero-stats" style={{ marginTop: "2.4rem" }}>
              <div><div className="num brand-text"><span data-count="20">0</span>+</div><div className="lbl">Anni di carrozzeria</div></div>
              <div><div className="num brand-text">2</div><div className="lbl">Fondatori, una visione</div></div>
              <div><div className="num brand-text">0</div><div className="lbl">Compromessi</div></div>
            </div>
          </div>
          <div className="feature-media tall" data-reveal data-reveal-delay="1"><img src="/img/Alessio%20e%20Alex.webp" alt="Alessio Alushaj e Alex Martella, fondatori di Inside Mobility" loading="lazy" style={{ objectPosition: "center top" }} /></div>
        </div>
      </div></section>

      {/* ===== ALESSIO ===== */}
      <section className="section band"><div className="wrap">
        <div className="feature rev">
          <div data-reveal>
            <span className="eyebrow">Il fondatore</span>
            <h2 className="h-sect mt-1">Alessio Alushaj.<br /><span className="gold-text">La persona al centro.</span></h2>
            <p className="lead mt-1">Inside Mobility nasce dalla visione di <b>Alessio</b>: non vendere le auto che si hanno, ma <b>trovare l'auto che desideri</b>, con il focus sulla soluzione più adatta a te — mai sulla vendita.</p>
            <p className="muted mt-1">Da oltre <b>5 anni nel settore automotive</b>, ha costruito un modo di lavorare preciso: ascoltare, capire, consigliare come farebbe con un amico. Un unico interlocutore, competente e trasparente, che ti segue dall'idea alla consegna.</p>
          </div>
          <div className="feature-media portrait" data-reveal data-reveal-delay="1"><img src="/img/alessio.webp" alt="Alessio Alushaj, founder di Inside Mobility" loading="lazy" /><div className="badge-float"><img className="logo-mark" src="/img/mark.png" alt="Inside Mobility" /><div><b style={{ display: "block" }}>Alessio Alushaj</b><span className="muted" style={{ fontSize: ".85rem" }}>Founder · Visione &amp; Concierge</span></div></div></div>
        </div>
      </div></section>

      {/* ===== ALEX ===== */}
      <section className="section"><div className="wrap">
        <div className="feature">
          <div data-reveal>
            <span className="eyebrow">Il co-fondatore</span>
            <h2 className="h-sect mt-1">Alex Martella.<br /><span className="gold-text">L'auto rimessa a nuova.</span></h2>
            <p className="lead mt-1">Ad Alessio si è aggiunto <b>Alex Martella</b>, forte di un'esperienza <b>ventennale nel mondo dell'autocarrozzeria</b>. È il titolare di <b>AM Garage</b>, la sua carrozzeria che da anni serve le più grosse concessionarie di <b>Lecce e provincia</b>.</p>
            <p className="muted mt-1">Alex porta in Inside Mobility ciò che si impara solo con vent'anni di lavoro sul campo: l'occhio per il dettaglio, la capacità di far tornare un'auto come nuova e uno standard qualitativo riconosciuto da chi, nel settore, non può permettersi errori. È la garanzia che l'auto che ricevi non è solo quella giusta — è <b>perfetta</b>.</p>
            <p className="muted mt-1">Stessi valori imprenditoriali di Alessio, stessa passione per i motori, stessa cura del cliente. Due sensibilità complementari al servizio della stessa promessa.</p>
          </div>
          <div className="feature-media portrait" data-reveal data-reveal-delay="1"><img src="/img/Alex%20Martella.webp" alt="Alex Martella, co-founder di Inside Mobility e titolare di AM Garage" loading="lazy" /><div className="badge-float"><img className="logo-mark" src="/img/mark.png" alt="Inside Mobility" /><div><b style={{ display: "block" }}>Alex Martella</b><span className="muted" style={{ fontSize: ".85rem" }}>Co-Founder · AM Garage</span></div></div></div>
        </div>
      </div></section>

      {/* ===== LA PASSIONE / DA BAMBINO ===== */}
      <section className="section band"><div className="wrap">
        <div className="feature rev">
          <div data-reveal>
            <span className="eyebrow">Una passione, non un lavoro</span>
            <h2 className="h-sect mt-1">Innamorati delle auto<br />da sempre.</h2>
            <p className="lead mt-1">Per Alessio le automobili non sono mai state un mestiere qualsiasi. Sono una <b>passione nata da bambino</b>: i modellini, i motori, l'odore di un abitacolo nuovo, il sogno di guidare quelle macchine viste solo sui poster.</p>
            <p className="muted mt-1">La stessa scintilla, negli anni, ha guidato anche Alex — dall'officina di ragazzo alla sua carrozzeria. È questo il DNA condiviso di Inside Mobility: <b>non spingere una vendita, ma trovare e preparare la soluzione più adatta</b> a chi si ha davanti, con la cura di chi lo fa per amore prima che per lavoro.</p>
            <p className="muted mt-1">Inside Mobility è la naturale evoluzione di questo approccio: la stessa attenzione ai dettagli e la stessa onestà, ora moltiplicate da due.</p>
          </div>
          <div className="feature-media" data-reveal data-reveal-delay="1"><img src="/img/alessio-story.webp" alt="La passione di Alessio per le auto, fin da bambino" loading="lazy" /></div>
        </div>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="section-head center" data-reveal><span className="eyebrow">Ciò in cui crediamo</span><h2 className="h-sect mt-1">I nostri valori.</h2></div>
        <div className="grid grid-3">
          <article className="card" data-reveal><div className="ic"><Icon name="circlecheck" /></div><h3>Trasparenza</h3><p>Prezzi reali, condizioni chiare, zero sorprese. Ti diciamo sempre come stanno le cose.</p></article>
          <article className="card" data-reveal data-reveal-delay="1"><div className="ic"><Icon name="heart" /></div><h3>Cura</h3><p>Trattiamo la tua auto come fosse la nostra. Ogni dettaglio conta, fino alla consegna.</p></article>
          <article className="card" data-reveal data-reveal-delay="2"><div className="ic"><Icon name="zap" /></div><h3>Semplicità</h3><p>Pensiamo noi a tutto il resto. A te resta solo la parte bella: scegliere e guidare.</p></article>
        </div>
      </div></section>

      <section className="section band"><div className="wrap">
        <div className="section-head center" data-reveal><span className="eyebrow">Il metodo</span><h2 className="h-sect mt-1">Un percorso, dall'idea alla guida.</h2></div>
        <div className="steps">
          <div className="step" data-reveal><div className="n">1</div><h4>Ascolto</h4><p>Capiamo davvero cosa cerchi, oltre la marca e il modello.</p></div>
          <div className="step" data-reveal data-reveal-delay="1"><div className="n">2</div><h4>Ricerca</h4><p>Attiviamo la nostra rete per trovare le migliori opzioni reali.</p></div>
          <div className="step" data-reveal data-reveal-delay="2"><div className="n">3</div><h4>Preparazione</h4><p>Ripristino in carrozzeria, personalizzazione e pratiche, tutto gestito da noi.</p></div>
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
