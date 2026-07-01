import { ReactNode, useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { NAV, IM } from "../lib/site";
import { useScrollFx } from "../lib/useScrollFx";
import Icon from "./Icon";

function toggleTheme() {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  if (isLight) { document.documentElement.removeAttribute("data-theme"); localStorage.setItem("im-theme", "dark"); }
  else { document.documentElement.setAttribute("data-theme", "light"); localStorage.setItem("im-theme", "light"); }
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  useScrollFx(pathname);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) => (isActive ? "active" : "");

  return (
    <>
      <nav className="nav" ref={navRef}>
        <div className="wrap">
          <Link to="/" className="brand brand-horiz" aria-label="Inside Mobility — home">
            <img className="logo-horiz" src="/img/LOGO%20ORIZZ%20HEADER.webp" alt="Inside Mobility" />
          </Link>
          <div className="nav-links">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={linkClass} end={n.to === "/"}>{n.label}</NavLink>
            ))}
          </div>
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambia tema">
              <svg className="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
              <svg className="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></svg>
            </button>
            <Link to="/configuratore" className="btn btn-gold">Configura la tua auto</Link>
            <button className={"burger" + (open ? " open" : "")} aria-label="Menu" onClick={() => setOpen((o) => !o)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={"drawer" + (open ? " open" : "")}>
        {NAV.map((n) => (<Link key={n.to} to={n.to}>{n.label}</Link>))}
        <Link to="/configuratore" className="gold-text">Configuratore</Link>
        <Link to="/configuratore" className="btn btn-gold drawer-cta">Inizia ora →</Link>
      </div>

      {children}

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <Link to="/" className="brand"><img className="logo-mark" src="/img/mark.png" alt="Inside Mobility" /><span>Inside Mobility<small>Automotive Concierge</small></span></Link>
              <p>Il servizio che trova e ti consegna l'auto perfetta. Dall'idea alla guida.</p>
              <div className="socials">
                <a href="#" aria-label="Instagram"><Icon name="ig" /></a>
                <a href="#" aria-label="Facebook"><Icon name="fb" /></a>
                <a href={"https://wa.me/" + IM.wa} target="_blank" rel="noopener" aria-label="WhatsApp"><Icon name="wa" /></a>
              </div>
            </div>
            <div><h5>Navigazione</h5><Link to="/">Home</Link><Link to="/servizi">Servizi</Link><Link to="/chi-siamo">Chi Siamo</Link><Link to="/consegne">Consegne</Link></div>
            <div><h5>Servizio</h5><Link to="/configuratore">Configuratore</Link><Link to="/servizi">Formule d'acquisto</Link><Link to="/servizi">Carrozzeria</Link><Link to="/contatti">Contatti</Link></div>
            <div><h5>Contatti</h5><a href={"mailto:" + IM.email}>{IM.email}</a><a href={"tel:" + IM.tel}>{IM.phone}</a><Link to="/contatti">Richiedi una consulenza</Link></div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} Inside Mobility</span>
            <span>Design e sviluppo su misura by <a href="https://agylax.com" target="_blank" rel="noopener">Agylax</a></span>
          </div>
        </div>
      </footer>
    </>
  );
}
