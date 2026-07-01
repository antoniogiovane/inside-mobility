# Inside Mobility — Sito React (Vite + TypeScript + three.js)

Sito completo di Inside Mobility con **intro 3D interattiva guidata dallo scroll** (react-three-fiber)
che carica il **tuo modello `car.glb`**, ruota l'auto, apre lo sportello ed entra in abitacolo, poi rivela il sito.
Tutte le pagine sono incluse: Home, Servizi, Chi Siamo, Consegne, Contatti, Configuratore.

## 🚀 Avvio rapido
Servono **Node 18+** e npm.

```bash
npm install
npm run dev       # sviluppo su http://localhost:5173
npm run build     # genera la cartella dist/ (pronta da pubblicare)
npm run preview   # anteprima della build
```

> Nel mio ambiente non ho potuto eseguire `npm install` (registry npm bloccato), quindi ti consegno il
> **codice sorgente completo**: lancia i comandi sopra sul tuo computer (o su Vercel/Netlify/StackBlitz/Emergent)
> e ottieni la build.

## 🏎️ Il tuo modello 3D (car.glb)
1. Metti il file in **`public/models/car.glb`** (rinominalo esattamente `car.glb`).
2. Avvia (`npm run dev`) e apri la **Console del browser**: viene stampato l'elenco di
   **nomi dei nodi/mesh e delle animazioni** del tuo GLB.
3. Apri **`src/components/intro/carConfig.ts`** e imposta:
   - `driverDoorNodeName`: il nome del nodo dello **sportello guidatore** (dalla console);
   - `scale` / `yOffset`: per dimensione e appoggio a terra;
   - se il GLB ha già una **clip di apertura**: `hasDoorAnimationClip: true` + `doorAnimationClipName`.
4. Se il file manca, l'intro funziona comunque con un'**auto di riserva** stilizzata (così vedi subito l'effetto).

Suggerimenti sul GLB: compresso (DRACO/meshopt) per leggerezza, asse Y in alto, scala in metri, sportello come
mesh/bone separato.

## 🎬 Come funziona l'intro
Sezione alta con canvas 3D "sticky": la posizione di scroll (0→1) pilota camera, rotazione auto, apertura porta e
ingresso in abitacolo; poi appare la hero. Rispetta `prefers-reduced-motion` (mostra hero statica).
Codice: `src/components/intro/CinemaIntro.tsx`.

## ✏️ Personalizzazioni rapide
- **Recapiti** (WhatsApp/telefono/email/P.IVA): `src/lib/site.ts`.
- **Colori/brand**: `src/styles/style.css` (variabili in `:root`: `--navy`, `--brand`, `--brand-2`).
- **Immagini** (logo, foto Alessio, favicon, auto coperta): cartella `public/img/`.
- **Foto sezioni** (ricerca/carrozzeria): sono da Unsplash negli `img src` delle pagine — sostituibili.

## 📦 Struttura
```
public/            img/ (logo, foto, favicon, covered-car.svg) · models/ (car.glb)
src/
  main.tsx, App.tsx            avvio + router (HashRouter: funziona su qualsiasi hosting)
  styles/                      style.css · configurator.css · cinema3d.css
  lib/                         site.ts (contatti) · useScrollFx.ts (reveal + count-up)
  components/                  Layout.tsx (nav/footer/tema) · Icon.tsx
    intro/                     CinemaIntro.tsx · carConfig.ts
  pages/                       Home, Servizi, ChiSiamo, Consegne, Contatti, Configuratore
```

## 🌐 Pubblicazione
- **Vercel / Netlify**: importa il progetto → build command `npm run build`, output `dist/`. Fatto.
- **Hosting classico (Aruba, ecc.)**: carica il contenuto di `dist/` via FTP. Uso di **HashRouter**, quindi le
  pagine funzionano ovunque senza configurazioni server.
- Deploy in **sottocartella**: imposta `base` in `vite.config.ts` (es. `base: "/mio-sito/"`).

## Note
- Il **Configuratore** mostra l'auto coperta (render foto da imagin.studio, con fallback vettoriale) e invia la
  richiesta a Inside Mobility via WhatsApp/email + copia al cliente.
- Dipendenze principali: react, react-router-dom, three, @react-three/fiber, @react-three/drei.
