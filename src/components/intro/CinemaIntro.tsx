import React, { Suspense, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, MeshReflectorMaterial, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { CAR_CONFIG } from "./carConfig";
import "../../styles/cinema3d.css";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const ss = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

/* Riconoscimento automatico dello sportello guidatore (se il nome esatto non è impostato) */
const DOOR_RE = /door|porta|portiere|sportello|t(u|ü)r|puerta|dhalf|dl_|_dl|door_fl|fl_door/i;

/* ---------- Boundary per GLB mancante ---------- */
class GLBBoundary extends React.Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  componentDidCatch(e: unknown) { console.warn("[Inside Mobility] car.glb non trovato: uso il modello di riserva. Metti il tuo file in public/models/car.glb", e); }
  render() { return this.state.err ? this.props.fallback : this.props.children; }
}

type ReadyCb = (root: THREE.Object3D, door: THREE.Object3D | null, mixer: THREE.AnimationMixer | null, action: THREE.AnimationAction | null, wheel: THREE.Object3D | null) => void;
const WHEEL_RE = /steering|volante/i;

/* ---------- Modello GLB reale ---------- */
function CarGLB({ onReady }: { onReady: ReadyCb }) {
  const gltf = useGLTF(CAR_CONFIG.modelPath) as any;
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  useEffect(() => {
    const names: string[] = [];
    scene.traverse((o: THREE.Object3D) => {
      if (o.name) names.push(o.type + ": " + o.name);
      const m = o as THREE.Mesh;
      if ((m as any).isMesh) { m.castShadow = true; m.receiveShadow = true; }
    });
    console.log("%c[Inside Mobility] NODI del GLB (copiali e mandali a Claude):", "color:#1f6ff2;font-weight:bold");
    console.log(names.join("\n"));
    console.log("[Inside Mobility] Animazioni:", (gltf.animations || []).map((a: any) => a.name));

    // 1) nome esatto dalla config  2) se non c'è, cerco un nodo "porta"
    let door: THREE.Object3D | null = scene.getObjectByName(CAR_CONFIG.driverDoorNodeName) || null;
    if (!door) { scene.traverse((o: THREE.Object3D) => { if (!door && o.name && DOOR_RE.test(o.name)) door = o; }); }
    if (door) console.log("[Inside Mobility] Sportello trovato:", (door as THREE.Object3D).name);
    else console.log("[Inside Mobility] Nessuno sportello separato: uso il finale con ingresso camera.");

    // volante (per lo zoom finale e per capire il lato guida)
    let wheel: THREE.Object3D | null = null;
    scene.traverse((o: THREE.Object3D) => { if (!wheel && o.name && WHEEL_RE.test(o.name)) wheel = o; });
    if (wheel) console.log("[Inside Mobility] Volante trovato:", (wheel as THREE.Object3D).name);
    else console.log("[Inside Mobility] Volante non trovato: uso una posizione stimata.");

    let mixer: THREE.AnimationMixer | null = null, action: THREE.AnimationAction | null = null;
    if (CAR_CONFIG.hasDoorAnimationClip && gltf.animations?.length) {
      mixer = new THREE.AnimationMixer(scene);
      const clip = THREE.AnimationClip.findByName(gltf.animations, CAR_CONFIG.doorAnimationClipName) || gltf.animations[0];
      if (clip) { action = mixer.clipAction(clip); action.play(); action.paused = true; }
    }
    onReady(scene, door, mixer, action, wheel);
  }, [scene]);
  return <primitive object={scene} scale={CAR_CONFIG.scale} />;
}

/* ---------- Auto di riserva (SOLO se manca del tutto il GLB) ---------- */
function FallbackCar({ onReady }: { onReady: ReadyCb }) {
  const g = useRef<THREE.Group>(null);
  const door = useRef<THREE.Group>(null);
  useEffect(() => { if (g.current) onReady(g.current, door.current, null, null, null); }, []);
  const paint = { color: "#1f6ff2", metalness: 0.7, roughness: 0.28 } as any;
  const glass = { color: "#0f1c30", metalness: 0.4, roughness: 0.1 } as any;
  const wheel = (x: number, z: number) => (
    <mesh position={[x, 0.42, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.42, 0.42, 0.32, 28]} />
      <meshStandardMaterial color="#0c0e14" metalness={0.3} roughness={0.6} />
    </mesh>
  );
  return (
    <group ref={g}>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow><boxGeometry args={[4.2, 0.7, 1.85]} /><meshStandardMaterial {...paint} /></mesh>
      <mesh position={[-0.15, 1.02, 0]} castShadow><boxGeometry args={[2.3, 0.68, 1.62]} /><meshStandardMaterial {...glass} /></mesh>
      <group ref={door} position={[0.55, 0.62, 0.92]}>
        <mesh position={[0.55, 0, 0.02]} castShadow><boxGeometry args={[1.25, 0.6, 0.06]} /><meshStandardMaterial {...paint} /></mesh>
      </group>
      {wheel(1.35, 0.95)}{wheel(-1.35, 0.95)}{wheel(1.35, -0.95)}{wheel(-1.35, -0.95)}
    </group>
  );
}

/* ---------- Regia agganciata al modello reale (coordinate MONDO) ----------
   0.00–0.50  UN SOLO giro completo (360°), sportello sempre CHIUSO
   0.50–0.66  a giro finito lo sportello si apre
   0.64       la camera è di LATO: profilo dell'auto con lo sportello aperto
   0.82–0.93  la camera passa dallo sportello ed ENTRA nell'abitacolo
   0.93–1.00  ZOOM finale sullo stemma Porsche del VOLANTE -> nero -> sito
   I keyframe sono calcolati da: centro/misure (bounding box) e posizione del volante. */
type Key = { p: number; pos: number[]; tgt: number[] };
function sampleKeys(keys: Key[], key: "pos" | "tgt", p: number) {
  if (!keys.length) return [0, 0, 0];
  if (p <= keys[0].p) return keys[0][key];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (p <= b.p) { const t = ss(a.p, b.p, p); return a[key].map((v, j) => v + (b[key][j] - v) * t); }
  }
  return keys[keys.length - 1][key];
}

function Scene({ progress, mobile }: { progress: React.MutableRefObject<number>; mobile: boolean }) {
  const root = useRef<THREE.Object3D | null>(null);   // il modello (geometria)
  const spin = useRef<THREE.Group>(null);             // pivot centrato: l'auto ruota su sé stessa
  const wheel = useRef<THREE.Object3D | null>(null);
  const wpos = useRef(new THREE.Vector3(-0.45, 0.79, -0.03));
  const keys = useRef<Key[]>([]);
  const built = useRef(false);
  const cabinLight = useRef<THREE.PointLight>(null);
  const lightPos = useRef(new THREE.Vector3(0.15, 0.95, -0.4));

  const build = () => {
    if (!root.current || !spin.current) return;
    // misura il modello a riposo
    root.current.position.set(0, 0, 0);
    root.current.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(root.current);
    const c = new THREE.Vector3(), s = new THREE.Vector3();
    box.getCenter(c); box.getSize(s);
    // CENTRA la geometria sull'origine del pivot e appoggia le ruote a terra
    root.current.position.set(-c.x, -c.y, -c.z);
    spin.current.position.set(0, c.y - box.min.y, 0);
    spin.current.updateWorldMatrix(true, true);
    // posizione REALE del volante nel nuovo sistema (a riposo)
    const w = wpos.current;
    if (wheel.current) wheel.current.getWorldPosition(w);
    else w.set(-0.45, (c.y - box.min.y) + 0.14, -0.03);
    const cx = 0, cy = c.y - box.min.y, cz = 0;                 // centro auto nel mondo
    lightPos.current.set(0.15, cy + 0.35, 0.16);               // luce sul volante (lato guida +Z)
    const zside = CAR_CONFIG.entrySide === "right" ? 1 : -1;    // lato dello SPORTELLO APERTO (-Z)
    // Coordinate REALI (ispezionate sul modello): sportello aperto a -Z, volante/stemma a +Z.
    // Lo stemma Porsche del volante è nel mondo a (0.205, cy+0.16, 0.13).
    const ex = 0.205, ey = cy + 0.16, ez = 0.13;               // stemma Porsche del volante
    keys.current = [
      { p: 0.00, pos: [cx - 3.4, cy + 1.05, cz + zside * 11.5], tgt: [cx, cy + 0.10, cz] },   // lontano, auto MOLTO piccola, centrata
      { p: 0.45, pos: [cx - 2.2, cy + 0.72, cz + zside * 6.4],  tgt: [cx, cy + 0.10, cz] },    // avvicinamento (l'auto ruota su sé stessa)
      { p: 0.60, pos: [cx - 0.30, cy + 0.42, cz + zside * 3.5], tgt: [cx - 0.15, cy + 0.16, cz] }, // profilo DI LATO, sportello aperto
      { p: 0.76, pos: [cx - 0.05, cy + 0.30, cz + zside * 1.4], tgt: [ex, ey, ez] },           // sulla soglia dello sportello, sguardo al volante
      { p: 0.88, pos: [cx + 0.00, cy + 0.27, cz - 0.10],        tgt: [ex, ey, ez] },           // entra e attraversa la cabina in avanti (davanti al sedile)
      { p: 1.00, pos: [cx + 0.05, cy + 0.245, cz + 0.44],       tgt: [ex, ey, ez] },           // ZOOM finale sullo STEMMA PORSCHE del volante
    ];
    built.current = true;
  };

  const onReady: ReadyCb = (r, _d, _m, _a, wh) => {
    root.current = r; wheel.current = wh;
    build();
  };

  useFrame(({ camera }) => {
    const p = progress.current;
    if (!built.current) build();
    const pos = sampleKeys(keys.current, "pos", p) as number[];
    const tgt = sampleKeys(keys.current, "tgt", p) as number[];
    camera.position.set(pos[0], pos[1], pos[2]);
    camera.lookAt(tgt[0], tgt[1], tgt[2]);
    // luce d'abitacolo: si accende nell'ingresso per illuminare il volante
    if (cabinLight.current) { cabinLight.current.position.copy(lightPos.current); cabinLight.current.intensity = 3.4 * ss(0.72, 0.95, p); }
    // UN SOLO giro completo su sé stessa (pivot centrato), 0.05 -> 0.55
    if (spin.current) spin.current.rotation.y = -Math.PI * 2 * ss(0.05, 0.55, p);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[6, 8, 4]} angle={0.5} penumbra={1} intensity={2.2} castShadow={!mobile} shadow-bias={-0.0002} />
      <spotLight position={[-6, 5, -4]} angle={0.6} penumbra={1} intensity={1.1} color="#5b9dff" />
      <pointLight ref={cabinLight} distance={2.8} decay={2} color="#ffffff" intensity={0} />
      <Environment resolution={mobile ? 128 : 256}>
        <Lightformer intensity={2.4} position={[0, 4, -6]} scale={[12, 5, 1]} />
        <Lightformer intensity={1.2} position={[-5, 2, 2]} scale={[6, 6, 1]} color="#9cc4ff" />
        <Lightformer intensity={1.2} position={[5, 2, 2]} scale={[6, 6, 1]} color="#ffffff" />
      </Environment>

      <group ref={spin}>
        {/* pivot centrato: l'auto ruota su sé stessa. Niente auto segnaposto: il nero+logo è nell'overlay boot */}
        <Suspense fallback={null}>
          <GLBBoundary fallback={<FallbackCar onReady={onReady} />}>
            <CarGLB onReady={onReady} />
          </GLBBoundary>
        </Suspense>
      </group>

      <ContactShadows position={[0, 0.001, 0]} opacity={0.6} scale={16} blur={2.6} far={6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        {mobile ? (
          <meshStandardMaterial color="#080d16" metalness={0.5} roughness={0.6} />
        ) : (
          <MeshReflectorMaterial blur={[260, 70]} resolution={1024} mixBlur={1} mixStrength={35} roughness={1}
            depthScale={1.1} minDepthThreshold={0.4} maxDepthThreshold={1.25} color="#080d16" metalness={0.65} />
        )}
      </mesh>
    </>
  );
}

/* ---------- Overlay di caricamento (schermo nero + logo lampeggiante) ---------- */
function BootScreen({ done }: { done: boolean }) {
  const { progress } = useProgress();
  return (
    <div className={"c3d-boot" + (done ? " hide" : "")}>
      <img src="/img/mark.png" alt="Inside Mobility" />
      <span>INSIDE&nbsp;MOBILITY</span>
      <i><b style={{ width: Math.round(progress) + "%" }} /></i>
    </div>
  );
}

/* ---------- Componente principale ---------- */
export default function CinemaIntro() {
  const reduce = typeof window !== "undefined" && window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = typeof window !== "undefined" && window.matchMedia && matchMedia("(max-width: 768px)").matches;
  // solo iOS ignora HTMLAudioElement.volume: lì serve il GainNode. Ovunque altrove (anche Safari desktop) .volume funziona.
  const isIOS = typeof navigator !== "undefined" && (/iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1));
  const sec = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const logo = useRef<HTMLDivElement>(null);
  const w1 = useRef<HTMLSpanElement>(null);
  const w2 = useRef<HTMLSpanElement>(null);
  const endBlack = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);

  // ---- audio motore (opt-in) ----
  // Usa ESCLUSIVAMENTE il file reale public/porsche sound.mp3 (nessun suono sintetizzato).
  // Parte SEMPRE spento a ogni apertura: nessuna persistenza (l'autoplay è bloccato senza gesto utente).
  const [soundOn, setSoundOn] = useState(false);
  const soundRef = useRef<boolean>(soundOn);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const fileOk = useRef(true);
  const lastAudioT = useRef(0);
  // su iOS `HTMLAudioElement.volume` è ignorato: instrado il file in un GainNode
  const fileCtx = useRef<AudioContext | null>(null);
  const fileGain = useRef<GainNode | null>(null);
  const ensureFile = () => {
    if (audioEl.current) return audioEl.current;
    const a = new Audio("/porsche%20sound.mp3");
    a.loop = true; a.preload = "auto"; a.volume = 0; (a as any).playsInline = true;
    a.setAttribute("playsinline", "");
    a.addEventListener("error", () => { fileOk.current = false; });
    // Safari: la riproduzione da new Audio() è affidabile solo se l'elemento è NEL DOM.
    a.style.display = "none";
    try { document.body.appendChild(a); } catch (e) { /* noop */ }
    // Routing Web Audio SOLO su iOS (dove .volume è ignorato). Su Safari desktop il routing
    // può restare muto, quindi lì e altrove si usa direttamente .volume.
    if (isIOS) {
      try {
        const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
        if (Ctx) {
          const ctx = new Ctx();
          const src = ctx.createMediaElementSource(a);
          const g = ctx.createGain(); g.gain.value = 0;
          src.connect(g); g.connect(ctx.destination);
          fileCtx.current = ctx; fileGain.current = g;
        }
      } catch (e) { /* fallback: si userà .volume */ }
    }
    try { a.load(); } catch (e) { /* noop */ }
    audioEl.current = a; return a;
  };
  const toggleSound = () => {
    const next = !soundRef.current;
    soundRef.current = next; setSoundOn(next);
    if (next) {
      const a = ensureFile();
      fileCtx.current?.resume?.();
      // feedback udibile immediato + sblocco audio su Safari (play a volume non-zero nel gesto utente)
      if (isIOS) { if (fileGain.current && fileCtx.current) fileGain.current.gain.setValueAtTime(0.14, fileCtx.current.currentTime); }
      else { a.volume = 0.14; }
      // Safari: se il primo play fallisce, ricarico e ritento (sempre dentro il gesto utente)
      const pr = a.play();
      if (pr && pr.catch) pr.catch(() => { try { a.load(); a.play().catch(() => {}); } catch (e) { /* noop */ } });
    } else {
      if (audioEl.current) audioEl.current.pause();
      if (fileGain.current && fileCtx.current) fileGain.current.gain.setTargetAtTime(0, fileCtx.current.currentTime, 0.1);
    }
  };

  // stato "modello pronto": chiude la schermata nera di boot
  const { active, progress: loadPct } = useProgress();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!active && loadPct >= 100) { const t = setTimeout(() => setReady(true), 350); return () => clearTimeout(t); }
  }, [active, loadPct]);

  // all'apertura riparti dall'alto, così l'intro inizia dalla schermata nera
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (reduce || !sec.current) return;
    let ticking = false;
    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;
      const total = sec.current!.offsetHeight - vh;
      if (total <= 0) return;
      const p = clamp(-sec.current!.getBoundingClientRect().top / total, 0, 1);
      progress.current = p;
      if (logo.current) logo.current.style.opacity = String(1 - ss(0.04, 0.13, p));
      const out = ss(0.5, 0.62, p);
      if (w1.current) { const a = ss(0.20, 0.34, p); w1.current.style.opacity = String(a * (1 - out)); w1.current.style.transform = `translateY(${40 * (1 - a) - out * 24}px)`; }
      if (w2.current) { const a = ss(0.28, 0.42, p); w2.current.style.opacity = String(a * (1 - out)); w2.current.style.transform = `translateY(${40 * (1 - a) - out * 24}px)`; }
      // finale: dopo l'ingresso in abitacolo lo schermo sfuma nel NERO, poi compare il sito
      if (endBlack.current) endBlack.current.style.opacity = String(ss(0.965, 1.0, p));
      if (cue.current) cue.current.style.opacity = String((1 - ss(0.02, 0.1, p)) * (ready ? 1 : 0));
      if (bar.current) bar.current.style.width = p * 100 + "%";
      // header e menu compaiono solo a intro conclusa
      document.body.classList.toggle("intro-lock", p < 0.985);
      // rombo motore: sale avvicinandosi, picco allo sportello, poi sfuma nel nero
      if (soundRef.current && fileOk.current) {
        const rpm = ss(0.06, 0.9, p);
        // "minimo" udibile appena attivi (idle), sale avvicinandosi all'auto, sfuma nel finale al nero
        const vol = Math.max(0.14, ss(0.06, 0.5, p)) * (1 - ss(0.88, 1.0, p));
        // solo il file reale, creandolo/riprendendolo se serve
        const a = audioEl.current || ensureFile();
        if (a.paused) { fileCtx.current?.resume?.(); a.play().catch(() => {}); }
        // volume legato allo scroll: via GainNode (funziona su iOS) o .volume (fallback desktop)
        const target = Math.max(0, Math.min(1, 0.85 * vol));
        if (fileGain.current && fileCtx.current) {
          fileGain.current.gain.setTargetAtTime(target, fileCtx.current.currentTime, 0.08);
        } else {
          a.volume = target;
        }
        // il playbackRate glitcha su mobile: lo tocco solo su desktop, a step e throttlato
        if (!isMobile) {
          const now = performance.now();
          if (now - lastAudioT.current > 120) {
            lastAudioT.current = now;
            const pr = 0.92 + rpm * 0.4;
            if (Math.abs(a.playbackRate - pr) > 0.06) a.playbackRate = pr;
          }
        }
      } else {
        if (fileGain.current && fileCtx.current) fileGain.current.gain.setTargetAtTime(0, fileCtx.current.currentTime, 0.1);
        else if (audioEl.current) audioEl.current.volume = 0;
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.body.classList.add("intro-lock");
    frame();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.body.classList.remove("intro-lock");
      if (audioEl.current) { try { audioEl.current.pause(); audioEl.current.remove(); } catch (e) { /* noop */ } audioEl.current = null; }
      if (fileCtx.current) { try { fileCtx.current.close(); } catch (e) { /* noop */ } fileCtx.current = null; fileGain.current = null; }
    };
  }, [reduce, ready]);

  return (
    <section className={"c3d" + (reduce ? " no-3d" : "")} ref={sec}>
      <div className="c3d-stage">
        {!reduce && (
          <div className="c3d-canvas">
            <Canvas shadows={!isMobile} dpr={isMobile ? [1, 1.6] : [1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1.6, 2)]} camera={{ position: [0, 1.5, 10.6], fov: 38 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
              <color attach="background" args={["#000000"]} />
              <fog attach="fog" args={["#000000", 9, 26]} />
              <Scene progress={progress} mobile={isMobile} />
            </Canvas>
          </div>
        )}

        <div className="c3d-overlay">
          <div className="c3d-logo" ref={logo}>
            <img src="/img/mark.png" alt="Inside Mobility" />
            <span>INSIDE&nbsp;MOBILITY</span>
          </div>
          <div className="c3d-words">
            <span className="cw" ref={w1}>Trova l'auto</span>
            <span className="cw gold-text" ref={w2}>dei tuoi sogni.</span>
          </div>
          <div className="c3d-cue" ref={cue}><span>Scorri</span><i></i></div>
        </div>
        {!reduce && (
          <button className={"c3d-sound in-pointer" + (soundOn ? " on" : "")} onClick={toggleSound}
            aria-label={soundOn ? "Disattiva audio motore" : "Attiva audio motore"} title="Audio motore">
            <span className="c3d-sound-ico" aria-hidden="true">{soundOn ? "🔊" : "🔈"}</span>
            <span className="c3d-sound-txt">{soundOn ? "Disattiva audio" : "Attiva audio"}</span>
          </button>
        )}
        <div className="c3d-bar"><i ref={bar}></i></div>
        {/* sfumatura finale al nero: si passa dall'abitacolo al buio, poi compare il sito */}
        {!reduce && <div className="c3d-end" ref={endBlack}></div>}

        {!reduce && <BootScreen done={ready} />}
      </div>
    </section>
  );
}

useGLTF.preload(CAR_CONFIG.modelPath);
